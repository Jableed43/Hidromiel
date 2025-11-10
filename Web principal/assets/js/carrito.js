/**
 * Sistema de Carrito de Compras
 * Maneja la funcionalidad completa del carrito: agregar, eliminar, actualizar productos
 * y persistencia en localStorage
 */

// ===== VARIABLES GLOBALES =====
let carrito = [];

// Constantes de configuración
const CARRITO_STORAGE_KEY = 'hidromiel_carrito';
const PRECIO_ENVIO = 500;

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    cargarCarrito();
    renderizarCarrito();
    actualizarContador();
    inicializarEventos();
});

// ===== PERSISTENCIA CON LOCALSTORAGE =====

/**
 * Guarda el estado actual del carrito en localStorage
 */
function guardarCarrito() {
    localStorage.setItem(CARRITO_STORAGE_KEY, JSON.stringify(carrito));
}

/**
 * Carga el carrito desde localStorage al iniciar la página
 */
function cargarCarrito() {
    const carritoGuardado = localStorage.getItem(CARRITO_STORAGE_KEY);
    carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];
}

// ===== GESTIÓN DE PRODUCTOS =====

/**
 * Agrega un producto al carrito o incrementa su cantidad si ya existe
 * @param {Object} producto - Objeto con id, nombre, precio e imagen
 */
function agregarAlCarrito(producto) {
    const productoExistente = carrito.find(item => item.id === producto.id);
    
    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        carrito.push({
            ...producto,
            cantidad: 1
        });
    }
    
    guardarCarrito();
    renderizarCarrito();
    actualizarContador();
    mostrarToast(`${producto.nombre} agregado al carrito`, 'success');
}

/**
 * Elimina un producto del carrito
 * @param {string} id - ID único del producto a eliminar
 */
function eliminarProducto(id) {
    const producto = carrito.find(item => item.id === id);
    if (producto) {
        carrito = carrito.filter(item => item.id !== id);
        guardarCarrito();
        renderizarCarrito();
        actualizarContador();
        mostrarToast(`${producto.nombre} eliminado del carrito`, 'info');
    }
}

/**
 * Actualiza la cantidad de un producto en el carrito
 * @param {string} id - ID único del producto
 * @param {number} nuevaCantidad - Nueva cantidad (mínimo 1)
 */
function actualizarCantidad(id, nuevaCantidad) {
    if (nuevaCantidad < 1) {
        eliminarProducto(id);
        return;
    }
    
    const producto = carrito.find(item => item.id === id);
    if (producto) {
        producto.cantidad = nuevaCantidad;
        guardarCarrito();
        renderizarCarrito();
        actualizarContador();
    }
}

// ===== CÁLCULOS =====

/**
 * Calcula el subtotal del carrito (suma de precio * cantidad de cada producto)
 * @returns {number} Subtotal sin envío
 */
function calcularSubtotal() {
    return carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
}

/**
 * Calcula el total final incluyendo envío
 * @returns {number} Total con envío
 */
function calcularTotal() {
    const subtotal = calcularSubtotal();
    return subtotal + (subtotal > 0 ? PRECIO_ENVIO : 0);
}

// ===== RENDERIZADO DE UI =====

/**
 * Renderiza la lista de productos en el panel del carrito
 * Actualiza también los totales y el estado del botón de finalizar
 */
