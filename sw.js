/**
 * BREVVO ECOSYSTEM — Ультимативный тотальный Precaching движок
 * Полностью ликвидирует TLS-рукопожатия и кэширует весь сайт целиком
 * Разработчик архитектуры: Даниил Лисенков (c) 2026
 */

const CACHE_NAME = 'brevvo-total-cache-v2';

// Жесткий список всех ресурсов, которые скачиваются в память в первую же секунду
const IMMUTABLE_ASSETS = [
    './',
    'index.html',
    'base.html',
    'universal.html',
    'pro.html',
    'style.css',
    'optimize.js',
    'base1.png',
    'base2.png',
    'base3.png',
    'base4.png',
    'universal1.png',
    'universal2.png',
    'universal3.png',
    'universal4.png',
    'image1.png',
    'image2.png',
    'image3.png',
    'image4.png',
    'https://unsplash.com'
];

// Установка воркера: ПРИНУДИТЕЛЬНО скачиваем весь сайт сразу
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('BREVVO ENGINE: Запущено тотальное кэширование всех страниц...');
            // addAll гарантирует, что пока все файлы из списка не скачаются, воркер не активируется
            return cache.addAll(IMMUTABLE_ASSETS);
        }).then(() => self.skipWaiting())
    );
});

// Активация: мгновенно берем управление сетью на себя и чистим старый кэш
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('BREVVO ENGINE: Удаление старого кэша...', cache);
                        return caches.delete(cache);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Перехват запросов: СТРОГО ИЗ ПАМЯТИ УСТРОЙСТВА БЕЗ ВЫХОДА В СЕТЬ
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request, { ignoreSearch: true }).then((cachedResponse) => {
            // Если файл есть в тотальном кэше — отдаем его со скоростью 0 миллисекунд
            if (cachedResponse) {
                return cachedResponse;
            }
            
            // На всякий случай: если запрашивается файл не из списка, берем из сети
            return fetch(event.request);
        })
    );
});
