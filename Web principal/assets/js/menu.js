/**
 * Sistema de Menú Lateral con Efecto Slide
 * Maneja el menú deslizante desde el borde izquierdo en dispositivos móviles
 * con soporte para hover, click y gestos táctiles
 */

document.addEventListener('DOMContentLoaded', function() {
    const menuTrigger = document.getElementById('menu-slide-trigger');
    const menuSlide = document.querySelector('.menu-slide');
    const menuOverlay = document.querySelector('.menu-overlay');
    
    if (menuTrigger && menuSlide) {
        let hoverTimeout;
        let isMenuVisible = false;
        
        /**
         * Muestra el menú deslizante
         */
        function showMenu() {
            clearTimeout(hoverTimeout);
            menuSlide.classList.add('menu-visible');
            if (menuOverlay) {
                menuOverlay.classList.add('visible');
            }
            isMenuVisible = true;
        }
        
        /**
         * Oculta el menú deslizante con un pequeño delay
         */
        function hideMenu() {
            hoverTimeout = setTimeout(() => {
                menuSlide.classList.remove('menu-visible');
                if (menuOverlay) {
                    menuOverlay.classList.remove('visible');
                }
                isMenuVisible = false;
            }, 200); // Delay para evitar cierre accidental
        }
        
        // Mostrar menú al hover sobre el trigger
        menuTrigger.addEventListener('mouseenter', showMenu);
        menuTrigger.addEventListener('mouseleave', hideMenu);
        
        // Mantener menú visible cuando el mouse está sobre el menú
        if (menuSlide) {
            menuSlide.addEventListener('mouseenter', () => {
                clearTimeout(hoverTimeout);
                if (!isMenuVisible) {
                    showMenu();
                }
            });
            
            menuSlide.addEventListener('mouseleave', hideMenu);
        }
        
        // Cerrar menú al hacer clic en el overlay
        if (menuOverlay) {
            menuOverlay.addEventListener('click', () => {
                menuSlide.classList.remove('menu-visible');
                menuOverlay.classList.remove('visible');
                isMenuVisible = false;
            });
        }
        
        // Cerrar menú al hacer clic en un enlace
        const menuLinks = menuSlide.querySelectorAll('.menu a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuSlide.classList.remove('menu-visible');
                if (menuOverlay) {
                    menuOverlay.classList.remove('visible');
                }
                isMenuVisible = false;
            });
        });
        
        // Cerrar menú con tecla Escape
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && isMenuVisible) {
                menuSlide.classList.remove('menu-visible');
                if (menuOverlay) {
                    menuOverlay.classList.remove('visible');
                }
                isMenuVisible = false;
            }
        });
        
        // Soporte para dispositivos táctiles - Detectar swipe
        let touchStartX = 0;
        let touchEndX = 0;
        
        menuTrigger.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        menuTrigger.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            if (touchEndX - touchStartX > 0) {
                // Swipe right - mostrar menú
                if (!isMenuVisible) {
                    showMenu();
                } else {
                    hideMenu();
                }
            }
        });
        
        // Click en el trigger para dispositivos táctiles
        menuTrigger.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                if (isMenuVisible) {
                    menuSlide.classList.remove('menu-visible');
                    if (menuOverlay) {
                        menuOverlay.classList.remove('visible');
                    }
                    isMenuVisible = false;
                } else {
                    showMenu();
                }
            }
        });
    }
});
