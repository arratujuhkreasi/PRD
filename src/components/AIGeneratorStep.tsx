'use client';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

export default function AIGeneratorStep() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [generatedPRD, setGeneratedPRD] = useState('');
  const [error, setError] = useState('');

  const examples = [
    'Website social media marketing untuk UMKM dengan fitur scheduling post, analytics, dan multi-platform management',
    'Aplikasi mobile untuk tracking fitness dan diet dengan AI recommendation dan community features',
    'Platform e-learning untuk kursus online dengan video streaming, quiz interaktif, dan sertifikat digital',
    'Sistem inventory management untuk gudang dengan barcode scanning, real-time tracking, dan low stock alerts',
    'Aplikasi chat real-time untuk tim remote dengan video call, file sharing, dan task management',
  ];

  const generatePRD = async () => {
    if (!prompt.trim()) {
      alert('Mohon masukkan deskripsi project Anda');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Increase timeout to 2 minutes
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 120000);

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error('Failed to generate PRD');
      }

      const data = await response.json();
      setGeneratedPRD(data.prd);
      setShowModal(true);
    } catch (err: any) {
      if (err.name === 'AbortError') {
        setError('Request timeout - AI membutuhkan waktu terlalu lama. Coba dengan deskripsi yang lebih singkat.');
      } else {
        setError(err.message || 'Terjadi kesalahan saat generate PRD');
      }
      alert('Error: ' + (err.message || 'Terjadi kesalahan'));
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([generatedPRD], { type: 'text/markdown' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    const filename = prompt.replace(/\s+/g, '-').toLowerCase().substring(0, 50) || 'prd';
    a.download = `${filename}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedPRD);
    alert('PRD copied to clipboard!');
  };

  const handleSavePDF = () => {
    window.print();
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100 flex items-center justify-center p-4">
        <div className="max-w-3xl w-full">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 mb-6 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">AI PRD Generator</h1>
            <p className="text-lg text-gray-600">Powered by Sambanova AI - Generate PRD profesional dengan mermaid diagrams</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Deskripsi Project <span className="text-red-500">*</span>
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Jelaskan project Anda secara detail. Semakin detail, semakin baik hasil PRD yang dihasilkan...\n\nContoh: Website social media marketing untuk membantu UMKM mengelola konten dan campaign di berbagai platform seperti Instagram, Facebook, dan TikTok. Fitur utama termasuk scheduling post, analytics dashboard, content calendar, dan AI-powered caption generator."
              rows={8}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400 resize-none"
            />

            <div className="mt-6">
              <p className="text-sm font-semibold text-gray-700 mb-3">💡 Contoh Prompt:</p>
              <div className="space-y-2">
                {examples.map((ex, i) => (
                  <button
                    key={i}
                    onClick={() => setPrompt(ex)}
                    className="w-full text-left px-4 py-3 bg-blue-50 text-blue-700 text-sm rounded-lg hover:bg-blue-100 transition-colors border border-blue-200"
                  >
                    {ex}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={generatePRD}
              disabled={loading || !prompt.trim()}
              className="w-full mt-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  AI sedang membuat PRD detail dengan diagrams... (10-15 detik)
                </>
              ) : (
                <>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Generate PRD dengan AI
                </>
              )}
            </button>

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                ⚠️ {error}
              </div>
            )}
          </div>

          <div className="text-center space-y-3">
            <a
              href="/wizard"
              className="text-gray-500 hover:text-gray-700 text-sm font-medium block"
            >
              Atau isi manual step-by-step →
            </a>
            <p className="text-xs text-gray-400">
              Powered by Sambanova AI (Meta-Llama-3.3-70B-Instruct)
            </p>
          </div>
        </div>
      </div>

      {/* Modal PRD */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">PRD Generated by AI</h2>
                  <p className="text-xs text-gray-500">Review dan download PRD Anda</p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto p-6">
              <div className="prose prose-slate prose-sm max-w-none">
                <ReactMarkdown>{generatedPRD}</ReactMarkdown>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors"
              >
                Close
              </button>
              <div className="flex gap-3">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-medium shadow-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/>
                  </svg>
                  Copy
                </button>
                <button
                  onClick={handleSavePDF}
                  className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all font-semibold shadow-md"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  Save PDF
                </button>
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-semibold shadow-md"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                  </svg>
                  Download MD
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}