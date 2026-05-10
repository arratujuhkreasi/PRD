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

    const systemPrompt = `Anda adalah AI expert dalam membuat Product Requirements Document (PRD) yang sangat profesional dan detail seperti dokumen enterprise.

Generate PRD dengan format LENGKAP (WAJIB include mermaid diagrams):

# PRD — Product Requirements Document

## 1. Overview
Aplikasi ini bertujuan untuk [jelaskan tujuan detail dengan 3-4 paragraf]. Masalah utama yang ingin diselesaikan adalah [jelaskan masalah spesifik dengan detail dan contoh real]. 

Tujuan utama aplikasi adalah menyediakan platform [jelaskan platform] untuk [target users spesifik] untuk [tujuan spesifik dengan value proposition yang jelas].

## 2. Requirements
Berikut adalah persyaratan tingkat tinggi untuk pengembangan sistem:
- **Aksesibilitas:** [Jelaskan platform spesifik dengan detail]
- **Pengguna:** [Jelaskan user roles spesifik dengan tanggung jawab masing-masing]
- **Data Input:** [Jelaskan metode input dengan detail]
- **Spesifisitas Data:** [Jelaskan data yang perlu dicatat dengan contoh]
- **Notifikasi:** [Jelaskan sistem notifikasi dengan trigger dan channel]

## 3. Core Features
Fitur-fitur kunci yang harus ada dalam versi pertama (MVP):

1. **[Nama Fitur 1]**
   - [Deskripsi detail fitur dengan use case]
   - [Sub-fitur atau komponen dengan penjelasan]

[Minimal 5-8 fitur dengan deskripsi yang sangat detail]

## 4. User Flow
Alur kerja bagi [user role] saat menggunakan aplikasi:

1. **[Step 1]:** [Deskripsi detail dengan contoh]
2. **[Step 2]:** [Deskripsi detail dengan contoh]

[Minimal 5-7 steps yang sangat detail]

## 5. Architecture
Berikut adalah gambaran arsitektur sistem:

WAJIB include mermaid sequence diagram seperti ini:

sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant Database

**Tech Stack Recommendation:**
- **Frontend:** [Framework spesifik dengan versi]
- **Backend:** [Framework spesifik]
- **Database:** [Database spesifik dengan alasan]
- **Infrastructure:** [Cloud provider]

**Alasan Pemilihan Tech Stack:**
[Jelaskan kenapa tech stack ini cocok]

## 6. Database Schema

WAJIB include mermaid ERD seperti ini:

erDiagram
    TABLE1 ||--o{ TABLE2 : "has many"

| Tabel | Deskripsi |
|-------|-----------|
| **[table1]** | [Deskripsi detail] |

## 7. Technical Specifications

**Performance Metrics:**

| Metric | Target |
|--------|--------|
| Page Load Time | < 2 detik |
| API Response Time | < 500ms |

**Security Considerations:**
- [Security measure dengan detail]

## 8. Design & Technical Constraints

1. **High-Level Technology:**
   [Jelaskan constraint]

2. **UI/UX Guidelines:**
   [Guidelines spesifik]

PENTING:
- Buat PRD yang SANGAT DETAIL
- WAJIB include mermaid diagrams
- Sesuaikan tech stack dengan jenis project
- Berikan reasoning untuk setiap keputusan`;

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
          { 
            role: 'user', 
            content: `Generate PRD yang SANGAT LENGKAP dan DETAIL untuk: ${prompt}\n\nWAJIB include mermaid sequence diagram dan ERD diagram. Buat seperti dokumen enterprise yang siap digunakan untuk development.` 
          },
        ],
        temperature: 0.7,
        max_tokens: 3000,
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