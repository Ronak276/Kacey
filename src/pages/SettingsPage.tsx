import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  LogOut,
  Bell,
  Globe,
  Info,
  LifeBuoy,
  Shield,
  ChevronRight,
  UserCheck,
  Building,
  KeyRound,
  ExternalLink,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useToast } from '../context/ToastContext';
import { KaceyLogo } from '../components/ui/KaceyLogo';

export const SettingsPage: React.FC = () => {
  const { vetProfile, updateVetProfile, setIsLoggedIn, setActiveTab } = useApp();
  const { toast } = useToast();

  const [notifications, setNotifications] = useState(vetProfile.notificationsEnabled);
  const [showAboutModal, setShowAboutModal] = useState(false);

  const toggleNotifications = () => {
    const newState = !notifications;
    setNotifications(newState);
    updateVetProfile({ notificationsEnabled: newState });
    toast({
      title: newState ? 'Notifications Enabled' : 'Notifications Muted',
      description: newState
        ? 'You will receive immediate alerts when test strips complete.'
        : 'Alerts silenced.',
      variant: 'info',
    });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    toast({
      title: 'Logged Out',
      description: 'Clinic session safely terminated.',
      variant: 'default',
    });
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 relative pb-24 overflow-y-auto">
      {/* Top Header Navigation (Screen 8 Exact: Cog on left, Settings in center, Logout arrow right) */}
      <div className="bg-white px-5 pt-4 pb-3 flex items-center justify-between border-b border-slate-100 shadow-sm sticky top-0 z-20">
        <button className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-slate-700">
          <SettingsIcon className="w-4 h-4" />
        </button>

        <h1 className="text-sm font-bold text-slate-800">Settings</h1>

        <button
          onClick={handleLogout}
          className="w-9 h-9 rounded-xl bg-slate-50 hover:bg-rose-50 hover:text-rose-600 flex items-center justify-center text-slate-700 transition-colors"
          title="Sign Out"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>

      <div className="px-5 py-4 space-y-4">
        {/* Profile Avatar & Email (Screen 8 exact: Dr. Sarah Mitchell) */}
        <div className="flex flex-col items-center text-center py-2">
          <div className="relative">
            <img
              src={vetProfile.avatarUrl}
              alt={vetProfile.name}
              className="w-20 h-20 rounded-full object-cover ring-4 ring-sky-100 shadow-md"
            />
            <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center ring-2 ring-white">
              <UserCheck className="w-3.5 h-3.5" />
            </div>
          </div>

          <h2 className="text-sm font-bold text-slate-900 mt-2.5">{vetProfile.name}</h2>
          <p className="text-xs text-slate-400 font-medium">{vetProfile.email}</p>
          <span className="text-[10px] font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full mt-1">
            {vetProfile.clinicName}
          </span>
        </div>

        {/* Settings Navigation List (Screen 8 exact menu items) */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden divide-y divide-slate-100 text-xs">
          {/* Notifications Toggle */}
          <div className="p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
                <Bell className="w-4 h-4" />
              </div>
              <span className="font-semibold text-slate-700">Notifications</span>
            </div>

            {/* Custom iOS Toggle switch matching Screen 8 */}
            <button
              onClick={toggleNotifications}
              className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ease-in-out ${
                notifications ? 'bg-sky-600' : 'bg-slate-200'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                  notifications ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Language */}
          <div
            onClick={() =>
              toast({
                title: 'Language Preference',
                description: 'English (US) default active. Multi-language support enabled.',
                variant: 'info',
              })
            }
            className="p-3.5 flex items-center justify-between hover:bg-slate-50 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
                <Globe className="w-4 h-4" />
              </div>
              <span className="font-semibold text-slate-700">Language</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400">
              <span className="text-xs font-medium text-slate-500">English</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          {/* About Kacey Diagnostics */}
          <div
            onClick={() => setShowAboutModal(true)}
            className="p-3.5 flex items-center justify-between hover:bg-slate-50 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
                <Info className="w-4 h-4" />
              </div>
              <span className="font-semibold text-slate-700">About Kacey Diagnostics</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300" />
          </div>

          {/* Support */}
          <div
            onClick={() =>
              toast({
                title: 'Veterinary Support Portal',
                description: 'Direct line: +1 (800) 843-7849 • support@kaceydiagnostics.com',
                variant: 'info',
              })
            }
            className="p-3.5 flex items-center justify-between hover:bg-slate-50 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
                <LifeBuoy className="w-4 h-4" />
              </div>
              <span className="font-semibold text-slate-700">Support</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300" />
          </div>

          {/* Privacy Policy */}
          <div
            onClick={() =>
              toast({
                title: 'HIPAA & Animal Health Privacy',
                description: 'All patient records and strip scans are end-to-end encrypted.',
                variant: 'info',
              })
            }
            className="p-3.5 flex items-center justify-between hover:bg-slate-50 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
                <Shield className="w-4 h-4" />
              </div>
              <span className="font-semibold text-slate-700">Privacy Policy</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300" />
          </div>

          {/* Log Out */}
          <div
            onClick={handleLogout}
            className="p-3.5 flex items-center justify-between hover:bg-rose-50 text-rose-600 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                <LogOut className="w-4 h-4" />
              </div>
              <span className="font-semibold">Log Out</span>
            </div>
            <ChevronRight className="w-4 h-4 text-rose-300" />
          </div>
        </div>

        {/* Footer Branding matching Screen 8: Logo + Innovation. Care. Better Health. */}
        <div className="pt-6 pb-2 flex flex-col items-center text-center">
          <KaceyLogo size="sm" />
          <p className="text-[10px] text-slate-400 font-medium tracking-wide mt-1.5">
            Innovation. Care. Better Health.
          </p>
          <a
            href="https://kaceydiagnostics.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-[10px] text-sky-600 hover:underline mt-1 font-semibold"
          >
            <span>kaceydiagnostics.com</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </a>
        </div>
      </div>

      {/* About Kacey Diagnostics Modal */}
      {showAboutModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-3 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b pb-2">
              <KaceyLogo size="sm" />
              <button
                onClick={() => setShowAboutModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Founded in 1979 by Richard Carsillo, <strong>Kacey Diagnostics</strong> is a pioneer in veterinary in-house diagnostic point-of-care testing.
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Serving veterinary clinics globally with industry-standard <strong>Veti-Stx</strong> urinalysis dip strips, <strong>EG-3</strong> antifreeze testing, and <strong>Veti-Screen 6</strong> toxicology screening solutions.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setShowAboutModal(false)}
                className="w-full py-2.5 bg-sky-600 text-white rounded-xl text-xs font-bold shadow"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

