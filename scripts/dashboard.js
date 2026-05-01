// dashboard.js

document.addEventListener("DOMContentLoaded", () => {
	const currentUser = JSON.parse(localStorage.getItem("currentUser"));

	if (!currentUser) {
    window.location.href = "login.html";
    return;
	}

	// Populate dashboard with user info
	document.querySelector("h2").textContent = `Hello Again,  ${currentUser.username}`;
	
});
