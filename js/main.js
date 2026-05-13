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

// Meta Pixel (Facebook/Instagram) — Pixel ID Digisoft ERP 940766462163726
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '940766462163726');
fbq('track', 'PageView');

// Microsoft Clarity — heatmaps + session recordings — project wq2k10htvp
(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "wq2k10htvp");

// Meta CAPI (server-side dedup) — espejo de eventos Pixel browser hacia /api/meta-capi
// event_id compartido entre fbq y CAPI => Meta deduplica
function generateMetaEventId() {
    return Date.now() + '-' + Math.random().toString(36).substring(2, 12);
}
function getCookieValue(name) {
    var m = document.cookie.match(new RegExp('(^|;\\s*)' + name + '=([^;]+)'));
    return m ? decodeURIComponent(m[2]) : '';
}
function sendMetaCAPI(event_name, event_id, opts) {
    opts = opts || {};
    try {
        fetch('https://digisol.do/api/meta-capi', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                event_name: event_name,
                event_id: event_id,
                event_source_url: window.location.href,
                user_agent: navigator.userAgent,
                fbp: getCookieValue('_fbp'),
                fbc: getCookieValue('_fbc'),
                email: opts.email || '',
                phone: opts.phone || '',
                custom_data: opts.custom_data || {}
            }),
            keepalive: true
        }).catch(function() { /* fire-and-forget */ });
    } catch (e) { /* network blocked, ignore */ }
}

// UTM → first-touch persistente en localStorage (sobrevive cierre de pestaña)
(function() {
    var params = new URLSearchParams(window.location.search);
    var source = params.get('utm_source');
    var medium = params.get('utm_medium');
    var campaign = params.get('utm_campaign');
    // Solo guardar primera vez (first-touch) o si llegan UTM nuevos
    if (source || medium || campaign) {
        if (source && !localStorage.getItem('utm_source')) localStorage.setItem('utm_source', source);
        if (medium && !localStorage.getItem('utm_medium')) localStorage.setItem('utm_medium', medium);
        if (campaign && !localStorage.getItem('utm_campaign')) localStorage.setItem('utm_campaign', campaign);
    }
    var storedSource = localStorage.getItem('utm_source');
    var storedMedium = localStorage.getItem('utm_medium');
    var storedCampaign = localStorage.getItem('utm_campaign');
    if (storedSource || storedMedium || storedCampaign) {
        window._gaTraffic = {
            utm_source: storedSource || '',
            utm_medium: storedMedium || '',
            utm_campaign: storedCampaign || ''
        };
    }
})();

