/**
 * Gestión del Formulario de Contacto
 * - Prellena el formulario cuando viene desde el carrito
 * - Intercepta el envío y abre WhatsApp con el mensaje formateado
 */

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const mensaje = urlParams.get('mensaje');
    const motivo = urlParams.get('motivo');
    
    // Prellenar mensaje si viene del carrito
    if (mensaje) {
        const textarea = document.getElementById('mensaje');
        if (textarea) {
            textarea.value = decodeURIComponent(mensaje);
            textarea.scrollIntoView({ behavior: 'smooth', block: 'center' });
            textarea.focus();
            setTimeout(() => {
                textarea.style.backgroundColor = '#fffacd';
                setTimeout(() => {
                    textarea.style.backgroundColor = '';
                }, 2000);
            }, 100);
        }
    }
    
    // Seleccionar motivo si viene del carrito
    if (motivo) {
        const selectMotivo = document.getElementById('motivo');
        if (selectMotivo) {
            selectMotivo.value = motivo;
            setTimeout(() => {
                selectMotivo.style.backgroundColor = '#fffacd';
                setTimeout(() => {
                    selectMotivo.style.backgroundColor = '';
                }, 2000);
            }, 100);
        }
    }
    
    // Interceptar envío del formulario y abrir WhatsApp
    const formulario = document.getElementById('formulario-contacto');
    if (formulario) {
        formulario.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevenir envío normal del formulario
            
            // Obtener valores del formulario
            const nombre = document.getElementById('nombre').value.trim();
            const apellido = document.getElementById('apellido').value.trim();
            const email = document.getElementById('email').value.trim();
            const motivo = document.getElementById('motivo').value;
            const mensaje = document.getElementById('mensaje').value.trim();
            
            // Validar que todos los campos estén completos
            if (!nombre || !apellido || !email || !motivo || !mensaje) {
                alert('Por favor, complete todos los campos del formulario.');
                return;
            }
            
            // Número de WhatsApp (formato internacional para Argentina)
            // 15-1111-1111 -> 541511111111
            const whatsappNumber = '541511111111';
            
            // Construir mensaje formateado para WhatsApp
            let mensajeWhatsApp = '*NUEVA CONSULTA*\n';
            mensajeWhatsApp += 'Hidromiel Artesanal\n\n';
            
            mensajeWhatsApp += '*DATOS DE CONTACTO*\n';
            mensajeWhatsApp += `Nombre: ${nombre} ${apellido}\n`;
            mensajeWhatsApp += `Email: ${email}\n`;
            mensajeWhatsApp += `Motivo: ${motivo}\n\n`;
            
            mensajeWhatsApp += '*MENSAJE*\n';
            mensajeWhatsApp += `${mensaje}\n\n`;
            
            mensajeWhatsApp += '─────────────────\n';
            mensajeWhatsApp += 'Enviado desde el sitio web';
            
            // Codificar mensaje para URL
            const mensajeCodificado = encodeURIComponent(mensajeWhatsApp);
            
            // Abrir WhatsApp Web
            const whatsappURL = `https://wa.me/${whatsappNumber}?text=${mensajeCodificado}`;
            window.open(whatsappURL, '_blank');
        });
    }
});
