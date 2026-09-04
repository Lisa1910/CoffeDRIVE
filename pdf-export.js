/**
 * BREVVO ECOSYSTEM — Модуль генерации официальных PDF-смет А4
 * Разработчик архитектуры: Даниил Лисенков (c) 2026
 */

(function() {
    // Внедряем стили для печатной версии А4 прямо в память, чтобы скрыть лишние элементы UI
    const printStyles = document.createElement('style');
    printStyles.innerHTML = `
        @media print {
            /* Прячем все интерактивные кнопки, тумблеры и меню при генерации PDF */
            .liquid-nav-panel, 
            .theme-toggle-container, 
            .inner-tab-panel, 
            .pdf-export-container,
            .scroll-progress { 
                display: none !important; 
            }
            
            /* Принудительно открываем скрытые вкладки, чтобы в PDF ушли И Концепция, И Сметы */
            .tab-content-view { 
                display: block !important; 
                opacity: 1 !important;
            }
            
            /* Сбрасываем темный фон на чистый белый бумажный А4 для экономии краски */
            body, .presentation-wrapper, .premium-card {
                background: #ffffff !important;
                color: #000000 !important;
                box-shadow: none !important;
                padding: 0 !important;
                margin: 0 !important;
            }
            
            .slide-section {
                padding: 20mm 0 !important;
                page-break-after: always; /* Каждый крупный блок сметы — с новой страницы А4 */
            }
            
            /* Делаем таблицы смет идеально контрастными в PDF */
            .premium-table-wrap {
                border: 1px solid #000000 !important;
                background: #ffffff !important;
            }
            .premium-table th, .premium-table td {
                color: #000000 !important;
                border-bottom: 1px solid #e5e5e5 !important;
                padding: 10px !important;
            }
            .premium-table th {
                background: #f5f5f7 !important;
                font-weight: bold !important;
            }
        }
    `;
    document.head.appendChild(printStyles);

    // Автоматический инжектор кнопки экспорта на экран
    document.addEventListener('DOMContentLoaded', () => {
        // Кнопку добавляем только на страницы тарифов (на главной index.html она не нужна)
        const currentFile = window.location.pathname.split("/").pop();
        if (currentFile === 'index.html' || currentFile === '') return;

        const titleWrap = document.querySelector('.title-wrap');
        if (!titleWrap) return;

        const exportContainer = document.createElement('div');
        exportContainer.className = 'pdf-export-container';
        
        // Стилизуем кнопку строго в рамках нашей геометрии Bugatti-Style
        Object.assign(exportContainer.style, {
            marginTop: '1.5rem',
            display: 'flex',
            justifyContent: 'flex-start'
        });

        const exportBtn = document.createElement('button');
        exportBtn.className = 'pdf-export-btn';
        exportBtn.innerHTML = '[ Export Executive Summary PDF ]';
        
        Object.assign(exportBtn.style, {
            fontFamily: "var(--font-premium)",
            fontSize: "0.8rem",
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: "var(--text-main)",
            background: "var(--card-bg)",
            border: "1px solid var(--card-border)",
            padding: "0.6rem 1.4rem",
            cursor: "pointer",
            transition: "all 0.3s ease"
        });

        // Эффект наведения
        exportBtn.addEventListener('mouseenter', () => { exportBtn.style.borderColor = 'var(--color-accent)'; });
        exportBtn.addEventListener('mouseleave', () => { exportBtn.style.borderColor = 'var(--card-border)'; });

        // Главный триггер: силовой запуск системного PDF-принтера устройства
        exportBtn.addEventListener('click', () => {
            console.log('BREVVO EXPORTER: Сборка финансового меморандума Даниила Лисенкова...');
            window.print(); // Открывает нативное А4 окно сохранения PDF на Айфоне или ПК
        });

        exportContainer.appendChild(exportBtn);
        titleWrap.appendChild(exportContainer);
    });
})();
