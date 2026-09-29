var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// main.src.js
var main_src_exports = {};
__export(main_src_exports, {
  default: () => BlackPrincePomodoro
});
module.exports = __toCommonJS(main_src_exports);
var import_obsidian = require("obsidian");

// ../core/timer.js
var PomodoroTimer = class {
  constructor() {
    this.totalSec = 25 * 60;
    this.remaining = this.totalSec;
    this.running = false;
    this.endAt = 0;
    this.caption = "25 min";
    this._id = null;
    this.onTick = () => {
    };
    this.onFinish = () => {
    };
  }
  setMinutes(min) {
    this._stop();
    this.totalSec = min * 60;
    this.remaining = this.totalSec;
    this.caption = min + " min";
    this.onTick(this);
  }
  /** Countdown to the next :00/:15/:30/:45 of the current or next hour. */
  setUntil(quarter) {
    this._stop();
    const now = /* @__PURE__ */ new Date();
    const target = new Date(now);
    target.setMinutes(quarter, 0, 0);
    if (target <= now) target.setHours(target.getHours() + 1);
    this.totalSec = Math.round((target - now) / 1e3);
    this.remaining = this.totalSec;
    const hh = String(target.getHours()).padStart(2, "0");
    const mm = String(target.getMinutes()).padStart(2, "0");
    this.caption = "until " + hh + ":" + mm;
    this.start();
  }
  start() {
    if (this.remaining <= 0) this.remaining = this.totalSec;
    this.running = true;
    this.endAt = Date.now() + this.remaining * 1e3;
    this._id = setInterval(() => this._tick(), 250);
    this.onTick(this);
  }
  pause() {
    this.remaining = Math.max(0, (this.endAt - Date.now()) / 1e3);
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
    this.caption = caption || "";
    this.remaining = Math.max(0, (endAt - Date.now()) / 1e3);
    if (this.remaining > 0) {
      this.running = true;
      this.endAt = endAt;
      this._id = setInterval(() => this._tick(), 250);
    }
    this.onTick(this);
  }
  _stop() {
    this.running = false;
    if (this._id) {
      clearInterval(this._id);
      this._id = null;
    }
  }
  _tick() {
    this.remaining = (this.endAt - Date.now()) / 1e3;
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
    return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0");
  }
  dispose() {
    this._stop();
  }
};
function beep() {
  try {
    const Ctx = globalThis.AudioContext || globalThis.webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    [0, 0.25, 0.5].forEach((t) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = 880;
      gain.gain.setValueAtTime(1e-3, ctx.currentTime + t);
      gain.gain.exponentialRampToValueAtTime(0.3, ctx.currentTime + t + 0.02);
      gain.gain.exponentialRampToValueAtTime(1e-3, ctx.currentTime + t + 0.2);
      osc.connect(gain).connect(ctx.destination);
      osc.start(ctx.currentTime + t);
      osc.stop(ctx.currentTime + t + 0.22);
    });
  } catch (e) {
  }
}

// ../core/ui.js
var DURATIONS = [5, 10, 15, 25, 45, 60];
var QUARTERS = [0, 15, 30, 45];
function mountTimer(root, timer, opts = {}) {
  root.classList.add("pt-root");
  root.innerHTML = `
    <div class="pt-digits" title="Click \u2014 start / pause">25:00</div>
    <div class="pt-caption"></div>
    <div class="pt-chips pt-durations"></div>
    <div class="pt-chips pt-until"></div>
    <div class="pt-controls">
      <button class="pt-btn pt-primary">Start</button>
      <button class="pt-btn">Reset</button>
    </div>`;
  const digits = root.querySelector(".pt-digits");
  const caption = root.querySelector(".pt-caption");
  const durRow = root.querySelector(".pt-durations");
  const untilRow = root.querySelector(".pt-until");
  const [startBtn, resetBtn] = root.querySelectorAll(".pt-btn");
  let selected = 25;
  for (const min of DURATIONS) {
    const b = document.createElement("button");
    b.className = "pt-chip" + (min === selected ? " pt-active" : "");
    b.textContent = min;
    b.addEventListener("click", () => {
      selected = min;
      durRow.querySelectorAll(".pt-chip").forEach((c) => c.classList.toggle("pt-active", c === b));
      timer.setMinutes(min);
    });
    durRow.appendChild(b);
  }
  for (const q of QUARTERS) {
    const b = document.createElement("button");
    b.className = "pt-chip pt-q";
    b.textContent = ":" + String(q).padStart(2, "0");
    b.title = "Count down to the next " + b.textContent;
    b.addEventListener("click", () => {
      durRow.querySelectorAll(".pt-chip").forEach((c) => c.classList.remove("pt-active"));
      timer.setUntil(q);
    });
    untilRow.appendChild(b);
  }
  const render = () => {
    digits.textContent = timer.display;
    digits.classList.toggle("pt-done", !timer.running && timer.remaining === 0);
    caption.textContent = timer.caption;
    startBtn.textContent = timer.running ? "Pause" : "Start";
    if (opts.onRender) opts.onRender(timer);
  };
  const prevTick = timer.onTick;
  timer.onTick = (t) => {
    prevTick(t);
    render();
  };
  startBtn.addEventListener("click", () => timer.running ? timer.pause() : timer.start());
  digits.addEventListener("click", () => timer.running ? timer.pause() : timer.start());
  resetBtn.addEventListener("click", () => timer.reset());
  render();
  return { render };
}

// main.src.js
var VIEW_TYPE = "black-prince-pomodoro";
var PomodoroView = class extends import_obsidian.ItemView {
  constructor(leaf, plugin) {
    super(leaf);
    this.plugin = plugin;
  }
  getViewType() {
    return VIEW_TYPE;
  }
  getDisplayText() {
    return "Pomodoro";
  }
  getIcon() {
    return "timer";
  }
  async onOpen() {
    const el = this.contentEl.createDiv();
    mountTimer(el, this.plugin.timer);
  }
};
var BlackPrincePomodoro = class extends import_obsidian.Plugin {
  async onload() {
    this.timer = new PomodoroTimer();
    this.statusBar = this.addStatusBarItem();
    this.statusBar.addClass("pt-statusbar");
    this.statusBar.onClickEvent(() => this.activateView());
    const prevTick = this.timer.onTick;
    this.timer.onTick = (t) => {
      prevTick(t);
      this.statusBar.setText(t.running || t.remaining !== t.totalSec ? "\u{1F345} " + t.display : "\u{1F345}");
    };
    this.timer.onFinish = () => {
      beep();
      new import_obsidian.Notice("\u{1F345} Time is up!");
    };
    this.timer.onTick(this.timer);
    this.registerView(VIEW_TYPE, (leaf) => new PomodoroView(leaf, this));
    this.addRibbonIcon("timer", "Pomodoro", () => this.activateView());
    this.addCommand({ id: "open", name: "Open timer", callback: () => this.activateView() });
    this.addCommand({
      id: "toggle",
      name: "Start / pause",
      callback: () => this.timer.running ? this.timer.pause() : this.timer.start()
    });
  }
  async activateView() {
    const { workspace } = this.app;
    let leaf = workspace.getLeavesOfType(VIEW_TYPE)[0];
    if (!leaf) {
      leaf = workspace.getRightLeaf(false);
      await leaf.setViewState({ type: VIEW_TYPE, active: true });
    }
    workspace.revealLeaf(leaf);
  }
  onunload() {
    this.timer.dispose();
  }
};
