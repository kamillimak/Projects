/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, Realisation, BlogArticle } from './types';

export const PRODUCTS: Product[] = [
  // 2.1 Płyty tarasowe 2cm
  {
    id: 'marazzi-mystone-ceppo',
    name: 'Mystone Ceppo di Gré 2cm',
    brand: 'Marazzi',
    category: 'sly-2cm',
    categoryName: 'Płyty tarasowe 2cm',
    subcategory: 'Marazzi',
    description: 'Niezwykle elegancka, włoska płyta gresowa o grubości 2cm wiernie odwzorowująca naturalny kamień Ceppo di Gré z charakterystycznymi otoczakami. Doskonałe parametry antypoślizgowe R11 i odporność na mróz.',
    priceRange: '189 - 249 zł / m²',
    features: [
      'Włoska jakość premium',
      'Antypoślizgowość R11 klasy C',
      'Wysoka odporność na zginanie i obciążenia',
      'Łatwe czyszczenie i zerowa nasiąkliwość'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800',
    dimensions: ['60x60 cm', '80x80 cm', '60x120 cm'],
    colors: ['Antracite', 'Grey', 'Greige', 'Beige'],
    textures: ['Strukturalna kamienna (R11)', 'Naturalna matowa'],
    faq: [
      {
        question: 'Czy te płyty nadają się na taras wentylowany na wspornikach?',
        answer: 'Tak, gresy Marazzi 2cm są idealnie skalibrowane i zaprojektowane specjalnie do montażu tarasów podniesionych na wspornikach regulowanych.'
      },
      {
        question: 'Jak należy czyścić płyty Ceppo di Gré?',
        answer: 'Dzięki zerowej nasiąkliwości, płyty są odporne na plamy z tłuszczu, wina czy kawy. Wystarczy woda z mydłem lub myjka ciśnieniowa.'
      }
    ]
  },
  {
    id: 'opoczno-grand-wood',
    name: 'Grand Wood Prime Natural 2cm',
    brand: 'Opoczno',
    category: 'sly-2cm',
    categoryName: 'Płyty tarasowe 2cm',
    subcategory: 'Opoczno',
    description: 'Ekskluzywna polska płyta gresowa o wyglądzie naturalnego drewna z wyraźnym, głębokim usłojeniem. Łączy ciepło domowego parkietu z absolutną mrozoodpornością i brakiem konieczności impregnacji.',
    priceRange: '159 - 199 zł / m²',
    features: [
      'Ciepły, naturalny wygląd drewna',
      'Brak konieczności olejowania i cyklinowania',
      'Odporność na promieniowanie UV (nie blaknie)',
      'Atestowana klasa antypoślizgowa R11'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&q=80&w=800',
    dimensions: ['29.5x119.5 cm', '39.5x119.5 cm'],
    colors: ['Natural Oak', 'Gold Wood', 'Dark Brown', 'Grey Wood'],
    textures: ['Struktura drewna (słojowana)', 'Matowa matrycowa'],
    faq: [
      {
        question: 'Czy płyta drewnopodobna nagrzewa się mocno na słońcu?',
        answer: 'Dzięki właściwościom termicznym gresu ceramicznego, płyta oddaje ciepło podobnie do naturalnego drewna, nie parząc stóp, co czyni ją idealną wokół basenów.'
      }
    ]
  },
  {
    id: 'zoya-concrete-grey',
    name: 'Zoya Concrete Grey 2cm',
    brand: 'Zoya',
    category: 'sly-2cm',
    categoryName: 'Płyty tarasowe 2cm',
    subcategory: 'Zoya',
    description: 'Minimalistyczna płyta tarasowa o surowej teksturze betonu architektonicznego. Doskonale współgra z nowoczesną architekturą, stolarką grafitową i loftowymi ogrodami zimowymi.',
    priceRange: '129 - 159 zł / m²',
    features: [
      'Nowoczesny, industrialny styl',
      'Niezwykle korzystna relacja ceny do jakości',
      'Wysoka odporność na ścieranie i nacisk',
      'Rektyfikowane krawędzie (minimalna fuga)'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
    dimensions: ['60x60 cm', '60x120 cm'],
    colors: ['Cement Grey', 'Light Ash', 'Antracite', 'Soft Beige'],
    textures: ['Satynowy surowy beton', 'Chropowata R11'],
    faq: [
      {
        question: 'Czy krawędzie płyt są proste?',
        answer: 'Tak, wszystkie płyty Zoya są rektyfikowane, co pozwala na układanie z wąską fugą 2mm lub bezfugowo na wspornikach.'
      }
    ]
  },
  {
    id: 'sintesi-nordic-stone',
    name: 'Nordic Stone Anthracite 2cm',
    brand: 'Sintesi Italy',
    category: 'sly-2cm',
    categoryName: 'Płyty tarasowe 2cm',
    subcategory: 'Sintesi Italy',
    description: 'Oryginalny włoski design inspirowany skałami skandynawskimi. Charakteryzuje się subtelnymi, jaśniejszymi żyłkami kwarcowymi, które nadają nawierzchni luksusowej głębi mineralnej.',
    priceRange: '175 - 225 zł / m²',
    features: [
      'Importowany gres włoski',
      'Unikalny wzór mineralny (żyłowanie kamienia)',
      'Pełna odporność na kwasy, sól i chemię basenową',
      'Możliwość układania bezpośrednio na trawie, żwirze lub wspornikach'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1504198266287-1659872e6590?auto=format&fit=crop&q=80&w=800',
    dimensions: ['60x60 cm', '60x90 cm', '90x90 cm'],
    colors: ['Anthracite Nordic', 'Silver Stone', 'Black Sparkle'],
    textures: ['Kamienna strukturalna', 'Tłoczony łupek'],
    faq: [
      {
        question: 'Czy te płyty można układać bezpośrednio na gruncie?',
        answer: 'Jak najbardziej. Płyty Sintesi 2cm można układać metodą suchą na podsypce żwirowej, a nawet na trawniku jako funkcjonalne ścieżki "krokowe".'
      }
    ]
  },

  // 2.2 Płyty ceramiczno-betonowe 4cm
  {
    id: 'bruk-bet-mega-4cm',
    name: 'Bruk-Bet Mega Płyty 4cm',
    brand: 'Bruk-Bet',
    category: 'sly-4cm',
    categoryName: 'Płyty ceramiczno-betonowe 4cm',
    description: 'Hybrydowe płyty o grubości 4cm łączące twardość podkładu betonowego z prestiżowym wykończeniem ceramicznym gresu. Idealne na tarasy naziemne o podwyższonym tonażu oraz prestiżowe ciągi piesze.',
    priceRange: '220 - 280 zł / m²',
    features: [
      'Niezwykła grubość 4cm — odporność na uderzenia',
      'Połączenie ceramiki szlachetnej z betonem konstrukcyjnym',
      'Fuga drenażowa lub tradycyjna',
      'Ochrona Hydrostop przed wykwitami'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&q=80&w=800',
    dimensions: ['60x60 cm', '80x80 cm'],
    colors: ['Marmur Carrara', 'Granit Szary', 'Bazalt Ciemny'],
    textures: ['Ceramiczna gładka', 'Mikrostruktura antypoślizgowa'],
    faq: [
      {
        question: 'Dlaczego warto wybrać płytę 4cm zamiast 2cm?',
        answer: 'Płyty 4cm posiadają betonowy rdzeń, co umożliwia ich tradycyjne układanie na podbudowie piaskowo-żwirowej bez konieczności wylewania płyty betonowej, jednocześnie dając luksusową nawierzchnię gresową.'
      }
    ]
  },

  // 2.3 Wsporniki tarasowe
  {
    id: 'wspornik-regulowany',
    name: 'Wsporniki regulowane serii Professional',
    brand: 'Teurgium System',
    category: 'wsporniki',
    categoryName: 'Wsporniki tarasowe',
    subcategory: 'regulowane',
    description: 'Wysokowytrzymałe wsporniki tarasowe o regulowanej wysokości z korektorem nachylenia spadku do 5%. Umożliwiają idealne wypoziomowanie płaszczyzny tarasów wentylowanych bez użycia zapraw klejowych.',
    priceRange: '4.50 - 18.50 zł / szt.',
    features: [
      'Płynna regulacja w zakresach od 17mm do nawet 320mm',
      'Szybki odpływ wody pod posadzkę',
      'Możliwość poprowadzenia instalacji m.in. kabli pod tarasem',
      'Doskonała izolacja akustyczna i termiczna'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800',
    dimensions: ['S: 17-30 mm', 'M: 30-65 mm', 'L: 65-120 mm', 'XL: 120-220 mm', 'XXL: 220-350 mm'],
    colors: ['Industrial Black'],
    textures: ['Polipropylen wzmocniony (PP)'],
    faq: [
      {
        question: 'Ile wsporników zużywa się na m² tarasu?',
        answer: 'Przeciętnie dla najpopularniejszego formatu płyt 60x60 cm zużycie wynosi około 3.2 do 4 sztuk na jeden metr kwadratowy powierzchni.'
      },
      {
        question: 'Co daje korektor nachylenia w stopie wspornika?',
        answer: 'Korektor automatycznie poziomuje nierówności podłoża lub koryguje spadek konstrukcyjny stropu (np. na balkonach) do 5%, zapewniając idealnie płaski taras dla użytkownika.'
      }
    ]
  },
  {
    id: 'wspornik-staly',
    name: 'Wsporniki stałe gumowe i modułowe',
    brand: 'Teurgium System',
    category: 'wsporniki',
    categoryName: 'Wsporniki tarasowe',
    subcategory: 'stałe',
    description: 'Wsporniki o stałej wysokości (2mm, 8mm, 10mm, 15mm) wykonane z elastycznego tworzywa lub wyciszającej gumy SBR. Idealne na równe wylewki betonowe oraz tarasy o minimalnej dostępnej wysokości.',
    priceRange: '1.20 - 4.20 zł / szt.',
    features: [
      'Tłumienie hałasu uderzeniowego (krokowego) i wibracji',
      'Ultra-niska wysokość montażowa',
      'Idealne na membrany dachowe z EPDM',
      'Stabilna konstrukcja krzyżakowa'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800',
    dimensions: ['2 mm', '8 mm', '10 mm', '16 mm'],
    colors: ['Muted Black', 'Semi-transparent'],
    textures: ['Guma elastyczna SBR', 'Tworzywo HD-PE'],
    faq: [
      {
        question: 'Czy wsporniki gumowe można piętrować?',
        answer: 'Tak, wsporniki gumowe 2mm i 8mm można nakładać na siebie w celu dokładnej niwelacji mikroróżnic w podłożu (np. do 2-3 warstw).'
      }
    ]
  },

  // 2.4 Kostka i płyty betonowe
  {
    id: 'bruk-bet-novator',
    name: 'Novator Solo Premium Bruk-Bet',
    brand: 'Bruk-Bet',
    category: 'kostka',
    categoryName: 'Kostka i płyty betonowe',
    subcategory: 'Bruk-Bet',
    description: 'Nowoczesne, wielkoformatowe płyty betonowe o grubościach 8cm i 12cm z prestiżową powłoką chroniącą przed plamami oleju i zabrudzeniami. Wybitne rozwiązanie do projektowania podjazdów, parkingów i geometrycznych alejek wokół willi.',
    priceRange: '95 - 149 zł / m²',
    features: [
      'Wytrzymałość na ruch samochodów ciężarowych (grubości 8/12cm)',
      'Ochrona Lamino z filtrem UV',
      'Precyzyjne wymiary mikro-fazowe',
      'Głębokie odcienie grafitu i melanży monokolorowych'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&q=80&w=800',
    dimensions: ['30x60 cm', '60x60 cm', '60x90 cm', '100x100 cm'],
    colors: ['Metalici Carbon', 'Szary Granit', 'Gothic Grafit', 'Silvia Jasny'],
    textures: ['Gładka impregnowana (Lamino)', 'Śrutowana (szorstka)', 'Mikrostrukturalna'],
    faq: [
      {
        question: 'Czy płyty Novator Solo odbarwiają się od opon samochodowych?',
        answer: 'Dzięki opatentowanej impregnacji powłokowej Lamino w procesie produkcyjnym, płyty posiadają zamknięte pory, co sprawia, że plamy z opon, oleju silnikowego czy brudu nie wnikają w beton i są łatwo usuwalne.'
      }
    ]
  },
  {
    id: 'settline-cube',
    name: 'Settline Classic Elegant',
    brand: 'Settline',
    category: 'kostka',
    categoryName: 'Kostka i płyty betonowe',
    subcategory: 'Settline',
    description: 'Szlachetna kostka o bezkrawędziowym wykończeniu o powierzchni płukanej, eksponującej drobiny naturalnego bazaltu, granitu i marmuru. Bardzo wygodna pod stopy i stabilna pod koła pojazdów.',
    priceRange: '75 - 110 zł / m²',
    features: [
      'Płukana szlachetna tekstura z prawdziwym kruszywem',
      'Szybkie odprowadzanie wody',
      'Wysoka odporność na mrozoodporność i sole drogowe',
      'Trzy komplementarne formaty w pakiecie montażowym'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1510251173747-593d03a228c0?auto=format&fit=crop&q=80&w=800',
    dimensions: ['Sztanga mieszana (10x10, 10x15, 20x15 cm)'],
    colors: ['Granit Grafit', 'Biały Thassos Płukany', 'Sjenit melanż'],
    textures: ['Płukana z kruszywem kamiennym', 'Satynowa szlachetna'],
    faq: [
      {
        question: 'Jakie kruszywo stosować na zasypanie spoin w kostce Settline?',
        answer: 'Zalecamy stosowanie czystego piasku kwarcowego suszonego lub drobnego gresu bazaltowego 1-3mm, który zapewni piękny kontrast i zapobiegnie klinowaniu.'
      }
    ]
  },

  // 2.5 Kruszywa dekoracyjne
  {
    id: 'otoczak-thassos',
    name: 'Otoczaki Thassos Śnieżnobiałe premium',
    brand: 'Teurgium Decor',
    category: 'kruszywa',
    categoryName: 'Kruszywa dekoracyjne',
    subcategory: 'otoczaki',
    description: 'Oryginalny marmur z greckiej wyspy Thassos, poddany precyzyjnemu procesowi otaczania (bębnowania). Charakteryzuje się krystaliczną, iskrzącą w słońcu bielą, która nadaje rabatom i opaskom luksusowy charakter.',
    priceRange: '1.200 - 1.550 zł / tona (worki 25kg / BigBag)',
    features: [
      'Autentyczny importowany marmur z Grecji',
      'Szlachetna, mieniąca się w słońcu struktura kryształków',
      'Śnieżnobiały, trwały kolor (nie żółknie jak rodzime wapienie)',
      'Bezpieczny dla roślin ogrodowych (odczyn obojętny)'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1533460004989-cef01064af7e?auto=format&fit=crop&q=80&w=800',
    dimensions: ['10-20 mm', '20-40 mm', '40-80 mm', '80-130 mm'],
    colors: ['Śnieżnobiała Crystal White'],
    textures: ['Gładka bębnowana matowa-błyszcząca'],
    faq: [
      {
        question: 'Czy pod otoczak Thassos trzeba kłaść agrotkaninę?',
        answer: 'Zdecydowanie tak. Agrotkanina lub geowłóknina zapobiega mieszaniu się śnieżnobiałego marmuru z ziemią i ogranicza wyrastanie chwastów, co oszczędza pracy konserwacyjnej.'
      }
    ]
  },
  {
    id: 'grys-granitowy',
    name: 'Grys Granitowy Szaro-Rudy Dalview',
    brand: 'Teurgium Decor',
    category: 'kruszywa',
    categoryName: 'Kruszywa dekoracyjne',
    subcategory: 'grys',
    description: 'Niezwykle trwały i naturalny grys łamany o ostrych krawędziach, dzięki czemu doskonale się klinuje i nie "pływa" pod stopami. Idealny na ścieżki i podjazdy wysypywane oraz dekoracje wokół donic tarasowych.',
    priceRange: '190 - 260 zł / tona (worki 25kg / BigBag)',
    features: [
      'Doskonałe właściwości klinowania (stabilność)',
      'Absolutna odporność na warunki atmosferyczne',
      'Naturalny, zróżnicowany kolor mineralny',
      'Ekologiczne pochodzenie wprost z polskiego kamieniołomu'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&q=80&w=800',
    dimensions: ['8-16 mm', '16-22 mm'],
    colors: ['Srebrno-szary pieprz i sól', 'Rudo-złoty szaro-mieszany'],
    textures: ['Łamany o ostrych krawędziach'],
    faq: [
      {
        question: 'Ile grysu potrzeba na 1m² powierzchni ogrodowej?',
        answer: 'Przy standardowej frakcji 8-16 mm i zalecanej warstwie około 5cm, wydajność wynosi ok. 75-80 kg kruszywa na jeden metr kwadratowy (tzw. tona na ok. 12-14m²).'
      }
    ]
  }
];

export const REALISATIONS: Realisation[] = [
  {
    id: 'r_stream',
    title: 'Luksusowy Dom Przy Strumieniu',
    category: 'ogrod',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',
    location: 'Kraków',
    materialsUsed: ['Spiek Kwarcowy', 'Aluminium', 'Płyty wielkoformatowe', 'Opaski kruszywowe'],
    description: 'Niesamowita fuzja nowoczesnej rezydencji ze zbiornikiem wodnym i luksusowo prowadzonym ogrodem. Taras i mostki wykonane ze szlachetnego spieku kwarcowego ze wstawkami z trwałego aluminium.'
  },
  {
    id: 'r_nova',
    title: 'Rezydencja Villa Nova o surowym wykończeniu',
    category: 'tarasy',
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200',
    location: 'Gdynia',
    materialsUsed: ['Gres Tarasowy Premium', 'Beton konstrukcyjny', 'Stelaż Teurgium System'],
    description: 'Imponująca rezydencja z wielopoziomowym tarasem wentylowanym. Płyty gresowe i surowe płyty elewacyjne z betonu architektonicznego tworzą minimalistyczną, harmonijną całość.'
  },
  {
    id: 'r_infinity',
    title: 'Taras widokowy z basenem Infinity & Paleniskiem',
    category: 'tarasy',
    imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1200',
    location: 'Klify nadbałtyckie',
    materialsUsed: ['Spiek Kwarcowy', 'Gres Jasny Solny 2cm', 'Wsporniki regulowane Professional'],
    description: 'Projekt tarasu rekreacyjnego wiszącego nad morzem z wbudowanym basenem infinity i eleganckim centralnym paleniskiem gazowym otoczonym luksusowymi sofami.'
  },
  {
    id: 'r1',
    title: 'Ekskluzywny taras wentylowany nad basenem',
    category: 'tarasy',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
    location: 'Wilanów, Warszawa',
    materialsUsed: ['Marazzi Mystone Ceppo di Gré 2cm', 'Wsporniki regulowane Professional Teurgium'],
    description: 'Inwestycja obejmuje 120m² nowoczesnego tarasu w technologii wentylowanej wokół podgrzewanego basenu zewnętrznego. Zastosowanie wsporników z korektorem spadku ułatwiło idealne zlicowanie z progiem salonu.'
  },
  {
    id: 'r2',
    title: 'Geometryczny podjazd rezydencji w Konstancinie',
    category: 'podjazdy',
    imageUrl: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&q=80&w=800',
    location: 'Konstancin-Jeziorna',
    materialsUsed: ['Bruk-Bet Novator Solo Gothic Grafit 8cm', 'Grys Granitowy Szaro-Rudy 8-16mm'],
    description: 'Realizacja podjazdu o powierzchni 340m² z płyt o wielkości 60x60cm, dostosowanych do parametrów obciążeń SUV i aut dostawczych. Obrzeża wykończone dekoracyjną opaską z grysu granitowego.'
  },
  {
    id: 'r3',
    title: 'Schody blokowe z tarasem wiszącym oraz ogrodem skalnym',
    category: 'schody',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
    location: 'Poznań, Kiekrz',
    materialsUsed: ['Bruk-Bet Mega Płyty 4cm', 'Wsporniki stałe gumowe', 'Otoczaki Thassos Śnieżnobiałe'],
    description: 'Kompleksowe rozwiązanie wejścia do rezydencji osadzonej na skarpie ze schodami blokowymi o szerokości 200cm oraz luksusowym ogrodem skalnym wysypanym śnieżnobiałą grecką bielą Thassos.'
  },
  {
    id: 'r4',
    title: 'Minimalistyczny ogród przy tarasie apartamentu',
    category: 'ogrod',
    imageUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=800',
    location: 'Kraków, Wola Justowska',
    materialsUsed: ['Opoczno Grand Wood Prime 2cm', 'Otoczaki Thassos Śnieżnobiałe', 'Teurgium System Akcesoria'],
    description: 'Rewitalizacja małego ogrodu miejskiego o powierzchni 50m². Taras drewnopodobny na legarach doskonale wtapia się w kontrastowe rabaty z ciemną zielenią obsypaną śnieżnobiałymi kamieniami marmurowymi.'
  }
];

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 'art-1',
    title: 'Jak poprawnie dobrać grubość płyty: 2cm, 4cm czy tradycyjna kostka?',
    category: 'Wiedza Techniczna',
    summary: 'Czy wiesz, dlaczego płyta 2cm to absolutna rewolucja w budowie tarasów, a na podjazd powinieneś szukać wyłącznie grubości min. 8cm? Wyjaśniamy obciążenia, tonaż i mrozoodporność materiałów.',
    content: `Wybór nawierzchni wokół domu to jedna z najważniejszych i najbardziej kosztownych decyzji budowlanych. Od odpowiedniego spoiwa i grubości elementów zależy to, czy nawierzchnia wytrzyma mrozy, zginanie oraz ciężki tonaż rodzinnych pojazdów.

### Płyty tarasowe 2cm – Standard XXI wieku
Płyty gresowe o grubości 2cm to obecnie najchętniej wybierany materiał na nowoczesne tarasy i balkony. Dlaczego?
- **Unikalny stosunek wagi do wytrzymałości:** Płyty są relatywnie lekkie (ok. 45-50 kg/m²), ale dzięki zagęszczeniu molekularnemu kwasoodpornej gliny wytrzymują nacisk rzędu kilkuset kilogramów na jedną płytkę. Odpowiada to wytrzymałości płyt betonowych o grubości 6-8cm.
- **Taras Wentylowany:** Grubość 2cm ułatwia montaż na plastikowych podkładkach wspornikowych bez grama kleju. Woda wcieka w szczeliny 2-3mm między płytami i odpływa pod taras wprost na izolację przeciwwodną. Zero pękania płytek związanych klejem cementowym na mrozie!

### Płyty ceramiczno-betonowe 4cm – Rozwiązanie hybrydowe
Są wyjątkowym kompromisem: spodem stanowi stabilny beton konstrukcyjny, a wierzchnią warstwą jest naklejona, spieczona ceramika odporna na tłuszcz, chemię i brud. 
- Płyty 4cm są znacznie cięższe, dzięki czemu można układać je tradycyjną metodą brukarstwa (bezpośrednio na podsypkę cementowo-piaskową bez fundamentu betonowego). To idealny wybór na tarasy naziemne, ścieżki i wejścia, gdzie grunt jest stabilny i gliniasty.

### Podjazdy z kostki i płyt min. 8cm
Płyty 2cm i 4cm są płytami wyłącznie do ruchu pieszego (tarasy, schody). Wjechanie na nie autem skończy się niemal natychmiastowym pęknięciem. Do budowy odpornego podjazdu wymagane są grubości min. 8cm (np. Bruk-Bet Novator Solo 8cm/12cm). Takie płyty posiadają odpowiednie właściwości sprężysto-wytrzymałościowe pod nacisk opon samochodowych (nawet ciężarowych przy dostawach opału czy przeprowadzkach).`,
    readTime: '5 min czytania',
    imageUrl: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&q=80&w=800',
    publishDate: '24 Maja 2026'
  },
  {
    id: 'art-2',
    title: 'Taras wentylowany na wspornikach vs taras klejony do wylewki',
    category: 'Poradnik Inwestora',
    summary: 'Dlaczego aż 90% naszych klientów decyduje się obecnie na technologię wentylowaną? Analizujemy koszty, trwałość na polskie mrozy i trudności montażowe obu systemów.',
    content: `Tradycyjny model budowy tarasu w Polsce: wylewka betonowa, klejenie płytek ceramicznych elastycznym klejem i cementowe fugowanie. Brzmi znajomo? Niestety, w naszym klimacie (ok. 50-80 cykli zamrażania i rozmrażania w ciągu jednego roku!) ten system ulega zniszczeniu średnio po 3-5 sezonach. 

### Słaby punkt tarasów klejonych
Fugi mineralne nigdy nie są w 100% szczelne. Mikroskopijne cząsteczki wody wnikają pod płytkę w strukturę kleju. Zimą woda zamarza, zwiększając objętość i rozsadza połączenia klejowe. Rezultat? Odspajanie płytek, głuche odgłosy przy stąpaniu i konieczność skuwania całego tarasu.

### Dlaczego wentylowany (na wspornikach) wygrywa?
W technologii tarasu wentylowanego płyty gresowe 2cm leżą luźno oparte na rogach na wspornikach z tworzywa sztucznego. 
1. **Brak wiązań sztywnych:** Nie ma kleju ani fug cementowych. Całość pracuje elastycznie z budynkiem i temperaturą. Mrozy nie mają absolutnie żadnego punktu zaczepienia, który mogłyby rozsadzić.
2. **Banalna reparacja:** Jeśli pod tarasem np. dojdzie do usterki kabla instalacji ogrodowej, po prostu podnosisz jedną płytkę przyssawką, poprawiasz instalację i odkładasz ją z powrotem. Koszt naprawy: 0zł.
3. **Zawsze suchy taras:** Woda spływa przez wolne szczeliny pod spód płyty. Brak kałuż na powierzchni ułatwia stąpanie i eliminuje śliskie, zielone glony polubiające wilgoć.

Podsumowując koszty: Choć wsporniki regulowane i płyty 2cm to koszt nieznacznie wyższy na starcie w porównaniu do standardowego klejenia płytek, to uwzględniając trwałość na kilkadziesiąt lat oraz uniknięcie kosztów skuwania i ponownego układania, taras wentylowany jest systemem zdecydowanie tańszym i bezstresowym.`,
    readTime: '6 min czytania',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800',
    publishDate: '10 Kwietnia 2026'
  },
  {
    id: 'art-3',
    title: 'Marazzi vs Opoczno – Porównanie włoskiego i polskiego gresu premium',
    category: 'Aranżacje',
    summary: 'Czy warto płacić więcej za importowany gres z włoskiej fabryki Marazzi, czy rodzimy produkt z serii Opoczno spełnia wysokie standardy luksusu i parametrów mrozoodpornych?',
    content: `Klienci poszukujący płyt tarasowych 2cm Premium niemal zawsze stają przed tą samą decyzją: rdzennie włoskie dziedzictwo i unikalna elegancja kamienia Marazzi, czy krajowy czempion, Opoczno, z darmową spedycją i przystępnym progiem cenowym? 

W tym artykule obiektywnie porównujemy oba wiodące brandy w portfolio Teurgium.

### Parametry techniczne – remis na światowym poziomie
Zarówno Marazzi, jak i Opoczno produkują gresy w pełni spieczone (porcelanowe):
- **Nasiąkliwość wodna:** < 0.5% (norma europejska, oznaczająca brak pochłaniania wilgoci).
- **Antypoślizgowość:** Klasa R11 ze strukturą chropowatą – identyczna przyczepność ułatwiająca chodzenie w deszczu czy przy wilgotnym twardym szronie jesiennym.

### Wzornictwo (Design) – lekka przewaga Marazzi
- **Marazzi:** Włoski koncern współpracuje z najlepszymi światowymi studiami projektowymi. Ich odwzorowania legendarnych kamieni jak Ceppo di Gré czy wapień Limestone mają niesamowitą różnorodność grafik na pojedynczych kafelkach (często aż do 30-45 unikalnych matryc przed powtórzeniem wzoru). Oznacza to, że układając duży taras 100m², wzory nie powtarzają się sztucznie w siatce, tworząc prawdziwie monolitową strukturę kamieniołomu.
- **Opoczno:** Posiada wybitną ofertę drewnopodobną (seria Grand Wood). Słoje gresu imitujące dąb czy orzech sprawiają niesamowicie wierne odczucie dotykowe drewna. Projekty kamienne (np. Grey Sand) są bardzo solidne, lecz posiadają mniejszą rozpiętość tonalną (mniej zróżnicowanych płytek w paczkach) niż włoscy liderzy.

### Cena i Logistyka – zdecydowana wygrana Opoczno
- **Opoczno:** Ceny zaczynają się od ok. 150-160zł brutto za m². Atutem jest niesłychanie szybka dostępność (produkcja w Polsce pozwala nam na dostawę na budowę klienta w ciągu 2-4 dni roboczych).
- **Marazzi:** Wyjątkowość kosztuje – cena oscyluje w ok. 190-250zł/m². Import z fabryk we Włoszech może ulegać wahaniom spedycyjnym i standardowo trwa od 7 do 15 dni roboczych w szczycie sezonu.

### Werdykt eksperta Teurgium
Wybierz **Marazzi**, jeżeli Twój projekt stawia na bezkompromisowy kamienny szyk i szukasz nieszablonowych szarości o zoptymalizowanym rozmyciu żyłkowym. Wybierz **Opoczno**, jeśli kochasz styl ciepłego drewna na tarasie bądź zależy Ci na możliwie najszybszym i najbardziej opłacalnym domknięciu prac budowlanych przed nadejściem jesieni.`,
    readTime: '4 min czytania',
    imageUrl: 'https://images.unsplash.com/photo-1504198266287-1659872e6590?auto=format&fit=crop&q=80&w=800',
    publishDate: '12 Marca 2026'
  }
];

export const REVIEWS = [
  {
    name: 'Janusz Wiśniewski',
    role: 'Właściciel rezydencji pod Warszawą',
    stars: 5,
    text: 'Zamawiałem płyty Marazzi Ceppo 2cm na taras wentylowany (ponad 150m²). Fachowe doradztwo techniczne i bezbłędny dobór wsporników regulowanych professional. System konfiguracji wyceny pozwolił mi dokładnie dopasować ilość pod krawędzie. Klasa sama w sobie!',
    date: '10 Maja 2026'
  },
  {
    name: 'Marta i Piotr Kaczmarek',
    role: 'Nowo wybudowany dom w Poznaniu',
    stars: 5,
    text: 'Teurgium to profesjonaliści jakich mało. Konfigurator zapytań o ofertę z macierzą produktów pomógł nam w zestawieniu płyt Bruk-Bet na podjazd z grysami i płytami na taras. Zapytanie wyszło przejrzyste, odpowiedź z kalkulacją dostaliśmy następnego dnia rano. Polecam!',
    date: '28 Kwietnia 2026'
  },
  {
    name: 'mgr inż. arch. Robert Zawadzki',
    role: 'Pracownia Architektury i Krajobrazu',
    stars: 5,
    text: 'Jako projektant krajobrazu cenię u dostawców precyzję techniczną. Teurgium dostarcza kompletne pliki specyfikacji, nie używają badziewnych iframe’ów i mają niesamowitej jakości importowany gres. Ich chatbot techniczny pomógł mojemu asystentowi w błękitu w miarach rozstawu na wspornikach.',
    date: '12 Kwietnia 2026'
  }
];

export const PROMOTIONS = [
  {
    title: 'Wyprzedaż kolekcji Marazzi Mystone',
    tag: 'Rabat do -15%',
    description: 'Końcówka kolekcji Ceppo di Gré we formatach 60x60cm dostępna od ręki w magazynie centralnym. Idealne na szybkie wykończenie letniego tarasu.',
    productId: 'marazzi-mystone-ceppo',
    bgGradient: 'from-amber-950 to-neutral-900',
    btnText: 'Sprawdź okazję'
  },
  {
    title: 'Wiosenny rabat na wsporniki regulowane',
    tag: 'Pakiet korzyści',
    description: 'Zamów gresy 2cm i otrzymaj wsporniki professional z amortyzatorami gumowymi aż 10% taniej. Bezpieczny i cichy taras wentylowany.',
    productId: 'wspornik-regulowany',
    bgGradient: 'from-stone-900 to-sky-950',
    btnText: 'Skonfiguruj zapytanie'
  },
  {
    title: 'Podjazd Premium 2026 - Bruk-Bet Novator',
    tag: 'Gwarancja Ceny',
    description: 'Płyty Novator Solo Carbon w rewelacyjnej cenie przedsezonowej. Zapytaj o darmowy transport powyżej 150m² na terenie całego kraju.',
    productId: 'bruk-bet-novator',
    bgGradient: 'from-emerald-950 to-neutral-900',
    btnText: 'Odbierz ofertę'
  }
];
