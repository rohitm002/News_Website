function toggleMenu() {
    document.getElementById("profile-menu").classList.toggle("show");
}

async function deleteAccount() {
    const userEmail = prompt("Enter your registered email:"); 

    if (!userEmail) {
        alert("Email is required!");
        return;
    }

    if (confirm("Are you sure you want to delete your account?")) {
        try {
            const response = await fetch(`http://localhost:5500/delete-user/${userEmail}`, { 
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await response.json();

            if (response.ok) {
                alert("Your account has been deleted.");
                window.location.href = "index.html"; 
            } else {
                alert("Error: " + data.message);
            }
        } catch (error) {
            console.error("Error deleting account:", error);
            alert("Server error! Try again later.");
        }
    }
}

async function updateAccount() {
    const userEmail = prompt("Enter your registered email:");
    const newName = prompt("Enter your new name:");
    const newPassword = prompt("Enter your new password:");

    if (!userEmail || !newName || !newPassword) {
        alert("All fields are required!");
        return;
    }

    try {
        const response = await fetch(`http://localhost:5500/update-user/${userEmail}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: userEmail, name: newName, password: newPassword })
        });

        const data = await response.json();

        if (data.success) {
            alert("Your account has been updated successfully.");
            window.location.reload();
        } else {
            alert("Error: " + data.message);
        }
    } catch (error) {
        console.error("Error updating account:", error);
        alert("Server error! Try again later.");
    }
}


function logout() {
    if (confirm("Are you sure you want to logout?")) {
        window.location.href = "index.html";
    }
}

window.onclick = function(event) {
    if (!event.target.matches('.profile-icon')) {
        let dropdowns = document.getElementsByClassName("dropdown-menu");
        for (let i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
};