// Helper global: adjunta fuente de tráfico a todos los eventos GA4
// Nombres utm_* para no chocar con reserved GA4 params (source/medium/campaign son reservados)
function trackGA(event, params) {
    if (typeof gtag !== 'function') return;
    var traffic = window._gaTraffic || {};
    var merged = {};
    if (params) {
        for (var k in params) {
            if (params.hasOwnProperty(k)) merged[k] = params[k];
        }
    }
    merged.utm_source = traffic.utm_source || '';
    merged.utm_medium = traffic.utm_medium || '';
    merged.utm_campaign = traffic.utm_campaign || '';
    gtag('event', event, merged);
}

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

            // Atribución → campos separados (backend digisol.do/api/contact renderiza sección dedicada)
            var traffic = window._gaTraffic || {};

            // Misma API que digisol.do/contact (SMTP único en Vercel Digisol)
            const formData = {
                nombre: empresa,
                email: email,
                servicio: 'Prueba gratuita Digisoft (14 días)',
                mensaje: '[Digisoft — solicitud de prueba gratuita desde digisoft.do]\n\nEnviar al correo indicado la invitación para activar la prueba gratuita del ERP.',
                utm_source: traffic.utm_source || '',
                utm_medium: traffic.utm_medium || '',
                utm_campaign: traffic.utm_campaign || '',
                page_url: window.location.href,
                referrer: document.referrer || ''
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
                        trackGA('formulario_demo_enviado', { empresa: empresa });
                        var leadEventId = generateMetaEventId();
                        if (typeof fbq === 'function') fbq('track', 'Lead', {
                            content_name: 'Prueba gratis Digisoft',
                            content_category: 'demo_request',
                            currency: 'DOP',
                            value: 0
                        }, { eventID: leadEventId });
                        sendMetaCAPI('Lead', leadEventId, {
                            email: email,
                            custom_data: {
                                content_name: 'Prueba gratis Digisoft',
                                content_category: 'demo_request',
                                currency: 'DOP',
                                value: 0
                            }
                        });
                    } else {
                        btn.textContent = 'Reintentar';
                        alert(result.data.error || 'No se pudo enviar. Prueba por WhatsApp.');
                        trackGA('formulario_demo_error', { motivo: result.data.error || 'server_error' });
                    }
                })
                .catch(function () {
                    btn.textContent = 'Reintentar';
                    alert('No se pudo conectar. Comprueba tu conexión o escríbenos por WhatsApp.');
                    trackGA('formulario_demo_error', { motivo: 'sin_conexion' });
                })
                .finally(function () {
                    setTimeout(function () {
                        btn.textContent = originalText;
                        btn.disabled = false;
                    }, 3000);
                });
        });
    }

    // Track field abandonment: último campo antes de cerrar/navegar fuera sin enviar
    // pagehide es más fiable que beforeunload en móvil (Safari iOS no dispara beforeunload)
    if (demoForm) {
        var _lastField = null;
        demoForm.querySelectorAll('input').forEach(function(f) {
            f.addEventListener('focus', function() { _lastField = this.id; });
        });
        demoForm.addEventListener('submit', function() { _lastField = null; });
        window.addEventListener('pagehide', function() {
            if (_lastField && typeof trackGA === 'function') trackGA('formulario_demo_campo_abandonado', { field: _lastField });
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


// Toggle FAQ
function toggleFaq(button) {
    const faqItem = button.parentElement;
    const isOpening = !faqItem.classList.contains('active');
    faqItem.classList.toggle('active');
    if (isOpening) trackGA('faq_pregunta_abierta', { pregunta: button.textContent.trim().substring(0, 80) });
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
// Excluye CTAs dentro de .nav-links (los captura menu_navegacion_clic para evitar doble evento)
document.querySelectorAll('.cta-button').forEach(button => {
    if (button.closest('.nav-links')) return;
    button.addEventListener('click', function() {
        if (typeof gtag !== 'function') return;
        const section = this.closest('section')?.id || 'unknown';
        trackGA('boton_cta_generico', {
            texto: this.innerText.trim(),
            seccion: section,
            destino: this.getAttribute('href') || ''
        });
    });
});

// 2. WhatsApp float button
const waFloat = document.querySelector('.whatsapp-float');
if (waFloat) {
    waFloat.addEventListener('click', function() {
        trackGA('whatsapp_flotante_clic', { ubicacion: 'boton_flotante' });
        var waEventId = generateMetaEventId();
        if (typeof fbq === 'function') fbq('track', 'Contact', { source: 'whatsapp_float' }, { eventID: waEventId });
        sendMetaCAPI('Contact', waEventId, { custom_data: { source: 'whatsapp_float' } });
    });
}

// 3. Toggle de precios mensual/anual
var _pricingToggleCount = parseInt(sessionStorage.getItem('_ptc') || '0', 10);
document.querySelectorAll('.toggle-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        var periodo = this.dataset.period === 'monthly' ? 'mensual' : 'anual';
        _pricingToggleCount++;
        sessionStorage.setItem('_ptc', _pricingToggleCount);
        trackGA('precios_alternar_periodo', { periodo: periodo, toggle_count: _pricingToggleCount });
        if (_pricingToggleCount === 3 || _pricingToggleCount === 6) {
            trackGA('precios_alternar_repetido', { count: _pricingToggleCount });
        }
    });
});

// 4. Inicio de formulario — primer foco/touch en CUALQUIER campo del form
(function() {
    const form = document.getElementById('demo-form');
    if (!form) return;
    let fired = false;
    const fields = form.querySelectorAll('input, textarea, select');
    fields.forEach(function(field) {
        ['focus', 'touchstart'].forEach(function(evt) {
            field.addEventListener(evt, function() {
                if (fired) return;
                fired = true;
                trackGA('formulario_demo_iniciado', { campo_inicial: field.id || field.name || 'sin_id' });
            }, { once: true });
        });
    });
})();

// 5. Secciones clave vistas (una vez por carga de página)
if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (!entry.isIntersecting) return;
            trackGA('seccion_visible', { seccion: entry.target.id });
            sectionObserver.unobserve(entry.target);
        });
    }, { threshold: 0.3 });

    ['modulos', 'pricing', 'ocr-ia', 'contacto'].forEach(function(id) {
        const el = document.getElementById(id);
        if (el) sectionObserver.observe(el);
    });
}

