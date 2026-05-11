console.log("leftandright.js loaded");

const sliders = document.querySelectorAll('.projects-wrapper');

sliders.forEach((slider) => {

    const section = slider.closest('section');

    const isLooping = section.classList.contains('loop-slider');

    const container = slider.querySelector('.card-container');
    const cards = slider.querySelectorAll('.card, .card-contributions');

    const leftBtn = slider.querySelector('.nav-btn.left');
    const rightBtn = slider.querySelector('.nav-btn.right');

    const cardCount = cards.length;

    let currentIndex = 0;
    let autoScrollInterval = null;

    // ----------------------------------------
    // Clone cards ONLY for looping sliders
    // ----------------------------------------
    if (isLooping) {

        cards.forEach(card => {

            const clone = card.cloneNode(true);

            container.appendChild(clone);

        });
    }

    // ----------------------------------------
    // Scroll to card
    // ----------------------------------------
    function scrollToIndex(index, smooth = true) {

        const cardWidth = cards[0].offsetWidth + 20;

        container.scrollTo({
            left: cardWidth * index,
            behavior: smooth ? 'smooth' : 'auto'
        });
    }

    // ----------------------------------------
    // Infinite loop reset
    // ----------------------------------------
    function handleLoopReset() {

        const cardWidth = cards[0].offsetWidth + 20;

        // End reached → reset to start
        if (currentIndex >= cardCount) {

            setTimeout(() => {

                container.scrollTo({
                    left: 0,
                    behavior: 'auto'
                });

                currentIndex = 0;

            }, 400);
        }

        // Start reached → jump to end
        if (currentIndex < 0) {

            container.scrollTo({
                left: cardWidth * (cardCount - 1),
                behavior: 'auto'
            });

            currentIndex = cardCount - 1;
        }
    }

    // ----------------------------------------
    // RIGHT
    // ----------------------------------------
    function goRight() {

    // FEATURED LOOPING SECTION
    if (isLooping) {

        currentIndex++;

        scrollToIndex(currentIndex);

        handleLoopReset();

        return;
    }

    // CONTRIBUTIONS SECTION
    currentIndex = (currentIndex + 1) % cardCount;

    scrollToIndex(currentIndex);
    }

    // ----------------------------------------
    // LEFT
    // ----------------------------------------
    function goLeft() {

    // FEATURED LOOPING SECTION
    if (isLooping) {

        currentIndex--;

        scrollToIndex(currentIndex);

        handleLoopReset();

        return;
    }

    // CONTRIBUTIONS SECTION
    currentIndex = (currentIndex - 1 + cardCount) % cardCount;

    scrollToIndex(currentIndex);
    }

    // ----------------------------------------
    // Button Events
    // ----------------------------------------
    rightBtn.addEventListener('click', () => {

        goRight();

        if (isLooping) {
            resetAutoScroll();
        }
    });

    leftBtn.addEventListener('click', () => {

        goLeft();

        if (isLooping) {
            resetAutoScroll();
        }
    });

    // ----------------------------------------
    // Auto Scroll
    // ----------------------------------------
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

    // ----------------------------------------
    // Hover Pause ONLY for looping sliders
    // ----------------------------------------
    if (isLooping) {

        container.addEventListener('mouseenter', stopAutoScroll);

        container.addEventListener('mouseleave', startAutoScroll);

        startAutoScroll();
    }

});