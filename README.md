# Zapia Academy — sitio de webinars

Sitio estático (HTML, CSS y JS sin dependencias ni build) para los webinars de Zapia Academy. Pensado para vivir en **zapia.com/academy**.

Vista previa: https://patitomalo.github.io/zapia-academy/

## Qué hay

```
index.html                  Portada: hero + tarjeta del webinar #1 + "próximas ediciones"
zapia-academy-1/index.html  Página del webinar #1 (banner, descripción, 5 pasos, speakers, FAQ, registro)
assets/site.css             Estilos. Tokens tomados de zapia.com (negro, Inter, pastillas, radios 12–32)
assets/site.js              Diálogo de registro, validación, envío, cuenta regresiva, link a Google Calendar
assets/zapia-logo.svg       Logo oficial (white.svg del brand kit)
assets/banner-academy-1.jpg Banner del webinar, 2400×1350
assets/guillermina.png      Foto de la presentadora, 600×600 B/N
apps-script/                Receptor de registros para Google Sheets (ver abajo)
```

## Cómo montarlo en zapia.com/academy

- Todos los links y assets son **relativos**, así que la carpeta funciona tal cual bajo cualquier ruta: `/academy/` → portada, `/academy/zapia-academy-1/` → webinar #1.
- En Next.js alcanza con copiar la carpeta a `public/academy/`. Si se prefiere integrarlo como página de Next, el HTML es simple y sin JS de framework; el CSS está en un solo archivo con variables en `:root`.
- Tipografía: carga Inter desde Google Fonts. zapia.com ya sirve Inter Variable; se puede quitar el `<link>` de fonts y dejar que herede.
- El `<nav>` tiene links a zapia.com (casos de uso, planes, "Usar gratis"). Ajustar si el sitio ya tiene header global.
- Metadatos OG listos en cada página (`og:image` apunta al banner).

## Registro (formulario)

El diálogo "Quiero anotarme" pide nombre, correo y país, y hace un `POST` (text/plain, no-cors) a un Web App de Google Apps Script que escribe en una hoja de cálculo.

- La URL del Web App va en `assets/site.js`, constante `ENDPOINT`. **Vacía = modo prueba** (muestra la confirmación pero no envía).
- Script y pasos de despliegue: `apps-script/Code.gs` y `apps-script/SETUP.md`.
- Si se prefiere un backend propio, el payload es JSON: `{event, name, email, country, utm, page, ts}`. Cambiar `ENDPOINT` y, si hace falta, el `fetch` en `site.js`.

## Datos del evento

En `assets/site.js`, objeto `EVENT`: id, título, inicio y fin en UTC (28 oct 2026, 19:00–19:30 UTC-3) y zona horaria. Alimenta la cuenta regresiva y el link de Google Calendar.

## Pendientes

- Pegar la URL del Apps Script en `ENDPOINT`.
- Foto de Martina Gaer (hoy una inicial como placeholder en la página del webinar).
- Confirmar las promesas de las FAQ: grabación para quienes se registran y "no hace falta instalar nada para mirar".
