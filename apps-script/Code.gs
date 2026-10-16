/** Zapia Academy — receptor de registros (Google Apps Script, Web App). Hoja "Registros": Fecha | Evento | Nombre | Email | País | UTM | Página | Origen */
var SHEET_NAME = 'Registros';
function doPost(e) {
  try {
    var b = JSON.parse(e.postData.contents || '{}');
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (sh.getLastRow() === 0) sh.appendRow(['Fecha','Evento','Nombre','Email','País','UTM','Página','Origen']);
    sh.appendRow([new Date(), String(b.event||'').slice(0,60), String(b.name||'').slice(0,120), String(b.email||'').slice(0,160).toLowerCase(), String(b.country||'').slice(0,60), String(b.utm||'').slice(0,300), String(b.page||'').slice(0,300), 'web']);
    return ContentService.createTextOutput(JSON.stringify({ok:true})).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ok:false,error:String(err)})).setMimeType(ContentService.MimeType.JSON);
  }
}
function doGet() { return ContentService.createTextOutput('Zapia Academy registro: OK'); }
