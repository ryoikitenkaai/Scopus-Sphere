/* ========================================
   ScopusSphere — Premium JavaScript
   Gold/Navy Theme with AI Chatbot
   ======================================== */

// ---------- Mobile Navigation ----------
const mobileBtn = document.getElementById('mobileMenuBtn');
const mainNav = document.getElementById('mainNav');
if (mobileBtn && mainNav) {
    mobileBtn.addEventListener('click', () => {
        mainNav.classList.toggle('open');
        const icon = mobileBtn.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });
    mainNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('open');
            const icon = mobileBtn.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        });
    });
}

// ---------- Header Scroll ----------
const header = document.getElementById('header');
if (header) {
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
}

// ---------- Scroll Reveal ----------
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ---------- Animated Counters ----------
function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'));
    if (!target) return;
    const duration = 2000;
    const start = performance.now();
    const suffix = el.querySelector('span') ? el.querySelector('span').textContent : '';
    function update(time) {
        const progress = Math.min((time - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target).toLocaleString();
        if (suffix) { const s = document.createElement('span'); s.textContent = suffix; el.appendChild(s); }
        if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) { animateCounter(entry.target); counterObserver.unobserve(entry.target); }
    });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-number, [data-target]').forEach(el => counterObserver.observe(el));

// ---------- Hero 3D Carousel ----------
const carouselTrack = document.getElementById('carouselTrack');
const carouselDots = document.getElementById('carouselDots');
const carouselPrev = document.getElementById('carouselPrev');
const carouselNext = document.getElementById('carouselNext');
if (carouselTrack && carouselDots && carouselPrev && carouselNext) {
    const slides = carouselTrack.querySelectorAll('.carousel-slide');
    const total = slides.length;
    let current = 0;
    let carouselInterval;

    // Position map for 5 slides
    function getPositions(idx) {
        const positions = {};
        for (let i = 0; i < total; i++) {
            const diff = ((i - idx) % total + total) % total;
            if (diff === 0) positions[i] = 'center';
            else if (diff === 1) positions[i] = 'right';
            else if (diff === total - 1) positions[i] = 'left';
            else if (diff === 2) positions[i] = 'far-right';
            else if (diff === total - 2) positions[i] = 'far-left';
            else positions[i] = 'hidden';
        }
        return positions;
    }

    function buildDots() {
        carouselDots.innerHTML = '';
        slides.forEach((_, i) => {
            const d = document.createElement('span');
            d.className = `c-dot ${i === current ? 'active' : ''}`;
            d.addEventListener('click', () => goTo(i));
            carouselDots.appendChild(d);
        });
    }

    function updateCarousel() {
        const pos = getPositions(current);
        slides.forEach((s, i) => {
            s.setAttribute('data-pos', pos[i]);
        });
        carouselDots.querySelectorAll('.c-dot').forEach((d, i) => d.classList.toggle('active', i === current));
    }

    function goTo(idx) {
        current = ((idx % total) + total) % total;
        updateCarousel();
        resetAutoSlide();
    }

    function nextSlide() { goTo(current + 1); }
    function prevSlide() { goTo(current - 1); }

    function resetAutoSlide() {
        clearInterval(carouselInterval);
        carouselInterval = setInterval(nextSlide, 2000);
    }

    carouselPrev.addEventListener('click', prevSlide);
    carouselNext.addEventListener('click', nextSlide);

    // Touch/swipe support
    let touchStartX = 0;
    carouselTrack.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
    carouselTrack.addEventListener('touchend', (e) => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) { diff > 0 ? nextSlide() : prevSlide(); }
    }, { passive: true });

    // Pause on hover
    carouselTrack.addEventListener('mouseenter', () => clearInterval(carouselInterval));
    carouselTrack.addEventListener('mouseleave', () => { carouselInterval = setInterval(nextSlide, 2000); });

    buildDots();
    updateCarousel();
    carouselInterval = setInterval(nextSlide, 2000);
}

// ---------- CTA Floating Particles ----------
const ctaParticles = document.getElementById('ctaParticles');
if (ctaParticles) {
    for (let i = 0; i < 25; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.cssText = `left:${Math.random()*100}%;top:${Math.random()*100}%;--dur:${6+Math.random()*8}s;--delay:${Math.random()*5}s;--tx:${(Math.random()-.5)*80}px;--ty:${(Math.random()-.5)*80}px;--tx2:${(Math.random()-.5)*60}px;--ty2:${(Math.random()-.5)*100}px;--tx3:${(Math.random()-.5)*70}px;--ty3:${(Math.random()-.5)*50}px;width:${2+Math.random()*4}px;height:${2+Math.random()*4}px;`;
        ctaParticles.appendChild(p);
    }
}

