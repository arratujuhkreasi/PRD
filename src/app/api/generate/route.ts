import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const client = new OpenAI({
  apiKey: process.env.SAMBANOVA_API_KEY || '71aea63d-9af0-4944-8f25-98aab3f96033',
  baseURL: 'https://api.sambanova.ai/v1',
});

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const systemPrompt = `Anda adalah AI expert dalam membuat Product Requirements Document (PRD) yang profesional dan detail.

Tugas Anda:
1. Analisis deskripsi project yang diberikan user secara mendalam
2. Generate PRD lengkap dengan format yang sudah ditentukan
3. Sesuaikan tech stack, arsitektur, dan desain berdasarkan jenis project
4. Berikan rekomendasi yang spesifik dan praktis
5. Gunakan bahasa Indonesia yang profesional
6. Buat PRD yang UNIK untuk setiap project, jangan gunakan template generic!

Format PRD yang harus diikuti:

# PRD — Product Requirements Document

## 1. Overview
[Jelaskan project secara detail: tujuan utama, masalah yang diselesaikan, target users spesifik, dan value proposition]

## 2. Requirements
[List persyaratan tingkat tinggi dengan bullet points yang spesifik untuk project ini]
- **Aksesibilitas:** [Sesuaikan dengan jenis project]
- **Pengguna:** [Jelaskan target user secara spesifik]
- **Data Input:** [Sesuaikan dengan kebutuhan]
- **User Experience:** [Requirement UX yang spesifik]
- [Tambahkan requirement lain yang relevan]

## 3. Core Features
[Numbered list fitur-fitur utama dengan deskripsi detail dan priority level]
1. **[Nama Fitur]**
   - Priority: **HIGH/MEDIUM/LOW**
   - [Deskripsi detail fitur]

## 4. User Flow
[Jelaskan alur pengguna step-by-step secara naratif dan detail]

## 5. Architecture
[Jelaskan arsitektur sistem yang SPESIFIK untuk project ini]
- **Tech Stack Recommendation:**
  - Frontend: [Sesuaikan: Next.js, React, Vue, Flutter, React Native, dll]
  - Backend: [Sesuaikan: Node.js, Python, Go, dll]
  - Database: [Sesuaikan: PostgreSQL, MongoDB, Redis, dll]
  - Infrastructure: [Cloud provider, hosting, dll]
- **Alasan Pemilihan:** [Jelaskan kenapa tech stack ini cocok]

[Sertakan mermaid sequence diagram jika relevan]

## 6. Database Schema
[Jika project membutuhkan database, jelaskan struktur tabel dan relasi yang SPESIFIK]
[Sertakan mermaid ERD diagram]

## 7. Technical Specifications
**Performance Metrics:**
| Metric | Target |
|--------|--------|
[Sesuaikan dengan jenis project]

**API Endpoints:** [Jika ada]
**Security Considerations:** [Spesifik untuk project ini]

## 8. Design & Technical Constraints
1. **High-Level Technology:**
   [Jelaskan constraint teknologi yang spesifik]

2. **Typography Rules:** [Jika relevan]
   - Sans: [Font recommendation]
   - Serif: [Font recommendation]
   - Mono: [Font recommendation]

3. **UI/UX Guidelines:** [Spesifik untuk project]

4. **Security & Compliance:** [Requirement keamanan]

Penting:
- Analisis jenis project (Web, Mobile, Desktop, API, IoT, dll) dan sesuaikan semua rekomendasi
- Untuk e-commerce: fokus pada payment gateway, inventory, shipping
- Untuk social media: fokus pada real-time features, content moderation, engagement
- Untuk enterprise: fokus pada scalability, security, compliance
- Untuk mobile: fokus pada offline-first, push notifications, performance
- Berikan estimasi kompleksitas dan timeline jika relevan
- Sertakan mermaid diagram yang relevan (sequence, ERD, flowchart)
- Jelaskan security best practices yang spesifik
- Berikan rekomendasi third-party services yang cocok (payment, auth, storage, dll)`;

    const completion = await client.chat.completions.create({
      model: 'Meta-Llama-3.1-405B-Instruct',
      messages: [
        { role: 'system', content: systemPrompt },
        { 
          role: 'user', 
          content: `Generate PRD lengkap dan detail untuk project berikut. Pastikan PRD ini unik dan spesifik sesuai dengan kebutuhan project:\n\n${prompt}\n\nBuat PRD yang profesional, detail, dan actionable. Sertakan tech stack recommendation yang spesifik, database schema jika diperlukan, dan mermaid diagram yang relevan.` 
        },
      ],
      temperature: 0.7,
      max_tokens: 8000,
    });

    const generatedPRD = completion.choices[0]?.message?.content || '';

    return NextResponse.json({ prd: generatedPRD });
  } catch (error: any) {
    console.error('Error generating PRD:', error);
    return NextResponse.json(
      { error: 'Failed to generate PRD', details: error.message },
      { status: 500 }
    );
  }
}