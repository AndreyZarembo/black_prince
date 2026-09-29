# Black Prince Pomodoro — plugins

Общий движок и компактный UI (`core/`) + четыре хоста. Правило темы: все цвета — переменные `--pt-*`,
каждый хост маппит их на свои токены, поэтому плагин выглядит «родным» в любой теме.

| Папка | Хост | Тема берётся из |
|---|---|---|
| `core/` | — | нейтральные фолбэки (`currentColor` + `color-mix`) |
| `obsidian/` | Obsidian | `--interactive-accent`, `--text-normal`, … |
| `vscode/` | VS Code | `--vscode-button-background`, `--vscode-foreground`, … |
| `webext/` | Chrome (MV3) | `prefers-color-scheme` |
| `make-safari.sh` | Safari | тот же `webext/` через `safari-web-extension-converter` |

## Установка (локально)

**Obsidian**: скопируйте `obsidian/{manifest.json,main.js,styles.css}` в
`<vault>/.obsidian/plugins/black-prince-pomodoro/` и включите плагин в настройках.
Панель — иконка таймера в ленте или команда «Pomodoro: Open timer»; отсчёт виден в статус-баре.

**VS Code**: `cd vscode && npx --yes @vscode/vsce package` → `code --install-extension *.vsix`.
Либо для разработки: Open Folder → F5 (Extension Development Host).
Таймер живёт в extension host: статус-бар тикает даже при закрытой панели.

**Chrome**: `chrome://extensions` → Developer mode → Load unpacked → папка `webext/`.
Бейдж показывает оставшиеся минуты, уведомление придёт даже при закрытом попапе (chrome.alarms).

**Safari**: `./make-safari.sh` (нужен Xcode), затем собрать проект из `safari/` и включить
расширение в Safari → Настройки → Расширения.

## Правки ядра

Источник истины — `core/timer.js` и `core/ui.js`.
После правок: пересобрать Obsidian (`cd obsidian && npx esbuild main.src.js --bundle --format=cjs --external:obsidian --outfile=main.js`),
VS Code (`cd vscode && npx esbuild extension.src.js --bundle --format=cjs --platform=node --external:vscode --outfile=extension.js && cp media/panel.src.js media/panel.js`)
и webext (`cd webext && ./sync-core.sh`).
