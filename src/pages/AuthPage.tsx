import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Stethoscope, Lock, Mail, User, Building2 } from 'lucide-react';
import { KaceyLogo } from '../components/ui/KaceyLogo';
import { useApp } from '../context/AppContext';
import { useToast } from '../context/ToastContext';

export const AuthPage: React.FC = () => {
  const { setIsLoggedIn, setActiveTab } = useApp();
  const { toast } = useToast();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showForgot, setShowForgot] = useState(false);

  // Form states
  const [email, setEmail] = useState('dr.sarah@kaceydiagnostics.com');
  const [password, setPassword] = useState('••••••••••');
  const [name, setName] = useState('Dr. Sarah Mitchell');
  const [clinic, setClinic] = useState('Kacey Veterinary Care Hospital');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setActiveTab('home');
    toast({
      title: 'Welcome Dr. Sarah Mitchell',
      description: 'Connected to Kacey Diagnostics Cloud Portal',
      variant: 'success',
    });
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowForgot(false);
    toast({
      title: 'Password Reset Link Dispatched',
      description: 'Check your veterinary email for security instructions.',
      variant: 'info',
    });
  };

  return (
    <div className="relative flex-1 flex flex-col justify-between bg-gradient-to-b from-sky-50 via-white to-sky-100/60 p-6 overflow-y-auto">
      {/* Curved background watermarks matching reference image */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-sky-200/40 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
      <div className="absolute bottom-10 left-0 w-64 h-64 bg-cyan-100/60 rounded-full blur-2xl -ml-20 pointer-events-none"></div>

      {/* Top Header & Branding */}
      <div className="relative z-10 flex flex-col items-center text-center mt-3">
        <KaceyLogo size="lg" />
        <h2 className="text-sm font-semibold text-sky-800 tracking-wide mt-2">
          Innovative Diagnostics for Animal Health
        </h2>
      </div>

      {/* Center Hero Visual: Golden Retriever & Cat HD (Exact layout as Screen 1) */}
      <div className="relative z-10 my-auto flex flex-col items-center">
        <div className="relative w-64 h-56 flex items-center justify-center">
          {/* Subtle paw print background decorative decals */}
          <div className="absolute -top-3 -right-3 text-sky-200/60">
            <svg className="w-14 h-14 fill-current" viewBox="0 0 100 100">
              <path d="M50,42 C38,42 28,52 28,66 C28,78 38,88 50,88 C62,88 72,78 72,66 C72,52 62,42 50,42 Z" />
              <circle cx="27" cy="34" r="9" />
              <circle cx="43" cy="22" r="9" />
              <circle cx="57" cy="22" r="9" />
              <circle cx="73" cy="34" r="9" />
            </svg>
          </div>

          {/* HD Cutout Pets Illustration Card */}
          <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-xl shadow-sky-500/10 border-4 border-white bg-gradient-to-t from-sky-100 via-sky-50 to-white">
            <img
              src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=700&q=80"
              alt="Golden retriever and companion animal"
              className="w-full h-full object-cover object-center"
            />
            {/* Wave overlay at bottom */}
            <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-sky-500/30 to-transparent"></div>
          </div>
        </div>

        {/* Form or Quick Sign In */}
        {showForgot ? (
          <form onSubmit={handleForgotSubmit} className="w-full max-w-xs mt-6 space-y-3">
            <p className="text-xs text-slate-600 text-center font-medium">
              Enter your licensed clinic email to receive a recovery link.
            </p>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="veterinarian@clinic.com"
                className="w-full pl-9 pr-3 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-xl text-xs shadow-md transition-all"
            >
              Send Reset Code
            </button>
            <button
              type="button"
              onClick={() => setShowForgot(false)}
              className="w-full text-center text-xs text-sky-700 hover:underline"
            >
              Cancel
            </button>
          </form>
        ) : isSignUp ? (
          <form onSubmit={handleLogin} className="w-full max-w-xs mt-4 space-y-2.5">
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Veterinarian Name"
                className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm"
              />
            </div>
            <div className="relative">
              <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                required
                value={clinic}
                onChange={(e) => setClinic(e.target.value)}
                placeholder="Clinic / Hospital Name"
                className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm"
              />
            </div>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm"
              />
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-xl text-xs shadow-md transition-all"
            >
              Register Clinic Account
            </button>
            <p className="text-center text-[11px] text-slate-500">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setIsSignUp(false)}
                className="text-sky-600 font-semibold hover:underline"
              >
                Sign In
              </button>
            </p>
          </form>
        ) : (
          /* Exact Reference Button Section */
          <div className="w-full max-w-xs mt-6 space-y-3">
            <button
              onClick={() => {
                setIsLoggedIn(true);
                setActiveTab('home');
              }}
              className="w-full py-3.5 px-6 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm shadow-lg shadow-sky-600/30 flex items-center justify-center gap-2 group transition-all"
            >
              <span>Sign In</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => setIsSignUp(true)}
              className="w-full py-3.5 px-6 rounded-2xl bg-white hover:bg-sky-50 text-sky-700 font-bold text-sm border-2 border-sky-400/80 shadow-sm transition-all"
            >
              Create Account
            </button>

            <div className="flex items-center justify-center">
              <button
                onClick={() => setShowForgot(true)}
                className="text-[11px] text-slate-500 hover:text-sky-700 transition-colors font-medium"
              >
                Forgot Password?
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer Branding Note */}
      <div className="relative z-10 text-center py-2">
        <div className="flex items-center justify-center gap-1.5 text-slate-400 text-xs font-medium">
          <ShieldCheck className="w-4 h-4 text-sky-600" />
          <span>Trusted by Veterinarians Since 1979</span>
        </div>
      </div>
    </div>
  );
};

