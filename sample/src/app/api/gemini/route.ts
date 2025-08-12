import { NextResponse } from 'next/server';
import { getTextModel } from '../../../lib/geminiClient';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: 'Invalid prompt' }, { status: 400 });
    }
    const model = getTextModel();
    const result = await model.generateContent(prompt);
    const reply = result?.response?.text() || 'No response.';
    return NextResponse.json({ reply });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Gemini request failed' }, { status: 500 });
  }
}
