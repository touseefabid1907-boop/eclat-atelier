/* Éclat Atelier — product bottle image fixes */
(function () {
  function apply() {
    if (typeof PRODUCTS === 'undefined') return false;
    const fixes = {
      53: 'https://www.oudnaroma.com/cdn/shop/files/5_b5f1cffd-c462-46cc-8ad0-0f32bb83a378_jpg.webp?v=1770242223',
      54: 'https://flyimports.com/cdn/shop/files/CLUB1.png?v=1770857003&width=1024'
    };
    Object.entries(fixes).forEach(function ([id, url]) {
      const product = PRODUCTS.find(function (p) { return p.id === Number(id); });
      if (product) product.image = url;
    });
    if (typeof renderProducts === 'function') renderProducts();
    return true;
  }
  if (!apply()) {
    const timer = setInterval(function () {
      if (apply()) clearInterval(timer);
    }, 50);
  }
})();
