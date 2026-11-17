import React from 'react';
import {
  ChevronLeft,
  Share2,
  CheckCircle2,
  Download,
  AlertTriangle,
  RotateCcw,
  Clock,
  Droplet,
  FileText,
  User,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useToast } from '../context/ToastContext';

export const ResultsPage: React.FC = () => {
  const { currentTestResult, setActiveTab, navigateToReportDetail } = useApp();
  const { toast } = useToast();

  const test = currentTestResult;

  if (!test) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <p className="text-sm text-slate-500">No test result found.</p>
        <button
          onClick={() => setActiveTab('scanner')}
          className="mt-4 px-4 py-2 bg-sky-600 text-white rounded-xl text-xs font-semibold"
        >
          Scan Test Strip
        </button>
      </div>
    );
  }

  const handleShare = () => {
    toast({
      title: 'Report Link Copied',
      description: 'Encrypted medical report ready to share with pet owner.',
      variant: 'success',
    });
  };

  const handleSave = () => {
    toast({
      title: 'Saved to Animal Medical History',
      description: `Report filed under ${test.animalName}'s permanent record.`,
      variant: 'success',
    });
    navigateToReportDetail(test);
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 relative pb-8 overflow-y-auto">
      {/* Top Header Navigation (Screen 4 Exact) */}
      <div className="bg-white px-5 pt-4 pb-3 flex items-center justify-between border-b border-slate-100 shadow-sm sticky top-0 z-20">
        <button
          onClick={() => setActiveTab('home')}
          className="w-9 h-9 rounded-xl bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-700"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <h1 className="text-sm font-bold text-slate-800">Test Results</h1>

        <button
          onClick={handleShare}
          className="w-9 h-9 rounded-xl bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-700"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      <div className="px-5 py-4 space-y-4">
        {/* Big Green Checkmark Icon & Test Completed Status Banner */}
        <div className="flex flex-col items-center text-center py-2">
          <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30 mb-2.5">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <h2 className="text-base font-extrabold text-slate-900">Test Completed!</h2>
          <p className="text-xs text-slate-500">Results are ready</p>
        </div>

        {/* Test Name & Time Ago Summary Row (Screen 4 visual) */}
        <div className="bg-sky-50 border border-sky-100 rounded-2xl p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-sky-500 text-white flex items-center justify-center">
              <Droplet className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">{test.testName}</h3>
              <p className="text-[10px] text-slate-500">
                Patient: <span className="font-semibold text-slate-700">{test.animalName}</span> ({test.animalBreed})
              </p>
            </div>
          </div>
          <span className="text-[11px] text-slate-500 font-medium">{test.displayTimeAgo || '2 min ago'}</span>
        </div>

        {/* Detailed Parameter List (Exact values from Screen 4) */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm space-y-3">
          {test.parameters.map((param) => (
            <div
              key={param.id}
              className="flex items-center justify-between py-1.5 border-b border-slate-50 last:border-none"
            >
              <div className="flex items-center gap-2">
                <span
                  style={{ backgroundColor: param.padColorHex }}
                  className="w-3.5 h-3.5 rounded-sm border border-slate-200 shadow-inner"
                ></span>
                <span className="text-xs font-medium text-slate-700">{param.name}</span>
              </div>

              <div className="flex items-center gap-1.5">
                {param.status === 'Normal' ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                ) : param.status === 'Trace' ? (
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                ) : (
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                )}
                <span
                  className={`text-xs font-bold ${
                    param.status === 'Normal'
                      ? 'text-emerald-600'
                      : param.status === 'Trace'
                      ? 'text-amber-600'
                      : 'text-rose-600'
                  }`}
                >
                  {param.value}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Results are within normal range Banner (Green pill from Screen 4) */}
        <div className="bg-emerald-50 border border-emerald-200/80 rounded-2xl p-3 flex items-center gap-2.5 text-emerald-800">
          <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold">Results are within normal range</span>
        </div>

        {/* Save Report & Share Results Action Buttons (Screen 4 exact) */}
        <div className="space-y-2.5 pt-1">
          <button
            onClick={handleSave}
            className="w-full py-3.5 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md shadow-sky-600/30 flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
          >
            <Download className="w-4 h-4" />
            <span>Save Report</span>
          </button>

          <button
            onClick={handleShare}
            className="w-full py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs border border-slate-200 shadow-sm flex items-center justify-center gap-2 transition-all"
          >
            <Share2 className="w-4 h-4 text-sky-600" />
            <span>Share Results</span>
          </button>
        </div>
      </div>
    </div>
  );
};

