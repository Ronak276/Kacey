import React from 'react';
import {
  Menu,
  Bell,
  ChevronRight,
  Camera,
  Users,
  History,
  FileText,
  Activity,
  CheckCircle2,
  Clock,
  Plus,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const DashboardPage: React.FC = () => {
  const {
    animals,
    tests,
    startScannerForAnimal,
    setActiveTab,
    navigateToAnimalDetail,
    navigateToReportDetail,
  } = useApp();

  // Stats calculation
  const totalAnimals = animals.length;
  const completedTests = tests.filter((t) => t.overallStatus === 'Normal').length;
  const abnormalTests = tests.filter((t) => t.overallStatus !== 'Normal').length;

  return (
    <div className="flex-1 flex flex-col bg-slate-50 relative pb-24 overflow-y-auto">
      {/* Top Background Waves Header matching Reference Image 2 */}
      <div className="relative bg-gradient-to-b from-sky-400 via-sky-300 to-sky-100/40 pt-4 pb-8 px-5 rounded-b-[36px] shadow-sm">
        {/* Decorative Wave curves & paw prints */}
        <div className="absolute top-2 right-4 text-white/30 pointer-events-none">
          <svg className="w-20 h-20 fill-current" viewBox="0 0 100 100">
            <path d="M50,42 C38,42 28,52 28,66 C28,78 38,88 50,88 C62,88 72,78 72,66 C72,52 62,42 50,42 Z" />
            <circle cx="27" cy="34" r="9" />
            <circle cx="43" cy="22" r="9" />
            <circle cx="57" cy="22" r="9" />
            <circle cx="73" cy="34" r="9" />
          </svg>
        </div>

        {/* Top Navbar */}
        <div className="relative z-10 flex items-center justify-between mb-4">
          <button
            onClick={() => setActiveTab('profile')}
            className="w-9 h-9 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm flex items-center justify-center text-slate-700 hover:bg-white"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="relative">
            <button
              onClick={() => setActiveTab('history')}
              className="w-9 h-9 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm flex items-center justify-center text-slate-700 hover:bg-white"
            >
              <Bell className="w-5 h-5" />
              {/* Red notification dot */}
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
            </button>
          </div>
        </div>

        {/* Greeting Banner */}
        <div className="relative z-10 mb-4">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Hello Dr. Smith
            </h1>
            <span className="text-xl">👋</span>
          </div>
          <p className="text-xs text-slate-700 font-medium">Good morning!</p>
        </div>

        {/* Total Animals Card (Exact visual from Reference Image) */}
        <div
          onClick={() => setActiveTab('animals')}
          className="relative z-10 bg-sky-600 hover:bg-sky-700 text-white rounded-2xl p-4 shadow-lg shadow-sky-600/30 flex items-center justify-between cursor-pointer transition-all active:scale-[0.99]"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center text-white">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 100 100">
                <path d="M50,42 C38,42 28,52 28,66 C28,78 38,88 50,88 C62,88 72,78 72,66 C72,52 62,42 50,42 Z" />
                <circle cx="27" cy="34" r="9" />
                <circle cx="43" cy="22" r="9" />
                <circle cx="57" cy="22" r="9" />
                <circle cx="73" cy="34" r="9" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-sky-100 font-medium">Total Animals</p>
              <p className="text-2xl font-black">{totalAnimals}</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-white/80" />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="px-5 -mt-2 space-y-6">
        {/* 4 Core Quick Action Tiles (Screen 2 exact 2x2 grid) */}
        <div className="grid grid-cols-2 gap-3.5">
          {/* Scan Test Strip */}
          <button
            onClick={() => startScannerForAnimal()}
            className="bg-white hover:bg-sky-50/50 p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center gap-2 text-center transition-all group active:scale-95"
          >
            <div className="w-12 h-12 rounded-2xl bg-sky-50 group-hover:bg-sky-100 text-sky-600 flex items-center justify-center transition-colors">
              <Camera className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-slate-800">Scan Test Strip</span>
          </button>

          {/* Animal Profiles */}
          <button
            onClick={() => setActiveTab('animals')}
            className="bg-white hover:bg-sky-50/50 p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center gap-2 text-center transition-all group active:scale-95"
          >
            <div className="w-12 h-12 rounded-2xl bg-sky-50 group-hover:bg-sky-100 text-sky-600 flex items-center justify-center transition-colors">
              <Users className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-slate-800">Animal Profiles</span>
          </button>

          {/* Test History */}
          <button
            onClick={() => setActiveTab('history')}
            className="bg-white hover:bg-sky-50/50 p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center gap-2 text-center transition-all group active:scale-95"
          >
            <div className="w-12 h-12 rounded-2xl bg-sky-50 group-hover:bg-sky-100 text-sky-600 flex items-center justify-center transition-colors">
              <History className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-slate-800">Test History</span>
          </button>

          {/* Reports */}
          <button
            onClick={() => {
              if (tests.length > 0) {
                navigateToReportDetail(tests[0]);
              } else {
                setActiveTab('history');
              }
            }}
            className="bg-white hover:bg-sky-50/50 p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center gap-2 text-center transition-all group active:scale-95"
          >
            <div className="w-12 h-12 rounded-2xl bg-sky-50 group-hover:bg-sky-100 text-sky-600 flex items-center justify-center transition-colors">
              <FileText className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-slate-800">Reports</span>
          </button>
        </div>

        {/* Weekly Diagnostic Activity Mini Bar Chart & Metrics */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-xs font-bold text-slate-900">Weekly Diagnostic Activity</h2>
              <p className="text-[10px] text-slate-400">Canine & Feline Strip Readings</p>
            </div>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
              <Activity className="w-3 h-3" /> +18% this week
            </span>
          </div>

          <div className="flex items-end justify-between h-20 pt-2 gap-2">
            {[
              { day: 'Mon', count: 6, h: '60%' },
              { day: 'Tue', count: 4, h: '40%' },
              { day: 'Wed', count: 9, h: '90%' },
              { day: 'Thu', count: 7, h: '70%' },
              { day: 'Fri', count: 10, h: '100%' },
              { day: 'Sat', count: 3, h: '30%' },
              { day: 'Sun', count: 2, h: '20%' },
            ].map((col) => (
              <div key={col.day} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                <div
                  style={{ height: col.h }}
                  className="w-full bg-gradient-to-t from-sky-500 to-cyan-300 rounded-t-md transition-all hover:opacity-80"
                ></div>
                <span className="text-[10px] font-medium text-slate-500">{col.day}</span>
              </div>
            ))}
          </div>

          {/* Normal vs Abnormal Quick Indicator */}
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span className="text-slate-600 text-[11px] font-medium">Normal: {completedTests}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span className="text-slate-600 text-[11px] font-medium">Trace/Action: {abnormalTests}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
              <span className="text-slate-600 text-[11px] font-medium">Total: {tests.length}</span>
            </div>
          </div>
        </div>

        {/* Recent Activity Section (Screen 2 exact list) */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-bold text-slate-900">Recent Activity</h2>
            <button
              onClick={() => setActiveTab('history')}
              className="text-xs font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-0.5"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {tests.slice(0, 3).map((test) => (
              <div
                key={test.id}
                onClick={() => navigateToReportDetail(test)}
                className="bg-white hover:bg-sky-50/30 p-3 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between cursor-pointer transition-all active:scale-[0.99]"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={test.animalPhoto}
                    alt={test.animalName}
                    className="w-11 h-11 rounded-xl object-cover border border-slate-100 shadow-sm"
                  />
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">{test.animalName}</h3>
                    <p className="text-[11px] text-slate-500 font-medium">{test.testName}</p>
                    <span
                      className={`inline-block mt-0.5 text-[9px] font-bold px-1.5 py-0.5 rounded-md ${
                        test.overallStatus === 'Normal'
                          ? 'bg-emerald-50 text-emerald-600'
                          : test.overallStatus === 'Trace'
                          ? 'bg-amber-50 text-amber-600'
                          : 'bg-rose-50 text-rose-600'
                      }`}
                    >
                      {test.overallStatus}
                    </span>
                  </div>
                </div>

                <div className="text-right flex flex-col items-end gap-1">
                  <span className="text-[10px] text-slate-400 font-medium">
                    {test.displayTimeAgo || 'Recent'}
                  </span>
                  <div className="w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-sky-600">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

