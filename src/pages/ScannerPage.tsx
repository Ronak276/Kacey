import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronLeft,
  Zap,
  Image as GalleryIcon,
  RotateCcw,
  Sparkles,
  Check,
  AlertCircle,
  Timer,
  Info,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { KACEY_PRODUCTS } from '../data/initialData';
import { DiagnosticTest, TestParameter, ResultStatus } from '../types';
import confetti from 'canvas-confetti';

export const ScannerPage: React.FC = () => {
  const {
    animals,
    selectedAnimal,
    setSelectedAnimal,
    setActiveTab,
    addTestResult,
    vetProfile,
  } = useApp();

  // Test configuration
  const [selectedProduct, setSelectedProduct] = useState(KACEY_PRODUCTS[0]);
  const [targetAnimal, setTargetAnimal] = useState(selectedAnimal || animals[0]);
  const [flashOn, setFlashOn] = useState(false);
  const [scanningActive, setScanningActive] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [guidanceTip, setGuidanceTip] = useState('Place the test strip in the frame and make sure it\'s well lit.');
  const [timerCount, setTimerCount] = useState<number | null>(null);

  // File upload ref for gallery
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fallback simulated strip pads for demo
  const samplePadsColors = ['#dcfce7', '#fef08a', '#bbf7d0', '#86efac', '#bbf7d0', '#bae6fd'];

  const triggerScanCapture = () => {
    setScanningActive(true);
    setScanProgress(0);
    setGuidanceTip('Hold steady... Aligning 6 diagnostic pads & analyzing reflection...');

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          finishScanAnalysis();
          return 100;
        }
        return prev + 25;
      });
    }, 400);
  };

  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCapturedImage(event.target?.result as string);
        triggerScanCapture();
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const finishScanAnalysis = () => {
    setScanningActive(false);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
    });

    // Create result based on selected product
    const parameters: TestParameter[] = [
      {
        id: 'p1',
        name: 'Protein',
        value: 'Negative',
        status: 'Normal',
        normalRange: 'Negative (< 15 mg/dL)',
        padColorHex: '#dcfce7',
        referenceColors: [
          { label: 'Negative', colorHex: '#dcfce7', status: 'Normal' },
          { label: 'Trace', colorHex: '#fef08a', status: 'Trace' },
          { label: 'Positive', colorHex: '#86efac', status: 'Positive' },
        ],
      },
      {
        id: 'p2',
        name: 'Glucose',
        value: 'Trace',
        status: 'Trace',
        normalRange: 'Negative (< 100 mg/dL)',
        padColorHex: '#fef08a',
        referenceColors: [
          { label: 'Negative', colorHex: '#fef9c3', status: 'Normal' },
          { label: 'Trace', colorHex: '#fef08a', status: 'Trace' },
          { label: 'High', colorHex: '#eab308', status: 'Positive' },
        ],
      },
      {
        id: 'p3',
        name: 'Ketones',
        value: 'Negative',
        status: 'Normal',
        normalRange: 'Negative',
        padColorHex: '#bbf7d0',
        referenceColors: [
          { label: 'Negative', colorHex: '#bbf7d0', status: 'Normal' },
          { label: 'Positive', colorHex: '#f43f5e', status: 'Positive' },
        ],
      },
      {
        id: 'p4',
        name: 'pH',
        value: '6.5',
        status: 'Normal',
        normalRange: '6.0 – 7.5',
        padColorHex: '#86efac',
        referenceColors: [
          { label: '5.5', colorHex: '#fde047', status: 'Normal' },
          { label: '6.5', colorHex: '#86efac', status: 'Normal' },
          { label: '8.0+', colorHex: '#6366f1', status: 'Abnormal' },
        ],
      },
      {
        id: 'p5',
        name: 'Blood',
        value: 'Negative',
        status: 'Normal',
        normalRange: 'Negative (Hemoglobin)',
        padColorHex: '#bbf7d0',
        referenceColors: [
          { label: 'Negative', colorHex: '#bbf7d0', status: 'Normal' },
          { label: 'Trace', colorHex: '#fed7aa', status: 'Trace' },
          { label: 'Positive', colorHex: '#ea580c', status: 'Positive' },
        ],
      },
      {
        id: 'p6',
        name: 'Specific Gravity',
        value: '1.020',
        status: 'Normal',
        normalRange: '1.015 – 1.045',
        padColorHex: '#bae6fd',
        referenceColors: [
          { label: '1.010', colorHex: '#e0f2fe', status: 'Trace' },
          { label: '1.020', colorHex: '#bae6fd', status: 'Normal' },
          { label: '1.035', colorHex: '#38bdf8', status: 'Normal' },
        ],
      },
    ];

    const newTest: DiagnosticTest = {
      id: `test-${Date.now()}`,
      animalId: targetAnimal.id,
      animalName: targetAnimal.name,
      animalBreed: targetAnimal.breed,
      animalPhoto: targetAnimal.photoUrl,
      testCategory: selectedProduct.category as any,
      testName: selectedProduct.name,
      timestamp: 'Just now',
      displayTimeAgo: 'Just now',
      overallStatus: 'Normal',
      summaryNotes: 'Results are within normal range. Optimal veterinary parameters detected by Kacey AI.',
      veterinarianName: vetProfile.name,
      clinicName: vetProfile.clinicName,
      parameters,
      stripPads: samplePadsColors,
      capturedImageUrl: capturedImage || undefined,
    };

    addTestResult(newTest);
    setActiveTab('results');
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-950 text-white relative h-full overflow-hidden select-none">
      {/* Hidden file input for gallery picker */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleGalleryUpload}
        accept="image/*"
        className="hidden"
      />

      {/* Top Header Overlay (Screen 3 exact) */}
      <div className="relative z-20 flex items-center justify-between px-5 pt-4 pb-2">
        <button
          onClick={() => setActiveTab('home')}
          className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <h1 className="text-sm font-bold tracking-wide">Scan Test Strip</h1>

        <button
          onClick={() => setFlashOn(!flashOn)}
          className={`w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center transition-all ${
            flashOn ? 'bg-amber-400 text-slate-900 shadow-md shadow-amber-400/50' : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          <Zap className="w-4 h-4 fill-current" />
        </button>
      </div>

      {/* Animal & Product Select Bar */}
      <div className="relative z-20 px-5 py-2 flex items-center gap-2">
        {/* Target Animal Selector */}
        <select
          value={targetAnimal.id}
          onChange={(e) => {
            const found = animals.find((a) => a.id === e.target.value);
            if (found) {
              setTargetAnimal(found);
              setSelectedAnimal(found);
            }
          }}
          className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[11px] font-semibold rounded-xl px-2.5 py-1.5 focus:outline-none"
        >
          {animals.map((a) => (
            <option key={a.id} value={a.id} className="text-slate-900 font-normal">
              Patient: {a.name} ({a.breed})
            </option>
          ))}
        </select>

        {/* Product Type Selector */}
        <select
          value={selectedProduct.id}
          onChange={(e) => {
            const prod = KACEY_PRODUCTS.find((p) => p.id === e.target.value);
            if (prod) setSelectedProduct(prod);
          }}
          className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[11px] font-semibold rounded-xl px-2.5 py-1.5 focus:outline-none"
        >
          {KACEY_PRODUCTS.map((prod) => (
            <option key={prod.id} value={prod.id} className="text-slate-900 font-normal">
              {prod.name}
            </option>
          ))}
        </select>
      </div>

      {/* Instruction Guidance Subheader */}
      <div className="relative z-20 text-center px-6 py-2">
        <p className="text-xs text-slate-300 font-medium tracking-tight">
          {guidanceTip}
        </p>
      </div>

      {/* Main Viewfinder Section with Camera Simulation (Screen 3 Exact View) */}
      <div className="relative flex-1 flex items-center justify-center px-8 my-auto">
        {/* Camera background texture / simulated medical surface */}
        <div
          className={`absolute inset-0 bg-cover bg-center transition-all duration-300 ${
            flashOn ? 'brightness-125' : 'brightness-90'
          }`}
          style={{
            backgroundImage: capturedImage
              ? `url(${capturedImage})`
              : `radial-gradient(circle at center, #1e293b 0%, #0f172a 100%)`,
          }}
        >
          {/* Subtle wood / lab counter texture pattern */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:16px_16px]"></div>
        </div>

        {/* Viewfinder Bounding Box with Rounded White Corner Reticles */}
        <div className="relative w-64 h-96 rounded-3xl border-2 border-white/40 flex items-center justify-center p-3 shadow-2xl backdrop-blur-[1px]">
          {/* 4 Corner Markers */}
          <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-white rounded-tl-xl"></div>
          <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-white rounded-tr-xl"></div>
          <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-white rounded-bl-xl"></div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-white rounded-br-xl"></div>

          {/* Realistic Kacey Diagnostics Test Strip Graphic centered in frame */}
          <div className="relative w-8 h-80 bg-white rounded-sm shadow-xl flex flex-col items-center pt-6 pb-4 border border-slate-300/80">
            {/* Strip test pads (top to bottom) matching Screen 3 visual */}
            <div className="w-5 h-5 bg-[#dcfce7] border border-slate-300/60 rounded-[2px] mb-2 shadow-inner"></div>
            <div className="w-5 h-5 bg-[#fef08a] border border-slate-300/60 rounded-[2px] mb-2 shadow-inner"></div>
            <div className="w-5 h-5 bg-[#bbf7d0] border border-slate-300/60 rounded-[2px] mb-2 shadow-inner"></div>
            <div className="w-5 h-5 bg-[#86efac] border border-slate-300/60 rounded-[2px] mb-2 shadow-inner"></div>
            <div className="w-5 h-5 bg-[#bbf7d0] border border-slate-300/60 rounded-[2px] mb-2 shadow-inner"></div>
            <div className="w-5 h-5 bg-[#bae6fd] border border-slate-300/60 rounded-[2px] mb-2 shadow-inner"></div>

            {/* Handle area with Kacey stamp */}
            <div className="mt-auto flex flex-col items-center opacity-40">
              <span className="text-[7px] font-bold text-slate-800 uppercase tracking-widest rotate-90 my-2">
                KACEY
              </span>
            </div>

            {/* AI Active Scanning Laser Line overlay */}
            {scanningActive && (
              <div className="absolute inset-x-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#38bdf8] animate-scan-laser"></div>
            )}
          </div>

          {/* AI Color Pad Recognition Boxes overlay when scanning */}
          {scanningActive && (
            <div className="absolute inset-y-6 right-6 flex flex-col justify-start gap-4 text-[9px] font-mono text-cyan-300">
              <div className="flex items-center gap-1.5 animate-pad-pulse">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                <span>PAD 1: 99.4% MATCH</span>
              </div>
              <div className="flex items-center gap-1.5 animate-pad-pulse delay-75">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                <span>PAD 2: TRACE REC</span>
              </div>
              <div className="flex items-center gap-1.5 animate-pad-pulse delay-150">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                <span>PAD 3: NEGATIVE</span>
              </div>
              <div className="flex items-center gap-1.5 animate-pad-pulse delay-200">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                <span>PAD 4: pH 6.5</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Controls Area (Screen 3 exact) */}
      <div className="relative z-20 pb-6 pt-3 px-8 flex flex-col items-center">
        {/* Gallery, Shutter & Timer Controls */}
        <div className="w-full flex items-center justify-around mb-4">
          {/* Gallery Button */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-12 h-12 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all active:scale-95"
            title="Upload from Gallery"
          >
            <GalleryIcon className="w-5 h-5" />
          </button>

          {/* Large Shutter Button (Screen 3 circular design) */}
          <button
            onClick={triggerScanCapture}
            disabled={scanningActive}
            className="relative w-18 h-18 rounded-full p-1 border-2 border-white flex items-center justify-center transition-all transform active:scale-90 group"
          >
            <div className="w-15 h-15 rounded-full bg-sky-500 group-hover:bg-sky-400 shadow-lg shadow-sky-500/50 flex items-center justify-center transition-all">
              {scanningActive ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Sparkles className="w-6 h-6 text-white" />
              )}
            </div>
          </button>

          {/* Retake / Timer Button */}
          <button
            onClick={() => {
              setCapturedImage(null);
              setScanningActive(false);
            }}
            className="w-12 h-12 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all active:scale-95"
            title="Reset Scan"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>

        {/* Supported Tests Footer Line matching screen 3 */}
        <div className="text-center">
          <p className="text-[11px] font-semibold text-slate-300">
            Supported Tests:
          </p>
          <p className="text-[11px] text-slate-400 font-medium">
            Urine • Antifreeze • Drug Screen • Organophosphates
          </p>
        </div>
      </div>
    </div>
  );
};

