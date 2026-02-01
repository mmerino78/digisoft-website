# Digisoft - Página Web Estática

Sitio web estático de Digisoft ERP. Compatible con servidores LAMP tradicionales.

## 📋 Requisitos

- Servidor web (Apache, Nginx, etc.)
- PHP (opcional, no es necesario para esta página)
- Acceso SSH o FTP al servidor

## 📁 Estructura

```
digisoft/
├── index.html              # Página principal
├── css/
│   ├── styles.css          # Estilos principales
│   └── responsive.css      # Responsivo (mobile/tablet)
├── js/
│   └── main.js             # JavaScript interactivo
├── images/                 # Imágenes del proyecto
│   ├── logo-digisol-full.png
│   ├── hero/
│   │   └── erp-dashboard.png
│   └── testimonials/       # Avatares
└── README.md
```

## 🚀 Instalación en Servidor LAMP

### Opción 1: SSH + Git (RECOMENDADO)

```bash
# 1. Conectar al servidor
ssh usuario@tu-servidor.com

# 2. Navegar a la carpeta web
cd /var/www/html
# O donde sea tu DocumentRoot (puede ser /home/usuario/public_html, etc.)

# 3. Clonar el repositorio
git clone https://github.com/mmerino78/digisoft-website.git

# 4. Cambiar nombre de carpeta si es necesario
mv digisoft-website digisoft
# O simplemente:
mv digisoft-website .

# 5. Verificar permisos
chmod -R 755 digisoft
chmod -R 644 digisoft/*.html
chmod -R 644 digisoft/css/*
chmod -R 644 digisoft/js/*
chmod -R 644 digisoft/images/*
```

### Opción 2: FTP/SFTP

1. Descarga todos los archivos localmente:
   ```bash
   git clone https://github.com/mmerino78/digisoft-website.git
   ```

2. Conecta con FTP a tu servidor

3. Copia la carpeta `digisoft/` a `/public_html` o donde sea tu DocumentRoot

4. Asegúrate que los permisos sean correctos (644 para archivos, 755 para carpetas)

### Opción 3: Descarga ZIP

1. En GitHub: Code → Download ZIP
2. Extrae localmente
3. Copia via FTP a tu servidor

## 🔧 Configuración Apache

Si necesitas un `.htaccess` para configurar el servidor, crea este archivo en la carpeta `digisoft/`:

```apache
# .htaccess
<IfModule mod_rewrite.c>
    RewriteEngine On
    
    # Redirigir a index.html si la carpeta/archivo no existe
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^(.*)$ index.html [QSA,L]
    
    # Forzar HTTPS
    # RewriteCond %{HTTPS} off
    # RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
</IfModule>

# Cache
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType text/javascript "access plus 1 month"
</IfModule>

# Compresión Gzip
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>
```

## 🔍 Verificar Instalación

1. Abre en navegador: `http://tu-dominio.com/digisoft/`
2. Verifica que se vea:
   - ✅ Logo de Digisoft en navbar
   - ✅ Hero section con imagen
   - ✅ 3 Módulos
   - ✅ OCR + IA
   - ✅ Pricing interactivo
   - ✅ FAQ expandible

3. Prueba funcionalidades:
   - Click en "Anual" → precios cambian
   - Click en FAQ → se expande
   - Links internos funcionan

## 🔐 Seguridad

Asegúrate de:
- ✅ Permisos correctos (644 para archivos, 755 para carpetas)
- ✅ `.htaccess` configurado correctamente
- ✅ HTTPS habilitado en el servidor
- ✅ Caché del navegador configurado

## 📝 Actualizar Contenido

Para hacer cambios:

1. **Localmente:**
   ```bash
   cd digisoft-website
   # Edita los archivos
   git add .
   git commit -m "Actualizar contenido"
   git push origin main
   ```

2. **En el servidor:**
   ```bash
   cd /var/www/html/digisoft
   git pull origin main
   ```

## 🎨 Personalizar

- **Precios:** Edita `index.html` busca `$25`, `$45`, `$60`
- **Colores:** Edita `css/styles.css` líneas 15-17
- **Textos:** Edita directamente en `index.html`
- **Logo:** Reemplaza `images/logo-digisol-full.png`

## 🆘 Troubleshooting

### Problema: Página en blanco
- Checa permisos de carpeta (755)
- Checa que `index.html` exista
- Revisa error log del servidor

### Problema: Imágenes no se ven
- Verifica que la carpeta `images/` esté completa
- Checa rutas relativas en HTML
- Verifica permisos de carpeta (644 para imágenes)

### Problema: Pricing no funciona
- Abre DevTools (F12)
- Checa que `js/main.js` se esté cargando
- Revisa console por errores

### Problema: URLs relativas rotas
- Si está en subcarpeta, edita los `href` en `index.html`
- Ejemplo: `href="css/styles.css"` → `href="digisoft/css/styles.css"`

## 📊 Monitoreo

Comandos útiles en el servidor:

```bash
# Ver último commit
git log --oneline -5

# Ver cambios pendientes
git status

# Ver diferencias
git diff

# Actualizar a la última versión
git pull origin main
```

## 📞 Contacto

- Email: info@digisol.do
- Teléfono: 809 841 2510
- Ubicación: Punta Cana, República Dominicana

## 📄 Licencia

© 2026 Digisoft. Todos los derechos reservados.

---

**Versión:** 1.0
**Última actualización:** 1 Febrero 2026
**Estado:** Listo para producción
