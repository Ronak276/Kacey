import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronLeft,
  Zap,
  Image as GalleryIcon,
  Play,
  RotateCcw,
  Clock,
  Sparkles,
  Camera,
  CheckCircle2,
  AlertCircle,
  Key
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { analyzeTestStripWithGemini } from '../services/geminiScannerService';
import { DiagnosticTest } from '../types';

export const ExactScannerScreen: React.FC = () => {
  const { setActiveTab, selectedAnimal, animals, setCurrentTestResult, addTestResult } = useApp();

  const currentPatient = selectedAnimal || animals[0];

  // Strip products
  const products = [
    { id: 'p1', name: 'Veti-Stx 9 Urinalysis', waitTime: 60, pads: 9 },
    { id: 'p2', name: 'EG-3 Antifreeze Screening', waitTime: 30, pads: 3 },
    { id: 'p3', name: 'Veti-Screen 6 Toxicology', waitTime: 45, pads: 6 },
  ];
  const [selectedProduct, setSelectedProduct] = useState(products[0]);

  // States
  const [flash, setFlash] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [scanStep, setScanStep] = useState<string>('');
  const [customKeyModal, setCustomKeyModal] = useState(false);
  const [userGeminiKey, setUserGeminiKey] = useState('');

  // Incubation reaction timer
  const [timerSeconds, setTimerSeconds] = useState(selectedProduct.waitTime);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Hidden file input for uploading from device gallery
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTimerSeconds(selectedProduct.waitTime);
    setIsTimerRunning(false);
  }, [selectedProduct]);

  useEffect(() => {
    let interval: any;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const executeAnalysis = async (base64Img: string) => {
    setScanning(true);
    setScanStep('Aligning optical sensor...');
    await new Promise((r) => setTimeout(r, 400));

    setScanStep('Detecting reagent color pads...');
    await new Promise((r) => setTimeout(r, 400));

    setScanStep('Analyzing with Gemini AI Vision...');

    const result = await analyzeTestStripWithGemini(base64Img, selectedProduct.name, userGeminiKey);

    const newTest: DiagnosticTest = {
      id: `test-${Date.now()}`,
      animalId: currentPatient.id,
      animalName: currentPatient.name,
      animalBreed: currentPatient.breed,
      animalPhoto: currentPatient.photoUrl,
      testCategory: result.testCategory,
      testName: result.testName,
      timestamp: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }) + ' • ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      overallStatus: result.overallStatus,
      summaryNotes: result.summaryNotes,
      veterinarianName: 'Dr. Sarah Mitchell',
      clinicName: 'Metropolitan Veterinary Hospital',
      parameters: result.parameters,
      stripPads: result.stripPads,
      capturedImageUrl: base64Img,
    };

    setCurrentTestResult(newTest);
    addTestResult(newTest);

    setScanning(false);
    setActiveTab('results');
  };

  const handleCapture = () => {
    executeAnalysis('/assets/test_strip_real.png');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          executeAnalysis(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-[#0b1324] text-white overflow-hidden select-none font-sans">
      {/* Hidden file picker */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* ======================================================== */}
      {/* 1. TOP HEADER: Back | Title | Flash & API Key Buttons */}
      {/* ======================================================== */}
      <div className="relative z-30 flex items-center justify-between px-5 pt-3 pb-2 bg-gradient-to-b from-[#0b1324] to-transparent">
        <button
          onClick={() => setActiveTab('home')}
          className="text-white/80 hover:text-white p-1 rounded-full cursor-pointer transition-colors"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
        </button>

        <div className="text-center">
          <h1 className="text-[16px] font-black tracking-tight text-white">Scan Test Strip</h1>
          <p className="text-[10px] text-sky-400 font-bold">
            Patient: {currentPatient.name} ({currentPatient.breed})
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setCustomKeyModal(true)}
            className={`p-1.5 rounded-full transition-colors cursor-pointer ${
              userGeminiKey ? 'text-emerald-400 bg-emerald-400/20' : 'text-white/60 hover:text-white'
            }`}
            title="Configure Gemini AI Key"
          >
            <Key className="w-4 h-4" />
          </button>

          <button
            onClick={() => setFlash(!flash)}
            className={`p-1.5 rounded-full transition-all cursor-pointer ${
              flash ? 'text-amber-400 bg-amber-400/20' : 'text-white/80 hover:text-white'
            }`}
            title="Toggle Flash"
          >
            <Zap className={`w-4 h-4 ${flash ? 'fill-current' : 'stroke-[2.5]'}`} />
          </button>
        </div>
      </div>

      {/* Product Strip Selector Pills */}
      <div className="relative z-30 px-4 py-1.5 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {products.map((p) => {
          const isSelected = selectedProduct.id === p.id;
          return (
            <button
              key={p.id}
              onClick={() => setSelectedProduct(p)}
              className={`px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#0086ff] text-white shadow-sm shadow-sky-500/30'
                  : 'bg-white/10 hover:bg-white/15 text-slate-300 border border-white/10'
              }`}
            >
              {p.name.split(' ')[0]} ({p.waitTime}s)
            </button>
          );
        })}
      </div>

      {/* Reaction Countdown Timer Bar */}
      <div className="relative z-20 px-5 py-1.5 flex items-center justify-between text-xs bg-white/5 border-y border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-sky-400" />
          <span className="text-[11px] font-medium text-slate-300">
            Incubation: <strong className="text-white font-bold">{timerSeconds}s remaining</strong>
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsTimerRunning(!isTimerRunning)}
            className="px-2 py-0.5 rounded-lg bg-sky-500/20 text-sky-400 text-[10px] font-bold hover:bg-sky-500/30 transition-colors cursor-pointer"
          >
            {isTimerRunning ? 'Pause' : 'Start Timer'}
          </button>
          <button
            onClick={() => {
              setIsTimerRunning(false);
              setTimerSeconds(selectedProduct.waitTime);
            }}
            className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Subtitle guidance text matching Screen 3 */}
      <p className="text-center text-xs text-slate-300 px-6 pt-2 pb-1">
        Place the test strip in the frame<br />and make sure it's well lit.
      </p>

      {/* ======================================================== */}
      {/* 2. CENTER VIEWFINDER: Reticle & Scanning Animation */}
      {/* ======================================================== */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden my-auto px-6">
        {/* Real photo background: Wood grain table with calibrated reagent test strip */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src="/assets/scanner_wood_strip_bg.png"
            alt="Reagent strip on surface"
            className="w-full h-full object-cover object-center filter brightness-90 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0b1324]/50 via-transparent to-[#0b1324]/70 pointer-events-none"></div>
        </div>

        {/* Viewfinder Bounding Reticle (Exact 4 Curved White Corners) */}
        <div className="relative w-[215px] h-[260px] pointer-events-none z-20 flex items-center justify-center">
          {/* Top-Left Corner */}
          <div className="absolute -top-1 -left-1 w-9 h-9 border-t-[3.5px] border-l-[3.5px] border-white rounded-tl-[24px] shadow-sm"></div>
          {/* Top-Right Corner */}
          <div className="absolute -top-1 -right-1 w-9 h-9 border-t-[3.5px] border-r-[3.5px] border-white rounded-tr-[24px] shadow-sm"></div>
          {/* Bottom-Left Corner */}
          <div className="absolute -bottom-1 -left-1 w-9 h-9 border-b-[3.5px] border-l-[3.5px] border-white rounded-bl-[24px] shadow-sm"></div>
          {/* Bottom-Right Corner */}
          <div className="absolute -bottom-1 -right-1 w-9 h-9 border-b-[3.5px] border-r-[3.5px] border-white rounded-br-[24px] shadow-sm"></div>

          {/* Glowing Animated Laser Scan Sweep Line */}
          {scanning && (
            <div className="absolute inset-x-2 h-1 bg-gradient-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_16px_#38bdf8] animate-laser"></div>
          )}
        </div>

        {/* Real-time processing toast banner */}
        <AnimatePresence>
          {scanning && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="absolute bottom-6 z-30 px-4 py-2 rounded-full bg-slate-900/90 border border-sky-400/40 backdrop-blur-md shadow-2xl flex items-center gap-2 text-xs font-bold text-sky-300"
            >
              <Sparkles className="w-4 h-4 text-sky-400 animate-spin" />
              <span>{scanStep}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ======================================================== */}
      {/* 3. BOTTOM CONTROLS & SUPPORTED TESTS TILE */}
      {/* ======================================================== */}
      <div className="relative z-30 flex flex-col items-center bg-gradient-to-t from-[#0b1324] via-[#0b1324]/95 to-transparent pt-2 pb-3">
        {/* Shutter & Gallery Controls */}
        <div className="w-full px-8 flex items-center justify-between mb-2.5">
          {/* Upload Button: opens native photo gallery */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-11 h-11 rounded-2xl bg-white/10 hover:bg-white/20 active:scale-95 text-white flex items-center justify-center backdrop-blur-md border border-white/15 transition-all cursor-pointer shadow-md"
            title="Upload photo from phone gallery"
          >
            <GalleryIcon className="w-5 h-5 stroke-[2]" />
          </button>

          {/* Electric Blue Shutter Button with White Ring */}
          <button
            onClick={handleCapture}
            disabled={scanning}
            className="w-[66px] h-[66px] rounded-full p-[4px] bg-white shadow-2xl active:scale-90 transition-transform cursor-pointer flex items-center justify-center"
            title="Capture Test Strip"
          >
            <div className="w-full h-full rounded-full bg-[#0086ff] hover:bg-[#0070d2] transition-colors shadow-inner flex items-center justify-center">
              <div className="w-5 h-5 rounded-full border-2 border-white/50"></div>
            </div>
          </button>

          {/* Symmetric Spacer */}
          <div className="w-11 h-11"></div>
        </div>

        {/* White Rounded Tile: Supported Tests */}
        <div className="w-[90%] max-w-[320px] bg-white rounded-[20px] py-2 px-4 shadow-lg text-center">
          <p className="text-[12px] font-black text-slate-800 tracking-tight">
            Supported Tests :
          </p>
          <p className="text-[11px] font-bold text-[#0070d2] mt-0.5">
            Urine • Antifreeze • Drug Screen
          </p>
        </div>
      </div>

      {/* Gemini API Key Configuration Drawer */}
      <AnimatePresence>
        {customKeyModal && (
          <div className="fixed inset-0 z-50 overflow-hidden flex flex-col justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCustomKeyModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="relative w-full bg-white text-slate-900 rounded-t-[36px] shadow-2xl p-5 z-10 space-y-3.5"
            >
              <div className="w-12 h-1 bg-slate-300 rounded-full mx-auto -mt-1 mb-2"></div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-sky-100 text-[#0070d2] flex items-center justify-center">
                  <Key className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">Gemini AI Vision Key</h3>
                  <p className="text-[11px] text-slate-500 font-medium">
                    Google Gemini 2.5 Flash Multimodal Vision
                  </p>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Enter your Gemini API Key
                </label>
                <input
                  type="password"
                  placeholder="AIzaSy..."
                  value={userGeminiKey}
                  onChange={(e) => setUserGeminiKey(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-[#0070d2]"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Keys are kept secure in memory and used for direct strip pad analysis.
                </span>
              </div>

              <div className="pt-1 flex gap-2">
                <button
                  onClick={() => setCustomKeyModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setCustomKeyModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-[#0070d2] hover:bg-[#005fb2] text-xs font-bold text-white shadow-md"
                >
                  Save API Key
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
