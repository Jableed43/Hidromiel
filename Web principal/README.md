# 🍯 Hidromiel Artesanal - E-commerce

Sitio web e-commerce para la venta de hidromiel artesanal. Proyecto desarrollado con HTML5, CSS3 y JavaScript vanilla, completamente responsive y optimizado para SEO.

## 📋 Descripción

E-commerce funcional para la comercialización de hidromiel artesanal con las siguientes características:

- **Catálogo de productos** con carrito de compras funcional
- **Sistema de carrito** con persistencia en localStorage
- **Formulario de contacto** integrado con WhatsApp
- **Diseño responsive** adaptado a todos los dispositivos
- **Menú lateral** con efecto slide para móviles
- **Optimización SEO** con meta tags y estructura semántica

## 🏗️ Estructura del Proyecto

```
Web principal/
├── index.html              # Página principal
├── productos.html          # Catálogo de productos
├── contacto.html           # Formulario de contacto
├── puntos-venta.html       # Mapa de puntos de venta
├── quienes-somos.html      # Información de la empresa
├── README.md              # Este archivo
├── assets/
│   ├── css/
│   │   ├── variables.css      # Variables CSS (colores, fuentes, etc.)
│   │   ├── main.css           # Estilos principales
│   │   ├── productos.css     # Estilos de la página de productos
│   │   ├── contacto.css       # Estilos del formulario
│   │   ├── puntos-venta.css  # Estilos de puntos de venta
│   │   ├── quienes-somos.css  # Estilos de quienes somos
│   │   └── carrito.css        # Estilos del carrito de compras
│   ├── js/
│   │   ├── menu.js            # Lógica del menú lateral
│   │   ├── carrito.js         # Lógica del carrito de compras
│   │   ├── productos.js      # Manejo de eventos de productos
│   │   └── formulario.js      # Gestión del formulario y WhatsApp
│   ├── img/                   # Imágenes del sitio
│   ├── video/                 # Videos
│   └── fonts/                 # Fuentes personalizadas
```

## 🚀 Características Principales

### 🛒 Carrito de Compras
- Agregar productos al carrito
- Modificar cantidades
- Eliminar productos
- Cálculo automático de totales (subtotal + envío)
- Persistencia en localStorage
- Contador de items en el header
- Notificaciones toast al agregar/eliminar

### 📱 Diseño Responsive
- **Desktop**: Menú horizontal en el header
- **Mobile**: Menú lateral deslizante desde el borde izquierdo
- Adaptación automática de layouts
- Imágenes optimizadas con lazy loading

### 📧 Formulario de Contacto
- Validación de campos
- Integración con WhatsApp Web
- Mensaje formateado con datos del formulario
- Prellenado automático desde el carrito

### 🎨 Diseño
- Paleta de colores dorada/amarilla (tema miel)
- Animaciones suaves
- Efectos hover interactivos
- Tipografía personalizada (TheValentine)

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Estilos con variables CSS y Grid/Flexbox
- **JavaScript (ES6+)** - Funcionalidad interactiva
- **Font Awesome** - Iconos
- **Google Maps** - Mapas embebidos
- **localStorage** - Persistencia del carrito

## 📦 Instalación y Uso

### Requisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Servidor web local (recomendado: Live Server)

### Pasos para ejecutar

1. **Clonar o descargar el proyecto**

2. **Abrir con Live Server (VS Code)**
   - Instalar extensión "Live Server"
   - Clic derecho en `index.html` → "Open with Live Server"

3. **O usar servidor Python**
   ```bash
   cd "Web principal"
   python3 -m http.server 8000
   ```
   Luego abrir: `http://localhost:8000`

4. **O usar servidor Node.js**
   ```bash
   npm install -g http-server
   cd "Web principal"
   http-server -p 8000
   ```

## 📄 Páginas del Sitio

### 🏠 index.html
Página principal con información sobre el hidromiel, su historia y características.

