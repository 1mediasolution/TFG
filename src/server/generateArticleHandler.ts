import { GoogleGenAI } from '@google/genai';

export interface GenerateArticleRequest {
  topic?: string;
  category?: 'Macro Economy' | 'Venture Capital' | 'Fintech & Banking' | 'Founders';
  authorName?: string;
  authorRole?: string;
  authorCompany?: string;
  subdomain?: string;
  type?: 'editorial' | 'thought_leadership' | 'market_wire';
}

export interface GeneratedArticleResult {
  title: string;
  excerpt: string;
  category: 'Macro Economy' | 'Venture Capital' | 'Fintech & Banking' | 'Founders';
  content: string;
  readTime: string;
  tags: string[];
}

export async function generateArticleContent(params: GenerateArticleRequest): Promise<GeneratedArticleResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured on the server');
  }

  const ai = new GoogleGenAI({ apiKey });

  const category = params.category || 'Venture Capital';
  const role = params.authorRole || 'Founder & Managing Partner';
  const name = params.authorName || 'The Founder Grid Syndicate';
  const topic = params.topic || `Emerging trends and strategic market dynamics in ${category}`;
  const isEditorial = params.type === 'editorial';

  const systemPrompt = `You are a world-class financial editor and strategic thought-leader for "The Founder Grid", an elite publication and private founder syndicate akin to The Financial Times, Bloomberg Markets, and Harvard Business Review.

Generate a comprehensive, deeply analytical, and authoritative business article in raw valid JSON format.

Article Requirements:
1. Category must strictly be one of: "Macro Economy", "Venture Capital", "Fintech & Banking", "Founders".
2. Title: A sharp, compelling, editorial headline (no clickbait, executive tone).
3. Excerpt: A high-density 2-sentence executive summary.
4. Content: A structured 4-to-5 paragraph dispatch containing:
   - Executive Context & Industry Catalysts
   - Quantitative & Strategic Analysis
   - Operational Implications for Founders & Fund Managers
   - Forward Outlook & Key Takeaways
5. ReadTime: e.g. "4 min read" or "5 min read".
6. Tags: Array of 3-4 professional market tags.

Author Persona: ${name} (${role})
Topic/Prompt: ${topic}
Target Category: ${category}
${isEditorial ? 'Perspective: Lead Editorial Board Intelligence' : 'Perspective: Founder Thought-Leadership Dispatch'}

Return ONLY valid JSON matching this schema:
{
  "title": "string",
  "excerpt": "string",
  "category": "Macro Economy | Venture Capital | Fintech & Banking | Founders",
  "content": "string (formatted with clean paragraphs separated by double newlines)",
  "readTime": "string",
  "tags": ["string", "string", "string"]
}`;

  // Try robust models in succession: gemini-3.1-flash-lite, then gemini-3.6-flash, then gemini-3.8-flash
  const modelsToTry = ['gemini-3.1-flash-lite', 'gemini-3.6-flash', 'gemini-3.8-flash'];
  let lastError: any = null;

  for (const modelName of modelsToTry) {
    try {
      const response = await ai.models.generateContent({
        model: modelName,
        contents: systemPrompt,
        config: {
          responseMimeType: 'application/json'
        }
      });

      const text = response.text?.trim() || '';
      if (text) {
        const parsed = JSON.parse(text);
        if (parsed.title && parsed.content) {
          return {
            title: parsed.title,
            excerpt: parsed.excerpt || parsed.title,
            category: (['Macro Economy', 'Venture Capital', 'Fintech & Banking', 'Founders'].includes(parsed.category)
              ? parsed.category
              : category) as any,
            content: parsed.content,
            readTime: parsed.readTime || '4 min read',
            tags: Array.isArray(parsed.tags) ? parsed.tags : [category, 'Executive Dispatch']
          };
        }
      }
    } catch (err: any) {
      lastError = err;
      console.warn(`[AI Article Gen] Model ${modelName} encountered:`, err.message || err);
      // continue to next model
    }
  }

  throw new Error(lastError?.message || 'Failed to generate article from Gemini AI');
}
