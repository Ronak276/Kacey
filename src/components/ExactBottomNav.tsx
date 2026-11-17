import React from 'react';
import { Home, History, User, Scan } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AppTab } from '../types';
import { motion } from 'framer-motion';

export const ExactBottomNav: React.FC = () => {
  const { activeTab, setActiveTab, isBottomNavHidden } = useApp();

  if (activeTab === 'scanner' || isBottomNavHidden) {
    return null;
  }

  const isCurrentActive = (tab: AppTab) => {
    if (tab === 'animals') return activeTab === 'animals' || activeTab === 'animal-detail';
    if (tab === 'history') return activeTab === 'history' || activeTab === 'report-detail' || activeTab === 'results';
    return activeTab === tab;
  };

  return (
    <div className="absolute bottom-5 inset-x-0 px-4 z-40 pointer-events-none pb-[env(safe-area-inset-bottom,0px)]">
      {/* Floating Modern Capsule Bar */}
      <div
        className="w-full max-w-[340px] mx-auto bg-white/98 backdrop-blur-xl border border-slate-200/90 rounded-[32px] px-3 py-1.5 shadow-[0_10px_30px_rgba(0,112,210,0.14),0_2px_8px_rgba(0,0,0,0.06)] pointer-events-auto flex items-center justify-between relative"
      >
        {/* Left Side: Home & Animals */}
        <div className="flex items-center gap-1">
          {/* Home Tab */}
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center justify-center w-14 h-11 rounded-2xl transition-all cursor-pointer ${
              isCurrentActive('home')
                ? 'text-[#0070d2] bg-sky-50/80 font-black'
                : 'text-slate-400 hover:text-slate-600 font-semibold'
            }`}
          >
            <Home className="w-5 h-5 stroke-[2.2]" />
            <span className="text-[10px] mt-0.5 leading-none">Home</span>
          </button>

          {/* Animals Tab */}
          <button
            onClick={() => setActiveTab('animals')}
            className={`flex flex-col items-center justify-center w-14 h-11 rounded-2xl transition-all cursor-pointer ${
              isCurrentActive('animals')
                ? 'text-[#0070d2] bg-sky-50/80 font-black'
                : 'text-slate-400 hover:text-slate-600 font-semibold'
            }`}
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 100 100">
                <path d="M50,42 C38,42 28,52 28,66 C28,78 38,88 50,88 C62,88 72,78 72,66 C72,52 62,42 50,42 Z" />
                <circle cx="27" cy="34" r="9.5" />
                <circle cx="43" cy="21" r="9.5" />
                <circle cx="57" cy="21" r="9.5" />
                <circle cx="73" cy="34" r="9.5" />
              </svg>
            </div>
            <span className="text-[10px] mt-0.5 leading-none">Animals</span>
          </button>
        </div>

        {/* Center: Prominent Elevated Scanner Action Button */}
        <div className="relative -mt-6 flex flex-col items-center">
          <button
            onClick={() => setActiveTab('scanner')}
            className="w-13 h-13 rounded-full bg-gradient-to-tr from-[#006ee6] via-[#0086ff] to-[#38bdf8] text-white p-1 shadow-[0_8px_20px_rgba(0,112,210,0.4)] hover:shadow-[0_10px_24px_rgba(0,112,210,0.55)] active:scale-95 transition-all cursor-pointer flex items-center justify-center border-[3px] border-white group"
            title="Scan Reagent Strip"
          >
            <Scan className="w-6 h-6 stroke-[2.5] group-hover:scale-110 transition-transform" />
          </button>
          <span className="text-[10px] font-black text-[#0070d2] mt-0.5 leading-none">Scan</span>
        </div>

        {/* Right Side: History & Profile */}
        <div className="flex items-center gap-1">
          {/* History Tab */}
          <button
            onClick={() => setActiveTab('history')}
            className={`flex flex-col items-center justify-center w-14 h-11 rounded-2xl transition-all cursor-pointer ${
              isCurrentActive('history')
                ? 'text-[#0070d2] bg-sky-50/80 font-black'
                : 'text-slate-400 hover:text-slate-600 font-semibold'
            }`}
          >
            <History className="w-5 h-5 stroke-[2.2]" />
            <span className="text-[10px] mt-0.5 leading-none">History</span>
          </button>

          {/* Profile Tab */}
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center justify-center w-14 h-11 rounded-2xl transition-all cursor-pointer ${
              isCurrentActive('profile')
                ? 'text-[#0070d2] bg-sky-50/80 font-black'
                : 'text-slate-400 hover:text-slate-600 font-semibold'
            }`}
          >
            <User className="w-5 h-5 stroke-[2.2]" />
            <span className="text-[10px] mt-0.5 leading-none">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};
