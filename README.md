# Upsomedia — Sitio Web Corporativo

Sitio estático moderno construido con **Astro 5** + **Tailwind CSS 3**.  
Páginas: Home, Nosotros, Servicios, Contacto · SEO completo · Formulario vía Web3Forms.

---

## Stack

| Tecnología | Versión | Rol |
|---|---|---|
| [Astro](https://astro.build) | 5.x | Framework SSG |
| [Tailwind CSS](https://tailwindcss.com) | 3.x | Estilos |
| [@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/) | 3.x | sitemap.xml automático |
| [Web3Forms](https://web3forms.com) | — | Formulario de contacto sin backend |

---

## Instalación y desarrollo local

```bash
# 1. Clonar el repositorio
git clone <repo-url>
cd upsomedia-web

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev
# → http://localhost:4321
```

---

## Comandos disponibles

```bash
npm run dev      # Servidor local con hot-reload
npm run build    # Build de producción → dist/
npm run preview  # Previsualizar el build localmente
```

---

## Configuración del formulario de contacto

El formulario usa **[Web3Forms](https://web3forms.com)** (gratuito, sin backend).

1. Ir a [web3forms.com](https://web3forms.com) y crear una cuenta gratis
2. Obtener tu `Access Key` (asociada a tu email)
3. Editar `src/pages/contacto.astro` y reemplazar:
   ```html
   <input type="hidden" name="access_key" value="TU_ACCESS_KEY_AQUI" />
   ```
   con tu clave real.

Los mensajes llegarán directamente a tu email.

---

## SEO

- Títulos y meta descriptions únicos por página via `Layout.astro`
- Open Graph y Twitter Card configurados
- `sitemap.xml` generado automáticamente por `@astrojs/sitemap`
- `robots.txt` en `/public/robots.txt`

Para producción, editar `astro.config.mjs` y verificar que `site` apunte al dominio correcto:

```js
export default defineConfig({
  site: 'https://upsomedia.com',
  // ...
});
```

---

## Deploy

### Opción 1 — Cloudflare Pages (recomendado)

**Desde la dashboard de Cloudflare:**

1. Ir a **Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git**
2. Seleccionar el repositorio
3. Configurar build:
   - **Framework preset:** `Astro`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. Click **Save and Deploy**

Cloudflare detecta Astro automáticamente. Los archivos `_redirects` y `_headers` en `/public` se aplican de forma nativa.

**Desde CLI (Wrangler):**

```bash
npm install -g wrangler
wrangler pages deploy dist --project-name upsomedia-web
```

**Dominio personalizado:** En Cloudflare Pages → Custom domains → agregar `upsomedia.com`.

---

### Opción 2 — DigitalOcean App Platform

1. Crear una nueva **App** en [cloud.digitalocean.com/apps](https://cloud.digitalocean.com/apps)
2. Conectar el repositorio de GitHub/GitLab
3. DigitalOcean detecta el proyecto Astro; verificar la configuración:
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
   - **Environment:** `Node.js`
4. En **Settings → App Spec**, agregar si es necesario:
   ```yaml
   routes:
     - path: /
   ```
5. Click **Deploy**

Para el **dominio personalizado**: App Platform → Settings → Domains → Add domain.

Costo aproximado: plan **Static Site** es gratuito (3 sitios estáticos gratis por cuenta).

---

## Estructura del proyecto

```
web-upsomedia/
├── public/
│   ├── _headers        # Security headers (Cloudflare Pages)
│   ├── _redirects      # Redirect rules (Cloudflare Pages)
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── Header.astro
│   │   └── Footer.astro
│   ├── layouts/
│   │   └── Layout.astro  ← SEO, OG tags, estructura HTML
│   ├── pages/
│   │   ├── index.astro   ← Home
│   │   ├── nosotros.astro
│   │   ├── servicios.astro
│   │   ├── contacto.astro
│   │   └── 404.astro
│   └── styles/
│       └── global.css
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
└── package.json
```

---

## Personalización rápida

| Qué cambiar | Dónde |
|---|---|
| Colores de marca | `tailwind.config.mjs` → `colors.brand` |
| Tipografía | `src/styles/global.css` + `tailwind.config.mjs` |
| Datos de contacto | `src/components/Footer.astro` + `src/pages/contacto.astro` |
| Textos y contenido | Cada página en `src/pages/` |
| Favicon | `public/favicon.svg` |
| OG image | `public/og-image.jpg` (crear imagen 1200×630px) |
| Dominio del sitemap | `astro.config.mjs` → `site` |
