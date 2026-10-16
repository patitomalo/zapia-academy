# Conectar el formulario a la planilla (una sola vez, 5 minutos)

Planilla: https://docs.google.com/spreadsheets/d/1hww3lQBYxVUk8HKmWFJ_ufmX4stK0kqp-jN4T7ZHVk0/edit

1. Abrí la planilla y andá a **Extensiones → Apps Script**.
2. Borrá lo que haya en el editor y pegá el contenido de `Code.gs`. Guardá (ícono de disquete o Cmd+S).
3. Arriba a la derecha: **Implementar → Nueva implementación**.
   - Tipo (engranaje): **Aplicación web**.
   - Ejecutar como: **Yo**.
   - Quién tiene acceso: **Cualquier persona**.
   - **Implementar**. Google te pide autorizar: elegí tu cuenta, "Avanzado" → "Ir a … (no seguro)" → Permitir. Es tu propio script, no es un tercero.
4. Copiá la **URL de la aplicación web** (termina en `/exec`).
5. Abrila en el navegador: tiene que decir "Zapia Academy registro: OK".
6. Pasale esa URL a Claude (o pegala en `assets/site.js`, constante `ENDPOINT`). Desde ese momento cada registro aparece como una fila nueva, con encabezados creados automáticamente.

Si más adelante cambiás el código, hay que hacer **Implementar → Administrar implementaciones → editar → Versión nueva**; si no, sigue corriendo la versión vieja.
