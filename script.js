/* Éclat Atelier — deterministic script loader */
/* Load the original storefront first, then the category extension and image fixes. */
document.write('<script src="legacy-script.js"><\/script>');
document.write('<script src="categories.js"><\/script>');
document.write('<script src="image-fixes.js"><\/script>');
