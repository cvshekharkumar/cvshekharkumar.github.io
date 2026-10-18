/* Browser-only assessment runtime. It communicates with no server. */
const $ = id => document.getElementById(id);
const uid = () => `Q-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
const safeName = n => String(n || 'assessment').replace(/[^a-z0-9._-]+/gi, '-');
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const state = {
  format: 'sql-assessment-set',
  version: 3,
  setId: `SET-${Date.now().toString(36).toUpperCase()}`,
  title: 'SQL Assessment',
  timerMinutes: 60,
  timerLocked: false,
  timerLockHash: '',
  ownerConfig: {
    email: '',
    submissionMinutes: 10
  },
  packageSecurity: {
    protected: false,
    deleteQuestionsAllowed: true
  },
  questions: [],
  current: 0,
  database: null,
  engineReady: false,
  headerNavLocked: false
};

let remaining = 3600;
let timerHandle = null;
let assessmentStarted = false;
let candidateRunning = false;
let candidateSequentialMode = false;
let packageProtected = false;
let finishRunning = false;
let autoExportStarted = false;
let isClearingData = false;

/* Evidence & Screen Recording variables */
const EXAM_SESSION_KEY = 'sql-assessment-active-session-v18';
const EXAM_EVIDENCE_KEY = 'sql-assessment-evidence-v19';
const HEADER_NAV_PASSWORD = '12345';
let isHeaderNavLocked = false;
let evidenceFrames = [];
let cameraStream = null;
let captureHandle = null;
let candidateMeta = null;
let screenStream = null;
let screenRecorder = null;
let screenChunks = [];
let screenRecordingBlob = null;
let screenRecordingStartedAt = null;

const ADD_QUESTION_GUIDANCE_HTML = `<div class="add-question-notice">please visit <a href="DB/index.html" target="_blank" rel="noopener noreferrer" title="Open DB Question Creator">here</a> for adding questions. Once addition of question over then export in html then come back here and import questions via import html button</div>`;

function starterQuestion(index) {
  const qIndex = index !== undefined ? index : state.questions.length + 1;
  return {
    id: uid(),
    title: `Question ${qIndex}`,
    prompt: ADD_QUESTION_GUIDANCE_HTML,
    questionImage: '',
    schemaImage: '',
    solution: 'SELECT * FROM demo;',
    query: 'SELECT * FROM demo;',
    expected: { columns: ['id', 'name'], rows: [['1', 'Example']] },
    tables: [{ name: 'demo', columns: ['id', 'name'], rows: [['1', 'Example']] }],
    attempts: 0
  };
}

/* --------------------------------------------------------------------------
   UI PANES & SCHEMA VIEWER
   -------------------------------------------------------------------------- */
function showPane(id) {
  document.querySelectorAll('.bottom .pane').forEach(pane => {
    pane.classList.toggle('on', pane.id === id);
    if (pane.id !== id && pane.classList.contains('fullscreen')) {
      setPaneFullscreen(pane.id, false);
    }
  });
  document.querySelectorAll('.tabs [data-pane]').forEach(button => button.classList.toggle('active', button.dataset.pane === id));
}

document.querySelectorAll('.tabs [data-pane]').forEach(button => {
  button.onclick = () => showPane(button.dataset.pane);
});

function setPaneFullscreen(paneId, enabled) {
  const pane = $(paneId);
  if (!pane) return;
  pane.classList.toggle('fullscreen', enabled);
  const prefix = paneId === 'schemaPane' ? 'schema' : (paneId === 'outputPane' ? 'output' : (paneId === 'editorCard' ? 'query' : 'tests'));
  const fsBtn = $(`${prefix}Fullscreen`);
  const exitBtn = $(`${prefix}Exit`);
  if (fsBtn) fsBtn.hidden = enabled;
  if (exitBtn) exitBtn.hidden = !enabled;
}

let schemaZoom = 1.0;
let schemaPanX = 0;
let schemaPanY = 0;
let isDraggingSchema = false;
let dragStartX = 0;
let dragStartY = 0;
let initialPanX = 0;
let initialPanY = 0;

function getImageNaturalSize() {
  const img = $('schemaImage');
  if (!img) return { width: 800, height: 600 };
  const w = img.naturalWidth || 800;
  const h = img.naturalHeight || 600;
  return { width: w, height: h };
}

function applySchemaTransform() {
  const canvas = $('schemaCanvas');
  const img = $('schemaImage');
  const level = $('schemaZoomLevel');
  const { width: nw, height: nh } = getImageNaturalSize();

  const curW = Math.max(10, Math.round(nw * schemaZoom));
  const curH = Math.max(10, Math.round(nh * schemaZoom));

  if (img) {
    img.style.width = `${curW}px`;
    img.style.height = `${curH}px`;
  }
  if (canvas) {
    canvas.style.transform = `translate(${Math.round(schemaPanX)}px, ${Math.round(schemaPanY)}px)`;
  }
  if (level) {
    level.textContent = `${Math.round(schemaZoom * 100)}%`;
  }
}

function fitSchemaView() {
  const sa = $('sa');
  const img = $('schemaImage');
  if (!sa || !img) return;
  const { width: nw, height: nh } = getImageNaturalSize();
  const rect = sa.getBoundingClientRect();
  const pad = 24;
  const availW = Math.max(100, rect.width - pad * 2);
  const availH = Math.max(100, rect.height - pad * 2);

  const fitZoom = Math.min(availW / nw, availH / nh, 1.0);
  schemaZoom = Math.max(0.1, Math.round(fitZoom * 100) / 100) || 1.0;
  schemaPanX = 0;
  schemaPanY = 0;
  applySchemaTransform();
}

function setOriginalSize() {
  schemaZoom = 1.0;
  schemaPanX = 0;
  schemaPanY = 0;
  applySchemaTransform();
}

function resetSchemaView() {
  fitSchemaView();
}

function zoomAtPoint(factor, clientX, clientY) {
  const sa = $('sa');
  if (!sa) return;
  const rect = sa.getBoundingClientRect();
  const viewportCenterX = rect.left + rect.width / 2;
  const viewportCenterY = rect.top + rect.height / 2;

  const cx = clientX - viewportCenterX;
  const cy = clientY - viewportCenterY;

  const oldZoom = schemaZoom;
  const newZoom = Math.min(8.0, Math.max(0.15, schemaZoom * factor));
  if (Math.abs(newZoom - oldZoom) < 0.001) return;

  const origX = (cx - schemaPanX) / oldZoom;
  const origY = (cy - schemaPanY) / oldZoom;

  schemaZoom = newZoom;
  schemaPanX = cx - origX * newZoom;
  schemaPanY = cy - origY * newZoom;

  applySchemaTransform();
}

function zoomSchemaCenter(factor) {
  const sa = $('sa');
  if (!sa) return;
  const rect = sa.getBoundingClientRect();
  zoomAtPoint(factor, rect.left + rect.width / 2, rect.top + rect.height / 2);
}

function initSchemaViewer() {
  const sa = $('sa');
  if (!sa) return;

  sa.addEventListener('pointerdown', event => {
    if (event.button !== 0 && event.pointerType === 'mouse') return;
    isDraggingSchema = true;
    dragStartX = event.clientX;
    dragStartY = event.clientY;
    initialPanX = schemaPanX;
    initialPanY = schemaPanY;
    sa.classList.add('dragging');
    try { sa.setPointerCapture(event.pointerId); } catch (_) {}
  });

  sa.addEventListener('pointermove', event => {
    if (!isDraggingSchema) return;
    schemaPanX = initialPanX + (event.clientX - dragStartX);
    schemaPanY = initialPanY + (event.clientY - dragStartY);
    applySchemaTransform();
  });

  const stopDrag = event => {
    if (!isDraggingSchema) return;
    isDraggingSchema = false;
    sa.classList.remove('dragging');
    try { sa.releasePointerCapture(event.pointerId); } catch (_) {}
  };

  sa.addEventListener('pointerup', stopDrag);
  sa.addEventListener('pointercancel', stopDrag);

  sa.addEventListener('wheel', event => {
    event.preventDefault();
    const factor = event.deltaY < 0 ? 1.15 : (1 / 1.15);
    zoomAtPoint(factor, event.clientX, event.clientY);
  }, { passive: false });

  $('schemaZoomIn')?.addEventListener('click', () => zoomSchemaCenter(1.2));
  $('schemaZoomOut')?.addEventListener('click', () => zoomSchemaCenter(1 / 1.2));
  $('schemaZoom1to1')?.addEventListener('click', () => setOriginalSize());
  $('schemaZoomFit')?.addEventListener('click', () => fitSchemaView());
  $('schemaZoomReset')?.addEventListener('click', () => resetSchemaView());

  $('schemaImage')?.addEventListener('load', () => fitSchemaView());

  window.addEventListener('keydown', event => {
    if ($('schemaPane')?.classList.contains('fullscreen')) {
      if (event.key === '0') { event.preventDefault(); resetSchemaView(); }
      else if (event.key === '1') { event.preventDefault(); setOriginalSize(); }
      else if (event.key === 'f' || event.key === 'F') { event.preventDefault(); fitSchemaView(); }
      else if (event.key === '+' || event.key === '=') { event.preventDefault(); zoomSchemaCenter(1.2); }
      else if (event.key === '-' || event.key === '_') { event.preventDefault(); zoomSchemaCenter(1 / 1.2); }
    }
  });

  window.addEventListener('resize', () => {
    if ($('schemaPane')?.classList.contains('on')) {
      applySchemaTransform();
    }
  });
}

function setWorkflowFullscreen(enabled) {
  setPaneFullscreen('schemaPane', enabled);
  if (enabled) showPane('schemaPane');
  setTimeout(fitSchemaView, 60);
}
function setOutputFullscreen(enabled) {
  setPaneFullscreen('outputPane', enabled);
  if (enabled) showPane('outputPane');
}
function setTestsFullscreen(enabled) {
  setPaneFullscreen('testsPane', enabled);
  if (enabled) showPane('testsPane');
}
function setQueryFullscreen(enabled) {
  const card = $('editorCard');
  if (!card) return;
  card.classList.toggle('fullscreen', enabled);
  document.body.classList.toggle('code-fullscreen-active', enabled);
  const fsBtn = $('queryFullscreen');
  const exitBtn = $('queryExit');
  if (fsBtn) fsBtn.hidden = enabled;
  if (exitBtn) exitBtn.hidden = !enabled;
}

$('schemaFullscreen')?.addEventListener('click', () => setWorkflowFullscreen(true));
$('schemaExit')?.addEventListener('click', () => setWorkflowFullscreen(false));
$('outputFullscreen')?.addEventListener('click', () => setOutputFullscreen(true));
$('outputExit')?.addEventListener('click', () => setOutputFullscreen(false));
$('testsFullscreen')?.addEventListener('click', () => setTestsFullscreen(true));
$('testsExit')?.addEventListener('click', () => setTestsFullscreen(false));
$('queryFullscreen')?.addEventListener('click', () => setQueryFullscreen(true));
$('queryExit')?.addEventListener('click', () => setQueryFullscreen(false));

function isAppFullscreen() {
  return Boolean(
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement ||
    document.body.classList.contains('in-app-fullscreen') ||
    document.body.classList.contains('css-fullscreen')
  );
}

function updateAppFullscreenUI() {
  const active = isAppFullscreen();
  const fsBtn = $('appFullscreen');
  const exitBtn = $('appExitFullscreen');
  if (fsBtn) fsBtn.hidden = active;
  if (exitBtn) exitBtn.hidden = !active;
  document.body.classList.toggle('in-app-fullscreen', active);
}

async function setAppFullscreen(enable) {
  try {
    if (enable) {
      if (!isAppFullscreen()) {
        const el = document.documentElement;
        if (el.requestFullscreen) await el.requestFullscreen();
        else if (el.webkitRequestFullscreen) await el.webkitRequestFullscreen();
        else if (el.mozRequestFullScreen) await el.mozRequestFullScreen();
        else if (el.msRequestFullscreen) await el.msRequestFullscreen();
        else document.body.classList.add('css-fullscreen');
      }
    } else {
      if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {
        if (document.exitFullscreen) await document.exitFullscreen();
        else if (document.webkitExitFullscreen) await document.webkitExitFullscreen();
        else if (document.mozCancelFullScreen) await document.mozCancelFullScreen();
        else if (document.msExitFullscreen) await document.msExitFullscreen();
      }
      document.body.classList.remove('css-fullscreen');
      document.body.classList.remove('in-app-fullscreen');
    }
  } catch (_) {
    if (enable) document.body.classList.add('css-fullscreen');
    else document.body.classList.remove('css-fullscreen');
  } finally {
    updateAppFullscreenUI();
  }
}

function onFullscreenChange() {
  updateAppFullscreenUI();
  if (!isAppFullscreen()) {
    document.body.classList.remove('css-fullscreen');
    document.body.classList.remove('in-app-fullscreen');
  }
}

document.addEventListener('fullscreenchange', onFullscreenChange);
document.addEventListener('webkitfullscreenchange', onFullscreenChange);
document.addEventListener('mozfullscreenchange', onFullscreenChange);
document.addEventListener('MSFullscreenChange', onFullscreenChange);

$('appFullscreen')?.addEventListener('click', () => setAppFullscreen(true));
$('appExitFullscreen')?.addEventListener('click', () => setAppFullscreen(false));

window.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    if ($('schemaPane')?.classList.contains('fullscreen')) { setWorkflowFullscreen(false); return; }
    if ($('outputPane')?.classList.contains('fullscreen')) { setOutputFullscreen(false); return; }
    if ($('testsPane')?.classList.contains('fullscreen')) { setTestsFullscreen(false); return; }
    if ($('editorCard')?.classList.contains('fullscreen')) { setQueryFullscreen(false); return; }
    if (isAppFullscreen()) { setAppFullscreen(false); return; }
  }
});

/* --------------------------------------------------------------------------
   UTILITY & COMPARISON HELPERS
   -------------------------------------------------------------------------- */
function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function toast(message) {
  const el = $('toast');
  if (!el) return;
  el.textContent = message;
  el.classList.add('on', 'show');
  clearTimeout(el.timer);
  el.timer = setTimeout(() => el.classList.remove('on', 'show'), 2600);
}

function download(blob, name) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = name;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(a.href), 2500);
}

async function pinHash(value) {
  const bytes = new TextEncoder().encode(String(value));
  const hash = await crypto.subtle.digest('SHA-256', bytes);
  return [...new Uint8Array(hash)].map(b => b.toString(16).padStart(2, '0')).join('');
}

async function hashPack(p, s) {
  return pinHash((s || '') + '|' + p);
}

function resultTable(columns, rows) {
  return `<table><thead><tr>${columns.map(column => `<th>${escapeHtml(column)}</th>`).join('')}</tr></thead><tbody>${rows.map(row => `<tr>${row.map(value => `<td>${escapeHtml(value)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
}

function cleanQuery(sql) {
  return sql.replace(/--.*$/gm, '')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .trim()
    .replace(/;+\s*$/, '');
}

function orderByClause(sql) {
  const match = cleanQuery(sql).match(/\border\s+by\b([\s\S]+)$/i);
  return match ? match[1].trim() : '';
}

function comparableCell(value) {
  if (value === null || value === undefined) return '';
  const text = String(value).trim();
  const num = Number(text);
  if (!Number.isNaN(num) && text !== '') return num;
  return text.toLowerCase();
}

function cellsMatch(actual, expected) {
  const a = comparableCell(actual);
  const b = comparableCell(expected);
  if (typeof a === 'number' && typeof b === 'number') {
    return Math.abs(a - b) < 0.0000001;
  }
  const dateMatch = dateNumber(actual) && dateNumber(expected) && dateNumber(actual) === dateNumber(expected);
  return a === b || Boolean(dateMatch);
}

function rowsMatchInOrder(actual, expected) {
  if (actual.length !== expected.length) return false;
  return actual.every((row, rowIndex) => {
    const expectedRow = expected[rowIndex];
    return row.length === expectedRow.length && row.every((value, colIndex) => cellsMatch(value, expectedRow[colIndex]));
  });
}

function firstRowDifference(actual, expected) {
  for (let rowIndex = 0; rowIndex < actual.length && rowIndex < expected.length; rowIndex++) {
    const actualRow = actual[rowIndex];
    const expectedRow = expected[rowIndex];
    for (let colIndex = 0; colIndex < actualRow.length; colIndex++) {
      if (!cellsMatch(actualRow[colIndex], expectedRow[colIndex])) {
        return `row ${rowIndex + 1}, column ${colIndex + 1}: expected "${expectedRow[colIndex]}", got "${actualRow[colIndex]}"`;
      }
    }
  }
  return '';
}

function rowEquals(rowA, rowB) {
  if (rowA.length !== rowB.length) return false;
  return rowA.every((value, index) => cellsMatch(value, rowB[index]));
}

function multisetMatch(rowsA, rowsB) {
  if (rowsA.length !== rowsB.length) return false;
  const unmatched = [...rowsB];
  for (const rowA of rowsA) {
    const matchIndex = unmatched.findIndex(candidate => rowEquals(rowA, candidate));
    if (matchIndex === -1) return false;
    unmatched.splice(matchIndex, 1);
  }
  return true;
}

function parseOrderIndices(sql, columns) {
  const clause = orderByClause(sql);
  if (!clause) return [];
  const lowerCols = columns.map(c => c.toLowerCase());
  const indices = [];
  const parts = clause.split(',').map(p => p.trim());
  for (const part of parts) {
    const m = part.match(/^(?:(?:[a-zA-Z_]\w*\.)?([a-zA-Z_]\w*)|\b(\d+)\b)/);
    if (!m) continue;
    let colIdx = -1;
    if (m[2]) {
      const pos = parseInt(m[2], 10) - 1;
      if (pos >= 0 && pos < columns.length) colIdx = pos;
    } else if (m[1]) {
      const name = m[1].toLowerCase();
      colIdx = lowerCols.indexOf(name);
    }
    if (colIdx >= 0 && !indices.includes(colIdx)) {
      indices.push(colIdx);
    }
  }
  return indices;
}

function sortedColumnsInExpected(rows, numCols) {
  if (!rows || rows.length < 2) return [];
  const candidateIndices = [];
  for (let c = 0; c < numCols; c++) {
    let nonDecreasing = true;
    let nonIncreasing = true;
    for (let r = 1; r < rows.length; r++) {
      const prev = comparableCell(rows[r - 1][c]);
      const curr = comparableCell(rows[r][c]);
      if (typeof prev === 'number' && typeof curr === 'number') {
        if (curr < prev) nonDecreasing = false;
        if (curr > prev) nonIncreasing = false;
      } else {
        const sPrev = String(prev);
        const sCurr = String(curr);
        if (sCurr < sPrev) nonDecreasing = false;
        if (sCurr > sPrev) nonIncreasing = false;
      }
      if (!nonDecreasing && !nonIncreasing) break;
    }
    if (nonDecreasing || nonIncreasing) candidateIndices.push(c);
  }
  return candidateIndices;
}

function groupRowsByOrderKey(rows, orderColIndices) {
  const groups = [];
  let currentGroup = [];
  let currentKey = null;
  for (const row of rows) {
    const key = orderColIndices.map(i => String(comparableCell(row[i]))).join('|||');
    if (currentKey === null || key === currentKey) {
      currentGroup.push(row);
      currentKey = key;
    } else {
      groups.push(currentGroup);
      currentGroup = [row];
      currentKey = key;
    }
  }
  if (currentGroup.length) groups.push(currentGroup);
  return groups;
}

function rowsMatchWithTies(actual, expected, orderColIndices) {
  if (actual.length !== expected.length) return false;
  if (!orderColIndices.length) return multisetMatch(actual, expected);
  const actualGroups = groupRowsByOrderKey(actual, orderColIndices);
  const expectedGroups = groupRowsByOrderKey(expected, orderColIndices);
  if (actualGroups.length !== expectedGroups.length) return false;
  for (let i = 0; i < actualGroups.length; i++) {
    if (!multisetMatch(actualGroups[i], expectedGroups[i])) return false;
  }
  return true;
}

function dateParts(value) {
  const match = String(value || '').trim().match(/^(\d{1,4})[./-](\d{1,2})[./-](\d{1,4})$/);
  return match ? [Number(match[1]), Number(match[2]), Number(match[3])] : null;
}

function dateNumber(value) {
  const parts = dateParts(value);
  if (!parts) return null;
  const [a, b, c] = parts;
  if (a > 31) return a * 10000 + b * 100 + c;
  return c * 10000 + b * 100 + a;
}

/* --------------------------------------------------------------------------
   TIME & IST HELPERS
   -------------------------------------------------------------------------- */
function formatIstDateTime(d) {
  if (!d) return '';
  const date = typeof d === 'string' || typeof d === 'number' ? new Date(d) : d;
  if (isNaN(date.getTime())) return String(d);
  return date.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', hour12: true }) + ' IST';
}
function formatIstDate(d) {
  if (!d) return '';
  const date = typeof d === 'string' || typeof d === 'number' ? new Date(d) : d;
  if (isNaN(date.getTime())) return String(d);
  return date.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' });
}
function formatIstTime(d) {
  if (!d) return '';
  const date = typeof d === 'string' || typeof d === 'number' ? new Date(d) : d;
  if (isNaN(date.getTime())) return String(d);
  return date.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: false });
}
function examNowParts() {
  const d = new Date();
  const dateStr = d.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' });
  const parts = new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(d);
  const hour = parts.find(p => p.type === 'hour')?.value || String(d.getHours()).padStart(2, '0');
  const minute = parts.find(p => p.type === 'minute')?.value || String(d.getMinutes()).padStart(2, '0');
  return { iso: d.toISOString(), date: dateStr, hour, minute, local: formatIstDateTime(d), ist: formatIstDateTime(d) };
}

