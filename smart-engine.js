/**
 * BREVVO ECOSYSTEM — Модуль упреждающего предиктора кликов и оффлайн-стабилизации
 * Разработчик архитектуры: Даниил Лисенков (c) 2026
 */

(function() {
    // ==========================================================================
    // 1. УМНЫЙ ПРЕДСКАЗАТЕЛЬ КЛИКОВ (PREDICTION ENGINE)
    // ==========================================================================
    const preheatedLinks = new Set();

    function preheatPage(url) {
        if (!url || preheatedLinks.has(url)) return;
        
        // Проверяем, что ссылка ведет на внутреннюю страницу тарифа
        const targetFile = url.split('/').pop();
        const currentFile = window.location.pathname.split('/').pop();
        if (targetFile === currentFile || !targetFile.endsWith('.html')) return;

        console.log(`BREVVO ENGINE: Намерение считано. Упреждающий разогрев страницы: ${targetFile}`);
        
        // Создаем скрытый линк предварительного рендеринга в памяти GPU
        const prefetchLink = document.createElement('link');
        prefetchLink.rel = 'prefetch';
        prefetchLink.href = targetFile;
        document.head.appendChild(prefetchLink);
        
        preheatedLinks.add(url);
    }

    document.addEventListener('DOMContentLoaded', () => {
        // Ловим наведение мыши (для ПК) и касание пальца (для смартфонов)
        const navButtons = document.querySelectorAll('.liquid-nav-panel a, .inner-tab-panel button');
        
        navButtons.forEach(btn => {
            const href = btn.getAttribute('href');
            
            // Как только палец опустился на кнопку (touchstart), за 150мс до отрыва пальца (click) качаем страницу
            btn.addEventListener('touchstart', () => { if(href) preheatPage(href); }, { passive: true });
            
            // Для ноутбуков: как только курсор мыши зашел на территорию кнопки
            btn.addEventListener('mouseenter', () => { if(href) preheatPage(href); }, { passive: true });
        });
    });

    // ==========================================================================
    // 2. МОДУЛЬ ОФФЛАЙН-СТАБИЛИЗАЦИИ (NETWORK SHIELD)
    // ==========================================================================
    function createOfflineBanner() {
        if (document.getElementById('brevvoOfflineBanner')) return;

        const banner = document.createElement('div');
        banner.id = 'brevvoOfflineBanner';
        
        // Стилизуем строго в нашей приглушенной темной DDX-гамме без вмешательства в style.css
        Object.assign(banner.style, {
            position: 'fixed',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%) translateY(-100px)',
            background: 'rgba(4, 6, 5, 0.95)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderLeft: '4px solid #b39b74',
            borderRadius: '12px',
            padding: '16px 24px',
            color: '#ffffff',
            fontFamily: 'sans-serif',
            fontSize: '13px',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            zIndex: '5000',
            boxShadow: '0 20px 40px rgba(0,0,0,0.9)',
            backdropFilter: 'blur(20px)',
            webkitBackdropFilter: 'blur(20px)',
            transition: 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            width: 'max-content',
            maxWidth: '90vw'
        });

        banner.innerHTML = `
            <span style="color: #b39b74; font-weight: bold;">●</span> 
            <span>BREVVO Экосистема: Сеть просела. Автономный режим активен. Сметы и фото доступны на 100%</span>
        `;
        
        document.body.appendChild(banner);
        
        // Мягко опускаем плашку сверху
        setTimeout(() => { banner.style.transform = 'translateX(-50%) translateY(0)'; }, 100);
    }

    function removeOfflineBanner() {
        const banner = document.getElementById('brevvoOfflineBanner');
        if (banner) {
            banner.style.transform = 'translateX(-50%) translateY(-100px)';
            setTimeout(() => { banner.remove(); }, 600);
        }
    }

    // Слушатели системных прерываний связи смартфона
    window.addEventListener('offline', createOfflineBanner);
    window.addEventListener('online', removeOfflineBanner);

    // Проверка статуса при первичной загрузке
    if (!navigator.onLine) {
        document.addEventListener('DOMContentLoaded', createOfflineBanner);
    }
})();
