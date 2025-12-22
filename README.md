# Guía Digital para Huéspedes - Complejo de Cabañas

## 📱 Descripción
Guía digital web optimizada para huéspedes de un complejo de cabañas. Diseñada con enfoque mobile-first y accesibilidad para todos los públicos, incluyendo personas mayores.

## ✨ Características principales
- **Diseño Glassmorphism premium**: Estética moderna y elegante
- **Mobile-first**: Optimizado para uso en smartphones
- **Accesibilidad**: Botones grandes, tipografía legible, alto contraste
- **Navegación simple**: Máximo 2 toques para encontrar información
- **Sin dependencias**: HTML, CSS y JavaScript vanilla
- **Hosting estático**: Listo para Netlify o GitHub Pages

## 🎯 Secciones
1. **Home**: Pantalla de bienvenida con 4 acciones principales
2. **Dónde comer**: Restaurantes y cafés cercanos
3. **Qué hacer cerca**: Actividades y lugares de interés
4. **Servicios útiles**: Supermercados, farmacias, estaciones de servicio
5. **Cómo moverse**: Transporte público, taxis, alquiler de bicicletas

## 🚀 Cómo usar

### Opción 1: Abrir directamente
1. Abrir `index.html` en cualquier navegador moderno
2. Funciona sin servidor local

### Opción 2: Servidor local (recomendado para desarrollo)
```bash
# Con Python 3
python3 -m http.server 8000

# Con Node.js (npx)
npx serve

# Luego abrir: http://localhost:8000
```

## 📝 Personalización

### Cambiar nombre del complejo
Editar en `index.html` línea 12:
```html
<h1>Complejo de Cabañas Serenidad</h1>
```

### Agregar/editar lugares
Cada sección tiene cards con esta estructura:
```html
<div class="card">
    <h2>Nombre del lugar</h2>
    <p>Descripción breve y clara.</p>
    <a href="https://maps.google.com/?q=Nombre+del+lugar" target="_blank" class="map-link">📍 Ver en mapa</a>
</div>
```

### Cambiar colores del degradado
Editar en `styles.css` línea 13:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
```

## 🌐 Deployment

### Netlify
1. Crear cuenta en [Netlify](https://netlify.com)
2. Arrastrar la carpeta del proyecto
3. Listo! URL generada automáticamente

### GitHub Pages
1. Subir archivos a un repositorio de GitHub
2. Ir a Settings > Pages
3. Seleccionar branch y carpeta
4. Guardar y esperar deployment

## ♿ Accesibilidad
- Contraste de color WCAG AA compliant
- Botones con área táctil mínima de 44x44px
- Tipografía legible (mínimo 1.1em)
- Soporte para `prefers-reduced-motion`
- Íconos siempre acompañados de texto

## 📱 Compatibilidad
- iOS Safari 12+
- Android Chrome 80+
- Todos los navegadores modernos
- Funciona offline después de la primera carga

## 🔧 Estructura de archivos
```
/
├── index.html      # Estructura HTML
├── styles.css      # Estilos glassmorphism
├── script.js       # Navegación entre pantallas
└── README.md       # Este archivo
```

## 💡 Consejos de uso
- Enviar link por WhatsApp durante check-in
- Agregar a favoritos del navegador para acceso rápido
- Funciona sin conexión después de primera visita
- Actualizar contenido según temporada

## 📞 Soporte
Para modificaciones o consultas, contactar al desarrollador.
