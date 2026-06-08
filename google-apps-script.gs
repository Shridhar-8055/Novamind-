/**
 * Novamind — Get Started lead capture into Google Sheets.
 *
 * SETUP (one time):
 * 1. Create a Google Sheet (sheets.new). This is where leads will land.
 * 2. In the Sheet: Extensions ▸ Apps Script.
 * 3. Delete any sample code, paste THIS whole file, and Save.
 * 4. Click "Deploy" ▸ "New deployment".
 *      - Type:        Web app
 *      - Description:  Novamind lead capture
 *      - Execute as:   Me
 *      - Who has access: Anyone
 *    Click Deploy, authorize when prompted, and COPY the Web app URL
 *    (it looks like https://script.google.com/macros/s/AKfy....../exec).
 * 5. Paste that URL into js/get-started.js  ->  const SHEET_ENDPOINT = '...';
 * 6. Commit & push. Done — every completed wizard writes a new row.
 *
 * To change the script later you must create a NEW deployment (or "Manage
 * deployments" ▸ edit) — Apps Script caches the old version otherwise.
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(30000); // avoid race conditions on concurrent submits
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Leads') || ss.getActiveSheet();

    var data = {};
    try { data = JSON.parse(e.postData.contents); } catch (err) { data = {}; }

    // Read current header row (row 1)
    var lastCol = sheet.getLastColumn();
    var headers = lastCol > 0
      ? sheet.getRange(1, 1, 1, lastCol).getValues()[0].filter(String)
      : [];

    // Add any new keys as new header columns
    Object.keys(data).forEach(function (key) {
      if (headers.indexOf(key) === -1) headers.push(key);
    });
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');

    // Build the row aligned to headers
    var row = headers.map(function (h) {
      return data[h] !== undefined ? data[h] : '';
    });
    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// Optional: lets you open the /exec URL in a browser to confirm it's live.
function doGet() {
  return ContentService.createTextOutput('Novamind lead capture is running.');
}
