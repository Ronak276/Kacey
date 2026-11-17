import React, { useState } from 'react';
import {
  ChevronLeft,
  Bell,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  FileText,
  Clock,
  Sparkles,
  Trash2,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { motion, type Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
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

interface NotificationItem {
  id: string;
  type: 'critical' | 'normal' | 'reminder' | 'system';
  title: string;
  description: string;
  timestamp: string;
  unread: boolean;
  animal?: string;
}

export const ExactNotificationScreen: React.FC = () => {
  const { setActiveTab } = useApp();

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      type: 'critical',
      title: 'Abnormal Urinalysis Alert',
      description: 'Luna (Siamese Cat) tested positive on Toxicology Screen (Veti-Screen 6). Review required.',
      timestamp: '15 mins ago',
      unread: true,
      animal: 'Luna',
    },
    {
      id: 'notif-2',
      type: 'normal',
      title: 'Lab Report Verified',
      description: 'Dr. Sarah Mitchell signed off Buddy\'s Veti-Stx 9 Urinalysis results as Normal.',
      timestamp: '2 hours ago',
      unread: true,
      animal: 'Buddy',
    },
    {
      id: 'notif-3',
      type: 'reminder',
      title: 'Optical Sensor Calibration Due',
      description: 'Monthly optical colorimeter self-check completed. 100% certified under ISO 13485.',
      timestamp: '1 day ago',
      unread: false,
    },
    {
      id: 'notif-4',
      type: 'system',
      title: 'Shift #4 Started',
      description: 'Active shift started at Metropolitan Veterinary Hospital. 3 pending test strips in queue.',
      timestamp: '2 days ago',
      unread: false,
    },
  ]);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative w-full h-full flex flex-col bg-slate-50/50 overflow-y-auto no-scrollbar pb-24 select-none font-sans"
    >
      {/* ======================================================== */}
      {/* 1. TOP HEADER: < Notifications [Mark as Read] */}
      {/* ======================================================== */}
      <motion.div
        variants={itemVariants}
        className="flex items-center justify-between px-5 pt-3 pb-3 bg-white border-b border-slate-100 sticky top-0 z-20 shadow-2xs"
      >
        <button
          onClick={() => setActiveTab('home')}
          className="text-slate-800 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 cursor-pointer transition-colors"
          title="Back to Dashboard"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
        </button>

        <h1 className="text-[17px] font-black text-slate-900 tracking-tight">Notifications</h1>

        {notifications.some((n) => n.unread) ? (
          <button
            onClick={markAllAsRead}
            className="text-[11px] font-bold text-[#0070d2] hover:text-[#005fb2] cursor-pointer"
          >
            Mark read
          </button>
        ) : (
          <div className="w-6"></div>
        )}
      </motion.div>

      {/* Notifications Body */}
      <div className="px-5 pt-3 space-y-3">
        {notifications.length === 0 ? (
          <div className="py-20 flex flex-col items-center justify-center text-center">
            <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
              <Bell className="w-6 h-6 stroke-[1.8]" />
            </div>
            <h3 className="text-sm font-black text-slate-700">No Notifications</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-[200px]">
              You're all caught up with your clinical shift alerts.
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between px-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                Recent Clinical Activity
              </span>
              <button
                onClick={clearAll}
                className="text-[11px] text-slate-400 hover:text-rose-500 font-semibold cursor-pointer transition-colors"
              >
                Clear all
              </button>
            </div>

            <div className="space-y-2.5">
              {notifications.map((item) => {
                return (
                  <motion.div
                    key={item.id}
                    variants={itemVariants}
                    whileHover={{ y: -1 }}
                    className={`p-3.5 rounded-[22px] border transition-all relative ${
                      item.unread
                        ? 'bg-white border-sky-200/80 shadow-[0_4px_16px_rgba(0,112,210,0.06)]'
                        : 'bg-white/80 border-slate-200/60 shadow-2xs'
                    }`}
                  >
                    {/* Unread blue dot */}
                    {item.unread && (
                      <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-[#0070d2]"></span>
                    )}

                    <div className="flex items-start gap-3">
                      {/* Icon per type */}
                      <div
                        className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 mt-0.5 ${
                          item.type === 'critical'
                            ? 'bg-rose-50 text-rose-600'
                            : item.type === 'normal'
                            ? 'bg-emerald-50 text-emerald-600'
                            : item.type === 'reminder'
                            ? 'bg-sky-50 text-[#0070d2]'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {item.type === 'critical' && <ShieldAlert className="w-4 h-4 stroke-[2.2]" />}
                        {item.type === 'normal' && <CheckCircle2 className="w-4 h-4 stroke-[2.2]" />}
                        {item.type === 'reminder' && <Calendar className="w-4 h-4 stroke-[2.2]" />}
                        {item.type === 'system' && <Clock className="w-4 h-4 stroke-[2.2]" />}
                      </div>

                      <div className="flex-1 pr-4">
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-black text-slate-900 leading-tight">
                            {item.title}
                          </h4>
                          {item.animal && (
                            <span className="text-[10px] font-bold text-[#0070d2] bg-sky-50 px-1.5 py-0.2 rounded-full">
                              {item.animal}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 font-medium mt-1 leading-snug">
                          {item.description}
                        </p>
                        <span className="text-[10px] text-slate-400 font-semibold mt-1.5 block">
                          {item.timestamp}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};
