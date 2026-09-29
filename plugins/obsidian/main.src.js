import { ItemView, Plugin, Notice } from 'obsidian';
import { PomodoroTimer, beep } from '../core/timer.js';
import { mountTimer } from '../core/ui.js';

const VIEW_TYPE = 'black-prince-pomodoro';

class PomodoroView extends ItemView {
  constructor(leaf, plugin) {
    super(leaf);
    this.plugin = plugin;
  }
  getViewType() { return VIEW_TYPE; }
  getDisplayText() { return 'Pomodoro'; }
  getIcon() { return 'timer'; }
  async onOpen() {
    const el = this.contentEl.createDiv();
    mountTimer(el, this.plugin.timer);
  }
}

export default class BlackPrincePomodoro extends Plugin {
  async onload() {
    this.timer = new PomodoroTimer();
    this.statusBar = this.addStatusBarItem();
    this.statusBar.addClass('pt-statusbar');
    this.statusBar.onClickEvent(() => this.activateView());

    const prevTick = this.timer.onTick;
    this.timer.onTick = (t) => {
      prevTick(t);
      this.statusBar.setText(t.running || t.remaining !== t.totalSec ? '🍅 ' + t.display : '🍅');
    };
    this.timer.onFinish = () => {
      beep();
      new Notice('🍅 Time is up!');
    };
    this.timer.onTick(this.timer);

    this.registerView(VIEW_TYPE, (leaf) => new PomodoroView(leaf, this));
    this.addRibbonIcon('timer', 'Pomodoro', () => this.activateView());
    this.addCommand({ id: 'open', name: 'Open timer', callback: () => this.activateView() });
    this.addCommand({
      id: 'toggle',
      name: 'Start / pause',
      callback: () => (this.timer.running ? this.timer.pause() : this.timer.start()),
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
}