/* --------------------------------------------------------------------------
   STORAGE & SESSION PERSISTENCE
   -------------------------------------------------------------------------- */
function openDB() {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      resolve(null);
      return;
    }
    const request = indexedDB.open('sql_studio_db', 1);
    request.onupgradeneeded = event => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('sessions')) {
        db.createObjectStore('sessions', { keyPath: 'id' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => resolve(null);
  });
}

async function saveSessionToStorage(data) {
  try {
    const db = await openDB();
    if (!db) {
      localStorage.setItem('sql_studio_fallback_session', JSON.stringify(data));
      return;
    }
    const tx = db.transaction('sessions', 'readwrite');
    const store = tx.objectStore('sessions');
    store.put({ id: 'current_session', ...data });
    await new Promise((resolve, reject) => {
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch (err) {
    console.warn('Failed to save session to IndexedDB:', err);
  }
}

async function loadSessionFromStorage() {
  try {
    const db = await openDB();
    if (!db) {
      const fallback = localStorage.getItem('sql_studio_fallback_session');
      return fallback ? JSON.parse(fallback) : null;
    }
    const tx = db.transaction('sessions', 'readonly');
    const store = tx.objectStore('sessions');
    const request = store.get('current_session');
    return await new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => resolve(null);
    });
  } catch (err) {
    console.warn('Failed to load session from IndexedDB:', err);
    return null;
  }
}

async function clearSessionFromStorage() {
  try {
    const db = await openDB();
    if (db) {
      const tx = db.transaction('sessions', 'readwrite');
      tx.objectStore('sessions').delete('current_session');
    }
    localStorage.removeItem('sql_studio_fallback_session');
  } catch (err) {
    console.warn('Failed to clear session from IndexedDB:', err);
  }
}

let persistTimer = null;
function persistSession(immediate = false) {
  if (isClearingData) return;
  const payload = {
    version: 3,
    savedAt: new Date().toISOString(),
    setId: state.setId,
    title: state.title,
    timerMinutes: state.timerMinutes,
    timerLocked: state.timerLocked,
    timerLockHash: state.timerLockHash,
    ownerConfig: state.ownerConfig,
    current: state.current,
    questions: state.questions
  };
  if (immediate) {
    clearTimeout(persistTimer);
    saveSessionToStorage(payload);
  } else {
    clearTimeout(persistTimer);
    persistTimer = setTimeout(() => saveSessionToStorage(payload), 300);
  }
}

function clearExamCookies() {
  document.cookie.split(';').forEach(c => {
    const eqPos = c.indexOf('=');
    const name = eqPos > -1 ? c.substring(0, eqPos).trim() : c.trim();
    if (name) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${location.pathname || '/'}; SameSite=Lax`;
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; domain=${location.hostname}; path=/; SameSite=Lax`;
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
    }
  });
}
function readExamSession() {
  try { return JSON.parse(localStorage.getItem(EXAM_SESSION_KEY) || 'null'); } catch (e) { return null; }
}
function writeExamSession(extra = {}) {
  const previous = readExamSession() || {};
  const session = {
    ...previous,
    ...extra,
    setId: state.setId,
    active: true,
    packageProtected: !!packageProtected,
    candidateSequentialMode: true,
    headerNavLocked: !!isHeaderNavLocked,
    importedFromZip: Boolean(state.importedFromZip || previous.importedFromZip),
    updatedAt: Date.now()
  };
  localStorage.setItem(EXAM_SESSION_KEY, JSON.stringify(session));
  return session;
}
function clearExamSession() {
  clearInterval(timerHandle);
  localStorage.removeItem(EXAM_SESSION_KEY);
  localStorage.removeItem(EXAM_EVIDENCE_KEY);
  localStorage.removeItem('sql_header_nav_locked');
  setHeaderNavLocked(false);
  clearExamCookies();
  candidateRunning = false;
  packageProtected = false;
  assessmentStarted = false;
  autoExportStarted = false;
}

function formatQuestionTitle(title, index) {
  let clean = String(title || '').trim().replace(/^imported\s*[:\-–—]?\s*/i, '');
  clean = clean.replace(/^(question\s*\d+\s*[:\-–—]?\s*)+/i, '').trim();
  return clean ? `Question ${index + 1}: ${clean}` : `Question ${index + 1}`;
}

async function restoreSavedSession() {
  try {
    const saved = await loadSessionFromStorage();
    if (saved && Array.isArray(saved.questions) && saved.questions.length > 0) {
      state.setId = saved.setId || state.setId;
      state.title = saved.title || state.title;
      state.timerMinutes = Number(saved.timerMinutes) || 60;
      state.timerLocked = !!saved.timerLocked;
      state.timerLockHash = saved.timerLockHash || '';
      state.ownerConfig = saved.ownerConfig || state.ownerConfig;
      state.questions = saved.questions.map((q, idx) => ({
        ...q,
        id: q.id || uid(),
        title: formatQuestionTitle(q.title, idx)
      }));
      state.current = Math.min(Math.max(0, saved.current || 0), state.questions.length - 1);
      $('setIdText').textContent = state.setId;
      $('timerMinutes').value = state.timerMinutes;
      loadCurrentQuestionDatabase();
      render();
      updateTimerLockUI();
      updateQuestionCountV19();
      persistSession(true);
    }
  } catch (err) {
    console.warn('Could not restore session:', err);
  }
}

async function initializeEngine() {
  try {
    if (!window.initSqlJs) throw Error('sql.js could not be downloaded. Check the internet connection and reload.');
    const SQL = await window.initSqlJs({ locateFile: file => `https://sql.js.org/dist/${file}` });
    state.SQL = SQL;
    state.engineReady = true;
    $('importHtml').disabled = false;
    if ($('importJson')) $('importJson').disabled = false;
    if ($('importSet')) $('importSet').disabled = false;
    if ($('addQuestion')) $('addQuestion').disabled = false;
    $('engineStatus').textContent = 'Local SQLite ready';
    $('engineStatus').className = 'status ready';
    await restoreSavedSession();
    restoreActiveExamV18();
    if (state.questions && state.questions.length > 0 && !state.database) {
      try {
        loadCurrentQuestionDatabase();
        render();
      } catch (e) {
        console.warn('Failed to load database on engine ready:', e);
      }
    }
  } catch (error) {
    $('engineStatus').textContent = 'Local SQLite unavailable';
    $('engineStatus').className = 'status error';
    toast(error.message);
  }
}

function showEmpty(message) {
  setQueryFullscreen(false);
  $('workspace').hidden = true;
  $('empty').hidden = false;
  $('empty').textContent = message;
  $('questionCount').textContent = 'No questions loaded';
  $('deleteQuestion').disabled = true;
  if ($('exportJson')) $('exportJson').disabled = true;
  if ($('exportSet')) $('exportSet').disabled = true;
  if ($('exportHtml')) $('exportHtml').disabled = true;
  if ($('exportPdf')) $('exportPdf').disabled = true;
  if ($('exportWord')) $('exportWord').disabled = true;
  $('questionTitle').disabled = true;
  const pickerText = $('questionPickerText');
  if (pickerText) pickerText.textContent = 'No question loaded';
  else $('questionTitle').textContent = 'No question loaded';
  $('previous').disabled = true;
  $('next').disabled = true;
  const palette = $('questionNumbers');
  if (palette) palette.innerHTML = '';
  $('questionPalette')?.classList.remove('show');
  updateQuestionCountV19();
}

/* --------------------------------------------------------------------------
   SQLITE DATABASE & QUERY RUNTIME
   -------------------------------------------------------------------------- */
