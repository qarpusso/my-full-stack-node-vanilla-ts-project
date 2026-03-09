document.addEventListener("DOMContentLoaded", function(event){
    const signUpFrom = document.getElementById("sign-up-form");
    const usernameEl = document.getElementById("username");
    const emailEl = document.getElementById("email");
    const passwordEl = document.getElementById("password");
    const confirmPasswordEl = document.getElementById("confirm-password");
    const errorEl = document.getElementById("error");
    signUpFrom.addEventListener("submit", async ()=>{
        if(!usernameEl, !emailEl, !passwordEl, !confirmPasswordEl) return;
        const username = usernameEl.value.trim();
        const email = emailEl.value.trim();
        const password = passwordEl.value.trim();
        const confirmPassword = confirmPasswordEl.value.trim();
        if(password !== confirmPassword){
            errorEl.textContent = "passwords are not matching!"
            return;
        }
        const response = await fetch("/api/sign-up",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
            }),
        });
        const data = await response.json();
        console.log(data);
    })
});