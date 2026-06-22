# Portfolio projektów - Kamil Mikołajczyk

Repozytorium zawiera statyczne portfolio publikowane przez GitHub Pages. Strona główna (`index.html`) prezentuje realizacje jako dynamicznie renderowane karty projektów na podstawie plików `projects/[slug]/meta.json`.

Adres produkcyjny:

```text
https://kamillimak.github.io/Projects/
```

Repozytorium GitHub:

```text
https://github.com/kamillimak/Projects
```

## Co Jest W Projekcie

- `index.html` - główna strona portfolio.
- `projects/[slug]/` - gotowe, opublikowane projekty statyczne.
- `projects/[slug]/meta.json` - dane projektu odczytywane przez portfolio.
- `assets/previews/` - grafiki podglądu używane na kartach i w modalu.
- `assets/brand/` - logo, zdjęcia i assety marki.
- `sources/` - miejsce na robocze źródła z innych narzędzi lub repozytoriów.
- `scripts/validate-portfolio.ps1` - walidator struktury portfolio.
- `PORTFOLIO-GUIDELINES.md` - szczegółowe wytyczne dla narzędzi AI.
- `PROJECT-INTEGRATION.md` - skrócony kontrakt integracji projektów.

## Najważniejsze Zasady

1. Portfolio jest repozytorium publikacyjnym.
2. Do `projects/[slug]/` trafiają tylko gotowe wersje statyczne.
3. Źródła robocze z innych narzędzi AI trzymaj w `sources/[slug]/` albo poza repo.
4. Każdy publikowany projekt musi mieć `index.html` i `meta.json`.
5. Każda podstrona projektu musi mieć widoczny powrót do portfolio:

```html
../../index.html#projects
```

6. Główna strona nie wymaga ręcznego dopisywania kart, jeśli projekt jest dodany do listy źródeł w `index.html` i ma poprawny `meta.json`.

## Struktura Projektu

```text
Projects/
  index.html
  README.md
  PORTFOLIO-GUIDELINES.md
  PROJECT-INTEGRATION.md
  assets/
    brand/
    previews/
  projects/
    example-project/
      index.html
      meta.json
      v2.html        # opcjonalnie
      assets/        # opcjonalnie
  scripts/
    validate-portfolio.ps1
  sources/
    example-project/ # robocze źródła, nie publikacja
```

## Kontrakt Dla Nowego Projektu

Minimalna struktura:

```text
projects/[slug]/
  index.html
  meta.json
```

Warianty projektu:

```text
projects/[slug]/
  index.html
  v2.html
  v3.html
  meta.json
```

Zasady:

- `index.html` jest wersją domyślną.
- `v2.html`, `v3.html` dodawaj tylko, jeśli są realnymi wariantami.
- Każda wersja musi zawierać belkę lub link powrotu do portfolio.
- Po dodaniu nowej wersji do istniejącego projektu zaktualizuj `versions` w `meta.json`, a potem uruchom:

```powershell
powershell -ExecutionPolicy Bypass -File scripts\sync-project-version-bars.ps1 -Slug [slug] -ProjectTitle "Nazwa projektu"
```

Ten krok synchronizuje belki powrotu i linki `v1`, `v2`, `v3` we wszystkich plikach projektu, więc starsze wersje nie zostają bez linku do nowej wersji.
- Assety specyficzne dla projektu trzymaj w `projects/[slug]/assets/`.
- Wspólne grafiki portfolio trzymaj w `assets/previews/` albo `assets/brand/`.

## Plik `meta.json`

Portfolio korzysta z metadanych projektu do kart, filtrów, modala, tagów, kolorów i wersji.

Przykład:

