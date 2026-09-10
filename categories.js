/* Éclat Atelier — category navigation + Middle Eastern collection */
(function () {
  function boot() {
    if (typeof PRODUCTS === 'undefined' || typeof renderProducts === 'function' === false) {
      setTimeout(boot, 50);
      return;
    }

    const middleEastern = [
      {id:51,name:'Khamrah',house:'Lattafa',type:'middle-eastern',gender:'Unisex',tags:['amber','woody'],notes:'Cinnamon · Dates · Praline · Vanilla',tone:8,featured:true,image:'https://fimgs.net/mdimg/perfume-thumbs/dark-amber/lattafa-khamrah-1.jpg'},
      {id:52,name:'Asad',house:'Lattafa',type:'middle-eastern',gender:'Men',tags:['amber','woody'],notes:'Black Pepper · Pineapple · Coffee · Vanilla',tone:4,image:'https://fimgs.net/mdimg/perfume-thumbs/dark-amber/lattafa-asad-1.jpg'},
      {id:53,name:'9PM',house:'Afnan',type:'middle-eastern',gender:'Men',tags:['amber','fresh'],notes:'Apple · Cinnamon · Lavender · Vanilla',tone:3,image:'https://fimgs.net/mdimg/perfume-thumbs/dark-amber/afnan-9pm-1.jpg'},
      {id:54,name:'Club de Nuit Intense Man',house:'Armaf',type:'middle-eastern',gender:'Men',tags:['fresh','woody'],notes:'Lemon · Pineapple · Birch · Musk',tone:7,image:'https://fimgs.net/mdimg/perfume-thumbs/dark-amber/armaf-club-de-nuit-intense-man-1.jpg'},
      {id:55,name:'Hawas',house:'Rasasi',type:'middle-eastern',gender:'Men',tags:['fresh','amber'],notes:'Citrus · Marine Notes · Cinnamon · Musk',tone:7,image:'https://fimgs.net/mdimg/perfume-thumbs/dark-amber/rasasi-hawas-for-men-1.jpg'},
      {id:56,name:'Yara',house:'Lattafa',type:'middle-eastern',gender:'Women',tags:['floral','amber'],notes:'Orchid · Heliotrope · Vanilla · Musk',tone:5,image:'https://fimgs.net/mdimg/perfume-thumbs/dark-amber/lattafa-yara-1.jpg'}
    ];

    middleEastern.forEach(function (p) {
      if (!PRODUCTS.some(function (x) { return x.id === p.id; })) PRODUCTS.push(p);
    });

    if (typeof initBrandDirectory === 'function') initBrandDirectory();

    const tools = document.querySelector('.shop-tools');
    if (!tools || document.querySelector('.category-navigation')) return;

    const nav = document.createElement('div');
    nav.className = 'category-navigation';
    nav.innerHTML = `
      <div class="category-row">
        <span class="category-label">CATEGORY</span>
        <div class="category-main">
          <button class="category-btn active" data-category="all">All fragrances</button>
          <button class="category-btn" data-category="middle-eastern">Middle Eastern</button>
          <button class="category-btn" data-category="designer">Designer</button>
          <button class="category-btn" data-category="niche">Niche</button>
        </div>
      </div>
      <div class="category-row">
        <span class="category-label">SHOP BY</span>
        <div class="gender-navigation">
          <button class="gender-btn active" data-gender="all">All</button>
          <button class="gender-btn" data-gender="Men">Men</button>
          <button class="gender-btn" data-gender="Women">Women</button>
          <button class="gender-btn" data-gender="Unisex">Unisex</button>
        </div>
      </div>`;
    tools.prepend(nav);

    const style = document.createElement('style');
    style.textContent = `
      .category-navigation{width:100%;display:grid;gap:12px;padding:0 0 14px;margin-bottom:12px;border-bottom:1px solid #d1cabf}
      .category-row{display:flex;align-items:center;gap:12px;flex-wrap:wrap}
      .category-label{min-width:62px;font-size:8px;letter-spacing:.18em;text-transform:uppercase;color:#817a70}
      .category-main,.gender-navigation{display:flex;flex-wrap:wrap;gap:6px}
      .category-btn,.gender-btn{border:1px solid #cfc8bc;background:#fff;padding:9px 13px;font:600 9px Inter,Arial,sans-serif;text-transform:uppercase;letter-spacing:.08em;cursor:pointer;transition:.2s}
      .category-btn:hover,.gender-btn:hover,.category-btn.active,.gender-btn.active{background:#171714;color:#fff;border-color:#171714}
      .gender-btn{font-weight:500;padding:8px 12px}
      @media(max-width:700px){.category-row{align-items:flex-start;flex-direction:column;gap:7px}.category-main,.gender-navigation{width:100%;overflow-x:auto;flex-wrap:nowrap;padding-bottom:3px}.category-btn,.gender-btn{white-space:nowrap}}
    `;
    document.head.appendChild(style);

    document.querySelectorAll('.category-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        currentFilter = btn.dataset.category;
        document.querySelectorAll('.category-btn').forEach(function (x) { x.classList.toggle('active', x === btn); });
        document.querySelectorAll('.filter').forEach(function (x) { x.classList.toggle('active', x.dataset.filter === currentFilter); });
        renderProducts();
      });
    });

    document.querySelectorAll('.gender-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        currentGender = btn.dataset.gender;
        document.querySelectorAll('.gender-btn').forEach(function (x) { x.classList.toggle('active', x === btn); });
        const select = document.querySelector('#genderFilter');
        if (select) select.value = currentGender;
        renderProducts();
      });
    });

    const reset = document.querySelector('#resetFilters');
    if (reset) reset.addEventListener('click', function () {
      setTimeout(function () {
        document.querySelectorAll('.category-btn').forEach(function (x) { x.classList.toggle('active', x.dataset.category === 'all'); });
        document.querySelectorAll('.gender-btn').forEach(function (x) { x.classList.toggle('active', x.dataset.gender === 'all'); });
      }, 0);
    });

    const count = document.querySelector('.shop-head .eyebrow');
    if (count) count.textContent = 'THE EDIT · 56 SIGNATURE SCENTS';
    const results = document.querySelector('#resultsCount');
    if (results && results.textContent.includes('50')) results.textContent = '56 fragrances';
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
