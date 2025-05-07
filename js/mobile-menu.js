document.addEventListener('DOMContentLoaded', function() {
    // Находим элементы для работы с мобильным меню
    const burgerButton = document.getElementById('burger-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const closeMenuButton = document.querySelector('.close-menu-button');
    
    // Функция для открытия мобильного меню
    function openMobileMenu() {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden'; // Предотвращаем прокрутку страницы при открытом меню
    }
    
    // Функция для закрытия мобильного меню
    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = ''; // Возвращаем нормальную прокрутку
    }
    
    // Дополнительная функция для принудительного отображения бургер-меню на мобильных
    function forceMenuResponsiveness() {
        const viewportWidth = window.innerWidth;
        const burgerMenuButton = document.getElementById('burger-menu-button');
        const desktopNav = document.querySelector('.v8203_59718');
        const desktopButtons = document.querySelector('.v8203_59730');
        
        // Проверяем ширину экрана для определения мобильного/десктопного режима
        if (viewportWidth <= 768) {
            // Мобильный режим
            if (burgerMenuButton) burgerMenuButton.style.display = 'flex';
            if (desktopNav) desktopNav.style.display = 'none';
            if (desktopButtons) desktopButtons.style.display = 'none';
        } else {
            // Десктопный режим
            if (burgerMenuButton) burgerMenuButton.style.display = 'none';
            if (desktopNav) desktopNav.style.display = 'flex';
            if (desktopButtons) desktopButtons.style.display = 'flex';
            // Закрываем мобильное меню при переходе на десктоп
            closeMobileMenu();
        }
    }
    
    // Вызываем функцию при загрузке страницы
    forceMenuResponsiveness();
    
    // Добавляем слушатель события изменения размера окна
    window.addEventListener('resize', forceMenuResponsiveness);
    
    // Добавляем обработчики событий
    if (burgerButton) {
        burgerButton.addEventListener('click', openMobileMenu);
    }
    
    if (closeMenuButton) {
        closeMenuButton.addEventListener('click', closeMobileMenu);
    }
    
    // Закрытие меню по клику на оверлей
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', closeMobileMenu);
    }
    
    // Закрытие меню по клику на пункты меню
    const mobileMenuItems = document.querySelectorAll('.mobile-menu-nav .v8203_59898, .mobile-menu-nav .v8203_59900, .mobile-menu-nav .v8203_59902');
    
    mobileMenuItems.forEach(item => {
        item.addEventListener('click', closeMobileMenu);
    });
    
    // Закрытие меню по клику на кнопки в меню
    const mobileMenuButtons = document.querySelectorAll('#mobile-header-cta1, #mobile-header-cta2');
    
    mobileMenuButtons.forEach(button => {
        button.addEventListener('click', closeMobileMenu);
    });
    
    // Закрытие меню по клику вне меню
    document.addEventListener('click', function(event) {
        if (mobileMenu.classList.contains('active') && 
            !mobileMenu.contains(event.target) && 
            event.target !== burgerButton && 
            !burgerButton.contains(event.target)) {
            closeMobileMenu();
        }
    });
    
    // Для отладки
    console.log('Mobile menu script loaded with responsive support');
}); 