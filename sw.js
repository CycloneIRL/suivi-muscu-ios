/* Service worker : cache hors ligne. index.html, pwa.js et fonts.css : affichés depuis le cache puis rafraîchis en fond
   (la nouvelle version apparaît au lancement suivant). Le reste (polices, icônes) : cache d'abord. */
const V = 'suivi-muscu-pwa-1';
const CORE = ["./", "index.html", "pwa.js", "fonts.css", "manifest.webmanifest", "apple-touch-icon.png", "icon-192.png", "icon-512.png", "icon-maskable-512.png", "fonts/barlow-condensed-latin-500-normal.woff2", "fonts/barlow-condensed-latin-600-normal.woff2", "fonts/barlow-condensed-latin-700-normal.woff2", "fonts/barlow-latin-400-normal.woff2", "fonts/barlow-latin-500-normal.woff2", "fonts/barlow-latin-600-normal.woff2", "fonts/ibm-plex-mono-latin-400-normal.woff2", "fonts/ibm-plex-mono-latin-500-normal.woff2", "fonts/ibm-plex-mono-latin-600-normal.woff2", "fonts/ibm-plex-mono-latin-700-normal.woff2"];
self.addEventListener('install', e => e.waitUntil(caches.open(V).then(c => c.addAll(CORE)).then(() => self.skipWaiting())));
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', e => {
  const r = e.request, u = new URL(r.url);
  if (r.method !== 'GET' || u.origin !== location.origin) return;
  const doc = r.mode === 'navigate' || /\/(index\.html|pwa\.js|fonts\.css|manifest\.webmanifest)?$/.test(u.pathname);
  e.respondWith(caches.open(V).then(async c => {
    const hit = r.mode === 'navigate' ? await c.match('index.html') : await c.match(r, { ignoreSearch: true });
    if (doc) {
      const net = fetch(r).then(res => { if (res.ok) c.put(r.mode === 'navigate' ? 'index.html' : r, res.clone()); return res; }).catch(() => null);
      return hit || (await net) || Response.error();
    }
    return hit || fetch(r).then(res => { if (res.ok) c.put(r, res.clone()); return res; });
  }));
});
