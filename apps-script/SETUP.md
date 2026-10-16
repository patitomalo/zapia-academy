# Conectar el formulario a un Google Sheet (10 minutos, sin backend)

1. Creá un Google Sheet nuevo, por ejemplo "Zapia Academy #1 · Registros".
2. En el Sheet: Extensiones → Apps Script. Borrá el contenido y pegá `Code.gs`. Guardá.
3. Implementar → Nueva implementación → tipo "Aplicación web".
   - Ejecutar como: **Yo**.
   - Quién tiene acceso: **Cualquier persona**.
   - Implementar y autorizar con tu cuenta de Google.
4. Copiá la URL que termina en `/exec` y abrila en el navegador: tiene que decir "Zapia Academy registro: OK".
5. En `assets/site.js`, pegá esa URL en `var ENDPOINT = "";`.
6. Probá un registro desde la landing: la fila aparece en la hoja "Registros" en segundos.

Notas
- Si cambiás `Code.gs`, hay que crear una **nueva versión** de la implementación (Implementar → Administrar implementaciones → editar → versión nueva), si no sigue corriendo la vieja.
- Los anotados en Meetup no caen acá solos: exportar desde Meetup y pegarlos en la misma hoja con Origen = "meetup".
- Para avisar por mail y WhatsApp, la hoja es la lista. Si querés, el script puede además mandar un mail de confirmación automático (MailApp); pedilo y lo agrego.
