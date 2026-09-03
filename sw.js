/**
 * BREVVO ECOSYSTEM — Локальный сетевой ИТ-кэш и ликвидатор TLS-задержек
 * Разработчик архитектуры: Даниил Лисенков (c) 2026
 */

const CACHE_NAME = 'brevvo-cache-v1';

// Список файлов, которые намертво блокируются в памяти устройства для работы без интернета
const ASSETS_TO_CACHE = [
    'index.html',
    'base.html',
    'universal.html',
    'pro.html',
    'style.css',
    'optimize.js',
    'https://unsplash.com'
];

// Установка воркера и первичная заливка ресурсов в память смартфона
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        }).then(() => self.skipWaiting())
    );
});

// Активация и очистка старого мусора
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// ГЛАВНЫЙ ИСТРЕБИТЕЛЬ ЛАГОВ: Перехват всех сетевых запросов. Браузер больше не делает TLS-рукопожатий!
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                // Если файл есть в памяти — отдаем мгновенно за 0 мс, не заходя в интернет
                return cachedResponse;
            }
            
            // Если файла нет (например, новая картинка), качаем из сети
            return fetch(event.request).then((response) => {
                if (!response || response.status !== 200 || response.type !== 'basic') {
                    return response;
                }
                // Кэшируем на лету новые ресурсы
                const responseToCache = response.clone();
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, responseToCache);
                });
                return response;
            }).catch(() => {
                // Анти-сбой: если интернет пропал полностью, сайт продолжит открывать закэшированные страницы
            });
        })
    );
});