// ---------- CTA Contact Form ----------
const ctaForm = document.getElementById('ctaContactForm');
if (ctaForm) {
    const phoneInput = document.getElementById('ctaPhone');
    if (phoneInput) phoneInput.addEventListener('input', function () { this.value = this.value.replace(/\D/g, '').slice(0, 10); });
    
    ctaForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('ctaName');
        const email = document.getElementById('ctaEmail');
        const phone = document.getElementById('ctaPhone');
        const service = document.getElementById('ctaService');
        let valid = true;
        [name, email, phone, service].forEach(f => {
            if (f && !f.value.trim()) { f.style.borderColor = '#EF4444'; valid = false; } 
            else if (f) { f.style.borderColor = ''; }
        });
        if (phone && phone.value.length !== 10) { phone.style.borderColor = '#EF4444'; valid = false; }
        if (!valid) return;

        const success = document.getElementById('ctaFormSuccess');
        if (success) success.style.display = 'block';
        const btn = this.querySelector('.glass-submit-btn');
        if (btn) { btn.disabled = true; btn.querySelector('.btn-text').textContent = 'Sent!'; }
        setTimeout(() => {
            this.reset();
            if (success) success.style.display = 'none';
            if (btn) { btn.disabled = false; btn.querySelector('.btn-text').textContent = 'Send Enquiry'; }
        }, 4000);
    });
}

// ---------- Floating Orbs (Background Ambiance) ----------
(function createOrbs() {
    const colors = ['rgba(184,134,11,0.15)', 'rgba(26,35,50,0.08)', 'rgba(184,134,11,0.1)'];
    for (let i = 0; i < 3; i++) {
        const orb = document.createElement('div');
        orb.className = 'floating-orb';
        const size = 200 + Math.random() * 300;
        orb.style.cssText = `width:${size}px;height:${size}px;background:${colors[i]};top:${Math.random()*80}%;left:${Math.random()*80}%;--orb-dur:${15+Math.random()*15}s;--orb-x:${(Math.random()-.5)*100}px;--orb-y:${(Math.random()-.5)*100}px;--orb-x2:${(Math.random()-.5)*80}px;--orb-y2:${(Math.random()-.5)*80}px;`;
        document.body.appendChild(orb);
    }
})();

// ---------- Testimonials Slider ----------
const track = document.getElementById('testimonialsTrack');
const prevBtn = document.getElementById('sliderPrev');
const nextBtn = document.getElementById('sliderNext');
const dotsContainer = document.getElementById('sliderDots');
if (track && prevBtn && nextBtn && dotsContainer) {
    const cards = track.querySelectorAll('.testimonial-card');
    let currentIndex = 0;
    let autoSlideInterval;
    function getCardsPerView() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 3;
    }
    function updateSlider() {
        const cpv = getCardsPerView();
        const maxIdx = Math.max(0, cards.length - cpv);
        if (currentIndex > maxIdx) currentIndex = maxIdx;
        const card = cards[0];
        const cs = getComputedStyle(card);
        const w = card.offsetWidth + parseFloat(cs.marginLeft) + parseFloat(cs.marginRight);
        track.style.transform = `translateX(-${currentIndex * w}px)`;
        const totalDots = maxIdx + 1;
        dotsContainer.innerHTML = '';
        for (let i = 0; i < totalDots; i++) {
            const d = document.createElement('span');
            d.className = `dot ${i === currentIndex ? 'active' : ''}`;
            d.addEventListener('click', () => { currentIndex = i; updateSlider(); });
            dotsContainer.appendChild(d);
        }
    }
    function next() { const m = Math.max(0, cards.length - getCardsPerView()); currentIndex = currentIndex >= m ? 0 : currentIndex + 1; updateSlider(); }
    function prev() { const m = Math.max(0, cards.length - getCardsPerView()); currentIndex = currentIndex <= 0 ? m : currentIndex - 1; updateSlider(); }
    prevBtn.addEventListener('click', () => { prev(); clearInterval(autoSlideInterval); autoSlideInterval = setInterval(next, 5000); });
    nextBtn.addEventListener('click', () => { next(); clearInterval(autoSlideInterval); autoSlideInterval = setInterval(next, 5000); });
    updateSlider();
    autoSlideInterval = setInterval(next, 5000);
    window.addEventListener('resize', updateSlider);
}

// ---------- FAQ Accordion ----------
document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item.open').forEach(o => o.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
    });
});

