# Digisoft - Página Web

Sitio web estático de Digisoft con estructura profesional basada en la página oficial (digisoft.do).

## 📁 Estructura del Proyecto

```
digisoft/
├── index.html              # Página principal
├── css/
│   ├── styles.css          # Estilos principales
│   └── responsive.css      # Estilos responsivos
├── js/
│   └── main.js             # JavaScript para interactividad
├── images/
│   ├── logo-digisol-full.png
│   ├── hero/
│   │   └── erp-dashboard.png
│   ├── testimonials/       # Avatares (dinámicos)
│   └── icons/              # Iconos (SVG inline)
└── README.md
```

## 🎯 Secciones

1. **Header & Navegación**
   - Logo de Digisoft
   - Enlaces a secciones principales
   - CTA "Prueba Gratis"

2. **Hero Section**
   - Headline principal: "Gestiona de forma inteligente tu Contabilidad"
   - Beneficios principales
   - Subtítulo descriptivo
   - Imagen del dashboard
   - Botones CTA

3. **Módulos Principales** (NEW)
   - Fiscalidad y Cumplimiento
   - Gestión Operativa
   - Soporte y Cercanía

4. **OCR + IA**
   - 4 pasos visuales
   - Proceso automatizado de facturas

5. **Cómo Digisoft Ayuda**
   - 4 beneficios principales
   - Configuración personalizada
   - Implementación rápida

6. **Pricing**
   - Toggle Mensual/Anual
   - 3 planes: Básico, Standard, Plus
   - Características por plan

7. **FAQ**
   - 5 preguntas frecuentes
   - Accordion expandible

8. **CTA Final**
   - Llamada a acción fuerte
   - "Comienza a gestionar tu negocio inteligentemente"

9. **Footer**
   - Información de contacto
   - Enlaces importantes
   - Redes sociales

## 🎨 Diseño

- **Colores Principal:**
  - Primary: #18355E (azul oscuro)
  - Secondary: #FF6B35 (naranja)
  - Accent: #10B981 (verde)
  - Neutral: #F5F5F5 (gris claro)

- **Tipografía:** Inter / System fonts

- **Responsive:** Mobile-first, optimizado para mobile/tablet/desktop

## 🚀 Despliegue Local (Docker)

### Opción 1: Script automático
```bash
/Users/mmerino/projects/REBUILD_DOCKER_NEW_SITE.sh
```

### Opción 2: Comandos manuales
```bash
cd /Users/mmerino/projects

# Detener y eliminar anterior
docker stop digisoft-web 2>/dev/null || true
docker rm digisoft-web 2>/dev/null || true
docker rmi digisoft-web 2>/dev/null || true

# Reconstruir
docker build --no-cache -t digisoft-web .

# Ejecutar
docker run -d \
  --name digisoft-web \
  -p 80:80 \
  -p 443:443 \
  digisoft-web

# Verificar
docker ps | grep digisoft-web
```

Accede a: **http://localhost**

## 📝 Funcionalidades JavaScript

- **Toggle Pricing:** Cambio entre precios mensual/anual
- **Accordion FAQ:** Expandir/contraer respuestas
- **Smooth Scroll:** Navegación suave entre secciones
- **Active Link Highlight:** Resalta enlace activo en nav
- **CTA Tracking:** Registra clics en botones (preparado para Google Analytics)

## 🖼️ Imágenes Requeridas

- `images/logo-digisol-full.png` - Logo (ya presente)
- `images/hero/erp-dashboard.png` - Dashboard screenshot

## 📱 Responsive

- ✅ Mobile: 480px
- ✅ Tablet: 768px
- ✅ Desktop: 1200px+

## 🔧 Tecnologías

- HTML5 semántico
- CSS3 con variables CSS
- JavaScript vanilla (sin dependencias)
- Docker & Nginx

## 📞 Contacto

info@digisol.do
809 841 2510
Punta Cana, República Dominicana
