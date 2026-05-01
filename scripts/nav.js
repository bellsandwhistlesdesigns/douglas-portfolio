// deez nav.js

document.addEventListener("DOMContentLoaded", () => {
	console.log("nav.js is working");
	const currentUser = JSON.parse(localStorage.getItem("currentUser"));
	
	if (!currentUser) {
		window.location.href = "login.html";
		return;
	}
	
	const nav = document.createElement("nav");
	nav.classList.add("navboard");
	nav.innerHTML = `
		<div class="nav-left">
			<span class="brand">Bells & Whistles Designs</span>
			<a href="dashboard.html">Dashboard</a>
			<a href="profile.html">Profile</a>
			<a href="settings.html">Settings</a>
		</div>
		<div class="nav-center">
		<div class="nav-user">
			<span id="navUser">Welcome, ${currentUser.username}</span>
		</div>
		`;
	
	document.body.prepend(nav);
	// Showing the user in the navboard
		
	nav.querySelector("#logoutBtn").addEventListener("click", () => {
		localStorage.removeItem("currentUser");
		window.location.href = "login.html";
		
	});
});
	
	