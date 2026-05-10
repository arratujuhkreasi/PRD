import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 300;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { prompt } = body;

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: 'Valid prompt is required' }, { status: 400 });
    }

    const apiKey = '71aea63d-9af0-4944-8f25-98aab3f96033';

    const systemPrompt = `Anda adalah AI expert dalam membuat Product Requirements Document (PRD) profesional.

Generate PRD dengan format:

# PRD — Product Requirements Document

## 1. Overview
[Jelaskan tujuan, masalah, dan target users]

## 2. Requirements
[Bullet points persyaratan spesifik]

## 3. Core Features
[List 5-8 fitur utama dengan priority HIGH/MEDIUM/LOW]

## 4. User Flow
[Alur pengguna step-by-step]

## 5. Architecture
[Tech stack recommendation dan arsitektur]

## 6. Technical Specifications
[Performance metrics dan security]

## 7. Design & Technical Constraints
[Guidelines teknis]

Buat PRD yang spesifik dan actionable!`;

    console.log('Calling Sambanova API...');

    const apiResponse = await fetch('https://api.sambanova.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'Meta-Llama-3.3-70B-Instruct',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Generate PRD lengkap untuk project: ${prompt}` },
        ],
        temperature: 0.7,
        max_tokens: 2500,
      }),
    });

    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();
      console.error('Sambanova API Error:', errorText);
      return NextResponse.json(
        { error: 'Sambanova API error', details: errorText },
        { status: apiResponse.status }
      );
    }

    const data = await apiResponse.json();
    const generatedPRD = data.choices?.[0]?.message?.content;

    if (!generatedPRD) {
      return NextResponse.json(
        { error: 'No content generated' },
        { status: 500 }
      );
    }

    console.log('PRD generated successfully');
    return NextResponse.json({ prd: generatedPRD });
    
  } catch (error: any) {
    console.error('Error:', error.message);
    return NextResponse.json(
      { error: 'Failed to generate PRD', details: error.message },
      { status: 500 }
    );
  }
}