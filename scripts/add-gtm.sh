#!/usr/bin/env bash
# ============================================================
# add-gtm.sh  –  Inyecta Google Tag Manager en todos los .html
# ID del contenedor: GTM-WJ595SLB
# Idempotente: si el archivo ya tiene GTM, lo salta.
# ============================================================

GTM_ID="GTM-WJ595SLB"
SITE_ROOT="$(cd "$(dirname "$0")/.." && pwd)"

GTM_HEAD='<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({"gtm.start":
new Date().getTime(),event:"gtm.js"});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!="dataLayer"?"&l="+l:"";j.async=true;j.src=
"https://www.googletagmanager.com/gtm.js?id="+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,"script","dataLayer","'"$GTM_ID"'");</script>
<!-- End Google Tag Manager -->'

GTM_BODY='<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id='"$GTM_ID"'"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->'

COUNT=0

while IFS= read -r -d '' file; do
  # Saltar si ya tiene GTM
  if grep -q "GTM-WJ595SLB" "$file"; then
    echo "  [SKIP] $file (ya tiene GTM)"
    continue
  fi

  # Insertar el script justo después de <head>
  # Insertar el noscript justo después de <body>
  # Usamos perl para edición in-place multi-línea
  perl -i -0pe \
    's|(<head>)|$1\n'"$(echo "$GTM_HEAD" | sed 's/[\/&]/\\&/g' | tr '\n' '\001')"'|i;
     s|\001|\n|g' \
    "$file"

  perl -i -0pe \
    's|(<body[^>]*>)|$1\n'"$(echo "$GTM_BODY" | sed 's/[\/&]/\\&/g' | tr '\n' '\001')"'|i;
     s|\001|\n|g' \
    "$file"

  echo "  [OK]   $file"
  COUNT=$((COUNT + 1))
done < <(find "$SITE_ROOT" -name "*.html" -not -path "*/node_modules/*" -print0)

echo ""
echo "✅ GTM añadido a $COUNT archivo(s) nuevos."
