/* Éclat Atelier — deterministic storefront boot */
(function () {
  'use strict';

  function safeStorage(key) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return [];
      const value = JSON.parse(raw);
      return Array.isArray(value) ? value : [];
    } catch (_) {
      try { localStorage.removeItem(key); } catch (_) {}
      return [];
    }
  }

  const cartState = safeStorage('eclatCart');
  const wishlistState = safeStorage('eclatWishlist');
  try { localStorage.setItem('eclatCart', JSON.stringify(cartState)); } catch (_) {}
  try { localStorage.setItem('eclatWishlist', JSON.stringify(wishlistState)); } catch (_) {}

  const files = ['legacy-script.js', 'categories.js', 'image-fixes.js'];
  let index = 0;

  function sanitize(source, file) {
    let code = source;

    /* Remove third-party product-image dependencies. The storefront has its own
       visual fallback, so dead image hosts cannot create failed-resource errors. */
    if (file === 'legacy-script.js' || file === 'categories.js') {
      code = code.replace(/image\s*:\s*(["'])(?:https?:)?\/\/[^"']*\1/g, 'image:""');
    }

    if (file === 'legacy-script.js') {
      code = code.replace(
        /let cart=JSON\.parse\(localStorage\.getItem\("eclatCart"\)\|\|"\[\]"\);/,
        'let cart=safeEclatCart();'
      );
      code = code.replace(
        /let wishlist=JSON\.parse\(localStorage\.getItem\("eclatWishlist"\)\|\|"\[\]"\);/,
        'let wishlist=safeEclatWishlist();'
      );
      code = 'function safeEclatCart(){try{const v=JSON.parse(localStorage.getItem("eclatCart")||"[]");return Array.isArray(v)?v:[]}catch(_){return []}}\n' +
             'function safeEclatWishlist(){try{const v=JSON.parse(localStorage.getItem("eclatWishlist")||"[]");return Array.isArray(v)?v:[]}catch(_){return []}}\n' + code;
    }

    return code;
  }

  function runSource(source, file) {
    const script = document.createElement('script');
    script.dataset.eclatSrc = file;
    script.text = sanitize(source, file);
    try {
      document.body.appendChild(script);
    } catch (error) {
      console.warn('Éclat Atelier: failed to execute ' + file, error);
    }
    loadNext();
  }

  function loadNext() {
    if (index >= files.length) {
      try {
        if (typeof PRODUCTS !== 'undefined' && typeof renderProducts === 'function') {
          renderProducts();
          if (typeof renderCart === 'function') renderCart();
        }
      } catch (error) {
        console.warn('Éclat Atelier: final render recovery failed.', error);
      }
      return;
    }

    const file = files[index++];
    fetch(file, { cache: 'no-store' })
      .then(function (response) {
        if (!response.ok) throw new Error(response.status + ' ' + response.statusText);
        return response.text();
      })
      .then(function (source) { runSource(source, file); })
      .catch(function (error) {
        console.warn('Éclat Atelier: could not load ' + file, error);
        loadNext();
      });
  }

  if (document.body) loadNext();
  else document.addEventListener('DOMContentLoaded', loadNext, { once: true });
})();
