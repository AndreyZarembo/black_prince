import { PomodoroTimer, beep } from './core/timer.js';
import { mountTimer } from './core/ui.js';

const ext = globalThis.chrome ?? globalThis.browser; // guarded: popup.html also runs standalone
const timer = new PomodoroTimer();

async function persist() {
  if (!ext?.storage) return;
  await ext.storage.local.set({
    running: timer.running,
    endAt: timer.endAt,
    remaining: timer.remaining,
    totalSec: timer.totalSec,
    caption: timer.caption,
  });
  ext.runtime.sendMessage({ type: timer.running ? 'schedule' : 'clear', endAt: timer.endAt }).catch?.(() => {});
}

const prevFinish = timer.onFinish;
timer.onFinish = (t) => { prevFinish(t); beep(); persist(); };

mountTimer(document.getElementById('app'), timer, {
  onRender: () => persist(),
});

if (ext?.storage) {
  ext.storage.local.get(['running', 'endAt', 'remaining', 'totalSec', 'caption']).then((s) => {
    if (s.running && s.endAt > Date.now()) {
      timer.resume(s.endAt, s.totalSec, s.caption);
    } else if (s.totalSec) {
      timer.totalSec = s.totalSec;
      timer.remaining = s.running ? 0 : (s.remaining ?? s.totalSec);
      timer.caption = s.caption || '';
      timer.onTick(timer);
    }
  });
}
