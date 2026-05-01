// settings.js

console.log("settings.js is working");

document.addEventListener("DOMContentLoaded", () => {
	
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser) {
    window.location.href = "login.html";
    return;
  }

  // Update tab title
  document.title = `Bells & Whistles Dashboard | Welcome back, ${currentUser.username}`;

  // Fill in placeholders safely
  const userNameEl = document.getElementById("userName");
  if (userNameEl) userNameEl.textContent = currentUser.username;

  const userEmailEl = document.getElementById("userEmail");
  if (userEmailEl) userEmailEl.textContent = currentUser.email;

  const joinDateEl = document.getElementById("joinDate");
  const joinDate = currentUser.joinDate || "2025-01-01";
  if (joinDateEl) joinDateEl.textContent = joinDate;

  const durationEl = document.getElementById("duration");
  if (durationEl) {
    const start = new Date(joinDate);
    const today = new Date();
    const diffTime = Math.abs(today - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    durationEl.textContent = `${diffDays} days`;
  }

  // Recalculate link (if present)
  const recalcLink = document.getElementById("recalcLink");
  const manualResult = document.getElementById("manualResult");
  if (recalcLink && manualResult) {
    recalcLink.addEventListener("click", () => {
      manualResult.textContent = `As of now, your membership is ${
        document.getElementById("duration")?.textContent || "N/A"
      } old.`;
      manualResult.classList.remove("hidden");
    });
  }
});
