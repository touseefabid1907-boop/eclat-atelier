/* Éclat Atelier — resilient sequential boot loader */
(function () {
  'use strict';

  /* Prevent a corrupted saved cart/wishlist from aborting the storefront. */
  ['eclatCart', 'eclatWishlist'].forEach(function (key) {
    try {
      const raw = localStorage.getItem(key);
      if (raw !== null) JSON.parse(raw);
    } catch (error) {
      try { localStorage.removeItem(key); } catch (_) {}
    }
  });

  const files = ['legacy-script.js', 'categories.js', 'image-fixes.js'];
  let index = 0;

  function loadNext() {
    if (index >= files.length) {
      /* Final recovery pass: render once all catalogue code is available. */
      try {
        if (typeof PRODUCTS !== 'undefined' && typeof renderProducts === 'function') {
          renderProducts();
          if (typeof renderCart === 'function') renderCart();
        }
      } catch (error) {
        console.warn('Éclat Atelier: final storefront recovery failed.', error);
      }
      return;
    }

    const src = files[index++];
    if (document.querySelector('script[data-eclat-src="' + src + '"]')) {
      loadNext();
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.async = false;
    script.dataset.eclatSrc = src;
    script.onload = loadNext;
    script.onerror = function () {
      /* Continue booting the remaining layers even if an optional layer fails. */
      loadNext();
    };
    document.body.appendChild(script);
  }

  if (document.body) loadNext();
  else document.addEventListener('DOMContentLoaded', loadNext, { once: true });
})();
