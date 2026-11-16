// 更新按鈕：強制向伺服器拿最新的網頁與樣式，再重新整理
(function () {
  var btn = document.getElementById('refreshBtn');
  if (!btn) return;
  btn.addEventListener('click', function () {
    btn.classList.add('spin'); btn.disabled = true;
    var urls = [location.href];
    document.querySelectorAll('link[rel="stylesheet"][href]:not([href^="http"]), script[src]:not([src^="http"])').forEach(function (el) {
      urls.push(el.href || el.src);
    });
    var data = document.body.getAttribute('data-refresh');
    if (data) urls.push(new URL(data, location.href).href);
    Promise.all(urls.map(function (u) { return fetch(u, { cache: 'reload' }).catch(function () {}); }))
      .then(function () { location.reload(); });
    setTimeout(function () { location.reload(); }, 4000);
  });
})();
