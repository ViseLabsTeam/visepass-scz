// VisePass SCZ — service worker
// Permite abrir la app aunque la portería se quede sin internet y muestra los avisos de taxis/deliveries.
// Los datos (pases, casas, bitácora) NO pasan por aquí: los maneja Firebase con su propio caché.
const VERSION = 'visepass-v8';
const APP_SHELL = ['./', './index.html', './manifest.json', './favicon.png', './apple-touch-icon.png', './icon-512.png'];
// Librerías externas con versión fija: se guardan una vez y se sirven desde el teléfono
const LIBS = [
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js',
    'https://unpkg.com/html5-qrcode@2.3.8/html5-qrcode.min.js',
    'https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js',
    'https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js',
    'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js'
];
const CACHEABLE_HOSTS = ['cdnjs.cloudflare.com', 'unpkg.com', 'www.gstatic.com', 'fonts.googleapis.com', 'fonts.gstatic.com'];

self.addEventListener('install', event => {
    event.waitUntil((async () => {
        const cache = await caches.open(VERSION);
        await cache.addAll(APP_SHELL);
        // Las librerías se intentan guardar, pero si alguna falla la instalación sigue
        await Promise.all(LIBS.map(async url => {
            try {
                const request = new Request(url, { mode: url.includes('/firebasejs/') ? 'cors' : 'no-cors' });
                const response = await fetch(request);
                if (response.ok || response.type === 'opaque') await cache.put(url, response);
            } catch (e) { /* se reintenta la próxima vez que la app la use */ }
        }));
        await self.skipWaiting();
    })());
});

self.addEventListener('activate', event => {
    event.waitUntil((async () => {
        const keys = await caches.keys();
        await Promise.all(keys.filter(k => k.startsWith('visepass-') && k !== VERSION).map(k => caches.delete(k)));
        await self.clients.claim();
    })());
});

// ¿Es la app en sí? (la raíz o index.html, con o sin ?junte=… del link de evento)
function isAppPage(url) {
    const scope = new URL(self.registration.scope);
    return url.origin === scope.origin && (url.pathname === scope.pathname || url.pathname === scope.pathname + 'index.html');
}

// Primero la red (para recibir actualizaciones); si no hay internet o tarda más de 4 s, la copia guardada.
// Aunque se use la copia, la descarga sigue en segundo plano y queda guardada para la próxima vez.
async function networkFirst(event) {
    const request = event.request;
    const cache = await caches.open(VERSION);
    const url = new URL(request.url);
    const appPage = request.mode === 'navigate' && isAppPage(url);
    const key = appPage ? './index.html' : request;
    const fetching = fetch(request).then(response => {
        if (response && response.ok && (request.mode !== 'navigate' || appPage)) cache.put(key, response.clone());
        return response;
    });
    event.waitUntil(fetching.catch(() => {}));
    try {
        return await Promise.race([
            fetching,
            new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 4000))
        ]);
    } catch (e) {
        const cached = await cache.match(key, { ignoreSearch: appPage });
        if (cached) return cached;
        return fetching;
    }
}

// Librerías con versión fija: primero la copia guardada
async function cacheFirst(request) {
    const cache = await caches.open(VERSION);
    const cached = await cache.match(request, { ignoreVary: true });
    if (cached) return cached;
    const response = await fetch(request);
    if (response && (response.ok || response.type === 'opaque')) cache.put(request, response.clone());
    return response;
}

self.addEventListener('fetch', event => {
    const request = event.request;
    if (request.method !== 'GET') return;
    const url = new URL(request.url);
    // Base de datos e inicio de sesión de Firebase: siempre directo, nunca desde el caché
    if (/firestore\.googleapis\.com|identitytoolkit|securetoken|firebaseinstallations|googleapis\.com\/(?!css)/.test(url.href) && url.host !== 'fonts.googleapis.com') return;
    if (url.origin === self.location.origin) {
        event.respondWith(networkFirst(event));
        return;
    }
    if (CACHEABLE_HOSTS.includes(url.host)) event.respondWith(cacheFirst(request));
});

// Tocar un aviso (taxi o delivery) abre la app
self.addEventListener('notificationclick', event => {
    event.notification.close();
    event.waitUntil((async () => {
        const all = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
        const open = all.find(c => c.url.startsWith(self.registration.scope));
        if (open) return open.focus();
        return self.clients.openWindow('./');
    })());
});
