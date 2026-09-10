/* Éclat Atelier — fault-tolerant storefront boot */
(function () {
  'use strict';

  var FALLBACK_IMAGE = 'product-fallback.svg';
  var OPTIONAL_FILES = ['legacy-script.js', 'categories.js', 'image-fixes.js'];
  var fallbackProducts = [
    {id:1,name:'Sauvage Eau de Parfum',house:'Dior',gender:'Men',notes:'Bergamot · Vanilla · Patchouli'},
    {id:16,name:'Aventus',house:'Creed',gender:'Men',notes:'Pineapple · Birch · Musk'},
    {id:17,name:'Original Santal',house:'Creed',gender:'Unisex',notes:'Sandalwood · Cedar · Tonka Bean'},
    {id:20,name:'Imagination',house:'Louis Vuitton',gender:'Unisex',notes:'Amber · Black Tea · Bergamot'},
    {id:22,name:'Oud Wood',house:'Tom Ford',gender:'Unisex',notes:'Oud · Rosewood · Cardamom'},
    {id:28,name:'Delina',house:'Parfums de Marly',gender:'Women',notes:'Lychee · Rose · Rhubarb'},
    {id:51,name:'Khamrah',house:'Lattafa',gender:'Unisex',notes:'Cinnamon · Dates · Vanilla'},
    {id:53,name:'9PM',house:'Afnan',gender:'Men',notes:'Apple · Cinnamon · Lavender'}
  ];

  function safeStorage(key) {
    try {
      var raw = window.localStorage ? localStorage.getItem(key) : null;
      if (!raw) return [];
      var value = JSON.parse(raw);
      return Array.isArray(value) ? value : [];
    } catch (_) {
      try { if (window.localStorage) localStorage.removeItem(key); } catch (__) {}
      return [];
    }
  }

  function safeSetStorage(key, value) {
    try { if (window.localStorage) localStorage.setItem(key, JSON.stringify(value)); } catch (_) {}
  }

  function productGridNode() {
    var node = document.getElementById('productGrid');
    if (node) return node;
    var shop = document.getElementById('shop');
    if (!shop) return null;
    node = document.createElement('div');
    node.id = 'productGrid';
    node.className = 'product-grid';
    node.setAttribute('aria-live', 'polite');
    shop.appendChild(node);
    return node;
  }

  function escapeHTML(value) {
    return String(value == null ? '' : value).replace(/[&<>'"]/g, function (ch) {
      return {'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch];
    });
  }

  function renderFallbackCatalog() {
    try {
      var grid = productGridNode();
      if (!grid) return false;
      if (grid.children.length) return true;
      grid.innerHTML = fallbackProducts.map(function (p) {
        return '<article class="product-card eclat-fallback-card">' +
          '<div class="product-image"><img src="' + FALLBACK_IMAGE + '" alt="" loading="lazy" decoding="async"></div>' +
          '<div class="product-info"><small>' + escapeHTML(p.house) + '</small>' +
          '<h3>' + escapeHTML(p.name) + '</h3>' +
          '<p>' + escapeHTML(p.notes) + '</p>' +
          '<span>' + escapeHTML(p.gender) + '</span></div></article>';
      }).join('');
      return true;
    } catch (error) {
      try { console.warn('Éclat Atelier: fallback catalog render failed safely.', error); } catch (_) {}
      return false;
    }
  }

  function installFallbackCSS() {
    try {
      if (document.getElementById('eclat-boot-safety')) return;
      var style = document.createElement('style');
      style.id = 'eclat-boot-safety';
      style.textContent = '.eclat-fallback-card{min-width:0}.eclat-fallback-card .product-image{display:grid;place-items:center;min-height:280px;background:#eee8df;overflow:hidden}.eclat-fallback-card .product-image img{display:block;width:100%;height:100%;object-fit:contain}.eclat-fallback-card .product-info{padding:14px 2px}.eclat-fallback-card .product-info small,.eclat-fallback-card .product-info span{font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:#817a70}.eclat-fallback-card .product-info h3{margin:7px 0;font-family:Cormorant Garamond,Georgia,serif;font-size:25px}.eclat-fallback-card .product-info p{margin:0;color:#6e675e;font-size:12px;line-height:1.5}';
      (document.head || document.documentElement).appendChild(style);
    } catch (_) {}
  }

  function sanitize(source, file) {
    var code = String(source || '');
    if (file === 'legacy-script.js' || file === 'categories.js') {
      code = code.replace(/image\s*:\s*(["'])(?:https?:)?\/\/[^"']*\1/g, 'image:"' + FALLBACK_IMAGE + '"');
    }
    if (file === 'legacy-script.js') {
      code = code.replace(/let cart=JSON\.parse\(localStorage\.getItem\("eclatCart"\)\|\|"\[\]"\);/,
        'let cart=safeEclatCart();');
      code = code.replace(/let wishlist=JSON\.parse\(localStorage\.getItem\("eclatWishlist"\)\|\|"\[\]"\);/,
        'let wishlist=safeEclatWishlist();');
      code = 'function safeEclatCart(){try{var v=JSON.parse(localStorage.getItem("eclatCart")||"[]");return Array.isArray(v)?v:[]}catch(_){return []}}\n' +
             'function safeEclatWishlist(){try{var v=JSON.parse(localStorage.getItem("eclatWishlist")||"[]");return Array.isArray(v)?v:[]}catch(_){return []}}\n' + code;
    }
    return code;
  }

  function executeOptionalSource(source, file) {
    try {
      var script = document.createElement('script');
      script.dataset.eclatSrc = file;
      script.text = sanitize(source, file);
      var previousOnError = window.onerror;
      window.onerror = function () { return true; };
      try { document.body.appendChild(script); }
      finally { window.onerror = previousOnError; }
      return true;
    } catch (error) {
      try { console.warn('Éclat Atelier: optional layer ' + file + ' failed safely.', error); } catch (_) {}
      return false;
    }
  }

  function loadText(file) {
    return new Promise(function (resolve) {
      var settled = false;
      var timer = setTimeout(function () {
        if (!settled) { settled = true; resolve(null); }
      }, 8000);
      try {
        fetch(file, {cache:'no-store'}).then(function (response) {
          if (!response || !response.ok) throw new Error(String(response && response.status || 'load failed'));
          return response.text();
        }).then(function (text) {
          if (settled) return;
          settled = true; clearTimeout(timer); resolve(text);
        }).catch(function () {
          if (settled) return;
          settled = true; clearTimeout(timer); resolve(null);
        });
      } catch (_) {
        if (!settled) { settled = true; clearTimeout(timer); resolve(null); }
      }
    });
  }

  function slugifyBrand(value) {
    return String(value || '').toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '');
  }

  function ensureProductCategories() {
    if (typeof PRODUCTS === 'undefined' || !Array.isArray(PRODUCTS)) return;
    PRODUCTS.forEach(function (product) {
      if (!product || typeof product !== 'object') return;
      var categories = Array.isArray(product.categories) ? product.categories.slice() : [];
      if (product.gender) categories.push(String(product.gender).toLowerCase());
      if (product.type) categories.push(String(product.type).toLowerCase());
      if (product.house) categories.push('brand:' + slugifyBrand(product.house));
      if (Array.isArray(product.tags)) {
        product.tags.forEach(function (tag) {
          if (tag) categories.push(String(tag).toLowerCase());
        });
      }
      product.categories = categories.filter(function (value, index, array) {
        return value && array.indexOf(value) === index;
      });
    });
  }

  function renderSelectedProducts(selected) {
    if (typeof PRODUCTS === 'undefined' || !Array.isArray(PRODUCTS) || typeof renderProducts !== 'function') return;
    var allProducts = PRODUCTS.slice();
    try {
      PRODUCTS.splice.apply(PRODUCTS, [0, PRODUCTS.length].concat(selected));
      renderProducts();
    } catch (error) {
      try { console.warn('Éclat Atelier: filtered catalog render recovered.', error); } catch (_) {}
    } finally {
      PRODUCTS.splice.apply(PRODUCTS, [0, PRODUCTS.length].concat(allProducts));
    }
  }

  function renderFeatured() {
    if (typeof PRODUCTS === 'undefined' || !Array.isArray(PRODUCTS)) return;
    renderSelectedProducts(PRODUCTS.filter(function (product) { return product && product.featured === true; }));
  }

  function renderByCategory(category) {
    if (typeof PRODUCTS === 'undefined' || !Array.isArray(PRODUCTS)) return;
    var selectedCategory = String(category || '').toLowerCase();
    renderSelectedProducts(PRODUCTS.filter(function (product) {
      return product && Array.isArray(product.categories) && product.categories.indexOf(selectedCategory) !== -1;
    }));
  }

  function installProductFilterBar() {
    var buttons = document.querySelectorAll('.product-filter-bar button');
    if (!buttons.length) return;
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var filter = btn.getAttribute('data-filter');
        if (filter === 'featured') {
          renderFeatured();
        } else {
          renderByCategory(filter);
        }
        buttons.forEach(function (item) { item.classList.toggle('active', item === btn); });
      });
    });
  }

  function finish() {
    try {
      if (typeof PRODUCTS !== 'undefined' && Array.isArray(PRODUCTS)) {
        ensureProductCategories();
        PRODUCTS.forEach(function (p) {
          if (!p || typeof p !== 'object') return;
          if (typeof p.image !== 'string' || !p.image.trim() || /^https?:\/\//i.test(p.image)) p.image = FALLBACK_IMAGE;
        });
      }
      if (typeof renderProducts === 'function') {
        try { renderFeatured(); } catch (error) { console.warn('Éclat Atelier: catalog render recovered.', error); }
      }
      installProductFilterBar();
      if (typeof renderCart === 'function') { try { renderCart(); } catch (error) { console.warn('Éclat Atelier: cart render recovered.', error); } }
    } catch (error) {
      try { console.warn('Éclat Atelier: final optional recovery failed safely.', error); } catch (_) {}
    }
    renderFallbackCatalog();
  }

  function bootOptionalLayers() {
    var chain = Promise.resolve();
    OPTIONAL_FILES.forEach(function (file) {
      chain = chain.then(function () {
        return loadText(file).then(function (source) {
          if (source) executeOptionalSource(source, file);
        });
      });
    });
    chain.then(finish).catch(function () { finish(); });
  }

  function boot() {
    installFallbackCSS();
    var cart = safeStorage('eclatCart');
    var wishlist = safeStorage('eclatWishlist');
    safeSetStorage('eclatCart', cart);
    safeSetStorage('eclatWishlist', wishlist);
    renderFallbackCatalog();
    bootOptionalLayers();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, {once:true});
  else boot();
})();
