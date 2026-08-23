#!/usr/bin/env node
// Сборка языковых страниц из index.html (шаблон, английский корень) и locales.js.
//   node build_locales.mjs
// Для каждого языка запекаются: <html lang>, title/description/Open Graph, canonical,
// JSON-LD, статические подписи интерфейса и видимая SEO-секция с описанием
// (h1 + текст справки), чтобы поисковик видел контент без JavaScript.
// Корень (en) перезаписывается на месте, остальные — в <lang>/index.html.
// Генерируется также sitemap.xml с hreflang-альтернативами.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = dirname(fileURLToPath(import.meta.url));
const BASE_URL = 'https://andreyzarembo.github.io/black_prince/';

// locales.js — обычный браузерный скрипт, исполняем его в песочнице
const sandbox = { window: {} };
vm.runInNewContext(readFileSync(join(root, 'locales.js'), 'utf8'), sandbox);
const LOCALES = sandbox.window.LOCALES;

const META = {
  en: { og: 'en_US', desc: 'Free Pomodoro timer: 5–120 minute presets, count down to a set time, 11 color themes, 9 fonts including a 7-segment LCD, notifications. Available in 10 languages. Settings live in the shareable URL. Works on desktop and mobile.' },
  es: { og: 'es_ES', desc: 'Temporizador Pomodoro gratuito: intervalos de 5–120 minutos, cuenta atrás hasta una hora dada, 11 temas de color, 9 fuentes incluida una LCD de 7 segmentos, notificaciones. Los ajustes viven en el enlace. Para ordenador y móvil.' },
  de: { og: 'de_DE', desc: 'Kostenloser Pomodoro-Timer: Intervalle von 5–120 Minuten, Countdown bis zu einer Uhrzeit, 11 Farbthemen, 9 Schriften inklusive 7-Segment-LCD, Benachrichtigungen. Einstellungen stecken im Link. Für Desktop und Handy.' },
  fr: { og: 'fr_FR', desc: 'Minuteur Pomodoro gratuit : intervalles de 5 à 120 minutes, compte à rebours jusqu’à une heure donnée, 11 thèmes de couleurs, 9 polices dont un LCD 7 segments, notifications. Les réglages vivent dans le lien. Pour ordinateur et mobile.' },
  pt: { og: 'pt_BR', desc: 'Temporizador Pomodoro gratuito: intervalos de 5–120 minutos, contagem até uma hora definida, 11 temas de cores, 9 fontes incluindo LCD de 7 segmentos, notificações. As configurações ficam no link. Para desktop e celular.' },
  ja: { og: 'ja_JP', desc: '無料のポモドーロタイマー。5〜120分のプリセット、指定時刻までのカウントダウン、11のカラーテーマ、7セグメントLCDを含む9つのフォント、通知に対応。設定はURLに保存され、PCでもスマホでも使えます。' },
  ru: { og: 'ru_RU', desc: 'Бесплатный Pomodoro-таймер: пресеты 5–120 минут, таймер до заданного времени, 11 цветовых тем, 9 шрифтов включая сегментный LCD, уведомления. Настройки сохраняются в ссылке. Работает на ПК и телефоне.' },
  it: { og: 'it_IT', desc: 'Timer Pomodoro gratuito: intervalli da 5 a 120 minuti, conto alla rovescia fino a un orario, 11 temi colore, 9 caratteri incluso un LCD a 7 segmenti, notifiche. Le impostazioni vivono nel link. Per desktop e mobile.' },
  nl: { og: 'nl_NL', desc: 'Gratis Pomodoro-timer: intervallen van 5–120 minuten, aftellen tot een tijdstip, 11 kleurthema’s, 9 lettertypen waaronder 7-segments-LCD, meldingen. Instellingen zitten in de link. Voor desktop en mobiel.' },
  pl: { og: 'pl_PL', desc: 'Darmowy timer Pomodoro: interwały 5–120 minut, odliczanie do wskazanej godziny, 11 motywów kolorów, 9 czcionek w tym 7-segmentowy LCD, powiadomienia. Ustawienia mieszkają w linku. Na komputer i telefon.' },
};

const template = readFileSync(join(root, 'index.html'), 'utf8');
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function subOnce(html, pattern, replacement) {
  const m = html.match(pattern);
  if (!m) throw new Error(`pattern not found: ${pattern}`);
  return html.replace(pattern, replacement);
}

