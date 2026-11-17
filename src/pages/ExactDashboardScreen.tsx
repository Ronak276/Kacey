import React from 'react';
import {
  Bell,
  ChevronRight,
  Camera,
  Users,
  History,
  FileText,
  FlaskConical,
  Calendar,
  AlertCircle,
  TrendingUp,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { motion, type Variants } from 'framer-motion';

// Container variant orchestrates staggered child animations
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

// Item variant for smooth bottom-to-top spring transition (kamzo style)
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      damping: 25,
      stiffness: 240,
    },
  },
};

export const ExactDashboardScreen: React.FC = () => {
  const { setActiveTab, navigateToReportDetail, tests } = useApp();

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative w-full h-full flex flex-col bg-[#f8fbfe] overflow-y-auto no-scrollbar pb-24 select-none font-sans"
    >
      {/* ======================================================== */}
      {/* 1. TOP HEADER: Clean Padding & Aligned Elements */}
      {/* ======================================================== */}
      <motion.div
        variants={itemVariants}
        className="w-full pt-2 pb-3 px-5 bg-gradient-to-b from-[#e6f4fe] via-[#edf7ff] to-[#f8fbfe]"
      >
        {/* Navigation Bar Row */}
        <div className="flex items-center justify-between mb-3">
          {/* Hamburger Menu (3 lines) */}
          <button
            onClick={() => setActiveTab('profile')}
            className="p-1 cursor-pointer flex flex-col justify-center gap-[4.5px] hover:opacity-75"
          >
            <span className="w-5 h-[2.5px] bg-[#1e293b] rounded-full"></span>
            <span className="w-5 h-[2.5px] bg-[#1e293b] rounded-full"></span>
            <span className="w-5 h-[2.5px] bg-[#1e293b] rounded-full"></span>
          </button>

          {/* Calibrated Badge */}
          <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white border border-sky-100 text-[10px] font-bold text-sky-700 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>LAB CALIBRATED</span>
          </div>

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setActiveTab('notifications')}
              className="p-1 cursor-pointer text-[#1e293b] hover:opacity-75"
              title="Open Notifications"
            >
              <Bell className="w-5 h-5 stroke-[2.3] fill-slate-800 text-slate-800" />
              <span className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-[#ef4444] border-2 border-white"></span>
            </button>
          </div>
        </div>

        {/* Hello Dr. Sarah Smith & Subtitle */}
        <div className="mb-2">
          <div className="flex items-center gap-1.5">
            <h1 className="text-[19px] font-black text-slate-900 tracking-tight leading-none">
              Hello, Dr. Sarah Smith
            </h1>
            <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
          </div>
          <div className="flex items-center gap-2 mt-1 text-[11px] font-medium text-slate-500">
            <span className="flex items-center gap-1 text-emerald-600 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Shift Active
            </span>
            <span>• Metropolitan Veterinary Hospital</span>
          </div>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <div className="px-5 space-y-3.5">
        {/* ======================================================== */}
        {/* 2. HERO CARD: Scan Reagent Test Strip */}
        {/* ======================================================== */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-r from-[#0086ff] to-[#006ee6] rounded-[22px] p-4 text-white shadow-md shadow-sky-500/20 hover:shadow-xl hover:shadow-sky-500/35 hover:-translate-y-1 transition-all duration-300 ease-out group"
        >
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1 text-[9px] font-extrabold uppercase tracking-wider bg-white/20 text-white px-2.5 py-0.5 rounded-full border border-white/20">
                Point-of-Care AI
              </span>
              <h2 className="text-[17px] font-extrabold tracking-tight text-white mt-1 group-hover:translate-x-0.5 transition-transform">
                Scan Reagent Test Strip
              </h2>
              <p className="text-[11px] text-white/90 leading-snug max-w-[215px] font-medium">
                Instant AI colorimetric pad analysis for 10-parameter urinalysis & screening.
              </p>
            </div>

            {/* QR/Scanner icon */}
            <div className="w-11 h-11 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg className="w-5 h-5 stroke-white fill-none stroke-[2]" viewBox="0 0 24 24">
                <path d="M3 7V5a2 2 0 0 1 2-2h2m10 0h2a2 2 0 0 1 2 2v2m0 10v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2" />
                <rect x="7" y="7" width="10" height="10" rx="1" />
              </svg>
            </div>
          </div>

          {/* Launch Scanner Button */}
          <button
            onClick={() => setActiveTab('scanner')}
            className="w-full mt-3.5 py-2.5 px-4 bg-white hover:bg-sky-50 active:scale-[0.98] text-[#0070d2] font-black text-xs rounded-xl shadow flex items-center justify-center gap-1.5 transition-all cursor-pointer group-hover:shadow-lg"
          >
            <Camera className="w-4 h-4 text-[#0070d2] stroke-[2.2]" />
            <span className="tracking-wide">Launch Scanner</span>
            <ChevronRight className="w-4 h-4 text-[#0070d2] stroke-[2.5] group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {/* ======================================================== */}
        {/* 3. FOUR CLINICAL METRICS TILES (2x2 Grid) */}
        {/* ======================================================== */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3">
          {/* Tile 1: Total Animals */}
          <div
            onClick={() => setActiveTab('animals')}
            className="bg-white p-3 rounded-[20px] shadow-xs border border-slate-100/90 cursor-pointer hover:border-sky-300 hover:shadow-lg hover:shadow-sky-500/15 hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 ease-out group"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold text-slate-500 group-hover:text-sky-600 transition-colors">
                Total Animals
              </span>
              <div className="w-6 h-6 rounded-lg bg-sky-50 group-hover:bg-sky-500 text-sky-600 group-hover:text-white flex items-center justify-center transition-all duration-300 group-hover:rotate-12">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 100 100">
                  <path d="M50,42 C38,42 28,52 28,66 C28,78 38,88 50,88 C62,88 72,78 72,66 C72,52 62,42 50,42 Z" />
                  <circle cx="27" cy="34" r="9.5" />
                  <circle cx="43" cy="21" r="9.5" />
                  <circle cx="57" cy="21" r="9.5" />
                  <circle cx="73" cy="34" r="9.5" />
                </svg>
              </div>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-black text-slate-900 leading-none group-hover:text-sky-600 transition-colors">
                248
              </span>
              <span className="text-[10px] font-extrabold text-emerald-600 flex items-center group-hover:scale-105 transition-transform">
                <TrendingUp className="w-2.5 h-2.5 mr-0.5" />+12
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium mt-1">Active profiles</p>
          </div>

          {/* Tile 2: Total Tests */}
          <div
            onClick={() => setActiveTab('history')}
            className="bg-white p-3 rounded-[20px] shadow-xs border border-slate-100/90 cursor-pointer hover:border-sky-300 hover:shadow-lg hover:shadow-sky-500/15 hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 ease-out group"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold text-slate-500 group-hover:text-[#0070d2] transition-colors">
                Total Tests
              </span>
              <div className="w-6 h-6 rounded-lg bg-sky-50 group-hover:bg-[#0070d2] text-[#0070d2] group-hover:text-white flex items-center justify-center transition-all duration-300 group-hover:-rotate-12">
                <FlaskConical className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-black text-slate-900 leading-none group-hover:text-[#0070d2] transition-colors">
                1,420
              </span>
              <span className="text-[9px] font-bold text-slate-400">Total run</span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium mt-1">Automated reads</p>
          </div>

          {/* Tile 3: This Month */}
          <div
            onClick={() => setActiveTab('history')}
            className="bg-white p-3 rounded-[20px] shadow-xs border border-slate-100/90 cursor-pointer hover:border-sky-300 hover:shadow-lg hover:shadow-sky-500/15 hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 ease-out group"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold text-slate-500 group-hover:text-sky-600 transition-colors">
                This Month
              </span>
              <div className="w-6 h-6 rounded-lg bg-sky-50 group-hover:bg-sky-500 text-sky-600 group-hover:text-white flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                <Calendar className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-black text-slate-900 leading-none group-hover:text-sky-600 transition-colors">
                186
              </span>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1 rounded group-hover:bg-emerald-100 transition-colors">
                94.2%
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium mt-1">Verified clean</p>
          </div>

          {/* Tile 4: Pending */}
          <div
            onClick={() => setActiveTab('history')}
            className="bg-white p-3 rounded-[20px] shadow-xs border border-slate-100/90 cursor-pointer hover:border-amber-300 hover:shadow-lg hover:shadow-amber-500/15 hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 ease-out group"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold text-slate-500 group-hover:text-amber-600 transition-colors">
                Pending
              </span>
              <div className="w-6 h-6 rounded-lg bg-amber-50 group-hover:bg-amber-500 text-amber-500 group-hover:text-white flex items-center justify-center transition-all duration-300 group-hover:rotate-180">
                <AlertCircle className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-black text-slate-900 leading-none group-hover:text-amber-600 transition-colors">
                3
              </span>
              <span className="text-[9px] font-extrabold text-amber-700 bg-amber-100 px-1.5 py-0.2 rounded-md group-hover:bg-amber-200 transition-colors">
                Action
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium mt-1">Needs vet sign-off</p>
          </div>
        </motion.div>

        {/* ======================================================== */}
        {/* 4. RECENT TESTING ACTIVITY */}
        {/* ======================================================== */}
        <motion.div variants={itemVariants} className="pt-1">
          <div className="flex items-center justify-between mb-2.5 px-0.5">
            <h3 className="text-xs font-black text-slate-900 tracking-tight">Recent Activity</h3>
            <button
              onClick={() => setActiveTab('history')}
              className="text-xs font-bold text-[#0070d2] hover:underline flex items-center gap-0.5 cursor-pointer"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2">
            {/* Record 1: Buddy */}
            <div
              onClick={() => {
                if (tests[0]) navigateToReportDetail(tests[0]);
              }}
              className="bg-white hover:bg-sky-50/50 hover:border-sky-200 hover:shadow-md hover:-translate-y-0.5 p-2.5 rounded-[18px] shadow-2xs border border-slate-100 flex items-center justify-between cursor-pointer transition-all duration-200 active:scale-[0.99] group"
            >
              <div className="flex items-center gap-3">
                <img
                  src="/assets/buddy_avatar.png"
                  alt="Buddy"
                  className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-100 group-hover:scale-105 transition-transform"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#0070d2] transition-colors">
                    Buddy
                  </h4>
                  <p className="text-[10px] text-slate-500 font-medium">Urine Test (Veti-Stx 9)</p>
                  <span className="inline-block text-[9px] font-bold text-[#10b981] bg-[#ecfdf5] px-1.5 py-0.2 rounded mt-0.5">
                    Normal
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 font-medium">2h ago</span>
                <p className="text-[9px] text-emerald-600 font-bold mt-0.5 group-hover:underline">Passed</p>
              </div>
            </div>

            {/* Record 2: Luna */}
            <div
              onClick={() => {
                if (tests[1]) navigateToReportDetail(tests[1]);
              }}
              className="bg-white hover:bg-rose-50/40 hover:border-rose-200 hover:shadow-md hover:-translate-y-0.5 p-2.5 rounded-[18px] shadow-2xs border border-slate-100 flex items-center justify-between cursor-pointer transition-all duration-200 active:scale-[0.99] group"
            >
              <div className="flex items-center gap-3">
                <img
                  src="/assets/luna_avatar.png"
                  alt="Luna"
                  className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-100 group-hover:scale-105 transition-transform"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                    Luna
                  </h4>
                  <p className="text-[10px] text-slate-500 font-medium">Toxicology (Veti-Screen 6)</p>
                  <span className="inline-block text-[9px] font-bold text-rose-500 bg-rose-50 px-1.5 py-0.2 rounded mt-0.5">
                    Positive
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 font-medium">1d ago</span>
                <p className="text-[9px] text-rose-500 font-bold mt-0.5 group-hover:underline">Review</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
