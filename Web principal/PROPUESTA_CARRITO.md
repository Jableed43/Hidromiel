# 🛒 Propuesta de Carrito de Compras Funcional

## 📋 Resumen Ejecutivo

Propuesta para implementar un carrito de compras funcional usando **localStorage** del navegador, sin necesidad de backend. El carrito permitirá agregar productos, modificar cantidades, eliminar items y calcular el total, manteniendo los datos entre sesiones.

---

## 🎯 Objetivos

1. ✅ Agregar productos al carrito desde la página de productos
2. ✅ Visualizar el carrito en cualquier momento
3. ✅ Modificar cantidades de productos
4. ✅ Eliminar productos del carrito
5. ✅ Calcular total automáticamente
6. ✅ Persistir datos en localStorage
7. ✅ Mostrar contador de items en el header
8. ✅ Diseño responsive y accesible

---

## 🏗️ Arquitectura Propuesta

### Estructura de Archivos

```
Web principal/
├── js/
│   ├── menu.js (ya existe)
│   ├── carrito.js (nuevo - lógica del carrito)
│   └── productos.js (nuevo - manejo de productos)
├── css/
│   ├── carrito.css (nuevo - estilos del carrito)
│   └── ... (archivos existentes)
```

---

## 📊 Estructura de Datos

### Producto en el Carrito

```javascript
{
    id: "hidromiel-tradicional",        // ID único del producto
    nombre: "Hidromiel Tradicional",     // Nombre del producto
    precio: 800,                         // Precio unitario
    cantidad: 2,                         // Cantidad seleccionada
    imagen: "img/hidromiel tradicional.jpg"  // Ruta de la imagen
}
```

### Carrito (Array de Productos)

```javascript
[
    {
        id: "hidromiel-tradicional",
        nombre: "Hidromiel Tradicional",
        precio: 800,
        cantidad: 2,
        imagen: "img/hidromiel tradicional.jpg"
    },
    {
        id: "hidromiel-brochette",
        nombre: "Hidromiel Brochette",
        precio: 800,
        cantidad: 1,
        imagen: "img/brochette.png"
    }
]
```

---

## 🎨 Componentes UI Propuestos

### 1. **Icono de Carrito en el Header**
- Ubicación: Junto al menú hamburguesa
- Muestra contador de items (badge)
- Al hacer clic, abre/cierra el carrito
- Responsive: visible en todas las pantallas

### 2. **Panel Lateral del Carrito (Sidebar)**
- Se desliza desde la derecha
- Muestra lista de productos
- Botones para incrementar/decrementar cantidad
- Botón para eliminar producto
- Total calculado dinámicamente
- Botón "Finalizar Compra"
- Botón para cerrar el panel

### 3. **Notificaciones Toast**
- Mensaje cuando se agrega un producto
- Mensaje cuando se elimina un producto
- Animación suave de entrada/salida

---

## 🔧 Funcionalidades Detalladas

### Funciones Principales

#### 1. **Agregar al Carrito**
```javascript
function agregarAlCarrito(producto) {
    // Buscar si el producto ya existe
    // Si existe, incrementar cantidad
    // Si no existe, agregar nuevo item
    // Guardar en localStorage
    // Actualizar UI
    // Mostrar notificación
}
```

#### 2. **Actualizar Cantidad**
```javascript
function actualizarCantidad(id, nuevaCantidad) {
    // Validar cantidad (mínimo 1)
    // Actualizar en el array
    // Guardar en localStorage
    // Recalcular total
    // Actualizar UI
}
```

#### 3. **Eliminar Producto**
```javascript
function eliminarProducto(id) {
    // Filtrar producto del array
    // Guardar en localStorage
    // Actualizar contador
    // Actualizar UI
    // Mostrar notificación
}
```

#### 4. **Calcular Total**
```javascript
function calcularTotal() {
    // Sumar: precio * cantidad de cada producto
    // Formatear como moneda
    // Retornar total
}
```

#### 5. **Persistencia con localStorage**
```javascript
function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function cargarCarrito() {
    const carritoGuardado = localStorage.getItem('carrito');
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
}
```

---

## 🎨 Diseño Visual Propuesto

### Panel del Carrito

```
┌─────────────────────────────────┐
│  🛒 Carrito de Compras        ✕  │
├─────────────────────────────────┤
│                                 │
│  [Imagen] Hidromiel Tradicional │
│         $800  [−] 2 [+]  $1,600 │
│                    🗑️           │
│ ─────────────────────────────── │
│                                 │
│  [Imagen] Hidromiel Brochette  │
│         $800  [−] 1 [+]  $800   │
│                    🗑️           │
│ ─────────────────────────────── │
│                                 │
│  Subtotal:              $2,400  │
│  Envío:                 $500    │
│  ─────────────────────────────  │
│  Total:                 $2,900  │
│                                 │
│  [Finalizar Compra]            │
│                                 │
└─────────────────────────────────┘
```

### Características de Diseño

- **Fondo semi-transparente** cuando el carrito está abierto
- **Animación de deslizamiento** desde la derecha
- **Responsive**: En móvil ocupa toda la pantalla
- **Scroll** si hay muchos productos
- **Estados hover** en botones
- **Iconos** de Font Awesome

---

## 📱 Responsive Design

### Desktop (>768px)
- Panel lateral de 400px de ancho
- Overlay semi-transparente
- Carrito visible sin ocultar contenido principal

### Mobile (<768px)
- Panel ocupa 100% del ancho
- Overlay más oscuro
- Botones más grandes para facilitar toque

---

## 🔄 Flujo de Usuario

