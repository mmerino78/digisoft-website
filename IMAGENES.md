# 📸 GUÍA: AGREGAR IMÁGENES AL PROYECTO DIGISOFT

**Proyecto:** /Users/mmerino/projects/digisoft/
**Fecha:** 1 de Febrero, 2026

---

## 🎯 Imágenes Necesarias

### 1. HERO SECTION (1 imagen)

**Archivo:** `images/hero/dashboard.png`
**Tamaño:** 600x400px mínimo
**Formato:** PNG o WebP (< 150KB)
**Descripción:** Captura profesional del dashboard de Digisoft

**Instrucciones:**
1. Toma una captura de pantalla del dashboard
2. Recorta a 600x400px
3. Comprime a < 150KB
4. Guarda como `dashboard.png`

---

### 2. STEP ICONS (4 imágenes)

Estos deben ser iconos simples y claros. Puedes:
- Usar iconos de FontAwesome (descargar como PNG)
- Crear iconos simples en Figma/Canva
- Usar emojis convertidos a PNG

**Archivo 1:** `images/icons/upload.png`
- Tamaño: 64x64px
- Icono: Upload/Cloud
- Fondo: Transparente

**Archivo 2:** `images/icons/ai.png`
- Tamaño: 64x64px
- Icono: AI/Robot/Chip
- Fondo: Transparente

**Archivo 3:** `images/icons/check.png`
- Tamaño: 64x64px
- Icono: Checkmark/Tick
- Fondo: Transparente

**Archivo 4:** `images/icons/star.png`
- Tamaño: 64x64px
- Icono: Star/Sparkle
- Fondo: Transparente

---

### 3. TESTIMONIALS AVATARS (3 imágenes)

**Archivo 1:** `images/testimonials/juan.jpg`
- Tamaño: 60x60px
- Formato: JPG
- Tipo: Foto de persona (o avatar placeholder)
- Descripción: Juan García, Contador

**Archivo 2:** `images/testimonials/maria.jpg`
- Tamaño: 60x60px
- Formato: JPG
- Tipo: Foto de persona (o avatar placeholder)
- Descripción: María López, Jefe Contabilidad

**Archivo 3:** `images/testimonials/carlos.jpg`
- Tamaño: 60x60px
- Formato: JPG
- Tipo: Foto de persona (o avatar placeholder)
- Descripción: Carlos Martínez, CEO

---

## 📋 CHECKLIST DE IMÁGENES

```
[ ] images/hero/dashboard.png (600x400px, <150KB)
[ ] images/icons/upload.png (64x64px)
[ ] images/icons/ai.png (64x64px)
[ ] images/icons/check.png (64x64px)
[ ] images/icons/star.png (64x64px)
[ ] images/testimonials/juan.jpg (60x60px)
[ ] images/testimonials/maria.jpg (60x60px)
[ ] images/testimonials/carlos.jpg (60x60px)
```

---

## 🎨 FUENTES DE IMÁGENES

### Iconos Gratis
- **FontAwesome:** https://fontawesome.com/icons (descargar PNG)
- **Feather Icons:** https://feathericons.com/
- **Material Icons:** https://fonts.google.com/icons
- **Heroicons:** https://heroicons.com/

### Avatares Placeholders
- **UI Avatars:** https://ui-avatars.com/
- **Placeholder:** https://via.placeholder.com/60x60
- **Gravatar:** https://gravatar.com/

### Screenshots/Dashboard
- Toma una captura de tu ERP/Dashboard
- Si no tienes, usa un dashboard placeholder similar

---

## 🚀 CÓMO AGREGAR LAS IMÁGENES

### Opción A: Manualmente (Recomendado)

1. **Crea las carpetas:**
   ```
   digisoft/images/
   ├── hero/
   ├── icons/
   └── testimonials/
   ```

2. **Descarga o crea las imágenes**

3. **Copia a las carpetas correspondientes:**
   ```
   cp dashboard.png /Users/mmerino/projects/digisoft/images/hero/
   cp upload.png /Users/mmerino/projects/digisoft/images/icons/
   ... etc
   ```

4. **Verifica que los nombres sean exactos:**
   - `dashboard.png` (no Dashboard.png)
   - `upload.png` (no upload_icon.png)
   - etc.

### Opción B: Automatizada (Script)

Si necesitas un script para verificar/organizar, crea `verify-images.sh`:

```bash
#!/bin/bash

echo "Verificando imágenes del proyecto Digisoft..."

# Imágenes requeridas
required_images=(
    "images/hero/dashboard.png"
    "images/icons/upload.png"
    "images/icons/ai.png"
    "images/icons/check.png"
    "images/icons/star.png"
    "images/testimonials/juan.jpg"
    "images/testimonials/maria.jpg"
    "images/testimonials/carlos.jpg"
)

# Verificar cada imagen
for image in "${required_images[@]}"; do
    if [ -f "$image" ]; then
        echo "✅ $image"
    else
        echo "❌ FALTA: $image"
    fi
done
```

---

## 🎨 OPTIMIZACIÓN DE IMÁGENES

### Antes de subir:

1. **Compresión:**
   - Dashboard: < 150KB
   - Iconos: < 20KB cada uno
   - Avatares: < 30KB cada uno

2. **Herramientas de compresión:**
   - **TinyPNG:** https://tinypng.com/
   - **ImageOptim:** https://imageoptim.com/
   - **ffmpeg:** `ffmpeg -i image.png -q:v 5 image-compressed.png`

3. **Formatos recomendados:**
   - PNG para iconos (fondo transparente)
   - JPG para fotos/avatares
   - WebP para dashboard (si el navegador lo soporta)

---

## ✅ VERIFICACIÓN FINAL

Una vez agregues todas las imágenes:

1. **Abre `index.html` en navegador**
2. **Verifica que aparezcan todas las imágenes**
3. **Si no aparecen, revisa:**
   - Ruta exacta del archivo
   - Nombre del archivo (case-sensitive)
   - Tamaño del archivo (no muy grande)

---

## 📞 SI NECESITAS AYUDA

Si no tienes imágenes o iconos, puedo:

1. **Crear iconos SVG/PNG** - Dime qué necesitas
2. **Generar un dashboard placeholder** - Usando imagen genérica
3. **Buscar avatares gratis** - De libre uso comercial

Solo avísame y lo creo para ti.

---

**Documento:** Guía de Imágenes - Digisoft
**Versión:** 1.0
**Fecha:** 1 de Febrero, 2026

