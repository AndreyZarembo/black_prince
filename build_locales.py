#!/usr/bin/env python3
"""Generate per-language pages (<lang>/index.html) and sitemap.xml from index.html.

Run after editing index.html:  python3 build_locales.py
The root page stays English; each generated page bakes its language via
window.PAGE_LANG, rewrites the SEO tags and points relative URLs at the
parent directory with <base href="../">.
"""
import re
from datetime import date
from pathlib import Path

BASE_URL = 'https://andreyzarembo.github.io/black_prince/'

# lang -> (title, meta description, og:locale)
LANGS = {
    'es': (
        'Temporizador Pomodoro — temporizador de tomate en línea personalizable',
        'Temporizador Pomodoro gratuito: intervalos de 5–120 minutos, cuenta atrás hasta una hora dada, 11 temas de color, 9 fuentes incluida una LCD de 7 segmentos, notificaciones. Los ajustes viven en el enlace. Para ordenador y móvil.',
        'es_ES',
    ),
    'de': (
        'Pomodoro-Timer — anpassbarer Online-Tomaten-Timer',
        'Kostenloser Pomodoro-Timer: Intervalle von 5–120 Minuten, Countdown bis zu einer Uhrzeit, 11 Farbthemen, 9 Schriften inklusive 7-Segment-LCD, Benachrichtigungen. Einstellungen stecken im Link. Für Desktop und Handy.',
        'de_DE',
    ),
    'fr': (
        'Minuteur Pomodoro — minuteur tomate en ligne personnalisable',
        'Minuteur Pomodoro gratuit : intervalles de 5 à 120 minutes, compte à rebours jusqu’à une heure donnée, 11 thèmes de couleurs, 9 polices dont un LCD 7 segments, notifications. Les réglages vivent dans le lien. Pour ordinateur et mobile.',
        'fr_FR',
    ),
    'pt': (
        'Temporizador Pomodoro — timer de tomate online personalizável',
        'Temporizador Pomodoro gratuito: intervalos de 5–120 minutos, contagem até uma hora definida, 11 temas de cores, 9 fontes incluindo LCD de 7 segmentos, notificações. As configurações ficam no link. Para desktop e celular.',
        'pt_BR',
    ),
    'ja': (
        'ポモドーロタイマー — カスタマイズできるオンラインタイマー',
        '無料のポモドーロタイマー。5〜120分のプリセット、指定時刻までのカウントダウン、11のカラーテーマ、7セグメントLCDを含む9つのフォント、通知に対応。設定はURLに保存され、PCでもスマホでも使えます。',
        'ja_JP',
    ),
    'ru': (
        'Pomodoro таймер онлайн — настраиваемый таймер помидора',
        'Бесплатный Pomodoro-таймер: пресеты 5–120 минут, таймер до заданного времени, 11 цветовых тем, 9 шрифтов включая сегментный LCD, уведомления. Настройки сохраняются в ссылке. Работает на ПК и телефоне.',
        'ru_RU',
    ),
    'it': (
        'Timer Pomodoro — timer del pomodoro online personalizzabile',
        'Timer Pomodoro gratuito: intervalli da 5 a 120 minuti, conto alla rovescia fino a un orario, 11 temi colore, 9 caratteri incluso un LCD a 7 segmenti, notifiche. Le impostazioni vivono nel link. Per desktop e mobile.',
        'it_IT',
    ),
    'nl': (
        'Pomodoro-timer — aanpasbare online tomaat-timer',
        'Gratis Pomodoro-timer: intervallen van 5–120 minuten, aftellen tot een tijdstip, 11 kleurthema’s, 9 lettertypen waaronder 7-segments-LCD, meldingen. Instellingen zitten in de link. Voor desktop en mobiel.',
        'nl_NL',
    ),
    'pl': (
        'Timer Pomodoro — konfigurowalny internetowy timer pomidorowy',
        'Darmowy timer Pomodoro: interwały 5–120 minut, odliczanie do wskazanej godziny, 11 motywów kolorów, 9 czcionek w tym 7-segmentowy LCD, powiadomienia. Ustawienia mieszkają w linku. Na komputer i telefon.',
        'pl_PL',
    ),
}

root = Path(__file__).parent
src = (root / 'index.html').read_text(encoding='utf-8')


def sub_once(pattern, repl, text):
    out, n = re.subn(pattern, repl, text, count=1, flags=re.S)
    assert n == 1, f'pattern not found: {pattern}'
    return out


for code, (title, desc, og_locale) in LANGS.items():
    h = src
    h = sub_once(r'<html lang="en">', f'<html lang="{code}">', h)
    h = sub_once(r'<title>.*?</title>', f'<title>{title}</title>', h)
    h = sub_once(r'(<meta name="description" content=").*?(">)', rf'\g<1>{desc}\g<2>', h)
    h = sub_once(r'(<meta property="og:title" content=").*?(">)', rf'\g<1>{title}\g<2>', h)
    h = sub_once(r'(<meta property="og:description" content=").*?(">)', rf'\g<1>{desc}\g<2>', h)
    h = sub_once(r'(<meta property="og:locale" content=").*?(">)', rf'\g<1>{og_locale}\g<2>', h)
    h = sub_once(r'(<meta property="og:url" content=").*?(">)', rf'\g<1>{BASE_URL}{code}/\g<2>', h)
    h = sub_once(r'(<link rel="canonical" href=").*?(">)', rf'\g<1>{BASE_URL}{code}/\g<2>', h)
    h = sub_once(
        r'<head>',
        f'<head>\n<base href="../">\n<script>window.PAGE_LANG="{code}";</script>',
        h,
    )
    out = root / code / 'index.html'
    out.parent.mkdir(exist_ok=True)
    out.write_text(h, encoding='utf-8')
    print(f'built {code}/index.html')

# sitemap.xml with hreflang alternates
today = date.today().isoformat()
urls = {'en': BASE_URL, **{c: f'{BASE_URL}{c}/' for c in LANGS}}
alternates = '\n'.join(
    f'    <xhtml:link rel="alternate" hreflang="{c}" href="{u}"/>' for c, u in urls.items()
) + f'\n    <xhtml:link rel="alternate" hreflang="x-default" href="{BASE_URL}"/>'

entries = '\n'.join(
    f'''  <url>
    <loc>{u}</loc>
    <lastmod>{today}</lastmod>
    <changefreq>monthly</changefreq>
{alternates}
  </url>''' for u in urls.values()
)

sitemap = f'''<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
{entries}
</urlset>
'''
(root / 'sitemap.xml').write_text(sitemap, encoding='utf-8')
print('built sitemap.xml with', len(urls), 'urls')
