/**
 * One Page Navigation - Scroll Suave
 */

function inicializarOnepage() {
    // Obtener todos los enlaces del menú que apuntan a secciones
    const menuLinks = document.querySelectorAll('a[href^="#"]');
    
    // Agregar evento click a cada enlace
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Solo procesar si es un ancla (no es solo #)
            if (href && href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // Calcular posición con offset del header
                    const header = document.querySelector('header');
                    const headerHeight = header ? header.offsetHeight : 80;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20; // 20px extra de espacio
                    
                    // Scroll suave
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Cerrar menú móvil si está abierto
                    const menuSlide = document.querySelector('.menu-slide');
                    const menuOverlay = document.querySelector('.menu-overlay');
                    if (menuSlide && menuSlide.classList.contains('menu-visible')) {
                        menuSlide.classList.remove('menu-visible');
                        if (menuOverlay) {
                            menuOverlay.classList.remove('active');
                        }
                    }
                }
            }
        });
    });
    
    // Actualizar estado activo del menú al hacer scroll
    let currentSection = '';
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveMenu() {
        const scrollPosition = window.pageYOffset + 150; // Offset para activar antes
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                if (currentSection !== sectionId) {
                    currentSection = sectionId;
                    
                    // Actualizar enlaces activos
                    menuLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            }
        });
    }
    
    // Escuchar eventos de scroll
    window.addEventListener('scroll', updateActiveMenu);
    updateActiveMenu(); // Llamar una vez al cargar
}

// Auto-inicializar si estamos en la página principal
if (document.querySelector('.hero-section-full') || document.querySelector('section[id]')) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', inicializarOnepage);
    } else {
        inicializarOnepage();
    }
}