function build(code) {
  const s = LOCALES[code];
  const meta = META[code];
  const url = code === 'en' ? BASE_URL : `${BASE_URL}${code}/`;
  let h = template;

  // <head>
  h = subOnce(h, /<html lang="[a-z]+">/, `<html lang="${code}">`);
  h = subOnce(h, /<title>[^<]*<\/title>/, `<title>${esc(s.docTitle)}</title>`);
  h = subOnce(h, /(<meta name="description" content=")[^"]*(">)/, `$1${esc(meta.desc)}$2`);
  h = subOnce(h, /(<link rel="canonical" href=")[^"]*(">)/, `$1${url}$2`);
  h = subOnce(h, /(<meta property="og:title" content=")[^"]*(">)/, `$1${esc(s.docTitle)}$2`);
  h = subOnce(h, /(<meta property="og:description" content=")[^"]*(">)/, `$1${esc(meta.desc)}$2`);
  h = subOnce(h, /(<meta property="og:url" content=")[^"]*(">)/, `$1${url}$2`);
  h = subOnce(h, /(<meta property="og:locale" content=")[^"]*(">)/, `$1${meta.og}$2`);

  // JSON-LD на языке страницы
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: s.docTitle,
    url,
    description: meta.desc,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript',
    inLanguage: code,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };
  h = subOnce(
    h,
    /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
    `<script type="application/ld+json">\n${JSON.stringify(ld, null, 2)}\n</script>`,
  );

  // Статические подписи интерфейса
  const label = (id, text) => { h = subOnce(h, new RegExp(`(<span id="${id}">)[^<]*(</span>)`), `$1${esc(text)}$2`); };
  label('labelTheme', s.theme); label('labelPreset', s.preset); label('labelBg', s.bg);
  label('labelAccent', s.accent); label('labelFont', s.font); label('labelScale', s.scale);
  label('labelLang', s.language);
  h = subOnce(h, /(<div class="row-label" id="labelMinutes">)[^<]*(<\/div>)/, `$1${esc(s.minutes)}$2`);
  h = subOnce(h, /(<div class="row-label" id="labelUntil">)[^<]*(<\/div>)/, `$1${esc(s.untilTime)}$2`);
  h = subOnce(h, /(<option value="system">)[^<]*(<\/option>)/, `$1${esc(s.themeSystem)}$2`);
  h = subOnce(h, /(<option value="dark">)[^<]*(<\/option>)/, `$1${esc(s.themeDark)}$2`);
  h = subOnce(h, /(<option value="light">)[^<]*(<\/option>)/, `$1${esc(s.themeLight)}$2`);
  h = subOnce(h, /(<select id="preset">\s*<option value="">)[^<]*(<\/option>)/, `$1${esc(s.presetCustom)}$2`);
  s.fonts.forEach((name, i) => {
    h = subOnce(h, new RegExp(`(<option value="${i}">)[^<]*(</option>)`), `$1${esc(name)}$2`);
  });
  h = subOnce(h, /(<button class="primary" id="startBtn">)[^<]*(<\/button>)/, `$1${esc(s.start)}$2`);
  h = subOnce(h, /(<button id="resetBtn">)[^<]*(<\/button>)/, `$1${esc(s.reset)}$2`);
  h = subOnce(h, /(<button id="helpBtn" class="help-btn" title=")[^"]*(">)/, `$1${esc(s.helpTitle)}$2`);

  // Видимая SEO-секция: h1 + текст справки
  h = subOnce(
    h,
    /<section class="about" id="about">[\s\S]*?<\/section>/,
    `<section class="about" id="about"><h1>${esc(s.docTitle)}</h1>${s.helpHtml.trim()}</section>`,
  );

  // Языковые подстраницы: относительные пути к ресурсам и язык страницы
  if (code !== 'en') {
    h = subOnce(h, /<head>/, `<head>\n<base href="../">\n<script>window.PAGE_LANG="${code}";</script>`);
  }
  return h;
}

for (const code of Object.keys(LOCALES)) {
  const out = code === 'en' ? join(root, 'index.html') : join(root, code, 'index.html');
  if (code !== 'en') mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, build(code));
  console.log(`built ${code === 'en' ? 'index.html' : code + '/index.html'}`);
}

// sitemap.xml с hreflang-альтернативами
const today = new Date().toISOString().slice(0, 10);
const urls = Object.fromEntries(Object.keys(LOCALES).map((c) => [c, c === 'en' ? BASE_URL : `${BASE_URL}${c}/`]));
const alternates = [
  ...Object.entries(urls).map(([c, u]) => `    <xhtml:link rel="alternate" hreflang="${c}" href="${u}"/>`),
  `    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}"/>`,
].join('\n');
const entries = Object.values(urls)
  .map((u) => `  <url>\n    <loc>${u}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n${alternates}\n  </url>`)
  .join('\n');
writeFileSync(
  join(root, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries}\n</urlset>\n`,
);
console.log(`built sitemap.xml with ${Object.keys(urls).length} urls`);
