import React, { useState } from 'react';
import { ArrowRight, ChevronRight, Camera, FileCheck, Stethoscope } from 'lucide-react';

interface OnboardingScreenProps {
  onComplete: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: 'Smart Test Strip Reader',
      subtitle: 'Instant Veterinary Diagnostics',
      description: 'Point your camera at Kacey Veti-Stx dip strips to automatically detect pads, analyze color intensity, and get clinical readings.',
      image: '/assets/test_strip_real.png',
      badge: 'AI Powered',
    },
    {
      title: 'Comprehensive Pet Health',
      subtitle: 'Patient Profiles & History',
      description: 'Track urinalysis, antifreeze (EG-3), and toxicology results across all canine and feline patients under your care.',
      image: '/assets/buddy_avatar.png',
      badge: 'Veterinary Grade',
    },
    {
      title: 'Certified Digital Reports',
      subtitle: 'Instant PDF Export & Share',
      description: 'Generate standardized diagnostic reports ready for clinic archives, pet owners, and specialist referrals in seconds.',
      image: '/assets/hero_pets.png',
      badge: 'Since 1979',
    },
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const slide = slides[currentSlide];

  return (
    <div className="relative w-full h-full flex flex-col justify-between bg-gradient-to-b from-white via-sky-50/40 to-sky-100/60 p-6 select-none overflow-hidden">
      {/* Top Header with Skip */}
      <div className="flex items-center justify-between pt-4">
        {/* Logo */}
        <div className="flex items-center gap-1.5">
          <svg className="w-6 h-6 fill-sky-600" viewBox="0 0 100 100">
            <path d="M50,42 C38,42 28,52 28,66 C28,78 38,88 50,88 C62,88 72,78 72,66 C72,52 62,42 50,42 Z" />
            <circle cx="27" cy="34" r="9" />
            <circle cx="43" cy="22" r="9" />
            <circle cx="57" cy="22" r="9" />
            <circle cx="73" cy="34" r="9" />
          </svg>
          <span className="text-xs font-black text-sky-700">KACEY</span>
        </div>

        <button
          onClick={onComplete}
          className="text-xs font-semibold text-slate-400 hover:text-sky-600 transition-colors"
        >
          Skip
        </button>
      </div>

      {/* Center Visual & Graphic */}
      <div className="my-auto flex flex-col items-center text-center px-2">
        {/* Badge */}
        <span className="inline-block px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4">
          {slide.badge}
        </span>

        {/* Visual Box */}
        <div className="relative w-56 h-56 rounded-3xl bg-white shadow-xl shadow-sky-500/10 border-2 border-sky-100 flex items-center justify-center p-4 mb-6">
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-contain filter drop-shadow"
          />
        </div>

        <h2 className="text-lg font-black text-slate-900 tracking-tight leading-tight">
          {slide.title}
        </h2>
        <p className="text-xs font-bold text-sky-600 mt-1">
          {slide.subtitle}
        </p>
        <p className="text-xs text-slate-500 leading-relaxed mt-2.5 max-w-[260px]">
          {slide.description}
        </p>
      </div>

      {/* Bottom Controls: Dots & Next Button */}
      <div className="pb-4 space-y-4">
        {/* Dots */}
        <div className="flex items-center justify-center gap-1.5">
          {slides.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentSlide === idx ? 'w-6 bg-sky-600' : 'w-1.5 bg-slate-200'
              }`}
            />
          ))}
        </div>

        {/* Action Button */}
        <button
          onClick={handleNext}
          className="w-full py-3.5 rounded-full bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md shadow-sky-600/30 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
        >
          <span>{currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