function renderizarCarrito() {
    const container = document.getElementById('carrito-items');
    const subtotalEl = document.getElementById('carrito-subtotal');
    const envioEl = document.getElementById('carrito-envio');
    const totalEl = document.getElementById('carrito-total');
    const btnFinalizar = document.getElementById('carrito-finalizar');
    
    if (!container || !subtotalEl || !envioEl || !totalEl || !btnFinalizar) {
        return; // Elementos no existen aún
    }
    
    if (carrito.length === 0) {
        container.innerHTML = `
            <div class="carrito-vacio">
                <i class="fas fa-shopping-cart"></i>
                <p>Tu carrito está vacío</p>
            </div>
        `;
        btnFinalizar.disabled = true;
    } else {
        container.innerHTML = carrito.map(item => `
            <div class="carrito-item" data-producto-id="${item.id}">
                <img src="${item.imagen}" alt="${item.nombre}" class="carrito-item-img">
                <div class="carrito-item-info">
                    <h4>${item.nombre}</h4>
                    <p class="carrito-item-precio">$${item.precio.toLocaleString()}</p>
                </div>
                <div class="carrito-item-controls">
                    <button class="btn-cantidad" onclick="actualizarCantidad('${item.id}', ${item.cantidad - 1})" aria-label="Disminuir cantidad">
                        <i class="fas fa-minus"></i>
                    </button>
                    <span class="carrito-item-cantidad">${item.cantidad}</span>
                    <button class="btn-cantidad" onclick="actualizarCantidad('${item.id}', ${item.cantidad + 1})" aria-label="Aumentar cantidad">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
                <div class="carrito-item-total">
                    $${(item.precio * item.cantidad).toLocaleString()}
                </div>
                <button class="btn-eliminar" onclick="eliminarProducto('${item.id}')" aria-label="Eliminar ${item.nombre}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
        
        btnFinalizar.disabled = false;
    }
    
    // Actualizar totales
    const subtotal = calcularSubtotal();
    const total = calcularTotal();
    
    subtotalEl.textContent = `$${subtotal.toLocaleString()}`;
    envioEl.textContent = subtotal > 0 ? `$${PRECIO_ENVIO.toLocaleString()}` : '$0';
    totalEl.textContent = `$${total.toLocaleString()}`;
}

/**
 * Actualiza el contador de items en el icono del carrito del header
 */
function actualizarContador() {
    const contador = document.getElementById('carrito-contador');
    if (!contador) return;
    
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    contador.textContent = totalItems;
    contador.style.display = totalItems > 0 ? 'flex' : 'none';
}

// ===== EVENTOS =====

/**
 * Inicializa todos los event listeners del carrito
 */
function inicializarEventos() {
    // Toggle del panel
    const toggle = document.getElementById('carrito-toggle');
    const panel = document.getElementById('carrito-panel');
    const overlay = document.getElementById('carrito-overlay');
    const cerrar = document.getElementById('carrito-cerrar');
    const finalizar = document.getElementById('carrito-finalizar');
    
    toggle?.addEventListener('click', () => abrirCarrito());
    cerrar?.addEventListener('click', () => cerrarCarrito());
    overlay?.addEventListener('click', () => cerrarCarrito());
    finalizar?.addEventListener('click', () => finalizarCompra());
    
    // Cerrar con Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && panel?.classList.contains('abierto')) {
            cerrarCarrito();
        }
    });
}

/**
 * Abre el panel del carrito
 */
function abrirCarrito() {
    const panel = document.getElementById('carrito-panel');
    const overlay = document.getElementById('carrito-overlay');
    if (panel && overlay) {
        panel.classList.add('abierto');
        overlay.classList.add('visible');
        document.body.style.overflow = 'hidden';
    }
}

/**
 * Cierra el panel del carrito
 */
function cerrarCarrito() {
    const panel = document.getElementById('carrito-panel');
    const overlay = document.getElementById('carrito-overlay');
    if (panel && overlay) {
        panel.classList.remove('abierto');
        overlay.classList.remove('visible');
        document.body.style.overflow = '';
    }
}

/**
 * Redirige al formulario de contacto con los datos del carrito prellenados
 */
function finalizarCompra() {
    if (carrito.length === 0) return;
    
    // Redirigir a formulario de contacto con datos prellenados
    const productos = carrito.map(item => 
        `${item.nombre} x${item.cantidad}`
    ).join(', ');
    
    const mensaje = `Deseo comprar: ${productos}. Total: $${calcularTotal().toLocaleString()}`;
    window.location.href = `contacto.html?mensaje=${encodeURIComponent(mensaje)}&motivo=Compra`;
}

// ===== NOTIFICACIONES TOAST =====

/**
 * Muestra una notificación toast temporal
 * @param {string} mensaje - Mensaje a mostrar
 * @param {string} tipo - Tipo de notificación ('success' o 'info')
 */
function mostrarToast(mensaje, tipo = 'success') {
    let container = document.getElementById('toast-container');
    
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${tipo}`;
    toast.innerHTML = `
        <i class="fas fa-${tipo === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${mensaje}</span>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ===== EXPORTAR FUNCIONES GLOBALES =====
// Estas funciones deben estar disponibles globalmente para los onclick en el HTML
window.agregarAlCarrito = agregarAlCarrito;
window.eliminarProducto = eliminarProducto;
window.actualizarCantidad = actualizarCantidad;
