/* ===== JAVASCRIPT MAIN ===== */

// Inject Google Analytics (gtag.js)
(function() {
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-R5007WS0J2';
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}
    window.gtag = gtag;
    
    gtag('js', new Date());
    gtag('config', 'G-R5007WS0J2');
})();

// Menú móvil (hamburger)
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function (e) {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });

        navLinks.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });

        document.addEventListener('click', function (e) {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }

    const demoForm = document.getElementById('demo-form');
    if (demoForm) {
        demoForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const btn = demoForm.querySelector('.demo-form__submit');
            const originalText = btn.textContent;
            btn.textContent = 'Enviando...';
            btn.disabled = true;

            const empresa = demoForm.querySelector('#demo-empresa').value.trim();
            const email = demoForm.querySelector('#demo-email').value.trim();
            const telefono = demoForm.querySelector('#demo-telefono').value.trim();

            // Misma API que digisol.do/contact (SMTP único en Vercel Digisol)
            const formData = {
                nombre: empresa,
                email: email,
                telefono: telefono,
                servicio: 'desarrollo',
                mensaje: '[Digisoft — solicitud de prueba gratuita desde digisoft.do]\n\nEnviar al correo indicado la invitación para activar la prueba gratuita del ERP.'
            };

            fetch('https://digisol.do/api/contact/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
                .then(function (res) {
                    return res.json().then(function (data) {
                        return { ok: res.ok, data: data };
                    });
                })
                .then(function (result) {
                    if (result.ok && result.data.success) {
                        btn.textContent = '¡Enviado!';
                        demoForm.reset();
                        alert('Su mensaje se ha enviado correctamente.');
                        if (typeof gtag === 'function') {
                            gtag('event', 'demo_request', { form_id: 'demo-form', status: 'success' });
                        }
                    } else {
                        btn.textContent = 'Reintentar';
                        alert(result.data.error || 'No se pudo enviar. Prueba por WhatsApp.');
                        if (typeof gtag === 'function') {
                            gtag('event', 'form_error', { form_id: 'demo-form', error: result.data.error || 'server_error' });
                        }
                    }
                })
                .catch(function () {
                    btn.textContent = 'Reintentar';
                    alert('No se pudo conectar. Comprueba tu conexión o escríbenos por WhatsApp.');
                    if (typeof gtag === 'function') {
                        gtag('event', 'form_error', { form_id: 'demo-form', error: 'network_error' });
                    }
                })
                .finally(function () {
                    setTimeout(function () {
                        btn.textContent = originalText;
                        btn.disabled = false;
                    }, 3000);
                });
        });
    }
});

// Toggle entre precios mensual y anual
function togglePricing(period) {
    document.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.period === period);
    });

    if (period === 'monthly') {
        document.querySelectorAll('.monthly').forEach(el => { el.style.display = 'block'; });
        document.querySelectorAll('.annual').forEach(el => { el.style.display = 'none'; });
    } else {
        document.querySelectorAll('.monthly').forEach(el => { el.style.display = 'none'; });
        document.querySelectorAll('.annual').forEach(el => { el.style.display = 'block'; });
    }
}

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            togglePricing(this.dataset.period);
        });
    });
});

