// pwa.js - Nggo ngatur Service Worker + Notifikasi Update
let newWorker;

// DAFTAR SERVICE WORKER
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(reg => {
        reg.addEventListener('updatefound', () => {
          newWorker = reg.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // MUNCULKE NOTIF
              const notif = document.getElementById('update-notif');
              if(notif) notif.classList.remove('hidden');
            }
          });
        });
    });

    // KLIK TOMBOL UPDATE
    const btn = document.getElementById('btn-reload');
    if(btn){
      btn.addEventListener('click', () => {
          if (newWorker) newWorker.postMessage({ type: 'SKIP_WAITING' });
      });
    }

    // RELOAD PAS SW BARU AKTIF
    navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload();
    });
  });
}