function registerFunctions(db) {
  db.create_function('regexp', (pattern, text) => {
    if (pattern === null || text === null) return 0;
    return new RegExp(String(pattern), 'i').test(String(text)) ? 1 : 0;
  });
  db.create_function('date', (val, modifier) => {
    if (!val) return null;
    let d = new Date(val);
    if (isNaN(d.getTime())) return null;
    if (modifier && typeof modifier === 'string') {
      const match = modifier.match(/([+-]?\d+)\s*(day|month|year)s?/i);
      if (match) {
        const amt = parseInt(match[1], 10);
        const unit = match[2].toLowerCase();
        if (unit === 'day') d.setDate(d.getDate() + amt);
        else if (unit === 'month') d.setMonth(d.getMonth() + amt);
        else if (unit === 'year') d.setFullYear(d.getFullYear() + amt);
      }
    }
    return d.toISOString().split('T')[0];
  });
  db.create_function('datetime', (val, modifier) => {
    if (!val) return null;
    let d = new Date(val);
    if (isNaN(d.getTime())) return null;
    if (modifier && typeof modifier === 'string') {
      const match = modifier.match(/([+-]?\d+)\s*(day|hour|minute|month|year)s?/i);
      if (match) {
        const amt = parseInt(match[1], 10);
        const unit = match[2].toLowerCase();
        if (unit === 'day') d.setDate(d.getDate() + amt);
        else if (unit === 'hour') d.setHours(d.getHours() + amt);
        else if (unit === 'minute') d.setMinutes(d.getMinutes() + amt);
        else if (unit === 'month') d.setMonth(d.getMonth() + amt);
        else if (unit === 'year') d.setFullYear(d.getFullYear() + amt);
      }
    }
    return d.toISOString().replace('T', ' ').substring(0, 19);
  });
  db.create_function('strftime', (fmt, val) => {
    if (!val) return null;
    let d = new Date(val);
    if (isNaN(d.getTime())) return null;
    const Y = String(d.getFullYear());
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const dStr = String(d.getDate()).padStart(2, '0');
    const H = String(d.getHours()).padStart(2, '0');
    const M = String(d.getMinutes()).padStart(2, '0');
    const S = String(d.getSeconds()).padStart(2, '0');
    return String(fmt || '')
      .replace('%Y', Y)
      .replace('%m', m)
      .replace('%d', dStr)
      .replace('%H', H)
      .replace('%M', M)
      .replace('%S', S);
  });
  db.create_function('day', val => {
    if (!val) return null;
    const d = new Date(val);
    return isNaN(d.getTime()) ? null : d.getDate();
  });
  db.create_function('month', val => {
    if (!val) return null;
    const d = new Date(val);
    return isNaN(d.getTime()) ? null : d.getMonth() + 1;
  });
  db.create_function('year', val => {
    if (!val) return null;
    const d = new Date(val);
    return isNaN(d.getTime()) ? null : d.getFullYear();
  });
  db.create_function('coalesce', (...args) => {
    for (const arg of args) {
      if (arg !== null && arg !== undefined) return arg;
    }
    return null;
  });
  db.create_function('ifnull', (a, b) => (a !== null && a !== undefined ? a : b));
  db.create_function('concat', (...args) => args.map(a => (a === null || a === undefined ? '' : String(a))).join(''));
  db.create_function('nvl', (a, b) => (a !== null && a !== undefined ? a : b));
}

function quotedIdentifier(value) {
  return `"${String(value).replace(/"/g, '""')}"`;
}

