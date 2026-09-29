const vscode = require('vscode');
const { PomodoroTimer } = require('../core/timer.js');

let timer, statusBar, panelView;

function pushState() {
  if (panelView) {
    panelView.webview.postMessage({
      type: 'state',
      display: timer.display,
      running: timer.running,
      caption: timer.caption,
      done: !timer.running && timer.remaining === 0,
    });
  }
}

function activate(context) {
  timer = new PomodoroTimer();
  statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 1000);
  statusBar.command = 'blackPrincePomodoro.toggle';
  statusBar.tooltip = 'Pomodoro: start / pause';
  context.subscriptions.push(statusBar);

  timer.onTick = () => {
    statusBar.text = '🍅 ' + timer.display;
    pushState();
  };
  timer.onFinish = () => {
    statusBar.text = '🍅 0:00';
    pushState();
    vscode.window.showInformationMessage('🍅 Time is up!');
  };
  timer.onTick();
  statusBar.show();

  context.subscriptions.push(
    vscode.commands.registerCommand('blackPrincePomodoro.toggle', () =>
      timer.running ? timer.pause() : timer.start(),
    ),
    vscode.commands.registerCommand('blackPrincePomodoro.reset', () => timer.reset()),
  );

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider('blackPrincePomodoro.panel', {
      resolveWebviewView(view) {
        panelView = view;
        view.webview.options = { enableScripts: true, localResourceRoots: [context.extensionUri] };
        const css = view.webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, 'media', 'panel.css'));
        const js = view.webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, 'media', 'panel.js'));
        view.webview.html = `<!doctype html><html><head>
          <meta charset="UTF-8">
          <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${view.webview.cspSource}; script-src ${view.webview.cspSource};">
          <link rel="stylesheet" href="${css}">
        </head><body><div id="app"></div><script src="${js}"></script></body></html>`;
        view.webview.onDidReceiveMessage((msg) => {
          if (msg.type === 'toggle') timer.running ? timer.pause() : timer.start();
          else if (msg.type === 'reset') timer.reset();
          else if (msg.type === 'minutes') timer.setMinutes(msg.value);
          else if (msg.type === 'until') timer.setUntil(msg.value);
          else if (msg.type === 'ready') pushState();
        });
        view.onDidDispose(() => { if (panelView === view) panelView = null; });
      },
    }),
  );
}

function deactivate() { if (timer) timer.dispose(); }

module.exports = { activate, deactivate };
