'use client';
import { usePRDStore } from '@/store/usePRDStore';

export default function FeaturesStep() {
  const data = usePRDStore((state) => state.data);
  const addFeature = usePRDStore((state) => state.addFeature);
  const updateFeature = usePRDStore((state) => state.updateFeature);
  const removeFeature = usePRDStore((state) => state.removeFeature);

  const features = [
    { title: 'Authentication', desc: 'Login, register, OAuth, forgot password', priority: 'high' },
    { title: 'Dashboard', desc: 'Main dashboard dengan analytics', priority: 'high' },
    { title: 'CRUD Operations', desc: 'Create, Read, Update, Delete data', priority: 'high' },
    { title: 'API Integration', desc: 'Integrasi dengan API external', priority: 'high' },
    { title: 'State Management', desc: 'Global state management', priority: 'high' },
    { title: 'Routing', desc: 'Page navigation dan routing', priority: 'high' },
    { title: 'Form Handling', desc: 'Validation dan submission', priority: 'medium' },
    { title: 'Data Fetching', desc: 'API calls dan caching', priority: 'medium' },
    { title: 'Error Handling', desc: 'Global error boundary', priority: 'medium' },
    { title: 'Loading States', desc: 'Skeleton screens dan spinners', priority: 'medium' },
    { title: 'Notifications', desc: 'Toast, alert, push notifications', priority: 'medium' },
    { title: 'Search & Filter', desc: 'Search functionality', priority: 'low' },
    { title: 'Export/Import', desc: 'PDF, Excel, CSV export', priority: 'low' },
    { title: 'Dark Mode', desc: 'Theme switching', priority: 'low' },
    { title: 'i18n', desc: 'Multi-language support', priority: 'low' },
    { title: 'Settings', desc: 'User settings dan profile', priority: 'low' },
  ];

  const isAdded = (title: string) => data.features.some(f => f.title === title);
  
  const handleAdd = (feat: typeof features[0]) => {
    if (!isAdded(feat.title)) {
      addFeature();
      setTimeout(() => {
        const all = usePRDStore.getState().data.features;
        const latest = all[all.length - 1];
        if (latest && !latest.title) {
          updateFeature(latest.id, 'title', feat.title);
          updateFeature(latest.id, 'description', feat.desc);
          updateFeature(latest.id, 'priority', feat.priority as 'high' | 'medium' | 'low');
        }
      }, 50);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 mb-4 shadow-lg">
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Features & Tech Stack</h2>
        <p className="text-gray-500">Pilih fitur yang dibutuhkan untuk proyek Anda</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {features.map((feat, idx) => {
          const added = isAdded(feat.title);
          const prioColor = feat.priority === 'high' 
            ? 'bg-red-100 text-red-700' 
            : feat.priority === 'medium' 
            ? 'bg-amber-100 text-amber-700' 
            : 'bg-emerald-100 text-emerald-700';
          return (
            <button
              key={idx}
              onClick={() => handleAdd(feat)}
              disabled={added}
              className={`relative p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                added
                  ? 'bg-emerald-50 border-emerald-300 opacity-75'
                  : 'bg-white border-gray-200 hover:border-purple-300 hover:shadow-sm'
              }`}
            >
              {added && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center shadow-md">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
              <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium mb-2 ${prioColor}`}>
                {feat.priority}
              </span>
              <h4 className="font-semibold text-gray-800 text-sm mb-1">{feat.title}</h4>
              <p className="text-xs text-gray-500 leading-relaxed">{feat.desc}</p>
            </button>
          );
        })}
      </div>

      {data.features.length > 0 && (
        <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Fitur Terpilih ({data.features.length})
          </h3>
          <div className="space-y-2">
            {data.features.map((f, i) => (
              <div key={f.id} className="bg-white rounded-xl p-4 flex items-center gap-3 shadow-sm border border-gray-200">
                <span className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {i+1}
                </span>
                <div className="flex-1 min-w-0">
                  <input 
                    type="text" 
                    value={f.title} 
                    onChange={(e) => updateFeature(f.id, 'title', e.target.value)} 
                    className="w-full font-medium text-gray-800 bg-transparent border-none p-0 focus:outline-none focus:ring-0 text-sm" 
                    placeholder="Nama fitur..." 
                  />
                  <input 
                    type="text" 
                    value={f.description} 
                    onChange={(e) => updateFeature(f.id, 'description', e.target.value)} 
                    className="w-full text-xs text-gray-500 bg-transparent border-none p-0 focus:outline-none focus:ring-0" 
                    placeholder="Deskripsi..." 
                  />
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  {['high', 'medium', 'low'].map((p) => (
                    <button 
                      key={p} 
                      onClick={() => updateFeature(f.id, 'priority', p)} 
                      className={`px-2 py-1 rounded-lg text-xs font-medium transition-all ${
                        f.priority === p 
                          ? (p === 'high' ? 'bg-red-600 text-white' : p === 'medium' ? 'bg-amber-600 text-white' : 'bg-emerald-600 text-white') 
                          : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                      }`}
                    >
                      {p.charAt(0).toUpperCase()}
                    </button>
                  ))}
                </div>
                <button 
                  onClick={() => removeFeature(f.id)} 
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <button 
        onClick={addFeature} 
        className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-purple-400 hover:text-purple-600 hover:bg-purple-50 transition-all flex items-center justify-center gap-2 font-medium"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Tambah Custom Feature
      </button>
    </div>
  );
}