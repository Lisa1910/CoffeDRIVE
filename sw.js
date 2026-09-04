/**
 * BREVVO ECOSYSTEM — Интеллектуальный Сетевой Кэш-Гибрид (Stale-While-Revalidate)
 * Мгновенный взлет сайта + Принудительное автообновление локального ПО на лету
 * Разработчик архитектуры: Даниил Лисенков (c) 2026
 */

const CACHE_NAME = 'brevvo-smart-app-v5';

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
    'wallpaper.png',
    'base1.png', 'base2.png', 'base3.png', 'base4.png',
    'universal1.png', 'universal2.png', 'universal3.png', 'universal4.png',
    'image1.png', 'image2.png', 'image3.png', 'image4.png'
];

// Установка воркера: мгновенно забираем файлы в память
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        }).then(() => self.skipWaiting())
    );
});

// Активация: чистим старый мусор и берем контроль над сетью
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

// ГЛАВНЫЙ ИСТРЕБИТЕЛЬ ЛАГОВ И ЗАВИСАНИЙ ОБНОВЛЕНИЙ (ТЕХНОЛОГИЯ ULTRA-SPEED)
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            // МГНОВЕННЫЙ ЗАПУСК: Если файл есть в памяти устройства — отдаем его за 0 миллисекунд
            const fetchPromise = fetch(event.request).then((networkResponse) => {
                if (networkResponse && networkResponse.status === 200) {
                    caches.open(CACHE_NAME).then((cache) => {
                        // ФОНОВОЕ ОБНОВЛЕНИЕ: В эту же секунду проверяем изменения на GitHub.
                        // Если код обновился — тихо перезаписываем память на новое ПО.
                        cache.put(event.request, networkResponse.clone());
                    });
                }
                return networkResponse;
            }).catch(() => {
                // Анти-сбой: если интернет пропал в подвале, сайт работает на 100% автономно
            });

            // Возвращаем локальный файл ради бешеной скорости, а сеть сама обновит его в фоне
            return cachedResponse || fetchPromise;
        })
    );
});
