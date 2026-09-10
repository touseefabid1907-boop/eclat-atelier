/* Éclat Atelier — deterministic script loader */
/* Load the original storefront first, then the category extension. */
document.write('<script src="legacy-script.js"><\\/script>');
document.write('<script src="categories.js"><\\/script>');