// 6. Navegación del menú principal
document.querySelectorAll('.nav-links a').forEach(function(link) {
    link.addEventListener('click', function() {
        trackGA('menu_navegacion_clic', {
            texto: this.innerText.trim(),
            destino: this.getAttribute('href') || ''
        });
    });
});

// 7. Tarjetas de precios observadas (intención real — espera 2s de visibilidad)
if ('IntersectionObserver' in window) {
    var pricingObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (!entry.isIntersecting) return;
            var card = entry.target;
            var timer = setTimeout(function() {
                var planName = (card.querySelector('h3') && card.querySelector('h3').innerText.trim()) || 'desconocido';
                trackGA('precios_tarjeta_vista', { plan: planName });
                pricingObserver.unobserve(card);
            }, 2000);
            card._pricingTimer = timer;
            // Si el usuario scrollea fuera, cancelar el timer
            var cancelObserver = new IntersectionObserver(function(leaveEntries) {
                leaveEntries.forEach(function(leaveEntry) {
                    if (!leaveEntry.isIntersecting && card._pricingTimer) {
                        clearTimeout(card._pricingTimer);
                        card._pricingTimer = null;
                        cancelObserver.unobserve(card);
                    }
                });
            }, { threshold: 0 });
            cancelObserver.observe(card);
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.pricing-card').forEach(function(card) {
        pricingObserver.observe(card);
    });
}

// 8. Profundidad de scroll (25%, 50%, 75%, 100%)
(function() {
    var marks = [25, 50, 75, 100];
    var fired = {};
    var ticking = false;
    function docHeight() {
        return Math.max(document.body.scrollHeight, document.body.offsetHeight,
            document.documentElement.clientHeight, document.documentElement.scrollHeight,
            document.documentElement.offsetHeight);
    }
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                var scrollPct = Math.round((window.scrollY + window.innerHeight) / docHeight() * 100);
                marks.forEach(function(m) {
                    if (scrollPct >= m && !fired[m]) {
                        fired[m] = true;
                        trackGA('profundidad_scroll', { depth: m, page: window.location.pathname });
                    }
                });
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
})();

// 10. WhatsApp prefill: mensaje natural. Source tracking ya cubierto por Meta Pixel + GA4.
(function() {
    var text = 'Hola, estoy interesado en Digisoft. Vengo desde la web.';
    document.querySelectorAll('a[href*="wa.me/"]').forEach(function(link) {
        var base = link.href.split('?')[0];
        link.href = base + '?text=' + encodeURIComponent(text);
    });
})();

// 9. Clics a enlaces externos
// Excluye .whatsapp-float (lo captura whatsapp_flotante_clic para evitar doble evento)
document.querySelectorAll('a[href^="http"]').forEach(function(link) {
    if (link.hostname === window.location.hostname) return;
    if (link.classList.contains('whatsapp-float')) return;
    link.addEventListener('click', function() {
        trackGA('enlace_externo_clic', {
            dominio: link.hostname,
            url: link.href.substring(0, 200)
        });
    });
});

