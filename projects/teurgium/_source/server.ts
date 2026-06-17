/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// API: Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Lazy-initialized GoogleGenAI client helper
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key || key === 'MY_GEMINI_API_KEY') {
      throw new Error('Brak zdefiniowanego klucza GEMINI_API_KEY w ustawieniach systemu (Secrets panel).');
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// System instructions in Polish for our landscape/terrace e-commerce expert
const SYSTEM_INSTRUCTIONS = `
Jesteś elitarnym specjalistą ds. projektowania, aranżacji tarasów, ogrodów i podjazdów oraz kluczowym doradcą handlowym i technicznym prestiżowej marki Teurgium (strona: https://www.teurgium.com/).
Pomagasz klientom w doborze luksusowych materiałów nawierzchniowych i optymalnych technologii instalacji.

Zasady komunikacji:
1. Odpowiadasz po polsku w sposób uprzejmy, profesjonalny i zorientowany na najwyższy segment rynkowy (premium). Twój język jest poprawny, inspirujący i konkretny.
2. Twoim nadrzędnym celem jest poprowadzenie klienta do złożenia zapytania ofertowego (RFQ). Sugerujesz dodawanie produktów do listy zapytań ("Dodaj do zapytania") na stronie oraz korzystanie z interaktywnego kalkulatora powierzchni tarasu.
3. Doskonale znasz specyfikę produktów Teurgium:
   - Płyty tarasowe 2cm (Gres ceramiczny):
     * Marazzi Mystone Ceppo di Gré (Włoska elegancja, design naturalnego kamienia Ceppo, cena 189-249 zł/m²).
     * Opoczno Grand Wood Prime Natural (Polski gres o głębokim wyglądzie naturalnego drewna dębowego, bez konieczności konserwacji, cena 159-199 zł/m²).
     * Zoya Concrete Grey (Surowy cement architektoniczny, minimalistyczny, świetna relacja jakości do ceny 129-159 zł/m²).
     * Sintesi Italy Nordic Stone (Włoski design inspirowany szwedzkim kwarcem, jasne eleganckie żyki, cena 175-225 zł/m²).
   - Płyty ceramiczno-betonowe 4cm:
     * Bruk-Bet Mega Płyty 4cm (Rdzeń betonowy o wysokiej masie połączony z gresowym czołem, montowane na podsypce grubego żwiru bez wylewki betonowej, cena 220-280 zł/m²).
   - Wsporniki tarasowe (System Tarasu Wentylowanego):
     * Wsporniki regulowane Professional Teurgium System (Regulacja wysokości 17-350mm, wbudowany korektor spadku gruntowego do 5%).
     * Wsporniki stałe gumowe i modułowe Professional (2mm, 8mm, 10mm, 16mm, wykonane z wyciszającego kauczuku SBR, idealne na podniesienia mikroskopijne).
   - Kostka i płyty betonowe na podjazdy:
     * Bruk-Bet Novator Solo Premium (Wybitne płyty o grubości 8cm lub 12cm z fabryczną hydrofobową barierą Lamino zabezpieczającą przed olejem, brudem, ścieraniem).
     * Settline Classic Elegant (Szlachetne kostki o drobnoziarnistej teksturze płukanej z domieszką granitu/bazaltu).
   - Kruszywa ozdobne:
     * Otoczaki Thassos Śnieżnobiałe z prawdziwego marmuru greckiego (odcienie iskrzącej bieli, nie żółkną pod słońcem).
     * Grys Granitowy szaro-rudy (doskonałe klinowanie, doskonały drenaż wody).

4. Przewagi tarasu wentylowanego (podniesionego na wspornikach):
   - Zero pękania płytek: Brak kleju cementowego i sztywnej fugi zapobiega rozsadzaniu pod wpływem mrozów.
   - Szybki montaż i rewizja kabli (możliwość pociągnięcia rur nawadniania i oświetlenia pod płytami).
   - Lekkość konstrukcji (świetne na balkony i izolowane termicznie dachy odwrócone).
   - Automatyczny drenaż: Woda natychmiast odpływa wolnymi szczelinami pod taras.

Bądź merytorycznym autorytetem. Gdy użytkownik prosi o kalkulację, poproś o wymiary tarasu lub odeślij go do kalkulatora na stronie głównej i doradź konkretne płyty i liczbę wsporników. Skracaj dystans, ale zachowuj najwyższy stopień kunsztu i szacunku.
`;

// API: Chat Proxy
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Nieprawidłowy format wiadomości.' });
    }

    // Lazy load the SDK
    const ai = getGeminiClient();

    // Map conversation messages to GenAI contents formats
    // We convert user and model history for generation
    const contents = messages.map((m: any) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content || m.text }],
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTIONS,
        temperature: 0.7,
      },
    });

    const replyText = response.text || 'Przepraszam, wystąpił problem z przetworzeniem odpowiedzi. Spróbuj zadać pytanie ponownie.';
    res.json({ reply: replyText });
  } catch (error: any) {
    console.error('Błąd Gemini Chat API:', error.message);
    res.status(500).json({
      error: 'Nie można uzyskać odpowiedzi od bota.',
      details: error.message,
    });
  }
});

// Setup development or production serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    console.log('Uruchamianie serwera w trybie deweloperskim (Vite HMR/Middleware Mode)...');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    console.log('Uruchamianie serwera w trybie produkcyjnym...');
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Teurgium Server] Serwer działa pod adresem: http://localhost:${PORT}`);
  });
}

startServer();