// ---------- Contact Form ----------
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    const additionalInfo = document.getElementById('additionalInfo');
    const wordCount = document.getElementById('wordCount');
    if (additionalInfo && wordCount) {
        additionalInfo.addEventListener('input', function () {
            const words = this.value.trim().split(/\s+/).filter(w => w.length > 0);
            const count = words.length;
            wordCount.textContent = `${count}/50 words`;
            if (count > 50) { wordCount.style.color = '#EF4444'; this.value = words.slice(0, 50).join(' '); wordCount.textContent = '50/50 words'; }
            else { wordCount.style.color = ''; }
        });
    }
    const whatsappInput = document.getElementById('whatsapp');
    if (whatsappInput) { whatsappInput.addEventListener('input', function () { this.value = this.value.replace(/\D/g, '').slice(0, 10); }); }
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const fields = ['fullName', 'email', 'whatsapp', 'subjectArea'].map(id => document.getElementById(id));
        let isValid = true;
        fields.forEach(f => { if (f && !f.value.trim()) { f.style.borderColor = '#EF4444'; isValid = false; } else if (f) { f.style.borderColor = ''; } });
        const wp = document.getElementById('whatsapp');
        if (wp && wp.value.length !== 10) { wp.style.borderColor = '#EF4444'; isValid = false; }
        const chk = document.querySelectorAll('input[name="indexing"]:checked');
        const cg = document.querySelector('.checkbox-group');
        if (chk.length === 0 && cg) { cg.style.outline = '2px solid #EF4444'; cg.style.borderRadius = '8px'; isValid = false; }
        else if (cg) { cg.style.outline = ''; }
        if (!isValid) return;
        const success = document.getElementById('formSuccess');
        if (success) success.style.display = 'block';
        const btn = this.querySelector('.btn-submit');
        if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fas fa-check-circle"></i> Message Sent!'; }
        setTimeout(() => {
            this.reset(); if (success) success.style.display = 'none';
            if (btn) { btn.disabled = false; btn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>'; }
            if (wordCount) wordCount.textContent = '0/50 words';
        }, 4000);
    });
}

// ---------- Smooth Scroll ----------
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
        const id = this.getAttribute('href');
        if (id === '#') return;
        const el = document.querySelector(id);
        if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth' }); }
    });
});

// ---------- Call for Papers Popup ----------
(function () {
    const overlay = document.getElementById('popupOverlay');
    const container = document.getElementById('popupContainer');
    const closeBtn = document.getElementById('popupClose');
    const popupParticles = document.getElementById('popupParticles');
    if (!overlay) return;

    // Generate popup particles
    if (popupParticles) {
        for (let i = 0; i < 20; i++) {
            const p = document.createElement('div');
            p.className = 'pp';
            p.style.cssText = `left:${Math.random()*100}%;top:${Math.random()*100}%;--d:${5+Math.random()*8}s;--dl:${Math.random()*4}s;--px:${(Math.random()-.5)*60}px;--py:${(Math.random()-.5)*60}px;width:${2+Math.random()*3}px;height:${2+Math.random()*3}px;`;
            popupParticles.appendChild(p);
        }
    }

    function openPopup() {
        overlay.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
    function closePopup() {
        overlay.classList.remove('show');
        document.body.style.overflow = '';
        sessionStorage.setItem('popupClosed', 'true');
    }

    // Close handlers
    if (closeBtn) closeBtn.addEventListener('click', closePopup);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closePopup(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && overlay.classList.contains('show')) closePopup(); });

    // Show after 5 seconds (only once per session)
    if (!sessionStorage.getItem('popupClosed')) {
        setTimeout(openPopup, 5000);
    }

    // Popup form handler
    const popupForm = document.getElementById('popupForm');
    if (popupForm) {
        const phoneInput = document.getElementById('popupPhone');
        if (phoneInput) phoneInput.addEventListener('input', function () { this.value = this.value.replace(/\D/g, '').slice(0, 10); });

        popupForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const fields = [document.getElementById('popupName'), document.getElementById('popupEmail'), document.getElementById('popupPhone'), document.getElementById('popupService')];
            let valid = true;
            fields.forEach(f => {
                if (f && !f.value.trim()) { f.style.borderColor = '#EF4444'; valid = false; }
                else if (f) { f.style.borderColor = ''; }
            });
            const ph = document.getElementById('popupPhone');
            if (ph && ph.value.length !== 10) { ph.style.borderColor = '#EF4444'; valid = false; }
            if (!valid) return;

            const success = document.getElementById('popupFormSuccess');
            if (success) success.style.display = 'block';
            const btn = this.querySelector('.popup-submit-btn');
            if (btn) { btn.disabled = true; const txt = btn.querySelector('.popup-btn-text'); if(txt) txt.textContent = 'Submitted!'; }
            setTimeout(() => {
                this.reset();
                if (success) success.style.display = 'none';
                if (btn) { btn.disabled = false; const txt = btn.querySelector('.popup-btn-text'); if(txt) txt.textContent = 'Submit Enquiry'; }
                setTimeout(closePopup, 500);
            }, 3000);
        });
    }
})();