### 🛍️ productos.html
Catálogo de productos con:
- 5 tipos de hidromiel
- Precios y descripciones
- Botones para agregar al carrito

### 📞 contacto.html
Formulario de contacto que:
- Permite enviar consultas
- Se integra con WhatsApp
- Prellena datos desde el carrito

### 📍 puntos-venta.html
Mapa interactivo con ubicación de puntos de venta.

### 👥 quienes-somos.html
Información sobre la empresa y su historia.

## 🎯 Funcionalidades del Carrito

### Agregar Productos
- Click en botón "Comprar" en cualquier producto
- El producto se agrega automáticamente al carrito
- Notificación toast de confirmación

### Ver Carrito
- Click en el icono del carrito en el header
- Panel lateral se desliza desde la derecha
- Muestra todos los productos agregados

### Modificar Cantidad
- Botones +/- en cada producto
- Actualización automática de totales

### Finalizar Compra
- Click en "Finalizar Compra"
- Redirige a formulario de contacto
- Prellena mensaje con productos y total

## 🔧 Configuración

### Cambiar Número de WhatsApp
Editar en `assets/js/formulario.js`:
```javascript
const whatsappNumber = '541511111111'; // Cambiar por tu número
```

### Cambiar Precio de Envío
Editar en `assets/js/carrito.js`:
```javascript
const PRECIO_ENVIO = 500; // Cambiar por el precio deseado
```

### Modificar Colores
Editar en `assets/css/variables.css`:
```css
--color-primary: #F9C941;
--color-primary-dark: #fcba03;
/* etc... */
```

## 📱 Responsive Breakpoints

- **Desktop**: > 992px
- **Tablet**: 768px - 992px
- **Mobile**: < 768px
- **Mobile pequeño**: < 480px

## 🔍 SEO

El sitio incluye:
- Meta tags optimizados (description, keywords, author)
- Open Graph tags para redes sociales
- Twitter Cards
- URLs canónicas
- Estructura semántica HTML5
- Atributos alt en todas las imágenes

## 🎨 Personalización

### Agregar Nuevo Producto
1. Agregar HTML en `productos.html`:
```html
<article class="product-container" 
         data-producto-id="nuevo-producto"
         data-producto-nombre="Nuevo Producto"
         data-producto-precio="1000"
         data-producto-imagen="assets/img/nuevo-producto.jpg">
    <!-- Contenido del producto -->
</article>
```

### Modificar Estilos
- Variables globales: `assets/css/variables.css`
- Estilos principales: `assets/css/main.css`
- Estilos específicos: `assets/css/[página].css`

## 🐛 Solución de Problemas

### El carrito no guarda productos
- Verificar que localStorage esté habilitado en el navegador
- Revisar la consola del navegador para errores

### Las imágenes no se cargan
- Verificar que las rutas en HTML apunten a `assets/img/`
- Verificar que los archivos existan en la carpeta

### El menú no funciona en móvil
- Verificar que el viewport esté configurado correctamente
- Revisar que los scripts se carguen correctamente

## 📝 Notas de Desarrollo

- El proyecto usa JavaScript vanilla (sin frameworks)
- No requiere compilación ni build process
- Compatible con navegadores modernos
- Funciona sin backend (todo en cliente)

## 🔄 Próximas Mejoras Sugeridas

- [ ] Sistema de autenticación de usuarios
- [ ] Integración con pasarela de pago
- [ ] Panel de administración
- [ ] Sistema de reviews/valoraciones
- [ ] Búsqueda de productos
- [ ] Filtros por categoría
- [ ] Wishlist (lista de deseos)
- [ ] Optimización de imágenes (WebP)
- [ ] PWA (Progressive Web App)

## 👤 Autor

Desarrollado como proyecto de e-commerce para Hidromiel Artesanal.

## 📄 Licencia

Este proyecto es de uso privado.

---

**Versión**: 1.0.0  
**Última actualización**: 2024

