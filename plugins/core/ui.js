// Compact host-themed UI. Colors come ONLY from --pt-* CSS variables,
// which each host maps onto its own theme tokens (see each app's CSS).

const DURATIONS = [5, 10, 15, 25, 45, 60];
const QUARTERS = [0, 15, 30, 45];

export function mountTimer(root, timer, opts = {}) {
  root.classList.add('pt-root');
  root.innerHTML = `
    <div class="pt-digits" title="Click — start / pause">25:00</div>
    <div class="pt-caption"></div>
    <div class="pt-chips pt-durations"></div>
    <div class="pt-chips pt-until"></div>
    <div class="pt-controls">
      <button class="pt-btn pt-primary">Start</button>
      <button class="pt-btn">Reset</button>
    </div>`;

  const digits = root.querySelector('.pt-digits');
  const caption = root.querySelector('.pt-caption');
  const durRow = root.querySelector('.pt-durations');
  const untilRow = root.querySelector('.pt-until');
  const [startBtn, resetBtn] = root.querySelectorAll('.pt-btn');

  let selected = 25;
  for (const min of DURATIONS) {
    const b = document.createElement('button');
    b.className = 'pt-chip' + (min === selected ? ' pt-active' : '');
    b.textContent = min;
    b.addEventListener('click', () => {
      selected = min;
      durRow.querySelectorAll('.pt-chip').forEach((c) => c.classList.toggle('pt-active', c === b));
      timer.setMinutes(min);
    });
    durRow.appendChild(b);
  }
  for (const q of QUARTERS) {
    const b = document.createElement('button');
    b.className = 'pt-chip pt-q';
    b.textContent = ':' + String(q).padStart(2, '0');
    b.title = 'Count down to the next ' + b.textContent;
    b.addEventListener('click', () => {
      durRow.querySelectorAll('.pt-chip').forEach((c) => c.classList.remove('pt-active'));
      timer.setUntil(q);
    });
    untilRow.appendChild(b);
  }

  const render = () => {
    digits.textContent = timer.display;
    digits.classList.toggle('pt-done', !timer.running && timer.remaining === 0);
    caption.textContent = timer.caption;
    startBtn.textContent = timer.running ? 'Pause' : 'Start';
    if (opts.onRender) opts.onRender(timer);
  };

  const prevTick = timer.onTick;
  timer.onTick = (t) => { prevTick(t); render(); };
  startBtn.addEventListener('click', () => (timer.running ? timer.pause() : timer.start()));
  digits.addEventListener('click', () => (timer.running ? timer.pause() : timer.start()));
  resetBtn.addEventListener('click', () => timer.reset());
  render();
  return { render };
}
