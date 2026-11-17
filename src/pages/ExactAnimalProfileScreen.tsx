import React, { useState } from 'react';
import {
  ChevronLeft,
  Edit3,
  Camera,
  ArrowRight,
  Weight,
  User,
  Plus,
  Calendar,
  FileText,
  Activity,
  Check,
  X,
  AlertCircle,
  Clock,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { Animal } from '../types';

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
  hidden: { opacity: 0, y: 20 },
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

export const ExactAnimalProfileScreen: React.FC = () => {
  const {
    animals,
    selectedAnimal,
    setSelectedAnimal,
    addAnimal,
    updateAnimal,
    setActiveTab,
    navigateToReportDetail,
    tests
  } = useApp();

  // Selected animal defaults to Buddy or current selected
  const currentAnimal: Animal = selectedAnimal || animals[0] || {
    id: 'anim-1',
    name: 'Buddy',
    species: 'Dog',
    breed: 'Golden Retriever',
    age: '3 Years',
    gender: 'Male',
    weight: '32 kg',
    ownerName: 'Dr. John Smith',
    ownerPhone: '+1 (555) 234-5678',
    photoUrl: '/assets/buddy_avatar.png',
  };

  const [activeTabSub, setActiveTabSub] = useState<'overview' | 'history' | 'reports'>('overview');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAnimalSwitcherOpen, setIsAnimalSwitcherOpen] = useState(false);

  // Edit form state
  const [editForm, setEditForm] = useState({
    name: currentAnimal.name,
    breed: currentAnimal.breed,
    age: currentAnimal.age,
    gender: currentAnimal.gender,
    weight: currentAnimal.weight,
    ownerName: currentAnimal.ownerName,
    allergies: currentAnimal.allergies || 'Penicillin, Wheat gluten',
    notes: currentAnimal.notes || 'Routine checkup required every 6 months. Active and healthy.',
  });

  // Add new animal form state
  const [newAnimalForm, setNewAnimalForm] = useState({
    name: '',
    species: 'Dog' as 'Dog' | 'Cat' | 'Horse' | 'Other',
    breed: '',
    age: '',
    gender: 'Male' as 'Male' | 'Female',
    weight: '',
    ownerName: '',
    ownerPhone: '',
    allergies: '',
    notes: '',
  });

  // Tests for current animal
  const animalTests = tests.filter(
    (t) => t.animalId === currentAnimal.id || t.animalName.toLowerCase() === currentAnimal.name.toLowerCase()
  );

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    updateAnimal(currentAnimal.id, {
      name: editForm.name,
      breed: editForm.breed,
      age: editForm.age,
      gender: editForm.gender,
      weight: editForm.weight,
      ownerName: editForm.ownerName,
      allergies: editForm.allergies,
      notes: editForm.notes,
    });
    setSelectedAnimal({
      ...currentAnimal,
      ...editForm,
    });
    setIsEditModalOpen(false);
  };

  const handleCreateAnimal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnimalForm.name || !newAnimalForm.breed) return;

    const created = addAnimal({
      name: newAnimalForm.name,
      species: newAnimalForm.species,
      breed: newAnimalForm.breed,
      age: newAnimalForm.age || '1 Year',
      gender: newAnimalForm.gender,
      weight: newAnimalForm.weight ? `${newAnimalForm.weight} kg` : '15 kg',
      ownerName: newAnimalForm.ownerName || 'Verified Pet Parent',
      ownerPhone: newAnimalForm.ownerPhone || '+1 (555) 019-2831',
      photoUrl: newAnimalForm.species === 'Cat' ? '/assets/buddy_avatar.png' : '/assets/buddy_avatar.png',
      allergies: newAnimalForm.allergies || 'None recorded',
      notes: newAnimalForm.notes || 'New patient profile registered.',
    });

    setSelectedAnimal(created);
    setIsAddModalOpen(false);
    setNewAnimalForm({
      name: '',
      species: 'Dog',
      breed: '',
      age: '',
      gender: 'Male',
      weight: '',
      ownerName: '',
      ownerPhone: '',
      allergies: '',
      notes: '',
    });
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative w-full h-full flex flex-col bg-white overflow-y-auto no-scrollbar pb-24 select-none font-sans"
    >
      {/* ======================================================== */}
      {/* 1. TOP HEADER: < Animal Profile [Edit Pen] + [+ Add] */}
      {/* ======================================================== */}
      <motion.div
        variants={itemVariants}
        className="flex items-center justify-between px-5 pt-3 pb-2 border-b border-slate-100 bg-white sticky top-0 z-20"
      >
        <button
          onClick={() => setActiveTab('home')}
          className="text-slate-800 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 cursor-pointer transition-colors"
          title="Go to Dashboard"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Animal Switcher Header */}
        <button
          onClick={() => setIsAnimalSwitcherOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 cursor-pointer transition-all active:scale-95"
        >
          <span className="text-[15px] font-black text-slate-900 tracking-tight">Animal Profile</span>
          <span className="text-[11px] font-bold text-[#0070d2] bg-sky-50 px-2 py-0.5 rounded-full">
            {currentAnimal.name} ▾
          </span>
        </button>

        {/* Action buttons: Add & Edit */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="w-8 h-8 rounded-full bg-sky-50 text-[#0070d2] hover:bg-sky-100 flex items-center justify-center cursor-pointer transition-colors"
            title="Add New Animal"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
          </button>
          <button
            onClick={() => {
              setEditForm({
                name: currentAnimal.name,
                breed: currentAnimal.breed,
                age: currentAnimal.age,
                gender: currentAnimal.gender,
                weight: currentAnimal.weight,
                ownerName: currentAnimal.ownerName,
                allergies: currentAnimal.allergies || 'Penicillin, Wheat gluten',
                notes: currentAnimal.notes || 'Routine checkup required every 6 months. Active and healthy.',
              });
              setIsEditModalOpen(true);
            }}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center cursor-pointer transition-colors"
            title="Edit Animal Profile"
          >
            <Edit3 className="w-4 h-4 stroke-[2]" />
          </button>
        </div>
      </motion.div>

      {/* ======================================================== */}
      {/* 2. BODY CONTENT (Exact matching User Uploaded Image 2) */}
      {/* ======================================================== */}
      <div className="px-5 pt-2.5 space-y-4">
        {/* Circular Avatar of Buddy with Camera Icon Overlay */}
        <motion.div variants={itemVariants} className="flex flex-col items-center text-center">
          <div className="relative">
            {/* Glowing circular avatar ring */}
            <div className="w-[102px] h-[102px] rounded-full p-[3px] bg-gradient-to-tr from-sky-400 via-sky-200 to-sky-100 shadow-md">
              <img
                src={currentAnimal.photoUrl || '/assets/buddy_avatar.png'}
                alt={currentAnimal.name}
                className="w-full h-full rounded-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/buddy_avatar.png';
                }}
              />
            </div>
            {/* Blue camera upload circle overlapping bottom-right of avatar */}
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="absolute bottom-0.5 right-0.5 w-7 h-7 rounded-full bg-[#0070d2] text-white flex items-center justify-center border-2 border-white shadow-md cursor-pointer hover:scale-105 active:scale-95 transition-transform"
              title="Change Photo"
            >
              <Camera className="w-3.5 h-3.5 fill-current" />
            </button>
          </div>

          {/* Name & Gender Icon */}
          <div className="flex items-center gap-1.5 mt-2">
            <h2 className="text-[20px] font-black text-slate-900 tracking-tight leading-none">
              {currentAnimal.name}
            </h2>
            <span className="text-[#0070d2] font-black text-base leading-none">
              {currentAnimal.gender === 'Female' ? '♀' : '♂'}
            </span>
          </div>
          <p className="text-xs font-semibold text-slate-400 mt-1">
            {currentAnimal.breed} • {currentAnimal.age}
          </p>
        </motion.div>

        {/* ======================================================== */}
        {/* 3 PILL TABS: Perfect Horizontal Center Alignment (No Wrap) */}
        {/* ======================================================== */}
        <motion.div
          variants={itemVariants}
          className="bg-[#f0f8ff] p-1 rounded-full flex items-center justify-between text-[12px] font-bold text-slate-500 shadow-2xs border border-sky-100/60"
        >
          <button
            onClick={() => setActiveTabSub('overview')}
            className={`flex-1 py-2 px-2 rounded-full transition-all cursor-pointer text-center whitespace-nowrap leading-none ${
              activeTabSub === 'overview'
                ? 'bg-[#0070d2] text-white font-black shadow-sm'
                : 'hover:text-slate-900'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTabSub('history')}
            className={`flex-1 py-2 px-2 rounded-full transition-all cursor-pointer text-center whitespace-nowrap leading-none ${
              activeTabSub === 'history'
                ? 'bg-[#0070d2] text-white font-black shadow-sm'
                : 'hover:text-slate-900'
            }`}
          >
            Medical History
          </button>
          <button
            onClick={() => setActiveTabSub('reports')}
            className={`flex-1 py-2 px-2 rounded-full transition-all cursor-pointer text-center whitespace-nowrap leading-none ${
              activeTabSub === 'reports'
                ? 'bg-[#0070d2] text-white font-black shadow-sm'
                : 'hover:text-slate-900'
            }`}
          >
            Reports
          </button>
        </motion.div>

        {/* ======================================================== */}
        {/* TAB 1: OVERVIEW CONTENT */}
        {/* ======================================================== */}
        {activeTabSub === 'overview' && (
          <div className="space-y-3.5">
            {/* Two Column Grid: Weight & Breed (Exact card styling from image) */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3">
              {/* Weight Card */}
              <div className="bg-white p-3.5 rounded-[22px] border border-slate-100 shadow-[0_4px_16px_rgba(0,112,210,0.05)] flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-sky-50 text-[#0070d2] flex items-center justify-center shrink-0">
                  <Weight className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <span className="text-[11px] font-medium text-slate-400">Weight</span>
                  <p className="text-[14px] font-black text-slate-900 mt-0.5">{currentAnimal.weight}</p>
                </div>
              </div>

              {/* Breed Card */}
              <div className="bg-white p-3.5 rounded-[22px] border border-slate-100 shadow-[0_4px_16px_rgba(0,112,210,0.05)] flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-sky-50 text-[#0070d2] flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 100 100">
                    <path d="M50,42 C38,42 28,52 28,66 C28,78 38,88 50,88 C62,88 72,78 72,66 C72,52 62,42 50,42 Z" />
                    <circle cx="27" cy="34" r="9.5" />
                    <circle cx="43" cy="21" r="9.5" />
                    <circle cx="57" cy="21" r="9.5" />
                    <circle cx="73" cy="34" r="9.5" />
                  </svg>
                </div>
                <div className="overflow-hidden">
                  <span className="text-[11px] font-medium text-slate-400">Breed</span>
                  <p className="text-[13px] font-black text-slate-900 truncate mt-0.5">{currentAnimal.breed}</p>
                </div>
              </div>
            </motion.div>

            {/* Owner Card (Exact card styling from image) */}
            <motion.div
              variants={itemVariants}
              className="bg-white p-3.5 rounded-[22px] border border-slate-100 shadow-[0_4px_16px_rgba(0,112,210,0.05)] flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-2xl bg-sky-50 text-[#0070d2] flex items-center justify-center shrink-0">
                <User className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <span className="text-[11px] font-medium text-slate-400">Owner</span>
                <p className="text-[14px] font-black text-slate-900 mt-0.5">{currentAnimal.ownerName}</p>
              </div>
            </motion.div>

            {/* View Full Profile -> Solid Blue Button */}
            <motion.div variants={itemVariants} className="pt-1">
              <button
                onClick={() => setActiveTabSub('history')}
                className="w-full py-3.5 px-6 rounded-full bg-[#0070d2] hover:bg-[#005fb2] active:scale-[0.98] text-white font-black text-sm shadow-lg shadow-sky-600/30 flex items-center justify-center gap-2 group transition-all cursor-pointer"
              >
                <span>View Full Profile</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform stroke-[2.5]" />
              </button>
            </motion.div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: MEDICAL HISTORY CONTENT */}
        {/* ======================================================== */}
        {activeTabSub === 'history' && (
          <motion.div variants={itemVariants} className="space-y-3">
            <div className="bg-white p-4 rounded-[22px] border border-slate-100 shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#0070d2]" />
                  <span className="text-xs font-black text-slate-900 uppercase tracking-wide">
                    Clinical Timeline
                  </span>
                </div>
                <span className="text-[11px] font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full">
                  {animalTests.length} tests recorded
                </span>
              </div>

              {animalTests.length === 0 ? (
                <div className="py-6 text-center text-slate-400 text-xs">
                  No tests recorded yet for {currentAnimal.name}.
                </div>
              ) : (
                <div className="space-y-2.5">
                  {animalTests.map((t) => (
                    <div
                      key={t.id}
                      onClick={() => navigateToReportDetail(t)}
                      className="p-3 rounded-2xl bg-slate-50 hover:bg-sky-50/60 border border-slate-100 flex items-center justify-between cursor-pointer transition-colors"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-slate-800">{t.testName}</span>
                          <span
                            className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ${
                              t.overallStatus === 'Normal'
                                ? 'bg-emerald-100 text-emerald-700'
                                : 'bg-rose-100 text-rose-700'
                            }`}
                          >
                            {t.overallStatus}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          {t.timestamp}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Clinical Allergies & Notes */}
            <div className="bg-white p-4 rounded-[22px] border border-slate-100 shadow-sm space-y-2">
              <div className="flex items-center gap-1.5 text-amber-600 text-xs font-black">
                <AlertCircle className="w-4 h-4" />
                <span>Known Allergies & Conditions</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-medium bg-amber-50/60 p-2.5 rounded-xl border border-amber-100">
                {currentAnimal.allergies || 'None recorded. Patient has normal tolerance.'}
              </p>
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: REPORTS CONTENT */}
        {/* ======================================================== */}
        {activeTabSub === 'reports' && (
          <motion.div variants={itemVariants} className="space-y-3">
            <div className="bg-white p-4 rounded-[22px] border border-slate-100 shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#0070d2]" />
                  <span className="text-xs font-black text-slate-900 uppercase tracking-wide">
                    Diagnostic Reports
                  </span>
                </div>
                <button
                  onClick={() => setActiveTab('scanner')}
                  className="text-[11px] font-bold text-white bg-[#0070d2] px-2.5 py-1 rounded-full cursor-pointer hover:bg-[#005fb2] flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" /> New Scan
                </button>
              </div>

              <div className="space-y-2.5">
                {animalTests.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => navigateToReportDetail(t)}
                    className="p-3.5 rounded-2xl bg-white border border-slate-200/80 hover:border-sky-300 shadow-2xs flex items-center justify-between cursor-pointer transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-sky-50 text-[#0070d2] flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-slate-800">{t.testName} PDF</h4>
                        <span className="text-[10px] text-slate-400">Certified by Dr. Sarah Mitchell</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] font-black text-[#0070d2]">View PDF →</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* CLEAR VISIBLE PAW WATERMARK & BOTTOM CYAN WAVE GRADIENT */}
        {/* ======================================================== */}
        <motion.div variants={itemVariants} className="relative flex flex-col items-center justify-center pt-2 pb-10 mt-1 overflow-hidden">
          {/* Subtle yet clear Sky-Blue Paw Print Watermark */}
          <div className="text-[#38bdf8]/75 drop-shadow-xs transition-transform hover:scale-105 duration-300 relative z-10">
            <svg className="w-20 h-20 fill-current" viewBox="0 0 100 100">
              <path d="M50,42 C38,42 28,52 28,66 C28,78 38,88 50,88 C62,88 72,78 72,66 C72,52 62,42 50,42 Z" />
              <circle cx="27" cy="34" r="9.5" />
              <circle cx="43" cy="21" r="9.5" />
              <circle cx="57" cy="21" r="9.5" />
              <circle cx="73" cy="34" r="9.5" />
            </svg>
          </div>

          {/* Organic Softer / Lighter Sky Blue Waves */}
          {/* Layer 1 (Left gentle hill wave) */}
          <div className="absolute -bottom-10 -left-12 w-52 h-28 bg-[#bae6fd]/55 rounded-tr-[120px] rounded-tl-[60px] pointer-events-none transform -rotate-6"></div>
          {/* Layer 2 (Right gentle hill wave) */}
          <div className="absolute -bottom-10 -right-12 w-56 h-30 bg-[#7dd3fc]/50 rounded-tl-[130px] pointer-events-none transform rotate-3"></div>
          {/* Center Smooth Soft Glow Backdrop */}
          <div className="absolute -bottom-8 -left-6 -right-6 h-20 bg-gradient-to-t from-[#bae6fd]/40 via-[#e0f2fe]/30 to-transparent rounded-t-[50%] pointer-events-none"></div>
        </motion.div>
      </div>

      {/* ======================================================== */}
      {/* MODAL 1: EDIT ANIMAL PROFILE */}
      {/* ======================================================== */}
      <AnimatePresence>
        {isEditModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl p-5 w-full max-w-sm shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-sky-100 text-[#0070d2] flex items-center justify-center">
                    <Edit3 className="w-3.5 h-3.5" />
                  </div>
                  <h3 className="text-base font-black text-slate-900">Edit Animal Details</h3>
                </div>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveEdit} className="space-y-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Animal Name</label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#0070d2] font-semibold"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">Breed</label>
                    <input
                      type="text"
                      value={editForm.breed}
                      onChange={(e) => setEditForm({ ...editForm, breed: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#0070d2] font-semibold"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">Age</label>
                    <input
                      type="text"
                      value={editForm.age}
                      onChange={(e) => setEditForm({ ...editForm, age: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#0070d2] font-semibold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">Weight</label>
                    <input
                      type="text"
                      value={editForm.weight}
                      onChange={(e) => setEditForm({ ...editForm, weight: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#0070d2] font-semibold"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">Gender</label>
                    <select
                      value={editForm.gender}
                      onChange={(e) => setEditForm({ ...editForm, gender: e.target.value as 'Male' | 'Female' })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#0070d2] font-semibold"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Owner Name</label>
                  <input
                    type="text"
                    value={editForm.ownerName}
                    onChange={(e) => setEditForm({ ...editForm, ownerName: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#0070d2] font-semibold"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Allergies / Special Alert</label>
                  <input
                    type="text"
                    value={editForm.allergies}
                    onChange={(e) => setEditForm({ ...editForm, allergies: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#0070d2] font-semibold"
                  />
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-[#0070d2] hover:bg-[#005fb2] text-xs font-bold text-white shadow-md cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Check className="w-3.5 h-3.5" /> Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ======================================================== */}
      {/* MODAL 2: ADD NEW ANIMAL */}
      {/* ======================================================== */}
      <AnimatePresence>
        {isAddModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl p-5 w-full max-w-sm shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-sky-100 text-[#0070d2] flex items-center justify-center">
                    <Plus className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <h3 className="text-base font-black text-slate-900">Register New Animal</h3>
                </div>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateAnimal} className="space-y-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Pet Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Charlie"
                    value={newAnimalForm.name}
                    onChange={(e) => setNewAnimalForm({ ...newAnimalForm, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#0070d2] font-semibold"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">Species</label>
                    <select
                      value={newAnimalForm.species}
                      onChange={(e) =>
                        setNewAnimalForm({ ...newAnimalForm, species: e.target.value as any })
                      }
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#0070d2] font-semibold"
                    >
                      <option value="Dog">Dog</option>
                      <option value="Cat">Cat</option>
                      <option value="Horse">Horse</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">Breed *</label>
                    <input
                      type="text"
                      placeholder="e.g. Labrador"
                      value={newAnimalForm.breed}
                      onChange={(e) => setNewAnimalForm({ ...newAnimalForm, breed: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#0070d2] font-semibold"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">Weight (kg)</label>
                    <input
                      type="number"
                      placeholder="e.g. 25"
                      value={newAnimalForm.weight}
                      onChange={(e) => setNewAnimalForm({ ...newAnimalForm, weight: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#0070d2] font-semibold"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">Gender</label>
                    <select
                      value={newAnimalForm.gender}
                      onChange={(e) =>
                        setNewAnimalForm({ ...newAnimalForm, gender: e.target.value as 'Male' | 'Female' })
                      }
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#0070d2] font-semibold"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Owner Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Emily Watson"
                    value={newAnimalForm.ownerName}
                    onChange={(e) => setNewAnimalForm({ ...newAnimalForm, ownerName: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#0070d2] font-semibold"
                  />
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-[#0070d2] hover:bg-[#005fb2] text-xs font-bold text-white shadow-md cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" /> Create Profile
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ======================================================== */}
      {/* MODAL 3: ANIMAL SWITCHER */}
      {/* ======================================================== */}
      <AnimatePresence>
        {isAnimalSwitcherOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl p-5 w-full max-w-sm shadow-2xl space-y-3 max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="text-sm font-black text-slate-900">Select Animal Patient</h3>
                <button
                  onClick={() => setIsAnimalSwitcherOpen(false)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2">
                {animals.map((anim) => (
                  <div
                    key={anim.id}
                    onClick={() => {
                      setSelectedAnimal(anim);
                      setIsAnimalSwitcherOpen(false);
                    }}
                    className={`p-3 rounded-2xl flex items-center justify-between cursor-pointer transition-all border ${
                      currentAnimal.id === anim.id
                        ? 'bg-sky-50 border-[#0070d2] text-[#0070d2]'
                        : 'bg-white border-slate-100 hover:bg-slate-50 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={anim.photoUrl}
                        alt={anim.name}
                        className="w-10 h-10 rounded-full object-cover border border-slate-200"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/assets/buddy_avatar.png';
                        }}
                      />
                      <div>
                        <h4 className="text-xs font-black">{anim.name}</h4>
                        <span className="text-[11px] text-slate-400">
                          {anim.breed} • {anim.weight}
                        </span>
                      </div>
                    </div>
                    {currentAnimal.id === anim.id && (
                      <Check className="w-4 h-4 text-[#0070d2] stroke-[3]" />
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  setIsAnimalSwitcherOpen(false);
                  setIsAddModalOpen(true);
                }}
                className="w-full py-2.5 rounded-2xl bg-sky-50 hover:bg-sky-100 text-[#0070d2] text-xs font-black flex items-center justify-center gap-1.5 cursor-pointer mt-2"
              >
                <Plus className="w-4 h-4" /> Add Another Animal
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
