console.log("leftandright.js loaded");

const container = document.querySelector('.card-container');
const cards = document.querySelectorAll('.card');
const leftBtn = document.querySelector('.nav-btn.left');
const rightBtn = document.querySelector('.nav-btn.right');

const cardCount = cards.length;
let currentIndex = 0;
let autoScrollInterval = null;

// ----------------------------------------------------
// 1. Clone cards for seamless loop
// ----------------------------------------------------
cards.forEach(card => {
  const clone = card.cloneNode(true);
  container.appendChild(clone);
});

// Now we scroll through 2 sets of cards:
// [0 - cardCount - 1] original
// [cardCount - 2*cardCount - 1] clone

// ----------------------------------------------------
// 2. Scroll function
// ----------------------------------------------------
function scrollToIndex(index, smooth = true) {
  const cardWidth = cards[0].offsetWidth + 20;

  container.scrollTo({
    left: cardWidth * index,
    behavior: smooth ? 'smooth' : 'auto'
  });
}

// ----------------------------------------------------
// 3. Handle infinite reset (no visible jump)
// ----------------------------------------------------
function handleLoopReset() {
  const cardWidth = cards[0].offsetWidth + 20;

  // If we've moved into cloned section
  if (currentIndex >= cardCount) {
    setTimeout(() => {
      container.scrollTo({
        left: 0,
        behavior: 'auto'
      });
      currentIndex = 0;
    }, 400);
  }

  // If we go backwards past start
  if (currentIndex < 0) {
    container.scrollTo({
      left: cardWidth * (cardCount - 1),
      behavior: 'auto'
    });
    currentIndex = cardCount - 1;
  }
}

// ----------------------------------------------------
// 4. Controls
// ----------------------------------------------------
function goRight() {
  currentIndex++;
  scrollToIndex(currentIndex);
  handleLoopReset();
}

function goLeft() {
  currentIndex--;
  scrollToIndex(currentIndex);
  handleLoopReset();
}

// Buttons
rightBtn.addEventListener('click', () => {
  goRight();
  resetAutoScroll();
});

leftBtn.addEventListener('click', () => {
  goLeft();
  resetAutoScroll();
});

// ----------------------------------------------------
// 5. Auto scroll
// ----------------------------------------------------
function startAutoScroll() {
  autoScrollInterval = setInterval(() => {
    goRight();
  }, 7000);
}

function stopAutoScroll() {
  clearInterval(autoScrollInterval);
}

function resetAutoScroll() {
  stopAutoScroll();
  startAutoScroll();
}

// Pause on hover
container.addEventListener('mouseenter', stopAutoScroll);
container.addEventListener('mouseleave', startAutoScroll);

// ----------------------------------------------------
// 6. Start
// ----------------------------------------------------
startAutoScroll();