import React from 'react';

export const KaceyLogo: React.FC<{ size?: 'sm' | 'md' | 'lg'; light?: boolean }> = ({
  size = 'md',
  light = false,
}) => {
  const iconSize = size === 'sm' ? 'w-6 h-6' : size === 'lg' ? 'w-12 h-12' : 'w-8 h-8';
  const textTitle = size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-2xl' : 'text-lg';
  const textSub = size === 'sm' ? 'text-[8px]' : size === 'lg' ? 'text-xs' : 'text-[10px]';

  return (
    <div className="flex items-center gap-2.5">
      {/* Kacey Diagnostic Veterinary Paw Mark */}
      <div className={`relative flex items-center justify-center ${iconSize}`}>
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full fill-current text-sky-600 drop-shadow-sm"
        >
          {/* Main paw pad */}
          <path d="M50,42 C38,42 28,52 28,66 C28,78 38,88 50,88 C62,88 72,78 72,66 C72,52 62,42 50,42 Z" />
          {/* 4 Toe pads */}
          <circle cx="27" cy="34" r="10" />
          <circle cx="43" cy="22" r="10" />
          <circle cx="57" cy="22" r="10" />
          <circle cx="73" cy="34" r="10" />
        </svg>
      </div>

      <div className="flex flex-col leading-none">
        <span
          className={`font-black tracking-tight uppercase ${
            light ? 'text-white' : 'text-sky-700'
          } ${textTitle}`}
        >
          Kacey
        </span>
        <span
          className={`font-bold tracking-widest uppercase ${
            light ? 'text-sky-200' : 'text-sky-500'
          } ${textSub}`}
        >
          Diagnostics
        </span>
      </div>
    </div>
  );
};

