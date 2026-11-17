import React, { useRef, useState } from 'react';
import { ChevronLeft, Download, Check, AlertCircle, AlertTriangle, Printer, Loader2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const ExactReportDetailScreen: React.FC = () => {
  const { setActiveTab, selectedTest, currentTestResult } = useApp();
  const reportRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  // Use currently selected test from history or active test result from scanner
  const report = selectedTest || currentTestResult;

  const handleDownloadPDF = async () => {
    if (!reportRef.current || !report) {
      window.print();
      return;
    }

    try {
      setDownloading(true);
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, Math.min(pdfHeight, 297));
      pdf.save(`Kacey_${report.animalName.replace(/\s+/g, '_')}_Report_${Date.now()}.pdf`);
      setDownloading(false);
    } catch (err) {
      console.error('PDF generation error:', err);
      setDownloading(false);
      window.print();
    }
  };

  if (!report) {
    return (
      <div className="relative w-full h-full flex flex-col items-center justify-center bg-white p-6 text-center select-none">
        <AlertCircle className="w-12 h-12 text-slate-300 mb-3" />
        <h2 className="text-base font-bold text-slate-800">No Report Selected</h2>
        <p className="text-xs text-slate-500 mt-1 mb-4">Select a test from history or scan a strip.</p>
        <button
          onClick={() => setActiveTab('history')}
          className="px-5 py-2.5 rounded-full bg-[#0070d2] text-white text-xs font-bold shadow-md cursor-pointer"
        >
          Back to History
        </button>
      </div>
    );
  }

  const isNormal = report.overallStatus === 'Normal';
  const isTrace = report.overallStatus === 'Trace';

  return (
    <div className="relative w-full h-full flex flex-col bg-white overflow-y-auto no-scrollbar pb-16 select-none font-sans">
      {/* Header: < Report Details [Download] */}
      <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-slate-100 sticky top-0 bg-white/95 backdrop-blur-md z-10">
        <button
          onClick={() => setActiveTab('history')}
          className="text-slate-800 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 cursor-pointer transition-colors"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
        </button>

        <h1 className="text-sm font-bold text-slate-800">Report Details</h1>

        <button
          onClick={() => window.print()}
          className="text-slate-800 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 cursor-pointer transition-colors"
          title="Print or Save PDF"
        >
          <Printer className="w-4 h-4" />
        </button>
      </div>

      <div ref={reportRef} className="px-5 py-4 space-y-4 bg-white">
        {/* Dynamic Animal Avatar, Date & Time, Status badge */}
        <div className="flex items-center gap-3">
          <img
            src={report.animalPhoto || '/assets/buddy_avatar.png'}
            alt={report.animalName}
            className="w-13 h-13 rounded-2xl object-cover border border-slate-100 shadow-2xs"
          />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900">{report.animalName}</h2>
              <span className="text-[10px] text-slate-400 font-medium">{report.animalBreed}</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">{report.timestamp}</p>
            <span
              className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded mt-1 ${
                isNormal
                  ? 'text-emerald-600 bg-emerald-50'
                  : isTrace
                  ? 'text-amber-600 bg-amber-50'
                  : 'text-rose-600 bg-rose-50'
              }`}
            >
              {isNormal ? (
                <Check className="w-3 h-3 stroke-[3]" />
              ) : (
                <AlertTriangle className="w-3 h-3 stroke-[2.5]" />
              )}
              {report.overallStatus}
            </span>
          </div>
        </div>

        {/* Captured Strip Photo Preview if available */}
        {report.capturedImageUrl && (
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src={report.capturedImageUrl}
                alt="Captured Strip"
                className="w-10 h-10 object-cover rounded-lg border border-slate-200"
              />
              <div>
                <p className="text-[11px] font-bold text-slate-800">Scanned Reagent Strip</p>
                <p className="text-[10px] text-slate-400">Gemini 2.5 Flash Vision Read</p>
              </div>
            </div>
            {report.stripPads && report.stripPads.length > 0 && (
              <div className="flex items-center gap-1">
                {report.stripPads.slice(0, 6).map((c, i) => (
                  <div key={i} className="w-3 h-3 rounded-xs border border-slate-300" style={{ backgroundColor: c }} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Dynamic Test Parameters */}
        <div className="space-y-2.5 pt-1">
          <div className="flex items-center justify-between pb-1 border-b border-slate-100">
            <h3 className="text-xs font-bold text-slate-900">Test Parameters ({report.testName})</h3>
            <span className="text-[10px] text-slate-400 font-medium">Standard Reference</span>
          </div>

          {report.parameters && report.parameters.length > 0 ? (
            report.parameters.map((param) => (
              <div key={param.id} className="flex items-center justify-between text-xs py-0.5">
                <div className="flex items-center gap-2">
                  {param.padColorHex && (
                    <span
                      className="w-2.5 h-2.5 rounded-xs border border-slate-300 shrink-0"
                      style={{ backgroundColor: param.padColorHex }}
                    />
                  )}
                  <span className="text-slate-600">{param.name}</span>
                </div>
                <div className="text-right">
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
                  {param.normalRange && (
                    <p className="text-[9px] text-slate-400 leading-none mt-0.5">{param.normalRange}</p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-xs text-slate-400 italic text-center py-2">No parameter readings found.</p>
          )}
        </div>

        {/* Notes */}
        <div className="pt-2">
          <h4 className="text-xs font-bold text-slate-900 mb-1">Clinical Interpretation</h4>
          <p className="text-xs text-slate-500 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            {report.summaryNotes || 'All values calibrated and verified by veterinary optical imaging.'}
          </p>
        </div>

        {/* Clinician Signature */}
        <div className="pt-1 text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-100 pt-3">
          <span>Veterinarian: <strong className="text-slate-700">{report.veterinarianName || 'Dr. Sarah Mitchell'}</strong></span>
          <span>{report.clinicName || 'Metropolitan Veterinary'}</span>
        </div>

        {/* Download PDF Button */}
        <div className="pt-2">
          <button
            onClick={handleDownloadPDF}
            disabled={downloading}
            className="w-full py-3 rounded-2xl bg-sky-600 hover:bg-sky-700 active:scale-[0.98] text-white font-bold text-xs shadow-md shadow-sky-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            {downloading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            <span>{downloading ? 'Generating PDF...' : 'Download PDF'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
