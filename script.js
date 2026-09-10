/* Éclat Atelier — fault-tolerant storefront boot */
(function () {
  'use strict';

  var FALLBACK_IMAGE = 'product-fallback.svg';
  var OPTIONAL_FILES = ['legacy-script.js', 'categories.js', 'image-fixes.js', 'catalog-expansion.js'];
  var fallbackProducts = [
    {id:1,name:'Sauvage Eau de Parfum',house:'Dior',gender:'Men',notes:'Bergamot · Vanilla · Patchouli'},
    {id:16,name:'Aventus',house:'Creed',gender:'Men',notes:'Pineapple · Birch · Musk'},
    {id:17,name:'Original Santal',house:'Creed',gender:'Unisex',notes:'Sandalwood · Cedar · Tonka'},
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
    return String(value == null ? '' : value).replace(/[&<>'\"]/g, function (ch) {
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
    if (file === 'legacy-script.js') {
      code = code.replace(/let cart=JSON\.parse\(localStorage\.getItem\("eclatCart"\)\|\|"\[\]"\);/, 'let cart=safeEclatCart();');
      code = code.replace(/let wishlist=JSON\.parse\(localStorage\.getItem\("eclatWishlist"\)\|\|"\[\]"\);/, 'let wishlist=safeEclatWishlist();');
      code = 'function safeEclatCart(){try{var v=JSON.parse(localStorage.getItem("eclatCart")||"[]");return Array.isArray(v)?v:[]}catch(_){return []}}\n' +
             'function safeEclatWishlist(){try{var v=JSON.parse(localStorage.getItem("eclatWishlist")||"[]");return Array.isArray(v)?v:[]}catch(_){return []}}\n' + code;
    }
    if (file === 'image-fixes.js') {
      code = code.replace("if (typeof product.image !== 'string' || !product.image.trim() || /^https?:\\/\\//i.test(product.image)) {", "if (typeof product.image !== 'string' || !product.image.trim()) {");
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
      var timer = setTimeout(function () { if (!settled) { settled = true; resolve(null); } }, 8000);
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

  function finish() {
    try {
      if (typeof PRODUCTS !== 'undefined' && Array.isArray(PRODUCTS)) {
        PRODUCTS.forEach(function (p) {
          if (!p || typeof p !== 'object') return;
          if (typeof p.image !== 'string' || !p.image.trim()) p.image = FALLBACK_IMAGE;
        });
      }
      if (typeof renderProducts === 'function') { try { renderProducts(); } catch (error) { console.warn('Éclat Atelier: catalog render recovered.', error); } }
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
        return loadText(file).then(function (source) { if (source) executeOptionalSource(source, file); });
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

  // Brand autocomplete: uses the complete product catalog without changing rendering functions.
  function initBrandAutocomplete() {
    var searchInput = document.getElementById('searchInput');
    var searchInner = document.querySelector('.search-inner');
    if (!searchInput || !searchInner || typeof PRODUCTS === 'undefined' || !Array.isArray(PRODUCTS)) return false;

    const products = PRODUCTS.map(function (p) {
      return Object.assign({brand: p && (p.brand || p.house || '')}, p);
    });
    const brandList = [...new Set(products.map(p => p.brand.toLowerCase()).filter(Boolean))].sort();

    var suggestions = document.getElementById('brandSuggestions');
    if (!suggestions) {
      suggestions = document.createElement('div');
      suggestions.id = 'brandSuggestions';
      suggestions.className = 'brand-suggestions';
      suggestions.setAttribute('role', 'listbox');
      searchInner.appendChild(suggestions);
    }

    function hideSuggestions() {
      suggestions.innerHTML = '';
      suggestions.hidden = true;
    }

    function filterByBrand(brand) {
      var brandFilter = document.getElementById('brandFilter');
      if (brandFilter) {
        var target = String(brand || '').toLowerCase();
        var option = Array.prototype.find.call(brandFilter.options, function (item) {
          return String(item.textContent || item.value).toLowerCase() === target || String(item.value).toLowerCase() === target;
        });
        if (!option) {
          option = document.createElement('option');
          option.value = brand;
          option.textContent = brand;
          brandFilter.appendChild(option);
        }
        brandFilter.value = option.value;
        brandFilter.dispatchEvent(new Event('change', {bubbles:true}));
      }
      searchInput.value = brand;
      hideSuggestions();
    }

    searchInput.addEventListener('input', function () {
      var query = searchInput.value.trim().toLowerCase();
      if (!query) {
        hideSuggestions();
        return;
      }

      var matches = brandList.filter(function (brand) { return brand.indexOf(query) === 0; });
      suggestions.innerHTML = matches.map(function (brand) {
        var label = products.find(function (p) { return p.brand.toLowerCase() === brand; });
        return '<div role="option" data-brand="' + escapeHTML(brand) + '">' + escapeHTML(label ? label.brand : brand) + '</div>';
      }).join('');
      suggestions.hidden = matches.length === 0;
    });

    suggestions.addEventListener('mousedown', function (event) {
      var item = event.target.closest('[data-brand]');
      if (!item) return;
      event.preventDefault();
      filterByBrand(item.getAttribute('data-brand'));
    });

    document.addEventListener('click', function (event) {
      if (!searchInner.contains(event.target)) hideSuggestions();
    });

    var clearSearch = document.getElementById('clearSearch');
    if (clearSearch) clearSearch.addEventListener('click', hideSuggestions);
    return true;
  }

  function waitForBrandAutocomplete(attempt) {
    if (initBrandAutocomplete() || attempt >= 100) return;
    setTimeout(function () { waitForBrandAutocomplete(attempt + 1); }, 100);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { waitForBrandAutocomplete(0); }, {once:true});
  } else {
    waitForBrandAutocomplete(0);
  }
})();