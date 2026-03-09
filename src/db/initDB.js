import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "node:path";
import bcrypt from "bcryptjs";
import validator from "validator";

async function getDBConnection() {
  const dbPath = path.join("database.db");
  return open({
    filename: dbPath,
    driver: sqlite3.Database,
  });
}

async function initDB() {
  const db = await getDBConnection();

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `);

  const username = "admin";
  const email = "admin@example.com";
  const password = "123456";

  if (!validator.isEmail(email)) {
    console.error("Geçersiz email formatı!");
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const existing = await db.get("SELECT * FROM users WHERE email = ?", [email]);
  if (!existing) {
    await db.run(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );
    console.log("Seed kullanıcı eklendi.");
  } else {
    console.log("Seed kullanıcı zaten mevcut, eklenmedi.");
  }

  await db.close();
}

initDB().catch((err) => {
  console.error("DB init hatası:", err);
});
