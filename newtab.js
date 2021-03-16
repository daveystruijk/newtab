(function() {
  window.fetch = (function(fetch) {
    return function(fn, t) {
      const begin = Date.now();
      return fetch.apply(this, arguments).then(function(response) {
        response.timing = Date.now() - begin;
        return response;
      });
    };
  })(window.fetch);

  document.querySelectorAll('#links a').forEach((el) => {
    const url = el.getAttribute('href');
    fetch(url, { mode: 'no-cors', cache: 'no-cache' })
      .then(function(response) {
        el.querySelector('.timing').classList.add('good');
        el.querySelector('.timing').innerHTML = `${response.timing}ms`;
      }).catch(function(err) {
        el.querySelector('.timing').classList.add('bad');
        el.querySelector('.timing').innerHTML = 'ERR';
      });
  });
})();