```json
{
  "id": "example-project",
  "title": "Nazwa Projektu",
  "industry": "Branża projektu",
  "category": "automotive",
  "description": "Krótki opis projektu widoczny na karcie i w modalu.",
  "tools": "HTML - CSS - JavaScript",
  "timeToDeliver": "4 dni",
  "previewUrl": "https://kamillimak.github.io/Projects/projects/example-project/",
  "liveUrl": "",
  "featured": false,
  "colorAccent": "#3B82F6",
  "colorBg": "#111827",
  "tags": ["HTML", "Landing Page", "Portfolio"],
  "dateAdded": "2026-06",
  "versions": ["index.html", "v2.html"]
}
```

### Pola

| Pole | Wymagane | Opis |
| --- | --- | --- |
| `id` | Tak | Stabilny identyfikator, najlepiej taki sam jak folder. |
| `title` | Tak | Nazwa wyświetlana w portfolio. |
| `industry` | Tak | Branża lub krótki typ projektu. |
| `category` | Tak | Kategoria używana przez filtry. |
| `description` | Tak | Krótki opis projektu. |
| `tools` | Tak | Technologie lub narzędzia. |
| `timeToDeliver` | Nie | Orientacyjny czas realizacji. |
| `previewUrl` | Nie | URL do wersji na GitHub Pages. |
| `liveUrl` | Nie | Zewnętrzna domena, jeśli projekt działa poza portfolio. |
| `featured` | Nie | `true` wyróżnia projekt jako większą kartę. |
| `colorAccent` | Tak | Kolor akcentu karty, tagów i hoverów. |
| `colorBg` | Tak | Kolor tła generowanego preview. |
| `tags` | Nie | Krótkie tagi na karcie i w modalu. |
| `dateAdded` | Nie | Data dodania, np. `2026-06`. |
| `versions` | Nie | Lista plików wariantów, np. `["index.html", "v2.html"]`. |

### Kategorie

Aktualnie używane kategorie:

```text
automotive
serwis
usługi
inne
```

Możesz dodać nową kategorię, ale wtedy warto dopisać jej etykietę w `CATEGORY_LABELS` w `index.html`.

## Jak Portfolio Renderuje Projekty

`index.html` zawiera listę źródeł projektów w stałej `PROJECT_SOURCES`.

Dla projektu lokalnego wpis wygląda tak:

```js
{
  meta: 'projects/example-project/meta.json',
  slug: 'example-project',
  browserLabel: 'example.pl',
  previewImage: 'assets/previews/example-project.png',
  previewPosition: 'center top'
}
```

Dla projektu zewnętrznego:

```js
{
  meta: '',
  slug: 'external-project',
  browserLabel: 'external.pl',
  previewImage: 'assets/previews/external-project.png',
  external: true,
  metaData: {
    "id": "external-project",
    "title": "Projekt Zewnętrzny",
    "industry": "Usługi",
    "category": "usługi",
    "description": "Opis projektu.",
    "tools": "HTML - CSS",
    "timeToDeliver": "5 dni",
    "liveUrl": "https://example.com",
    "featured": false,
    "colorAccent": "#D9A72F",
    "colorBg": "#16213F",
    "tags": ["HTML", "Usługi"],
    "dateAdded": "2026-06"
  }
}
```

Jeśli `previewImage` jest puste, portfolio wygeneruje elegancki placeholder na podstawie `title`, `category`, `colorAccent` i `colorBg`.

## Pełna Instrukcja Integracji Projektu Z Innego Narzędzia AI

### 1. Przygotuj folder roboczy

Jeśli projekt pochodzi z Claude, Lovable, Replit, AI Studio, Trae, v0, Bolt albo innego generatora, nie mieszaj roboczych źródeł z gotową publikacją.

Rekomendowane miejsce:

```text
sources/[slug]/
```

Przykład:

```powershell
mkdir sources\nowy-projekt
```

### 2. Ustal typ projektu

#### Prosty HTML

Jeśli narzędzie AI wygenerowało jeden plik HTML:

1. Utwórz folder:

```powershell
mkdir projects\nowy-projekt
```

2. Skopiuj plik:

```text
projects/nowy-projekt/index.html
```

