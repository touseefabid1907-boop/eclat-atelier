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
      .collection-card{position:relative;overflow:hidden;min-height:285px;border:0;background-position:center;background-size:cover;background-repeat:no-repeat;isolation:isolate}
      .collection-card:before{content:'';position:absolute;inset:0;z-index:-1;opacity:.96}
      .collection-card:after{content:'';position:absolute;inset:0;z-index:-1;pointer-events:none;background:linear-gradient(135deg,rgba(255,255,255,.06),transparent 45%,rgba(0,0,0,.16))}
      /* Reliable inline CSS artwork — no third-party image host is required. */
      .collection-dark{background-image:radial-gradient(ellipse at 22% 25%,rgba(119,89,61,.58),transparent 28%),radial-gradient(ellipse at 78% 75%,rgba(74,48,31,.6),transparent 35%),repeating-linear-gradient(8deg,rgba(30,20,14,.9) 0 9px,rgba(78,53,36,.95) 10px 17px,rgba(34,23,17,.95) 18px 27px,rgba(103,72,48,.75) 28px 34px);background-color:#2b1d15!important}
      .collection-dark:before{background:linear-gradient(90deg,transparent,rgba(196,155,110,.16) 48%,transparent 62%),repeating-linear-gradient(173deg,transparent 0 24px,rgba(220,177,128,.12) 25px 27px,transparent 28px 47px)}
      .collection-sand{background-image:radial-gradient(ellipse at 18% 30%,rgba(255,255,255,.95) 0 9%,transparent 28%),radial-gradient(ellipse at 72% 38%,rgba(255,250,242,.9) 0 11%,transparent 31%),radial-gradient(ellipse at 50% 82%,rgba(239,223,205,.95) 0 14%,transparent 35%),linear-gradient(135deg,#b7a596,#ded0c1 48%,#a99788)!important;background-color:#cbbbae!important}
      .collection-sand:before{background:radial-gradient(ellipse at 28% 20%,rgba(255,255,255,.9) 0 3%,transparent 4% 100%),radial-gradient(ellipse at 68% 63%,rgba(255,255,255,.75) 0 4%,transparent 5% 100%),linear-gradient(115deg,transparent 35%,rgba(125,101,85,.12) 36% 37%,transparent 38% 100%);filter:blur(2px)}
      .collection-olive{background-image:radial-gradient(circle at 18% 25%,rgba(211,220,164,.72) 0 7%,transparent 8%),radial-gradient(circle at 78% 72%,rgba(185,199,133,.7) 0 8%,transparent 9%),linear-gradient(135deg,#697451,#9a9e68 46%,#4c5b3f)!important;background-color:#697451!important}
      .collection-olive:before{background:repeating-linear-gradient(118deg,transparent 0 31px,rgba(37,55,29,.22) 32px 35px,transparent 36px 66px),repeating-linear-gradient(24deg,transparent 0 42px,rgba(225,219,157,.16) 43px 46px,transparent 47px 85px)}
      .collection-rose{background-image:radial-gradient(circle at 26% 35%,rgba(255,221,174,.9) 0 7%,transparent 8%),radial-gradient(circle at 69% 27%,rgba(235,184,111,.82) 0 8%,transparent 9%),radial-gradient(circle at 78% 78%,rgba(157,91,42,.75) 0 11%,transparent 12%),linear-gradient(135deg,#4a2b1b,#9a5f2d 52%,#3a2419)!important;background-color:#56301c!important}
      .collection-rose:before{background:repeating-linear-gradient(28deg,transparent 0 28px,rgba(242,184,103,.16) 29px 35px,transparent 36px 58px),repeating-linear-gradient(152deg,transparent 0 37px,rgba(255,219,143,.12) 38px 43px,transparent 44px 71px)}
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
    /* Keep the original embedded artwork in index.html. It is the most reliable source and cannot 404. */
    const image = hero.querySelector('.hero-bottles img');
    if (image) {
      image.alt = 'Creed Aventus and Louis Vuitton Imagination';
      image.loading = 'eager';
      image.decoding = 'async';
      image.style.display = 'block';
      image.style.visibility = 'visible';
      image.onerror = function () { image.style.display = 'block'; };
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
