import React from 'react';
import { ChevronLeft, Download, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ExactReportDetailScreen: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <div className="relative w-full h-full flex flex-col bg-white overflow-y-auto no-scrollbar pb-16 select-none">
      {/* Header: < Report Details [Download] (Screen 7 Exact) */}
      <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-slate-100">
        <button
          onClick={() => setActiveTab('history')}
          className="text-slate-800 hover:text-slate-600"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <h1 className="text-sm font-bold text-slate-800">Report Details</h1>

        <button className="text-slate-800 hover:text-slate-600">
          <Download className="w-4 h-4" />
        </button>
      </div>

      <div className="px-5 py-4 space-y-4">
        {/* Buddy Avatar, Date & Time, Normal badge (Screen 7 Exact) */}
        <div className="flex items-center gap-3">
          <img
            src="/assets/buddy_avatar.png"
            alt="Buddy"
            className="w-13 h-13 rounded-2xl object-cover"
          />
          <div>
            <h2 className="text-sm font-bold text-slate-900">Buddy</h2>
            <p className="text-[11px] text-slate-400">Nov 16, 2026 • 2:15 PM</p>
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded mt-0.5">
              <Check className="w-3 h-3 stroke-[3]" /> Normal
            </span>
          </div>
        </div>

        {/* Test Parameters (Screen 7 Exact) */}
        <div className="space-y-2.5 pt-1">
          <h3 className="text-xs font-bold text-slate-900 pb-1 border-b border-slate-100">
            Test Parameters
          </h3>

          {/* Protein */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-600">Protein</span>
            <span className="font-semibold text-emerald-600">Negative</span>
          </div>

          {/* Glucose */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-600">Glucose</span>
            <span className="font-semibold text-amber-500">Trace</span>
          </div>

          {/* Ketones */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-600">Ketones</span>
            <span className="font-semibold text-emerald-600">Negative</span>
          </div>

          {/* pH */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-600">pH</span>
            <span className="font-semibold text-slate-800">6.5</span>
          </div>

          {/* Blood */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-600">Blood</span>
            <span className="font-semibold text-emerald-600">Negative</span>
          </div>

          {/* Specific Gravity */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-600">Specific Gravity</span>
            <span className="font-semibold text-slate-800">1.020</span>
          </div>
        </div>

        {/* Notes (Screen 7 Exact) */}
        <div className="pt-2">
          <h4 className="text-xs font-bold text-slate-900 mb-1">Notes</h4>
          <p className="text-xs text-slate-500">All values are within normal range.</p>
        </div>

        {/* Download PDF Button (Screen 7 Exact) */}
        <div className="pt-4">
          <button
            onClick={() => window.print()}
            className="w-full py-3 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md shadow-sky-600/30 flex items-center justify-center gap-2 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};

