import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronLeft,
  Zap,
  Image as GalleryIcon,
  Sparkles,
  Camera
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { analyzeTestStripWithGemini } from '../services/geminiScannerService';
import { DiagnosticTest } from '../types';

export const ExactScannerScreen: React.FC = () => {
  const { setActiveTab, selectedAnimal, animals, setCurrentTestResult, addTestResult } = useApp();

  const currentPatient = selectedAnimal || animals[0];

  // Camera & Stream states
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [flash, setFlash] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [scanStep, setScanStep] = useState<string>('');

  // Hidden file input for uploading from device gallery
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Start live device camera stream cleanly
  useEffect(() => {
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          stream = await navigator.mediaDevices.getUserMedia({
            video: {
              facingMode: { ideal: 'environment' },
              width: { ideal: 1280 },
              height: { ideal: 720 },
            },
            audio: false,
          });

          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
            setCameraActive(true);
          }
        }
      } catch (err: any) {
        setCameraActive(false);
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const executeAnalysis = async (base64Img: string) => {
    setScanning(true);
    setScanStep('Aligning test strip...');
    await new Promise((r) => setTimeout(r, 400));

    setScanStep('Analyzing colorimetric pads with Gemini AI...');

    const result = await analyzeTestStripWithGemini(base64Img, 'Veti-Stx 9 Urinalysis');

    const newTest: DiagnosticTest = {
      id: `test-${Date.now()}`,
      animalId: currentPatient.id,
      animalName: currentPatient.name,
      animalBreed: currentPatient.breed,
      animalPhoto: currentPatient.photoUrl,
      testCategory: result.testCategory,
      testName: result.testName,
      timestamp:
        new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }) +
        ' • ' +
        new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
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

  // Capture frame directly from live camera feed
  const handleCapture = () => {
    if (videoRef.current && cameraActive && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        executeAnalysis(dataUrl);
        return;
      }
    }

    // Default sample strip if camera permission not granted
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
    <div className="relative w-full h-full flex flex-col justify-between bg-slate-950 text-white overflow-hidden select-none font-sans">
      {/* Hidden file picker & capture canvas */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      <canvas ref={canvasRef} className="hidden" />

      {/* ======================================================== */}
      {/* 1. TOP HEADER: Exact minimal Screen 3 */}
      {/* ======================================================== */}
      <div className="relative z-30 flex items-center justify-between px-5 pt-3 pb-2">
        <button
          onClick={() => setActiveTab('home')}
          className="text-white hover:text-slate-300 p-1 cursor-pointer transition-colors"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
        </button>

        <h1 className="text-[17px] font-black tracking-tight text-white">Scan Test Strip</h1>

        <button
          onClick={() => setFlash(!flash)}
          className={`p-1 transition-colors cursor-pointer ${
            flash ? 'text-amber-400' : 'text-white hover:text-slate-300'
          }`}
          title="Toggle Flash"
        >
          <Zap className={`w-5 h-5 ${flash ? 'fill-current' : 'stroke-[2]'}`} />
        </button>
      </div>

      {/* Guidance Subtitle */}
      <div className="relative z-20 text-center px-6 -mt-1">
        <p className="text-[13px] text-white/90 font-medium leading-snug">
          Place the test strip in the frame<br />and make sure it's well lit.
        </p>
      </div>

      {/* ======================================================== */}
      {/* 2. REAL CAMERA VIEWFINDER: CLEAN MINIMAL RETICLE (Screen 3) */}
      {/* ======================================================== */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden my-auto px-6">
        {/* Real Live Camera Video Stream */}
        <video
          ref={videoRef}
          playsInline
          autoPlay
          muted
          className={`absolute inset-0 w-full h-full object-cover ${
            cameraActive ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Ambient Dark Surface Backdrop when camera is preparing */}
        {!cameraActive && (
          <div className="absolute inset-0 bg-stone-900/90 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] flex items-center justify-center">
            <Camera className="w-10 h-10 text-slate-700 animate-pulse" />
          </div>
        )}

        {/* Minimal Exact 4-Corner Viewfinder Reticle (Screen 3) */}
        <div className="relative w-[220px] h-[280px] pointer-events-none z-20 flex items-center justify-center">
          {/* Top-Left Corner */}
          <div className="absolute -top-1 -left-1 w-8 h-8 border-t-[3.5px] border-l-[3.5px] border-white/90 rounded-tl-[22px] shadow-sm"></div>
          {/* Top-Right Corner */}
          <div className="absolute -top-1 -right-1 w-8 h-8 border-t-[3.5px] border-r-[3.5px] border-white/90 rounded-tr-[22px] shadow-sm"></div>
          {/* Bottom-Left Corner */}
          <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-[3.5px] border-l-[3.5px] border-white/90 rounded-bl-[22px] shadow-sm"></div>
          {/* Bottom-Right Corner */}
          <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-[3.5px] border-r-[3.5px] border-white/90 rounded-br-[22px] shadow-sm"></div>

          {/* Animated Laser Scan Sweep Line */}
          {scanning && (
            <div className="absolute inset-x-2 h-1 bg-gradient-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_16px_#38bdf8] animate-laser"></div>
          )}
        </div>

        {/* Toast Scanner Status */}
        <AnimatePresence>
          {scanning && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="absolute bottom-4 z-30 px-4 py-2 rounded-full bg-slate-900/95 border border-sky-400/50 backdrop-blur-md shadow-2xl flex items-center gap-2 text-xs font-bold text-sky-300"
            >
              <Sparkles className="w-4 h-4 text-sky-400 animate-spin" />
              <span>{scanStep}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ======================================================== */}
      {/* 3. BOTTOM CONTROLS & SUPPORTED TESTS TILE (Screen 3 Exact) */}
      {/* ======================================================== */}
      <div className="relative z-30 flex flex-col items-center pb-4 pt-1">
        {/* Controls row: Gallery button on left | Centered Shutter */}
        <div className="w-full px-8 flex items-center justify-between mb-2">
          {/* Gallery Button: Exact rounded square from reference */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-11 h-11 rounded-[16px] bg-white/10 hover:bg-white/20 active:scale-95 text-white flex items-center justify-center border border-white/15 transition-all cursor-pointer shadow-md"
            title="Upload photo from phone gallery"
          >
            <GalleryIcon className="w-5 h-5 stroke-[2]" />
          </button>

          {/* Electric Blue Shutter Button with White Ring (Screen 3 Exact) */}
          <button
            onClick={handleCapture}
            disabled={scanning}
            className="w-[68px] h-[68px] rounded-full p-[4px] bg-white shadow-2xl active:scale-90 transition-transform cursor-pointer flex items-center justify-center -ml-2"
            title="Capture Test Strip"
          >
            <div className="w-full h-full rounded-full bg-[#0086ff] hover:bg-[#0070d2] transition-colors shadow-inner flex items-center justify-center">
              <div className="w-5 h-5 rounded-full border-2 border-white/60"></div>
            </div>
          </button>

          {/* Symmetrical placeholder for balance */}
          <div className="w-11 h-11"></div>
        </div>

        {/* Quick Test Strip Samples Bar for instant testing */}
        <div className="w-full px-5 mb-2 flex items-center justify-center gap-1.5 overflow-x-auto no-scrollbar">
          <span className="text-[10px] font-bold text-white/50 uppercase tracking-wider mr-1">Test with:</span>
          <button
            onClick={() => executeAnalysis('/assets/strip_sample_normal.jpg')}
            disabled={scanning}
            className="px-2.5 py-1 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold cursor-pointer transition-all active:scale-95 whitespace-nowrap"
          >
            Normal Strip
          </button>
          <button
            onClick={() => executeAnalysis('/assets/strip_sample_abnormal.jpg')}
            disabled={scanning}
            className="px-2.5 py-1 rounded-full bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-[10px] font-bold cursor-pointer transition-all active:scale-95 whitespace-nowrap"
          >
            Abnormal Strip
          </button>
          <button
            onClick={() => executeAnalysis('/assets/strip_sample_antifreeze.jpg')}
            disabled={scanning}
            className="px-2.5 py-1 rounded-full bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-[10px] font-bold cursor-pointer transition-all active:scale-95 whitespace-nowrap"
          >
            EG Antifreeze
          </button>
        </div>

        {/* White Rounded Tile: Supported Tests (Screen 3 Exact) */}
        <div className="w-[88%] max-w-[320px] bg-white rounded-full py-2 px-4 shadow-lg text-center">
          <p className="text-[11px] font-black text-slate-800 tracking-tight leading-tight">
            Supported Tests :
          </p>
          <p className="text-[10px] font-bold text-[#0070d2] mt-0.5 leading-tight">
            Urine • Antifreeze • Drug Screen
          </p>
        </div>
      </div>
    </div>
  );
};
