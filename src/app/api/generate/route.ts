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

Generate PRD dengan format LENGKAP seperti contoh berikut (WAJIB include mermaid diagrams):

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
   - [Technical consideration]

[Minimal 5-8 fitur dengan deskripsi yang sangat detail]

## 4. User Flow
Alur kerja bagi [user role] saat menggunakan aplikasi:

1. **[Step 1]:** [Deskripsi detail dengan contoh]
2. **[Step 2]:** [Deskripsi detail dengan contoh]
3. **[Step 3]:** [Deskripsi detail dengan contoh]

[Minimal 5-7 steps yang sangat detail]

## 5. Architecture
Berikut adalah gambaran arsitektur sistem dan aliran data secara teknis:

```mermaid
sequenceDiagram
    participant User as [User Role]
    participant UI as Frontend ([Tech])
    participant Server as Backend ([Tech])
    participant DB as Database ([DB Type])

    Note over User, DB: [Proses Utama - Jelaskan]

    User->>UI: [Action spesifik]
    UI->>Server: [Request dengan detail]
    Server->>DB: [Query spesifik]
    DB-->>Server: [Response dengan data]
    Server-->>UI: [Processed data]
    UI-->>User: [Display result]
```

**Tech Stack Recommendation:**
- **Frontend:** [Framework spesifik dengan versi - Next.js 14, React Native 0.72, dll]
- **Backend:** [Framework spesifik - Node.js + Express, Python + FastAPI, dll]
- **Database:** [Database spesifik dengan alasan - PostgreSQL 15, MongoDB 6, dll]
- **Caching:** [Redis, Memcached, dll jika diperlukan]
- **Infrastructure:** [Cloud provider dengan services - AWS EC2, Vercel, dll]
- **Authentication:** [Auth solution - NextAuth, Firebase Auth, Auth0, dll]
- **Storage:** [File storage - S3, Cloudinary, dll]
- **Payment:** [Jika e-commerce - Stripe, Midtrans, Xendit, dll]

**Alasan Pemilihan Tech Stack:**
[Jelaskan 2-3 paragraf kenapa tech stack ini cocok untuk project ini, pertimbangan scalability, cost, dan team expertise]

## 6. Database Schema

Berikut adalah Entity Relationship Diagram (ERD) yang menggambarkan struktur database:

```mermaid
erDiagram
    [TABLE1] {
        int id PK
        string [field1]
        string [field2]
        datetime created_at
        datetime updated_at
    }

    [TABLE2] {
        int id PK
        int [table1]_id FK
        string [field]
        datetime created_at
    }

    [TABLE3] {
        int id PK
        int [table1]_id FK
        string [field]
    }

    [TABLE1] ||--o{ [TABLE2] : "has many"
    [TABLE1] ||--o{ [TABLE3] : "has many"
```

| Tabel | Deskripsi |
|-------|-----------|
| **[table1]** | [Deskripsi detail dengan contoh data] |
| **[table2]** | [Deskripsi detail dengan contoh data] |
| **[table3]** | [Deskripsi detail dengan contoh data] |

## 7. Technical Specifications

**Performance Metrics:**

| Metric | Target | Reasoning |
|--------|--------|----------|
| Page Load Time | < 2 detik | [Alasan] |
| API Response Time | < 500ms | [Alasan] |
| Database Query Time | < 100ms | [Alasan] |
| System Uptime | > 99.5% | [Alasan] |
| Concurrent Users | > 1000 | [Alasan] |

**API Endpoints:**
```
GET    /api/[resource]           - [Deskripsi]
POST   /api/[resource]           - [Deskripsi]
PUT    /api/[resource]/:id       - [Deskripsi]
DELETE /api/[resource]/:id       - [Deskripsi]
```

**Security Considerations:**
- [Security measure 1 dengan implementasi detail]
- [Security measure 2 dengan implementasi detail]
- [Security measure 3 dengan implementasi detail]

## 8. Design & Technical Constraints

1. **High-Level Technology:**
   Sistem harus dibangun menggunakan [tech stack] yang mendukung [requirement spesifik]. [Jelaskan constraint dan reasoning].

2. **Typography Rules:**
   - **Sans:** [Font recommendation dengan alasan]
   - **Serif:** [Font recommendation dengan alasan]
   - **Mono:** [Font recommendation dengan alasan]

3. **Color Scheme:**
   - Primary: [Color dengan hex code]
   - Secondary: [Color dengan hex code]
   - Accent: [Color dengan hex code]

4. **UI/UX Guidelines:**
   - [Guideline 1 dengan reasoning]
   - [Guideline 2 dengan reasoning]
   - [Guideline 3 dengan reasoning]

5. **Security & Compliance:**
   - [Requirement 1 dengan standard yang diikuti]
   - [Requirement 2 dengan standard yang diikuti]

---

*Generated by AI PRD Generator*

PENTING:
- Buat PRD yang SANGAT DETAIL seperti dokumen enterprise
- WAJIB include mermaid sequence diagram dan ERD diagram
- Sesuaikan tech stack dengan jenis project (e-commerce, social media, enterprise, mobile, dll)
- Berikan reasoning untuk setiap keputusan teknis
- Include contoh konkret dan use case
- Buat actionable dan siap untuk development`;

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
            content: `Generate PRD yang SANGAT LENGKAP, DETAIL, dan PROFESIONAL untuk project berikut. WAJIB include mermaid sequence diagram dan ERD diagram. Buat seperti dokumen enterprise yang siap digunakan untuk development team:\n\n${prompt}\n\nPastikan PRD ini sangat spesifik, actionable, include semua technical details, reasoning, dan contoh konkret. Format harus persis seperti template yang diberikan.` 
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