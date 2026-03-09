import { getDBConnection } from "../db/db.js";
import bcrypt from "bcryptjs";
import validator from "validator";

export async function signUpController(req, res) {
  try {
    const { username, email, password } = req.body;

    if (!validator.isEmail(email)) 
      return res.status(400).json({ error: "Geçersiz email formatı." });

    const hashedPassword = await bcrypt.hash(password, 10);

    const db = await getDBConnection();

    await db.run(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );

    res.status(201).json({ message: "Kullanıcı başarıyla kaydedildi." });
  } catch (error) {
    console.error("Kayıt hatası:", error);

    if (error.message.includes("UNIQUE constraint failed")) 
      return res.status(400).json({ error: "Bu email zaten kayıtlı." });

    res.status(500).json({ error: "Kayıt sırasında hata oluştu." });
  }
}