function sourceTableNameFromSql(sql) {
  try {
    const q = cleanQuery(sql).trim();
    const match = q.match(/^select\s+\*\s+from\s+(?:only\s+)?["`']?([a-zA-Z0-9_]+)["`']?/i);
    return match ? match[1] : null;
  } catch (_) {
    return null;
  }
}

function inferColumnType(values) {
  const present = values.filter(value => value !== '' && value !== null && value !== undefined);
  if (!present.length) return 'TEXT';
  if (present.every(value => /^-?\d+$/.test(value))) return 'INTEGER';
  if (present.every(value => /^-?\d+(?:\.\d+)?$/.test(value))) return 'REAL';
  return 'TEXT';
}

function valueForType(value, type) {
  if (value === '' || value === null || value === undefined) return null;
  if (type === 'INTEGER') return parseInt(value, 10);
  if (type === 'REAL') return parseFloat(value);
  return value;
}

function tableFromOption(item) {
  const query = item.querySelector('.sql-query-box pre, pre')?.textContent.trim() || '';
  let name = sourceTableNameFromSql(query);
  if (!name) {
    const label = item.querySelector('.option-label')?.textContent.trim() || '';
    const labelMatch = label.match(/^table[-\s]?\d*\s*[:\-–—(]?\s*([a-zA-Z0-9_]+)/i);
    if (labelMatch) name = labelMatch[1];
  }
  const table = [...item.querySelectorAll('table')].find(candidate => candidate.rows.length > 0);
  if (!name || !table) return null;
  const columns = [...table.rows[0].cells].map(cell => cell.textContent.trim()).filter(Boolean);
  const rows = [...table.rows].slice(1).map(row => [...row.cells].map(cell => cell.textContent.trim()));
  if (!columns.length || rows.some(row => row.length !== columns.length)) return null;
  return { name, columns, rows };
}

function databaseTables(questionCard) {
  const tables = new Map();
  for (const item of questionCard.querySelectorAll('.option-item')) {
    const table = tableFromOption(item);
    if (!table) continue;
    const current = tables.get(table.name.toLowerCase());
    if (!current || table.rows.length > current.rows.length) tables.set(table.name.toLowerCase(), table);
  }
  return [...tables.values()];
}

function createDatabase(tables) {
  if (!state.engineReady) throw Error('Local SQLite is still loading. Please wait a moment and import again.');
  state.database?.close();
  const db = new state.SQL.Database();
  registerFunctions(db);
  for (const table of tables) {
    const types = table.columns.map((_, index) => inferColumnType(table.rows.map(row => row[index])));
    db.run(`CREATE TABLE ${quotedIdentifier(table.name)} (${table.columns.map((column, index) => `${quotedIdentifier(column)} ${types[index]}`).join(', ')})`);
    if (table.rows.length) {
      const statement = db.prepare(`INSERT INTO ${quotedIdentifier(table.name)} VALUES (${table.columns.map(() => '?').join(', ')})`);
      for (const row of table.rows) statement.run(row.map((value, index) => valueForType(value, types[index])));
      statement.free();
    }
  }
  state.database = db;
}

function resultTableData(table) {
  if (!table || !table.rows.length) return null;
  const columns = [...table.rows[0].cells].map(cell => cell.textContent.trim()).filter(Boolean);
  const rows = [...table.rows].slice(1).map(row => [...row.cells].map(cell => cell.textContent.trim()));
  return columns.length && rows.every(row => row.length === columns.length) ? { columns, rows } : null;
}

function solutionFromCard(card, secondImage) {
  const optionItems = [...card.querySelectorAll('.option-item')];
  const follows = (reference, node) => Boolean(reference.compareDocumentPosition(node) & Node.DOCUMENT_POSITION_FOLLOWING);
  const isSourceBlock = node => /^table[-\s]?\d+$/i.test(node.closest('.option-item')?.querySelector('.option-label')?.textContent.trim() || '');
  const firstNonSourceTableAfter = reference => [...card.querySelectorAll('table')]
    .find(node => follows(reference, node) && !isSourceBlock(node) && node.rows.length > 0);
  const solutionItem = optionItems.find(item => /^(solution|answer|expected\s*(output|result)?)$/i.test(item.querySelector('.option-label')?.textContent.trim() || ''));
  if (solutionItem) {
    const solutionTable = [...solutionItem.querySelectorAll('table')].find(table => table.rows.length > 0);
    return {
      sql: solutionItem.querySelector('.sql-query-box pre, pre')?.textContent.trim() || '',
      expected: resultTableData(solutionTable || firstNonSourceTableAfter(solutionItem))
    };
  }
  const queryNode = [...card.querySelectorAll('pre, div[style*="white-space: pre"]')].find(node => (secondImage ? follows(secondImage, node) : true) && !isSourceBlock(node));
  const outputTable = secondImage ? firstNonSourceTableAfter(secondImage) : [...card.querySelectorAll('table')].find(node => !isSourceBlock(node) && node.rows.length > 0);
  return { sql: queryNode?.textContent.trim() || '', expected: resultTableData(outputTable) };
}

function parseReport(html) {
  const documentFromReport = new DOMParser().parseFromString(html, 'text/html');
  const cards = [...documentFromReport.querySelectorAll('article.question-card')];
  if (!cards.length) throw Error('The selected file has no .question-card items and is not a supported report.');
  const questions = cards.map((card, index) => {
    const body = card.querySelector('.question-body') || card;
    const images = [...body.querySelectorAll('img')].filter(image => image.getAttribute('src'));
    const solution = images[1] ? solutionFromCard(card, images[1]) : solutionFromCard(card, images[0] || card);
    const tables = databaseTables(card);

    let candidateQuery = '';
    for (const item of card.querySelectorAll('.option-item')) {
      const label = item.querySelector('.option-label, .sql-box-label')?.textContent.trim() || '';
      if (/candidate/i.test(label)) {
        candidateQuery = item.querySelector('pre')?.textContent.trim() || '';
        break;
      }
    }

    const initialQuery = candidateQuery || solution.sql || '';
    return {
      id: card.id || uid(),
      title: formatQuestionTitle(card.querySelector('h1,h2,h3')?.textContent, index),
      prompt: card.querySelector('.problem-text')?.textContent.trim() || '',
      questionImage: images[0]?.getAttribute('src') || '',
      schemaImage: images[1]?.getAttribute('src') || '',
      solution: solution.sql || '',
      query: initialQuery,
      expected: solution.expected,
      tables: tables.length ? tables : [{ name: 'demo', columns: ['id', 'name'], rows: [['1', 'Example']] }],
      attempts: 0
    };
  });
  return { questions };
}

function currentQuestion() { return state.questions[state.current]; }

function loadCurrentQuestionDatabase() {
  const question = currentQuestion();
  if (!question) {
    state.database?.close();
    state.database = null;
    return;
  }
  createDatabase(question.tables);
}

function saveCurrentQuery() {
  if (state.questions.length && currentQuestion()) {
    currentQuestion().query = $('query').value;
  }
}

function switchToQuestion(index) {
  if (index < 0 || index >= state.questions.length) return;
  if (candidateSequentialMode && index < state.current) {
    toast('Previous questions cannot be reopened in candidate mode');
    return;
  }
  saveCurrentQuery();
  state.current = index;
  try {
    loadCurrentQuestionDatabase();
    render();
  } catch (error) {
    toast(error.message);
  }
  persistSession(true);
  const s = readExamSession();
  if (s?.started) writeExamSession({ currentQuestion: state.current });
}

function updateQuestionCountV19() {
  const total = state?.questions?.length || 0;
  const curr = total > 0 ? (state.current + 1) : 0;
  document.body.classList.toggle('has-questions', total > 0);
  const el = $('candidateQuestionCount');
  if (el) el.textContent = `Current/Total question : ${curr}/${total}`;
  const qCount = $('questionCount');
  if (qCount) qCount.textContent = total ? `Question ${curr} of ${total}` : 'No questions loaded';
  const mobCount = $('mobileQuestionCount');
  if (mobCount) mobCount.textContent = `${curr}/${total}`;
  const mobBtn = $('mobileNextBtn');
  if (mobBtn) {
    const isLastCandidate = candidateSequentialMode && curr >= total && total > 0;
    const isLastReview = !candidateSequentialMode && curr >= total && total > 0;
    const mobLabel = mobBtn.querySelector('.mobile-next-label');
    const mobArrow = mobBtn.querySelector('.mobile-next-arrow');
    if (candidateSequentialMode) {
      if (mobLabel) mobLabel.textContent = isLastCandidate ? 'Finish' : 'Next';
      if (mobArrow) mobArrow.textContent = isLastCandidate ? '✓' : '›';
      mobBtn.classList.toggle('finish-btn', isLastCandidate);
    } else {
      if (mobLabel) mobLabel.textContent = (isLastReview && total > 1) ? 'First Q (1)' : 'Next';
      if (mobArrow) mobArrow.textContent = (isLastReview && total > 1) ? '↺' : '›';
      mobBtn.classList.remove('finish-btn');
    }
  }
  applyCandidateMode();
}

function renderQuestionNumbers() {
  const palette = $('questionNumbers');
  const paletteCount = $('paletteCount');
  if (paletteCount) {
    paletteCount.textContent = `${state.questions.length} question${state.questions.length === 1 ? '' : 's'}`;
  }
  if (palette) {
    palette.innerHTML = '';
    state.questions.forEach((q, index) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = (index === state.current ? 'active' : '');
      if (q.lastTests?.className?.includes('pass')) btn.classList.add('has-passed');
      if (q.lastTests?.className?.includes('fail')) btn.classList.add('has-failed');
      btn.textContent = String(index + 1);
      const titleText = (q.title && q.title.toLowerCase() !== `question ${index + 1}`.toLowerCase())
        ? `Question ${index + 1}: ${q.title}`
        : (q.title || `Question ${index + 1}`);
      btn.title = titleText;
      btn.onclick = () => {
        switchToQuestion(index);
        $('questionPalette')?.classList.remove('show');
      };
      palette.appendChild(btn);
    });
  }
}

function render() {
  const question = currentQuestion();
  if (!question) {
    showEmpty('import html file here exported from the SQL question creator website');
    return;
  }
  resetSchemaView();
  setQueryFullscreen(false);
  setPaneFullscreen('schemaPane', false);
  setPaneFullscreen('outputPane', false);
  setPaneFullscreen('testsPane', false);
  $('workspace').hidden = false;
  $('empty').hidden = true;
  if (typeof restoreResizers === 'function') restoreResizers();

  updateQuestionCountV19();
  const pickerText = $('questionPickerText');
  if (pickerText) pickerText.textContent = question.title;
  else $('questionTitle').textContent = question.title;
  $('questionTitle').disabled = candidateSequentialMode;
  $('questionHeading').textContent = `Question ${state.current + 1}`;

  if (question.prompt && (question.prompt.includes('<') || question.prompt.includes('&'))) {
    $('prompt').innerHTML = question.prompt;
  } else {
    $('prompt').textContent = question.prompt || '';
  }
  $('prompt').hidden = !question.prompt;

  if (question.questionImage) {
    $('questionImage').src = question.questionImage;
    $('questionImage').hidden = false;
  } else {
    $('questionImage').src = '';
    $('questionImage').hidden = true;
  }
  if (question.schemaImage) {
    $('schemaImage').src = question.schemaImage;
    $('schemaImage').hidden = false;
  } else {
    $('schemaImage').src = '';
    $('schemaImage').hidden = true;
  }

  $('query').value = question.query || '';
  updateLineNumbers();
  $('attempts').textContent = `Checks: ${question.attempts || 0}`;
  $('expected').hidden = true;
  $('expected').textContent = '';

  $('previous').disabled = candidateSequentialMode || state.current === 0;
  $('next').disabled = candidateSequentialMode ? false : (state.questions.length <= 1);
  $('deleteQuestion').disabled = candidateRunning;
  $('deleteQuestion').hidden = candidateRunning;
  if ($('exportJson')) $('exportJson').disabled = candidateRunning;
  if ($('exportSet')) $('exportSet').disabled = candidateRunning;
  if ($('exportHtml')) $('exportHtml').disabled = candidateRunning;
  if ($('exportPdf')) $('exportPdf').disabled = candidateRunning;
  if ($('exportWord')) $('exportWord').disabled = candidateRunning;

  renderQuestionNumbers();
  if (question.lastOutput) {
    $('output').className = question.lastOutput.className || 'result';
    $('output').innerHTML = question.lastOutput.html || 'Run a query to preview the result.';
  } else {
    $('output').className = 'result';
    $('output').textContent = 'Run a query to preview the result.';
  }
  if (question.lastTests) {
    $('tests').className = question.lastTests.className || 'result';
    $('tests').innerHTML = question.lastTests.html || '';
  } else {
    $('tests').className = 'result';
    $('tests').textContent = question.expected ? 'Check Query compares the saved solution columns, values, and order.' : 'No saved solution result is available for this question.';
  }
}

function executeCurrentQuery() {
  if (!state.database) throw Error('No report tables are loaded for local SQL execution.');
  const result = state.database.exec(cleanQuery($('query').value));
  if (!result.length) return { columns: [], rows: [] };
  return { columns: result[0].columns, rows: result[0].values };
}

/* --------------------------------------------------------------------------
   EXAM SETUP & PROCTOR CONFIGURATION
   -------------------------------------------------------------------------- */
function ownerConfig() {
  return state.ownerConfig || { email: '', submissionMinutes: 10 };
}
function applyOwnerConfig() {
  const c = ownerConfig();
  $('ownerEmail').value = c.email || '';
  $('submissionMinutes').value = c.submissionMinutes || 10;
}
$('proctorSettings').onclick = () => {
  applyOwnerConfig();
  $('ownerModal').classList.add('show');
};
$('ownerCancel').onclick = () => $('ownerModal').classList.remove('show');
$('ownerSave').onclick = () => {
  const email = $('ownerEmail').value.trim();
  const minutes = Math.max(1, Number($('submissionMinutes').value) || 10);
  if (email && !/^\S+@\S+\.\S+$/.test(email)) return toast('Enter a valid owner email');
  state.ownerConfig = { email, submissionMinutes: minutes };
  persistSession(true);
  $('ownerModal').classList.remove('show');
  toast('Exam owner setup saved');
};

/* --------------------------------------------------------------------------
   TIMER & TEACHER TIMER LOCK
   -------------------------------------------------------------------------- */
function isTimerLocked() {
  return !!state.timerLocked;
}

function updateTimerLockUI() {
  const locked = isTimerLocked();
  document.body.classList.toggle('timer-locked', locked);
  $('timerMinutes').disabled = locked;
  $('setTimer').disabled = locked;
  $('timerLock').textContent = locked ? '🔒 Unlock Timer' : '🔓 Lock Timer';
  $('timerLock').title = locked ? 'Teacher passcode required to edit timer' : 'Lock timer before exporting';
}

function tick() {
  const h = String(Math.floor(remaining / 3600)).padStart(2, '0');
  const m = String(Math.floor((remaining % 3600) / 60)).padStart(2, '0');
  const s = String(Math.max(0, remaining % 60)).padStart(2, '0');
  $('timer').textContent = `${h}:${m}:${s}`;
}

function setTimer(show = true) {
  if (isTimerLocked()) {
    updateTimerLockUI();
    showReadyGate();
    return;
  }
  const minutes = Math.max(1, parseInt($('timerMinutes').value) || 60);
  state.timerMinutes = minutes;
  remaining = minutes * 60;
  clearInterval(timerHandle);
  tick();
  assessmentStarted = true;
  timerHandle = setInterval(() => {
    remaining = Math.max(0, remaining - 1);
    tick();
    if (remaining <= 0) {
      clearInterval(timerHandle);
      finishAssessment('timeout');
    }
  }, 1000);
  persistSession(true);
  if (show) toast('Timer set');
}
$('setTimer').onclick = () => setTimer();

async function lockTimer() {
  if (!state.timerLocked) {
    const minutes = Math.max(1, parseInt($('timerMinutes').value) || 60);
    const first = prompt(`Teacher: lock the assessment timer at ${minutes} minute(s). Create a passcode:`, '');
    if (first === null) return;
    if (first.length < 4) { toast('Use a timer passcode with at least 4 characters'); return; }
    const second = prompt('Confirm the timer passcode:', '');
    if (second !== first) { toast('Passcodes do not match'); return; }
    state.timerMinutes = minutes;
    state.timerLockHash = await pinHash(first);
    state.timerLocked = true;
    assessmentStarted = false;
    clearInterval(timerHandle);
    remaining = minutes * 60;
    tick();
    document.body.classList.add('timer-waiting');
    updateTimerLockUI();
    persistSession(true);
    toast('Timer locked for student sharing');
  } else {
    const entered = prompt('Enter the teacher timer passcode to unlock:', '');
    if (entered === null) return;
    if (await pinHash(entered) !== state.timerLockHash) { toast('Incorrect timer passcode'); return; }
    state.timerLocked = false;
    state.timerLockHash = '';
    assessmentStarted = false;
    document.body.classList.remove('timer-waiting');
    updateTimerLockUI();
    persistSession(true);
    toast('Timer editing enabled');
  }
}
$('timerLock').onclick = lockTimer;

function showReadyGate() {
  try {
    const s = readExamSession();
    if ((s?.active && s?.started) || candidateRunning) return;
  } catch (e) {}
  if (!isTimerLocked() || assessmentStarted) return;
  clearInterval(timerHandle);
  remaining = (Number(state.timerMinutes) || 60) * 60;
  tick();
  document.body.classList.add('timer-waiting');
  $('readyText').textContent = `You have ${state.timerMinutes} minute(s). The timer starts only after you select Yes.`;
  $('readyModal').classList.add('show');
}
$('readyNo').onclick = () => {
  $('readyModal').classList.remove('show');
  toast('Timer has not started');
};
$('readyYes').onclick = () => {
  $('readyModal').classList.remove('show');
  showCandidateGate();
};

/* --------------------------------------------------------------------------
   HEADER NAVIGATION AUTO-LOCK ('12345')
   -------------------------------------------------------------------------- */
function isExamActiveOrLocked() {
  return Boolean(
    isHeaderNavLocked ||
    candidateRunning ||
    assessmentStarted ||
    packageProtected ||
    isTimerLocked() ||
    readExamSession()?.active ||
    document.body.classList.contains('candidate-running') ||
    document.body.classList.contains('header-nav-locked')
  );
}

function setHeaderNavLocked(locked) {
  isHeaderNavLocked = Boolean(locked);
  state.headerNavLocked = isHeaderNavLocked;
  try { localStorage.setItem('sql_header_nav_locked', isHeaderNavLocked ? 'true' : 'false'); } catch (e) {}

  const homeBtn = $('homeBtn');
  const appStoreBtn = $('appStoreBtn');
  const clearBtn = $('clearCookies');

  if (homeBtn) {
    homeBtn.classList.toggle('nav-btn-locked', isHeaderNavLocked);
    homeBtn.innerHTML = isHeaderNavLocked ? '🔒 Home' : 'Home';
    homeBtn.title = isHeaderNavLocked ? 'Locked with password (Enter 12345 to unlock)' : 'Home';
  }
  if (appStoreBtn) {
    appStoreBtn.classList.toggle('nav-btn-locked', isHeaderNavLocked);
    appStoreBtn.innerHTML = isHeaderNavLocked ? '🔒 App store' : 'App store';
    appStoreBtn.title = isHeaderNavLocked ? 'Locked with password (Enter 12345 to unlock)' : 'App store';
  }
  if (clearBtn) {
    clearBtn.classList.toggle('nav-btn-locked', isHeaderNavLocked);
    clearBtn.innerHTML = isHeaderNavLocked ? '🔒 Clear Cookies' : 'Clear Cookies';
    clearBtn.title = isHeaderNavLocked ? 'Locked with password (Enter 12345 to unlock)' : 'Clear Cookies';
  }
  document.body.classList.toggle('header-nav-locked', isHeaderNavLocked);
}

function unlockHeaderNavPrompt(targetUrl) {
  const entered = prompt('These buttons (Home, App store, Clear Cookies) are locked for the exam.\nEnter password (12345) to unlock:');
  if (entered === null) return;
  if ((entered || '').trim() === HEADER_NAV_PASSWORD) {
    setHeaderNavLocked(false);
    toast('Buttons unlocked successfully');
    if (targetUrl) window.open(targetUrl, '_blank', 'noopener,noreferrer');
  } else {
    toast('Incorrect password. Access is locked.');
  }
}

function handleLockedNavClick(e, targetUrl) {
  if (!isHeaderNavLocked) return;
  e.preventDefault();
  e.stopPropagation();
  e.stopImmediatePropagation();
  unlockHeaderNavPrompt(targetUrl);
}

function initHeaderNavLockListeners() {
  const lockedButtons = [
    { id: 'homeBtn', url: 'https://supportsourcecode.lovable.app/home' },
    { id: 'appStoreBtn', url: 'https://interactive-media-display.lovable.app/' }
  ];
  lockedButtons.forEach(({ id, url }) => {
    const el = $(id);
    if (!el) return;
    el.addEventListener('click', e => handleLockedNavClick(e, url), true);
  });
}
initHeaderNavLockListeners();

/* --------------------------------------------------------------------------
   CANDIDATE VERIFICATION & EVIDENCE CAPTURE
   -------------------------------------------------------------------------- */
function populateCandidateTime() {
  const n = examNowParts();
  $('candidateDate').value = n.date;
  $('candidateHour').value = n.hour;
  $('candidateMinute').value = n.minute;
}

function showCandidateGate() {
  try {
    const s = readExamSession();
    if ((s?.active && s?.started) || candidateRunning) return;
  } catch (e) {}
  populateCandidateTime();
  const hasDisplayMedia = Boolean(navigator.mediaDevices && typeof navigator.mediaDevices.getDisplayMedia === 'function');
  if (!hasDisplayMedia) {
    if ($('screenStatus')) $('screenStatus').textContent = 'Screen sharing is not supported on this mobile device. Camera evidence will be used.';
    if ($('screenConsent')) $('screenConsent').checked = true;
    if ($('openScreen')) $('openScreen').disabled = true;
  } else {
    if ($('openScreen')) $('openScreen').disabled = false;
  }
  $('candidateModal').classList.add('show');
  updateCandidateStartState();
}

async function waitForVideo(video) {
  if (video.readyState >= 2) return;
  await new Promise(resolve => {
    const done = () => { cleanup(); resolve(); };
    const cleanup = () => {
      video.removeEventListener('loadeddata', done);
      video.removeEventListener('canplay', done);
    };
    video.addEventListener('loadeddata', done, { once: true });
    video.addEventListener('canplay', done, { once: true });
    setTimeout(() => { cleanup(); resolve(); }, 3000);
  });
}

async function openCandidateCamera() {
  try {
    if (cameraStream) cameraStream.getTracks().forEach(t => t.stop());
    let stream = null;
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640 }, height: { ideal: 360 }, facingMode: 'user' },
        audio: false
      });
    } catch (_) {
      stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    }
    cameraStream = stream;
    const v = $('cameraPreview');
    v.srcObject = cameraStream;
    try { await v.play(); } catch (_) {}
    await waitForVideo(v);
    $('cameraStatus').textContent = 'Camera is ready. Evidence capture will start after Ready to Exam.';
    updateCandidateStartState();
  } catch (e) {
    cameraStream = null;
    $('cameraStatus').textContent = 'Camera could not start: ' + e.message;
    $('candidateStart').disabled = true;
    toast('Please allow camera permissions in your browser settings');
  }
}
$('openCamera').onclick = openCandidateCamera;

async function openScreenCapture() {
  try {
    if (!navigator.mediaDevices?.getDisplayMedia) throw Error('Screen sharing is not supported by this browser');
    if (screenStream) screenStream.getTracks().forEach(t => t.stop());
    let stream = null;
    try {
      stream = await navigator.mediaDevices.getDisplayMedia({ video: { frameRate: { ideal: 8, max: 12 } }, audio: true });
    } catch (_) {
      stream = await navigator.mediaDevices.getDisplayMedia({ video: { frameRate: { ideal: 8, max: 12 } } });
    }
    screenStream = stream;
    const v = $('screenPreview');
    v.srcObject = screenStream;
    try { await v.play(); } catch (_) {}
    await waitForVideo(v);
    $('screenStatus').textContent = 'Screen sharing is ready. Select the exam tab/screen and keep sharing until submission.';
    if (screenStream.getVideoTracks && screenStream.getVideoTracks()[0]) {
      screenStream.getVideoTracks()[0].addEventListener('ended', () => {
        if (candidateRunning && !finishRunning) {
          $('screenStatus').textContent = 'Screen sharing stopped. The assessment will be finished.';
          finishAssessment('screen-share-stopped');
        }
      });
    }
    updateCandidateStartState();
  } catch (e) {
    screenStream = null;
    $('screenStatus').textContent = 'Screen sharing could not start: ' + e.message;
    $('candidateStart').disabled = true;
    toast('Screen sharing permission is required for this assessment');
  }
}
$('openScreen').onclick = openScreenCapture;

function updateCandidateStartState() {
  const hasDisplayMedia = Boolean(navigator.mediaDevices && typeof navigator.mediaDevices.getDisplayMedia === 'function');
  const nameOk = Boolean($('candidateName')?.value.trim());
  const rollOk = Boolean($('candidateRoll')?.value.trim());
  const camConsent = Boolean($('cameraConsent')?.checked);
  const camReady = Boolean(cameraStream && $('cameraPreview')?.readyState >= 2);

  let screenOk = false;
  if (!hasDisplayMedia) {
    screenOk = true;
  } else {
    screenOk = Boolean($('screenConsent')?.checked && screenStream && $('screenPreview')?.readyState >= 2);
  }

  const ok = Boolean(nameOk && rollOk && camConsent && camReady && screenOk);
  if ($('candidateStart')) $('candidateStart').disabled = !ok;
}
['candidateName', 'candidateRoll', 'cameraConsent', 'screenConsent'].forEach(id => {
  $(id)?.addEventListener('input', updateCandidateStartState);
  $(id)?.addEventListener('change', updateCandidateStartState);
});

function watermarkFrame(canvas, stamp) {
  const x = canvas.getContext('2d');
  x.save();
  x.font = 'bold 14px Segoe UI, sans-serif';
  x.fillStyle = 'rgba(0,0,0,.60)';
  x.fillRect(0, canvas.height - 34, canvas.width, 34);
  x.fillStyle = '#fff';
  x.fillText(stamp, 10, canvas.height - 12);
  x.font = 'bold 18px Segoe UI, sans-serif';
  x.fillStyle = 'rgba(34,197,94,.58)';
  for (let yy = 24; yy < canvas.height - 30; yy += 72) {
    for (let xx = 18; xx < canvas.width; xx += 110) {
      x.fillText('✓', xx, yy);
    }
  }
  x.restore();
}

function captureEvidenceFrame() {
  if (!cameraStream || !candidateRunning) return;
  const v = $('cameraPreview');
  if (v.readyState < 2 || !v.videoWidth || !v.videoHeight) return;
  const c = document.createElement('canvas');
  c.width = 480;
  c.height = 270;
  const x = c.getContext('2d');
  x.drawImage(v, 0, 0, c.width, c.height);
  const now = new Date();
  const stamp = formatIstDateTime(now) + '.' + String(now.getMilliseconds()).padStart(3, '0');
  watermarkFrame(c, stamp);
  c.toBlob(blob => {
    if (blob) {
      evidenceFrames.push({
        name: `evidence/${String(evidenceFrames.length + 1).padStart(6, '0')}_${now.toISOString().replace(/[:.]/g, '-')}.png`,
        blob,
        stamp
      });
    }
  }, 'image/png');
}

function startEvidenceCapture() {
  clearInterval(captureHandle);
  captureEvidenceFrame();
  captureHandle = setInterval(captureEvidenceFrame, 1500);
}
function stopEvidenceCapture() {
  clearInterval(captureHandle);
  captureHandle = null;
  if (cameraStream) {
    cameraStream.getTracks().forEach(t => t.stop());
    cameraStream = null;
  }
}

function startScreenRecording() {
  screenChunks = [];
  screenRecordingBlob = null;
  screenRecordingStartedAt = new Date();
  let mime = '';
  for (const type of ['video/webm;codecs=vp9', 'video/webm;codecs=vp8', 'video/webm']) {
    if (MediaRecorder.isTypeSupported(type)) {
      mime = type;
      break;
    }
  }
  const recordingTracks = [];
  if (screenStream) recordingTracks.push(...screenStream.getVideoTracks(), ...screenStream.getAudioTracks());
  if (cameraStream) recordingTracks.push(...cameraStream.getAudioTracks());
  const recordingStream = new MediaStream(recordingTracks);
  screenRecorder = new MediaRecorder(recordingStream, mime ? { mimeType: mime, videoBitsPerSecond: 450000 } : { videoBitsPerSecond: 450000 });
  screenRecorder.ondataavailable = e => {
    if (e.data && e.data.size) screenChunks.push(e.data);
  };
  screenRecorder.onstop = () => {
    screenRecordingBlob = new Blob(screenChunks, { type: 'video/mp4' });
  };
  screenRecorder.start(1000);
  $('screenStatus').textContent = 'Screen recording is active.';
}

function stopScreenRecording() {
  return new Promise(resolve => {
    if (screenRecorder && screenRecorder.state !== 'inactive') {
      screenRecorder.addEventListener('stop', () => resolve(), { once: true });
      screenRecorder.stop();
    } else resolve();
    if (screenStream) {
      screenStream.getTracks().forEach(t => t.stop());
      screenStream = null;
    }
  });
}

function setCandidateToolbarLocked(locked) {
  const controls = ['proctorSettings', 'addQuestion', 'importHtml', 'importJson', 'exportJson', 'importSet', 'exportSet', 'exportHtml', 'exportPdf', 'exportWord', 'deleteQuestion'];
  controls.forEach(id => {
    const el = $(id);
    if (el) {
      el.disabled = locked;
      el.setAttribute('aria-disabled', String(locked));
    }
  });
  if ($('finishAssessment')) $('finishAssessment').hidden = !locked;
  document.body.classList.toggle('candidate-running', locked);
  if ($('deleteQuestion')) {
    $('deleteQuestion').hidden = locked;
    $('deleteQuestion').disabled = locked;
  }
  if (locked) setHeaderNavLocked(true);
}

function applyCandidateMode() {
  document.body.classList.toggle('candidate-sequential', candidateSequentialMode);
  if (candidateSequentialMode) {
    $('previous').disabled = true;
    $('questionTitle').disabled = true;
    $('next').textContent = state.current >= state.questions.length - 1 ? 'Finish' : 'Next ›';
  } else {
    $('questionTitle').disabled = false;
    $('next').textContent = 'Next';
    $('previous').disabled = state.current === 0;
    $('next').disabled = state.current >= state.questions.length - 1;
  }
}

function startPersistentCountdown(deadline) {
  assessmentStarted = true;
  candidateRunning = true;
  autoExportStarted = false;
  setCandidateToolbarLocked(true);
  clearInterval(timerHandle);
  const update = () => {
    remaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
    tick();
    if (remaining <= 0) {
      clearInterval(timerHandle);
      finishAssessment('timeout');
    }
  };
  update();
  if (remaining > 0) timerHandle = setInterval(update, 1000);
}

function beginPersistentAssessment() {
  const duration = Math.max(1, Number(state.timerMinutes) || 60);
  const deadline = Date.now() + duration * 60000;
  writeExamSession({ started: true, active: true, startTime: Date.now(), deadline, durationMinutes: duration, currentQuestion: state.current });
  startPersistentCountdown(deadline);
}

function resumePersistentAssessment(session) {
  try {
    const x = JSON.parse(localStorage.getItem(EXAM_EVIDENCE_KEY) || 'null');
    if (x && x.fullName && x.rollNumber) candidateMeta = x;
  } catch (e) {}
  packageProtected = !!session.packageProtected;
  candidateSequentialMode = true;
  candidateRunning = true;
  state.current = Math.max(0, Math.min(Number(session.currentQuestion) || 0, state.questions.length - 1));
  switchToQuestion(state.current);
  applyCandidateMode();
  setCandidateToolbarLocked(true);
  updateTimerLockUI();

  $('readyModal')?.classList.remove('show');
  $('candidateModal')?.classList.remove('show');
  if (typeof closeWelcomeDialog === 'function') closeWelcomeDialog();

  if (session.deadline <= Date.now()) {
    remaining = 0;
    tick();
    finishAssessment('timeout');
    return;
  }
  startPersistentCountdown(session.deadline);
  toast('Assessment resumed from saved session. Timer and queries preserved.');
}

function restoreActiveExamV18() {
  const session = readExamSession();
  if (session?.active && session.started && state?.questions?.length) {
    if (session.importedFromZip) state.importedFromZip = true;
    resumePersistentAssessment(session);
  } else {
    setCandidateToolbarLocked(false);
  }
}

async function startCandidate() {
  const hasDisplayMedia = Boolean(navigator.mediaDevices && typeof navigator.mediaDevices.getDisplayMedia === 'function');
  if (hasDisplayMedia) {
    if (!screenStream || $('screenPreview').readyState < 2) return toast('Share the exam screen and wait until preview is visible');
    if (!$('screenConsent').checked) return toast('Screen-recording consent is required');
  }
  if (!cameraStream || $('cameraPreview').readyState < 2) return toast('Open the camera and wait until preview is visible');

  const n = examNowParts();
  candidateMeta = {
    fullName: $('candidateName').value.trim(),
    rollNumber: $('candidateRoll').value.trim(),
    currentDate: n.date,
    currentHour: n.hour,
    currentMinute: n.minute,
    startTime: n.iso,
    ownerEmail: ownerConfig().email || '',
    submissionMinutes: ownerConfig().submissionMinutes || 10
  };
  localStorage.setItem(EXAM_EVIDENCE_KEY, JSON.stringify(candidateMeta));
  $('candidateModal').classList.remove('show');
  if (typeof closeWelcomeDialog === 'function') closeWelcomeDialog();

  candidateSequentialMode = true;
  switchToQuestion(0);
  beginPersistentAssessment();
  startEvidenceCapture();
  if (screenStream) {
    startScreenRecording();
  }

  alert(`After the exam, share the exported HTML report and ZIP with the exam owner within ${candidateMeta.submissionMinutes} minute(s) at ${candidateMeta.ownerEmail || 'the email provided by the owner'}. Do not close the exam. Ending early will finish the attempt.`);
}
$('candidateStart').onclick = startCandidate;

/* Anti-cheating listeners during candidate examination */
function blockExamInput(e) {
  if (e.target && e.target.closest && e.target.closest('.modal')) return;
  if (!candidateRunning) return;
  if (['copy', 'cut', 'paste', 'drop', 'dragstart'].includes(e.type)) {
    e.preventDefault();
    e.stopImmediatePropagation();
    toast('Copy, paste, drag, and drop are disabled during the assessment');
    return;
  }
  if (e.type === 'keydown') {
    const navigation = ['Tab', 'Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End', 'PageUp', 'PageDown', 'Backspace', 'Delete', 'Enter'];
    const shortcut = e.ctrlKey || e.metaKey || e.altKey;
    if (e.target !== $('query') && !navigation.includes(e.key)) {
      e.preventDefault();
      e.stopImmediatePropagation();
    }
    if (shortcut && ['v', 'V', 'c', 'C', 'x', 'X', 'a', 'A', 's', 'S', 'p', 'P'].includes(e.key)) {
      if (['v', 'V', 'c', 'C', 'x', 'X'].includes(e.key)) {
        e.preventDefault();
        e.stopImmediatePropagation();
        toast('Clipboard shortcuts are disabled during the assessment');
      }
    }
  }
}
['copy', 'cut', 'paste', 'drop', 'dragstart', 'keydown'].forEach(t => document.addEventListener(t, blockExamInput, true));
document.addEventListener('contextmenu', e => {
  if (e.target && e.target.closest && e.target.closest('.modal')) return;
  if (candidateRunning) {
    e.preventDefault();
    e.stopImmediatePropagation();
    toast('Right-click is disabled during the assessment');
  }
}, true);

window.addEventListener('beforeunload', e => {
  saveCurrentQuery();
  persistSession(true);
  if (candidateRunning && !finishRunning) {
    e.preventDefault();
    e.returnValue = 'Your active assessment is in progress. Edits and time are saved.';
  }
});

/* --------------------------------------------------------------------------
   REPORT GENERATION & ASSESSMENT SUBMISSION
   -------------------------------------------------------------------------- */
function generateReportHtml(reason, end) {
  saveCurrentQuery();
  const c = candidateMeta || {};
  const isCandidateReport = Boolean(candidateMeta && candidateMeta.fullName);
  const endObj = end || new Date();
  const startDisp = formatIstDateTime(c.startTime) || esc(c.startTime || '');
  const endDisp = formatIstDateTime(endObj);
  const dateDisp = c.currentDate || formatIstDate(c.startTime) || formatIstDate(new Date());
  const timeDisp = c.currentHour && c.currentMinute ? (c.currentHour + ':' + c.currentMinute + ' IST') : formatIstTime(c.startTime) || formatIstTime(new Date());

  function renderGridTable(cols, rows) {
    if (!cols || !cols.length) return '';
    return `
    <table class="option-grid-table" style="border-collapse:collapse;width:100%;margin:8px 0 12px 0;border:1px solid #cbd5e1;font-size:13px;text-align:left;">
      <thead>
        <tr>
          ${cols.map(col => `<th style="border:1px solid #cbd5e1;padding:6px 10px;background:#f1f5f9;color:#0f172a;font-weight:600;">${esc(col)}</th>`).join('')}
        </tr>
      </thead>
      <tbody>
        ${(rows || []).map(row => `<tr>${row.map(cell => `<td style="border:1px solid #cbd5e1;padding:6px 10px;color:#334155;">${esc(cell)}</td>`).join('')}</tr>`).join('')}
      </tbody>
    </table>`;
  }

  const questionsHtml = state.questions.map((q, index) => {
    const rawTitle = (q.title || '').trim();
    const stripped = rawTitle.replace(/^(question\s*\d+\s*[:\-–—]?\s*)+/i, '').trim();
    const headingText = stripped ? `Question ${index + 1}: ${stripped}` : `Question ${index + 1}:`;
    return `
    <article class="question-card" id="q-card-${index + 1}">
      <h2 style="font-size:18px;margin:0 0 14px 0;color:#073b88;">${esc(headingText)}</h2>
      <div class="question-body">
        ${q.prompt ? `<div class="problem-text" style="font-size:14px;margin-bottom:12px;line-height:1.5;">${esc(q.prompt)}</div>` : ''}
        ${q.questionImage ? `<img src="${q.questionImage}" alt="Question reference image" style="max-width:100%;height:auto;display:block;margin:12px auto;border-radius:6px;border:1px solid #cbd5e1;">` : ''}
        ${q.schemaImage ? `<img src="${q.schemaImage}" alt="Workflow reference image" style="max-width:100%;height:auto;display:block;margin:12px auto;border-radius:6px;border:1px solid #cbd5e1;">` : ''}
      </div>
      <div class="question-options">
        ${isCandidateReport || q.query ? `
        <div class="option-item" style="margin-bottom:16px;">
          <div class="option-label" style="font-weight:700;font-size:14px;color:#0f172a;margin-bottom:4px;">Candidate SQL Query</div>
          <div class="option-content">
            <div class="sql-query-box" style="background:#f8fafc;border:1px solid #cbd5e1;border-left:4px solid #0284c7;border-radius:6px;padding:8px 12px;margin:8px 0 10px 0;">
              <div class="sql-box-label" style="font-size:11px;font-weight:700;color:#0284c7;margin-bottom:4px;text-transform:uppercase;">SQL Query (Attempt ${q.attempts || 0})</div>
              <pre style="margin:0;font-family:Consolas,monospace;font-size:13px;line-height:1.5;color:#0f172a;white-space:pre-wrap;word-break:break-word;">${esc(q.query || '')}</pre>
            </div>
            ${q.lastTests?.html ? `<div style="margin:8px 0;padding:8px 12px;background:#f1f5f9;border:1px solid #cbd5e1;border-radius:6px;font-size:12.5px;">${q.lastTests.html}</div>` : ''}
          </div>
        </div>
        ` : ''}

        <div class="option-item" style="margin-bottom:16px;">
          <div class="option-label" style="font-weight:700;font-size:14px;color:#0f172a;margin-bottom:4px;">Solution</div>
          <div class="option-content">
            <div class="sql-query-box" style="background:#f8fafc;border:1px solid #cbd5e1;border-left:4px solid #0284c7;border-radius:6px;padding:8px 12px;margin:8px 0 10px 0;">
              <div class="sql-box-label" style="font-size:11px;font-weight:700;color:#0284c7;margin-bottom:4px;text-transform:uppercase;">SQL Query</div>
              <pre style="margin:0;font-family:Consolas,monospace;font-size:13px;line-height:1.5;color:#0f172a;white-space:pre-wrap;word-break:break-word;">${esc(q.solution || '')}</pre>
            </div>
            ${q.expected ? renderGridTable(q.expected.columns, q.expected.rows) : ''}
          </div>
        </div>

        ${(q.tables || []).map((tbl, tIdx) => `
        <div class="option-item" style="margin-bottom:16px;">
          <div class="option-label" style="font-weight:700;font-size:14px;color:#0f172a;margin-bottom:4px;">Table-${tIdx + 1}</div>
          <div class="option-content">
            <div class="sql-query-box" style="background:#f8fafc;border:1px solid #cbd5e1;border-left:4px solid #0284c7;border-radius:6px;padding:8px 12px;margin:8px 0 10px 0;">
              <div class="sql-box-label" style="font-size:11px;font-weight:700;color:#0284c7;margin-bottom:4px;text-transform:uppercase;">SQL Query</div>
              <pre style="margin:0;font-family:Consolas,monospace;font-size:13px;line-height:1.5;color:#0f172a;white-space:pre-wrap;word-break:break-word;">SELECT * FROM ${esc(tbl.name)}</pre>
            </div>
            ${renderGridTable(tbl.columns, tbl.rows)}
          </div>
        </div>
        `).join('')}
      </div>
    </article>`;
  }).join('\n');

  const metaHeader = isCandidateReport ? `
  <div class="meta" style="border:1px solid #9fb3c8;padding:14px 18px;background:#f4f7fb;border-radius:8px;margin-bottom:24px;line-height:1.7;font-size:13.5px;">
    <b>Full Name:</b> ${esc(c.fullName || '')}<br>
    <b>Roll Number:</b> ${esc(c.rollNumber || '')}<br>
    <b>Current Date:</b> ${esc(dateDisp)}<br>
    <b>Current Time:</b> ${esc(timeDisp)}<br>
    <b>Exam Start (IST):</b> ${esc(startDisp)}<br>
    <b>Exam End (IST):</b> ${esc(endDisp)}<br>
    <b>Finish Reason:</b> ${esc(reason || 'manual')}<br>
    <b>Total Questions:</b> ${state.questions.length}
  </div>` : `
  <div class="meta" style="border:1px solid #9fb3c8;padding:12px 16px;background:#f4f7fb;border-radius:8px;margin-bottom:20px;line-height:1.6;font-size:13px;">
    <b>Assessment Title:</b> ${esc(state.title || 'SQL Assessment')}<br>
    <b>Set ID:</b> ${esc(state.setId || '')}<br>
    <b>Total Questions:</b> ${state.questions.length}<br>
    <b>Generated Date (IST):</b> ${esc(formatIstDateTime(new Date()))}
  </div>`;

  const evidenceSection = isCandidateReport ? `
  <h2 style="color:#073b88;margin-top:28px;">Camera Evidence</h2>
  <div id="evidenceShots"><p>Camera evidence screenshots are available in the accompanying <b>camera-evidence.html</b> file and in the completed ZIP (${evidenceFrames.length} captured frames).</p></div>
  <h2 style="color:#073b88;margin-top:24px;">Screen Recording</h2>
  <p>The completed ZIP contains the shared exam screen recording in the screen-recording folder. Start (IST): ${esc(formatIstDateTime(screenRecordingStartedAt))}. End (IST): ${esc(endDisp)}.</p>` : '';

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${esc((isCandidateReport ? `${c.rollNumber}-${c.fullName} ` : '') + (state.title || 'SQL Assessment Report'))}</title>
  <style>
    :root{--bg:#f8fafc;--card-bg:#ffffff;--text:#0f172a;--muted:#475569;--border:#cbd5e1;--primary:#0284c7;--card-border:#e2e8f0}
    body{margin:0;padding:24px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background:var(--bg);color:var(--text);line-height:1.6}
    .doc-wrap{max-width:860px;margin:0 auto}
    h1{color:#073b88;margin-top:0}
    .question-card{background:var(--card-bg);border:1px solid var(--card-border);border-radius:10px;padding:20px;margin-bottom:24px;box-shadow:0 2px 8px rgba(0,0,0,0.04);page-break-inside:avoid;break-inside:avoid}
    .question-body{font-size:14px;line-height:1.6;margin-bottom:16px;text-align:left}
    .question-options{margin-top:16px;padding-top:12px;border-top:1px dashed var(--border);text-align:left}
    .option-item{margin-bottom:14px;text-align:left}
    .option-label{font-weight:700;font-size:14px;color:var(--text);margin-bottom:4px;text-align:left}
    .option-grid-table{border-collapse:collapse;width:100%;margin:8px 0 12px 0;border:1px solid var(--border);font-size:13px;text-align:left}
    .option-grid-table th{border:1px solid var(--border);padding:6px 10px;background:#f1f5f9;color:var(--text);font-weight:600;text-align:left}
    .option-grid-table td{border:1px solid var(--border);padding:6px 10px;color:#334155;text-align:left}
    .sql-query-box{background:#f8fafc;border:1px solid var(--border);border-left:4px solid var(--primary);border-radius:6px;padding:8px 12px;margin:8px 0 10px 0;text-align:left}
    .sql-box-label{font-size:11px;font-weight:700;color:var(--primary);margin-bottom:4px;text-transform:uppercase;letter-spacing:0.5px}
  </style>
</head>
<body>
  <div class="doc-wrap">
    <h1>${esc(isCandidateReport ? 'Assessment Submission Report' : (state.title || 'SQL Assessment Report'))}</h1>
    ${metaHeader}
    ${questionsHtml}
    ${evidenceSection}
  </div>
</body>
</html>`;
}

function evidenceHtmlV20(end) {
  const c = candidateMeta || {};
  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>Camera Evidence Report</title>
  <style>
    body{font-family:Arial,sans-serif;margin:24px;color:#102a43}
    h1{color:#073b88}
    .meta{border:1px solid #9fb3c8;padding:12px;background:#f4f7fb;border-radius:6px;margin-bottom:20px}
    .shot{margin:20px 0;padding:15px;border:1px solid #bfd2eb;border-radius:8px;background:#fff;page-break-inside:avoid}
    .shot img{width:100%;max-width:640px;border-radius:5px;display:block;margin-bottom:10px}
    .stamp{font-size:12px;font-weight:bold;color:#607495}
  </style>
</head>
<body>
  <h1>Camera Evidence Report</h1>
  <div class="meta">
    <b>Full Name:</b> ${esc(c.fullName || '')}<br>
    <b>Roll Number:</b> ${esc(c.rollNumber || '')}<br>
    <b>Exam Start (IST):</b> ${esc(formatIstDateTime(c.startTime))}<br>
    <b>Exam End (IST):</b> ${esc(formatIstDateTime(end))}
  </div>
  <h2>Evidence Frames (${evidenceFrames.length})</h2>
  <div id="evidenceShots">
    ${evidenceFrames.map((f, i) => `
      <div class="shot">
        <h3>Frame ${i + 1}</h3>
        <img src="${f.name}">
        <div class="stamp">${esc(f.stamp)}</div>
      </div>
    `).join('')}
  </div>
</body>
</html>`;
}

function instructionTextV19(reason, end) {
  const c = candidateMeta || {};
  const owner = ownerConfig();
  const due = new Date(end.getTime() + (Number(c.submissionMinutes || owner.submissionMinutes || 10) * 60000));
  const startDisp = formatIstDateTime(c.startTime) || c.startTime || '';
  const endDisp = formatIstDateTime(end);
  const dueDisp = formatIstDateTime(due);
  return `ASSESSMENT SUBMISSION INSTRUCTIONS

Candidate Full Name: ${c.fullName || ''}
Roll Number: ${c.rollNumber || ''}
Current Date: ${c.currentDate || formatIstDate(c.startTime)}
Current Hour: ${c.currentHour || ''}
Current Minute: ${c.currentMinute || ''}
Exam Start (IST): ${startDisp}
Exam End (IST): ${endDisp}
Finish Reason: ${reason}
Total Questions: ${state.questions.length}
Owner Email: ${c.ownerEmail || owner.email || ''}
Submission Window: ${c.submissionMinutes || owner.submissionMinutes || 10} minute(s)
Submit By (IST): ${dueDisp}

Share both the completed ZIP and HTML report with the exam owner. Keep the original files unchanged. Camera images are assessment evidence for authorized review only. This application does not automatically determine cheating, identity, emotion, or gaze.`;
}

async function completedZipBlob(reason, end, reportHtml, onProgress) {
  saveCurrentQuery();
  const zip = new JSZip();
  const manifest = {
    ...state,
    questions: undefined,
    questionIds: state.questions.map(x => x.id),
    candidate: candidateMeta,
    completedAt: end.toISOString(),
    finishReason: reason,
    submission: true,
    screenRecording: {
      file: 'screen-recording/exam-screen.mp4',
      startedAt: screenRecordingStartedAt?.toISOString() || '',
      endedAt: end.toISOString()
    }
  };
  zip.file('assessment.json', JSON.stringify(manifest, null, 2));
  state.questions.forEach((x, i) => {
    zip.file(`questions/${String(i + 1).padStart(3, '0')}-${x.id}.json`, JSON.stringify(x, null, 2));
  });
  for (const f of evidenceFrames) {
    zip.file(f.name, f.blob);
  }
  zip.file('camera-evidence.html', evidenceHtmlV20(end));
  zip.file('instruction.txt', instructionTextV19(reason, end) + '\nScreen Recording: screen-recording/exam-screen.mp4\nCamera Evidence: camera-evidence.html\n');
  zip.file('assessment-report.html', reportHtml);
  if (screenRecordingBlob?.size) {
    zip.file('screen-recording/exam-screen.mp4', screenRecordingBlob);
  }
  return zip.generateAsync({
    type: 'blob',
    compression: 'DEFLATE',
    compressionOptions: { level: 1 }
  }, metadata => {
    if (onProgress) onProgress(Math.round(metadata.percent));
  });
}

async function finishAssessment(reason) {
  if (finishRunning) return;
  finishRunning = true;
  clearInterval(timerHandle);
  captureEvidenceFrame();
  await new Promise(r => setTimeout(r, 200));
  stopEvidenceCapture();
  await stopScreenRecording();
  saveCurrentQuery();
  const end = new Date();
  const base = safeName((candidateMeta?.rollNumber || state.setId || 'assessment') + '-' + (candidateMeta?.fullName || 'candidate'));

  const progressModal = document.createElement('div');
  progressModal.className = 'modal show';
  progressModal.style.zIndex = '2147483647';
  progressModal.innerHTML = `
    <div class="setup-card" style="text-align:center;max-width:480px;padding:30px;">
      <h2 style="margin-top:0;color:var(--blue);">Creating Submission Package</h2>
      <p style="margin:15px 0;font-weight:bold;line-height:1.5;color:var(--text);">Please wait for some minutes.<br>The process of ZIP and HTML report creation is under progress...</p>
      <div style="background:var(--soft);border-radius:10px;height:20px;width:100%;overflow:hidden;margin:20px 0;border:1px solid var(--line);">
        <div id="exportProgressBar" style="background:var(--blue);width:0%;height:100%;transition:width 0.1s ease;"></div>
      </div>
      <div id="exportProgressPercent" style="font-size:18px;font-weight:bold;color:var(--text);">0%</div>
    </div>
  `;
  document.body.appendChild(progressModal);

  try {
    const reportHtml = generateReportHtml(reason, end);
    download(new Blob([reportHtml], { type: 'text/html;charset=utf-8' }), base + '-completed.html');

    const evidenceHtml = evidenceHtmlV20(end);
    download(new Blob([evidenceHtml], { type: 'text/html;charset=utf-8' }), base + '-camera-evidence.html');

    const zipBlob = await completedZipBlob(reason, end, reportHtml, percent => {
      const bar = document.getElementById('exportProgressBar');
      const txt = document.getElementById('exportProgressPercent');
      if (bar) bar.style.width = percent + '%';
      if (txt) txt.textContent = percent + '%';
    });
    download(zipBlob, base + '-completed.zip');

    download(new Blob([instructionTextV19(reason, end)], { type: 'text/plain;charset=utf-8' }), base + '-instruction.txt');
  } catch (e) {
    console.error(e);
    toast('Export failed: ' + e.message);
    finishRunning = false;
    progressModal.remove();
    return;
  } finally {
    progressModal.remove();
  }

  const subMinutes = candidateMeta?.submissionMinutes || ownerConfig().submissionMinutes || 10;
  const ownerMail = candidateMeta?.ownerEmail || ownerConfig().email || 'the exam owner email';

  // Automatically clear cookies and all assessment session data when exam is over
  isClearingData = true;
  clearExamCookies();
  clearExamSession();
  try { localStorage.removeItem(EXAM_EVIDENCE_KEY); } catch (e) {}
  try { localStorage.removeItem('sql_header_nav_locked'); } catch (e) {}
  try { localStorage.removeItem('sql_studio_fallback_session'); } catch (e) {}
  try { sessionStorage.clear(); } catch (e) {}
  if (typeof clearSessionFromStorage === 'function') {
    await clearSessionFromStorage();
  }
  setHeaderNavLocked(false);
  state.database?.close();
  state.database = null;
  state.questions = [];
  state.current = 0;
  candidateRunning = false;
  assessmentStarted = false;
  evidenceFrames = [];

  toast('Exam over: Assessment cookies and local session data cleared automatically.');

  if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
  document.body.classList.add('submission-complete');

  const m = $('timeoutModal');
  if (m) {
    m.querySelector('h2').textContent = reason === 'timeout' ? 'Time is out' : 'Assessment finished';
    m.querySelector('p').innerHTML = `Share the exported HTML report and ZIP within ${subMinutes} minute(s) to <b>${escapeHtml(ownerMail)}</b>.<br><br><span style="color:#10b981;font-weight:600;">✓ Assessment cookies and session data have been cleared automatically.</span>`;
    const b = m.querySelector('button');
    if (b) {
      b.textContent = 'Return to Import Screen';
      b.onclick = () => location.reload();
    }
    m.classList.add('show');
  }
}
$('finishAssessment').onclick = () => {
  if (confirm('Finish now? This ends the attempt and exports the HTML report, ZIP, instruction file, camera evidence, and screen recording.')) {
    finishAssessment('manual');
  }
};

/* --------------------------------------------------------------------------
   EXPORT & IMPORT FUNCTIONS (HTML, PDF, WORD, ZIP, JSON)
   -------------------------------------------------------------------------- */
$('exportHtml').onclick = () => {
  if (!state.questions.length) return toast('No questions to export');
  saveCurrentQuery();
  const html = generateReportHtml();
  download(new Blob([html], { type: 'text/html;charset=utf-8' }), `${safeName(state.setId || 'assessment')}-report.html`);
  toast('HTML report exported');
};

$('exportWord').onclick = () => {
  if (!state.questions.length) return toast('No questions to export');
  saveCurrentQuery();
  const html = generateReportHtml();
  download(new Blob([html], { type: 'application/msword' }), `${safeName(state.setId || 'assessment')}-report.doc`);
  toast('Word report exported');
};

$('exportPdf').onclick = () => {
  if (!state.questions.length) return toast('No questions to export');
  saveCurrentQuery();
  const d = document.createElement('div');
  d.innerHTML = generateReportHtml();
  html2pdf().set({
    filename: `${safeName(state.setId || 'assessment')}-report.pdf`,
    margin: 10,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' }
  }).from(d).save();
  toast('PDF report exporting...');
};

async function buildAssessmentZip(security, fileName) {
  saveCurrentQuery();
  const zip = new JSZip();
  const manifest = {
    format: 'sql-assessment-set',
    version: 3,
    setId: state.setId,
    title: state.title || 'SQL Assessment',
    timerMinutes: Number(state.timerMinutes) || 60,
    timerLocked: !!state.timerLocked,
    timerLockHash: state.timerLockHash || '',
    ownerConfig: state.ownerConfig || { email: '', submissionMinutes: 10 },
    packageSecurity: security || { protected: false, deleteQuestionsAllowed: true },
    totalQuestions: state.questions.length,
    exportedAt: new Date().toISOString(),
    questionIds: state.questions.map(x => x.id)
  };
  zip.file('assessment.json', JSON.stringify(manifest, null, 2));
  state.questions.forEach((x, i) => {
    zip.file(`questions/${String(i + 1).padStart(3, '0')}-${x.id}.json`, JSON.stringify(x, null, 2));
  });
  zip.file('README.txt', 'Import this assessment ZIP using SQL Assessment Studio.');
  const blob = await zip.generateAsync({ type: 'blob', compression: 'DEFLATE' });
  download(blob, fileName || `${safeName(state.setId)}.zip`);
}

$('exportSet').onclick = async () => {
  if (!state.questions.length) return toast('No questions to export');
  saveCurrentQuery();
  const use = confirm('Do you want to save password?\n\nOK = Save password\nCancel = Export without password');
  let sec = { protected: false, deleteQuestionsAllowed: true };
  if (use) {
    const p = prompt('Teacher: enter ZIP password (minimum 4 characters):', '');
    if (!p || p.length < 4) return toast('Use at least 4 characters');
    if (prompt('Confirm ZIP password:', '') !== p) return toast('Passwords do not match');
    const salt = Math.random().toString(36).slice(2) + Date.now().toString(36);
    sec = { protected: true, salt, hash: await hashPack(p, salt), deleteQuestionsAllowed: false };
  } else if (!confirm('Export without password?')) return;
  await buildAssessmentZip(sec, `${safeName(state.setId)}.zip`);
  toast('Assessment set exported as ZIP');
};

$('importSet').onclick = () => $('setFile').click();

$('setFile').onchange = async e => {
  const file = e.target.files?.[0];
  if (!file) return;
  try {
    const zip = await JSZip.loadAsync(file);
    const manifestFile = zip.file('assessment.json');
    if (!manifestFile) throw Error('assessment.json not found in ZIP');
    const manifest = JSON.parse(await manifestFile.async('text'));
    const sec = manifest.packageSecurity || {};
    if (sec.protected) {
      const p = prompt('Enter password to open assessment ZIP:', '');
      if (p === null) return;
      if (await hashPack(p, sec.salt) !== sec.hash) throw Error('Incorrect password');
    }
    const names = Object.keys(zip.files).filter(n => /^questions\/.*\.json$/i.test(n)).sort();
    const questions = [];
    for (const n of names) {
      questions.push(JSON.parse(await zip.file(n).async('text')));
    }
    if (!questions.length) throw Error('No questions found in ZIP');
    questions.forEach((q, idx) => {
      q.id = q.id || uid();
      q.title = formatQuestionTitle(q.title, idx);
      if (q.query === undefined && q.solution) q.query = q.solution;
    });

    state.setId = manifest.setId || `SET-${Date.now().toString(36).toUpperCase()}`;
    state.title = manifest.title || 'SQL Assessment';
    state.timerMinutes = Number(manifest.timerMinutes) || 60;
    state.timerLocked = !!manifest.timerLocked;
    state.timerLockHash = manifest.timerLockHash || '';
    state.ownerConfig = manifest.ownerConfig || { email: '', submissionMinutes: 10 };
    state.packageSecurity = sec;
    state.questions = questions;
    state.current = 0;
    state.importedFromZip = true;
    try { sessionStorage.setItem('sql_exam_imported_from_zip', 'true'); } catch (e) {}

    $('setIdText').textContent = state.setId;
    $('timerMinutes').value = state.timerMinutes;
    loadCurrentQuestionDatabase();
    render();
    persistSession(true);

    candidateSequentialMode = true;
    applyCandidateMode();
    updateTimerLockUI();
    updateQuestionCountV19();
    setHeaderNavLocked(true);
    toast(`Successfully imported ${questions.length} questions from ZIP.`);
    showCandidateGate();
  } catch (err) {
    toast(err.message || 'Invalid ZIP');
  } finally {
    e.target.value = '';
  }
};

function exportSessionAsJson() {
  if (!state.questions || !state.questions.length) {
    toast('No questions to export.');
    return;
  }
  saveCurrentQuery();
  const payload = {
    version: 3,
    exportedAt: new Date().toISOString(),
    setId: state.setId,
    title: state.title,
    timerMinutes: state.timerMinutes,
    timerLocked: state.timerLocked,
    timerLockHash: state.timerLockHash,
    ownerConfig: state.ownerConfig,
    current: state.current,
    totalQuestions: state.questions.length,
    questions: state.questions
  };
  const jsonStr = JSON.stringify(payload, null, 2);
  download(new Blob([jsonStr], { type: 'application/json' }), `${safeName(state.setId || 'sql-assessment')}-data.json`);
  toast(`Exported ${state.questions.length} questions to JSON.`);
}
if ($('exportJson')) $('exportJson').onclick = () => exportSessionAsJson();
if ($('importJson')) $('importJson').onclick = () => $('jsonFile')?.click();

function applyJsonQuestionData(data) {
  let questions = null;
  let current = 0;
  if (Array.isArray(data)) {
    questions = data;
  } else if (data && Array.isArray(data.questions)) {
    questions = data.questions;
    if (typeof data.current === 'number') current = data.current;
    if (data.setId) state.setId = data.setId;
    if (data.title) state.title = data.title;
    if (data.timerMinutes) state.timerMinutes = Number(data.timerMinutes);
    if (data.timerLocked !== undefined) state.timerLocked = !!data.timerLocked;
    if (data.timerLockHash) state.timerLockHash = data.timerLockHash;
    if (data.ownerConfig) state.ownerConfig = data.ownerConfig;
  }
  if (!questions || !questions.length) throw Error('No questions found in JSON.');
  questions.forEach((q, idx) => {
    q.id = q.id || uid();
    q.title = formatQuestionTitle(q.title, idx);
    if (q.query === undefined && q.solution) q.query = q.solution;
    if (!q.tables) q.tables = [{ name: 'demo', columns: ['id'], rows: [['1']] }];
  });

  state.questions = questions;
  state.current = Math.min(Math.max(0, current), state.questions.length - 1);
  if ($('setIdText')) $('setIdText').textContent = state.setId;
  if ($('timerMinutes')) $('timerMinutes').value = state.timerMinutes;
  if (state.engineReady) {
    loadCurrentQuestionDatabase();
  }
  render();
  persistSession(true);
  updateTimerLockUI();
  updateQuestionCountV19();
  if (isTimerLocked()) {
    showReadyGate();
  }
}

if ($('jsonFile')) {
  $('jsonFile').onchange = async event => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      applyJsonQuestionData(data);
      toast(`Imported ${state.questions.length} questions from JSON.`);
    } catch (error) {
      toast(error.message || 'Unable to import JSON.');
    } finally {
      event.target.value = '';
    }
  };
}

$('importHtml').onclick = () => $('htmlFile').click();

$('htmlFile').onchange = async event => {
  const file = event.target.files?.[0];
  if (!file) return;
  try {
    const text = await file.text();
    const imported = parseReport(text);
    const setMatch = file.name.match(/SET-[A-Z0-9]+/i);
    state.setId = setMatch ? setMatch[0].toUpperCase() : `SET-${Date.now().toString(36).toUpperCase()}`;
    state.questions = imported.questions;
    state.current = 0;
    $('setIdText').textContent = state.setId;
    loadCurrentQuestionDatabase();
    render();
    persistSession(true);
    updateQuestionCountV19();
    const tableCount = imported.questions.reduce((total, question) => total + question.tables.length, 0);
    toast(`Imported ${imported.questions.length} questions and ${tableCount} question-table blocks.`);
    if (isTimerLocked()) {
      showReadyGate();
    }
  } catch (error) {
    toast(error.message || 'Unable to import HTML.');
  } finally {
    event.target.value = '';
  }
};

/* --------------------------------------------------------------------------
   QUESTION MANAGEMENT (+ Question, Delete, Navigation)
   -------------------------------------------------------------------------- */
$('addQuestion').onclick = () => {
  if (candidateRunning) return;
  saveCurrentQuery();
  const newQ = starterQuestion(state.questions.length + 1);
  state.questions.push(newQ);
  state.current = state.questions.length - 1;
  loadCurrentQuestionDatabase();
  render();
  persistSession(true);
  updateQuestionCountV19();
  toast(`Question ${state.questions.length} added. Visit DB/index.html to add questions.`);
};

$('deleteQuestion').onclick = () => {
  if (candidateRunning) return;
  if (!state.questions.length) return;
  if (!confirm(`Delete Question ${state.current + 1}?`)) return;
  state.questions.splice(state.current, 1);
  state.current = Math.min(state.current, Math.max(0, state.questions.length - 1));
  try {
    loadCurrentQuestionDatabase();
    render();
  } catch (error) {
    toast(error.message);
  }
  persistSession(true);
  updateQuestionCountV19();
  toast('Question deleted.');
};

$('previous').onclick = () => switchToQuestion(state.current - 1);
$('next').onclick = () => {
  if (candidateSequentialMode && state.current >= state.questions.length - 1) {
    $('finishAssessment').click();
  } else if (!candidateSequentialMode && state.current >= state.questions.length - 1) {
    if (state.questions.length > 1) {
      switchToQuestion(0);
      toast('Returned to Question 1');
    } else {
      toast('Only 1 question loaded');
    }
  } else {
    switchToQuestion(state.current + 1);
  }
};

if ($('mobileNextBtn')) {
  $('mobileNextBtn').onclick = () => {
    if (candidateSequentialMode && state.current >= state.questions.length - 1) {
      $('finishAssessment').click();
    } else if (!candidateSequentialMode && state.current >= state.questions.length - 1) {
      if (state.questions.length > 1) {
        switchToQuestion(0);
        toast('Returned to Question 1');
      } else {
        toast('Only 1 question loaded');
      }
    } else {
      switchToQuestion(state.current + 1);
    }
  };
}

$('questionTitle').onclick = event => {
  event.stopPropagation();
  if (candidateSequentialMode) return;
  if (!state.questions.length) return;
  $('questionPalette')?.classList.toggle('show');
};

$('closePalette')?.addEventListener('click', event => {
  event.stopPropagation();
  $('questionPalette')?.classList.remove('show');
});

document.addEventListener('click', event => {
  const palette = $('questionPalette');
  if (palette && palette.classList.contains('show')) {
    const titleBtn = $('questionTitle');
    if (!palette.contains(event.target) && event.target !== titleBtn && !titleBtn?.contains(event.target)) {
      palette.classList.remove('show');
    }
  }
});

/* --------------------------------------------------------------------------
   QUERY EXECUTION & VERIFICATION (RUN / CHECK)
   -------------------------------------------------------------------------- */
$('runQuery').onclick = () => {
  const question = currentQuestion();
  try {
    const output = executeCurrentQuery();
    $('output').className = 'result';
    $('output').innerHTML = output.columns.length ? resultTable(output.columns, output.rows) : 'Query completed with no result set.';
    showPane('outputPane');
  } catch (error) {
    $('output').className = 'result fail';
    $('output').textContent = error.message;
  }
  if (question) {
    question.lastOutput = { html: $('output').innerHTML, className: $('output').className };
    persistSession();
  }
};

$('checkQuery').onclick = () => {
  const question = currentQuestion();
  if (!question) return;
  question.attempts = (question.attempts || 0) + 1;
  saveCurrentQuery();
  if (!question.expected) {
    $('tests').className = 'result';
    $('tests').textContent = 'This report has no saved solution result for this question, so there is no test case to compare.';
    $('attempts').textContent = `Checks: ${question.attempts}`;
    question.lastTests = { html: $('tests').innerHTML, className: $('tests').className };
    persistSession(true);
    showPane('testsPane');
    return;
  }
  try {
    const output = executeCurrentQuery();
    const expected = question.expected.columns.map(value => value.toLowerCase());
    const actual = output.columns.map(value => value.toLowerCase());
    const columnsPassed = expected.length === actual.length && expected.every((value, index) => value === actual[index]);
    const expectedRows = question.expected.rows.length;
    const rowCountPassed = output.rows.length === expectedRows;
    let rowsPassed = rowsMatchInOrder(output.rows, question.expected.rows);
    if (!rowsPassed && columnsPassed && rowCountPassed) {
      const userSql = $('query').value;
      const orderIndices = parseOrderIndices(question.solution, question.expected.columns);
      const effectiveIndices = orderIndices.length ? orderIndices :
        (parseOrderIndices(userSql, question.expected.columns).length ? parseOrderIndices(userSql, question.expected.columns) :
          ((/order\s+by/i.test(question.solution || '') || /order\s+by/i.test(userSql)) ?
            sortedColumnsInExpected(question.expected.rows, question.expected.columns.length) : []));
      if (rowsMatchWithTies(output.rows, question.expected.rows, effectiveIndices)) {
        rowsPassed = true;
      }
    }
    const difference = rowsPassed ? '' : firstRowDifference(output.rows, question.expected.rows);
    const passed = columnsPassed && rowCountPassed && rowsPassed;
    $('tests').className = `result ${passed ? 'pass' : 'fail'}`;
    $('tests').innerHTML = `<b>${passed ? 'Data Set 1 passed' : 'Data Set 1 failed'}</b><br>Column names and order: ${columnsPassed ? 'passed' : `failed (expected: ${escapeHtml(question.expected.columns.join(', '))}; got: ${escapeHtml(output.columns.join(', '))})`}<br>Row count: ${rowCountPassed ? 'passed' : `failed (expected ${expectedRows}, got ${output.rows.length})`}<br>Cell values and row order: ${rowsPassed ? 'passed' : `failed${difference ? ` (${escapeHtml(difference)})` : ' (the returned rows must match the saved solution exactly, in order)'}`}`;
    showPane('testsPane');
  } catch (error) {
    $('tests').className = 'result fail';
    $('tests').textContent = error.message;
  }
  $('attempts').textContent = `Checks: ${question.attempts}`;
  question.lastTests = { html: $('tests').innerHTML, className: $('tests').className };
  renderQuestionNumbers();
  persistSession(true);
};

/* --------------------------------------------------------------------------
   CLEAR COOKIES & RESET WORKSPACE
   -------------------------------------------------------------------------- */
async function clearAllAssessmentData() {
  if (isExamActiveOrLocked()) {
    const entered = prompt('Clear Cookies is locked during the exam.\nEnter password (12345) to unlock:');
    if (entered === null) return;
    if ((entered || '').trim() !== HEADER_NAV_PASSWORD) {
      toast('Incorrect password. Clear Cookies is locked during the exam.');
      return;
    }
    if (!confirm('Password verified. Clearing cookies will end your active exam session and reset all data. Continue?')) {
      return;
    }
  } else {
    if (!confirm('Clear all assessment cookies and local data?')) return;
  }
  isClearingData = true;
  try { stopEvidenceCapture(); } catch (e) {}
  try { stopScreenRecording(); } catch (e) {}
  clearInterval(timerHandle);
  clearExamCookies();
  const savedTheme = localStorage.getItem('sql_studio_theme');
  try { localStorage.clear(); } catch (e) {}
  if (savedTheme) {
    try { localStorage.setItem('sql_studio_theme', savedTheme); } catch (e) {}
  }
  try { sessionStorage.clear(); } catch (e) {}
  if (typeof clearSessionFromStorage === 'function') await clearSessionFromStorage();
  state.database?.close();
  state.database = null;
  state.questions = [];
  state.current = 0;
  candidateMeta = null;
  evidenceFrames = [];
  candidateRunning = false;
  assessmentStarted = false;
  finishRunning = false;
  toast('Assessment cookies and local session data cleared');
  setTimeout(() => location.reload(), 350);
}
$('clearCookies').onclick = clearAllAssessmentData;

/* --------------------------------------------------------------------------
   EDITOR LINE NUMBERS & SHORTCUTS
   -------------------------------------------------------------------------- */
function updateLineNumbers() {
  const query = $('query');
  const lineNumbers = document.querySelector('.line-numbers');
  if (!query || !lineNumbers) return;
  const count = (query.value || '').split('\n').length;
  lineNumbers.textContent = Array.from({ length: Math.max(1, count) }, (_, i) => i + 1).join('\n');
}

$('query').addEventListener('input', () => {
  updateLineNumbers();
  saveCurrentQuery();
  persistSession();
});

$('query').addEventListener('scroll', () => {
  const lineNumbers = document.querySelector('.line-numbers');
  if (lineNumbers) lineNumbers.scrollTop = $('query').scrollTop;
});

$('query').addEventListener('keydown', event => {
  if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
    event.preventDefault();
    $('runQuery')?.click();
  }
});

/* --------------------------------------------------------------------------
   THEME TOGGLE
   -------------------------------------------------------------------------- */
function initTheme() {
  try {
    const saved = localStorage.getItem('sql_studio_theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = saved ? saved === 'dark' : prefersDark;
    setTheme(isDark, false);
  } catch (_) {}
}

function setTheme(dark, persist = true) {
  document.documentElement.classList.toggle('dark', dark);
  document.body.classList.toggle('dark', dark);
  const label = $('themeLabel');
  if (label) label.textContent = dark ? 'Light Mode' : 'Dark Mode';
  const btn = $('themeToggle');
  if (btn) btn.title = dark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
  if (persist) {
    try { localStorage.setItem('sql_studio_theme', dark ? 'dark' : 'light'); } catch (_) {}
  }
}

if ($('themeToggle')) {
  $('themeToggle').onclick = () => {
    const isDark = document.documentElement.classList.contains('dark') || document.body.classList.contains('dark');
    setTheme(!isDark, true);
  };
}

/* ==========================================================================
   HORIZONTAL RESIZER (BETWEEN QUERY EDITOR & WORKFLOW/TESTS SECTION)
   ========================================================================== */
let restoreWorkResizerFn = null;

function initWorkResizer() {
  const work = $('workSection') || document.querySelector('.work');
  const resizer = $('workResizer');
  const topBtn = $('splitTopBtn');
  const midBtn = $('splitMidBtn');
  const downBtn = $('splitDownBtn');

  if (!work || !resizer) return;

  let isDragging = false;
  let startY = 0;
  let startEditorHeight = 0;

  function updateActiveButton(mode) {
    if (topBtn) topBtn.classList.toggle('active', mode === 'top');
    if (midBtn) midBtn.classList.toggle('active', mode === 'mid');
    if (downBtn) downBtn.classList.toggle('active', mode === 'down');
  }

  function getAvailableHeight() {
    const workRect = work.getBoundingClientRect();
    const runbar = work.querySelector('.runbar');
    const resizerHeight = resizer.offsetHeight || 24;
    const runbarHeight = runbar ? runbar.offsetHeight : 44;
    const padding = 14;
    return Math.max(140, workRect.height - resizerHeight - runbarHeight - padding);
  }

  function setEditorHeight(heightPx, mode = 'custom', save = true) {
    const totalAvail = getAvailableHeight();
    const minH = 50;
    const maxH = Math.max(minH, totalAvail - 50);
    const clampedH = Math.max(minH, Math.min(maxH, Math.round(heightPx)));

    work.style.setProperty('--editor-height', `${clampedH}px`);
    updateActiveButton(mode);

    if (save) {
      const ratio = totalAvail > 0 ? (clampedH / totalAvail) : 0.5;
      try {
        localStorage.setItem('sql_work_editor_ratio', ratio.toFixed(3));
        localStorage.setItem('sql_work_split_mode', mode);
      } catch (_) {}
    }
  }

  function snapTop() {
    setEditorHeight(52, 'top', true);
  }

  function snapMid() {
    const totalAvail = getAvailableHeight();
    setEditorHeight(Math.round(totalAvail * 0.48), 'mid', true);
  }

  function snapDown() {
    const totalAvail = getAvailableHeight();
    setEditorHeight(Math.round(totalAvail * 0.82), 'down', true);
  }

  if (topBtn) {
    topBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      snapTop();
    });
  }
  if (midBtn) {
    midBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      snapMid();
    });
  }
  if (downBtn) {
    downBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      snapDown();
    });
  }

  resizer.addEventListener('dblclick', (e) => {
    if (e.target && e.target.closest && e.target.closest('.split-btn')) return;
    let currentMode = 'mid';
    try { currentMode = localStorage.getItem('sql_work_split_mode') || 'mid'; } catch (_) {}
    if (currentMode === 'mid') {
      snapTop();
    } else {
      snapMid();
    }
  });

  function startDrag(clientY) {
    isDragging = true;
    startY = clientY;
    const editorCard = $('editorCard') || work.querySelector('.editor-card');
    startEditorHeight = editorCard ? editorCard.getBoundingClientRect().height : (getAvailableHeight() * 0.5);

    resizer.classList.add('active');
    work.classList.add('is-resizing');
    document.body.classList.add('is-resizing-v');
  }

  function onDrag(clientY) {
    if (!isDragging) return;
    const deltaY = clientY - startY;
    const targetH = startEditorHeight + deltaY;
    setEditorHeight(targetH, 'custom', false);
  }

  function stopDrag() {
    if (!isDragging) return;
    isDragging = false;
    resizer.classList.remove('active');
    work.classList.remove('is-resizing');
    document.body.classList.remove('is-resizing-v');

    const editorCard = $('editorCard') || work.querySelector('.editor-card');
    if (editorCard) {
      const h = editorCard.getBoundingClientRect().height;
      const totalAvail = getAvailableHeight();
      const ratio = totalAvail > 0 ? (h / totalAvail) : 0.5;
      try {
        localStorage.setItem('sql_work_editor_ratio', ratio.toFixed(3));
        localStorage.setItem('sql_work_split_mode', 'custom');
      } catch (_) {}
      updateActiveButton('custom');
    }
  }

  resizer.addEventListener('mousedown', (e) => {
    if (e.target && e.target.closest && e.target.closest('.split-btn')) return;
    e.preventDefault();
    startDrag(e.clientY);
  });

  window.addEventListener('mousemove', (e) => {
    if (isDragging) {
      e.preventDefault();
      onDrag(e.clientY);
    }
  });

  window.addEventListener('mouseup', () => {
    if (isDragging) stopDrag();
  });

  resizer.addEventListener('touchstart', (e) => {
    if (e.target && e.target.closest && e.target.closest('.split-btn')) return;
    if (e.touches && e.touches.length === 1) {
      startDrag(e.touches[0].clientY);
    }
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (isDragging && e.touches && e.touches.length === 1) {
      onDrag(e.touches[0].clientY);
    }
  }, { passive: true });

  window.addEventListener('touchend', () => {
    if (isDragging) stopDrag();
  });

  function restoreSavedSplit() {
    try {
      const savedMode = localStorage.getItem('sql_work_split_mode');
      const savedRatio = parseFloat(localStorage.getItem('sql_work_editor_ratio'));

      if (savedMode === 'top') {
        snapTop();
      } else if (savedMode === 'down') {
        snapDown();
      } else if (savedMode === 'mid') {
        snapMid();
      } else if (!isNaN(savedRatio) && savedRatio > 0 && savedRatio < 1) {
        const totalAvail = getAvailableHeight();
        setEditorHeight(Math.round(totalAvail * savedRatio), 'custom', false);
      } else {
        snapMid();
      }
    } catch (_) {
      snapMid();
    }
  }

  restoreWorkResizerFn = restoreSavedSplit;
  setTimeout(restoreSavedSplit, 50);
  window.addEventListener('resize', () => {
    if (!isDragging) {
      try {
        const savedMode = localStorage.getItem('sql_work_split_mode');
        if (savedMode === 'top') snapTop();
        else if (savedMode === 'down') snapDown();
        else if (savedMode === 'mid') snapMid();
      } catch (_) {}
    }
  });
}

/* ==========================================================================
   VERTICAL RESIZER (BETWEEN QUESTION PANEL & SQL WORKSPACE SECTION)
   ========================================================================== */
let restoreMainResizerFn = null;

function initMainResizer() {
  const main = $('workspace') || document.querySelector('main');
  const resizer = $('mainResizer');
  const problemPanel = $('problemPanel') || document.querySelector('.problem-panel');
  const leftBtn = $('splitLeftBtn');
  const midBtn = $('splitMainMidBtn');
  const rightBtn = $('splitRightBtn');

  if (!main || !resizer || !problemPanel) return;

  let isDragging = false;
  let startX = 0;
  let startProblemWidth = 0;

  function updateActiveButton(mode) {
    if (leftBtn) leftBtn.classList.toggle('active', mode === 'left');
    if (midBtn) midBtn.classList.toggle('active', mode === 'mid');
    if (rightBtn) rightBtn.classList.toggle('active', mode === 'right');
  }

  function getAvailableWidth() {
    const mainRect = main.getBoundingClientRect();
    const resizerWidth = resizer.offsetWidth || 26;
    return Math.max(300, mainRect.width - resizerWidth);
  }

  function setProblemWidth(widthPx, mode = 'custom', save = true) {
    const totalAvail = getAvailableWidth();
    const minW = 60;
    const maxW = Math.max(minW, totalAvail - 120);
    const clampedW = Math.max(minW, Math.min(maxW, Math.round(widthPx)));

    problemPanel.style.setProperty('--problem-width', `${clampedW}px`);
    updateActiveButton(mode);

    if (save) {
      const ratio = totalAvail > 0 ? (clampedW / totalAvail) : 0.43;
      try {
        localStorage.setItem('sql_main_problem_ratio', ratio.toFixed(3));
        localStorage.setItem('sql_main_split_mode', mode);
      } catch (_) {}
    }
  }

  function snapLeft() {
    setProblemWidth(80, 'left', true);
  }

  function snapMid() {
    const totalAvail = getAvailableWidth();
    setProblemWidth(Math.round(totalAvail * 0.5), 'mid', true);
  }

  function snapRight() {
    const totalAvail = getAvailableWidth();
    setProblemWidth(Math.round(totalAvail * 0.72), 'right', true);
  }

  if (leftBtn) {
    leftBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      snapLeft();
    });
  }
  if (midBtn) {
    midBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      snapMid();
    });
  }
  if (rightBtn) {
    rightBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      snapRight();
    });
  }

  resizer.addEventListener('dblclick', (e) => {
    if (e.target && e.target.closest && e.target.closest('.v-split-btn')) return;
    let currentMode = 'mid';
    try { currentMode = localStorage.getItem('sql_main_split_mode') || 'mid'; } catch (_) {}
    if (currentMode === 'mid') {
      snapLeft();
    } else {
      snapMid();
    }
  });

  function startDrag(clientX) {
    isDragging = true;
    startX = clientX;
    startProblemWidth = problemPanel.getBoundingClientRect().width;

    resizer.classList.add('active');
    main.classList.add('is-resizing-h');
    document.body.classList.add('is-resizing-h');
  }

  function onDrag(clientX) {
    if (!isDragging) return;
    const deltaX = clientX - startX;
    const targetW = startProblemWidth + deltaX;
    setProblemWidth(targetW, 'custom', false);
  }

  function stopDrag() {
    if (!isDragging) return;
    isDragging = false;
    resizer.classList.remove('active');
    main.classList.remove('is-resizing-h');
    document.body.classList.remove('is-resizing-h');

    const w = problemPanel.getBoundingClientRect().width;
    const totalAvail = getAvailableWidth();
    const ratio = totalAvail > 0 ? (w / totalAvail) : 0.43;
    try {
      localStorage.setItem('sql_main_problem_ratio', ratio.toFixed(3));
      localStorage.setItem('sql_main_split_mode', 'custom');
    } catch (_) {}
    updateActiveButton('custom');
  }

  resizer.addEventListener('mousedown', (e) => {
    if (e.target && e.target.closest && e.target.closest('.v-split-btn')) return;
    e.preventDefault();
    startDrag(e.clientX);
  });

  window.addEventListener('mousemove', (e) => {
    if (isDragging) {
      e.preventDefault();
      onDrag(e.clientX);
    }
  });

  window.addEventListener('mouseup', () => {
    if (isDragging) stopDrag();
  });

  resizer.addEventListener('touchstart', (e) => {
    if (e.target && e.target.closest && e.target.closest('.v-split-btn')) return;
    if (e.touches && e.touches.length === 1) {
      startDrag(e.touches[0].clientX);
    }
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (isDragging && e.touches && e.touches.length === 1) {
      onDrag(e.touches[0].clientX);
    }
  }, { passive: true });

  window.addEventListener('touchend', () => {
    if (isDragging) stopDrag();
  });

  function restoreSavedSplit() {
    try {
      const savedMode = localStorage.getItem('sql_main_split_mode');
      const savedRatio = parseFloat(localStorage.getItem('sql_main_problem_ratio'));

      if (savedMode === 'left') {
        snapLeft();
      } else if (savedMode === 'right') {
        snapRight();
      } else if (savedMode === 'mid') {
        snapMid();
      } else if (!isNaN(savedRatio) && savedRatio > 0 && savedRatio < 1) {
        const totalAvail = getAvailableWidth();
        setProblemWidth(Math.round(totalAvail * savedRatio), 'custom', false);
      } else {
        snapMid();
      }
    } catch (_) {
      snapMid();
    }
  }

  restoreMainResizerFn = restoreSavedSplit;
  setTimeout(restoreSavedSplit, 50);
  window.addEventListener('resize', () => {
    if (!isDragging) {
      try {
        const savedMode = localStorage.getItem('sql_main_split_mode');
        if (savedMode === 'left') snapLeft();
        else if (savedMode === 'right') snapRight();
        else if (savedMode === 'mid') snapMid();
      } catch (_) {}
    }
  });
}

function restoreResizers() {
  if (typeof restoreMainResizerFn === 'function') restoreMainResizerFn();
  if (typeof restoreWorkResizerFn === 'function') restoreWorkResizerFn();
}

/* --------------------------------------------------------------------------
   APP INITIALIZATION
   -------------------------------------------------------------------------- */
initTheme();
initSchemaViewer();
updateAppFullscreenUI();
initWorkResizer();
initMainResizer();
initializeEngine();

/* ==========================================================================
   WELCOME / DESKTOP MODE RECOMMENDATION MODAL & MOCK DATA IMPORT
   ========================================================================== */
const welcomeModal = $('welcomeModal');

function closeWelcomeDialog() {
  const m = $('welcomeModal');
  if (m) {
    m.classList.remove('show');
    m.style.display = 'none';
  }
}
window.closeWelcomeDialog = closeWelcomeDialog;
window.closeWelcomeModal = closeWelcomeDialog;

if ($('closeWelcomeModal')) $('closeWelcomeModal').onclick = closeWelcomeDialog;
if ($('dismissWelcomeModal')) $('dismissWelcomeModal').onclick = closeWelcomeDialog;

async function loadSampleMockData() {
  if (window.SET_MVC1H43H_MOCK_DATA) {
    return window.SET_MVC1H43H_MOCK_DATA;
  }
  try {
    const res = await fetch('SET-MVC1H43H-data.json');
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {}
  return null;
}

async function loadMockTestData() {
  closeWelcomeDialog();
  if (typeof candidateRunning !== 'undefined' && candidateRunning) return;

  try {
    let packet = null;
    if (window.SET_MVC1H43H_MOCK_DATA) {
      packet = window.SET_MVC1H43H_MOCK_DATA;
    }
    if (!packet) {
      try {
        packet = await loadSampleMockData();
      } catch (e) {}
    }
    if (!packet) {
      // Fallback: prompt user to pick the file directly if browser blocked local file access
      toast('Please select SET-MVC1H43H-data.json to import mock data');
      const jsonFileInput = $('jsonFile');
      if (jsonFileInput) jsonFileInput.click();
      return;
    }

    // Deep clone to ensure memory data is not mutated across sessions
    const cleanPacket = JSON.parse(JSON.stringify(packet));
    cleanPacket.current = 0; // Always start on Question 1

    if (!state.engineReady) {
      for (let i = 0; i < 100; i++) {
        if (state.engineReady) break;
        await new Promise(r => setTimeout(r, 100));
      }
    }

    applyJsonQuestionData(cleanPacket);
    if (state.engineReady) {
      try {
        loadCurrentQuestionDatabase();
      } catch (e) {
        console.warn('Database init deferred:', e);
      }
    }
    toast('Mock test data (SET-MVC1H43H) loaded successfully!');
  } catch (err) {
    console.error('Mock data error:', err);
    toast(err.message || 'Failed to load mock data');
  }
}
window.loadMockTestData = loadMockTestData;

if ($('tryMockData')) {
  $('tryMockData').onclick = async (e) => {
    if (e) e.preventDefault();
    await loadMockTestData();
  };
}

if (window.__pendingLoadMock) {
  window.__pendingLoadMock = false;
  loadMockTestData();
}

if (welcomeModal) {
  welcomeModal.addEventListener('click', (e) => {
    if (e.target === welcomeModal) closeWelcomeDialog();
  });
}

document.addEventListener('keydown', (e) => {
  const m = $('welcomeModal');
  if (e.key === 'Escape' && m && (m.classList.contains('show') || m.style.display === 'grid' || m.style.display === 'flex')) {
    closeWelcomeDialog();
  }
});

