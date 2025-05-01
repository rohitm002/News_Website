const logregBox = document.querySelector('.logreg-box');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');

registerLink.addEventListener('click', () => {
    logregBox.classList.add('active');
});

loginLink.addEventListener('click', () => {
    logregBox.classList.remove('active');
});

async function registerUser() {
    const name = document.getElementById("reg-name").value;
    const email = document.getElementById("reg-email").value;
    const password = document.getElementById("reg-password").value;

    const response = await fetch("http://localhost:5500/register", {  // Changed 5500 to 5500
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
    });

    if (response.status === 201) {
        document.querySelector(".login-link").click();
    } else {
        const data = await response.json();
        alert(data.message);
    }
}

async function loginUser() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    const response = await fetch("http://localhost:5500/login", { // Changed 5500 to 5500
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.status === 200) {
        window.location.href = "dashboard.html";
    } else {
        alert(data.message);
    }
}

document.getElementById("logout-btn").addEventListener("click", function () {
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    window.location.href = "index.html";
});

function togglePassword() {
    let passwordField = document.getElementById("login-password");
    let eyeIcon = document.getElementById("eye-icon");

    if (passwordField.type === "password") {
        passwordField.type = "text";
        eyeIcon.classList.replace("bx-show", "bx-hide");
    } else {
        passwordField.type = "password";
        eyeIcon.classList.replace("bx-hide", "bx-show");
    }
}

async function forgotPassword() {
    let email = prompt("Enter your registered email:");

    if (!email) {
        alert("Email is required!");
        return;
    }

    // Validate Email Format
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    try {
        const response = await fetch("http://localhost:5500/forgot-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email })
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message || "Password reset link has been sent to your email.");
        } else {
            alert("Error: " + data.message);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Failed to send password reset email. Please try again later.");
    }
}
