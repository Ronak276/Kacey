import React from 'react';
import { ChevronLeft, Share2, Check, Download } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ExactResultsScreen: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <div className="relative w-full h-full flex flex-col bg-white overflow-y-auto no-scrollbar pb-16 select-none">
      {/* Header: < Test Results [Share] (Screen 4 Exact) */}
      <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-slate-100">
        <button
          onClick={() => setActiveTab('home')}
          className="text-slate-800 hover:text-slate-600"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <h1 className="text-sm font-bold text-slate-800">Test Results</h1>

        <button
          onClick={() => {}}
          className="text-slate-800 hover:text-slate-600"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      <div className="px-5 py-4 space-y-4">
        {/* Completed Green Checkmark Circle & Heading (Screen 4 Exact) */}
        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md mb-2">
            <Check className="w-8 h-8 stroke-[3]" />
          </div>
          <h2 className="text-base font-extrabold text-slate-900">Test Completed!</h2>
          <p className="text-xs text-slate-400">Results are ready</p>
        </div>

        {/* Urine Analysis 2 min ago (Screen 4 Exact) */}
        <div className="flex items-center justify-between py-1 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-sky-500"></div>
            <span className="text-xs font-bold text-slate-900">Urine Analysis</span>
          </div>
          <span className="text-[11px] text-slate-400 font-medium">2 min ago</span>
        </div>

        {/* Parameters List matching Screen 4 Exact */}
        <div className="space-y-3 pt-1 text-xs">
          {/* Protein: Negative */}
          <div className="flex items-center justify-between">
            <span className="text-slate-700 font-medium">Protein</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="font-semibold text-emerald-600">Negative</span>
            </div>
          </div>

          {/* Glucose: Trace */}
          <div className="flex items-center justify-between">
            <span className="text-slate-700 font-medium">Glucose</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <span className="font-semibold text-amber-500">Trace</span>
            </div>
          </div>

          {/* Ketones: Negative */}
          <div className="flex items-center justify-between">
            <span className="text-slate-700 font-medium">Ketones</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="font-semibold text-emerald-600">Negative</span>
            </div>
          </div>

          {/* pH: 6.5 */}
          <div className="flex items-center justify-between">
            <span className="text-slate-700 font-medium">pH</span>
            <div className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-500 stroke-[3]" />
              <span className="font-semibold text-slate-800">6.5</span>
            </div>
          </div>

          {/* Blood: Negative */}
          <div className="flex items-center justify-between">
            <span className="text-slate-700 font-medium">Blood</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="font-semibold text-emerald-600">Negative</span>
            </div>
          </div>

          {/* Specific Gravity: 1.020 */}
          <div className="flex items-center justify-between">
            <span className="text-slate-700 font-medium">Specific Gravity</span>
            <div className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-500 stroke-[3]" />
              <span className="font-semibold text-slate-800">1.020</span>
            </div>
          </div>
        </div>

        {/* Results are within normal range (Green Pill banner from Screen 4) */}
        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-3 flex items-center gap-2 text-emerald-800">
          <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <span className="text-xs font-semibold">Results are within normal range</span>
        </div>

        {/* Buttons: Save Report & Share Results (Screen 4 Exact) */}
        <div className="space-y-2 pt-2">
          <button
            onClick={() => setActiveTab('report-detail')}
            className="w-full py-3 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md shadow-sky-600/30 flex items-center justify-center gap-2 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Save Report</span>
          </button>

          <button
            onClick={() => {}}
            className="w-full py-3 rounded-2xl bg-white hover:bg-slate-50 text-sky-700 font-bold text-xs border border-sky-200 shadow-sm flex items-center justify-center gap-2 transition-all"
          >
            <Share2 className="w-4 h-4 text-sky-600" />
            <span>Share Results</span>
          </button>
        </div>
      </div>
    </div>
  );
};