3. Dodaj `meta.json`.
4. Dodaj belkę powrotu do portfolio.
5. Dodaj wpis w `PROJECT_SOURCES`.

#### React / Vite / Lovable / Next

Jeśli narzędzie wygenerowało aplikację:

1. Trzymaj źródło w `sources/[slug]/`.
2. Dostosuj treści, style i assety.
3. Zbuduj wersję statyczną.
4. Skopiuj wynik builda do `projects/[slug]/`.
5. Upewnij się, że ścieżki assetów działają względnie.
6. Dodaj belkę powrotu nad rootem aplikacji.
7. Dodaj `meta.json`.
8. Dodaj wpis w `PROJECT_SOURCES`.

Typowy build Vite:

```powershell
cd sources\nowy-projekt
npm install
npm run build
```

Potem skopiuj zawartość `dist/` do:

```text
projects/nowy-projekt/
```

#### Projekt Tylko Jako Embed

Jeśli projekt działa tylko jako embed, np. iframe z Claude Artifact:

1. Utwórz `projects/[slug]/index.html`.
2. Zbuduj stronę-opakowanie z belką powrotu.
3. Osadź iframe.
4. Dodaj `meta.json`.
5. W `tools` zaznacz, że to embed, np. `Claude Artifact - iframe`.

Używaj iframe tylko wtedy, gdy link jest stabilny.

### 3. Dodaj belkę powrotu do projektu

Każdy projekt dostępny z portfolio musi mieć łatwą nawigację powrotną.

Minimalny przykład:

```html
<div id="portfolio-bar">
  <a href="../../index.html#projects">Powrót do portfolio</a>
</div>
```

Zalecany styl:

```html
<style>
  #portfolio-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 48px;
    z-index: 99999;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;
    background: #0F140A;
    border-bottom: 1px solid rgba(255,255,255,.12);
    font-family: system-ui, -apple-system, sans-serif;
  }

  #portfolio-bar a {
    color: rgba(255,255,255,.75);
    text-decoration: none;
    font-size: 13px;
    font-weight: 700;
  }

  body {
    padding-top: 48px;
  }
</style>
```

### 4. Dodaj plik `meta.json`

Użyj szablonu:

```json
{
  "id": "nowy-projekt",
  "title": "Nazwa Wyświetlana",
  "industry": "Branża",
  "category": "usługi",
  "description": "Krótki opis projektu.",
  "tools": "HTML - CSS - JavaScript",
  "timeToDeliver": "4 dni",
  "previewUrl": "https://kamillimak.github.io/Projects/projects/nowy-projekt/",
  "liveUrl": "",
  "featured": false,
  "colorAccent": "#3B82F6",
  "colorBg": "#111827",
  "tags": ["HTML", "Landing Page"],
  "dateAdded": "2026-06",
  "versions": ["index.html"]
}
```

### 5. Dodaj grafikę preview

Opcjonalnie dodaj screenshot do:

```text
assets/previews/nowy-projekt.png
```

Zalecenia:

- format: PNG albo JPG,
- proporcja: najlepiej około 16:9,
- szerokość: 1400-2000 px,
- pokazuj realny ekran projektu,
- unikaj mocno rozmytych, ciemnych lub przypadkowo przyciętych grafik.

Jeśli nie dodasz grafiki, portfolio wygeneruje placeholder automatycznie.

### 6. Dodaj projekt do `PROJECT_SOURCES`

W `index.html` znajdź:

```js
const PROJECT_SOURCES = [
```

Dodaj wpis:

```js
{
  meta: 'projects/nowy-projekt/meta.json',
  slug: 'nowy-projekt',
  browserLabel: 'nowy-projekt.pl',
  previewImage: 'assets/previews/nowy-projekt.png',
  previewPosition: 'center top'
}
```

Jeżeli nie masz grafiki:

```js
{
  meta: 'projects/nowy-projekt/meta.json',
  slug: 'nowy-projekt',
  browserLabel: 'nowy-projekt.pl',
  previewImage: '',
  previewPosition: 'center top'
}
```

