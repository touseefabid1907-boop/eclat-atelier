/* Éclat Atelier — catalog extension + editorial homepage refinement */
(function () {
  const middleEastern = [
    {id:51,name:'Khamrah',house:'Lattafa',type:'middle-eastern',gender:'Unisex',tags:['amber','woody'],notes:'Cinnamon · Dates · Praline · Vanilla',tone:8,featured:true,image:'https://fimgs.net/mdimg/perfume-thumbs/dark-amber/lattafa-khamrah-1.jpg'},
    {id:52,name:'Asad',house:'Lattafa',type:'middle-eastern',gender:'Men',tags:['amber','woody'],notes:'Black Pepper · Pineapple · Coffee · Vanilla',tone:4,image:'https://fimgs.net/mdimg/perfume-thumbs/dark-amber/lattafa-asad-1.jpg'},
    {id:53,name:'9PM',house:'Afnan',type:'middle-eastern',gender:'Men',tags:['amber','fresh'],notes:'Apple · Cinnamon · Lavender · Vanilla',tone:3,image:'https://fimgs.net/mdimg/perfume-thumbs/dark-amber/afnan-9pm-1.jpg'},
    {id:54,name:'Club de Nuit Intense Man',house:'Armaf',type:'middle-eastern',gender:'Men',tags:['fresh','woody'],notes:'Lemon · Pineapple · Birch · Musk',tone:7,image:'https://fimgs.net/mdimg/perfume-thumbs/dark-amber/armaf-club-de-nuit-intense-man-1.jpg'},
    {id:55,name:'Hawas',house:'Rasasi',type:'middle-eastern',gender:'Men',tags:['fresh','amber'],notes:'Citrus · Marine Notes · Cinnamon · Musk',tone:7,image:'https://fimgs.net/mdimg/perfume-thumbs/dark-amber/rasasi-hawas-for-men-1.jpg'},
    {id:56,name:'Yara',house:'Lattafa',type:'middle-eastern',gender:'Women',tags:['floral','amber'],notes:'Orchid · Heliotrope · Vanilla · Musk',tone:5,image:'https://fimgs.net/mdimg/perfume-thumbs/dark-amber/lattafa-yara-1.jpg'}
  ];

  function addMiddleEastern() {
    if (typeof PRODUCTS === 'undefined') return false;
    middleEastern.forEach(function (p) {
      if (!PRODUCTS.some(function (x) { return x.id === p.id; })) PRODUCTS.push(p);
    });
    return true;
  }

  function installStyles() {
    if (document.getElementById('eclat-editorial-overrides')) return;
    const style = document.createElement('style');
    style.id = 'eclat-editorial-overrides';
    style.textContent = `
      .hero-copy h1{max-width:680px}
      .hero-copy .hero-text{max-width:560px;font-family:Inter,Arial,sans-serif;font-size:16px;line-height:1.65;color:#514b43}
      .eclat-why{margin-top:34px}
      .eclat-why-title{display:none!important}
      .eclat-why-list{display:flex;flex-wrap:wrap;gap:20px 30px}
      .eclat-why-list span{font:500 9px/1.5 Inter,Arial,sans-serif;letter-spacing:.16em;text-transform:uppercase;color:#5d564c}
      .eclat-why-list span:before{content:'✦';margin-right:8px;font-size:8px}
      .collections .section-head .eyebrow{font-size:8px;letter-spacing:.22em}
      .collections .section-head h2{margin-top:8px}
      .collection-grid{gap:10px}
      .collection-card{position:relative;overflow:hidden;background-position:center;background-size:cover;background-repeat:no-repeat;isolation:isolate;min-height:285px;border:0}
      .collection-card:before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(25,22,18,.62),rgba(25,22,18,.12) 70%,rgba(25,22,18,.32));z-index:-1}
      .collection-card:after{content:'';position:absolute;inset:0;background:rgba(255,255,255,.08);z-index:-1;pointer-events:none}
      .collection-dark{background-image:url('https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1000&q=82')!important}
      .collection-sand{background-image:url('https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1000&q=82')!important}
      .collection-olive{background-image:url('https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=1000&q=82')!important}
      .collection-rose{background-image:url('https://images.unsplash.com/photo-1519671282421-9c7f3a3f1f8f?auto=format&fit=crop&w=1000&q=82')!important}
      .collection-card>span:first-child{display:none}
      .collection-card strong{position:relative;z-index:2;text-shadow:0 2px 18px rgba(0,0,0,.22)}
      .collection-card small{position:relative;z-index:2;text-shadow:0 1px 8px rgba(0,0,0,.2)}
      .collections .text-link{font-size:9px}
      .shop .shop-head{display:block}
      .shop .shop-head>div:first-child .eyebrow{display:none}
      .shop .shop-head h2{margin:0 0 34px}
      .shop-tools{display:none!important}
      .eclat-filter-bar{display:grid;grid-template-columns:1.25fr .9fr 1fr;gap:28px;align-items:end;border-top:1px solid #d8d0c3;border-bottom:1px solid #d8d0c3;padding:26px 0 24px;margin-bottom:22px}
      .eclat-filter-group{min-width:0}
      .eclat-filter-label{display:block;margin-bottom:11px;font:600 8px/1 Inter,Arial,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:#817a70}
      .eclat-filter-buttons{display:flex;flex-wrap:wrap;gap:7px}
      .eclat-filter-buttons button{border:1px solid #d0c8bb;background:transparent;color:#171714;padding:10px 14px;font:600 8px/1 Inter,Arial,sans-serif;letter-spacing:.09em;text-transform:uppercase;cursor:pointer;transition:.2s}
      .eclat-filter-buttons button:hover,.eclat-filter-buttons button.active{background:#171714;color:#fff;border-color:#171714}
      .eclat-brand-search{height:37px;width:100%;box-sizing:border-box;border:1px solid #d0c8bb;background:rgba(255,255,255,.18);padding:0 13px;font:400 12px Inter,Arial,sans-serif;color:#25221e;outline:none}
      .eclat-brand-search::placeholder{color:#82796e}
      .eclat-brand-search:focus{border-color:#9d9487}
      .eclat-results{display:flex;justify-content:space-between;align-items:center;margin:0 0 18px;font:500 8px/1 Inter,Arial,sans-serif;letter-spacing:.17em;text-transform:uppercase;color:#817a70}
      .results-line,.brand-directory{display:none!important}
      .catalog-filters{display:none!important}
      @media(max-width:900px){.eclat-filter-bar{grid-template-columns:1fr 1fr}.eclat-filter-group:last-child{grid-column:1/-1}.collection-card{min-height:250px}}
      @media(max-width:650px){.eclat-filter-bar{grid-template-columns:1fr;gap:20px}.eclat-filter-group:last-child{grid-column:auto}.eclat-filter-buttons{overflow-x:auto;flex-wrap:nowrap;padding-bottom:2px}.eclat-filter-buttons button{white-space:nowrap}.eclat-why-list{gap:13px 18px}.collection-grid{grid-template-columns:1fr 1fr!important}.collection-card{min-height:220px}.shop .shop-head h2{font-size:42px}}
      @media(max-width:480px){.collection-grid{grid-template-columns:1fr!important}.collection-card{min-height:235px}}
    `;
    document.head.appendChild(style);
  }

  function refineHero() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    const title = hero.querySelector('h1');
    if (title) title.innerHTML = 'Wear perfume.<br><em>Explore yourself.</em>';
    const copy = hero.querySelector('.hero-text');
    if (copy) copy.textContent = 'Fragrances are more than scent — they’re a journey. Wear different worlds, discover new sides of yourself.';
    const trust = hero.querySelector('.hero-trust');
    if (trust) {
      trust.className = 'eclat-why';
      trust.innerHTML = '<div class="eclat-why-title">WHY ÉCLAT ATELIER</div><div class="eclat-why-list"><span>Authentic original fragrances</span><span>Secure atomisers</span><span>Curated by scent profile</span></div>';
    }
    const image = hero.querySelector('.hero-bottles img');
    if (image) {
      // Use a cache-busted relative asset so GitHub Pages/custom-domain deployments fetch the real PNG.
      image.src = './hero-bottles.png?v=20260910-2';
      image.alt = 'Creed Aventus and Louis Vuitton Imagination';
      image.loading = 'eager';
      image.decoding = 'async';
      image.onerror = function () {
        image.src = 'https://raw.githubusercontent.com/touseefabid1907-boop/eclat-atelier/main/hero-bottles.png?v=20260910-2';
      };
    }
  }

  function refineCollections() {
    const section = document.querySelector('#collections');
    if (!section) return;
    const eyebrow = section.querySelector('.section-head .eyebrow');
    const heading = section.querySelector('.section-head h2');
    if (eyebrow) eyebrow.textContent = 'SHOP BY SCENT';
    if (heading) heading.textContent = 'Find your signature scent.';
    section.querySelectorAll('.collection-card>span:first-child').forEach(function (x) { x.remove(); });
    const cards = section.querySelectorAll('.collection-card');
    cards.forEach(function (card) {
      card.addEventListener('click', function () {
        const filter = card.dataset.filter || 'all';
        if (typeof currentFilter !== 'undefined') currentFilter = filter;
        document.querySelectorAll('.eclat-category-btn').forEach(function (b) { b.classList.toggle('active', b.dataset.category === filter); });
        if (typeof renderProducts === 'function') renderProducts();
        const shop = document.querySelector('#shop');
        if (shop) shop.scrollIntoView({behavior:'smooth',block:'start'});
      });
    });
  }

  function buildFilters() {
    const shop = document.querySelector('#shop');
    const tools = shop && shop.querySelector('.shop-tools');
    if (!shop || !tools) return;
    if (document.querySelector('.eclat-filter-bar')) return;
    const bar = document.createElement('div');
    bar.className = 'eclat-filter-bar';
    bar.innerHTML = `
      <div class="eclat-filter-group"><span class="eclat-filter-label">CATEGORIES</span><div class="eclat-filter-buttons eclat-category-buttons"><button class="eclat-category-btn eclat-category-btn active" data-category="all">All fragrances</button><button class="eclat-category-btn" data-category="middle-eastern">Middle Eastern</button><button class="eclat-category-btn" data-category="designer">Designer</button><button class="eclat-category-btn" data-category="niche">Niche</button></div></div>
      <div class="eclat-filter-group"><span class="eclat-filter-label">SHOP BY</span><div class="eclat-filter-buttons eclat-gender-buttons"><button class="eclat-gender-btn active" data-gender="all">All</button><button class="eclat-gender-btn" data-gender="Men">Men</button><button class="eclat-gender-btn" data-gender="Women">Women</button><button class="eclat-gender-btn" data-gender="Unisex">Unisex</button></div></div>
      <div class="eclat-filter-group"><label class="eclat-filter-label" for="eclatBrandSearch">SEARCH BRANDS</label><input id="eclatBrandSearch" class="eclat-brand-search" type="search" placeholder="Search for a brand..." autocomplete="off"></div>`;
    const head = shop.querySelector('.shop-head');
    head.insertAdjacentElement('afterend', bar);
    bar.querySelectorAll('.eclat-category-btn').forEach(function (btn) { btn.addEventListener('click', function () { if (typeof currentFilter !== 'undefined') currentFilter = btn.dataset.category; bar.querySelectorAll('.eclat-category-btn').forEach(function (x) { x.classList.toggle('active', x === btn); }); if (typeof renderProducts === 'function') renderProducts(); }); });
    bar.querySelectorAll('.eclat-gender-btn').forEach(function (btn) { btn.addEventListener('click', function () { if (typeof currentGender !== 'undefined') currentGender = btn.dataset.gender; bar.querySelectorAll('.eclat-gender-btn').forEach(function (x) { x.classList.toggle('active', x === btn); }); const select = document.querySelector('#genderFilter'); if (select) select.value = btn.dataset.gender; if (typeof renderProducts === 'function') renderProducts(); }); });
    const brandSearch = bar.querySelector('#eclatBrandSearch');
    if (brandSearch) brandSearch.addEventListener('input', function () { const q = brandSearch.value.trim(); if (typeof searchTerm !== 'undefined') searchTerm = q; if (typeof renderProducts === 'function') renderProducts(); });
  }

  function boot() {
    if (typeof PRODUCTS === 'undefined' || typeof renderProducts !== 'function') { setTimeout(boot, 50); return; }
    addMiddleEastern();
    installStyles();
    if (typeof initBrandDirectory === 'function') initBrandDirectory();
    refineHero();
    refineCollections();
    buildFilters();
    if (typeof renderProducts === 'function') renderProducts();
    const count = document.querySelector('#resultsCount');
    if (count) { const observer = new MutationObserver(function () { const clean = document.querySelector('.eclat-results-count'); if (clean) clean.textContent = count.textContent; }); observer.observe(count, {childList:true,subtree:true,characterData:true}); }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
