/* Éclat Atelier — category navigation extension */
(function(){
  const middleEastern = [
    {id:51,name:"Khamrah",house:"Lattafa",type:"middle-eastern",gender:"Unisex",tags:["amber","woody"],notes:"Cinnamon · Dates · Praline · Vanilla",tone:8,featured:true},
    {id:52,name:"Asad",house:"Lattafa",type:"middle-eastern",gender:"Men",tags:["amber","woody"],notes:"Black Pepper · Pineapple · Coffee · Vanilla",tone:4},
    {id:53,name:"9PM",house:"Afnan",type:"middle-eastern",gender:"Men",tags:["amber","fresh"],notes:"Apple · Cinnamon · Lavender · Vanilla",tone:3},
    {id:54,name:"Club de Nuit Intense Man",house:"Armaf",type:"middle-eastern",gender:"Men",tags:["fresh","woody"],notes:"Lemon · Pineapple · Birch · Musk",tone:7},
    {id:55,name:"Hawas",house:"Rasasi",type:"middle-eastern",gender:"Men",tags:["fresh","amber"],notes:"Citrus · Marine Notes · Cinnamon · Musk",tone:7},
    {id:56,name:"Yara",house:"Lattafa",type:"middle-eastern",gender:"Women",tags:["floral","amber"],notes:"Orchid · Heliotrope · Vanilla · Musk",tone:5}
  ];
  middleEastern.forEach(p=>{if(!PRODUCTS.some(x=>x.id===p.id))PRODUCTS.push(p);});

  const tools=document.querySelector('.shop-tools');
  if(!tools) return;

  const categoryWrap=document.createElement('div');
  categoryWrap.className='category-navigation';
  categoryWrap.innerHTML=`
    <div class="category-label">CATEGORY</div>
    <div class="category-main" role="tablist" aria-label="Fragrance category">
      <button class="category-btn active" data-category="all">All fragrances</button>
      <button class="category-btn" data-category="middle-eastern">Middle Eastern</button>
      <button class="category-btn" data-category="designer">Designer</button>
      <button class="category-btn" data-category="niche">Niche</button>
    </div>
    <div class="category-label gender-label">SHOP BY</div>
    <div class="gender-navigation" role="tablist" aria-label="Gender">
      <button class="gender-btn active" data-gender="all">All</button>
      <button class="gender-btn" data-gender="Men">Men</button>
      <button class="gender-btn" data-gender="Women">Women</button>
      <button class="gender-btn" data-gender="Unisex">Unisex</button>
    </div>`;
  tools.prepend(categoryWrap);

  const style=document.createElement('style');
  style.textContent=`
    .category-navigation{width:100%;display:flex;flex-direction:column;gap:9px;padding:0 0 8px;border-bottom:1px solid #d1cabf}
    .category-label{font-size:8px;letter-spacing:.18em;text-transform:uppercase;color:#817a70}
    .gender-label{margin-top:5px}
    .category-main,.gender-navigation{display:flex;flex-wrap:wrap;gap:6px}
    .category-btn,.gender-btn{border:1px solid #cfc8bc;background:transparent;padding:8px 12px;font:600 9px Inter,Arial,sans-serif;text-transform:uppercase;letter-spacing:.09em;cursor:pointer;transition:.2s}
    .category-btn:hover,.gender-btn:hover,.category-btn.active,.gender-btn.active{background:#171714;color:#fff;border-color:#171714}
    .gender-btn{font-weight:500;padding:7px 11px}
    @media(max-width:900px){.shop-head{flex-direction:column}.shop-tools{width:100%;align-items:stretch}.filter-tabs{justify-content:flex-start}.category-navigation{order:-1}.catalog-filters{display:flex;flex-wrap:wrap;gap:10px}.catalog-filters select{flex:1;min-width:130px}}
    @media(max-width:600px){.category-main,.gender-navigation{overflow-x:auto;flex-wrap:nowrap;padding-bottom:3px}.category-btn,.gender-btn{white-space:nowrap}.catalog-filters{display:grid;grid-template-columns:1fr}.catalog-filters select{width:100%}}
  `;
  document.head.appendChild(style);

  document.querySelectorAll('.category-btn').forEach(btn=>btn.addEventListener('click',()=>{
    currentFilter=btn.dataset.category;
    document.querySelectorAll('.category-btn').forEach(x=>x.classList.toggle('active',x===btn));
    document.querySelectorAll('.filter').forEach(x=>x.classList.toggle('active',x.dataset.filter===currentFilter));
    renderProducts();
  }));
  document.querySelectorAll('.gender-btn').forEach(btn=>btn.addEventListener('click',()=>{
    currentGender=btn.dataset.gender;
    document.querySelectorAll('.gender-btn').forEach(x=>x.classList.toggle('active',x===btn));
    document.querySelector('#genderFilter').value=currentGender;
    renderProducts();
  }));

  const oldReset=window.resetFilters;
  window.resetFilters=function(){
    oldReset();
    document.querySelectorAll('.category-btn').forEach(x=>x.classList.toggle('active',x.dataset.category==='all'));
    document.querySelectorAll('.gender-btn').forEach(x=>x.classList.toggle('active',x.dataset.gender==='all'));
  };

  const oldRender=window.renderProducts;
  window.renderProducts=function(){
    oldRender();
    document.querySelectorAll('.category-btn').forEach(x=>x.classList.toggle('active',x.dataset.category===currentFilter));
    document.querySelectorAll('.gender-btn').forEach(x=>x.classList.toggle('active',x.dataset.gender===currentGender));
  };

  const count=document.querySelector('.eyebrow');
  if(count && count.textContent.includes('50')) count.textContent='THE EDIT · 56 SIGNATURE SCENTS';
})();
