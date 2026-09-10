/* Éclat Atelier — deterministic, non-blocking script loader */
(function () {
  const files = ['legacy-script.js', 'categories.js', 'image-fixes.js'];
  let index = 0;

  function loadNext() {
    if (index >= files.length) return;
    const src = files[index++];
    if (document.querySelector('script[data-eclat-src="' + src + '"]')) {
      loadNext();
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.async = false;
    script.dataset.eclatSrc = src;
    script.onload = loadNext;
    script.onerror = function () {
      console.error('Éclat Atelier: failed to load ' + src);
      loadNext();
    };
    document.body.appendChild(script);
  }

  loadNext();
})();
