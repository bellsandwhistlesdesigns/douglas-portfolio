// logout.js
document.addEventListener("DOMContentLoaded", () => {
    const logoutButtons = document.querySelectorAll(".logout-btn");

    logoutButtons.forEach(button => {
        button.addEventListener("click", () => {
            window.location.href = "login.html";
        });
    });
});