import React, { useState } from 'react';
import {
  ChevronLeft,
  Calendar,
  ChevronRight,
  Filter,
  Search,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const HistoryPage: React.FC = () => {
  const { tests, navigateToReportDetail, setActiveTab } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Urine', 'Drug', 'Other'];

  const filteredTests = tests.filter((test) => {
    const matchesCat =
      activeCategory === 'All'
        ? true
        : activeCategory === 'Other'
        ? test.testCategory !== 'Urine' && test.testCategory !== 'Drug'
        : test.testCategory.toLowerCase().includes(activeCategory.toLowerCase());

    const matchesSearch =
      test.animalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.testName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCat && matchesSearch;
  });

  return (
    <div className="flex-1 flex flex-col bg-slate-50 relative pb-24 overflow-y-auto">
      {/* Top Header Navigation (Screen 6 Exact) */}
      <div className="bg-white px-5 pt-4 pb-3 flex items-center justify-between border-b border-slate-100 shadow-sm sticky top-0 z-20">
        <button
          onClick={() => setActiveTab('home')}
          className="w-9 h-9 rounded-xl bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-700"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <h1 className="text-sm font-bold text-slate-800">Test History</h1>

        <button
          onClick={() => {}}
          className="w-9 h-9 rounded-xl bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-700"
          title="Filter by Date"
        >
          <Calendar className="w-4 h-4" />
        </button>
      </div>

      <div className="px-5 py-3 space-y-3">
        {/* Category Filter Pills (Screen 6 exact: All | Urine | Drug | Other) */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search animal name or test..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm"
          />
        </div>

        {/* History Cards List (Exact UI from Screen 6) */}
        <div className="space-y-2.5 pt-1">
          {filteredTests.map((test) => (
            <div
              key={test.id}
              onClick={() => navigateToReportDetail(test)}
              className="bg-white hover:bg-sky-50/40 p-3.5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between cursor-pointer transition-all active:scale-[0.99] group"
            >
              <div className="flex items-center gap-3">
                {/* Visual miniature Test Strip bar representation (Screen 6 exact) */}
                <div className="w-3.5 h-12 bg-slate-100 rounded-sm flex flex-col items-center justify-around py-1 border border-slate-200/80 shrink-0">
                  {test.stripPads.slice(0, 4).map((color, idx) => (
                    <div
                      key={idx}
                      style={{ backgroundColor: color }}
                      className="w-2.5 h-1.5 rounded-[1px] shadow-inner"
                    ></div>
                  ))}
                </div>

                {/* Date & Test Title */}
                <div>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {test.timestamp}
                  </span>
                  <h3 className="text-xs font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                    {test.testName}
                  </h3>
                  <p className="text-[10px] text-slate-500">
                    Patient: <span className="font-semibold">{test.animalName}</span>
                  </p>
                </div>
              </div>

              {/* Status Badge & Chevron (Screen 6 exact: Normal / Positive / Trace) */}
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                    test.overallStatus === 'Normal'
                      ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                      : test.overallStatus === 'Trace'
                      ? 'bg-amber-50 text-amber-600 border border-amber-100'
                      : 'bg-rose-50 text-rose-600 border border-rose-100'
                  }`}
                >
                  {test.overallStatus}
                </span>
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-sky-600 transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

