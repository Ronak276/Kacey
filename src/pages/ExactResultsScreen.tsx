import React from 'react';
import { ChevronLeft, Share2, Check, Download, AlertCircle, AlertTriangle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ExactResultsScreen: React.FC = () => {
  const { setActiveTab, currentTestResult, navigateToReportDetail } = useApp();

  const result = currentTestResult;

  if (!result) {
    return (
      <div className="relative w-full h-full flex flex-col items-center justify-center bg-white p-6 text-center select-none">
        <AlertCircle className="w-12 h-12 text-slate-300 mb-3" />
        <h2 className="text-base font-bold text-slate-800">No Recent Scan Found</h2>
        <p className="text-xs text-slate-500 mt-1 mb-4">Please scan a reagent test strip to view diagnostic findings.</p>
        <button
          onClick={() => setActiveTab('scanner')}
          className="px-5 py-2.5 rounded-full bg-[#0070d2] text-white text-xs font-bold shadow-md cursor-pointer"
        >
          Open Scanner
        </button>
      </div>
    );
  }

  const isNormal = result.overallStatus === 'Normal';
  const isTrace = result.overallStatus === 'Trace';
  const isPositive = result.overallStatus === 'Positive';
  const isAbnormal = result.overallStatus === 'Abnormal';

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Normal':
        return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      case 'Trace':
        return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'Positive':
      case 'Abnormal':
        return 'text-rose-600 bg-rose-50 border-rose-200';
      default:
        return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  const getStatusDot = (status: string) => {
    switch (status) {
      case 'Normal':
        return 'bg-emerald-500';
      case 'Trace':
        return 'bg-amber-400';
      case 'Positive':
      case 'Abnormal':
        return 'bg-rose-500';
      default:
        return 'bg-slate-400';
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-white overflow-y-auto no-scrollbar pb-16 select-none font-sans">
      {/* Header: < Test Results [Share] */}
      <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-slate-100 sticky top-0 bg-white/95 backdrop-blur-md z-10">
        <button
          onClick={() => setActiveTab('home')}
          className="text-slate-800 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 cursor-pointer transition-colors"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
        </button>

        <h1 className="text-sm font-bold text-slate-800">Test Results</h1>

        <button
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: `${result.animalName} - Diagnostic Test`,
                text: `${result.testName}: ${result.overallStatus} (${result.summaryNotes})`,
              }).catch(() => {});
            }
          }}
          className="text-slate-800 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 cursor-pointer transition-colors"
          title="Share Results"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      <div className="px-5 py-4 space-y-4">
        {/* Dynamic Status Icon & Heading */}
        <div className="flex flex-col items-center text-center">
          {isNormal ? (
            <div className="w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20 mb-2">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
          ) : isTrace ? (
            <div className="w-14 h-14 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/20 mb-2">
              <AlertTriangle className="w-7 h-7 stroke-[2.5]" />
            </div>
          ) : (
            <div className="w-14 h-14 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-lg shadow-rose-500/20 mb-2">
              <AlertCircle className="w-7 h-7 stroke-[2.5]" />
            </div>
          )}

          <h2 className="text-base font-extrabold text-slate-900">
            {isNormal ? 'Test Completed!' : `${result.overallStatus} Finding Detected`}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Patient: <span className="font-bold text-slate-700">{result.animalName}</span> ({result.animalBreed})
          </p>
        </div>

        {/* Dynamic Test Title & Timestamp */}
        <div className="flex items-center justify-between py-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className={`w-2.5 h-2.5 rounded-full ${getStatusDot(result.overallStatus)}`}></div>
            <span className="text-xs font-bold text-slate-900">{result.testName}</span>
          </div>
          <span className="text-[11px] text-slate-400 font-medium">{result.timestamp}</span>
        </div>

        {/* Dynamic Reagent Pad Color Strip Preview */}
        {result.stripPads && result.stripPads.length > 0 && (
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-2.5 flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-600">Detected Optical Pads:</span>
            <div className="flex items-center gap-1.5 p-1 bg-white rounded-lg border border-slate-200/80 shadow-2xs">
              {result.stripPads.map((color, idx) => (
                <div
                  key={idx}
                  className="w-4 h-4 rounded-sm border border-slate-300 shadow-2xs"
                  style={{ backgroundColor: color }}
                  title={`Pad ${idx + 1}: ${color}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Dynamic Parameters List parsed by Gemini AI */}
        <div className="space-y-3 pt-1 text-xs">
          {result.parameters && result.parameters.length > 0 ? (
            result.parameters.map((param) => (
              <div key={param.id} className="flex items-center justify-between py-0.5">
                <div className="flex items-center gap-2">
                  {param.padColorHex && (
                    <span
                      className="w-2.5 h-2.5 rounded-xs border border-slate-300 shadow-2xs shrink-0"
                      style={{ backgroundColor: param.padColorHex }}
                    />
                  )}
                  <span className="text-slate-700 font-medium">{param.name}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${getStatusDot(param.status)}`}></span>
                  <span
                    className={`font-semibold ${
                      param.status === 'Normal'
                        ? 'text-emerald-600'
                        : param.status === 'Trace'
                        ? 'text-amber-500'
                        : 'text-rose-600'
                    }`}
                  >
                    {param.value}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-xs text-slate-400 italic text-center py-2">No parameter details available</p>
          )}
        </div>

        {/* Dynamic Summary Banner */}
        <div
          className={`rounded-2xl p-3 flex items-start gap-2.5 border ${getStatusColor(
            result.overallStatus
          )}`}
        >
          <div
            className={`w-5 h-5 rounded-full text-white flex items-center justify-center shrink-0 mt-0.5 ${getStatusDot(
              result.overallStatus
            )}`}
          >
            {isNormal ? (
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            ) : (
              <AlertCircle className="w-3.5 h-3.5 stroke-[3]" />
            )}
          </div>
          <div className="text-xs">
            <span className="font-bold block leading-tight">
              {isNormal ? 'All values within normal clinical range' : `Attention: ${result.overallStatus} result`}
            </span>
            <p className="text-[11px] mt-0.5 opacity-90 leading-normal">{result.summaryNotes}</p>
          </div>
        </div>

        {/* Actions: Save Report & Share Results */}
        <div className="space-y-2 pt-2">
          <button
            onClick={() => navigateToReportDetail(result)}
            className="w-full py-3 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md shadow-sky-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>View Full Report</span>
          </button>

          <button
            onClick={() => setActiveTab('scanner')}
            className="w-full py-3 rounded-2xl bg-white hover:bg-slate-50 text-sky-700 font-bold text-xs border border-sky-200 shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>Scan Another Strip</span>
          </button>
        </div>
      </div>
    </div>
  );
};
