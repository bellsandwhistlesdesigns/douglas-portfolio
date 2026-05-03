console.log("leftandright.js loaded");

const container = document.querySelector('.card-container');
const cards = document.querySelectorAll('.card');
const leftBtn = document.querySelector('.nav-btn.left');
const rightBtn = document.querySelector('.nav-btn.right');

let currentIndex = 0;

function scrollToCard(index) {
  const cardWidth = cards[0].offsetWidth + 20; // include gap
  container.scrollTo({
    left: cardWidth * index,
    behavior: 'smooth'
  });
}

rightBtn.addEventListener('click', () => {
  if (currentIndex < cards.length - 1) {
    currentIndex++;
    scrollToCard(currentIndex);
  }
});

leftBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    scrollToCard(currentIndex);
  }
});