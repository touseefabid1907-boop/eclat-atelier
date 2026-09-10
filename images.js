/* Éclat Atelier — image synchronization safety layer */
(function () {
  function sync() {
    if (typeof PRODUCTS === 'undefined' || typeof renderProducts !== 'function') return false;
    /* Product images are defined with each catalog entry. This file intentionally
       does not overwrite them or assume PRODUCTS exists before legacy-script.js. */
    renderProducts();
    if (typeof renderCart === 'function') renderCart();
    return true;
  }

  if (!sync()) {
    const timer = setInterval(function () {
      if (sync()) clearInterval(timer);
    }, 50);
    setTimeout(function () { clearInterval(timer); }, 10000);
  }
})();
