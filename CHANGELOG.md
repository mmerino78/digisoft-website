## [2026-03-27] — SEO y corrección de estilos en blog

### Bugs resueltos

- **Bug:** Páginas del blog sin estilos CSS en producción
  **Causa:** Las rutas relativas (`../css/`, `../images/`, `../js/`) se rompían porque Vercel sirve los posts con trailing slash (`/blog/slug/`), haciendo que el browser buscara `/blog/css/` en vez de `/css/`.
  **Solución:** Reemplazar todas las rutas relativas por absolutas (`/css/`, `/images/`, `/js/`) en todos los archivos de `blog/`. Aplica también a `src` de imágenes y `href` de links internos a index.html.

- **Bug:** Vercel dejó de hacer deploy automático al hacer `git push`
  **Causa:** El webhook de GitHub se desconectó (posiblemente por reconectar el repo en Settings > Git).
  **Solución:** Ejecutar `npx vercel --prod` desde la carpeta del proyecto. El CLI revincula el proyecto y restaura los deploys automáticos en pushes siguientes.

### Aprendido

- `vercel.json` tiene `"cleanUrls": true` y `"trailingSlash": true` — esto es intencional para las URLs del blog. Las rutas de assets deben ser siempre absolutas en cualquier sub-página.

### Mejoras SEO implementadas

- FAQPage JSON-LD en `index.html` con las 9 preguntas del FAQ
- HowTo JSON-LD en `blog/software-contabilidad-pymes-republica-dominicana.html` con los 6 criterios de selección
- Internal linking cruzado entre los 4 posts principales del blog
- `sitemap.xml`: fechas `lastmod` actualizadas a 2026-03-27
- `sitemap-images.xml`: añadida entrada `/blog/` con las 5 miniaturas de posts
