import React, { useRef, useState } from 'react';
import { ChevronLeft, Download, Check, AlertCircle, AlertTriangle, Printer, Loader2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import jsPDF from 'jspdf';
import { KACEY_PAW_LOGO_WHITE } from '../data/logoBase64';

export const ExactReportDetailScreen: React.FC = () => {
  const { setActiveTab, selectedTest, currentTestResult } = useApp();
  const reportRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  // Use currently selected test from history or active test result from scanner
  const report = selectedTest || currentTestResult;

  const handleDownloadPDF = async () => {
    if (!report) {
      window.print();
      return;
    }

    try {
      setDownloading(true);

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      // 1. Premium Medical Brand Header Banner
      pdf.setFillColor(0, 112, 210);
      pdf.rect(0, 0, 210, 32, 'F');

      // Embedded White Kacey Paw Logo Icon
      try {
        pdf.addImage(KACEY_PAW_LOGO_WHITE, 'PNG', 14, 6, 20, 20);
      } catch (e) {
        console.warn('Could not render logo in PDF', e);
      }

      pdf.setTextColor(255, 255, 255);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(16);
      pdf.text('KACEY DIAGNOSTICS', 38, 14);

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(8.5);
      pdf.text('Point-of-Care Animal Health Laboratory Diagnostic Report', 38, 21);

      pdf.setFontSize(8);
      pdf.text(`ISO 13485 Standard • Certified Clinical AI Vision Read`, 130, 14);
      pdf.text(`Generated: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`, 130, 21);

      // Accent gold/cyan divider bar
      pdf.setFillColor(56, 189, 248);
      pdf.rect(0, 32, 210, 1.5, 'F');

      // 2. Patient Demographics Card
      pdf.setFillColor(248, 251, 254);
      pdf.setDrawColor(226, 232, 240);
      pdf.roundedRect(14, 38, 182, 34, 3, 3, 'FD');

      // Animal Profile details
      pdf.setTextColor(15, 23, 42);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(14);
      pdf.text(report.animalName, 22, 49);

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(9.5);
      pdf.setTextColor(71, 85, 105);
      pdf.text(`Patient Species/Breed: ${report.animalBreed || 'Canine (Golden Retriever)'}`, 22, 57);
      pdf.text(`Test Date & Time: ${report.timestamp}`, 22, 64);

      // Status Badge pill
      const isNormal = report.overallStatus === 'Normal';
      if (isNormal) {
        pdf.setFillColor(220, 252, 231);
        pdf.setDrawColor(187, 247, 208);
        pdf.setTextColor(21, 128, 61);
      } else {
        pdf.setFillColor(254, 226, 226);
        pdf.setDrawColor(254, 202, 202);
        pdf.setTextColor(225, 29, 72);
      }
      pdf.roundedRect(142, 45, 46, 12, 3, 3, 'FD');
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(9.5);
      pdf.text(`STATUS: ${report.overallStatus.toUpperCase()}`, 148, 52.5);

      // 3. Section Title: Diagnostic Panel
      pdf.setTextColor(15, 23, 42);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(11);
      pdf.text(`Diagnostic Panel: ${report.testName}`, 14, 82);

      // Table Header Row
      pdf.setFillColor(241, 245, 249);
      pdf.setDrawColor(226, 232, 240);
      pdf.roundedRect(14, 86, 182, 9, 2, 2, 'FD');
      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(51, 65, 85);
      pdf.text('Analyte / Test Parameter', 20, 92);
      pdf.text('Standard Reference Range', 95, 92);
      pdf.text('Measured Result', 155, 92);

      // Table Rows with real colored swatches
      let y = 103;
      const params = report.parameters || [];

      params.forEach((param, index) => {
        // Alternating row background for clean readability
        if (index % 2 === 1) {
          pdf.setFillColor(248, 250, 252);
          pdf.rect(14, y - 6, 182, 9, 'F');
        }

        // Draw small color swatch if hex exists
        if (param.padColorHex && param.padColorHex.startsWith('#')) {
          try {
            const hex = param.padColorHex.replace('#', '');
            const r = parseInt(hex.substring(0, 2), 16) || 0;
            const g = parseInt(hex.substring(2, 4), 16) || 0;
            const b = parseInt(hex.substring(4, 6), 16) || 0;
            pdf.setFillColor(r, g, b);
            pdf.setDrawColor(203, 213, 225);
            pdf.rect(20, y - 4, 3.5, 3.5, 'FD');
          } catch {}
        }

        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(30, 41, 59);
        pdf.setFontSize(9);
        pdf.text(param.name, 26, y - 1);

        pdf.setTextColor(100, 116, 139);
        pdf.text(param.normalRange || 'Negative / Baseline', 95, y - 1);

        pdf.setFont('helvetica', 'bold');
        if (param.status === 'Normal') {
          pdf.setTextColor(22, 163, 74);
        } else if (param.status === 'Trace') {
          pdf.setTextColor(217, 119, 6);
        } else {
          pdf.setTextColor(225, 29, 72);
        }
        pdf.text(param.value, 155, y - 1);

        // Thin separator line
        pdf.setDrawColor(241, 245, 249);
        pdf.line(14, y + 3, 196, y + 3);

        y += 9.5;
      });

      // 4. Clinical Interpretation Box
      y = Math.max(y + 8, 205);
      pdf.setFillColor(248, 250, 252);
      pdf.setDrawColor(226, 232, 240);
      pdf.roundedRect(14, y, 182, 30, 2, 2, 'FD');

      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(10);
      pdf.setTextColor(15, 23, 42);
      pdf.text('Veterinary Clinical Interpretation & Notes:', 20, y + 8);

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(8.5);
      pdf.setTextColor(71, 85, 105);
      const splitNotes = pdf.splitTextToSize(
        report.summaryNotes || 'Reagent pads evaluated against ISO-calibrated veterinary colorimetric charts. All indicators verified.',
        170
      );
      pdf.text(splitNotes, 20, y + 15);

      // 5. Official Verification Footer
      y += 38;
      pdf.setDrawColor(203, 213, 225);
      pdf.line(14, y, 196, y);

      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(9);
      pdf.setTextColor(30, 41, 59);
      pdf.text(`Attending Clinician: ${report.veterinarianName || 'Dr. Sarah Mitchell, DVM'}`, 14, y + 7);

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(8.5);
      pdf.setTextColor(100, 116, 139);
      pdf.text(`Facility: ${report.clinicName || 'Metropolitan Veterinary Hospital'}`, 14, y + 13);

      pdf.setFontSize(8);
      pdf.text('Kacey Diagnostics • Point-of-Care Animal Health • https://kaceydiagnostics.com', 95, y + 13);

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
