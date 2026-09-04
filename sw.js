/**
 * BREVVO ECOSYSTEM — Ультимативный тотальный Precaching движок
 * Версия v3-ultimate — Принудительный сброс кэша для центрирования Liquid Glass
 * Разработчик архитектуры: Даниил Лисенков (c) 2026
 */

const CACHE_NAME = 'brevvo-total-cache-v3-ultimate';

const IMMUTABLE_ASSETS = [
    './',
    'index.html',
    'base.html',
    'universal.html',
    'pro.html',
    'style.css',
    'optimize.js',
    'smart-engine.js',
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

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('BREVVO ENGINE: Запущено тотальное обновление кэша...');
            return cache.addAll(IMMUTABLE_ASSETS);
        }).then(() => self.skipWaiting())
    );
});

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

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request, { ignoreSearch: true }).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }
            return fetch(event.request);
        })
    );
});
