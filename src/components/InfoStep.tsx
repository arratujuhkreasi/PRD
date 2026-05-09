'use client';
import { usePRDStore } from '@/store/usePRDStore';

export default function InfoStep() {
  const data = usePRDStore((state) => state.data);
  const updateInfo = usePRDStore((state) => state.updateInfo);
  
  const projectTypes = [
    { value: 'Web App', label: 'Aplikasi Web', icon: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9' },
    { value: 'Android App', label: 'Android', icon: 'M12 2a2 2 0 012 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 017 7h1a1 1 0 011 1v3a1 1 0 01-1 1h-1v1a2 2 0 01-2 2H5a2 2 0 01-2-2v-1H2a1 1 0 01-1-1v-3a1 1 0 011-1h1a7 7 0 017-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 012-2z' },
    { value: 'iOS App', label: 'iOS', icon: 'M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16z' },
    { value: 'Desktop App', label: 'Desktop', icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { value: 'IDE/Tool', label: 'IDE / Tool', icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' },
    { value: 'API/Backend', label: 'API / Backend', icon: 'M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01' },
    { value: 'Browser Extension', label: 'Extension', icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4' },
    { value: 'IoT/Embedded', label: 'IoT / Embedded', icon: 'M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
  ];
  
  const handleSelect = (value: string) => updateInfo('productName', value);
  
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 mb-4 shadow-lg">
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Project Type</h2>
        <p className="text-gray-500">Pilih jenis proyek yang akan dikembangkan</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {projectTypes.map((type) => {
          const isSelected = data.productName === type.value;
          return (
            <button
              key={type.value}
              onClick={() => handleSelect(type.value)}
              className={`relative p-4 rounded-xl border-2 transition-all duration-200 ${
                isSelected
                  ? 'bg-blue-50 border-blue-600 shadow-md'
                  : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-sm'
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  isSelected ? 'bg-blue-600' : 'bg-gray-100'
                }`}>
                  <svg className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={type.icon} />
                  </svg>
                </div>
                <span className={`font-semibold text-sm ${
                  isSelected ? 'text-blue-900' : 'text-gray-700'
                }`}>{type.label}</span>
              </div>
              {isSelected && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center shadow-md">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>
      
      <div className="space-y-4 bg-gray-50 rounded-xl p-6 border border-gray-200">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Proyek</label>
          <input 
            type="text" 
            placeholder="Masukkan nama proyek..." 
            value={data.productTagline || ''} 
            onChange={(e) => updateInfo('productTagline', e.target.value)} 
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400 transition-all" 
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Target Pengguna</label>
          <input 
            type="text" 
            placeholder="Siapa target pengguna aplikasi ini?" 
            value={data.targetUsers || ''} 
            onChange={(e) => updateInfo('targetUsers', e.target.value)} 
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400 transition-all" 
          />
        </div>
      </div>
    </div>
  );
}