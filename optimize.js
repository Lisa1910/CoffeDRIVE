/**
 * BREVVO ECOSYSTEM — Резиновая оптимизация и Luxury Авто-Перезапуск обновлений
 * Разработчик архитектуры: Даниил Лисенков (c) 2026
 */

// 0. ПРИНУДИТЕЛЬНЫЙ КОРНЕВОЙ ИНЖЕКТ КИБЕР-ЩИТОВ И ЭКСПОРТЕРОВ
if (!document.querySelector('script[src="app-shield.js"]')) {
    const shieldScript = document.createElement('script');
    shieldScript.src = 'app-shield.js';
    document.head.appendChild(shieldScript);
}
if (!document.querySelector('script[src="smart-engine.js"]')) {
    const smartScript = document.createElement('script');
    smartScript.src = 'smart-engine.js';
    document.head.appendChild(smartScript);
}
if (!document.querySelector('script[src="pdf-export.js"]')) {
    const pdfScript = document.createElement('script');
    pdfScript.src = 'pdf-export.js';
    document.head.appendChild(pdfScript);
}

document.addEventListener("DOMContentLoaded", () => {
    // 1. АВТОМАТИЧЕСКИЙ ИНЖЕКТОР КНОПКИ РЕЖИМОВ С СОХРАНЕНИЕМ СОСТОЯНИЯ
    if (!document.querySelector('.theme-toggle-container')) {
        const toggleContainer = document.createElement('div');
        toggleContainer.className = 'theme-toggle-container';
        
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'theme-toggle-btn';
        toggleBtn.id = 'themeToggleBtn';
        
        toggleContainer.appendChild(toggleBtn);
        document.body.appendChild(toggleContainer);

        const currentTheme = localStorage.getItem('brevvo-theme') || 'dark';
        if (currentTheme === 'light') {
            document.body.classList.add('light-theme');
            toggleBtn.textContent = 'Mode: Light';
        } else {
            toggleBtn.textContent = 'Mode: Dark';
        }

        toggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            let theme = 'dark';
            if (document.body.classList.contains('light-theme')) {
                theme = 'light';
                toggleBtn.textContent = 'Mode: Light';
            } else {
                toggleBtn.textContent = 'Mode: Dark';
            }
            localStorage.setItem('brevvo-theme', theme);
        });
    }

    // 2. АППАРАТНОЕ УСКОРЕНИЕ (GPU RENDERING)
    const premiumCards = document.querySelectorAll(".premium-card, .premium-table-wrap, .liquid-nav-panel");
    premiumCards.forEach(card => {
        card.style.willChange = "transform, opacity";
        card.style.transform = "translateZ(0)"; 
    });

    // 3. МЯГКОЕ ПРОЯВЛЕНИЕ РЕНДЕРОВ
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        const img = item.querySelector('img');
        if (!img) return;
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1)';

        function handleImageLoad() { img.style.opacity = '1'; }
        if (img.complete) handleImageLoad(); else img.addEventListener('load', handleImageLoad);
    });

    // 4. ОПТИМИЗАЦИЯ ТЯЖЕЛОГО СКРОЛЛА
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
        }, { passive: true });
    }

    // 5. ЛЕЗИ-РЕНДЕР СКРЫТЫХ ВКЛАДОК СМЕТ
    const tabTriggers = document.querySelectorAll(".tab-trigger-btn");
    tabTriggers.forEach(btn => {
        btn.addEventListener("click", () => {
            setTimeout(() => { window.dispatchEvent(new Event('resize')); }, 30);
        });
    });
});

// 6. СИСТЕМНАЯ РЕГИСТРАЦИЯ ИНТЕЛЛЕКТУАЛЬНОГО СВЕТОФОРА КЭША С АВТООБНОВЛЕНИЕМ
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').then((reg) => {
            console.log('BREVVO SMART CORE: Движок автообновлений активен.');

            reg.addEventListener('updatefound', () => {
                const newWorker = reg.installing;
                newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        console.log('BREVVO SMART CORE: Новое ПО обнаружено. Запуск автообновления...');
                        newWorker.postMessage('skipWaiting');
                    }
                });
            });
        }).catch((err) => console.log('BREVVO SMART CORE: Ошибка ядра:', err));
    });

    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!refreshing) {
            refreshing = true;
            console.log('BREVVO SMART CORE: Страница перезапускается на новую версию ПО...');
            window.location.reload();
        }
    });
}
