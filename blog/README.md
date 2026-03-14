# Blog Digisoft

Blog estático para SEO y visibilidad en buscadores y asistentes IA (ChatGPT, Gemini, etc.).

## Cómo añadir una nueva entrada

1. **Copiar la plantilla**  
   Copia `_plantilla-post.html` y renómbrala con el slug de la entrada, por ejemplo: `mi-nueva-entrada.html`.

2. **Rellenar metadatos y JSON-LD**  
   En el `<head>` del nuevo archivo, sustituye los placeholders:
   - `TITULO_ENTRADA` → título del post (también en `<h1>` y en JSON-LD).
   - `DESCRIPCION_CORTA_1_2_FRASES` → meta description y og:description (y en JSON-LD).
   - `SLUG_ENTRADA` → mismo slug que el nombre del archivo sin `.html` (para canonical y og:url).
   - `FECHA_ISO_PUBLICACION` y `FECHA_ISO_MODIFICACION` → formato `YYYY-MM-DD`.
   - `FECHA_LEGIBLE` → por ejemplo "23 de febrero de 2026".
   - `NOMBRE_AUTOR` → autor visible y en JSON-LD (puede ser "Equipo Digisoft" o un nombre).

3. **Escribir el contenido**  
   Dentro de `<div class="article-content">`, sustituye el contenido de ejemplo por tu texto. Usa un único `<h1>` en el encabezado del artículo; en el cuerpo usa `<h2>`, `<h3>`, `<p>`, `<ul>`, etc. Mantén el primer párrafo como resumen (clase `article-lead` opcional).

4. **Imágenes (portada y miniatura)**  
   Añade en la carpeta `images/blog/` (en la raíz del sitio):
   - **Miniatura (listado):** `slug-entrada-thumb.jpg` — se muestra en la card del blog. Recomendado: 560×315 px o proporción 16:9.
   - **Portada (entrada):** `slug-entrada-cover.jpg` — se muestra arriba del contenido del artículo y en Open Graph. Recomendado: 1200×630 px o similar.
   Si no existe la imagen, la miniatura en el listado usa una imagen de respaldo; la portada en la entrada se oculta automáticamente.

5. **Añadir la entrada al listado**  
   En `blog/index.html`, dentro de `.post-list-grid`, añade una nueva card antes de las existentes (orden: más reciente primero):

   ```html
   <a href="mi-nueva-entrada.html" class="post-card">
       <div class="post-card__thumb">
           <img src="../images/blog/mi-nueva-entrada-thumb.jpg" alt="Descripción breve">
       </div>
       <div class="post-card__body">
           <h2 class="post-card__title">Título de la entrada</h2>
           <p class="post-card__meta">DD de mes de AAAA · Nombre autor</p>
           <p class="post-card__excerpt">Extracto en 1 o 2 frases.</p>
       </div>
   </a>
   ```

6. **Actualizar el sitemap**  
   En la raíz del sitio, edita `sitemap.xml` y añade una entrada `<url>` para la nueva página:

   ```xml
   <url>
     <loc>https://digisoft.do/blog/mi-nueva-entrada/</loc>
     <lastmod>AAAA-MM-DD</lastmod>
     <changefreq>monthly</changefreq>
     <priority>0.8</priority>
   </url>
   ```

## Estructura de archivos

- `index.html` — Listado de entradas (cards con título, extracto, fecha, enlace).
- `_plantilla-post.html` — Plantilla para copiar al crear un nuevo post (no se publica como página).
- `nombre-entrada.html` — Una página HTML por post.

Las URLs canónicas en meta y sitemap usan barra final, por ejemplo: `https://digisoft.do/blog/nombre-entrada/`. Si el servidor sirve `nombre-entrada.html` sin la barra, está bien; lo importante es que el canonical sea consistente.
