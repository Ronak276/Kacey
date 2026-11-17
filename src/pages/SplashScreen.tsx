import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    setPulse(true);
    const timer = setTimeout(() => {
      onFinish();
    }, 2400);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between bg-gradient-to-b from-sky-400 via-sky-500 to-sky-700 text-white p-8 select-none overflow-hidden">
      {/* Background Soft Glow & Paw Watermarks */}
      <div className="absolute top-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-sky-300/20 rounded-full blur-3xl pointer-events-none"></div>

      {/* Decorative top Paw */}
      <div className="absolute top-12 left-8 text-white/10 pointer-events-none">
        <svg className="w-20 h-20 fill-current" viewBox="0 0 100 100">
          <path d="M50,42 C38,42 28,52 28,66 C28,78 38,88 50,88 C62,88 72,78 72,66 C72,52 62,42 50,42 Z" />
          <circle cx="27" cy="34" r="9" />
          <circle cx="43" cy="22" r="9" />
          <circle cx="57" cy="22" r="9" />
          <circle cx="73" cy="34" r="9" />
        </svg>
      </div>

      <div className="h-10"></div>

      {/* Center Branding Animation */}
      <div className={`flex flex-col items-center text-center transition-all duration-1000 transform ${
        pulse ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
      }`}>
        {/* Animated Paw Icon in circle */}
        <div className="relative w-28 h-28 rounded-full bg-white/20 backdrop-blur-md p-4 flex items-center justify-center shadow-2xl ring-4 ring-white/30 mb-6">
          <svg className="w-20 h-20 fill-white drop-shadow-md animate-soft-pulse" viewBox="0 0 100 100">
            <path d="M50,42 C38,42 28,52 28,66 C28,78 38,88 50,88 C62,88 72,78 72,66 C72,52 62,42 50,42 Z" />
            <circle cx="27" cy="34" r="9.5" />
            <circle cx="43" cy="21" r="9.5" />
            <circle cx="57" cy="21" r="9.5" />
            <circle cx="73" cy="34" r="9.5" />
          </svg>
        </div>

        {/* KACEY DIAGNOSTICS Title */}
        <h1 className="text-3xl font-black tracking-tight uppercase drop-shadow-sm">
          KACEY
        </h1>
        <p className="text-xs font-bold tracking-[0.25em] text-sky-100 uppercase mt-1">
          DIAGNOSTICS
        </p>

        <p className="text-xs font-medium text-sky-100/90 mt-3 max-w-[220px]">
          Innovative Diagnostics for Animal Health
        </p>
      </div>

      {/* Bottom Loading Progress / Version */}
      <div className="flex flex-col items-center gap-2 pb-6">
        <div className="w-28 h-1 bg-white/20 rounded-full overflow-hidden">
          <div className="w-full h-full bg-white rounded-full animate-[pulse_1.5s_ease-in-out_infinite]"></div>
        </div>
        <p className="text-[10px] text-sky-200/80 font-medium">
          Trusted by Veterinarians Since 1979
        </p>
      </div>
    </div>
  );
};

