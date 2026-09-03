document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll('.slide');
    const timeline = document.getElementById('timeline');
    let currentSlide = 0;

    // Проверка на наличие слайдов в верстке
    if (slides.length === 0) {
        console.error("Ошибка: Слайды с классом .slide не найдены в HTML-файле.");
        return;
    }

    // Автоматическая генерация верхней навигационной шкалы
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('nav-dot');
        if (index === 0) dot.classList.add('active');
        
        // Клик по полоске сверху переключает на нужный слайд
        dot.addEventListener('click', () => goToSlide(index));
        timeline.appendChild(dot);
    });

    const dots = document.querySelectorAll('.nav-dot');

    // Функция плавного Slow-Mo перехода
    function goToSlide(index) {
        if (index < 0 || index >= slides.length) return;
        
        // Убираем активные классы с текущего слайда
        slides[currentSlide].classList.remove('active');
        if (dots[currentSlide]) dots[currentSlide].classList.remove('active');
        
        // Меняем индекс страницы
        currentSlide = index;
        
        // Добавляем активные классы на новый слайд
        slides[currentSlide].classList.add('active');
        if (dots[currentSlide]) dots[currentSlide].classList.add('active');
    }

    // Включение полноценного переключения по стрелкам клавиатуры
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'Right') {
            goToSlide(currentSlide + 1);
        } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
            goToSlide(currentSlide - 1);
        }
    });
});