// ===== ENGAGEMENT: Bottom bar, Slide-in card, Exit-intent popup =====
(function () {
    function track(event, params) {
        trackGA(event, params);
    }

    // ---- 1. STICKY BOTTOM BAR (solo mobile) ----
    const bar = document.getElementById('sticky-bottom-bar');
    if (bar && window.innerWidth <= 768 && !sessionStorage.getItem('bar_dismissed')) {
        setTimeout(function () {
            bar.classList.add('visible');
            document.body.classList.add('bar-visible');
            track('barra_inferior_visible');
        }, 4000);

        document.getElementById('bar-close')?.addEventListener('click', function () {
            bar.classList.remove('visible');
            document.body.classList.remove('bar-visible');
            sessionStorage.setItem('bar_dismissed', '1');
            track('barra_inferior_cerrada');
        });

        document.getElementById('bar-cta')?.addEventListener('click', function () {
            track('barra_inferior_cta_clic');
        });
    }

    // ---- 2. SLIDE-IN CARD (desktop, abajo a la derecha — se activa desde el popup) ----
    const card = document.getElementById('slidein-card');

    function showCard() {
        if (!card || sessionStorage.getItem('card_dismissed')) return;
        card.classList.add('visible');
        track('tarjeta_lateral_visible');
    }

    document.getElementById('card-close')?.addEventListener('click', function () {
        if (card) card.classList.remove('visible');
        sessionStorage.setItem('card_dismissed', '1');
        track('tarjeta_lateral_cerrada');
    });

    document.getElementById('card-cta')?.addEventListener('click', function () {
        track('tarjeta_lateral_cta_clic');
    });

    // ---- 3. POPUP (intent-based: exit en desktop, scroll 50% en mobile, fallback 30s) ----
    const popup = document.getElementById('exit-popup');
    if (popup && !sessionStorage.getItem('popup_shown')) {
        var popupFired = false;
        var isMobile = window.innerWidth <= 768;

        function showPopup(disparo) {
            if (popupFired) return;
            popupFired = true;
            popup.classList.add('active');
            sessionStorage.setItem('popup_shown', '1');
            track('popup_entrada_visible', { disparo: disparo });
        }

        if (isMobile) {
            // Mobile: trigger por scroll 50% (intención real de leer)
            var scrollListener = function () {
                var pct = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100;
                if (pct >= 50) {
                    showPopup('scroll_50');
                    window.removeEventListener('scroll', scrollListener);
                }
            };
            window.addEventListener('scroll', scrollListener, { passive: true });
        } else {
            // Desktop: exit-intent real (mouseleave hacia el top del viewport)
            var exitListener = function (e) {
                if (e.clientY <= 0) {
                    showPopup('exit_intent');
                    document.removeEventListener('mouseleave', exitListener);
                }
            };
            document.addEventListener('mouseleave', exitListener);
        }

        // Fallback: si nada disparó en 8s, mostrar igualmente (no perder tráfico bouncing)
        setTimeout(function () { showPopup('fallback_8s'); }, 8000);

        function closePopup() {
            popup.classList.remove('active');
            if (window.innerWidth > 768) {
                setTimeout(showCard, 8000);
            }
        }

        document.getElementById('exit-popup-close')?.addEventListener('click', function () {
            closePopup();
            track('popup_entrada_cerrado');
        });

        popup.addEventListener('click', function (e) {
            if (e.target === popup) {
                closePopup();
                track('popup_entrada_cerrado');
            }
        });

        document.getElementById('popup-cta-wa')?.addEventListener('click', function () {
            track('popup_entrada_whatsapp_clic');
            var popupWaEventId = generateMetaEventId();
            if (typeof fbq === 'function') fbq('track', 'Contact', { source: 'popup_whatsapp' }, { eventID: popupWaEventId });
            sendMetaCAPI('Contact', popupWaEventId, { custom_data: { source: 'popup_whatsapp' } });
        });

        document.getElementById('popup-cta-form')?.addEventListener('click', function () {
            closePopup();
            document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
            track('popup_entrada_formulario_clic');
        });
    }
})();

// Errores JS en producción
window.addEventListener('error', function(e) {
    if (e.error && typeof trackGA === 'function') {
        trackGA('error_javascript', {
            message: (e.error.message || '').substring(0, 150),
            file: (e.filename || '').split('/').pop(),
            line: e.lineno || 0
        });
    }
});

// Video demo modal
(function () {
    const trigger = document.getElementById('video-demo-trigger');
    const modal = document.getElementById('video-modal');
    const closeBtn = document.getElementById('video-modal-close');
    const player = document.getElementById('video-modal-player');
    if (!trigger || !modal || !player) return;

    let watchedQuartiles = { 25: false, 50: false, 75: false, 100: false };

    function openModal() {
        modal.hidden = false;
        document.body.style.overflow = 'hidden';
        player.currentTime = 0;
        watchedQuartiles = { 25: false, 50: false, 75: false, 100: false };
        const playPromise = player.play();
        if (playPromise) playPromise.catch(() => {});
        trackGA('video_demo_play', { source: 'hero_cta' });
    }
    function closeModal() {
        player.pause();
        modal.hidden = true;
        document.body.style.overflow = '';
    }
    trigger.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function (e) {
        if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && !modal.hidden) closeModal();
    });
    player.addEventListener('timeupdate', function () {
        if (!player.duration) return;
        const pct = (player.currentTime / player.duration) * 100;
        [25, 50, 75].forEach(q => {
            if (!watchedQuartiles[q] && pct >= q) {
                watchedQuartiles[q] = true;
                trackGA('video_demo_progress', { percent: q });
            }
        });
    });
    player.addEventListener('ended', function () {
        if (!watchedQuartiles[100]) {
            watchedQuartiles[100] = true;
            trackGA('video_demo_complete', {});
        }
    });
})();

// Log cuando la página carga
console.log('✅ Digisoft page loaded successfully');