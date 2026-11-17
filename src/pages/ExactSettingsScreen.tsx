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
  Building,
  CheckCircle2,
  X,
  Phone,
  Mail,
  Check,
  Volume2,
  AlertTriangle,
  Award,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.02,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      damping: 24,
      stiffness: 240,
    },
  },
};

export const ExactSettingsScreen: React.FC = () => {
  const { setIsLoggedIn, setActiveTab, vetProfile, updateVetProfile, setIsBottomNavHidden } = useApp();

  // Active Modals
  const [activeModal, setActiveModal] = useState<
    'alerts' | 'language' | 'support' | 'about' | 'facility' | null
  >(null);

  const openDrawer = (modal: 'alerts' | 'language' | 'support' | 'about' | 'facility') => {
    setActiveModal(modal);
    setIsBottomNavHidden(true);
  };

  const closeDrawer = () => {
    setActiveModal(null);
    setIsBottomNavHidden(false);
  };

  // Diagnostic Alerts Sub-options
  const [alertSettings, setAlertSettings] = useState({
    masterPush: true,
    abnormalTriggers: true,
    emailDailySummary: true,
    soundVibration: true,
  });

  // Languages list
  const languages = [
    { code: 'en-US', name: 'English (United States)', region: 'North America' },
    { code: 'es-ES', name: 'Español (América Latina)', region: 'Latin America' },
    { code: 'fr-FR', name: 'Français (France)', region: 'Europe' },
    { code: 'de-DE', name: 'Deutsch (Deutschland)', region: 'Europe' },
    { code: 'ja-JP', name: '日本語 (Japanese)', region: 'Asia Pacific' },
  ];
  const [selectedLanguage, setSelectedLanguage] = useState(vetProfile.language || 'English (United States)');

  // Support inquiry form
  const [supportMessage, setSupportMessage] = useState('');
  const [supportSent, setSupportSent] = useState(false);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative w-full h-full flex flex-col justify-between bg-white overflow-hidden select-none font-sans px-5 pt-1.5 pb-28"
    >
      {/* ======================================================== */}
      {/* 1. TOP HEADER: [Settings Cog]  Profile & Settings  [LogOut] */}
      {/* ======================================================== */}
      <motion.div
        variants={itemVariants}
        className="flex items-center justify-between pb-1.5 border-b border-slate-100"
      >
        <div className="w-7 h-7 rounded-full bg-sky-50 text-[#0070d2] flex items-center justify-center">
          <SettingsIcon className="w-3.5 h-3.5 stroke-[2.2]" />
        </div>

        <h1 className="text-[16px] font-black text-slate-900 tracking-tight">
          Profile & Settings
        </h1>

        <div className="w-7 h-7"></div>
      </motion.div>

      {/* ======================================================== */}
      {/* 2. DOCTOR AVATAR & CLINIC DETAILS (Compact 0-Scroll Layout) */}
      {/* ======================================================== */}
      <motion.div variants={itemVariants} className="flex flex-col items-center text-center my-0.5">
        <div className="relative">
          <div className="w-[72px] h-[72px] rounded-full p-[2.5px] bg-gradient-to-tr from-sky-400 via-sky-200 to-sky-100 shadow-sm">
            <img
              src={vetProfile.avatarUrl || '/assets/doctor_avatar.png'}
              alt="Dr. Sarah Mitchell"
              className="w-full h-full rounded-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/assets/doctor_avatar.png';
              }}
            />
          </div>
          <div className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center border-2 border-white shadow-xs">
            <CheckCircle2 className="w-3 h-3 stroke-[3]" />
          </div>
        </div>

        <h2 className="text-[17px] font-black text-slate-900 tracking-tight leading-none mt-1.5">
          {vetProfile.name}
        </h2>
        <p className="text-[11px] font-bold text-[#0070d2] mt-0.5">
          {vetProfile.email}
        </p>
        <p className="text-[10px] font-medium text-slate-400 mt-0.5">
          {vetProfile.clinicName} • License #{vetProfile.licenseNumber}
        </p>
      </motion.div>

      {/* ======================================================== */}
      {/* 3. CLINICAL FACILITY CARD */}
      {/* ======================================================== */}
      <motion.div
        variants={itemVariants}
        onClick={() => openDrawer('facility')}
        className="bg-white p-2.5 rounded-2xl border border-slate-200/70 shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-2 cursor-pointer hover:border-sky-300 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-sky-50 text-[#0070d2] flex items-center justify-center shrink-0">
            <Building className="w-4 h-4 stroke-[2.2]" />
          </div>
          <div className="overflow-hidden flex-1">
            <span className="text-[10px] font-medium text-slate-400 block leading-tight">Clinical Facility</span>
            <p className="text-[12px] font-black text-slate-900 truncate mt-0.5 leading-tight">
              {vetProfile.clinicName}
            </p>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        </div>

        <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
          <span className="font-semibold text-slate-500 text-[10px]">Optical Sensor Calibration</span>
          <span className="font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full text-[10px]">
            100% Certified
          </span>
        </div>
      </motion.div>

      {/* ======================================================== */}
      {/* 4. PREFERENCES GROUP (All clickable and fully interactive) */}
      {/* ======================================================== */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-2xl border border-slate-200/70 shadow-[0_2px_10px_rgba(0,0,0,0.02)] divide-y divide-slate-100 overflow-hidden"
      >
        {/* Diagnostic Alerts */}
        <div
          onClick={() => openDrawer('alerts')}
          className="p-2.5 flex items-center justify-between cursor-pointer hover:bg-slate-50/70 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-sky-50 text-[#0070d2] flex items-center justify-center">
              <Bell className="w-3.5 h-3.5 stroke-[2.2]" />
            </div>
            <div>
              <h4 className="text-[12px] font-black text-slate-900 leading-none">Diagnostic Alerts</h4>
              <span className="text-[10px] text-slate-400 mt-0.5 block leading-tight">
                {alertSettings.masterPush ? 'Immediate notifications enabled' : 'Alerts paused'}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div
              onClick={(e) => {
                e.stopPropagation();
                setAlertSettings({ ...alertSettings, masterPush: !alertSettings.masterPush });
              }}
              className={`w-9 h-5 rounded-full transition-colors relative cursor-pointer ${
                alertSettings.masterPush ? 'bg-[#0070d2]' : 'bg-slate-200'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white shadow-md absolute top-0.5 transition-transform ${
                  alertSettings.masterPush ? 'left-[18px]' : 'left-0.5'
                }`}
              />
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </div>
        </div>

        {/* Language */}
        <div
          onClick={() => openDrawer('language')}
          className="p-2.5 flex items-center justify-between cursor-pointer hover:bg-slate-50/70 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-sky-50 text-[#0070d2] flex items-center justify-center">
              <Globe className="w-3.5 h-3.5 stroke-[2.2]" />
            </div>
            <div>
              <h4 className="text-[12px] font-black text-slate-900 leading-none">App Language</h4>
              <span className="text-[10px] text-[#0070d2] font-semibold mt-0.5 block leading-tight">
                {selectedLanguage}
              </span>
            </div>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        </div>

        {/* Support */}
        <div
          onClick={() => openDrawer('support')}
          className="p-2.5 flex items-center justify-between cursor-pointer hover:bg-slate-50/70 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-sky-50 text-[#0070d2] flex items-center justify-center">
              <LifeBuoy className="w-3.5 h-3.5 stroke-[2.2]" />
            </div>
            <div>
              <h4 className="text-[12px] font-black text-slate-900 leading-none">Veterinary Support</h4>
              <span className="text-[10px] text-slate-400 mt-0.5 block leading-tight">Kacey Diagnostics 24/7 Helpline</span>
            </div>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        </div>

        {/* About Kacey */}
        <div
          onClick={() => openDrawer('about')}
          className="p-2.5 flex items-center justify-between cursor-pointer hover:bg-slate-50/70 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-sky-50 text-[#0070d2] flex items-center justify-center">
              <Info className="w-3.5 h-3.5 stroke-[2.2]" />
            </div>
            <div>
              <h4 className="text-[12px] font-black text-slate-900 leading-none">About Kacey Diagnostics</h4>
              <span className="text-[10px] text-slate-400 mt-0.5 block leading-tight">Version 2.4.1 (Since 1979)</span>
            </div>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        </div>
      </motion.div>

      {/* ======================================================== */}
      {/* 5. SIGN OUT BUTTON (Clean text only, no icon) */}
      {/* ======================================================== */}
      <motion.div variants={itemVariants} className="pt-0 pb-1">
        <button
          onClick={() => {
            setIsLoggedIn(false);
            setActiveTab('home');
          }}
          className="w-full py-2.5 px-4 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-600 font-black text-[12px] transition-colors cursor-pointer flex items-center justify-center border border-rose-200/80 active:scale-98 shadow-xs"
        >
          <span>Sign Out from Account</span>
        </button>
      </motion.div>

      {/* ======================================================== */}
      {/* FULL-PAGE BOTTOM-TO-TOP DRAWER MODALS */}
      {/* ======================================================== */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 overflow-hidden flex flex-col justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => closeDrawer()}
              className="absolute inset-0 bg-black/50 backdrop-blur-xs"
            />

            {/* Bottom-to-Top Drawer */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="relative w-full max-h-[82vh] bg-white rounded-t-[36px] shadow-2xl p-5 overflow-y-auto no-scrollbar z-10 space-y-4"
            >
              {/* Drawer Handle */}
              <div className="w-12 h-1 bg-slate-300 rounded-full mx-auto -mt-1 mb-2"></div>

              {/* MODAL 1: ALERTS */}
              {activeModal === 'alerts' && (
                <>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-sky-100 text-[#0070d2] flex items-center justify-center">
                        <Bell className="w-4 h-4 stroke-[2.2]" />
                      </div>
                      <h3 className="text-base font-black text-slate-900">Diagnostic Alert Preferences</h3>
                    </div>
                    <button
                      onClick={() => closeDrawer()}
                      className="p-1 rounded-full text-slate-400 hover:text-slate-700 cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                      <div className="flex items-start gap-2.5">
                        <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                        <div>
                          <h4 className="text-xs font-bold text-slate-800">Critical / Abnormal Flags</h4>
                          <p className="text-[10px] text-slate-400">Immediate sound chime for high toxic readings</p>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={alertSettings.abnormalTriggers}
                        onChange={(e) =>
                          setAlertSettings({ ...alertSettings, abnormalTriggers: e.target.checked })
                        }
                        className="w-5 h-5 accent-[#0070d2] cursor-pointer"
                      />
                    </div>

                    <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                      <div className="flex items-start gap-2.5">
                        <Mail className="w-4 h-4 text-[#0070d2] mt-0.5 shrink-0" />
                        <div>
                          <h4 className="text-xs font-bold text-slate-800">Email Shift Summaries</h4>
                          <p className="text-[10px] text-slate-400">PDF recap sent to {vetProfile.email}</p>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={alertSettings.emailDailySummary}
                        onChange={(e) =>
                          setAlertSettings({ ...alertSettings, emailDailySummary: e.target.checked })
                        }
                        className="w-5 h-5 accent-[#0070d2] cursor-pointer"
                      />
                    </div>

                    <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                      <div className="flex items-start gap-2.5">
                        <Volume2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                        <div>
                          <h4 className="text-xs font-bold text-slate-800">Haptic Vibration on Scan</h4>
                          <p className="text-[10px] text-slate-400">Physical buzz when test strip aligns</p>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={alertSettings.soundVibration}
                        onChange={(e) =>
                          setAlertSettings({ ...alertSettings, soundVibration: e.target.checked })
                        }
                        className="w-5 h-5 accent-[#0070d2] cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => closeDrawer()}
                      className="w-full py-3.5 rounded-full bg-[#0070d2] hover:bg-[#005fb2] text-white text-xs font-black shadow-lg shadow-sky-600/30 cursor-pointer transition-colors"
                    >
                      Save Preferences
                    </button>
                  </div>
                </>
              )}

              {/* MODAL 2: LANGUAGE */}
              {activeModal === 'language' && (
                <>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-sky-100 text-[#0070d2] flex items-center justify-center">
                        <Globe className="w-4 h-4 stroke-[2.2]" />
                      </div>
                      <h3 className="text-base font-black text-slate-900">Select App Language</h3>
                    </div>
                    <button
                      onClick={() => closeDrawer()}
                      className="p-1 rounded-full text-slate-400 hover:text-slate-700 cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-2">
                    {languages.map((lang) => {
                      const isSelected = selectedLanguage === lang.name;
                      return (
                        <div
                          key={lang.code}
                          onClick={() => {
                            setSelectedLanguage(lang.name);
                            updateVetProfile({ language: lang.name });
                            setTimeout(() => closeDrawer(), 250);
                          }}
                          className={`p-3.5 rounded-2xl flex items-center justify-between cursor-pointer transition-all border ${
                            isSelected
                              ? 'bg-sky-50 border-[#0070d2] text-[#0070d2]'
                              : 'bg-white border-slate-100 hover:bg-slate-50 text-slate-800'
                          }`}
                        >
                          <div>
                            <h4 className="text-xs font-black">{lang.name}</h4>
                            <span className="text-[10px] text-slate-400">{lang.region}</span>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-[#0070d2] stroke-[3]" />}
                        </div>
                      );
                    })}
                  </div>
                </>
              )}

              {/* MODAL 3: SUPPORT */}
              {activeModal === 'support' && (
                <>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-sky-100 text-[#0070d2] flex items-center justify-center">
                        <LifeBuoy className="w-4 h-4 stroke-[2.2]" />
                      </div>
                      <h3 className="text-base font-black text-slate-900">Veterinary Support 24/7</h3>
                    </div>
                    <button
                      onClick={() => closeDrawer()}
                      className="p-1 rounded-full text-slate-400 hover:text-slate-700 cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <a
                      href="tel:18005557879"
                      className="p-3 rounded-2xl bg-sky-50 border border-sky-100 flex flex-col items-center justify-center text-center text-[#0070d2] hover:bg-sky-100 transition-colors"
                    >
                      <Phone className="w-4 h-4 mb-1" />
                      <span className="text-xs font-black">1-800-KACEY-79</span>
                      <span className="text-[9px] text-slate-400">Toll-Free Urgent</span>
                    </a>

                    <a
                      href="mailto:support@kaceydiagnostics.com"
                      className="p-3 rounded-2xl bg-sky-50 border border-sky-100 flex flex-col items-center justify-center text-center text-[#0070d2] hover:bg-sky-100 transition-colors"
                    >
                      <Mail className="w-4 h-4 mb-1" />
                      <span className="text-xs font-black">Email Tech Lab</span>
                      <span className="text-[9px] text-slate-400">support@kacey.com</span>
                    </a>
                  </div>

                  <div className="space-y-2 pt-1">
                    <label className="text-[11px] font-bold text-slate-600 block">
                      Quick Ticket / Calibration Help
                    </label>
                    {supportSent ? (
                      <div className="p-3.5 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-2xl text-xs text-center font-bold">
                        Ticket #KC-8841 dispatched. A laboratory specialist is reviewing your diagnostic log.
                      </div>
                    ) : (
                      <>
                        <textarea
                          rows={3}
                          placeholder="Describe issue (e.g., test strip lot # calibration)..."
                          value={supportMessage}
                          onChange={(e) => setSupportMessage(e.target.value)}
                          className="w-full p-3 text-xs rounded-2xl border border-slate-200 focus:outline-none focus:border-[#0070d2]"
                        />
                        <button
                          onClick={() => {
                            if (supportMessage.trim()) setSupportSent(true);
                          }}
                          className="w-full py-3.5 rounded-full bg-[#0070d2] hover:bg-[#005fb2] text-white text-xs font-black cursor-pointer shadow-md transition-colors"
                        >
                          Submit Technical Request
                        </button>
                      </>
                    )}
                  </div>
                </>
              )}

              {/* MODAL 4: ABOUT */}
              {activeModal === 'about' && (
                <>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-sky-100 text-[#0070d2] flex items-center justify-center">
                        <Shield className="w-4 h-4 stroke-[2.2]" />
                      </div>
                      <h3 className="text-base font-black text-slate-900">About Kacey Diagnostics</h3>
                    </div>
                    <button
                      onClick={() => closeDrawer()}
                      className="p-1 rounded-full text-slate-400 hover:text-slate-700 cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="text-center space-y-2">
                    <span className="text-[11px] font-bold text-[#0070d2] bg-sky-50 px-3 py-1 rounded-full inline-block">
                      Trusted by Veterinarians Since 1979
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium text-left bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                      Kacey Diagnostics has been leading point-of-care rapid diagnostics for over 45 years. Our patented optical colorimetry algorithms calibrate reagent strip pads (Veti-Stx 9, EG-3 Antifreeze, and Veti-Screen 6) to clinical precision standard ISO 13485.
                    </p>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => closeDrawer()}
                      className="w-full py-3.5 rounded-full bg-[#0070d2] hover:bg-[#005fb2] text-white text-xs font-black shadow-md cursor-pointer transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </>
              )}

              {/* MODAL 5: FACILITY */}
              {activeModal === 'facility' && (
                <>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-sky-100 text-[#0070d2] flex items-center justify-center">
                        <Building className="w-4 h-4 stroke-[2.2]" />
                      </div>
                      <h3 className="text-base font-black text-slate-900">Clinical Facility Info</h3>
                    </div>
                    <button
                      onClick={() => closeDrawer()}
                      className="p-1 rounded-full text-slate-400 hover:text-slate-700 cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-2.5 text-xs text-left">
                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                      <span className="text-[10px] text-slate-400 font-bold block">Hospital Name</span>
                      <p className="font-black text-slate-800 text-[13px]">{vetProfile.clinicName}</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                      <span className="text-[10px] text-slate-400 font-bold block">Hospital Address</span>
                      <p className="font-semibold text-slate-700">{vetProfile.clinicAddress}</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                      <span className="text-[10px] text-slate-400 font-bold block">Clinic Telephone</span>
                      <p className="font-semibold text-slate-700">{vetProfile.phone}</p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => closeDrawer()}
                      className="w-full py-3.5 rounded-full bg-[#0070d2] hover:bg-[#005fb2] text-white text-xs font-black shadow-md cursor-pointer transition-colors"
                    >
                      Done
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
