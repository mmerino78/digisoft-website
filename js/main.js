/* ===== JAVASCRIPT MAIN ===== */

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
});

// Toggle entre precios mensual y anual
function togglePricing(period) {
    // Actualizar botones
    document.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // Mostrar/ocultar precios
    if (period === 'monthly') {
        document.querySelectorAll('.monthly').forEach(el => {
            el.style.display = 'block';
        });
        document.querySelectorAll('.annual').forEach(el => {
            el.style.display = 'none';
        });
    } else {
        document.querySelectorAll('.monthly').forEach(el => {
            el.style.display = 'none';
        });
        document.querySelectorAll('.annual').forEach(el => {
            el.style.display = 'block';
        });
    }
}

// Toggle FAQ
function toggleFaq(button) {
    const faqItem = button.parentElement;
    faqItem.classList.toggle('active');
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

// Tracking de CTAs (placeholder para Google Analytics)
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', function() {
        const buttonText = this.innerText;
        console.log('CTA clicked:', buttonText);
        // Aquí iría: gtag('event', 'cta_click', { 'button': buttonText });
    });
});

// Log cuando la página carga
console.log('✅ Digisoft page loaded successfully');
