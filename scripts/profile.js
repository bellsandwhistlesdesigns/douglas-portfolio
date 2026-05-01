// Deez profile.js
document.addEventListener("DOMContentLoaded", () => {
	console.log("profile.js is working");
	const currentUser = JSON.parse(localStorage.getItem("currentUser"));
	if (!currentUser) {
		window.location.href = "login.html";
		return;
	}
	const profileName = document.getElementById("profileName");
	if (profileName) profileName.textContent = currentUser.username;
	
	const bioEl = document.getElementById("bio");
	if (bio) bioEl.value = currentUser.bio || "";
	
	const themeColorEl = document.getElementById("themeColor");
	if (themeColorEl) themeColorEl.value = currentUser.themeColor || "#222222";
	
	// Save profile edits
	const saveBtn = document.getElementById("saveProfile");
	if (saveBtn) {
		saveBtn.addEventListener("click", () => {
		currentUser.bio = bioEl.value;
		currentUser.themeColor = themeColorEl.value;

		// Save changes
		localStorage.setItem("currentUser", JSON.stringify(currentUser));

		// Update in global users list
		let users = JSON.parse(localStorage.getItem("users")) || [];
		users = users.map(u => u.email === currentUser.email ? currentUser : u);
		localStorage.setItem("users", JSON.stringify(users));

		alert("Profile updated!");
    });
	}
	
	// Quote of the Day
	const quotes = [
	"Keep pushing forward",
	"Code. Debug. Repeat.",
	"Small steps lead to big progress.",
	"Believe in yourself and build it!",
	"Every bug is a step closer to mastery",
	"Dream it. Code it. Ship it.",
	"Stay curious, keep learning, read books",
	"The best way to predict the future is to invent it."
	];
	const quoteEl = document.getElementById("quoteOfDay");
	if (quoteEl) {
		const randomIndex = Math.floor(Math.random() * quotes.length);
		quoteEl.textContent = quotes[randomIndex];
	}

	// Membership Progress Bar
	const progressFill = document.getElementById("progressFill");
	if (progressFill) {
		const joinDate = new Date(currentUser.joinDate);
		const today = new Date();
		const diffTime = today - joinDate;
		const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    // Example: cap progress bar at 365 days
    const progressPercent = Math.min((diffDays / 365) * 100, 100);
		progressFill.style.width = progressPercent + "%";
	}
});
	