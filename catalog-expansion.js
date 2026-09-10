/* Éclat Atelier — curated catalogue expansion + featured/category rendering */
(function () {
  'use strict';

  if (typeof PRODUCTS === 'undefined' || !Array.isArray(PRODUCTS)) return;

  var products = PRODUCTS;
  var originalRenderProducts = typeof renderProducts === 'function' ? renderProducts : null;
  var nextId = 57;
  var fallbackImage = 'product-fallback.svg';

  var additions = [
    {id:57,name:"Le Male Le Parfum",house:"Jean Paul Gaultier",brand:"Jean Paul Gaultier",type:"designer",gender:"Men",tags:["amber","woody"],notes:"Cardamom · Lavender · Iris · Vanilla",tone:8,image:fallbackImage,featured:false},
    {id:58,name:"1 Million Eau de Toilette",house:"Rabanne",brand:"Rabanne",type:"designer",gender:"Men",tags:["amber","woody"],notes:"Cinnamon · Leather · Rose · Amber",tone:4,image:fallbackImage,featured:false},
    {id:59,name:"Light Blue Eau de Toilette",house:"Dolce & Gabbana",brand:"Dolce & Gabbana",type:"designer",gender:"Women",tags:["fresh","floral"],notes:"Sicilian Lemon · Apple · Jasmine · Cedar",tone:7,image:fallbackImage,featured:false},
    {id:60,name:"Invictus Eau de Toilette",house:"Rabanne",brand:"Rabanne",type:"designer",gender:"Men",tags:["fresh","woody"],notes:"Grapefruit · Bay Leaf · Marine Notes · Guaiac Wood",tone:7,image:fallbackImage,featured:false},
    {id:61,name:"Terre d'Hermès Eau de Toilette",house:"Hermès",brand:"Hermès",type:"designer",gender:"Men",tags:["woody","fresh"],notes:"Orange · Pepper · Vetiver · Cedar",tone:1,image:fallbackImage,featured:false},
    {id:62,name:"Allure Homme Sport Eau Extrême",house:"Chanel",brand:"Chanel",type:"designer",gender:"Men",tags:["fresh","woody"],notes:"Mandarin · Mint · Cypress · Tonka",tone:7,image:fallbackImage,featured:false},
    {id:63,name:"Stronger With You Intensely",house:"Emporio Armani",brand:"Armani",type:"designer",gender:"Men",tags:["amber","woody"],notes:"Pink Pepper · Toffee · Cinnamon · Vanilla",tone:4,image:fallbackImage,featured:false},
    {id:64,name:"The Most Wanted Eau de Parfum Intense",house:"Azzaro",brand:"Azzaro",type:"designer",gender:"Men",tags:["amber","woody"],notes:"Cardamom · Toffee · Amberwood",tone:8,image:fallbackImage,featured:false},
    {id:65,name:"Angels' Share",house:"By Kilian",brand:"Kilian",type:"niche",gender:"Unisex",tags:["amber","woody"],notes:"Cognac · Cinnamon · Tonka · Oak",tone:8,image:fallbackImage,featured:false},
    {id:66,name:"XJ 1861 Naxos",house:"Xerjoff",brand:"Xerjoff",type:"niche",gender:"Unisex",tags:["amber","woody"],notes:"Lemon · Lavender · Honey · Tobacco · Vanilla",tone:4,image:fallbackImage,featured:false},
    {id:67,name:"Side Effect",house:"Initio Parfums Privés",brand:"Initio",type:"niche",gender:"Unisex",tags:["amber","woody"],notes:"Tobacco · Rum · Vanilla · Cinnamon",tone:4,image:fallbackImage,featured:false},
    {id:68,name:"Oud for Greatness",house:"Initio Parfums Privés",brand:"Initio",type:"niche",gender:"Unisex",tags:["woody","amber"],notes:"Saffron · Lavender · Oud · Patchouli",tone:8,image:fallbackImage,featured:false},
    {id:69,name:"Reflection Man",house:"Amouage",brand:"Amouage",type:"niche",gender:"Men",tags:["floral","woody"],notes:"Rosemary · Neroli · Jasmine · Sandalwood",tone:5,image:fallbackImage,featured:false},
    {id:70,name:"Hacivat",house:"Nishane",brand:"Nishane",type:"niche",gender:"Unisex",tags:["fresh","woody"],notes:"Pineapple · Bergamot · Jasmine · Oakmoss",tone:1,image:fallbackImage,featured:false},
    {id:71,name:"Gris Charnel Extrait",house:"BDK Parfums",brand:"BDK",type:"niche",gender:"Unisex",tags:["woody","amber"],notes:"Fig · Black Tea · Cardamom · Sandalwood",tone:8,image:fallbackImage,featured:false},
    {id:72,name:"Vibrato",house:"Sospiro",brand:"Sospiro",type:"niche",gender:"Unisex",tags:["fresh","floral"],notes:"Grapefruit · Bergamot · Jasmine · Musk",tone:7,image:fallbackImage,featured:false},
    {id:73,name:"Eclaire",house:"Lattafa",brand:"Lattafa",type:"middle-eastern",gender:"Women",tags:["amber","floral"],notes:"Caramel · Milk · Vanilla · Honey",tone:5,image:fallbackImage,featured:false},
    {id:74,name:"Bade'e Al Oud Honor & Glory",house:"Lattafa",brand:"Lattafa",type:"middle-eastern",gender:"Unisex",tags:["amber","woody"],notes:"Pineapple · Crème Brûlée · Cinnamon · Vanilla",tone:8,image:fallbackImage,featured:false},
    {id:75,name:"Oud for Glory",house:"Lattafa",brand:"Lattafa",type:"middle-eastern",gender:"Unisex",tags:["woody","amber"],notes:"Saffron · Nutmeg · Oud · Patchouli",tone:8,image:fallbackImage,featured:false},
    {id:76,name:"Club de Nuit Untold",house:"Armaf",brand:"Armaf",type:"middle-eastern",gender:"Unisex",tags:["amber","woody"],notes:"Saffron · Jasmine · Amberwood · Cedar",tone:4,image:fallbackImage,featured:false},
    {id:77,name:"Hawas Ice",house:"Rasasi",brand:"Rasasi",type:"middle-eastern",gender:"Men",tags:["fresh","amber"],notes:"Apple · Lemon · Marine Notes · Musk",tone:7,image:fallbackImage,featured:false},
    {id:78,name:"L'Aventure",house:"Al Haramain",brand:"Al Haramain",type:"middle-eastern",gender:"Men",tags:["fresh","woody"],notes:"Lemon · Bergamot · Pineapple · Cedar",tone:1,image:fallbackImage,featured:false}
  ];

  additions.forEach(function (product) {
    if (!products.some(function (existing) { return existing.id === product.id; })) products.push(product);
  });

  function slug(value) {
    return String(value || '').toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '').trim();
  }

  function normalizeCategories(product) {
    var categories = Array.isArray(product.categories) ? product.categories.slice() : [];
    var type = product.type === 'middle-eastern' ? 'middleeastern' : String(product.type || '').toLowerCase();
    var brand = product.brand || product.house || '';
    if (type && !categories.includes(type)) categories.push(type);
    if (brand) {
      var brandSlug = slug(brand);
      if (brandSlug === 'maisonfranciskurkdjian') brandSlug = 'mfk';
      if (brandSlug === 'louisvuitton') brandSlug = 'louisvuitton';
      if (brandSlug === 'giorgioarmani' || brandSlug === 'emporioarmani') brandSlug = 'armani';
      if (brandSlug && !categories.includes('brand:' + brandSlug)) categories.push('brand:' + brandSlug);
    }
    var gender = String(product.gender || '').toLowerCase();
    if (gender === 'men' || gender === 'women' || gender === 'unisex') {
      if (!categories.includes(gender)) categories.push(gender);
    }
    product.categories = categories;
  }

  products.forEach(normalizeCategories);

  /* Keep the existing ten homepage picks and keep every other perfume discoverable by filters. */
  var featuredIds = [1,4,7,16,18,20,22,25,28,39];
  products.forEach(function (product) {
    product.featured = featuredIds.indexOf(product.id) !== -1;
  });

  function renderSubset(list) {
    if (!originalRenderProducts) return;
    var snapshot = products.slice();
    products.splice(0, products.length);
    list.forEach(function (product) { products.push(product); });
    try {
      originalRenderProducts();
    } finally {
      products.splice(0, products.length);
      snapshot.forEach(function (product) { products.push(product); });
    }
  }

  window.renderFeatured = function () {
    renderSubset(products.filter(function (product) { return product.featured === true; }));
  };

  window.renderByCategory = function (category) {
    var filtered = products.filter(function (product) {
      return Array.isArray(product.categories) && product.categories.includes(category);
    });
    renderSubset(filtered);
  };

  /* All generic calls now resolve to the minimal featured view rather than the full catalogue. */
  if (originalRenderProducts) {
    window.renderProducts = function () { renderFeatured(); };
  }

  function bindProductFilters() {
    document.querySelectorAll('.product-filter-bar button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var filter = btn.getAttribute('data-filter');
        if (filter === 'featured') renderFeatured();
        else renderByCategory(filter);
      });
    });
    renderFeatured();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bindProductFilters, {once:true});
  else bindProductFilters();
})();
