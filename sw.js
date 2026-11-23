const CACHE_NAME = 'escoliose-s4d-pwa-v1';
const SHELL = ['./', './escoliose_s4d_avalia_o_cl_nica_e_postural.html', './manifest.webmanifest'];
const EXTERNAL = [
 'https://cdn.tailwindcss.com',
 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap',
 'https://fonts.gstatic.com',
 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
 'https://cdn.jsdelivr.net/npm/chart.js',
 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js'
];
self.addEventListener('install', event => {
 event.waitUntil((async()=>{const c=await caches.open(CACHE_NAME); await c.addAll(SHELL); for(const u of EXTERNAL){try{const r=await fetch(u);if(r.ok)await c.put(u,r);}catch(e){}} await self.skipWaiting();})());
});
self.addEventListener('activate', event => event.waitUntil((async()=>{const ks=await caches.keys();await Promise.all(ks.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)));await self.clients.claim();})()));
self.addEventListener('fetch', event => {
 const req=event.request; if(req.method!=='GET')return;
 event.respondWith((async()=>{const c=await caches.open(CACHE_NAME); const cached=await c.match(req); if(cached)return cached; try{const r=await fetch(req);if(r.ok && (req.url.startsWith(self.location.origin)||EXTERNAL.some(u=>req.url.startsWith(u)))) await c.put(req,r.clone());return r;}catch(e){return cached|| (req.mode==='navigate'?c.match('./escoliose_s4d_avalia_o_cl_nica_e_postural.html'):Response.error());}})());
});
