import React from 'react';
import { Home, Users, History, User, Camera } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AppTab } from '../../types';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, startScannerForAnimal } = useApp();

  // If scanner or welcome screen, bottom nav can be hidden or contextual
  if (activeTab === 'scanner') {
    return null;
  }

  const navItems: { tab: AppTab; label: string; icon: React.ReactNode }[] = [
    {
      tab: 'home',
      label: 'Home',
      icon: <Home className="w-5 h-5" />,
    },
    {
      tab: 'animals',
      label: 'Animals',
      icon: <Users className="w-5 h-5" />,
    },
    {
      tab: 'history',
      label: 'History',
      icon: <History className="w-5 h-5" />,
    },
    {
      tab: 'profile',
      label: 'Profile',
      icon: <User className="w-5 h-5" />,
    },
  ];

  return (
    <div className="relative w-full bg-white border-t border-slate-100 shadow-[0_-4px_20px_rgba(0,0,0,0.04)] z-30">
      {/* Floating Center Action Button - Scan Test Strip */}
      <div className="absolute -top-7 left-1/2 -translate-x-1/2 z-40">
        <button
          onClick={() => startScannerForAnimal()}
          title="Scan Test Strip"
          className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-sky-600 via-sky-500 to-cyan-400 text-white shadow-lg shadow-sky-500/35 hover:shadow-sky-500/50 hover:scale-105 active:scale-95 transition-all group"
        >
          <Camera className="w-6 h-6 transition-transform group-hover:scale-110" />
          <span className="absolute -bottom-5 text-[10px] font-bold text-sky-700 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            Scan Strip
          </span>
        </button>
      </div>

      {/* 4 Bottom Tab Icons */}
      <div className="flex items-center justify-between px-6 py-2.5 max-w-md mx-auto">
        {/* Home */}
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center justify-center gap-1 transition-colors ${
            activeTab === 'home' ? 'text-sky-600 font-semibold' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          {navItems[0].icon}
          <span className="text-[11px]">{navItems[0].label}</span>
        </button>

        {/* Animals */}
        <button
          onClick={() => setActiveTab('animals')}
          className={`flex flex-col items-center justify-center gap-1 pr-6 transition-colors ${
            activeTab === 'animals' || activeTab === 'animal-detail'
              ? 'text-sky-600 font-semibold'
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          {navItems[1].icon}
          <span className="text-[11px]">{navItems[1].label}</span>
        </button>

        {/* History */}
        <button
          onClick={() => setActiveTab('history')}
          className={`flex flex-col items-center justify-center gap-1 pl-6 transition-colors ${
            activeTab === 'history' || activeTab === 'report-detail'
              ? 'text-sky-600 font-semibold'
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          {navItems[2].icon}
          <span className="text-[11px]">{navItems[2].label}</span>
        </button>

        {/* Profile */}
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center justify-center gap-1 transition-colors ${
            activeTab === 'profile' ? 'text-sky-600 font-semibold' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          {navItems[3].icon}
          <span className="text-[11px]">{navItems[3].label}</span>
        </button>
      </div>

      {/* iOS Home indicator bar */}
      <div className="w-32 h-1 bg-slate-300 rounded-full mx-auto mb-1.5 opacity-60"></div>
    </div>
  );
};

