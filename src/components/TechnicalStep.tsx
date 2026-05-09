'use client';
import { usePRDStore } from '@/store/usePRDStore';

export default function TechnicalStep() {
  const data = usePRDStore((state) => state.data);
  const addUserStory = usePRDStore((state) => state.addUserStory);
  const updateUserStory = usePRDStore((state) => state.updateUserStory);
  const removeUserStory = usePRDStore((state) => state.removeUserStory);
  const addTargetMetric = usePRDStore((state) => state.addTargetMetric);
  const updateTargetMetric = usePRDStore((state) => state.updateTargetMetric);
  const removeTargetMetric = usePRDStore((state) => state.removeTargetMetric);
  const updateSuccessMetrics = usePRDStore((state) => state.updateSuccessMetrics);

  const storyTemplates = [
    { asA: 'Developer', iWant: 'setup project dengan cepat', soThat: 'tidak buang waktu konfigurasi' },
    { asA: 'User', iWant: 'register dan login', soThat: 'bisa akses fitur personalized' },
    { asA: 'User', iWant: 'melihat dashboard', soThat: 'bisa lihat overview data' },
    { asA: 'Admin', iWant: 'manage users', soThat: 'bisa kontrol akses sistem' },
    { asA: 'User', iWant: 'export data', soThat: 'bisa punya backup offline' },
  ];

  const metricTemplates = [
    { metric: 'Page Load Time', target: '< 2 detik' },
    { metric: 'API Response', target: '< 500ms' },
    { metric: 'Test Coverage', target: '> 80%' },
    { metric: 'Build Success', target: '> 99%' },
    { metric: 'Uptime', target: '> 99.5%' },
    { metric: 'Code Review', target: '100% pass' },
  ];

  const successOptions = [
    'Project selesai tepat waktu',
    'Code quality sesuai standar linting',
    'Semua test case passing',
    'Documentation lengkap',
    'Performance metrics tercapai',
    'UAT passed',
  ];

  const addAllStories = () => {
    storyTemplates.forEach((s) => {
      addUserStory();
      setTimeout(() => {
        const all = usePRDStore.getState().data.userStories;
        const latest = all[all.length - 1];
        if (latest && !latest.asA) {
          updateUserStory(latest.id, 'asA', s.asA);
          updateUserStory(latest.id, 'iWant', s.iWant);
          updateUserStory(latest.id, 'soThat', s.soThat);
        }
      }, 50);
    });
  };

  const addAllMetrics = () => {
    metricTemplates.forEach((m) => {
      addTargetMetric();
      setTimeout(() => {
        const all = usePRDStore.getState().data.targetMetrics;
        const latest = all[all.length - 1];
        if (latest && !latest.metric) {
          updateTargetMetric(latest.id, 'metric', m.metric);
          updateTargetMetric(latest.id, 'target', m.target);
        }
      }, 50);
    });
  };

  return (
    <div className="space-y-6 max-h-[65vh] overflow-y-auto pr-2">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-600 to-blue-600 mb-4 shadow-lg">
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Technical Specifications</h2>
        <p className="text-gray-500">User stories dan acceptance criteria</p>
      </div>

      {/* User Stories */}
      <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            User Stories
          </h3>
          {data.userStories.length === 0 && (
            <button 
              onClick={addAllStories} 
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md"
            >
              + Tambah Template
            </button>
          )}
        </div>
        
        {data.userStories.length === 0 && (
          <div className="bg-white rounded-xl p-4 mb-4 border border-blue-100">
            <div className="space-y-2">
              {storyTemplates.map((s, i) => (
                <div key={i} className="text-sm p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <span className="text-blue-600 font-semibold">As a</span> {s.asA}, 
                  <span className="text-purple-600 font-semibold"> I want</span> {s.iWant}, 
                  <span className="text-emerald-600 font-semibold"> so that</span> {s.soThat}
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="space-y-3">
          {data.userStories.map((story, i) => (
            <div key={story.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
              <div className="flex items-start gap-3 mb-3">
                <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {i+1}
                </span>
                <button 
                  onClick={() => removeUserStory(story.id)} 
                  className="ml-auto p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-blue-600 w-16 flex-shrink-0">As a</span>
                  <input 
                    type="text" 
                    placeholder="Role" 
                    value={story.asA} 
                    onChange={(e) => updateUserStory(story.id, 'asA', e.target.value)} 
                    className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-purple-600 w-16 flex-shrink-0">I want</span>
                  <input 
                    type="text" 
                    placeholder="Action" 
                    value={story.iWant} 
                    onChange={(e) => updateUserStory(story.id, 'iWant', e.target.value)} 
                    className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-emerald-600 w-16 flex-shrink-0">So that</span>
                  <input 
                    type="text" 
                    placeholder="Benefit" 
                    value={story.soThat} 
                    onChange={(e) => updateUserStory(story.id, 'soThat', e.target.value)} 
                    className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {data.userStories.length > 0 && (
          <button 
            onClick={addUserStory} 
            className="w-full mt-3 py-2 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all text-sm font-medium"
          >
            + Tambah User Story
          </button>
        )}
      </div>

      {/* Metrics */}
      <div className="bg-cyan-50 rounded-xl p-5 border border-cyan-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            <svg className="w-5 h-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Technical Metrics
          </h3>
          {data.targetMetrics.length === 0 && (
            <button 
              onClick={addAllMetrics} 
              className="px-4 py-2 bg-cyan-600 text-white text-sm font-medium rounded-lg hover:bg-cyan-700 transition-colors shadow-md"
            >
              + Tambah Template
            </button>
          )}
        </div>
        
        {data.targetMetrics.length === 0 && (
          <div className="grid grid-cols-2 gap-2 mb-4">
            {metricTemplates.map((m, i) => (
              <div key={i} className="bg-white rounded-xl p-3 flex items-center justify-between shadow-sm border border-cyan-100">
                <span className="text-sm text-gray-700 font-medium">{m.metric}</span>
                <span className="text-sm font-semibold text-cyan-600">{m.target}</span>
              </div>
            ))}
          </div>
        )}
        
        <div className="space-y-2">
          {data.targetMetrics.map((metric, i) => (
            <div key={metric.id} className="bg-white rounded-xl p-3 flex items-center gap-3 shadow-sm border border-gray-200">
              <span className="text-xs font-medium text-gray-400 w-16 flex-shrink-0">Metric #{i+1}</span>
              <input 
                type="text" 
                placeholder="Metric" 
                value={metric.metric} 
                onChange={(e) => updateTargetMetric(metric.id, 'metric', e.target.value)} 
                className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500" 
              />
              <span className="text-gray-400 flex-shrink-0">=</span>
              <input 
                type="text" 
                placeholder="Target" 
                value={metric.target} 
                onChange={(e) => updateTargetMetric(metric.id, 'target', e.target.value)} 
                className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500" 
              />
              <button 
                onClick={() => removeTargetMetric(metric.id)} 
                className="text-gray-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg transition-colors flex-shrink-0"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
        
        {data.targetMetrics.length > 0 && (
          <button 
            onClick={addTargetMetric} 
            className="w-full mt-3 py-2 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-cyan-400 hover:text-cyan-600 hover:bg-cyan-50 transition-all text-sm font-medium"
          >
            + Tambah Metric
          </button>
        )}
      </div>

      {/* Success Criteria */}
      <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-200">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Success Criteria
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
          {successOptions.map((opt) => (
            <button 
              key={opt} 
              onClick={() => updateSuccessMetrics(data.successMetrics === opt ? '' : opt)} 
              className={`p-3 rounded-xl text-sm text-left transition-all border-2 ${
                data.successMetrics === opt 
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-md' 
                  : 'bg-white border-gray-200 text-gray-700 hover:border-emerald-300 hover:shadow-sm'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
        <textarea
          placeholder="Atau ketik criteria lainnya..."
          value={!successOptions.includes(data.successMetrics) ? data.successMetrics : ''}
          onChange={(e) => updateSuccessMetrics(e.target.value)}
          rows={2}
          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        />
      </div>
    </div>
  );
}