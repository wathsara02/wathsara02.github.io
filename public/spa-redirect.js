// GitHub Pages serves 404.html for unknown paths; it redirects to /?p=<path>.
// This puts the original path back before the app boots. Kept as a file (not
// inline) so the Content-Security-Policy can forbid inline scripts.
(function () {
  var match = window.location.search.match(/[?&]p=([^&]+)/);
  if (!match) return;
  var rest = window.location.search.replace(/[?&]p=[^&]+/, '').replace(/^&/, '?');
  window.history.replaceState(null, '', decodeURIComponent(match[1]) + rest + window.location.hash);
})();
