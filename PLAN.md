# Ufuks portfolio – byggplan

Statisk sajt i HTML + vanlig CSS (+ lite vanilla-JS) byggd från Figma:
[Ufuks portfolio – Startsida](https://www.figma.com/design/WeFx69h0S9S3l88BX8PgR7/Ufuks-portfolio?node-id=53-258)

## Beslut

| Fråga | Beslut |
| --- | --- |
| JavaScript | Lite vanilla-JS för mobilmeny och sliderpilar. Slidern ska ändå gå att svepa utan JS (CSS scroll-snap). |
| Mobilmeny | Ingen design finns – fullskärmsmeny i samma stil som footerns "Link Wide"-rader (Link L-typografi, linjer). |
| Responsivt | Mobil-layout (375-design) upp till 767px, desktop-layout (1440-design) från 768px. Storlekar skalar mjukt med `clamp()` mellan brytpunkterna. Över 1440px centreras sidan med `max-width: 1440px`. |
| Repo | Lokalt git, commit efter varje steg. |
| Innehåll | Exakt text och bilder från Figma. |
| Sidor | Bara startsidan. Nav-länkar scrollar till sektioner (Case → galleri, About → About me, Contact → footer). Övriga länkar är `#`. |
| Typsnitt | Anton + Inter via Google Fonts. |

## Designtokens (från Figma-variabler)

| Token | Värde |
| --- | --- |
| `text/primary`, `border/primary` | `#141400` |
| `text/secondary` | `#949494` |
| `text/tertiary` | `#d1d1d1` |
| `background/primary` | `#f8f8f8` |
| Heading | Anton 400, 128px, line-height 1 |
| Subheading | Inter 500, 32px |
| Body | Inter 500, 24px |
| Link L / Link S | Inter 400, 48px / 24px, line-height 1 |
| Grid | 12 kolumner, gap 32, marginal 32, designbredd 1440 |
| Padding | md 32, xl 128 |
| Radius | 8 |

Mobilvärden (storlekar, marginaler) hämtas från 375-ramen i respektive steg.

## Filstruktur

```
index.html
css/
  reset.css      – minimal reset
  tokens.css     – CSS-variabler (färger, typografi, spacing, grid)
  base.css       – body, typografi-klasser, layout-hjälpare (container, grid)
  sections.css   – en sektion i taget, mobil först
js/
  main.js        – meny + slider
images/          – bilder exporterade från Figma
  icons/         – pilikoner (SVG) från Figma
```

Mobilbilderna i galleriet (`gallery-2-mobile.jpg`, `gallery-3-mobile.jpg`) skiljer sig från desktop i Figma och används via `<picture>` i steg 4.

## Köra lokalt

```bash
python3 -m http.server 5500 --bind 127.0.0.1
```

Öppna sedan http://127.0.0.1:5500.

## Steg

Varje steg avslutas med visuell jämförelse mot Figma i 375px och 1440px, och en commit.

1. **Grund** – `index.html`-skelett med semantiska landmärken, reset, tokens, base-CSS, Google Fonts, export av alla bilder från Figma till `images/`.
2. **Navigation + mobilmeny** – "Ufuk Demir" + Case/About/Contact på desktop, "Meny" + fullskärmsmeny på mobil (JS, Esc stänger, fokushantering).
3. **Title Section + Text Section** – stor Anton-rubrik, "Section title" + brödtext i grid.
4. **Gallery Grid** – en bred bild + två bilder i olika höjd. Mobilen visar andra bildproportioner/bilder än desktop – kontrolleras och byggs exakt (ev. `<picture>`).
5. **List Section (Kompetenser)** – rubrik + Skills/Experience/Tools-listor i grid.
6. **About Section** – rubrik, text och porträtt.
7. **Gallery Slider** – Client/Year/Service-metadata, pilar och horisontell bildslider (scroll-snap + JS för pilar och inaktiv pil-state).
8. **Link Footer** – tre "Link Wide"-rader med linjer och pil-ikon, hover-state.
9. **Responsiv QA och finputs** – kontroll i 375 / 768 / 1024 / 1440 / 1920, pixeljämförelse mot Figma, tillgänglighet (kontrast, alt-texter, tangentbord), bildoptimering (`loading="lazy"`, `srcset`).
