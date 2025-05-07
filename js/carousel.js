document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.testimonial-carousel');
    if (!carousel) return;

    const track = carousel.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = carousel.querySelector('.carousel-button.next');
    const prevButton = carousel.querySelector('.carousel-button.prev');
    const dotsNav = carousel.querySelector('.carousel-dots');

    if (!track || !nextButton || !prevButton || !dotsNav || slides.length === 0) {
        console.error("Carousel elements not found.");
        return;
    }

    // Состояние карусели
    let currentIndex = 0;
    let slidesToShow = 2;
    let totalPages = Math.ceil(slides.length / slidesToShow);
    let isAnimating = false;

    // Инициализация слайдов
    const initSlides = () => {
        slides.forEach((slide, index) => {
            slide.style.flex = `0 0 ${100 / slidesToShow}%`;
            slide.style.maxWidth = `${100 / slidesToShow}%`;
        });
    };

    // Создаём точки навигации
    const createDots = () => {
        dotsNav.innerHTML = '';
        totalPages = Math.ceil(slides.length / slidesToShow);

        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('button');
            dot.className = 'carousel-dot';
            dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
            dot.addEventListener('click', () => goToSlide(i));
            dotsNav.appendChild(dot);
        }
        updateDots();
    };

    // Обновляем активную точку
    const updateDots = () => {
        const dots = dotsNav.querySelectorAll('.carousel-dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    };

    // Переход к конкретному слайду
    const goToSlide = (index) => {
        if (isAnimating || index === currentIndex) return;

        // Ограничиваем индекс
        const newIndex = Math.max(0, Math.min(index, totalPages - 1));
        
        isAnimating = true;
        currentIndex = newIndex;
        
        // Рассчитываем смещение
        const offset = -currentIndex * (100 / slidesToShow);
        track.style.transform = `translateX(${offset}%)`;
        
        // Обновляем UI после анимации
        setTimeout(() => {
            updateDots();
            updateNavButtons();
            isAnimating = false;
        }, 300); // Должно совпадать с длительностью CSS-анимации
    };

    // Обновляем состояние кнопок
    const updateNavButtons = () => {
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex === totalPages - 1;
    };

    // Адаптация под размер экрана
    const handleResize = () => {
        const newSlidesToShow = window.innerWidth < 768 ? 1 : 2;
        
        if (newSlidesToShow !== slidesToShow) {
            slidesToShow = newSlidesToShow;
            initSlides();
            createDots();
            
            // Корректируем текущий индекс
            const newTotalPages = Math.ceil(slides.length / slidesToShow);
            if (currentIndex >= newTotalPages) {
                currentIndex = Math.max(0, newTotalPages - 1);
            }
            
            goToSlide(currentIndex);
        }
    };

    // Оптимизация ресайза
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(handleResize, 150);
    });

    // Инициализация
    initSlides();
    createDots();
    updateNavButtons();

    // Обработчики кнопок
    nextButton.addEventListener('click', () => goToSlide(currentIndex + 1));
    prevButton.addEventListener('click', () => goToSlide(currentIndex - 1));
});