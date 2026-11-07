(function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
  var form = document.getElementById('contact-form');
  if (form) {
    var status = form.querySelector('.form-status');
    var button = form.querySelector('button[type="submit"]');
    var key = form.querySelector('input[name="access_key"]');
    function setStatus(text, kind) {
      status.textContent = text;
      status.className = 'form-status' + (kind ? ' ' + kind : '');
    }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var invalid = false;
      form.querySelectorAll('input[required], input[type="email"]').forEach(function (el) {
        var bad = !el.checkValidity();
        el.setAttribute('aria-invalid', bad ? 'true' : 'false');
        if (bad) invalid = true;
      });
      if (invalid) { setStatus('Please enter your name and a valid email address.', 'err'); return; }
      if (!key || !key.value || key.value.indexOf('YOUR_') === 0) {
        setStatus('The contact form is not configured yet. Please try again later.', 'err');
        return;
      }
      if (form.querySelector('input[name="botcheck"]').checked) return;
      var data = {};
      new FormData(form).forEach(function (v, k) { if (k !== 'botcheck') data[k] = v; });
      button.disabled = true;
      setStatus('Sending\u2026');
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
      }).then(function (r) { return r.json(); }).then(function (res) {
        if (res && res.success) {
          form.reset();
          setStatus('Thanks, your message was sent. We will get back to you by email.', 'ok');
        } else {
          setStatus((res && res.message) || 'Something went wrong. Please try again.', 'err');
        }
      }).catch(function () {
        setStatus('Could not send right now. Please try again in a moment.', 'err');
      }).finally(function () { button.disabled = false; });
    });
  }
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
