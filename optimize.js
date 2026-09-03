/**
 * BREVVO ECOSYSTEM — Модуль аппаратного пререндера и мягкой загрузки медиа
 * Разработчик архитектуры: Даниил Лисенков (c) 2026
 */

// Автоматический запуск ИТ-щита и предиктора кликов Даниила Лисенкова
const smartScript = document.createElement('script');
smartScript.src = 'smart-engine.js';
document.head.appendChild(smartScript);

document.addEventListener("DOMContentLoaded", () => {
    // 1. ПРИНУДИТЕЛЬНОЕ АППАРАТНОЕ УСКОРЕНИЕ (ПЕРЕВОД НА ВИДЕОКАРТУ GPU)
    const premiumCards = document.querySelectorAll(".premium-card, .premium-table-wrap, .liquid-nav-panel, .gallery-item");
    premiumCards.forEach(card => {
        card.style.willChange = "transform, opacity";
        card.style.transform = "translateZ(0)"; 
    });

    // 2. ИСТРЕБИТЕЛЬ КУСОЧНОЙ ЗАГРУЗКИ КАРТИНОК (BLUR PRELOADER & FADE-IN)
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        const img = item.querySelector('img');
        if (!img) return;

        // Накладываем на контейнер мягкое матовое размытие, пока картинка качается в память
        item.style.backgroundColor = 'rgba(255,255,255,0.02)';
        item.style.backdropFilter = 'blur(10px)';
        item.style.webkitBackdropFilter = 'blur(10px)';
        
        // Прячем рваную послойную загрузку (делаем картинку временно невидимой)
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1), transform 1.2s cubic-bezier(0.25, 1, 0.5, 1)';

        // Функция мягкого проявления, когда файл скачан на 100%
        function handleImageLoad() {
            item.style.backdropFilter = 'none';
            item.style.webkitBackdropFilter = 'none';
            img.style.opacity = '1'; // Плавно проявляем готовую картинку целиком
        }

        if (img.complete) {
            handleImageLoad();
        } else {
            img.addEventListener('load', handleImageLoad);
        }
    });

    // 3. УПРЕЖДАЮЩЕЕ ФОНОВОЕ СКАЧИВАНИЕ СМЕЖНЫХ СТРАНИЦ ТАРИФОВ (PREFETCH)
    const nextPages = ['index.html', 'base.html', 'universal.html', 'pro.html'];
    nextPages.forEach(page => {
        const currentFile = window.location.pathname.split("/").pop();
        if (currentFile !== page && !document.querySelector(`link[href="${page}"]`)) {
            const prefetchLink = document.createElement('link');
            prefetchLink.rel = 'prefetch';
            prefetchLink.href = page;
            document.head.appendChild(prefetchLink);
        }
    });

    // 4. ОПТИМИЗАЦИЯ ТЯЖЕЛОГО СКРОЛЛА (THROTTLING)
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

    // 5. ДИНАМИЧЕСКИЙ ЛЕНИВЫЙ РЕНДЕР СКРЫТЫХ ВКЛАДОК СМЕТ
    const tabTriggers = document.querySelectorAll(".tab-trigger-btn");
    tabTriggers.forEach(btn => {
        btn.addEventListener("click", () => {
            setTimeout(() => { window.dispatchEvent(new Event('resize')); }, 30);
        });
    });
});

// 6. ИНИЦИАЛИЗАЦИЯ И РЕГИСТРАЦИЯ ТУРБО-КЭША (БЛОКИРАТОР TLS-РУКОПОЖАТИЙ)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then((reg) => console.log('BREVVO ENGINE: Кэш запущен. Сетевые задержки ликвидированы.', reg.scope))
            .catch((err) => console.log('BREVVO ENGINE: Сбой кэш-модуля:', err));
    });
}
