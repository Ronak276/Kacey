import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const WelcomeAuthScreen: React.FC = () => {
  const { setIsLoggedIn, setActiveTab } = useApp();

  const handleDirectAccess = () => {
    setIsLoggedIn(true);
    setActiveTab('home');
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden select-none bg-[#f3f9fe] font-sans">
      {/* Background illustration */}
      <img
        src="/assets/user_perfect_bg.jpg"
        alt="Kacey Diagnostics Hero Pets and Branding"
        className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none z-0"
      />

      {/* Spacer to place buttons right below the wave curve */}
      <div className="relative z-10 w-full flex-1"></div>

      {/* Action Buttons Zone */}
      <div className="relative z-20 pb-6 px-7 flex flex-col items-center gap-2.5">
        {/* Solid Blue Button: Sign In -> (Directly goes to Home Dashboard) */}
        <button
          onClick={handleDirectAccess}
          className="w-full py-3.5 px-6 rounded-full bg-[#0070d2] hover:bg-[#005fb2] active:scale-[0.98] text-white font-bold text-sm shadow-md shadow-sky-600/30 flex items-center justify-center gap-2 group transition-all cursor-pointer"
        >
          <span>Sign In</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Outlined Button: Create Account (Directly goes to Home Dashboard) */}
        <button
          onClick={handleDirectAccess}
          className="w-full py-3.5 px-6 rounded-full bg-white hover:bg-sky-50 active:scale-[0.98] text-[#0070d2] font-bold text-sm border-2 border-[#57a9ea] shadow-sm transition-all cursor-pointer"
        >
          Create Account
        </button>

        {/* Trusted By Veterinarians Since 1979 */}
        <p className="text-[11px] font-medium text-slate-500 mt-0.5">
          Trusted by Veterinarians Since 1979
        </p>
      </div>
    </div>
  );
};
