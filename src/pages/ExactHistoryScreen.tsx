import React, { useState } from 'react';
import {
  ChevronLeft,
  Calendar,
  ChevronRight,
  CheckCircle2,
  Search,
  SlidersHorizontal,
  X,
  FileText
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.03,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      damping: 24,
      stiffness: 240,
    },
  },
};

export const ExactHistoryScreen: React.FC = () => {
  const { setActiveTab, navigateToReportDetail, tests } = useApp();
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDateFilter, setSelectedDateFilter] = useState<string>('All Time');

  const historyItems = [
    {
      id: 'h1',
      category: 'Urine',
      date: 'Nov 16, 2026 • 2:15 PM',
      name: 'Urine Test',
      animal: 'Buddy (Golden Retriever)',
      status: 'Normal',
      badgeClass: 'bg-[#dcfce7] text-[#15803d]',
      hasCheck: false,
      pads: ['#facc15', '#fef08a', '#38bdf8', '#4ade80'],
    },
    {
      id: 'h2',
      category: 'Drug',
      date: 'Nov 14, 2026 • 10:30 AM',
      name: 'Drug Test',
      animal: 'Luna (Siamese Cat)',
      status: 'Positive',
      badgeClass: 'bg-[#fee2e2] text-[#ef4444]',
      hasCheck: false,
      pads: ['#fb7185', '#facc15', '#38bdf8', '#e2e8f0'],
    },
    {
      id: 'h3',
      category: 'Urine',
      date: 'Nov 10, 2026 • 1:20 PM',
      name: 'Urine Test',
      animal: 'Max (German Shepherd)',
      status: 'Normal',
      badgeClass: 'bg-[#dcfce7] text-[#15803d]',
      hasCheck: false,
      pads: ['#facc15', '#38bdf8', '#38bdf8', '#4ade80'],
    },
    {
      id: 'h4',
      category: 'Urine',
      date: 'Nov 05, 2026 • 11:45 AM',
      name: 'Urine Test',
      animal: 'Buddy (Golden Retriever)',
      status: 'Trace',
      badgeClass: 'bg-[#ffedd5] text-[#f97316]',
      hasCheck: true,
      pads: ['#facc15', '#fef08a', '#38bdf8', '#4ade80'],
    },
  ];

  const filteredItems = historyItems.filter((item) => {
    const matchesCategory = filter === 'All' || item.category.toLowerCase() === filter.toLowerCase();
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.animal.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.date.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative w-full h-full flex flex-col bg-[#f8fafc]/50 overflow-y-auto no-scrollbar pb-24 select-none font-sans"
    >
      {/* ======================================================== */}
      {/* 1. TOP HEADER: < Test History [Calendar Icon] */}
      {/* ======================================================== */}
      <motion.div
        variants={itemVariants}
        className="flex items-center justify-between px-5 pt-3 pb-3 bg-white border-b border-slate-100 sticky top-0 z-20 shadow-2xs"
      >
        <button
          onClick={() => setActiveTab('home')}
          className="text-slate-800 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 cursor-pointer transition-colors"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
        </button>

        <h1 className="text-[17px] font-black text-slate-900 tracking-tight">Test History</h1>

        <button
          onClick={() => setIsDatePickerOpen(true)}
          className="text-slate-800 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 cursor-pointer transition-colors relative"
          title="Date Range Filter"
        >
          <Calendar className="w-5 h-5 stroke-[2]" />
          {selectedDateFilter !== 'All Time' && (
            <span className="w-2 h-2 rounded-full bg-[#0070d2] absolute top-1 right-1"></span>
          )}
        </button>
      </motion.div>

      <div className="px-5 pt-3 space-y-3">
        {/* Search Bar Input */}
        <motion.div variants={itemVariants} className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search test type, patient name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-white rounded-2xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-[#0070d2] text-slate-800 placeholder-slate-400 shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </motion.div>

        {/* ======================================================== */}
        {/* 2. FILTER PILLS: All | Urine | Drug | Other */}
        {/* ======================================================== */}
        <motion.div variants={itemVariants} className="flex items-center gap-2">
          {['All', 'Urine', 'Drug', 'Other'].map((item) => {
            const isSelected = filter === item;
            return (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`px-4 py-1.5 rounded-full text-xs font-black transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#0070d2] text-white shadow-sm shadow-sky-600/25'
                    : 'bg-white text-slate-600 border border-slate-200/90 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {item}
              </button>
            );
          })}
        </motion.div>

        {/* Date Filter Indicator Badge */}
        {selectedDateFilter !== 'All Time' && (
          <div className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-sky-50 border border-sky-100 text-[11px] text-[#0070d2] font-bold">
            <span>Filtered: {selectedDateFilter}</span>
            <button
              onClick={() => setSelectedDateFilter('All Time')}
              className="text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              Clear
            </button>
          </div>
        )}

        {/* ======================================================== */}
        {/* 3. TEST HISTORY CARDS (Matching Reference Layout) */}
        {/* ======================================================== */}
        <motion.div variants={itemVariants} className="space-y-3 pt-1">
          {filteredItems.length === 0 ? (
            <div className="py-10 text-center text-slate-400 text-xs">
              No matching diagnostic tests found.
            </div>
          ) : (
            filteredItems.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                whileHover={{ y: -1, scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => {
                  if (tests[0]) navigateToReportDetail(tests[0]);
                }}
                className="bg-white hover:bg-slate-50/80 p-3 rounded-[22px] border border-slate-200/70 shadow-[0_4px_16px_rgba(0,0,0,0.03)] flex items-center justify-between cursor-pointer transition-all"
              >
                {/* Left Side: Realistic Test Strip Graphic & Info */}
                <div className="flex items-center gap-3.5">
                  {/* Gray Textured Background Box for Strip */}
                  <div className="w-[50px] h-[52px] rounded-2xl bg-[#d1d5db]/40 border border-slate-300/40 p-1 flex items-center justify-center shrink-0 shadow-inner">
                    {/* White plastic strip stick */}
                    <div className="w-3 h-10 bg-white rounded-xs shadow-xs flex flex-col items-center justify-start gap-[2px] pt-1 border border-slate-200/80">
                      {item.pads.map((c, i) => (
                        <div
                          key={i}
                          style={{ backgroundColor: c }}
                          className="w-2 h-1.5 rounded-[0.5px] shadow-[inset_0_0_1px_rgba(0,0,0,0.15)]"
                        ></div>
                      ))}
                    </div>
                  </div>

                  {/* Date & Bold Title */}
                  <div>
                    <span className="text-[11px] text-slate-500 font-bold tracking-tight block">
                      {item.date}
                    </span>
                    <h3 className="text-[15px] font-black text-slate-900 tracking-tight mt-0.5">
                      {item.name}
                    </h3>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {item.animal}
                    </span>
                  </div>
                </div>

                {/* Right Side: Status Badge & Chevron */}
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[11px] font-black px-2.5 py-1 rounded-full flex items-center gap-1 ${item.badgeClass}`}
                  >
                    {item.hasCheck && <CheckCircle2 className="w-3 h-3 stroke-[2.5]" />}
                    <span>{item.status}</span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#0070d2] stroke-[2.5]" />
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>

      {/* Date Range Modal */}
      <AnimatePresence>
        {isDatePickerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl p-5 w-full max-w-sm shadow-2xl space-y-3"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#0070d2]" />
                  <h3 className="text-sm font-black text-slate-900">Filter by Date Range</h3>
                </div>
                <button
                  onClick={() => setIsDatePickerOpen(false)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2">
                {['All Time', 'Today (Oct 24)', 'Past 7 Days', 'This Month (October)', 'Custom Range'].map(
                  (range) => (
                    <button
                      key={range}
                      onClick={() => {
                        setSelectedDateFilter(range);
                        setIsDatePickerOpen(false);
                      }}
                      className={`w-full p-2.5 rounded-xl text-xs font-bold text-left transition-colors flex items-center justify-between ${
                        selectedDateFilter === range
                          ? 'bg-sky-50 text-[#0070d2] border border-[#0070d2]'
                          : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span>{range}</span>
                      {selectedDateFilter === range && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0070d2]" />
                      )}
                    </button>
                  )
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
