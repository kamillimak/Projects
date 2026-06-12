# 📋 PORTFOLIO — Wytyczne dla narzędzi AI

**Projekt:** Portfolio Kamil Mikołajczyk · Future IT  
**Repo:** github.com/[twój-nick]/portfolio  
**Cel:** Każda nowa strona klienta musi spełniać te wytyczne, żeby dało się ją łatwo dodać do portfolio.

---

## 1. STRUKTURA REPOZYTORIUM

```
portfolio/
├── index.html              ← Główna strona portfolio (NIE RUSZAJ bez potrzeby)
├── GUIDELINES.md           ← Ten plik
├── projects/
│   ├── ams-bronowicki/
│   │   ├── index.html      ← Gotowa strona klienta
│   │   └── meta.json       ← Metadane projektu (patrz sekcja 3)
│   ├── tirfox/
│   │   ├── index.html
│   │   └── meta.json
│   └── [nowy-projekt]/
│       ├── index.html
│       └── meta.json
└── assets/
    └── (opcjonalne: wspólne fonty, ikony)
```

---

## 2. WYMAGANIA DLA KAŻDEJ STRONY KLIENTA

### Techniczne (OBOWIĄZKOWE)
- [ ] **Jeden plik HTML** — cały CSS i JS inline (bez zewnętrznych plików lokalnych)
- [ ] Działa przez `file://` (bez serwera) — tester może otworzyć plik bezpośrednio
- [ ] Fonty przez Google Fonts CDN (link w `<head>`)
- [ ] Responsywna — poprawnie wyświetla się od 375px (telefon) do 1440px
- [ ] Nie wymaga logowania, bazy danych ani backendu
- [ ] `<title>` = nazwa firmy klienta
- [ ] `<meta name="description">` z opisem firmy

### Formularze kontaktowe
- Formularz może być **statyczny** (atrybut `action="mailto:..."`) albo podłączony do **Netlify Forms** lub **Formspree**
- NIE używaj backendu PHP ani Node.js w wizualizacjach

### Google Maps
- Używaj **Embed API** (iframe) — nie wymaga klucza API dla wizualizacji
- Format: `https://www.google.com/maps/embed/v1/place?key=YOUR_KEY&q=...`
- Dla wizualizacji możesz użyć `https://maps.google.com/maps?q=...&output=embed`

---

## 3. PLIK META.JSON (OBOWIĄZKOWY dla każdego projektu)

Twórz plik `meta.json` przy każdym projekcie. Portfolio odczytuje go automatycznie.

```json
{
  "id": "nazwa-projektu",
  "title": "Nazwa Firmy Klienta",
  "industry": "Branża (np. Moto-komis, Serwis TIR, Prawo)",
  "category": "automotive | serwis | usługi | gastronomia | inne",
  "description": "Krótki opis projektu — max 150 znaków. Co robi firma, co zawiera strona.",
  "tools": "HTML · CSS · Google Maps API",
  "timeToDeliver": "4 dni",
  "previewUrl": "https://[nick].github.io/portfolio/projects/nazwa-projektu/",
  "liveUrl": "",
  "featured": false,
  "colorAccent": "#2563EB",
  "colorBg": "#0a1628",
  "tags": ["HTML", "Google Maps", "Żórawina"],
  "dateAdded": "2025-01"
}
```

**Pola:**
- `category` — używane przez filtr na portfolio (musi być jedną z wartości)
- `featured` — `true` = projekt wyświetla się jako duży kafelek (max 1-2 projekty)
- `colorAccent` + `colorBg` — portfolio używa tych kolorów do wygenerowania miniaturki
- `previewUrl` — GitHub Pages URL po wdrożeniu do repo
- `liveUrl` — prawdziwa domena klienta (jeśli wdrożono)

---

## 4. PROMPT BAZOWY DLA NARZĘDZI AI

Wklej ten prompt na początku każdego projektu w Codex, Lovable, Replit, Claude, AI Studio lub Trae:

---

```
Stwórz stronę internetową dla firmy [NAZWA FIRMY].

BRANŻA: [np. warsztat samochodowy / serwis rowerowy / kancelaria prawna]
LOKALIZACJA: [miasto, dzielnica]
USŁUGI: [lista 3-5 głównych usług]
TELEFON: [numer]
EMAIL: [email]
ADRES: [adres]
KOLOR MARKI: [jeśli znany, np. #E53E3E — jeśli nie, pomiń]

WYMAGANIA TECHNICZNE (OBOWIĄZKOWE):
1. Jeden plik HTML z CSS i JS inline — bez zewnętrznych lokalnych plików
2. Responsywna (mobile-first, działa od 375px)
3. Fonty z Google Fonts CDN
4. Działa przez file:// bez serwera
5. Formularz kontaktowy z action="mailto:[EMAIL]" lub Formspree
6. Sekcja z Google Maps Embed (użyj iframe, bez klucza API)
7. <title> = "[NAZWA FIRMY]"
8. <meta name="description"> z opisem firmy

STRUKTURA STRONY:
- Hero: nagłówek z nazwą firmy + CTA (zadzwoń / napisz)
- O nas: 2-3 zdania o firmie
- Usługi: siatka kart z ikonami SVG (min. 4 usługi)
- Dlaczego my: 3 wyróżniki firmy (np. doświadczenie, gwarancja, czas)
- Kontakt: dane kontaktowe + mapa Google
- Stopka: copyright, NIP jeśli podano

STYL:
- Profesjonalny, godny zaufania, lokalny charakter
- Dominujące ciemne tło LUB jasne — dobierz do branży
- Akcent: [kolor] lub dobierz odpowiedni do branży
- Bez stockowych zdjęć — używaj gradientów, ikon SVG, CSS patterns
- Animacje tylko subtelne (transition, fade-in na scroll)

NA KOŃCU PLIKU dodaj komentarz HTML z metadanymi:
<!-- 
PORTFOLIO_META
title: [NAZWA FIRMY]
industry: [BRANŻA]
category: [automotive|serwis|usługi|gastronomia|inne]
tools: HTML · CSS
timeToDeliver: X dni
colorAccent: #XXXXXX
colorBg: #XXXXXX
tags: [tag1, tag2, tag3]
-->
```

