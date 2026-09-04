/**
 * BREVVO ECOSYSTEM — Модуль фиксации вьюпорта, защиты ИС от F12 и оптимизации лагов
 * Разработчик архитектуры: Даниил Лисенков (c) 2026
 */

(function() {
    // 1. ЖЕСТКАЯ ФИКСАЦИЯ И БЛОКИРОВКА БОЛТАНИЯ ЭКРАНА (АНТИ-ЛЮФТ ДВУМЯ ПАЛЬЦАМИ)
    document.addEventListener('touchstart', (e) => {
        if (e.touches.length > 1) {
            e.preventDefault(); // На корню блокирует зум и болтание сайта двумя пальцами
        }
    }, { passive: false });

    document.addEventListener('gesturestart', (e) => {
        e.preventDefault(); // Защита от случайного масштабирования на Айфонах
    });

    // Блокируем горизонтальный увод макета пальцем (overscroll по оси X)
    window.addEventListener('scroll', () => {
        if (window.scrollX !== 0) {
            window.scrollTo(0, window.scrollY);
        }
    }, { passive: true });


    // 2. КИБЕР-ЩИТ ОТ ПРОСМОТРА КОДА (БЛОКИРОВКА F12, КОНСОЛИ И КЛИКОВ)
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault(); // Полностью отключает правую кнопку мыши (Исследовать элемент)
    });

    document.addEventListener('keydown', (e) => {
        // Блокируем F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C, Ctrl+U (Просмотр кода)
        if (
            e.keyCode === 123 || 
            (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) || 
            (e.ctrlKey && e.keyCode === 85) ||
            (e.metaKey && e.altKey && e.keyCode === 73) // Для Mac (Cmd + Opt + I)
        ) {
            e.preventDefault();
            return false;
        }
    });

    // Выжигание консоли: если хакер открыл F12 заранее, скрипт будет бесконечно спамить и тереть память
    setInterval(() => {
        console.clear();
        console.log('%cBREVVO SECURITY: Доступ к исходному коду заблокирован правообладателем Даниилом Лисенковым.', 'color: #ff8b8b; font-size: 14px; font-weight: bold;');
    }, 100);
})();