// Countdown al 15/05/2026 - DGII obliga facturación electrónica
function updateCountdown() {
    const target = new Date('2026-05-15T23:59:59').getTime();
    const now = new Date().getTime();
    const diff = target - now;

    if (diff <= 0) {
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

if (document.getElementById('countdown')) {
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Toggle FAQ
function toggleFaq(button) {
    const faqItem = button.parentElement;
    const isOpening = !faqItem.classList.contains('active');
    faqItem.classList.toggle('active');
    if (isOpening && typeof gtag === 'function') {
        gtag('event', 'faq_open', {
            question: button.textContent.trim().substring(0, 80)
        });
    }
}

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Agregar clase active cuando se scrollea a una sección
window.addEventListener('scroll', () => {
    document.querySelectorAll('section[id]').forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        const scrollPos = window.scrollY;

        if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
            document.querySelectorAll('nav a[href^="#"]').forEach(link => {
                link.classList.remove('active');
            });
            const activeLink = document.querySelector(`nav a[href="#${section.id}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
});

// ===== GOOGLE ANALYTICS TRACKING =====

// 1. CTA clicks — texto del botón + sección de origen + destino
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', function() {
        if (typeof gtag !== 'function') return;
        const section = this.closest('section')?.id || (this.closest('nav') ? 'nav' : 'unknown');
        gtag('event', 'cta_click', {
            button_text: this.innerText.trim(),
            section: section,
            destination: this.getAttribute('href') || ''
        });
    });
});

// 2. WhatsApp float button
const waFloat = document.querySelector('.whatsapp-float');
if (waFloat) {
    waFloat.addEventListener('click', function() {
        if (typeof gtag === 'function') {
            gtag('event', 'whatsapp_click', { location: 'float_button' });
        }
    });
}

// 3. Toggle de precios mensual/anual
document.querySelectorAll('.toggle-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        if (typeof gtag === 'function') {
            gtag('event', 'pricing_toggle', { period: this.dataset.period });
        }
    });
});

// 4. Inicio de formulario (primer foco en cualquier campo)
(function() {
    const firstField = document.getElementById('demo-email');
    if (!firstField) return;
    let fired = false;
    ['focus', 'touchstart'].forEach(evt => {
        firstField.addEventListener(evt, function() {
            if (fired || typeof gtag !== 'function') return;
            fired = true;
            gtag('event', 'form_start', { form_id: 'demo-form' });
        }, { once: true });
    });
})();

// 5. Secciones clave vistas (una vez por carga de página)
if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (!entry.isIntersecting) return;
            if (typeof gtag === 'function') {
                gtag('event', 'section_view', { section_id: entry.target.id });
            }
            sectionObserver.unobserve(entry.target);
        });
    }, { threshold: 0.3 });

    ['modulos', 'pricing', 'ocr-ia', 'contacto'].forEach(function(id) {
        const el = document.getElementById(id);
        if (el) sectionObserver.observe(el);
    });
}

// ===== ENGAGEMENT: Bottom bar, Slide-in card, Exit-intent popup =====
(function () {
    const DEADLINE = new Date('2026-05-15T23:59:59');
    const daysLeft = Math.max(1, Math.ceil((DEADLINE - new Date()) / (1000 * 60 * 60 * 24)));

    function track(event, params) {
        if (typeof gtag === 'function') gtag('event', event, params || {});
    }

    // ---- 1. STICKY BOTTOM BAR (solo mobile) ----
    const bar = document.getElementById('sticky-bottom-bar');
    if (bar && window.innerWidth <= 768 && !sessionStorage.getItem('bar_dismissed')) {
        const barDaysEl = document.getElementById('bar-days');
        if (barDaysEl) barDaysEl.textContent = daysLeft;

        setTimeout(function () {
            bar.classList.add('visible');
            document.body.classList.add('bar-visible');
        }, 4000);

        document.getElementById('bar-close')?.addEventListener('click', function () {
            bar.classList.remove('visible');
            document.body.classList.remove('bar-visible');
            sessionStorage.setItem('bar_dismissed', '1');
            track('engagement_dismissed', { component: 'bottom_bar' });
        });

        document.getElementById('bar-cta')?.addEventListener('click', function () {
            track('engagement_cta_click', { component: 'bottom_bar' });
        });
    }

    // ---- 2. SLIDE-IN CARD (desktop, 50% scroll + 15s en página) ----
    const card = document.getElementById('slidein-card');
    if (card && !sessionStorage.getItem('card_dismissed')) {
        let cardShown = false;
        let secondsOnPage = 0;
        const timer = setInterval(function () { secondsOnPage++; }, 1000);

        function tryShowCard() {
            if (cardShown) return;
            const pageHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPct = pageHeight > 0 ? (window.scrollY / pageHeight) * 100 : 0;
            if (scrollPct >= 50 && secondsOnPage >= 15) {
                cardShown = true;
                card.classList.add('visible');
                clearInterval(timer);
                track('engagement_shown', { component: 'slide_in_card' });
            }
        }

        window.addEventListener('scroll', tryShowCard, { passive: true });

        document.getElementById('card-close')?.addEventListener('click', function () {
            card.classList.remove('visible');
            sessionStorage.setItem('card_dismissed', '1');
            track('engagement_dismissed', { component: 'slide_in_card' });
        });

        document.getElementById('card-cta')?.addEventListener('click', function () {
            track('engagement_cta_click', { component: 'slide_in_card' });
        });
    }

    // ---- 3. EXIT-INTENT POPUP (desktop, una vez por sesión) ----
    const popup = document.getElementById('exit-popup');
    if (popup && window.innerWidth > 768 && !sessionStorage.getItem('popup_shown')) {
        const popupDaysEl = document.getElementById('popup-days');
        if (popupDaysEl) popupDaysEl.textContent = daysLeft;

        let popupFired = false;

        document.addEventListener('mouseleave', function (e) {
            if (e.clientY > 5 || popupFired) return;
            popupFired = true;
            sessionStorage.setItem('popup_shown', '1');
            popup.classList.add('active');
            track('engagement_shown', { component: 'exit_popup' });
        });

        function closePopup() { popup.classList.remove('active'); }

        document.getElementById('exit-popup-close')?.addEventListener('click', function () {
            closePopup();
            track('engagement_dismissed', { component: 'exit_popup' });
        });

        popup.addEventListener('click', function (e) {
            if (e.target === popup) {
                closePopup();
                track('engagement_dismissed', { component: 'exit_popup' });
            }
        });

        document.getElementById('popup-cta-wa')?.addEventListener('click', function () {
            track('engagement_cta_click', { component: 'exit_popup', action: 'whatsapp' });
        });

        document.getElementById('popup-cta-form')?.addEventListener('click', function () {
            closePopup();
            document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
            track('engagement_cta_click', { component: 'exit_popup', action: 'form' });
        });
    }
})();

// Log cuando la página carga
console.log('✅ Digisoft page loaded successfully');
