var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res, err) => function __init() {
  if (err) throw err[0];
  try {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  } catch (e) {
    throw err = [e], e;
  }
};
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

// ../core/timer.js
var timer_exports = {};
__export(timer_exports, {
  PomodoroTimer: () => PomodoroTimer,
  beep: () => beep
});
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
var PomodoroTimer;
var init_timer = __esm({
  "../core/timer.js"() {
    PomodoroTimer = class {
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
  }
});

// extension.src.js
var vscode = require("vscode");
var { PomodoroTimer: PomodoroTimer2 } = (init_timer(), __toCommonJS(timer_exports));
var timer;
var statusBar;
var panelView;
function pushState() {
  if (panelView) {
    panelView.webview.postMessage({
      type: "state",
      display: timer.display,
      running: timer.running,
      caption: timer.caption,
      done: !timer.running && timer.remaining === 0
    });
  }
}
function activate(context) {
  timer = new PomodoroTimer2();
  statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 1e3);
  statusBar.command = "blackPrincePomodoro.toggle";
  statusBar.tooltip = "Pomodoro: start / pause";
  context.subscriptions.push(statusBar);
  timer.onTick = () => {
    statusBar.text = "\u{1F345} " + timer.display;
    pushState();
  };
  timer.onFinish = () => {
    statusBar.text = "\u{1F345} 0:00";
    pushState();
    vscode.window.showInformationMessage("\u{1F345} Time is up!");
  };
  timer.onTick();
  statusBar.show();
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "blackPrincePomodoro.toggle",
      () => timer.running ? timer.pause() : timer.start()
    ),
    vscode.commands.registerCommand("blackPrincePomodoro.reset", () => timer.reset())
  );
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider("blackPrincePomodoro.panel", {
      resolveWebviewView(view) {
        panelView = view;
        view.webview.options = { enableScripts: true, localResourceRoots: [context.extensionUri] };
        const css = view.webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, "media", "panel.css"));
        const js = view.webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, "media", "panel.js"));
        view.webview.html = `<!doctype html><html><head>
          <meta charset="UTF-8">
          <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${view.webview.cspSource}; script-src ${view.webview.cspSource};">
          <link rel="stylesheet" href="${css}">
        </head><body><div id="app"></div><script src="${js}"></script></body></html>`;
        view.webview.onDidReceiveMessage((msg) => {
          if (msg.type === "toggle") timer.running ? timer.pause() : timer.start();
          else if (msg.type === "reset") timer.reset();
          else if (msg.type === "minutes") timer.setMinutes(msg.value);
          else if (msg.type === "until") timer.setUntil(msg.value);
          else if (msg.type === "ready") pushState();
        });
        view.onDidDispose(() => {
          if (panelView === view) panelView = null;
        });
      }
    })
  );
}
function deactivate() {
  if (timer) timer.dispose();
}
module.exports = { activate, deactivate };
