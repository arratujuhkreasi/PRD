'use client';
import { usePRDStore } from '@/store/usePRDStore';

export default function ProblemStep() {
  const data = usePRDStore((state) => state.data);
  const updateProblem = usePRDStore((state) => state.updateProblem);

  const problems = [
    { value: 'Setup dari nol', desc: 'Butuh waktu lama untuk setup awal proyek', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
    { value: 'Tidak punya template', desc: 'Bingung tentukan struktur folder', icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z' },
    { value: 'Code tidak konsisten', desc: 'Susah jaga konsistensi tim', icon: 'M4 6h16M4 12h16M4 18h16' },
    { value: 'Butuh guideline', desc: 'Butuh aturan coding yang jelas', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { value: 'Manage dependencies', desc: 'Susah pilih dan kelola library', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
    { value: 'Rapid prototyping', desc: 'Butuh bikin prototype cepat', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
    { value: 'Sulit scale', desc: 'Project susah di-expand', icon: 'M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4' },
    { value: 'Butuh boilerplate', desc: 'Butuh code template siap pakai', icon: 'M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2' },
  ];

  const solutions = [
    { value: 'Google/search', desc: 'Cari solusi di internet' },
    { value: 'Copy project lama', desc: 'Copy paste dari project sebelumnya' },
    { value: 'Template gratis', desc: 'Download dari GitHub/website' },
    { value: 'Buat manual', desc: 'Setup dari awal satu per satu' },
    { value: 'AI code generator', desc: 'Pakai ChatGPT, Copilot' },
    { value: 'Framework CLI', desc: 'create-react-app, vue CLI' },
  ];

  const values = [
    { value: 'Hemat waktu 50%', desc: 'Development lebih cepat' },
    { value: 'Template modern', desc: 'Tech stack terbaru & best practices' },
    { value: 'CI/CD built-in', desc: 'Pipeline deployment otomatis' },
    { value: 'Dokumentasi lengkap', desc: 'README, API docs, usage guide' },
    { value: 'Multi-platform', desc: 'Web, mobile, desktop 1 codebase' },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-orange-600 to-red-600 mb-4 shadow-lg">
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Problem Statement</h2>
        <p className="text-gray-500">Identifikasi masalah dan solusi yang Anda butuhkan</p>
      </div>

      <div className="space-y-6">
        <div className="bg-red-50 rounded-xl p-5 border border-red-200">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Masalah yang Dihadapi
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {problems.map((p) => {
              const isSelected = data.painPoints === p.value;
              return (
                <button
                  key={p.value}
                  onClick={() => updateProblem('painPoints', isSelected ? '' : p.value)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                    isSelected
                      ? 'bg-red-600 text-white border-red-600 shadow-md'
                      : 'bg-white border-gray-200 text-gray-700 hover:border-red-300 hover:shadow-sm'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-2 ${
                    isSelected ? 'bg-white/20' : 'bg-red-50'
                  }`}>
                    <svg className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-red-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={p.icon} />
                    </svg>
                  </div>
                  <p className="font-medium text-sm mb-1">{p.value}</p>
                  <p className={`text-xs ${isSelected ? 'text-white/80' : 'text-gray-500'}`}>{p.desc}</p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Bagaimana Saat Ini Mengatasi?
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {solutions.map((s) => {
              const isSelected = data.currentSolutions === s.value;
              return (
                <button
                  key={s.value}
                  onClick={() => updateProblem('currentSolutions', isSelected ? '' : s.value)}
                  className={`p-3 rounded-xl border-2 transition-all duration-200 text-left ${
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                      : 'bg-white border-gray-200 text-gray-700 hover:border-blue-300 hover:shadow-sm'
                  }`}
                >
                  <p className="font-medium text-sm mb-1">{s.value}</p>
                  <p className={`text-xs ${isSelected ? 'text-white/80' : 'text-gray-500'}`}>{s.desc}</p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-200">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            Value Proposition
          </h3>
          <div className="space-y-2">
            {values.map((v) => {
              const isSelected = data.opportunities === v.value;
              return (
                <button
                  key={v.value}
                  onClick={() => updateProblem('opportunities', isSelected ? '' : v.value)}
                  className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left flex items-center gap-3 ${
                    isSelected
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                      : 'bg-white border-gray-200 text-gray-700 hover:border-emerald-300 hover:shadow-sm'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    isSelected ? 'bg-white/20' : 'bg-emerald-50'
                  }`}>
                    <svg className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-emerald-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{v.value}</p>
                    <p className={`text-xs ${isSelected ? 'text-white/80' : 'text-gray-500'}`}>{v.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}