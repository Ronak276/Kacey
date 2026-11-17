import React from 'react';
import {
  ChevronLeft,
  Download,
  Share2,
  Calendar,
  Clock,
  Printer,
  CheckCircle2,
  AlertTriangle,
  Building2,
  User,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useToast } from '../context/ToastContext';

export const ReportDetailPage: React.FC = () => {
  const { selectedTest, setActiveTab, vetProfile } = useApp();
  const { toast } = useToast();

  const report = selectedTest;

  if (!report) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <p className="text-sm text-slate-500">No report selected.</p>
        <button
          onClick={() => setActiveTab('history')}
          className="mt-4 px-4 py-2 bg-sky-600 text-white rounded-xl text-xs font-semibold"
        >
          View Test History
        </button>
      </div>
    );
  }

  const handleDownloadPdf = () => {
    toast({
      title: 'Downloading Certified Report',
      description: `Kacey_Diagnostics_${report.animalName}_${report.id}.pdf generated.`,
      variant: 'success',
    });

    // Simulate instant download trigger
    const printableWindow = window.open('', '_blank');
    if (printableWindow) {
      printableWindow.document.write(`
        <html>
          <head>
            <title>Kacey Diagnostics Lab Report - ${report.animalName}</title>
            <style>
              body { font-family: sans-serif; padding: 40px; color: #1e293b; }
              h1 { color: #0284c7; }
              table { width: 100%; border-collapse: collapse; margin-top: 20px; }
              th, td { border: 1px solid #cbd5e1; padding: 10px; text-align: left; }
              th { background: #f8fafc; }
            </style>
          </head>
          <body>
            <h1>Kacey Diagnostics Veterinary Laboratory</h1>
            <p><strong>Test:</strong> ${report.testName}</p>
            <p><strong>Patient:</strong> ${report.animalName} (${report.animalBreed})</p>
            <p><strong>Date:</strong> ${report.timestamp}</p>
            <p><strong>Veterinarian:</strong> ${report.veterinarianName}</p>
            <table>
              <tr><th>Parameter</th><th>Value</th><th>Status</th></tr>
              ${report.parameters
                .map(
                  (p) => `<tr><td>${p.name}</td><td>${p.value}</td><td>${p.status}</td></tr>`
                )
                .join('')}
            </table>
            <p style="margin-top: 20px;"><strong>Summary Notes:</strong> ${report.summaryNotes}</p>
            <p style="margin-top: 40px; font-size: 11px; color: #64748b;">Certified by Kacey Diagnostics AI Strip Engine.</p>
          </body>
        </html>
      `);
      printableWindow.document.close();
      printableWindow.print();
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 relative pb-10 overflow-y-auto">
      {/* Top Header Navigation (Screen 7 Exact: Report Details with Download icon) */}
      <div className="bg-white px-5 pt-4 pb-3 flex items-center justify-between border-b border-slate-100 shadow-sm sticky top-0 z-20">
        <button
          onClick={() => setActiveTab('history')}
          className="w-9 h-9 rounded-xl bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-700"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <h1 className="text-sm font-bold text-slate-800">Report Details</h1>

        <button
          onClick={handleDownloadPdf}
          className="w-9 h-9 rounded-xl bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-700"
          title="Download PDF"
        >
          <Download className="w-4 h-4" />
        </button>
      </div>

      <div className="px-5 py-4 space-y-4">
        {/* Header Profile Snippet matching Screen 7 (Buddy, Date & Time, Normal pill) */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center gap-3.5">
          <img
            src={report.animalPhoto}
            alt={report.animalName}
            className="w-14 h-14 rounded-2xl object-cover ring-2 ring-sky-100 shadow-sm"
          />
          <div className="flex-1">
            <h2 className="text-sm font-bold text-slate-900">{report.animalName}</h2>
            <p className="text-[11px] text-slate-400 font-medium">{report.timestamp}</p>
            <div className="mt-1">
              <span
                className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md ${
                  report.overallStatus === 'Normal'
                    ? 'bg-emerald-50 text-emerald-600'
                    : 'bg-amber-50 text-amber-600'
                }`}
              >
                <CheckCircle2 className="w-3 h-3" />
                <span>{report.overallStatus}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Test Parameters Section (Exact layout from Screen 7) */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm space-y-3">
          <h3 className="text-xs font-bold text-slate-900 border-b border-slate-100 pb-2">
            Test Parameters
          </h3>

          <div className="space-y-2.5">
            {report.parameters.map((param) => (
              <div
                key={param.id}
                className="flex items-center justify-between py-1 border-b border-slate-50 last:border-none text-xs"
              >
                <span className="text-slate-600 font-medium">{param.name}</span>
                <span
                  className={`font-bold ${
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
            ))}
          </div>
        </div>

        {/* Clinical Notes Card matching Screen 7 */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm space-y-1.5">
          <h4 className="text-xs font-bold text-slate-900">Notes</h4>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            {report.summaryNotes || 'All values are within normal range.'}
          </p>
        </div>

        {/* Certified Veterinarian Sign-off */}
        <div className="bg-sky-50/60 rounded-2xl p-3 border border-sky-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-sky-600" />
            <div>
              <p className="text-[11px] font-bold text-slate-900">{report.veterinarianName}</p>
              <p className="text-[10px] text-slate-500">{report.clinicName}</p>
            </div>
          </div>
          <span className="text-[9px] bg-sky-200/60 text-sky-800 font-bold px-2 py-0.5 rounded-full">
            KACEY VERIFIED
          </span>
        </div>

        {/* Download PDF Button matching Screen 7 */}
        <div className="pt-2">
          <button
            onClick={handleDownloadPdf}
            className="w-full py-3.5 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md shadow-sky-600/30 flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};

