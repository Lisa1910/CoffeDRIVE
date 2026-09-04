/**
 * BREVVO ECOSYSTEM — Монолитное ИТ-Ядро, Оптимизация и Интерактивные Люкс-Сервисы
 * Разработчик архитектуры: Даниил Лисенков (c) 2026
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. АВТОМАТИЧЕСКИЙ ИНЖЕКТОР КНОПКИ РЕЖИМОВ (LIGHT / DARK)
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
                theme = 'dark';
                toggleBtn.textContent = 'Mode: Dark';
            }
            localStorage.setItem('brevvo-theme', theme);
        });
    }

    // 2. ИНЖЕКТОР СТРОГОЙ КНОПКИ PDF-ЭКСПОРТА (BUGATTI STYLE)
    const currentFile = window.location.pathname.split("/").pop();
    const isMainPage = (currentFile === 'index.html' || currentFile === '');
    const titleWrap = document.querySelector('.title-wrap');

    if (!isMainPage && titleWrap && !document.querySelector('.pdf-export-container')) {
        const exportContainer = document.createElement('div');
        exportContainer.className = 'pdf-export-container';

        const exportBtn = document.createElement('button');
        exportBtn.className = 'pdf-export-btn';
        exportBtn.textContent = '[ Export Executive Summary PDF ]';

        exportBtn.addEventListener('click', () => { window.print(); });

        exportContainer.appendChild(exportBtn);
        titleWrap.appendChild(exportContainer);
    }
    // 3. ЖИВОЙ МАТЕМАТИЧЕСКИЙ КАЛЬКУЛЯТОР ОКУПАЕМОСТИ ДЛЯ ИНВЕСТОРОВ
    const tables = document.querySelectorAll('.premium-table');
    let targetTable = null;
    const isProPage = document.body.classList.contains('page-pro');
    const isUniversalPage = document.body.classList.contains('page-universal');
    const isBasePage = document.body.classList.contains('page-base');

    if (!isMainPage && (isBasePage || isUniversalPage || isProPage)) {
        tables.forEach(table => {
            if (table.textContent.includes('Количество чеков в сутки') && table.textContent.includes('Чистая прибыль')) {
                targetTable = table;
            }
        });

        if (targetTable && !document.getElementById('sliderVolume')) {
            const calcContainer = document.createElement('div');
            calcContainer.className = 'premium-card';
            calcContainer.style.marginTop = '30px';
            calcContainer.style.marginBottom = '25px';
            calcContainer.style.border = '1px dashed var(--color-accent)';
            calcContainer.style.boxShadow = 'none';

            let defaultVolume = isBasePage ? 125 : (isUniversalPage ? 210 : 250);
            let defaultPrice = isBasePage ? 350 : (isUniversalPage ? 450 : 600);
            let minVolume = isBasePage ? 30 : (isUniversalPage ? 50 : 80);
            let maxVolume = isBasePage ? 250 : (isUniversalPage ? 400 : 500);
            let minPrice = isBasePage ? 200 : (isUniversalPage ? 300 : 400);
            let maxPrice = isBasePage ? 600 : (isUniversalPage ? 800 : 1000);
            let fixedOpex = isBasePage ? 310000 : (isUniversalPage ? 640000 : 1100000);
            let taxRate = isBasePage ? 0.06 : (isUniversalPage ? 0.06 : 0.125);
            let totalInvestment = isBasePage ? 2350000 : (isUniversalPage ? 5500000 : 12500000);

            calcContainer.innerHTML = `
                <div class="card-label">[ Interactive ROI Simulator ]</div>
                <div class="card-value" style="font-size: 1.3rem; margin-bottom: 2rem;">Смоделируйте доходность под Ваши показатели</div>
                <div style="margin-bottom: 1.8rem;">
                    <div style="display:flex; justify-content:space-between; margin-bottom: 0.5rem; font-size: 0.9rem;">
                        <span style="color: var(--text-dim);">Продажи в сутки:</span>
                        <strong id="calcVolVal" style="color: var(--color-accent); font-family: var(--font-premium);">${defaultVolume} чеков</strong>
                    </div>
                    <input type="range" id="sliderVolume" min="${minVolume}" max="${maxVolume}" value="${defaultVolume}" style="width:100%; accent-color: var(--color-accent); background: rgba(255,255,255,0.05); height: 4px; cursor:pointer;">
                </div>
                <div style="margin-bottom: 0.5rem;">
                    <div style="display:flex; justify-content:space-between; margin-bottom: 0.5rem; font-size: 0.9rem;">
                        <span style="color: var(--text-dim);">Средний чек (кофе + выпечка):</span>
                        <strong id="calcPriceVal" style="color: var(--color-accent); font-family: var(--font-premium);">${defaultPrice} ₽</strong>
                    </div>
                    <input type="range" id="sliderPrice" min="${minPrice}" max="${maxPrice}" value="${defaultPrice}" style="width:100%; accent-color: var(--color-accent); background: rgba(255,255,255,0.05); height: 4px; cursor:pointer;">
                </div>
            `;

            targetTable.parentNode.parentNode.insertBefore(calcContainer, targetTable.parentNode);

            const sliderVolume = document.getElementById('sliderVolume');
            const sliderPrice = document.getElementById('sliderPrice');
            const calcVolVal = document.getElementById('calcVolVal');
            const calcPriceVal = document.getElementById('calcPriceVal');
            const rows = targetTable.querySelectorAll('tbody tr');
            
            function updateFinancialModel() {
                const vol = parseInt(sliderVolume.value);
                const price = parseInt(sliderPrice.value);
                calcVolVal.textContent = `${vol} чеков`;
                calcPriceVal.textContent = `${price} ₽`;

                const monthlyRevenue = Math.round(vol * price * 30);
                const foodcost = Math.round(monthlyRevenue * 0.35);
                const taxes = Math.round(monthlyRevenue * taxRate);
                const netProfit = monthlyRevenue - foodcost - fixedOpex - taxes;

                let roiPeriod = "";
                if (netProfit <= 0) { roiPeriod = "Вне зоны окупаемости"; } else {
                    const months = Math.ceil(totalInvestment / netProfit);
                    if (months < 12) { roiPeriod = `${months} месяцев`; } else {
                        const years = (months / 12).toFixed(1);
                        roiPeriod = `~ ${years} г. (${months} мес.)`;
                    }
                }

                rows.forEach(row => {
                    const label = row.cells[0].textContent.trim();
                    let cellIndex = 2;
                    if (isBasePage) cellIndex = 2;
                    
                    if (label.includes('Количество чеков в сутки')) {
                        row.cells[cellIndex].innerHTML = `<strong>${vol} чеков</strong>`;
                    } else if (label.includes('Средний чек')) {
                        row.cells[cellIndex].innerHTML = `<strong>${price} ₽</strong>`;
                    } else if (label.includes('Валовая выручка в месяц')) {
                        row.cells[cellIndex].innerHTML = `<strong>${monthlyRevenue.toLocaleString()} ₽</strong>`;
                    } else if (label.includes('Foodcost')) {
                        row.cells[cellIndex].innerHTML = `${foodcost.toLocaleString()} ₽`;
                    } else if (label.includes('Налоги и эквайринг')) {
                        row.cells[cellIndex].innerHTML = `${taxes.toLocaleString()} ₽`;
                    } else if (row.classList.contains('row-total')) {
                        const profitCell = row.cells[row.cells.length - 1];
                        if (netProfit <= 0) {
                            profitCell.style.setProperty('color', '#cc7a7a', 'important');
                            profitCell.innerHTML = `<strong>${netProfit.toLocaleString()} ₽</strong>`;
                        } else {
                            profitCell.style.setProperty('color', '#83cc83', 'important');
                            profitCell.innerHTML = `<strong>${netProfit.toLocaleString()} ₽</strong>`;
                        }
                    } else if (label.includes('Период возврата инвестиций')) {
                        row.cells[cellIndex].innerHTML = `<strong>${roiPeriod}</strong>`;
                    }
                });
            }
            sliderVolume.addEventListener('input', updateFinancialModel);
            sliderPrice.addEventListener('input', updateFinancialModel);
        }
    }
    // 4. АППАРАТНОЕ УСКОРЕНИЕ (GPU RENDERING) И МЯГКОЕ ПРОЯВЛЕНИЕ ФОТОГРАФИЙ
    const premiumCards = document.querySelectorAll(".premium-card, .premium-table-wrap, .liquid-nav-panel");
    premiumCards.forEach(card => {
        card.style.willChange = "transform, opacity";
        card.style.transform = "translateZ(0)"; 
    });

    const galleryImages = document.querySelectorAll('.gallery-item img');
    galleryImages.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1)';
        function handleImageLoad() { img.style.opacity = '1'; }
        if (img.complete) handleImageLoad(); else img.addEventListener('load', handleImageLoad);
    });

    // 5. ОПТИМИЗАЦИЯ СКРОЛЛА И ЛЕЗИ-РЕНДЕР ВКЛАДОК СМЕТ
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

    const tabTriggers = document.querySelectorAll(".tab-trigger-btn");
    tabTriggers.forEach(btn => {
        btn.addEventListener("click", () => {
            setTimeout(() => { window.dispatchEvent(new Event('resize')); }, 35);
        });
    });
});

// 6. СКВОЗНОЙ АВТОМАТИЧЕСКИЙ ЗАПУСК КИБЕР-ЩИТА И ПРЕДИКТОРОВ КЛИКОВ
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
