/**
 * Zapia Academy — registros del formulario.
 * Pegar este archivo en Extensiones → Apps Script de la planilla
 * "Zapia Academy: 5 pasos para que tu asistente de IA empiece a trabajar por vos- 28.10".
 * Escribe en la primera hoja. Crea los encabezados si la hoja está vacía.
 */
function doPost(e) {
  try {
    var b = JSON.parse(e.postData.contents || '{}');
    var sh = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    if (sh.getLastRow() === 0) {
      sh.appendRow(['Fecha', 'Nombre', 'Email', 'País', 'Webinar', 'Origen (UTM)', 'Página']);
      sh.getRange(1, 1, 1, 7).setFontWeight('bold');
      sh.setFrozenRows(1);
    }
    sh.appendRow([
      new Date(),
      String(b.name || '').slice(0, 120),
      String(b.email || '').slice(0, 160).toLowerCase(),
      String(b.country || '').slice(0, 60),
      String(b.event || '').slice(0, 60),
      String(b.utm || '').slice(0, 300),
      String(b.page || '').slice(0, 300)
    ]);
    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Abrir la URL /exec en el navegador tiene que mostrar este texto.
function doGet() {
  return ContentService.createTextOutput('Zapia Academy registro: OK');
}

// Opcional: ejecutar una vez desde el editor para probar que escribe en la hoja.
function pruebaManual() {
  doPost({ postData: { contents: JSON.stringify({ name: 'Prueba', email: 'prueba@zapia.com', country: 'Uruguay', event: 'zapia-academy-1', utm: '', page: 'manual' }) } });
}
