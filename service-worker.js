// Service Worker for Herway PWA
const CACHE_NAME = 'herway-v1';
const urlsToCache = [
    './',
    './index.html',
    './book.html',
    './drivers.html',
    './about.html',
    './contact.html',
    './styles.css',
    './app.js',
    './manifest.json',
    './images/favicon.svg',
    './images/apple-touch-icon.svg',
    './images/icon-192.svg',
    './images/icon-512.svg',
    './images/icon-maskable.svg'
];

// Install Event - Cache files
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
            .catch(error => {
                console.log('Cache addAll error:', error);
            })
    );
    self.skipWaiting();
});

// Activate Event - Clean up old caches
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Fetch Event - Serve from cache, fall back to network
self.addEventListener('fetch', event => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') {
        return;
    }

    // Skip cross-origin requests
    if (!event.request.url.startsWith(self.location.origin)) {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Cache hit - return response
                if (response) {
                    return response;
                }

                return fetch(event.request).then(response => {
                    // Check if we received a valid response
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    // Clone the response
                    const responseToCache = response.clone();

                    caches.open(CACHE_NAME)
                        .then(cache => {
                            cache.put(event.request, responseToCache);
                        });

                    return response;
                });
            })
            .catch(() => {
                // Return an offline page or default response
                return new Response(
                    '<!DOCTYPE html><html><head><title>Offline</title></head><body>' +
                    '<h1>Offline</h1><p>You are currently offline. Please check your connection.</p>' +
                    '</body></html>',
                    {
                        headers: { 'Content-Type': 'text/html' }
                    }
                );
            })
    );
});

// Background Sync for form data
self.addEventListener('sync', event => {
    if (event.tag === 'sync-forms') {
        event.waitUntil(
            syncFormData()
        );
    }
});

async function syncFormData() {
    try {
        // This would sync any pending form submissions
        console.log('Syncing form data...');
        // Implementation would depend on how you store pending data
    } catch (error) {
        console.error('Sync failed:', error);
    }
}

// Message handling from clients
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

// Periodic background sync (for future notifications)
if ('periodicSync' in self) {
    self.addEventListener('periodicsync', event => {
        if (event.tag === 'update-bookings') {
            event.waitUntil(
                updateBookingStatus()
            );
        }
    });
}

async function updateBookingStatus() {
    try {
        // This would update booking status
        console.log('Updating booking status...');
    } catch (error) {
        console.error('Update failed:', error);
    }
}