### 7. Sprawdź lokalnie

Uruchom statyczny serwer z rootu repo.

Przykład:

```powershell
python -m http.server 8765
```

Otwórz:

```text
http://127.0.0.1:8765/index.html
```

Sprawdź:

- czy karta projektu pojawia się w portfolio,
- czy filtr kategorii działa,
- czy modal pokazuje dane z `meta.json`,
- czy link `Zobacz projekt` działa,
- czy wersje `v1`, `v2`, `v3` działają,
- czy belka powrotu działa z projektu do portfolio,
- czy w konsoli nie ma błędów 404 dla assetów.

### 8. Uruchom walidator

```powershell
powershell -ExecutionPolicy Bypass -File scripts\validate-portfolio.ps1
```

Walidator sprawdza między innymi:

- poprawność JSON w `meta.json`,
- istnienie `index.html`,
- istnienie plików z `versions`,
- linki do projektów,
- obecność nawigacji powrotu.

### 9. Commit i push

```powershell
git status
git add index.html projects\nowy-projekt assets\previews\nowy-projekt.png
git commit -m "Add project: Nazwa Wyświetlana"
git push origin main
```

Po pushu sprawdź:

```text
https://kamillimak.github.io/Projects/
https://kamillimak.github.io/Projects/projects/nowy-projekt/
```

GitHub Pages może potrzebować chwili na odświeżenie.

## Prompt Dla Narzędzi AI

Wklej poniższy prompt do Claude, Lovable, Replit, AI Studio, Trae lub podobnego narzędzia.

```text
Stwórz statyczną stronę internetową dla firmy/projektu:

NAZWA:
BRANŻA:
LOKALIZACJA:
USŁUGI:
TELEFON:
EMAIL:
ADRES:
KOLOR MARKI:
STYL:

Wymagania techniczne:
1. Przygotuj wersję możliwą do publikacji statycznej na GitHub Pages.
2. Jeśli to możliwe, zwróć jeden plik index.html z CSS i JS inline.
3. Nie używaj backendu, bazy danych ani logowania.
4. Formularz kontaktowy może działać przez mailto albo Formspree.
5. Używaj względnych ścieżek do assetów.
6. Strona musi działać w folderze /projects/[slug]/.
7. Dodaj na górze stałą belkę powrotu do portfolio z linkiem:
   ../../index.html#projects
8. Strona musi być responsywna od 375px do 1440px.
9. Jeżeli generujesz React/Vite/Next, przygotuj instrukcję builda do statycznego outputu.

Struktura strony:
- Hero z jasnym CTA.
- Sekcja usług/oferty.
- Sekcja z wyróżnikami.
- Sekcja procesu lub korzyści.
- Kontakt.
- Stopka.

Na końcu odpowiedzi podaj też propozycję pliku meta.json:
{
  "id": "[slug]",
  "title": "[nazwa wyświetlana]",
  "industry": "[branża]",
  "category": "automotive | serwis | usługi | inne",
  "description": "[krótki opis]",
  "tools": "[narzędzia]",
  "timeToDeliver": "[czas]",
  "previewUrl": "https://kamillimak.github.io/Projects/projects/[slug]/",
  "liveUrl": "",
  "featured": false,
  "colorAccent": "#XXXXXX",
  "colorBg": "#XXXXXX",
  "tags": ["tag1", "tag2", "tag3"],
  "dateAdded": "2026-06",
  "versions": ["index.html"]
}
```

## Instrukcje Dla Konkretnych Narzędzi AI

### Claude

1. Poproś o jeden kompletny plik HTML.
2. Jeśli Claude daje artifact, wyeksportuj kod albo osadź stabilny iframe w wrapperze.
3. Dopilnuj belki powrotu do `../../index.html#projects`.
4. Poproś o `meta.json` w osobnym bloku.

### Lovable

