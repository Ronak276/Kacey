import React, { useState } from 'react';
import { Smartphone, Tablet, Monitor, RotateCcw } from 'lucide-react';

interface MobileFrameProps {
  children: React.ReactNode;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({ children }) => {
  const [deviceMode, setDeviceMode] = useState<'phone' | 'tablet' | 'full'>('phone');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-sky-950 flex flex-col items-center justify-center p-0 md:p-6 lg:p-8 select-none">
      {/* Device Switcher Toolbar for desktop testing & review */}
      <aside aria-label="Device toolbar" className="hidden md:flex items-center justify-between gap-4 w-full max-w-md mb-4 px-4 py-2 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 text-white text-xs shadow-xl">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-semibold tracking-wide">Kacey Diagnostics Mobile App</span>
        </div>
        <div className="flex items-center gap-1 bg-black/30 p-1 rounded-xl">
          <button
            onClick={() => setDeviceMode('phone')}
            className={`p-1.5 rounded-lg transition-all ${
              deviceMode === 'phone' ? 'bg-sky-500 text-white shadow' : 'text-slate-300 hover:text-white'
            }`}
            title="iPhone/Android Mobile View"
          >
            <Smartphone className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDeviceMode('tablet')}
            className={`p-1.5 rounded-lg transition-all ${
              deviceMode === 'tablet' ? 'bg-sky-500 text-white shadow' : 'text-slate-300 hover:text-white'
            }`}
            title="iPad / Tablet View"
          >
            <Tablet className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDeviceMode('full')}
            className={`p-1.5 rounded-lg transition-all ${
              deviceMode === 'full' ? 'bg-sky-500 text-white shadow' : 'text-slate-300 hover:text-white'
            }`}
            title="Wide Desktop View"
          >
            <Monitor className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Frame Container */}
      <div
        className={`w-full transition-all duration-300 ease-out flex flex-col relative ${
          deviceMode === 'phone'
            ? 'max-w-[412px] h-[870px] rounded-[48px] shadow-[0_25px_70px_rgba(0,0,0,0.6),0_0_0_12px_#1e293b,0_0_0_14px_#334155]'
            : deviceMode === 'tablet'
            ? 'max-w-[620px] h-[900px] rounded-[36px] shadow-[0_25px_70px_rgba(0,0,0,0.6),0_0_0_12px_#1e293b]'
            : 'max-w-4xl h-[92vh] rounded-3xl shadow-2xl'
        } bg-white overflow-hidden border border-slate-700/30`}
      >
        {/* Dynamic Island / Mobile Notch on Phone & Tablet */}
        {deviceMode !== 'full' && (
          <div className="relative w-full bg-transparent pt-2.5 px-6 flex items-center justify-between text-slate-800 text-[13px] font-semibold z-40 select-none">
            {/* Status Bar Left: Time */}
            <span className="font-semibold text-slate-900">9:41</span>
            
            {/* Notch / Speaker pill */}
            <div className="absolute left-1/2 -translate-x-1/2 top-2.5 w-24 h-4 bg-slate-900 rounded-full flex items-center justify-end px-2">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-950/80 border border-slate-800"></div>
            </div>

            {/* Status Bar Right: Icons */}
            <div className="flex items-center gap-1.5 text-slate-900 text-xs font-bold">
              <span className="text-[10px]">5G</span>
              <div className="w-5 h-2.5 border border-slate-900 rounded-sm p-[1px] flex items-center">
                <div className="w-full h-full bg-slate-900 rounded-[1px]"></div>
              </div>
            </div>
          </div>
        )}

        {/* Inner App Screen View */}
        <div className="flex-1 w-full h-full overflow-y-auto overflow-x-hidden flex flex-col relative bg-slate-50">
          {children}
        </div>
      </div>
    </div>
  );
};