---

## 5. INSTRUKCJE DLA POSZCZEGÓLNYCH NARZĘDZI

### Claude (claude.ai)
1. Wklej prompt bazowy z sekcji 4
2. Claude zwróci kod w bloku — skopiuj cały
3. Zapisz jako `index.html` w folderze `projects/[nazwa]/`
4. Jeśli potrzebujesz poprawek: "Zmień kolor akcentu na #E53E3E" / "Dodaj sekcję z cennikiem"
5. **Tip:** Claude dobrze radzi sobie z CSS animations i SVG — proś o ikony inline SVG zamiast fontawesome

### Lovable
1. Wklej prompt bazowy → Lovable wygeneruje React/SPA
2. Po zakończeniu: **Export → Download ZIP**
3. Uruchom `npm run build` → skopiuj zawartość `dist/` do folderu projektu
4. Lub użyj opcji "Export as HTML" jeśli dostępna
5. **Uwaga:** Lovable generuje komponenty React — trzeba zbudować do statycznego HTML

### Replit
1. Utwórz nowy projekt: **HTML/CSS/JS**
2. Wklej prompt do Replit AI lub wklej kod bezpośrednio do `index.html`
3. **Share → Export** lub skopiuj `index.html` ręcznie
4. Replit może hostować stronę — link użyj jako `previewUrl` w meta.json

### Codex / GitHub Copilot
1. Otwórz pusty plik `index.html` w VS Code
2. Wklej prompt jako komentarz na początku pliku
3. Copilot uzupełni kod — akceptuj/odrzucaj sugestie
4. Bardziej kontrolowane niż inne narzędzia — dobre do dopracowania detali

### AI Studio (Google)
1. Użyj modelu Gemini 2.5 Pro
2. Wklej prompt bazowy — dodaj "Odpowiedz tylko kodem HTML, bez opisu."
3. Skopiuj odpowiedź, usuń ewentualne markdown backticks (` ```html ... ``` `)
4. Zapisz jako `index.html`
5. **Tip:** AI Studio pozwala na długie konteksty — możesz wkleić cały istniejący projekt i poprosić o modyfikacje

### Trae
1. Utwórz nowy projekt HTML w Trae
2. Wklej prompt do agenta Trae
3. Trae może generować pliki wieloplikowe — upewnij się że CSS jest inline
4. Użyj instrukcji: "Połącz wszystko do jednego pliku index.html z CSS i JS inline"

---

## 6. DODAWANIE PROJEKTU DO PORTFOLIO — CHECKLISTA

```
□ Plik index.html gotowy i przetestowany lokalnie
□ Strona działa przez file:// 
□ Strona wyświetla się poprawnie na telefonie (375px)
□ Formularz kontaktowy skonfigurowany
□ Plik meta.json wypełniony
□ Folder nazwany: projekty/[slug-firmy]/ (małe litery, bez spacji, bez polskich znaków)
□ Git commit: "Add project: Nazwa Firmy"
□ Push do GitHub
□ GitHub Pages automatycznie deployuje (check: Settings → Pages)
□ Zaktualizuj URL w meta.json po deployment
```

---

## 7. GITHUB PAGES — KONFIGURACJA (raz)

```bash
# 1. Utwórz repo (np. portfolio)
# 2. Włącz GitHub Pages:
#    Settings → Pages → Source: Deploy from branch → main → / (root)
# 3. Twoje portfolio będzie dostępne pod:
#    https://[twoj-nick].github.io/portfolio/
# 4. Każdy projekt: 
#    https://[twoj-nick].github.io/portfolio/projects/nazwa-projektu/
```

**Opcja z własną domeną:**
1. Kup domenę (np. kmdev.pl)
2. W repo: dodaj plik `CNAME` z treścią `kmdev.pl`
3. U rejestratora domeny: dodaj rekord CNAME → `[twoj-nick].github.io`

---

## 8. SZYBKIE KOMENDY GIT

```bash
# Dodaj nowy projekt
cd portfolio
mkdir -p projects/nazwa-projektu
# ... wklej index.html i meta.json ...
git add projects/nazwa-projektu/
git commit -m "Add project: Nazwa Firmy"
git push

# Zaktualizuj portfolio (np. edycja index.html)
git add index.html
git commit -m "Update portfolio: add new card for Nazwa Firmy"
git push
```

---

## 9. KONWENCJE NAZEWNICTWA

| Pole | Format | Przykład |
|------|--------|---------|
| Folder projektu | kebab-case | `ams-bronowicki` |
| ID w meta.json | kebab-case | `"id": "ams-bronowicki"` |
| Category | z listy | `automotive` |
| Tags | Krótkie, PL lub EN | `["HTML", "Automotive"]` |
| Git commit | "Add project: X" / "Update: X" | |

---

*Wytyczne v1.0 · Future IT Kamil Mikołajczyk*
