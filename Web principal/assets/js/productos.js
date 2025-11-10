/**
 * Manejo de Eventos de Productos
 * Gestiona los clicks en los botones "Comprar" y extrae los datos del producto
 * para agregarlo al carrito
 */

// Función para toggle del acordeón
function toggleAccordion(header) {
    const container = header.closest('.product-container');
    const isActive = container.classList.contains('active');
    
    // Cerrar todos los acordeones
    document.querySelectorAll('.product-container.accordion').forEach(acc => {
        acc.classList.remove('active');
    });
    
    // Abrir el acordeón clickeado si no estaba activo
    if (!isActive) {
        container.classList.add('active');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const botonesAgregar = document.querySelectorAll('[data-action="agregar-carrito"]');
    
    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', function(e) {
            e.stopPropagation(); // Evitar que se cierre el acordeón al hacer click en el botón
            const container = this.closest('.product-container');
            
            if (!container) return;
            
            // Extraer datos del producto desde los data-attributes
            const producto = {
                id: container.dataset.productoId,
                nombre: container.dataset.productoNombre,
                precio: parseInt(container.dataset.productoPrecio),
                imagen: container.dataset.productoImagen
            };
            
            // Validar que todos los datos estén presentes
            if (producto.id && producto.nombre && producto.precio && producto.imagen) {
                agregarAlCarrito(producto);
            } else {
                console.error('Datos del producto incompletos:', producto);
            }
        });
    });
});
