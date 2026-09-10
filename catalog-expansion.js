/* Éclat Atelier — curated catalogue expansion + featured/category rendering */
(function () {
  'use strict';

  if (typeof PRODUCTS === 'undefined' || !Array.isArray(PRODUCTS)) return;

  var products = PRODUCTS;
  var originalRenderProducts = typeof renderProducts === 'function' ? renderProducts : null;
  var fallbackImage = 'product-fallback.svg';

  var additions = [
    {id:79,name:"Sauvage Eau de Parfum",house:"Dior",brand:"Dior",type:"designer",gender:"Men",tags:["fresh","amber"],notes:"Bergamot · Pepper · Lavender · Vanilla",tone:7,image:"https://www.dior.com/dw/image/v2/BGXS_PRD/on/demandware.static/-/Sites-master_dior/default/dw24a244fd/Y0785220/Y0785220_F078524009_E01_RHC.jpg?sw=800",featured:true},
    {id:80,name:"Sauvage Eau de Toilette",house:"Dior",brand:"Dior",type:"designer",gender:"Men",tags:["fresh","woody"],notes:"Bergamot · Pepper · Ambroxan · Cedar",tone:7,image:"https://www.dior.com/dw/image/v2/BGXS_PRD/on/demandware.static/-/Sites-master_dior/default/dw24a244fd/Y0685240/Y0685240_F068524009_E01_RHC.jpg?sw=800",featured:false},
    {id:81,name:"Sauvage Elixir",house:"Dior",brand:"Dior",type:"designer",gender:"Men",tags:["amber","woody"],notes:"Grapefruit · Spices · Lavender · Woods",tone:8,image:"https://www.dior.com/dw/image/v2/BGXS_PRD/on/demandware.static/-/Sites-master_dior/default/dw7f4c6a1a/Y0996460/Y0996460_F099646009_E01_RHC.jpg?sw=800",featured:false},
    {id:82,name:"Acqua di Giò Eau de Toilette",house:"Giorgio Armani",brand:"Armani",type:"designer",gender:"Men",tags:["fresh","woody"],notes:"Marine Notes · Bergamot · Rosemary · Cedar",tone:7,image:"https://www.giorgioarmanibeauty.com/on/demandware.static/-/Sites-armani-master-catalog/default/dw2f7f5f44/products/men/acqua-di-gio-eau-de-toilette/3614273951692.jpg",featured:false},
    {id:83,name:"Stronger With You Absolutely",house:"Emporio Armani",brand:"Armani",type:"designer",gender:"Men",tags:["amber","woody"],notes:"Rum · Chestnut · Vanilla · Cedar",tone:8,image:"https://www.armani.com/dw/image/v2/BBQX_PRD/on/demandware.static/-/Sites-armani-master-catalog/default/dw6e4d1d0f/stronger-with-you-absolutely/3614273069557.jpg",featured:false},
    {id:84,name:"Bleu de Chanel Eau de Parfum",house:"Chanel",brand:"Chanel",type:"designer",gender:"Men",tags:["woody","fresh"],notes:"Lemon · Ginger · Cedar · Sandalwood",tone:7,image:"https://www.chanel.com/images/q_auto:good,f_auto,dpr_1.0/w_640,c_scale,c_limit/BLEU-DE-CHANEL-EAU-DE-PARFUM-spray-3-4FL-OZ--packshot-default-107360-883869.jpg",featured:false},
    {id:85,name:"Chance Eau Tendre Eau de Parfum",house:"Chanel",brand:"Chanel",type:"designer",gender:"Women",tags:["floral","fresh"],notes:"Quince · Rose · Jasmine · Musk",tone:5,image:"https://www.chanel.com/images/q_auto:good,f_auto,dpr_1.0/w_640,c_scale,c_limit/CHANCE-EAU-TENDRE-EAU-DE-PARFUM-spray-3-4FL-OZ--packshot-default-116650-884031.jpg",featured:false},
    {id:86,name:"Oud Wood Eau de Parfum",house:"Tom Ford",brand:"Tom Ford",type:"designer",gender:"Unisex",tags:["woody","amber"],notes:"Rosewood · Cardamom · Oud · Amber",tone:8,image:"https://www.tomfordbeauty.com/dw/image/v2/BBWM_PRD/on/demandware.static/-/Sites-tomford-master-catalog/default/dw8e8b9b52/T5E-OUDINTENSE/OUD_WOOD_EAU_DE_PARFUM_50ML.jpg",featured:false},
    {id:87,name:"Tobacco Vanille Eau de Parfum",house:"Tom Ford",brand:"Tom Ford",type:"designer",gender:"Unisex",tags:["amber","woody"],notes:"Tobacco · Vanilla · Cacao · Tonka",tone:4,image:"https://www.tomfordbeauty.com/dw/image/v2/BBWM_PRD/on/demandware.static/-/Sites-tomford-master-catalog/default/dw5f6d5e6d/T5E-TABVAN/TOBACCO_VANILLE_EAU_DE_PARFUM_50ML.jpg",featured:false},
    {id:88,name:"Y Eau de Parfum",house:"Yves Saint Laurent",brand:"YSL",type:"designer",gender:"Men",tags:["fresh","woody"],notes:"Apple · Ginger · Sage · Cedar",tone:7,image:"https://www.yslbeauty.es/dw/image/v2/BBTN_PRD/on/demandware.static/-/Sites-ysl-master-catalog/default/dw4e8a8a15/WW-51052YSL/WW-51052YSL_1.jpg",featured:false},
    {id:89,name:"La Nuit de L'Homme Eau de Toilette",house:"Yves Saint Laurent",brand:"YSL",type:"designer",gender:"Men",tags:["amber","woody"],notes:"Cardamom · Lavender · Cedar · Vetiver",tone:8,image:"https://www.yslbeauty.es/dw/image/v2/BBTN_PRD/on/demandware.static/-/Sites-ysl-master-catalog/default/dw8f7e1d3d/WW-40151YSL/WW-40151YSL_1.jpg",featured:false},
    {id:90,name:"Aventus",house:"Creed",brand:"Creed",type:"niche",gender:"Men",tags:["fresh","woody"],notes:"Pineapple · Bergamot · Birch · Oakmoss",tone:1,image:"https://www.pieper.de/media/image/b2/00/01/CREED_Aventus_EdP_100ml.jpg",featured:false},
    {id:91,name:"Green Irish Tweed",house:"Creed",brand:"Creed",type:"niche",gender:"Men",tags:["fresh","woody"],notes:"Lemon · Violet Leaf · Iris · Sandalwood",tone:7,image:"https://www.creedfragrance.com/dw/image/v2/BJQN_PRD/on/demandware.static/-/Sites-creed-master-catalog/default/dw6b2d9f5a/green-irish-tweed-100ml.jpg",featured:false},
    {id:92,name:"Baccarat Rouge 540 Eau de Parfum",house:"Maison Francis Kurkdjian",brand:"Maison Francis Kurkdjian",type:"niche",gender:"Unisex",tags:["amber","woody"],notes:"Saffron · Jasmine · Amberwood · Cedar",tone:4,image:"https://www.franciskurkdjian.com/on/demandware.static/-/Sites-mfk-master-catalog/default/dw7e0a6d5b/baccarat-rouge-540-edp-70ml.jpg",featured:false},
    {id:93,name:"Grand Soir",house:"Maison Francis Kurkdjian",brand:"Maison Francis Kurkdjian",type:"niche",gender:"Unisex",tags:["amber","woody"],notes:"Amber · Benzoin · Vanilla · Labdanum",tone:8,image:"https://www.franciskurkdjian.com/on/demandware.static/-/Sites-mfk-master-catalog/default/dw2b1e8d1c/grand-soir-70ml.jpg",featured:false},
    {id:94,name:"Interlude Man",house:"Amouage",brand:"Amouage",type:"niche",gender:"Men",tags:["amber","woody"],notes:"Oregano · Amber · Incense · Oud",tone:8,image:"https://amouage.com/cdn/shop/files/InterludeMan100ml.jpg?v=1",featured:false},
    {id:95,name:"Guidance",house:"Amouage",brand:"Amouage",type:"niche",gender:"Women",tags:["floral","amber"],notes:"Pear · Rose · Frankincense · Sandalwood",tone:5,image:"https://amouage.com/cdn/shop/files/Guidance50ml.jpg?v=1",featured:false},
    {id:96,name:"Layton",house:"Parfums de Marly",brand:"Parfums de Marly",type:"niche",gender:"Unisex",tags:["amber","woody"],notes:"Apple · Bergamot · Jasmine · Vanilla",tone:8,image:"https://parfums-de-marly.com/cdn/shop/files/Layton75ml.jpg?v=1",featured:false},
    {id:97,name:"Herod",house:"Parfums de Marly",brand:"Parfums de Marly",type:"niche",gender:"Men",tags:["woody","amber"],notes:"Cinnamon · Tobacco · Vanilla · Cedar",tone:4,image:"https://parfums-de-marly.com/cdn/shop/files/Herod125ml.jpg?v=1",featured:false},
    {id:98,name:"Erba Pura",house:"Xerjoff",brand:"Xerjoff",type:"niche",gender:"Unisex",tags:["fresh","floral"],notes:"Citrus · Fruits · Amber · White Musk",tone:7,image:"https://www.xerjoff.com/cdn/shop/files/ErbaPura.jpg?v=1",featured:false},
    {id:99,name:"Alexandria II",house:"Xerjoff",brand:"Xerjoff",type:"niche",gender:"Unisex",tags:["woody","amber"],notes:"Apple · Lavender · Cinnamon · Oud",tone:8,image:"https://www.xerjoff.com/cdn/shop/files/AlexandriaII.jpg?v=1",featured:false},
    {id:100,name:"Khamrah Qahwa",house:"Lattafa",brand:"Lattafa",type:"middle-eastern",gender:"Unisex",tags:["amber","woody"],notes:"Coffee · Cinnamon · Vanilla · Praline",tone:4,image:"https://fimgs.net/mdimg/perfume-thumbs/dark-amber/lattafa-khamrah-qahwa-1.jpg",featured:false},
    {id:101,name:"Mayar",house:"Lattafa",brand:"Lattafa",type:"middle-eastern",gender:"Women",tags:["floral","fresh"],notes:"Lychee · Raspberry · Jasmine · Vanilla",tone:5,image:"https://fimgs.net/mdimg/perfume-thumbs/dark-amber/lattafa-mayar-1.jpg",featured:false},
    {id:102,name:"Amber Wood",house:"Ajmal",brand:"Ajmal",type:"middle-eastern",gender:"Unisex",tags:["amber","woody"],notes:"Cardamom · Apple · Lavender · Amber",tone:8,image:"https://fimgs.net/mdimg/perfume-thumbs/dark-amber/ajmal-amber-wood-1.jpg",featured:false},
    {id:103,name:"Evoke Gold",house:"Ajmal",brand:"Ajmal",type:"middle-eastern",gender:"Men",tags:["woody","fresh"],notes:"Lemon · Lavender · Violet · Cedar",tone:7,image:"https://fimgs.net/mdimg/perfume-thumbs/dark-amber/ajmal-evoke-gold-for-him-1.jpg",featured:false},
    {id:104,name:"Hawas for Him",house:"Rasasi",brand:"Rasasi",type:"middle-eastern",gender:"Men",tags:["fresh","amber"],notes:"Apple · Lemon · Cinnamon · Musk",tone:7,image:"https://fimgs.net/mdimg/perfume-thumbs/dark-amber/rasasi-hawas-for-men-1.jpg",featured:false},
    {id:105,name:"La Yuqawam Homme",house:"Rasasi",brand:"Rasasi",type:"middle-eastern",gender:"Men",tags:["woody","amber"],notes:"Raspberry · Saffron · Leather · Oud",tone:8,image:"https://fimgs.net/mdimg/perfume-thumbs/dark-amber/rasasi-la-yuqawam-homme-1.jpg",featured:false},
    {id:106,name:"Kalemat",house:"Arabian Oud",brand:"Arabian Oud",type:"middle-eastern",gender:"Unisex",tags:["amber","woody"],notes:"Caramel · Vanilla · Musk · Amber",tone:4,image:"https://es.arabianoud.com/media/catalog/product/k/a/kalemat-100-ml.jpg",featured:false},
    {id:107,name:"Arabian Knight",house:"Arabian Oud",brand:"Arabian Oud",type:"middle-eastern",gender:"Men",tags:["woody","amber"],notes:"Saffron · Leather · Oud · Amber",tone:8,image:"https://fimgs.net/mdimg/perfume-thumbs/dark-amber/arabian-oud-arabian-knight-1.jpg",featured:false},
    {id:108,name:"Shaghaf Oud",house:"Swiss Arabian",brand:"Swiss Arabian",type:"middle-eastern",gender:"Unisex",tags:["amber","woody"],notes:"Saffron · Praline · Rose · Oud",tone:4,image:"https://fimgs.net/mdimg/perfume-thumbs/dark-amber/swiss-arabian-shaghaf-oud-1.jpg",featured:false},
    {id:109,name:"Shaghaf Oud Azraq",house:"Swiss Arabian",brand:"Swiss Arabian",type:"middle-eastern",gender:"Unisex",tags:["amber","woody"],notes:"Honey · Cinnamon · Oud · Vanilla",tone:8,image:"https://fimgs.net/mdimg/perfume-thumbs/dark-amber/swiss-arabian-shaghaf-oud-azraq-1.jpg",featured:false}
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
      if (brandSlug === 'yvessaintlaurent') brandSlug = 'ysl';
      if (brandSlug && !categories.includes('brand:' + brandSlug)) categories.push('brand:' + brandSlug);
    }
    var gender = String(product.gender || '').toLowerCase();
    if (gender === 'men' || gender === 'women' || gender === 'unisex') {
      if (!categories.includes(gender)) categories.push(gender);
    }
    product.categories = categories;
  }

  products.forEach(normalizeCategories);

  var featuredIds = [1,4,7,16,18,20,22,25,28,39,51,79];
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