### Agregar Producto
1. Usuario hace clic en "Comprar" en productos.html
2. Se muestra notificación: "✓ Producto agregado"
3. Contador en header se actualiza
4. Carrito se puede abrir para ver el producto

### Modificar Cantidad
1. Usuario abre el carrito
2. Hace clic en [+] o [−]
3. Cantidad se actualiza instantáneamente
4. Total se recalcula automáticamente

### Eliminar Producto
1. Usuario hace clic en icono 🗑️
2. Producto se elimina del carrito
3. Notificación: "Producto eliminado"
4. Contador y total se actualizan

### Finalizar Compra
1. Usuario hace clic en "Finalizar Compra"
2. Se muestra formulario de checkout (futuro)
3. O redirige a página de contacto con datos prellenados

---

## 🛠️ Implementación Técnica

### Archivos a Crear/Modificar

#### 1. `js/carrito.js` (Nuevo)
- Lógica completa del carrito
- Funciones de agregar, eliminar, actualizar
- Persistencia con localStorage
- Cálculo de totales

#### 2. `js/productos.js` (Nuevo)
- Asignar IDs únicos a productos
- Manejar eventos de botones "Comprar"
- Integración con carrito.js

#### 3. `css/carrito.css` (Nuevo)
- Estilos del panel lateral
- Animaciones de entrada/salida
- Responsive design
- Estilos de notificaciones toast

#### 4. Modificar `productos.html`
- Agregar atributos `data-*` a productos
- Incluir scripts necesarios

#### 5. Modificar `main.css` o crear componente
- Estilos del icono de carrito en header
- Contador badge

---

## 📝 Código de Ejemplo

### Estructura HTML del Carrito

```html
<!-- Icono en Header -->
<button id="carrito-toggle" class="carrito-icon">
    <i class="fas fa-shopping-cart"></i>
    <span id="carrito-contador" class="carrito-badge">0</span>
</button>

<!-- Panel del Carrito -->
<div id="carrito-panel" class="carrito-panel">
    <div class="carrito-header">
        <h2>Carrito de Compras</h2>
        <button id="carrito-cerrar" class="carrito-cerrar">✕</button>
    </div>
    <div id="carrito-items" class="carrito-items">
        <!-- Items se insertan dinámicamente -->
    </div>
    <div class="carrito-footer">
        <div class="carrito-totales">
            <p>Subtotal: <span id="carrito-subtotal">$0</span></p>
            <p>Envío: <span id="carrito-envio">$500</span></p>
            <p class="carrito-total">Total: <span id="carrito-total">$0</span></p>
        </div>
        <button id="carrito-finalizar" class="btn-finalizar">
            Finalizar Compra
        </button>
    </div>
</div>

<!-- Overlay -->
<div id="carrito-overlay" class="carrito-overlay"></div>
```

---

## 🎯 Ventajas de esta Propuesta

1. ✅ **Sin Backend**: Funciona completamente en el cliente
2. ✅ **Persistencia**: Los datos se mantienen entre sesiones
3. ✅ **Ligero**: No requiere librerías externas
4. ✅ **Responsive**: Funciona en todos los dispositivos
5. ✅ **Accesible**: Cumple con estándares de accesibilidad
6. ✅ **Escalable**: Fácil agregar más funcionalidades después

---

## 🚀 Fases de Implementación

### Fase 1: Base (Prioridad Alta)
- [ ] Crear estructura HTML del carrito
- [ ] Implementar funciones básicas (agregar, eliminar)
- [ ] Persistencia con localStorage
- [ ] UI básica del panel

### Fase 2: Mejoras (Prioridad Media)
- [ ] Modificar cantidades
- [ ] Cálculo de totales
- [ ] Notificaciones toast
- [ ] Animaciones

### Fase 3: Optimizaciones (Prioridad Baja)
- [ ] Validaciones avanzadas
- [ ] Formulario de checkout
- [ ] Integración con formulario de contacto
- [ ] Mejoras de UX

---

## 💡 Consideraciones Futuras

1. **Backend Integration**: Cuando tengas backend, fácil migrar a API REST
2. **Pagos**: Integrar con pasarelas de pago (Mercado Pago, Stripe)
3. **Inventario**: Validar stock disponible
4. **Descuentos**: Sistema de cupones
5. **Wishlist**: Lista de deseos
6. **Comparar**: Comparar productos

---

## 📋 Checklist de Implementación

- [ ] Crear `js/carrito.js`
- [ ] Crear `js/productos.js`
- [ ] Crear `css/carrito.css`
- [ ] Agregar HTML del carrito a todas las páginas
- [ ] Modificar `productos.html` con data-attributes
- [ ] Agregar icono de carrito al header
- [ ] Implementar funciones básicas
- [ ] Agregar estilos responsive
- [ ] Probar en diferentes dispositivos
- [ ] Optimizar rendimiento

---

## 🎨 Paleta de Colores para el Carrito

- **Fondo del panel**: `#ffffff` o `var(--color-primary)`
- **Texto**: `var(--color-text-dark)`
- **Botones**: `var(--color-accent)`
- **Hover**: `var(--color-primary-dark)`
- **Overlay**: `rgba(0, 0, 0, 0.5)`
- **Badge contador**: `#ff0000` o `var(--color-accent)`

---

## 📞 Próximos Pasos

1. **Revisar esta propuesta** y aprobar cambios si es necesario
2. **Implementar Fase 1** (funcionalidad básica)
3. **Probar en diferentes navegadores**
4. **Iterar** según feedback

¿Te parece bien esta propuesta? ¿Quieres que implemente alguna parte específica o hacer algún ajuste?

