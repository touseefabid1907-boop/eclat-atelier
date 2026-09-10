/* Éclat Atelier — safe product image fallback layer */
(function () {
  'use strict';
  const FALLBACK_IMAGE = 'product-fallback.svg';

  function apply() {
    try {
      if (typeof PRODUCTS === 'undefined' || !Array.isArray(PRODUCTS)) return false;
      PRODUCTS.forEach(function (product) {
        if (!product || typeof product !== 'object') return;
        if (typeof product.image !== 'string' || !product.image.trim()) {
          product.image = FALLBACK_IMAGE;
        }
      });
      if (typeof renderProducts === 'function') {
        try { renderProducts(); } catch (error) { console.warn('Éclat Atelier: product image refresh failed.', error); }
      }
      if (typeof renderCart === 'function') {
        try { renderCart(); } catch (error) { console.warn('Éclat Atelier: cart image refresh failed.', error); }
      }
      return true;
    } catch (error) {
      console.warn('Éclat Atelier: image fallback layer failed safely.', error);
      return false;
    }
  }

  if (!apply()) {
    const timer = setInterval(function () {
      if (apply()) clearInterval(timer);
    }, 50);
    setTimeout(function () { clearInterval(timer); }, 10000);
  }
})();
