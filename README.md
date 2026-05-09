# AI PRD Generator

🚀 **Generate Product Requirements Document (PRD) profesional secara otomatis menggunakan AI**

Powered by **Sambanova AI** (Meta-Llama-3.1-405B-Instruct)

## ✨ Features

- 🤖 **AI-Powered Generation** - Generate PRD lengkap hanya dengan deskripsi singkat
- 🎯 **Smart & Contextual** - AI menganalisis dan menyesuaikan tech stack, arsitektur, dan desain
- 📊 **Professional Format** - Output sesuai standar industri dengan mermaid diagrams
- 💾 **Multiple Export** - Download sebagai Markdown, PDF, atau Copy to clipboard
- 🎨 **Modern UI** - Interface yang clean, responsive, dan user-friendly
- ⚡ **Fast & Efficient** - Generate PRD dalam hitungan detik

## 🛠️ Tech Stack

- **Frontend:** Next.js 16, React, TypeScript, Tailwind CSS
- **AI Engine:** Sambanova AI (Meta-Llama-3.1-405B-Instruct)
- **State Management:** Zustand
- **Markdown Rendering:** react-markdown
- **Styling:** Tailwind CSS v4

## 📋 Prerequisites

- Node.js 18+ 
- npm atau yarn
- Sambanova API Key

## 🚀 Getting Started

### 1. Clone Repository

```bash
git clone https://github.com/arratujuhkreasi/PRD.git
cd PRD
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Buat file `.env.local` di root directory:

```env
SAMBANOVA_API_KEY=your_api_key_here
```

### 4. Run Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## 📖 How to Use

### Mode 1: AI Generator (Recommended)

1. Buka aplikasi di browser
2. Ketik deskripsi project Anda (semakin detail semakin baik)
3. Klik "Generate PRD dengan AI"
4. Tunggu beberapa detik
5. Review PRD yang di-generate
6. Download sebagai Markdown atau PDF

**Contoh Input:**
```
Website social media marketing untuk membantu UMKM mengelola konten 
dan campaign di berbagai platform seperti Instagram, Facebook, dan TikTok. 
Fitur utama termasuk scheduling post, analytics dashboard, content calendar, 
dan AI-powered caption generator.
```

### Mode 2: Manual Wizard

1. Klik "Atau isi manual step-by-step"
2. Isi form step-by-step:
   - Project Type & Info
   - Problem Statement
   - Features & Tech Stack
   - Technical Specifications
3. Review preview di panel kanan
4. Download PRD

## 📄 PRD Format

PRD yang di-generate mengikuti format profesional:

1. **Overview** - Tujuan, masalah, target users
2. **Requirements** - Persyaratan tingkat tinggi
3. **Core Features** - Fitur-fitur utama dengan priority
4. **User Flow** - Alur pengguna step-by-step
5. **Architecture** - Tech stack, arsitektur sistem, mermaid diagrams
6. **Database Schema** - Struktur database (jika relevan)
7. **Technical Specifications** - Metrics, API, security
8. **Design & Technical Constraints** - Guidelines dan batasan

## 🎯 AI Capabilities

AI akan otomatis:

- ✅ Detect jenis project (Web, Mobile, Desktop, API, dll)
- ✅ Recommend tech stack yang sesuai
- ✅ Generate database schema jika diperlukan
- ✅ Suggest arsitektur yang cocok (Monolith, Microservices, Serverless)
- ✅ Include security best practices
- ✅ Create mermaid diagrams (sequence, ERD, flowchart)
- ✅ Provide performance metrics
- ✅ Estimate complexity dan timeline

## 🔒 Security

- API key disimpan di environment variables
- Tidak ada data yang disimpan di server
- 100% client-side processing setelah AI generation
- HTTPS untuk production deployment

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🚀 Deploy

### Deploy ke Vercel (Recommended)

```bash
vercel
```

Jangan lupa set environment variable `SAMBANOVA_API_KEY` di Vercel dashboard.

### Deploy ke Netlify

```bash
netlify deploy --prod
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

MIT License

## 🙏 Acknowledgments

- Powered by [Sambanova AI](https://sambanova.ai/)
- Built with [Next.js](https://nextjs.org/)
- UI inspired by modern design principles

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Made with ❤️ by Arratu Juh Kreasi**