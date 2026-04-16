import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export interface AntikResult {
  title: string;
  category: string;
  period: string;
  style: string;
  condition: string;
  valueRange: { min: number; max: number; currency: string };
  searchTerms: string[];
  description: string;
  confidence: "high" | "medium" | "low";
}

const SYSTEM_PROMPT = `Du bist ein erfahrener Antiquitätenexperte und Auktionator mit 30 Jahren Erfahrung.
Du erkennst Antiquitäten präzise und gibst realistische Marktwerteinschätzungen.
Antworte IMMER ausschließlich mit validem JSON — keine Erklärungen, keine Codeblöcke.`;

const USER_PROMPT = `Analysiere dieses Objekt und antworte mit exakt diesem JSON-Schema:
{
  "title": "Präziser Objektname auf Deutsch",
  "category": "Eine von: Möbel | Schmuck | Gemälde | Porzellan | Glas | Silber | Uhr | Textilien | Skulptur | Sonstiges",
  "period": "Zeitperiode mit Jahren z.B. 'Biedermeier (1815–1848)'",
  "style": "Stilrichtung z.B. 'Jugendstil', 'Rokoko', 'Bauhaus'",
  "condition": "Einer von: Sehr gut | Gut | Befriedigend | Restaurierungsbedarf",
  "valueRange": { "min": 0, "max": 0, "currency": "EUR" },
  "searchTerms": ["deutscher Suchbegriff 1", "deutscher Suchbegriff 2", "englischer Begriff 3"],
  "description": "2–3 prägnante Sätze für potenzielle Käufer. Was macht das Stück besonders?",
  "confidence": "high wenn sicher, medium wenn wahrscheinlich, low wenn unsicher"
}

Wichtig bei valueRange: Realistischer Auktionsmarktwert in EUR. Bei Unsicherheit lieber breiter schätzen.`;

export async function identifyAntique(
  imageBase64: string,
  mimeType: string
): Promise<AntikResult> {
  const validMimeTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
  if (!validMimeTypes.includes(mimeType)) {
    throw new Error("Ungültiges Bildformat. Bitte JPEG, PNG oder WebP verwenden.");
  }

  const response = await client.messages.create({
    model: "claude-opus-4-7",
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image",
            source: {
              type: "base64",
              media_type: mimeType as "image/jpeg" | "image/png" | "image/gif" | "image/webp",
              data: imageBase64,
            },
          },
          { type: "text", text: USER_PROMPT },
        ],
      },
    ],
  });

  const textBlock = response.content.find((b) => b.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("Keine Antwort von Claude erhalten");
  }

  const jsonMatch = textBlock.text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("Antwort konnte nicht verarbeitet werden");
  }

  return JSON.parse(jsonMatch[0]) as AntikResult;
}