1. Wygeneruj projekt.
2. Dostosuj treści i assety.
3. Wyeksportuj kod.
4. Zbuduj statyczny output.
5. Skopiuj wynik do `projects/[slug]/`.
6. Nie commituj `node_modules`.

### Replit

1. Utwórz projekt HTML/CSS/JS.
2. Wygeneruj albo wklej kod.
3. Pobierz pliki.
4. Uporządkuj do `projects/[slug]/`.
5. Dodaj `meta.json` i wpis w `PROJECT_SOURCES`.

### AI Studio / Gemini

1. Poproś: `Odpowiedz tylko kodem HTML, bez markdown`.
2. Jeśli odpowiedź ma backticki, usuń je.
3. Zapisz jako `projects/[slug]/index.html`.
4. Dodaj `meta.json`.

### Trae / Cursor / Copilot

1. Pracuj na folderze `sources/[slug]/`.
2. Po zakończeniu zbuduj statyczną wersję.
3. Skopiuj tylko wynik do `projects/[slug]/`.
4. Uruchom walidator.

## Checklist Przed Publikacją

```text
[ ] Projekt ma folder projects/[slug]/
[ ] Jest projects/[slug]/index.html
[ ] Jest projects/[slug]/meta.json
[ ] meta.json ma poprawny JSON
[ ] Projekt ma link powrotu do ../../index.html#projects
[ ] Warianty z versions istnieją jako pliki
[ ] Jeśli jest previewImage, plik istnieje w assets/previews/
[ ] Projekt został dodany do PROJECT_SOURCES w index.html
[ ] Strona działa lokalnie przez http://127.0.0.1:8765/
[ ] scripts/validate-portfolio.ps1 przechodzi
[ ] Brak błędów 404 dla assetów
[ ] Commit i push wykonane
```

## Najczęstsze Problemy

### Karta projektu nie pojawia się na stronie

Sprawdź:

- czy projekt jest dodany w `PROJECT_SOURCES`,
- czy ścieżka do `meta.json` jest poprawna,
- czy lokalnie używasz serwera HTTP, a nie `file://`.

Dynamiczne pobieranie `meta.json` wymaga HTTP.

### Modal nie pokazuje wersji

Sprawdź `versions` w `meta.json`:

```json
"versions": ["index.html", "v2.html"]
```

Każdy plik musi istnieć.

Jeśli wersje istnieją, ale belka na stronie projektu nie pokazuje wszystkich linków, uruchom synchronizację:

```powershell
powershell -ExecutionPolicy Bypass -File scripts\sync-project-version-bars.ps1 -Slug [slug] -ProjectTitle "Nazwa projektu"
```

### GitHub Pages pokazuje starą wersję

Możliwe przyczyny:

- GitHub Pages jeszcze się nie odświeżył.
- Przeglądarka trzyma cache.
- Push nie trafił na `main`.

Sprawdź:

```powershell
git status --short --branch
git log --oneline --max-count=3
git ls-remote origin refs/heads/main
```

### Projekt działa online, ale nie działa lokalnie przez `file://`

Użyj lokalnego serwera:

```powershell
python -m http.server 8765
```

I otwórz:

```text
http://127.0.0.1:8765/
```

## Komendy Robocze

```powershell
# Status
git status --short --branch

# Walidacja portfolio
powershell -ExecutionPolicy Bypass -File scripts\validate-portfolio.ps1

# Lokalny serwer
python -m http.server 8765

# Commit
git add .
git commit -m "Opis zmiany"
git push origin main
```

## Aktualny Model Rozwoju

- Portfolio pozostaje statyczne.
- Projekty są publikowane jako gotowe foldery w `projects/`.
- `meta.json` jest źródłem prawdy dla prezentacji projektu.
- Grafika preview jest opcjonalna, bo portfolio potrafi wygenerować placeholder.
- Każda realizacja musi mieć kompletną nawigację powrotu.
- Przed pushem zawsze uruchamiaj walidator.
