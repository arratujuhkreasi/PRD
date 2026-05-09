'use client';
import { usePRDStore } from '@/store/usePRDStore';

export default function ExportButtons() {
  const data = usePRDStore((state) => state.data);
  
  const gen = () => {
    const lines = [];
    
    // Header
    lines.push('# PRD — Product Requirements Document');
    lines.push('');
    
    // 1. Overview
    lines.push('## 1. Overview');
    lines.push('');
    lines.push(`**Project Type:** ${data.productName || 'Not specified'}`);
    lines.push('');
    lines.push(`**Project Name:** ${data.productTagline || 'Not specified'}`);
    lines.push('');
    lines.push(`**Target Users:** ${data.targetUsers || 'Not specified'}`);
    lines.push('');
    
    if (data.painPoints || data.currentSolutions || data.opportunities) {
      lines.push('**Problem Statement:**');
      if (data.painPoints) {
        lines.push(`Masalah utama yang ingin diselesaikan adalah ${data.painPoints.toLowerCase()}. `);
      }
      if (data.currentSolutions) {
        lines.push(`Saat ini pengguna mengatasi masalah dengan ${data.currentSolutions.toLowerCase()}, namun solusi ini belum optimal. `);
      }
      if (data.opportunities) {
        lines.push(`Aplikasi ini bertujuan untuk ${data.opportunities.toLowerCase()}.`);
      }
      lines.push('');
    }
    
    // 2. Requirements
    lines.push('## 2. Requirements');
    lines.push('Berikut adalah persyaratan tingkat tinggi untuk pengembangan sistem:');
    lines.push('');
    lines.push('- **Aksesibilitas:** Aplikasi harus dapat diakses melalui platform yang sesuai dengan jenis proyek.');
    lines.push(`- **Pengguna:** Sistem dirancang untuk ${data.targetUsers || 'pengguna target'}.`);
    lines.push('- **Data Input:** Input data dilakukan sesuai dengan kebutuhan fitur.');
    lines.push('- **User Experience:** Interface harus intuitif dan mudah digunakan.');
    lines.push('');
    
    // 3. Core Features
    lines.push('## 3. Core Features');
    lines.push('Fitur-fitur kunci yang harus ada dalam versi pertama (MVP):');
    lines.push('');
    
    if (data.features.length > 0) {
      data.features.forEach((f, i) => {
        lines.push(`${i + 1}. **${f.title || 'Feature'}**`);
        lines.push(`   - Priority: **${(f.priority || 'medium').toUpperCase()}**`);
        if (f.description) {
          lines.push(`   - ${f.description}`);
        }
      });
      lines.push('');
    } else {
      lines.push('*Fitur belum didefinisikan.*');
      lines.push('');
    }
    
    // 4. User Flow
    lines.push('## 4. User Flow');
    lines.push('Alur kerja pengguna saat menggunakan aplikasi:');
    lines.push('');
    
    if (data.userStories.length > 0) {
      data.userStories.forEach((s, i) => {
        lines.push(`${i + 1}. **${s.asA || 'User'}:** ${s.iWant || 'melakukan aksi'}, sehingga ${s.soThat || 'mendapatkan hasil'}.`);
      });
      lines.push('');
    } else {
      lines.push('1. User membuka aplikasi');
      lines.push('2. User melakukan autentikasi (jika diperlukan)');
      lines.push('3. User mengakses fitur utama');
      lines.push('4. User menyelesaikan task yang diinginkan');
      lines.push('');
    }
    
    // 5. Architecture
    lines.push('## 5. Architecture');
    lines.push('Berikut adalah gambaran arsitektur sistem dan aliran data:');
    lines.push('');
    lines.push('```mermaid');
    lines.push('sequenceDiagram');
    lines.push('    participant User as User (Client)');
    lines.push('    participant UI as Frontend');
    lines.push('    participant Server as Backend');
    lines.push('    participant DB as Database');
    lines.push('');
    lines.push('    User->>UI: Akses Aplikasi');
    lines.push('    UI->>Server: Request Data');
    lines.push('    Server->>DB: Query Database');
    lines.push('    DB-->>Server: Return Data');
    lines.push('    Server-->>UI: Send Response');
    lines.push('    UI-->>User: Display Content');
    lines.push('```');
    lines.push('');
    
    // 6. Technical Specifications
    lines.push('## 6. Technical Specifications');
    lines.push('');
    
    if (data.targetMetrics.length > 0) {
      lines.push('**Performance Metrics:**');
      lines.push('');
      lines.push('| Metric | Target |');
      lines.push('|--------|--------|');
      data.targetMetrics.forEach(m => {
        lines.push(`| ${m.metric || '-'} | ${m.target || '-'} |`);
      });
      lines.push('');
    }
    
    if (data.successMetrics) {
      lines.push('**Success Criteria:**');
      lines.push('');
      lines.push(data.successMetrics);
      lines.push('');
    }
    
    // 7. Design & Technical Constraints
    lines.push('## 7. Design & Technical Constraints');
    lines.push('Bagian ini mengatur batasan teknis dan panduan desain yang harus dipatuhi:');
    lines.push('');
    lines.push('1. **High-Level Technology:**');
    lines.push('   Sistem harus dibangun menggunakan teknologi modern yang mendukung pengembangan cepat (rapid development) dan kemudahan pemeliharaan (maintainability).');
    lines.push('');
    lines.push('2. **Code Quality:**');
    lines.push('   - Kode harus mengikuti best practices dan coding standards');
    lines.push('   - Implementasi harus modular dan mudah di-maintain');
    lines.push('   - Testing coverage minimal 80% untuk critical features');
    lines.push('');
    lines.push('3. **Security:**');
    lines.push('   - Implementasi authentication dan authorization yang proper');
    lines.push('   - Data sensitif harus dienkripsi');
    lines.push('   - Input validation untuk mencegah injection attacks');
    lines.push('');
    
    // Footer
    lines.push('---');
    lines.push('');
    lines.push('*Generated by PRD Generator*');
    
    return lines.join('\n');
  };
  
  const handleCopy = async () => { 
    await navigator.clipboard.writeText(gen()); 
    alert('PRD copied to clipboard!'); 
  };
  
  const handleDownload = () => {
    const blob = new Blob([gen()], { type: 'text/markdown' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = (data.productTagline?.replace(/\s+/g, '-').toLowerCase() || 'prd') + '.md';
    document.body.appendChild(a); 
    a.click(); 
    document.body.removeChild(a);
  };
  
  return (
    <div className="flex gap-2">
      <button 
        onClick={handleCopy} 
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all text-sm font-medium shadow-sm"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/>
        </svg>
        Copy
      </button>
      <button 
        onClick={handleDownload} 
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all text-sm font-semibold shadow-md"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
        </svg>
        Download
      </button>
    </div>
  );
}