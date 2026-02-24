
    /* --- 1. HERO AUTO SLIDER --- */
    (function () {
      var slides  = document.querySelectorAll('.hero-slide');
      var dots    = document.querySelectorAll('.slider-dot');
      var current = 0;
      var timer;

      function goTo(idx) {
        slides[current].classList.remove('active');
        dots[current].classList.remove('active');
        dots[current].setAttribute('aria-selected', 'false');
        current = (idx + slides.length) % slides.length;
        slides[current].classList.add('active');
        dots[current].classList.add('active');
        dots[current].setAttribute('aria-selected', 'true');
      }

      function startAuto() {
        timer = setInterval(function () { goTo(current + 1); }, 5000);
      }

      dots.forEach(function (dot, i) {
        dot.addEventListener('click', function () {
          clearInterval(timer);
          goTo(i);
          startAuto();
        });
      });

      startAuto();
    })();

    /* --- 2. CUSTOMERS HORIZONTAL SLIDER (manual + auto-play) --- */
    (function () {
      var track    = document.getElementById('customersTrack');
      var prevBtn  = document.getElementById('custPrev');
      var nextBtn  = document.getElementById('custNext');
      var slides   = track.querySelectorAll('.customer-slide');
      var total    = slides.length; // 8
      var current  = 0;
      var autoTimer;

      function getVisible() {
        if (window.innerWidth < 576) return 1;
        if (window.innerWidth < 992) return 2;
        return 3;
      }

      function updateSlider() {
        var visible = getVisible();
        var maxIdx  = total - visible;
        if (current > maxIdx) current = maxIdx;
        if (current < 0)      current = 0;
        var pct = (100 / visible) * current;
        track.style.transform = 'translateX(' + pct + '%)';
      }

      function stepNext() {
        var visible = getVisible();
        var maxIdx  = total - visible;
        current = (current >= maxIdx) ? 0 : current + 1;
        updateSlider();
      }

      function stepPrev() {
        var visible = getVisible();
        var maxIdx  = total - visible;
        current = (current <= 0) ? maxIdx : current - 1;
        updateSlider();
      }

      function startAuto() {
        clearInterval(autoTimer);
        autoTimer = setInterval(stepNext, 3500);
      }

      /* In RTL layout, chevron-right = "previous" (go to earlier/higher index) */
      prevBtn.addEventListener('click', function () {
        stepPrev();
        startAuto(); // restart timer on manual interaction
      });

      nextBtn.addEventListener('click', function () {
        stepNext();
        startAuto();
      });

      window.addEventListener('resize', function () {
        current = 0;
        updateSlider();
      });

      updateSlider();
      startAuto();
    })();

    /* --- 3. SMOOTH SCROLL + close mobile nav --- */
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var target = document.querySelector(this.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
          var navCollapse = document.getElementById('navLinks');
          if (navCollapse && navCollapse.classList.contains('show')) {
            document.querySelector('.navbar-toggler').click();
          }
        }
      });
    });

    /* --- 4. ACTIVE NAV LINK ON SCROLL --- */
    (function () {
      var sections = document.querySelectorAll('section[id]');
      var navLinks = document.querySelectorAll('.nav-link[href^="#"]');
      window.addEventListener('scroll', function () {
        var scrollY = window.scrollY + 90;
        sections.forEach(function (sec) {
          if (scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight) {
            navLinks.forEach(function (l) { l.classList.remove('active'); });
            var active = document.querySelector('.nav-link[href="#' + sec.id + '"]');
            if (active) active.classList.add('active');
          }
        });
      }, { passive: true });
    })();
