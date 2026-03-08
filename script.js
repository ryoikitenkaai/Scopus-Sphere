/* ============================================
   SCOPUS SPHERE — Main Script
   ============================================ */

// ── Header shrink on scroll ──
const header = document.getElementById('header');
if (header) {
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 60);
    });
}

// ── Mobile nav toggle ──
const mobileBtn = document.getElementById('mobileMenuBtn');
const mainNav   = document.getElementById('mainNav');
if (mobileBtn && mainNav) {
    mobileBtn.addEventListener('click', () => {
        mainNav.classList.toggle('open');
        const icon = mobileBtn.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });
}

// ── FAQ accordion ──
document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item.open').forEach(o => o.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
    });
});

// ── Testimonials slider ──
(function () {
    const track   = document.getElementById('testimonialsTrack');
    const prevBtn = document.getElementById('sliderPrev');
    const nextBtn = document.getElementById('sliderNext');
    const dotsEl  = document.getElementById('sliderDots');
    if (!track) return;

    const cards = track.querySelectorAll('.testimonial-card');
    let current = 0;

    // Determine visible count
    function visibleCount() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 992) return 2;
        return 3;
    }

    function totalSlides() {
        return Math.max(0, cards.length - visibleCount());
    }

    // Build dots
    function buildDots() {
        if (!dotsEl) return;
        dotsEl.innerHTML = '';
        for (let i = 0; i <= totalSlides(); i++) {
            const d = document.createElement('div');
            d.className = 'dot' + (i === current ? ' active' : '');
            d.addEventListener('click', () => goTo(i));
            dotsEl.appendChild(d);
        }
    }

    function updateDots() {
        if (!dotsEl) return;
        dotsEl.querySelectorAll('.dot').forEach((d, i) => {
            d.classList.toggle('active', i === current);
        });
    }

    function goTo(index) {
        const max = totalSlides();
        current = Math.max(0, Math.min(index, max));
        const cardWidth = cards[0].offsetWidth + 24; // gap: 24px
        track.style.transform = `translateX(-${current * cardWidth}px)`;
        updateDots();
    }

    if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

    let autoTimer = setInterval(() => goTo(current + 1 > totalSlides() ? 0 : current + 1), 5000);
    track.addEventListener('mouseenter', () => clearInterval(autoTimer));
    track.addEventListener('mouseleave', () => {
        autoTimer = setInterval(() => goTo(current + 1 > totalSlides() ? 0 : current + 1), 5000);
    });

    buildDots();
    window.addEventListener('resize', () => {
        goTo(0);
        buildDots();
    });
})();

// ── Counter animation for stats ──
function animateCounter(el, target, suffix) {
    let start = 0;
    const duration = 1800;
    const step = target / (duration / 16);
    const tick = setInterval(() => {
        start = Math.min(start + step, target);
        const val = Math.floor(start).toLocaleString();
        el.innerHTML = val + '<span>' + suffix + '</span>';
        if (start >= target) clearInterval(tick);
    }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.dataset.target, 10);
            // determine suffix from the <span> child
            const spanEl = el.querySelector('span');
            const suffix = spanEl ? spanEl.textContent : '';
            if (!isNaN(target) && target > 0) {
                animateCounter(el, target, suffix);
            }
            statsObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number[data-target]').forEach(el => statsObserver.observe(el));

// ── Scroll reveal (.reveal class) ──
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
