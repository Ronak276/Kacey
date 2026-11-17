import React, { useState } from 'react';
import {
  ChevronLeft,
  Edit3,
  Camera,
  Weight,
  Sparkles,
  FileText,
  User,
  Plus,
  ArrowRight,
  Calendar,
  History,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useToast } from '../context/ToastContext';

export const AnimalDetailPage: React.FC = () => {
  const {
    selectedAnimal,
    setActiveTab,
    tests,
    startScannerForAnimal,
    navigateToReportDetail,
  } = useApp();
  const { toast } = useToast();

  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'history' | 'reports'>('overview');
  const [isEditingPhoto, setIsEditingPhoto] = useState(false);

  const animal = selectedAnimal;

  if (!animal) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <p className="text-sm text-slate-500">No animal selected.</p>
        <button
          onClick={() => setActiveTab('animals')}
          className="mt-4 px-4 py-2 bg-sky-600 text-white rounded-xl text-xs font-semibold"
        >
          View Animal List
        </button>
      </div>
    );
  }

  // Filter tests belonging to this animal
  const animalTests = tests.filter((t) => t.animalId === animal.id || t.animalName === animal.name);

  return (
    <div className="flex-1 flex flex-col bg-slate-50 relative pb-10 overflow-y-auto">
      {/* Top Header matching Screen 5 (Animal Profile) */}
      <div className="bg-white px-5 pt-4 pb-3 flex items-center justify-between border-b border-slate-100 shadow-sm sticky top-0 z-20">
        <button
          onClick={() => setActiveTab('animals')}
          className="w-9 h-9 rounded-xl bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-700"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <h1 className="text-sm font-bold text-slate-800">Animal Profile</h1>

        <button
          onClick={() =>
            toast({
              title: 'Edit Mode Enabled',
              description: 'You can update details below.',
              variant: 'info',
            })
          }
          className="w-9 h-9 rounded-xl bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-700"
        >
          <Edit3 className="w-4 h-4" />
        </button>
      </div>

      <div className="px-5 py-4 space-y-4">
        {/* Large Circular Avatar with Camera overlay badge (Screen 5 exact) */}
        <div className="flex flex-col items-center text-center">
          <div className="relative">
            <img
              src={animal.photoUrl}
              alt={animal.name}
              className="w-24 h-24 rounded-full object-cover ring-4 ring-sky-100 shadow-lg"
            />
            {/* Blue camera upload button overlay */}
            <button
              onClick={() =>
                toast({
                  title: 'Upload Photo',
                  description: 'Select new pet photo from gallery.',
                  variant: 'info',
                })
              }
              className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-sky-600 text-white flex items-center justify-center shadow-md hover:bg-sky-700 transition-all border-2 border-white"
            >
              <Camera className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Name & Gender Icon */}
          <div className="flex items-center gap-1.5 mt-2.5">
            <h2 className="text-lg font-black text-slate-900">{animal.name}</h2>
            <span className="text-sky-600 font-bold text-sm">
              {animal.gender === 'Male' ? '♂' : '♀'}
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            {animal.breed} • {animal.age}
          </p>
        </div>

        {/* 3 Pill Tabs: Overview | Medical History | Reports (Screen 5 exact) */}
        <div className="bg-slate-200/70 p-1 rounded-2xl flex items-center justify-between text-xs font-semibold text-slate-600">
          <button
            onClick={() => setActiveSubTab('overview')}
            className={`flex-1 py-1.5 rounded-xl transition-all ${
              activeSubTab === 'overview' ? 'bg-sky-600 text-white shadow-sm' : 'hover:text-slate-900'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveSubTab('history')}
            className={`flex-1 py-1.5 rounded-xl transition-all ${
              activeSubTab === 'history' ? 'bg-sky-600 text-white shadow-sm' : 'hover:text-slate-900'
            }`}
          >
            Medical History
          </button>
          <button
            onClick={() => setActiveSubTab('reports')}
            className={`flex-1 py-1.5 rounded-xl transition-all ${
              activeSubTab === 'reports' ? 'bg-sky-600 text-white shadow-sm' : 'hover:text-slate-900'
            }`}
          >
            Reports
          </button>
        </div>

        {/* Overview Tab Content */}
        {activeSubTab === 'overview' && (
          <div className="space-y-3">
            {/* 2 Grid Cards: Weight & Breed (Screen 5 exact) */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                  <Weight className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-medium">Weight</span>
                  <p className="text-xs font-bold text-slate-900">{animal.weight}</p>
                </div>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <span className="text-[10px] text-slate-400 font-medium">Breed</span>
                  <p className="text-xs font-bold text-slate-900 truncate">{animal.breed}</p>
                </div>
              </div>
            </div>

            {/* Owner Details Card (Screen 5 exact) */}
            <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                <User className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <span className="text-[10px] text-slate-400 font-medium">Owner</span>
                <p className="text-xs font-bold text-slate-900">{animal.ownerName}</p>
                <p className="text-[10px] text-slate-500">{animal.ownerPhone}</p>
              </div>
            </div>

            {/* Medical Notes & Allergies */}
            <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm space-y-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Clinical Notes
              </span>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {animal.notes}
              </p>
              <div className="pt-1 flex items-center gap-2">
                <span className="text-[10px] text-slate-500 font-semibold">Allergies:</span>
                <span className="text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md font-medium">
                  {animal.allergies}
                </span>
              </div>
            </div>

            {/* Action Buttons: Scan For This Animal & View Full Profile (Screen 5 exact) */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => startScannerForAnimal(animal)}
                className="w-full py-3.5 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md shadow-sky-600/30 flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
              >
                <Camera className="w-4 h-4" />
                <span>Scan New Test Strip For {animal.name}</span>
              </button>

              <button
                onClick={() => setActiveSubTab('history')}
                className="w-full py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-sky-700 font-bold text-xs border border-sky-300 shadow-sm flex items-center justify-center gap-2 transition-all"
              >
                <span>View Full Profile & Tests</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Medical History SubTab */}
        {activeSubTab === 'history' && (
          <div className="space-y-2.5">
            <h3 className="text-xs font-bold text-slate-800">
              Diagnostic Test History ({animalTests.length})
            </h3>
            {animalTests.length === 0 ? (
              <p className="text-xs text-slate-400 py-4 text-center">No tests recorded yet.</p>
            ) : (
              animalTests.map((t) => (
                <div
                  key={t.id}
                  onClick={() => navigateToReportDetail(t)}
                  className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between cursor-pointer hover:bg-sky-50/40 transition-all"
                >
                  <div className="flex items-center gap-3">
                    {/* Simulated strip snippet */}
                    <div className="w-3.5 h-10 bg-slate-100 rounded-sm flex flex-col items-center justify-around py-0.5 border border-slate-200">
                      <div className="w-2 h-1.5 bg-emerald-300 rounded-[1px]"></div>
                      <div className="w-2 h-1.5 bg-amber-300 rounded-[1px]"></div>
                      <div className="w-2 h-1.5 bg-cyan-300 rounded-[1px]"></div>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400">{t.timestamp}</span>
                      <h4 className="text-xs font-bold text-slate-900">{t.testName}</h4>
                    </div>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      t.overallStatus === 'Normal'
                        ? 'bg-emerald-50 text-emerald-600'
                        : 'bg-amber-50 text-amber-600'
                    }`}
                  >
                    {t.overallStatus}
                  </span>
                </div>
              ))
            )}
          </div>
        )}

        {/* Reports SubTab */}
        {activeSubTab === 'reports' && (
          <div className="space-y-2.5">
            <h3 className="text-xs font-bold text-slate-800">Digital Certified PDF Reports</h3>
            {animalTests.map((t) => (
              <div
                key={t.id}
                onClick={() => navigateToReportDetail(t)}
                className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between cursor-pointer hover:bg-sky-50/40"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{t.testName} Certificate</h4>
                    <p className="text-[10px] text-slate-400">{t.timestamp}</p>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-sky-600 hover:underline">
                  View PDF
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

