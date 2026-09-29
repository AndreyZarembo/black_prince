// Black Prince Pomodoro — shared timer core. Zero dependencies, host-agnostic.

export class PomodoroTimer {
  constructor() {
    this.totalSec = 25 * 60;
    this.remaining = this.totalSec;
    this.running = false;
    this.endAt = 0;
    this.caption = '25 min';
    this._id = null;
    this.onTick = () => {};
    this.onFinish = () => {};
  }

  setMinutes(min) {
    this._stop();
    this.totalSec = min * 60;
    this.remaining = this.totalSec;
    this.caption = min + ' min';
    this.onTick(this);
  }

  /** Countdown to the next :00/:15/:30/:45 of the current or next hour. */
  setUntil(quarter) {
    this._stop();
    const now = new Date();
    const target = new Date(now);
    target.setMinutes(quarter, 0, 0);
    if (target <= now) target.setHours(target.getHours() + 1);
    this.totalSec = Math.round((target - now) / 1000);
    this.remaining = this.totalSec;
    const hh = String(target.getHours()).padStart(2, '0');
    const mm = String(target.getMinutes()).padStart(2, '0');
    this.caption = 'until ' + hh + ':' + mm;
    this.start();
  }

  start() {
    if (this.remaining <= 0) this.remaining = this.totalSec;
    this.running = true;
    this.endAt = Date.now() + this.remaining * 1000;
    this._id = setInterval(() => this._tick(), 250);
    this.onTick(this);
  }

  pause() {
    this.remaining = Math.max(0, (this.endAt - Date.now()) / 1000);
    this._stop();
    this.onTick(this);
  }

  reset() {
    this._stop();
    this.remaining = this.totalSec;
    this.onTick(this);
  }

  /** Restore a running countdown from a persisted endAt timestamp. */
  resume(endAt, totalSec, caption) {
    this.totalSec = totalSec;
    this.caption = caption || '';
    this.remaining = Math.max(0, (endAt - Date.now()) / 1000);
    if (this.remaining > 0) {
      this.running = true;
      this.endAt = endAt;
      this._id = setInterval(() => this._tick(), 250);
    }
    this.onTick(this);
  }


  /** Nudge by deltaSec — before start or on the fly (site behavior). */
  adjust(deltaSec) {
    if (this.running) {
      this.endAt += deltaSec * 1000;
      this.remaining = Math.max(0, (this.endAt - Date.now()) / 1000);
    } else {
      this.remaining = Math.max(0, Math.min(999 * 60, Math.round(this.remaining) + deltaSec));
      this.totalSec = this.remaining;
      this.caption = '';
    }
    this.onTick(this);
  }

  /** End-of-countdown wall-clock time, e.g. "22:45" (empty when idle). */
  get eta() {
    if (!this.running && this.remaining === this.totalSec) return '';
    const end = this.running ? this.endAt : Date.now() + this.remaining * 1000;
    const d = new Date(end);
    return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
  }

  _stop() {
    this.running = false;
    if (this._id) { clearInterval(this._id); this._id = null; }
  }

  _tick() {
    this.remaining = (this.endAt - Date.now()) / 1000;
    if (this.remaining <= 0) {
      this.remaining = 0;
      this._stop();
      this.onTick(this);
      this.onFinish(this);
      return;
    }
    this.onTick(this);
  }

  get display() {
    const s = Math.max(0, Math.round(this.remaining));
    return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
  }

  dispose() { this._stop(); }
}

/** The product's triple beep (880 Hz sine ×3). */
export function beep() {
  try {
    const Ctx = globalThis.AudioContext || globalThis.webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    [0, 0.25, 0.5].forEach((t) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = 880;
      gain.gain.setValueAtTime(0.001, ctx.currentTime + t);
      gain.gain.exponentialRampToValueAtTime(0.3, ctx.currentTime + t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t + 0.2);
      osc.connect(gain).connect(ctx.destination);
      osc.start(ctx.currentTime + t);
      osc.stop(ctx.currentTime + t + 0.22);
    });
  } catch (e) { /* audio unavailable */ }
}
