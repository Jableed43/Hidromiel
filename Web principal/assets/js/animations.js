/**
 * Animaciones de entrada al hacer scroll
 * Agrega efectos visuales cuando los elementos entran en el viewport
 */

(function() {
    'use strict';

    // Opciones para el Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    // Función para agregar clases de animación
    function addAnimationClass(element, animationType = 'fade-in-up') {
        if (!element.classList.contains('animated')) {
            element.classList.add(animationType);
            element.classList.add('animated');
        }
    }

    // Crear observer para animaciones
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Determinar tipo de animación según el elemento
                let animationType = 'fade-in-up';
                
                if (element.classList.contains('beneficio-card') || 
                    element.classList.contains('valor-card') ||
                    element.classList.contains('tip-card') ||
                    element.classList.contains('info-card')) {
                    animationType = 'fade-in-up';
                } else if (element.classList.contains('historia-content')) {
                    animationType = 'slide-in-left';
                } else if (element.classList.contains('historia-media')) {
                    animationType = 'slide-in-right';
                } else if (element.classList.contains('section-title')) {
                    animationType = 'fade-in';
                } else if (element.classList.contains('product-container')) {
                    animationType = 'scale-in';
                }
                
                addAnimationClass(element, animationType);
                animationObserver.unobserve(element);
            }
        });
    }, observerOptions);

    // Inicializar observaciones cuando el DOM esté listo
    function initAnimations() {
        // Observar secciones principales
        const sections = document.querySelectorAll('section[id]');
        sections.forEach(section => {
            animationObserver.observe(section);
        });

        // Observar cards
        const cards = document.querySelectorAll(
            '.beneficio-card, .valor-card, .tip-card, .info-card, .product-container'
        );
        cards.forEach(card => {
            animationObserver.observe(card);
        });

        // Observar elementos de contenido
        const contentElements = document.querySelectorAll(
            '.historia-content, .historia-media, .section-title, .hero-content'
        );
        contentElements.forEach(element => {
            animationObserver.observe(element);
        });

        // Observar títulos de sección
        const sectionTitles = document.querySelectorAll('.section-title');
        sectionTitles.forEach(title => {
            animationObserver.observe(title);
        });
    }

    // Inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAnimations);
    } else {
        initAnimations();
    }

    // Efecto parallax sutil para imágenes de fondo
    function initParallax() {
        const parallaxElements = document.querySelectorAll('.proceso-background');
        
        if (parallaxElements.length === 0) return;

        function updateParallax() {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = 0.3;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        }

        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    updateParallax();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    // Inicializar parallax
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initParallax);
    } else {
        initParallax();
    }

    // Efecto de header al hacer scroll
    function initHeaderScroll() {
        const header = document.querySelector('header');
        if (!header) return;

        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            lastScroll = currentScroll;
        });
    }

    // Inicializar header scroll
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHeaderScroll);
    } else {
        initHeaderScroll();
    }

})();