// ---------- AI CHATBOT ----------
(function () {
    const topics = [
        { icon: '📝', label: 'Our Services', info: 'End-to-end publication support — Manuscript Writing, Editing & Proofreading, Journal Selection, Submission Management, Revision Handling, and Patent Filing.' },
        { icon: '💰', label: 'Pricing & Fees', info: 'Fully transparent pricing — no hidden charges, no APC commissions. You pay the journal directly. Custom quotes based on your research scope.' },
        { icon: '⏱️', label: 'Timeline', info: 'Manuscript prep (2–4 weeks) → Journal shortlisting (1 week) → Submission → Peer review → Acceptance. Total: as fast as 4–8 weeks.' },
        { icon: '🛡️', label: 'Guarantee', info: '92–95% acceptance rate across Scopus & WoS journals. Unlimited revisions until acceptance. 100% refund if we cannot publish your paper.' },
        { icon: '🔬', label: 'Scopus Indexing', info: 'We publish in Q1, Q2, Q3 & Q4 Scopus journals. All journals verified for legitimacy. 80+ partner journals across multiple disciplines.' },
        { icon: '📋', label: 'Our Process', info: '5 steps: (1) Free Consultation (2) Manuscript Preparation (3) Journal Selection & Approval (4) Submission & Review Management (5) Acceptance & Publication.' },
        { icon: '📧', label: 'Contact Info', info: 'Email: info@scopussphere.com | Phone: +91 92112 93696 | WhatsApp: wa.me/919211293696 | Mon–Sat, 9 AM – 7 PM IST.' }
    ];

    const toggle = document.createElement('button');
    toggle.className = 'chatbot-toggle';
    toggle.id = 'chatbotToggle';
    toggle.innerHTML = '<i class="fas fa-comment-dots"></i><span class="badge">1</span>';
    document.body.appendChild(toggle);

    const win = document.createElement('div');
    win.className = 'chatbot-window';
    win.id = 'chatbotWindow';
    win.innerHTML = `
        <div class="chat-header">
            <div class="chat-avatar"><i class="fas fa-robot"></i></div>
            <div class="chat-header-info"><h4>Sphere AI</h4><span>Your publication assistant</span></div>
            <button class="chat-close" id="chatClose"><i class="fas fa-minus"></i></button>
        </div>
        <div class="chat-body" id="chatBody">
            <p class="chat-intro">👋 Hi! Tap a topic to learn more about our services.</p>
            <div class="chat-btn-grid">
                ${topics.map((t, i) => `<button class="chat-topic-btn" data-idx="${i}"><span class="ctb-icon">${t.icon}</span><span class="ctb-label">${t.label}</span><i class="fas fa-chevron-right ctb-arrow"></i></button>`).join('')}
            </div>
            <div class="chat-info-card" id="chatInfoCard"></div>
        </div>
        <div class="chat-cta-bar">
            <a href="#ctaForm" class="chat-cta-link" id="chatGoToForm"><i class="fas fa-paper-plane"></i> Fill Enquiry Form</a>
            <a href="https://wa.me/919211293696?text=Hello%2C%20I%20want%20to%20know%20more%20about%20your%20publication%20services" class="chat-wa-link" target="_blank"><i class="fab fa-whatsapp"></i> WhatsApp</a>
        </div>
        <div class="chat-powered">Powered by <a href="#">ScopusSphere AI</a></div>
    `;
    document.body.appendChild(win);

    const infoCard = document.getElementById('chatInfoCard');

    toggle.addEventListener('click', () => {
        win.classList.toggle('open');
        toggle.querySelector('.badge').style.display = 'none';
    });
    document.getElementById('chatClose').addEventListener('click', () => win.classList.remove('open'));

    document.getElementById('chatGoToForm').addEventListener('click', (e) => {
        e.preventDefault();
        win.classList.remove('open');
        const f = document.getElementById('ctaForm');
        if (f) f.scrollIntoView({ behavior: 'smooth' });
    });

    win.querySelectorAll('.chat-topic-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const idx = parseInt(btn.getAttribute('data-idx'));
            const topic = topics[idx];
            win.querySelectorAll('.chat-topic-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            infoCard.innerHTML = `<div class="info-card-inner"><strong>${topic.icon} ${topic.label}</strong><p>${topic.info}</p><a href="#ctaForm" class="info-card-cta" onclick="document.getElementById('chatbotWindow').classList.remove('open');document.getElementById('ctaForm').scrollIntoView({behavior:'smooth'});return false;"><i class="fas fa-paper-plane"></i> Submit an Enquiry</a></div>`;
            infoCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    });
})();
