/**
 * BREVVO ECOSYSTEM — Модуль аппаратной оптимизации производительности
 * Разработчик архитектуры: Даниил Лисенков (c) 2026
 */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Принудительное включение аппаратного ускорения видеокарты (GPU)
    const premiumCards = document.querySelectorAll(".premium-card, .premium-table-wrap, .liquid-nav-panel");
    premiumCards.forEach(card => {
        card.style.willChange = "transform, opacity";
        card.style.transform = "translateZ(0)"; // Включает 3D-рендеринг на видеокарте
    });

    // 2. Оптимизация тяжелого скролла (Линия прогресса чтения) с защитой от лагов (Throttling)
    const progressBar = document.getElementById('progressBar');
    let isScrolling = false;

    if (progressBar) {
        window.addEventListener('scroll', () => {
            if (!isScrolling) {
                window.requestAnimationFrame(() => {
                    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
                    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                    const scrolled = (winScroll / height) * 100;
                    progressBar.style.width = scrolled + '%';
                    isScrolling = false;
                });
                isScrolling = true;
            }
        }, { passive: true }); // passive: true убирает задержку тача на смартфонах
    }

    // 3. Динамическая ленивая подгрузка таблиц (Убирает лаги скрытых вкладок)
    const tabTriggers = document.querySelectorAll(".tab-trigger-btn");
    tabTriggers.forEach(btn => {
        btn.addEventListener("click", () => {
            // Даем видеокарте 50мс на мягкое переключение прозрачности, убирая микрофризы
            setTimeout(() => {
                window.dispatchEvent(new Event('resize')); 
            }, 50);
        });
    });
// 4. ИНИЦИАЛИЗАЦИЯ И РЕГИСТРАЦИЯ ТУРБО-КЭША (БЛОКИРАТОР TLS-РУКОПОЖАТИЙ)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then((registration) => {
                console.log('BREVVO CACHE: Движок успешно активирован. TLS-лаги заблокированы.', registration.scope);
            })
            .catch((error) => {
                console.log('BREVVO CACHE: Ошибка запуска кэш-движка:', error);
            });
    });
}
