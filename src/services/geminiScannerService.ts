import { DiagnosticTest, TestParameter, ResultStatus } from '../types';

export interface GeminiScanResponse {
  isTestStrip: boolean;
  rejectionReason?: string;
  testName: string;
  testCategory: 'Urine' | 'Drug' | 'Antifreeze' | 'Blood Chemistry';
  overallStatus: ResultStatus;
  summaryNotes: string;
  parameters: TestParameter[];
  stripPads: string[];
}

/**
 * Sends a captured image to Google Gemini 2.5 Flash Vision API.
 * Performs rigorous optical validation:
 * 1. Checks if the image is truly a medical/veterinary reagent test strip.
 * 2. If NOT a test strip, returns isTestStrip: false with reason.
 * 3. If valid, analyzes individual reagent pads, extracts hex colors and diagnostic values.
 */
export async function analyzeTestStripWithGemini(
  imageBase64OrUrl: string,
  selectedProduct: string = 'Veti-Stx 9 Urinalysis',
  apiKey?: string
): Promise<GeminiScanResponse> {
  const activeKey =
    apiKey ||
    ((import.meta as any).env?.VITE_GEMINI_API_KEY as string) ||
    '';

  // Helper to convert an image URL (like sample strip) into base64 if needed
  let cleanBase64 = '';
  let mimeType = 'image/jpeg';

  if (imageBase64OrUrl.startsWith('data:')) {
    const match = imageBase64OrUrl.match(/^data:(image\/[a-zA-Z0-9+.-]+);base64,/);
    if (match) {
      mimeType = match[1];
    }
    cleanBase64 = imageBase64OrUrl.replace(/^data:image\/[a-zA-Z0-9+.-]+;base64,/, '');
  } else if (imageBase64OrUrl.startsWith('http') || imageBase64OrUrl.startsWith('/')) {
    try {
      const fetchRes = await fetch(imageBase64OrUrl);
      const blob = await fetchRes.blob();
      mimeType = blob.type || 'image/jpeg';
      const arrayBuffer = await blob.arrayBuffer();
      const uint8 = new Uint8Array(arrayBuffer);
      let binary = '';
      for (let i = 0; i < uint8.byteLength; i++) {
        binary += String.fromCharCode(uint8[i]);
      }
      cleanBase64 = btoa(binary);
    } catch (e) {
      console.warn('Could not fetch image for Gemini base64 conversion', e);
    }
  }

  // If we couldn't parse image or no API key, reject or fallback
  if (!activeKey || !cleanBase64) {
    throw new Error('Gemini API key is missing or invalid image format.');
  }

  const prompt = `
You are an expert Veterinary Diagnostic Reagent Test Strip Optical Analyzer for Kacey Diagnostics.
Examine the provided image carefully.

NOTE ON IMAGE SOURCE:
The user might photograph a physical reagent test strip OR photograph a test strip displayed on another mobile phone screen, tablet, or monitor. Accept both! Screen glares or slight moiré patterns from photographing another phone should be tolerated as long as colored rectangular reagent pads are visible.

CRITICAL FIRST TASK - STRIP VALIDATION:
Check if this image depicts a veterinary or medical diagnostic reagent strip (a narrow strip containing colored chemical reagent pads arranged sequentially).

IF THE IMAGE IS DEFINITELY NOT A REAGENT STRIP (e.g. human face, pet portrait, car, chair, wall, food, empty room, or completely black image):
Return this JSON:
{
  "isTestStrip": false,
  "rejectionReason": "No medical test strip detected. Please align the test strip inside the viewfinder.",
  "testName": "Unknown",
  "testCategory": "Urine",
  "overallStatus": "Abnormal",
  "summaryNotes": "Invalid image. No reagent strip detected.",
  "stripPads": [],
  "parameters": []
}

IF A TEST STRIP IS PRESENT (either physical or on screen):
Perform colorimetric analysis:
1. Count each colored reagent pad arranged along the strip.
2. For each pad from top to bottom:
   - Identify which chemical parameter it represents (e.g. Leukocytes, Nitrite, Urobilinogen, Protein, pH, Blood, Specific Gravity, Ketones, Bilirubin, Glucose, or Ethylene Glycol).
   - Detect the exact hexadecimal color of the pad (#RRGGBB).
   - Determine the diagnostic value (e.g. "Negative", "Trace", "15 mg/dL", "6.5", "1.025", "Positive").
   - Classify as "Normal", "Trace", "Positive", or "Abnormal".
3. Formulate overallStatus: "Normal" (if all baseline healthy), "Trace", "Positive", or "Abnormal" (if elevated or danger detected).
4. Provide a professional clinical summary in summaryNotes.

Respond ONLY with valid JSON matching this schema:
{
  "isTestStrip": true,
  "rejectionReason": null,
  "testName": "${selectedProduct}",
  "testCategory": "Urine",
  "overallStatus": "Normal",
  "summaryNotes": "Brief clinical interpretation of readings",
  "stripPads": ["#hex1", "#hex2", "#hex3", "#hex4"],
  "parameters": [
    {
      "id": "param-1",
      "name": "Parameter Name",
      "value": "Measured Value",
      "status": "Normal",
      "normalRange": "Expected Range",
      "padColorHex": "#hexColor",
      "referenceColors": [
        {"label": "Neg", "colorHex": "#hex1", "status": "Normal"},
        {"label": "Pos", "colorHex": "#hex2", "status": "Positive"}
      ]
    }
  ]
}
Return pure JSON only. Do not include markdown ticks, backticks, or any explanation.
`;

  const candidateModels = [
    'gemini-3.1-flash-lite',
    'gemini-3.8-flash',
    'gemini-flash-latest',
  ];

  let parsed: GeminiScanResponse | null = null;
  let lastError: any = null;

  for (const model of candidateModels) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${activeKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  { text: prompt },
                  {
                    inline_data: {
                      mime_type: mimeType,
                      data: cleanBase64,
                    },
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.1,
              maxOutputTokens: 2048,
              responseMimeType: 'application/json',
            },
          }),
        }
      );

      if (!response.ok) {
        const errorBody = await response.text();
        console.warn(`Model ${model} returned ${response.status}:`, errorBody);
        continue;
      }

      const data = await response.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      const cleanedJson = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
      parsed = JSON.parse(cleanedJson);
      if (parsed) break;
    } catch (err) {
      lastError = err;
    }
  }

  if (!parsed) {
    throw new Error(
      lastError?.message || 'Gemini Vision Analysis could not complete with available models.'
    );
  }

  return parsed;
}
