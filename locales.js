'use strict';

// Native names for the language selector
window.LANG_NAMES = {
  en: 'English',
  es: 'Español',
  de: 'Deutsch',
  fr: 'Français',
  pt: 'Português',
  ja: '日本語',
  ru: 'Русский',
  it: 'Italiano',
  nl: 'Nederlands',
  pl: 'Polski',
};

window.LOCALES = {

  en: {
    docTitle: 'Pomodoro Timer — customizable online tomato timer',
    theme: 'Theme', themeSystem: 'System', themeDark: 'Dark', themeLight: 'Light',
    preset: 'Preset', presetCustom: 'Custom',
    presets: { tomato: 'Tomato', night: 'Night', paper: 'Paper', ocean: 'Ocean', forest: 'Forest', lavender: 'Lavender', terminal: 'Terminal', sunset: 'Sunset', honey: 'Honey', graphite: 'Graphite', neon: 'Neon' },
    bg: 'Background', accent: 'Accent', font: 'Font', scale: 'Scale', language: 'Language',
    fonts: ['System', 'Monospace', 'Serif', 'Display', 'Digital', 'Pixel', 'Handwritten', 'Comic Sans', 'Segment (LCD)'],
    minutes: 'Minutes', untilTime: 'Until time',
    start: 'Start', pause: 'Pause', reset: 'Reset',
    minCaption: n => n + ' min',
    untilCaption: hm => 'until ' + hm,
    timeUp: '🍅 Time is up!',
    notifBody: c => c ? 'Timer: ' + c : 'Pomodoro finished',
    addTitle: 'Add custom duration',
    promptMinutes: 'Duration in minutes:',
    removeTitle: 'Remove',
    clickHint: 'Click — start / pause',
    minUnit: 'min', secUnit: 's',
    helpTitle: 'Help',
    helpHtml: `
<h2>Pomodoro Timer</h2>
<p><strong>Pomodoro</strong> is a focus technique: work in timed sprints (classically 25 minutes), then take a short break.</p>
<h3>Timer</h3>
<ul>
<li>Pick a duration in the <em>Minutes</em> row, or press <strong>+</strong> to add your own. Custom durations get a × to remove them.</li>
<li>The <em>Until time</em> buttons (xx:00, xx:15, xx:30, xx:45) count down to the nearest such moment — in the current hour if it is still ahead, otherwise in the next one — and start automatically.</li>
<li>Start or pause by clicking the big digits, pressing <strong>Space</strong>, or using the button. <em>Reset</em> returns to the full duration.</li>
<li>The subtle <strong>+10 / +1 / −10 / −1</strong> buttons above and below the digits nudge the timer — minutes on the left, seconds on the right — before start or on the fly.</li>
<li>When time is up the digits blink and a beep plays; if the tab is in the background you also get a browser notification (allow it on first start).</li>
</ul>
<h3>Appearance</h3>
<ul>
<li><em>Theme</em> follows your system by default, or force Dark / Light.</li>
<li><em>Preset</em> offers 11 color schemes; Background and Accent can be fine-tuned by hand.</li>
<li>9 fonts — including a real 7-segment LCD with dim unlit segments — and a timer scale from 75% to 150%.</li>
</ul>
<h3>Sharing</h3>
<p>Every setting is stored in the page URL as <code>?config=…</code>. Bookmark it or send the link — your exact setup opens anywhere.</p>
<h3>Install as an app</h3>
<p>The timer is a PWA and works offline. On iPhone/iPad: Share → <em>Add to Home Screen</em>. On Android: menu → <em>Install app</em>. On desktop Chrome: the install icon in the address bar.</p>`,
  },

  es: {
    docTitle: 'Temporizador Pomodoro — temporizador de tomate en línea personalizable',
    theme: 'Tema', themeSystem: 'Sistema', themeDark: 'Oscuro', themeLight: 'Claro',
    preset: 'Estilo', presetCustom: 'Propio',
    presets: { tomato: 'Tomate', night: 'Noche', paper: 'Papel', ocean: 'Océano', forest: 'Bosque', lavender: 'Lavanda', terminal: 'Terminal', sunset: 'Atardecer', honey: 'Miel', graphite: 'Grafito', neon: 'Neón' },
    bg: 'Fondo', accent: 'Acento', font: 'Fuente', scale: 'Escala', language: 'Idioma',
    fonts: ['Sistema', 'Monoespaciada', 'Serif', 'Display', 'Digital', 'Píxel', 'Manuscrita', 'Comic Sans', 'Segmentos (LCD)'],
    minutes: 'Minutos', untilTime: 'Hasta la hora',
    start: 'Iniciar', pause: 'Pausa', reset: 'Reiniciar',
    minCaption: n => n + ' min',
    untilCaption: hm => 'hasta las ' + hm,
    timeUp: '🍅 ¡Tiempo cumplido!',
    notifBody: c => c ? 'Temporizador: ' + c : 'Pomodoro terminado',
    addTitle: 'Añadir duración propia',
    promptMinutes: 'Duración en minutos:',
    removeTitle: 'Eliminar',
    clickHint: 'Clic — iniciar / pausar',
    minUnit: 'min', secUnit: 's',
    helpTitle: 'Ayuda',
    helpHtml: `
<h2>Temporizador Pomodoro</h2>
<p><strong>Pomodoro</strong> es una técnica de concentración: trabaja en intervalos cronometrados (clásicamente 25 minutos) y luego toma un breve descanso.</p>
<h3>Temporizador</h3>
<ul>
<li>Elige una duración en la fila <em>Minutos</em> o pulsa <strong>+</strong> para añadir la tuya. Las duraciones propias se eliminan con ×.</li>
<li>Los botones <em>Hasta la hora</em> (xx:00, xx:15, xx:30, xx:45) cuentan hasta el momento más cercano — en la hora actual si aún no ha pasado, o en la siguiente — y arrancan solos.</li>
<li>Inicia o pausa con un clic en los dígitos grandes, con <strong>Espacio</strong> o con el botón. <em>Reiniciar</em> vuelve a la duración completa.</li>
<li>Los discretos botones <strong>+10 / +1 / −10 / −1</strong> sobre y bajo los dígitos ajustan el tiempo — minutos a la izquierda, segundos a la derecha — antes de empezar o en marcha.</li>
<li>Al terminar, los dígitos parpadean y suena un aviso; si la pestaña está en segundo plano llega una notificación del navegador (permítela en el primer inicio).</li>
</ul>
<h3>Apariencia</h3>
<ul>
<li>El <em>Tema</em> sigue al sistema por defecto, o fija Oscuro / Claro.</li>
<li><em>Estilo</em> ofrece 11 esquemas de color; el fondo y el acento se ajustan a mano.</li>
<li>9 fuentes — incluida una LCD real de 7 segmentos con segmentos apagados tenues — y escala del 75% al 150%.</li>
</ul>
<h3>Compartir</h3>
<p>Cada ajuste se guarda en la URL como <code>?config=…</code>. Guárdala en favoritos o comparte el enlace: tu configuración exacta se abre en cualquier lugar.</p>
<h3>Instalar como aplicación</h3>
<p>El temporizador es una PWA y funciona sin conexión. En iPhone/iPad: Compartir → <em>Añadir a pantalla de inicio</em>. En Android: menú → <em>Instalar aplicación</em>. En Chrome de escritorio: el icono de instalación en la barra de direcciones.</p>`,
  },

  de: {
    docTitle: 'Pomodoro-Timer — anpassbarer Online-Tomaten-Timer',
    theme: 'Design', themeSystem: 'System', themeDark: 'Dunkel', themeLight: 'Hell',
    preset: 'Vorlage', presetCustom: 'Eigenes',
    presets: { tomato: 'Tomate', night: 'Nacht', paper: 'Papier', ocean: 'Ozean', forest: 'Wald', lavender: 'Lavendel', terminal: 'Terminal', sunset: 'Abendrot', honey: 'Honig', graphite: 'Graphit', neon: 'Neon' },
    bg: 'Hintergrund', accent: 'Akzent', font: 'Schrift', scale: 'Größe', language: 'Sprache',
    fonts: ['System', 'Monospace', 'Serifen', 'Display', 'Digital', 'Pixel', 'Handschrift', 'Comic Sans', 'Segment (LCD)'],
    minutes: 'Minuten', untilTime: 'Bis Uhrzeit',
    start: 'Start', pause: 'Pause', reset: 'Zurücksetzen',
    minCaption: n => n + ' Min',
    untilCaption: hm => 'bis ' + hm,
    timeUp: '🍅 Die Zeit ist um!',
    notifBody: c => c ? 'Timer: ' + c : 'Pomodoro beendet',
    addTitle: 'Eigene Dauer hinzufügen',
    promptMinutes: 'Dauer in Minuten:',
    removeTitle: 'Entfernen',
    clickHint: 'Klick — Start / Pause',
    minUnit: 'Min', secUnit: 's',
    helpTitle: 'Hilfe',
    helpHtml: `
<h2>Pomodoro-Timer</h2>
<p><strong>Pomodoro</strong> ist eine Fokustechnik: Arbeite in getakteten Sprints (klassisch 25 Minuten) und mach dann eine kurze Pause.</p>
<h3>Timer</h3>
<ul>
<li>Wähle eine Dauer in der Zeile <em>Minuten</em> oder füge mit <strong>+</strong> eine eigene hinzu. Eigene Dauern lassen sich per × entfernen.</li>
<li>Die <em>Bis Uhrzeit</em>-Knöpfe (xx:00, xx:15, xx:30, xx:45) zählen bis zum nächsten solchen Zeitpunkt — in der aktuellen Stunde, falls noch bevorstehend, sonst in der nächsten — und starten automatisch.</li>
<li>Start und Pause per Klick auf die großen Ziffern, mit der <strong>Leertaste</strong> oder dem Knopf. <em>Zurücksetzen</em> stellt die volle Dauer wieder her.</li>
<li>Die dezenten Knöpfe <strong>+10 / +1 / −10 / −1</strong> über und unter den Ziffern justieren den Timer — links Minuten, rechts Sekunden — vor dem Start oder mittendrin.</li>
<li>Ist die Zeit um, blinken die Ziffern und ein Ton erklingt; ist der Tab im Hintergrund, kommt zusätzlich eine Browser-Benachrichtigung (beim ersten Start erlauben).</li>
</ul>
<h3>Aussehen</h3>
<ul>
<li>Das <em>Design</em> folgt standardmäßig dem System, oder wähle fest Dunkel / Hell.</li>
<li><em>Vorlage</em> bietet 11 Farbschemata; Hintergrund und Akzent lassen sich von Hand feinjustieren.</li>
<li>9 Schriften — darunter eine echte 7-Segment-LCD mit schwach sichtbaren inaktiven Segmenten — und eine Skala von 75% bis 150%.</li>
</ul>
<h3>Teilen</h3>
<p>Jede Einstellung steckt in der URL als <code>?config=…</code>. Als Lesezeichen speichern oder den Link teilen — die exakte Konfiguration öffnet sich überall.</p>
<h3>Als App installieren</h3>
<p>Der Timer ist eine PWA und funktioniert offline. iPhone/iPad: Teilen → <em>Zum Home-Bildschirm</em>. Android: Menü → <em>App installieren</em>. Desktop-Chrome: das Installationssymbol in der Adressleiste.</p>`,
  },

  fr: {
    docTitle: 'Minuteur Pomodoro — minuteur tomate en ligne personnalisable',
    theme: 'Thème', themeSystem: 'Système', themeDark: 'Sombre', themeLight: 'Clair',
    preset: 'Préréglage', presetCustom: 'Personnalisé',
    presets: { tomato: 'Tomate', night: 'Nuit', paper: 'Papier', ocean: 'Océan', forest: 'Forêt', lavender: 'Lavande', terminal: 'Terminal', sunset: 'Coucher de soleil', honey: 'Miel', graphite: 'Graphite', neon: 'Néon' },
    bg: 'Fond', accent: 'Accent', font: 'Police', scale: 'Échelle', language: 'Langue',
    fonts: ['Système', 'Monospace', 'Serif', 'Display', 'Numérique', 'Pixel', 'Manuscrite', 'Comic Sans', 'Segments (LCD)'],
    minutes: 'Minutes', untilTime: 'Jusqu’à l’heure',
    start: 'Démarrer', pause: 'Pause', reset: 'Réinitialiser',
    minCaption: n => n + ' min',
    untilCaption: hm => 'jusqu’à ' + hm,
    timeUp: '🍅 Temps écoulé !',
    notifBody: c => c ? 'Minuteur : ' + c : 'Pomodoro terminé',
    addTitle: 'Ajouter une durée personnalisée',
    promptMinutes: 'Durée en minutes :',
    removeTitle: 'Supprimer',
    clickHint: 'Clic — démarrer / pause',
    minUnit: 'min', secUnit: 's',
    helpTitle: 'Aide',
    helpHtml: `
<h2>Minuteur Pomodoro</h2>
<p><strong>Pomodoro</strong> est une technique de concentration : travaillez par sprints chronométrés (classiquement 25 minutes), puis faites une courte pause.</p>
<h3>Minuteur</h3>
<ul>
<li>Choisissez une durée dans la ligne <em>Minutes</em>, ou appuyez sur <strong>+</strong> pour ajouter la vôtre. Les durées personnalisées se suppriment avec ×.</li>
<li>Les boutons <em>Jusqu’à l’heure</em> (xx:00, xx:15, xx:30, xx:45) décomptent jusqu’au prochain moment de ce type — dans l’heure en cours s’il est encore à venir, sinon dans la suivante — et démarrent automatiquement.</li>
<li>Démarrez ou mettez en pause d’un clic sur les grands chiffres, avec <strong>Espace</strong> ou le bouton. <em>Réinitialiser</em> rétablit la durée complète.</li>
<li>Les discrets boutons <strong>+10 / +1 / −10 / −1</strong> au-dessus et en dessous des chiffres ajustent le minuteur — minutes à gauche, secondes à droite — avant le départ ou en cours de route.</li>
<li>Quand le temps est écoulé, les chiffres clignotent et un bip retentit ; si l’onglet est en arrière-plan, une notification du navigateur arrive aussi (autorisez-la au premier démarrage).</li>
</ul>
<h3>Apparence</h3>
<ul>
<li>Le <em>Thème</em> suit le système par défaut, ou forcez Sombre / Clair.</li>
<li><em>Préréglage</em> propose 11 palettes ; le fond et l’accent se règlent à la main.</li>
<li>9 polices — dont un vrai LCD 7 segments avec segments éteints estompés — et une échelle de 75% à 150%.</li>
</ul>
<h3>Partager</h3>
<p>Chaque réglage est stocké dans l’URL sous <code>?config=…</code>. Mettez-la en favori ou partagez le lien — votre configuration exacte s’ouvre partout.</p>
<h3>Installer comme application</h3>
<p>Le minuteur est une PWA et fonctionne hors ligne. Sur iPhone/iPad : Partager → <em>Sur l’écran d’accueil</em>. Sur Android : menu → <em>Installer l’application</em>. Sur Chrome de bureau : l’icône d’installation dans la barre d’adresse.</p>`,
  },

  pt: {
    docTitle: 'Temporizador Pomodoro — timer de tomate online personalizável',
    theme: 'Tema', themeSystem: 'Sistema', themeDark: 'Escuro', themeLight: 'Claro',
    preset: 'Predefinição', presetCustom: 'Próprio',
    presets: { tomato: 'Tomate', night: 'Noite', paper: 'Papel', ocean: 'Oceano', forest: 'Floresta', lavender: 'Lavanda', terminal: 'Terminal', sunset: 'Pôr do sol', honey: 'Mel', graphite: 'Grafite', neon: 'Néon' },
    bg: 'Fundo', accent: 'Destaque', font: 'Fonte', scale: 'Escala', language: 'Idioma',
    fonts: ['Sistema', 'Monoespaçada', 'Serifada', 'Display', 'Digital', 'Pixel', 'Manuscrita', 'Comic Sans', 'Segmentos (LCD)'],
    minutes: 'Minutos', untilTime: 'Até a hora',
    start: 'Iniciar', pause: 'Pausar', reset: 'Reiniciar',
    minCaption: n => n + ' min',
    untilCaption: hm => 'até ' + hm,
    timeUp: '🍅 O tempo acabou!',
    notifBody: c => c ? 'Timer: ' + c : 'Pomodoro concluído',
    addTitle: 'Adicionar duração própria',
    promptMinutes: 'Duração em minutos:',
    removeTitle: 'Remover',
    clickHint: 'Clique — iniciar / pausar',
    minUnit: 'min', secUnit: 's',
    helpTitle: 'Ajuda',
    helpHtml: `
<h2>Temporizador Pomodoro</h2>
<p><strong>Pomodoro</strong> é uma técnica de foco: trabalhe em intervalos cronometrados (classicamente 25 minutos) e depois faça uma pausa curta.</p>
<h3>Temporizador</h3>
<ul>
<li>Escolha uma duração na linha <em>Minutos</em> ou toque em <strong>+</strong> para adicionar a sua. Durações próprias podem ser removidas com ×.</li>
<li>Os botões <em>Até a hora</em> (xx:00, xx:15, xx:30, xx:45) contam até o momento mais próximo — na hora atual, se ainda estiver por vir, senão na seguinte — e iniciam sozinhos.</li>
<li>Inicie ou pause clicando nos dígitos grandes, com <strong>Espaço</strong> ou pelo botão. <em>Reiniciar</em> volta à duração completa.</li>
<li>Os discretos botões <strong>+10 / +1 / −10 / −1</strong> acima e abaixo dos dígitos ajustam o timer — minutos à esquerda, segundos à direita — antes de começar ou em andamento.</li>
<li>Quando o tempo acaba, os dígitos piscam e soa um aviso; com a aba em segundo plano chega também uma notificação do navegador (permita no primeiro início).</li>
</ul>
<h3>Aparência</h3>
<ul>
<li>O <em>Tema</em> segue o sistema por padrão, ou fixe Escuro / Claro.</li>
<li><em>Predefinição</em> traz 11 esquemas de cores; fundo e destaque podem ser ajustados manualmente.</li>
<li>9 fontes — incluindo um LCD real de 7 segmentos com segmentos apagados sutis — e escala de 75% a 150%.</li>
</ul>
<h3>Compartilhar</h3>
<p>Cada ajuste fica na URL como <code>?config=…</code>. Salve nos favoritos ou envie o link — sua configuração exata abre em qualquer lugar.</p>
<h3>Instalar como aplicativo</h3>
<p>O timer é um PWA e funciona offline. No iPhone/iPad: Compartilhar → <em>Adicionar à Tela de Início</em>. No Android: menu → <em>Instalar app</em>. No Chrome de desktop: o ícone de instalação na barra de endereço.</p>`,
  },

  ja: {
    docTitle: 'ポモドーロタイマー — カスタマイズできるオンラインタイマー',
    theme: 'テーマ', themeSystem: 'システム', themeDark: 'ダーク', themeLight: 'ライト',
    preset: 'プリセット', presetCustom: 'カスタム',
    presets: { tomato: 'トマト', night: 'ナイト', paper: 'ペーパー', ocean: 'オーシャン', forest: 'フォレスト', lavender: 'ラベンダー', terminal: 'ターミナル', sunset: 'サンセット', honey: 'ハニー', graphite: 'グラファイト', neon: 'ネオン' },
    bg: '背景', accent: 'アクセント', font: 'フォント', scale: 'サイズ', language: '言語',
    fonts: ['システム', '等幅', 'セリフ', 'ディスプレイ', 'デジタル', 'ピクセル', '手書き', 'Comic Sans', 'セグメント (LCD)'],
    minutes: '分', untilTime: '指定時刻まで',
    start: '開始', pause: '一時停止', reset: 'リセット',
    minCaption: n => n + '分',
    untilCaption: hm => hm + ' まで',
    timeUp: '🍅 時間です！',
    notifBody: c => c ? 'タイマー: ' + c : 'ポモドーロ終了',
    addTitle: 'カスタム時間を追加',
    promptMinutes: '時間（分）を入力:',
    removeTitle: '削除',
    clickHint: 'クリックで開始 / 一時停止',
    minUnit: '分', secUnit: '秒',
    helpTitle: 'ヘルプ',
    helpHtml: `
<h2>ポモドーロタイマー</h2>
<p><strong>ポモドーロ</strong>は集中のためのテクニックです。時間を区切って作業し（基本は25分）、短い休憩を挟みます。</p>
<h3>タイマー</h3>
<ul>
<li><em>分</em>の列から時間を選ぶか、<strong>+</strong>で独自の時間を追加できます。追加した時間は × で削除できます。</li>
<li><em>指定時刻まで</em>のボタン（xx:00、xx:15、xx:30、xx:45）は、直近のその時刻（今の時間内にまだ来ていなければ今の時間、過ぎていれば次の時間）までカウントダウンし、自動的に開始します。</li>
<li>大きな数字のクリック、<strong>スペースキー</strong>、またはボタンで開始・一時停止。<em>リセット</em>で元の時間に戻ります。</li>
<li>数字の上下にある控えめな <strong>+10 / +1 / −10 / −1</strong> ボタンで時間を微調整できます — 左が分、右が秒。開始前でも動作中でも使えます。</li>
<li>時間になると数字が点滅して音が鳴ります。タブがバックグラウンドならブラウザ通知も届きます（初回開始時に許可してください）。</li>
</ul>
<h3>外観</h3>
<ul>
<li><em>テーマ</em>は標準でシステム設定に従い、ダーク／ライトに固定もできます。</li>
<li><em>プリセット</em>には11のカラースキームがあり、背景とアクセントは手動でも調整できます。</li>
<li>フォントは9種類 — 本物の7セグメントLCD（消灯セグメントがうっすら見える）を含む — サイズは75%〜150%。</li>
</ul>
<h3>共有</h3>
<p>すべての設定はURLの <code>?config=…</code> に保存されます。ブックマークやリンクの共有で、同じ設定がどこでも開きます。</p>
<h3>アプリとしてインストール</h3>
<p>このタイマーはPWAで、オフラインでも動きます。iPhone/iPad: 共有 → <em>ホーム画面に追加</em>。Android: メニュー → <em>アプリをインストール</em>。PCのChrome: アドレスバーのインストールアイコン。</p>`,
  },

  ru: {
    docTitle: 'Pomodoro таймер онлайн — настраиваемый таймер помидора',
    theme: 'Тема', themeSystem: 'Системная', themeDark: 'Тёмная', themeLight: 'Светлая',
    preset: 'Пресет', presetCustom: 'Свой',
    presets: { tomato: 'Помидор', night: 'Ночь', paper: 'Бумага', ocean: 'Океан', forest: 'Лес', lavender: 'Лаванда', terminal: 'Терминал', sunset: 'Закат', honey: 'Мёд', graphite: 'Графит', neon: 'Неон' },
    bg: 'Фон', accent: 'Акцент', font: 'Шрифт', scale: 'Масштаб', language: 'Язык',
    fonts: ['Системный', 'Моноширинный', 'С засечками', 'Дисплейный', 'Цифровой', 'Пиксельный', 'Рукописный', 'Comic Sans', 'Сегментный (LCD)'],
    minutes: 'Минуты', untilTime: 'До времени',
    start: 'Старт', pause: 'Пауза', reset: 'Сброс',
    minCaption: n => n + ' мин',
    untilCaption: hm => 'до ' + hm,
    timeUp: '🍅 Время вышло!',
    notifBody: c => c ? 'Таймер: ' + c : 'Pomodoro завершён',
    addTitle: 'Добавить своё время',
    promptMinutes: 'Длительность в минутах:',
    removeTitle: 'Удалить',
    clickHint: 'Клик — старт / пауза',
    minUnit: 'мин', secUnit: 'с',
    helpTitle: 'Справка',
    helpHtml: `
<h2>Pomodoro таймер</h2>
<p><strong>Pomodoro</strong> — техника концентрации: работайте спринтами по таймеру (классика — 25 минут), затем короткий перерыв.</p>
<h3>Таймер</h3>
<ul>
<li>Выберите длительность в ряду <em>Минуты</em> или нажмите <strong>+</strong>, чтобы добавить свою. Свои значения удаляются крестиком.</li>
<li>Кнопки <em>До времени</em> (xx:00, xx:15, xx:30, xx:45) ставят отсчёт до ближайшей такой отметки — текущего часа, если она ещё впереди, иначе следующего — и запускаются сами.</li>
<li>Старт и пауза — клик по большим цифрам, клавиша <strong>Пробел</strong> или кнопка. <em>Сброс</em> возвращает полную длительность.</li>
<li>Неприметные кнопки <strong>+10 / +1 / −10 / −1</strong> над и под цифрами подстраивают таймер — слева минуты, справа секунды — до старта или прямо на ходу.</li>
<li>По окончании цифры мигают и звучит сигнал; если вкладка в фоне — придёт браузерное уведомление (разрешите его при первом старте).</li>
</ul>
<h3>Внешний вид</h3>
<ul>
<li><em>Тема</em> по умолчанию следует за системой, можно зафиксировать тёмную или светлую.</li>
<li><em>Пресет</em> — 11 цветовых схем; фон и акцент настраиваются вручную.</li>
<li>9 шрифтов — включая настоящий семисегментный LCD с погасшими сегментами — и масштаб таймера от 75% до 150%.</li>
</ul>
<h3>Поделиться</h3>
<p>Все настройки хранятся в адресе страницы как <code>?config=…</code>. Сохраните в закладки или отправьте ссылку — ваша конфигурация откроется где угодно.</p>
<h3>Установить как приложение</h3>
<p>Таймер — это PWA и работает офлайн. На iPhone/iPad: Поделиться → <em>На экран «Домой»</em>. На Android: меню → <em>Установить приложение</em>. В Chrome на компьютере — значок установки в адресной строке.</p>`,
  },

  it: {
    docTitle: 'Timer Pomodoro — timer del pomodoro online personalizzabile',
    theme: 'Tema', themeSystem: 'Sistema', themeDark: 'Scuro', themeLight: 'Chiaro',
    preset: 'Preset', presetCustom: 'Personale',
    presets: { tomato: 'Pomodoro', night: 'Notte', paper: 'Carta', ocean: 'Oceano', forest: 'Foresta', lavender: 'Lavanda', terminal: 'Terminale', sunset: 'Tramonto', honey: 'Miele', graphite: 'Grafite', neon: 'Neon' },
    bg: 'Sfondo', accent: 'Accento', font: 'Carattere', scale: 'Scala', language: 'Lingua',
    fonts: ['Sistema', 'Monospazio', 'Serif', 'Display', 'Digitale', 'Pixel', 'Corsivo a mano', 'Comic Sans', 'Segmenti (LCD)'],
    minutes: 'Minuti', untilTime: 'Fino alle',
    start: 'Avvia', pause: 'Pausa', reset: 'Azzera',
    minCaption: n => n + ' min',
    untilCaption: hm => 'fino alle ' + hm,
    timeUp: '🍅 Tempo scaduto!',
    notifBody: c => c ? 'Timer: ' + c : 'Pomodoro completato',
    addTitle: 'Aggiungi durata personale',
    promptMinutes: 'Durata in minuti:',
    removeTitle: 'Rimuovi',
    clickHint: 'Clic — avvia / pausa',
    minUnit: 'min', secUnit: 's',
    helpTitle: 'Guida',
    helpHtml: `
<h2>Timer Pomodoro</h2>
<p><strong>Pomodoro</strong> è una tecnica di concentrazione: lavora a sprint cronometrati (classicamente 25 minuti), poi fai una breve pausa.</p>
<h3>Timer</h3>
<ul>
<li>Scegli una durata nella riga <em>Minuti</em> o premi <strong>+</strong> per aggiungerne una tua. Le durate personali si rimuovono con ×.</li>
<li>I pulsanti <em>Fino alle</em> (xx:00, xx:15, xx:30, xx:45) contano fino al momento più vicino — nell’ora corrente se deve ancora arrivare, altrimenti nella successiva — e partono da soli.</li>
<li>Avvia o metti in pausa cliccando sulle grandi cifre, con la <strong>barra spaziatrice</strong> o col pulsante. <em>Azzera</em> ripristina la durata completa.</li>
<li>I discreti pulsanti <strong>+10 / +1 / −10 / −1</strong> sopra e sotto le cifre regolano il timer — minuti a sinistra, secondi a destra — prima dell’avvio o al volo.</li>
<li>Allo scadere le cifre lampeggiano e suona un segnale; se la scheda è in secondo piano arriva anche una notifica del browser (consentila al primo avvio).</li>
</ul>
<h3>Aspetto</h3>
<ul>
<li>Il <em>Tema</em> segue il sistema per impostazione predefinita, oppure fissa Scuro / Chiaro.</li>
<li><em>Preset</em> offre 11 schemi di colore; sfondo e accento si regolano a mano.</li>
<li>9 caratteri — incluso un vero LCD a 7 segmenti con segmenti spenti appena visibili — e scala dal 75% al 150%.</li>
</ul>
<h3>Condividere</h3>
<p>Ogni impostazione è salvata nell’URL come <code>?config=…</code>. Aggiungila ai preferiti o condividi il link: la tua configurazione esatta si apre ovunque.</p>
<h3>Installare come app</h3>
<p>Il timer è una PWA e funziona offline. Su iPhone/iPad: Condividi → <em>Aggiungi alla schermata Home</em>. Su Android: menu → <em>Installa app</em>. Su Chrome desktop: l’icona di installazione nella barra degli indirizzi.</p>`,
  },

  nl: {
    docTitle: 'Pomodoro-timer — aanpasbare online tomaat-timer',
    theme: 'Thema', themeSystem: 'Systeem', themeDark: 'Donker', themeLight: 'Licht',
    preset: 'Preset', presetCustom: 'Eigen',
    presets: { tomato: 'Tomaat', night: 'Nacht', paper: 'Papier', ocean: 'Oceaan', forest: 'Bos', lavender: 'Lavendel', terminal: 'Terminal', sunset: 'Zonsondergang', honey: 'Honing', graphite: 'Grafiet', neon: 'Neon' },
    bg: 'Achtergrond', accent: 'Accent', font: 'Lettertype', scale: 'Schaal', language: 'Taal',
    fonts: ['Systeem', 'Monospace', 'Serif', 'Display', 'Digitaal', 'Pixel', 'Handschrift', 'Comic Sans', 'Segment (LCD)'],
    minutes: 'Minuten', untilTime: 'Tot tijdstip',
    start: 'Start', pause: 'Pauze', reset: 'Reset',
    minCaption: n => n + ' min',
    untilCaption: hm => 'tot ' + hm,
    timeUp: '🍅 De tijd is om!',
    notifBody: c => c ? 'Timer: ' + c : 'Pomodoro voltooid',
    addTitle: 'Eigen duur toevoegen',
    promptMinutes: 'Duur in minuten:',
    removeTitle: 'Verwijderen',
    clickHint: 'Klik — start / pauze',
    minUnit: 'min', secUnit: 's',
    helpTitle: 'Hulp',
    helpHtml: `
<h2>Pomodoro-timer</h2>
<p><strong>Pomodoro</strong> is een focustechniek: werk in getimede sprints (klassiek 25 minuten) en neem daarna een korte pauze.</p>
<h3>Timer</h3>
<ul>
<li>Kies een duur in de rij <em>Minuten</em>, of druk op <strong>+</strong> om een eigen duur toe te voegen. Eigen duren verwijder je met ×.</li>
<li>De knoppen <em>Tot tijdstip</em> (xx:00, xx:15, xx:30, xx:45) tellen af tot het dichtstbijzijnde moment — in het huidige uur als dat nog komt, anders in het volgende — en starten vanzelf.</li>
<li>Start of pauzeer met een klik op de grote cijfers, met de <strong>spatiebalk</strong> of de knop. <em>Reset</em> herstelt de volledige duur.</li>
<li>De subtiele knoppen <strong>+10 / +1 / −10 / −1</strong> boven en onder de cijfers stellen de timer bij — links minuten, rechts seconden — vóór de start of onderweg.</li>
<li>Als de tijd om is, knipperen de cijfers en klinkt een piep; staat het tabblad op de achtergrond, dan krijg je ook een browsermelding (sta die toe bij de eerste start).</li>
</ul>
<h3>Uiterlijk</h3>
<ul>
<li>Het <em>Thema</em> volgt standaard je systeem, of kies vast Donker / Licht.</li>
<li><em>Preset</em> biedt 11 kleurenschema’s; achtergrond en accent zijn handmatig bij te stellen.</li>
<li>9 lettertypen — waaronder een echte 7-segments-LCD met vaag zichtbare gedoofde segmenten — en een schaal van 75% tot 150%.</li>
</ul>
<h3>Delen</h3>
<p>Elke instelling zit in de URL als <code>?config=…</code>. Zet hem bij je favorieten of deel de link — jouw exacte configuratie opent overal.</p>
<h3>Als app installeren</h3>
<p>De timer is een PWA en werkt offline. Op iPhone/iPad: Delen → <em>Zet op beginscherm</em>. Op Android: menu → <em>App installeren</em>. In desktop-Chrome: het installatie-icoon in de adresbalk.</p>`,
  },

  pl: {
    docTitle: 'Timer Pomodoro — konfigurowalny internetowy timer pomidorowy',
    theme: 'Motyw', themeSystem: 'Systemowy', themeDark: 'Ciemny', themeLight: 'Jasny',
    preset: 'Zestaw', presetCustom: 'Własny',
    presets: { tomato: 'Pomidor', night: 'Noc', paper: 'Papier', ocean: 'Ocean', forest: 'Las', lavender: 'Lawenda', terminal: 'Terminal', sunset: 'Zachód słońca', honey: 'Miód', graphite: 'Grafit', neon: 'Neon' },
    bg: 'Tło', accent: 'Akcent', font: 'Czcionka', scale: 'Skala', language: 'Język',
    fonts: ['Systemowa', 'Monospace', 'Szeryfowa', 'Display', 'Cyfrowa', 'Pikselowa', 'Odręczna', 'Comic Sans', 'Segmentowa (LCD)'],
    minutes: 'Minuty', untilTime: 'Do godziny',
    start: 'Start', pause: 'Pauza', reset: 'Reset',
    minCaption: n => n + ' min',
    untilCaption: hm => 'do ' + hm,
    timeUp: '🍅 Czas minął!',
    notifBody: c => c ? 'Timer: ' + c : 'Pomodoro zakończone',
    addTitle: 'Dodaj własny czas',
    promptMinutes: 'Czas w minutach:',
    removeTitle: 'Usuń',
    clickHint: 'Klik — start / pauza',
    minUnit: 'min', secUnit: 's',
    helpTitle: 'Pomoc',
    helpHtml: `
<h2>Timer Pomodoro</h2>
<p><strong>Pomodoro</strong> to technika koncentracji: pracuj w odmierzanych sprintach (klasycznie 25 minut), a potem zrób krótką przerwę.</p>
<h3>Timer</h3>
<ul>
<li>Wybierz czas w rzędzie <em>Minuty</em> lub naciśnij <strong>+</strong>, aby dodać własny. Własne czasy usuwa się krzyżykiem ×.</li>
<li>Przyciski <em>Do godziny</em> (xx:00, xx:15, xx:30, xx:45) odliczają do najbliższego takiego momentu — w bieżącej godzinie, jeśli jeszcze nadejdzie, w przeciwnym razie w następnej — i startują same.</li>
<li>Start i pauza — kliknięcie w duże cyfry, <strong>spacja</strong> lub przycisk. <em>Reset</em> przywraca pełny czas.</li>
<li>Dyskretne przyciski <strong>+10 / +1 / −10 / −1</strong> nad i pod cyframi korygują timer — po lewej minuty, po prawej sekundy — przed startem lub w trakcie.</li>
<li>Gdy czas minie, cyfry migają i rozlega się sygnał; jeśli karta jest w tle, przyjdzie też powiadomienie przeglądarki (zezwól na nie przy pierwszym starcie).</li>
</ul>
<h3>Wygląd</h3>
<ul>
<li><em>Motyw</em> domyślnie podąża za systemem, można też ustawić na stałe ciemny / jasny.</li>
<li><em>Zestaw</em> to 11 schematów kolorów; tło i akcent można dostroić ręcznie.</li>
<li>9 czcionek — w tym prawdziwy 7-segmentowy LCD z ledwo widocznymi zgaszonymi segmentami — i skala od 75% do 150%.</li>
</ul>
<h3>Udostępnianie</h3>
<p>Każde ustawienie jest zapisane w adresie URL jako <code>?config=…</code>. Dodaj do zakładek lub wyślij link — twoja dokładna konfiguracja otworzy się wszędzie.</p>
<h3>Instalacja jako aplikacja</h3>
<p>Timer to PWA i działa offline. Na iPhone/iPad: Udostępnij → <em>Do ekranu początkowego</em>. Na Androidzie: menu → <em>Zainstaluj aplikację</em>. W Chrome na komputerze: ikona instalacji w pasku adresu.</p>`,
  },

};
