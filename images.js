/* Éclat Atelier — optional image synchronization safety layer */
(function () {
  'use strict';
  function sync() {
    try {
      if (typeof PRODUCTS === 'undefined' || !Array.isArray(PRODUCTS)) return false;
      PRODUCTS.forEach(function (product) {
        if (!product || typeof product !== 'object') return;
        if (typeof product.image !== 'string' || !product.image.trim()) product.image = 'product-fallback.svg';
      });
      if (typeof renderProducts === 'function') {
        try { renderProducts(); } catch (error) { console.warn('Éclat Atelier: renderProducts failed safely.', error); }
      }
      if (typeof renderCart === 'function') {
        try { renderCart(); } catch (error) { console.warn('Éclat Atelier: renderCart failed safely.', error); }
      }
      return true;
    } catch (error) {
      console.warn('Éclat Atelier: optional image sync failed safely.', error);
      return false;
    }
  }

  function start() {
    if (sync()) return;
    const timer = setInterval(function () {
      if (sync()) clearInterval(timer);
    }, 100);
    setTimeout(function () { clearInterval(timer); }, 10000);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
