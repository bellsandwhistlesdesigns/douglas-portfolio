console.log("carousel.js loaded");

const container = document.querySelector('.card-container');
const cards = document.querySelectorAll('.card');
const leftBtn = document.querySelector('.nav-btn.left');
const rightBtn = document.querySelector('.nav-btn.right');

const cardCount = cards.length;

// Clone cards for infinite loop
cards.forEach(card => {
  container.appendChild(card.cloneNode(true));
});

// ----------------------------------------------------
// CONFIG (THIS controls “Apple feel”)
// ----------------------------------------------------
let speed = 1.5; //  lower = slower (0.2–1.0 range feels best)
let position = 0;
let cardWidth = cards[0].offsetWidth + 20;

// ----------------------------------------------------
// Infinite animation loop (Apple-style)
// ----------------------------------------------------
function animate() {
  position += speed;

  container.scrollLeft = position;

  // reset seamlessly when reaching half (original set end)
  if (position >= cardWidth * cardCount) {
    position = 0;
    container.scrollLeft = 0;
  }

  requestAnimationFrame(animate);
}

// ----------------------------------------------------
// Controls (optional manual override)
// ----------------------------------------------------
function goRight() {
  position += cardWidth;
  container.scrollLeft = position;
}

function goLeft() {
  position -= cardWidth;
  container.scrollLeft = position;
}

// Buttons
rightBtn.addEventListener('click', goRight);
leftBtn.addEventListener('click', goLeft);

// ----------------------------------------------------
// Pause on hover (Apple behavior)
// ----------------------------------------------------
container.addEventListener('mouseenter', () => {
  speed = 0;
});

container.addEventListener('mouseleave', () => {
  speed = 0.5; // resume motion
});

// ----------------------------------------------------
// Start animation
// ----------------------------------------------------
animate();