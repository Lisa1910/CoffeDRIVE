/**
 * BREVVO ECOSYSTEM — Интеллектуальный Сетевой Кэш-Гибрид (PDF Auto-Reload Edition)
 * Мгновенный взлет сайта + Автоматическая принудительная перезагрузка страницы при обновлении ПО
 * Разработчик архитектуры: Даниил Лисенков (c) 2026
 */

const CACHE_NAME = 'brevvo-smart-app-v7';

const ASSETS_TO_CACHE = [
    './',
    'index.html',
    'base.html',
    'universal.html',
    'pro.html',
    'style.css',
    'optimize.js',
    'app-shield.js',
    'smart-engine.js',
    'pdf-export.js',
    'wallpaper.png',
    'base1.png', 'base2.png', 'base3.png', 'base4.png',
    'universal1.png', 'universal2.png', 'universal3.png', 'universal4.png',
    'image1.png', 'image2.png', 'image3.png', 'image4.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        }).then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            const fetchPromise = fetch(event.request).then((networkResponse) => {
                if (networkResponse && networkResponse.status === 200) {
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, networkResponse.clone());
                    });
                }
                return networkResponse;
            }).catch(() => {});

            return cachedResponse || fetchPromise;
        })
    );
});

self.addEventListener('message', (event) => {
    if (event.data === 'skipWaiting') {
        self.skipWaiting();
    }
});
