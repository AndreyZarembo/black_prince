// Webview UI: dumb view over the extension-host timer (survives webview disposal).
const vscodeApi = acquireVsCodeApi();
const DURATIONS = [5, 10, 15, 25, 45, 60];
const QUARTERS = [0, 15, 30, 45];

const app = document.getElementById('app');
app.className = 'pt-root';
app.innerHTML = `
  <div class="pt-digits">25:00</div>
  <div class="pt-caption"></div>
  <div class="pt-chips pt-durations"></div>
  <div class="pt-chips pt-until"></div>
  <div class="pt-controls">
    <button class="pt-btn pt-primary" id="toggle">Start</button>
    <button class="pt-btn" id="reset">Reset</button>
  </div>`;

const digits = app.querySelector('.pt-digits');
const caption = app.querySelector('.pt-caption');
const durRow = app.querySelector('.pt-durations');
const untilRow = app.querySelector('.pt-until');
const toggleBtn = document.getElementById('toggle');

for (const min of DURATIONS) {
  const b = document.createElement('button');
  b.className = 'pt-chip' + (min === 25 ? ' pt-active' : '');
  b.textContent = min;
  b.addEventListener('click', () => {
    durRow.querySelectorAll('.pt-chip').forEach((c) => c.classList.toggle('pt-active', c === b));
    vscodeApi.postMessage({ type: 'minutes', value: min });
  });
  durRow.appendChild(b);
}
for (const q of QUARTERS) {
  const b = document.createElement('button');
  b.className = 'pt-chip pt-q';
  b.textContent = ':' + String(q).padStart(2, '0');
  b.addEventListener('click', () => {
    durRow.querySelectorAll('.pt-chip').forEach((c) => c.classList.remove('pt-active'));
    vscodeApi.postMessage({ type: 'until', value: q });
  });
  untilRow.appendChild(b);
}
toggleBtn.addEventListener('click', () => vscodeApi.postMessage({ type: 'toggle' }));
document.getElementById('reset').addEventListener('click', () => vscodeApi.postMessage({ type: 'reset' }));
digits.addEventListener('click', () => vscodeApi.postMessage({ type: 'toggle' }));

window.addEventListener('message', (e) => {
  const m = e.data;
  if (m.type !== 'state') return;
  digits.textContent = m.display;
  digits.classList.toggle('pt-done', m.done);
  caption.textContent = m.caption;
  toggleBtn.textContent = m.running ? 'Pause' : 'Start';
});
vscodeApi.postMessage({ type: 'ready' });
