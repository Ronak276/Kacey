import React, { useState } from 'react';
import { ChevronLeft, Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface LoginScreenProps {
  onBack: () => void;
  isCreateAccount?: boolean;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onBack, isCreateAccount = false }) => {
  const { setIsLoggedIn, setActiveTab } = useApp();
  const [email, setEmail] = useState('dr.smith@kaceydiagnostics.com');
  const [password, setPassword] = useState('password123');
  const [clinicName, setClinicName] = useState('Kacey Animal Care Hospital');
  const [vetName, setVetName] = useState('Dr. Smith');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(isCreateAccount);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsLoggedIn(true);
      setActiveTab('home');
    }, 500);
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between bg-white text-slate-800 select-none overflow-y-auto no-scrollbar screen-transition">
      {/* Top Background Waves & Curve Header */}
      <div className="relative bg-gradient-to-b from-sky-400 via-sky-300 to-sky-100/40 pt-4 pb-8 px-5 rounded-b-[36px] shadow-sm overflow-hidden shrink-0">
        {/* Soft Paw Watermark in Background */}
        <div className="absolute top-2 right-4 text-white/30 pointer-events-none">
          <svg className="w-24 h-24 fill-current" viewBox="0 0 100 100">
            <path d="M50,42 C38,42 28,52 28,66 C28,78 38,88 50,88 C62,88 72,78 72,66 C72,52 62,42 50,42 Z" />
            <circle cx="27" cy="34" r="9" />
            <circle cx="43" cy="22" r="9" />
            <circle cx="57" cy="22" r="9" />
            <circle cx="73" cy="34" r="9" />
          </svg>
        </div>

        {/* Header Back Button */}
        <div className="relative z-10 flex items-center justify-between mb-2">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm flex items-center justify-center text-slate-700 hover:bg-white transition-all cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        {/* Title */}
        <div className="relative z-10">
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6 fill-sky-700" viewBox="0 0 100 100">
              <path d="M50,42 C38,42 28,52 28,66 C28,78 38,88 50,88 C62,88 72,78 72,66 C72,52 62,42 50,42 Z" />
              <circle cx="27" cy="34" r="9" />
              <circle cx="43" cy="22" r="9" />
              <circle cx="57" cy="22" r="9" />
              <circle cx="73" cy="34" r="9" />
            </svg>
            <span className="text-xs font-black text-sky-900 tracking-wider">KACEY DIAGNOSTICS</span>
          </div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight mt-1.5">
            {isRegisterMode ? 'Create Clinic Account' : 'Welcome Back, Doctor'}
          </h1>
          <p className="text-xs text-slate-600 font-medium">
            {isRegisterMode
              ? 'Register your veterinary practice'
              : 'Sign in to access patient diagnostics & test strips'}
          </p>
        </div>
      </div>

      {/* Main Form Body */}
      <div className="flex-1 px-6 pt-5 pb-6 flex flex-col justify-between">
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {isRegisterMode && (
            <>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1.5">
                  Veterinarian Name
                </label>
                <input
                  type="text"
                  required
                  value={vetName}
                  onChange={(e) => setVetName(e.target.value)}
                  placeholder="e.g. Dr. Sarah Mitchell"
                  className="w-full px-4 py-3 text-xs bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all font-medium"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1.5">
                  Clinic / Hospital Name
                </label>
                <input
                  type="text"
                  required
                  value={clinicName}
                  onChange={(e) => setClinicName(e.target.value)}
                  placeholder="e.g. Kacey Animal Care"
                  className="w-full px-4 py-3 text-xs bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all font-medium"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1.5">
              Clinic Email
            </label>
            <div className="relative flex items-center">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="doctor@clinic.com"
                className="w-full pl-10 pr-4 py-3 text-xs bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all font-medium text-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1.5">
              Password
            </label>
            <div className="relative flex items-center">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-3 text-xs bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all font-medium text-slate-900"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {!isRegisterMode && (
            <div className="flex justify-end">
              <button
                type="button"
                className="text-[11px] font-semibold text-sky-600 hover:underline cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>
          )}

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-6 rounded-full bg-[#0070d2] hover:bg-[#005fb2] active:scale-[0.98] text-white font-bold text-xs shadow-md shadow-sky-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>{isRegisterMode ? 'Create Account' : 'Sign In'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Switch Mode & Security Footer */}
        <div className="pt-4 text-center space-y-3">
          <p className="text-xs text-slate-500">
            {isRegisterMode ? 'Already registered?' : "Don't have an account?"}{' '}
            <button
              type="button"
              onClick={() => setIsRegisterMode(!isRegisterMode)}
              className="text-[#0070d2] font-bold hover:underline cursor-pointer"
            >
              {isRegisterMode ? 'Sign In here' : 'Create an Account'}
            </button>
          </p>

          <div className="flex items-center justify-center gap-1.5 text-slate-400 text-[10px] font-medium pt-2">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
            <span>End-to-End Encrypted Veterinary Health Portal</span>
          </div>

          <div className="w-32 h-1 bg-slate-900/30 rounded-full mx-auto"></div>
        </div>
      </div>
    </div>
  );
};

