import React from 'react';
import { useApp } from './context/AppContext';
import { WelcomeAuthScreen } from './pages/WelcomeAuthScreen';
import { ExactDashboardScreen } from './pages/ExactDashboardScreen';
import { ExactScannerScreen } from './pages/ExactScannerScreen';
import { ExactResultsScreen } from './pages/ExactResultsScreen';
import { ExactAnimalProfileScreen } from './pages/ExactAnimalProfileScreen';
import { ExactHistoryScreen } from './pages/ExactHistoryScreen';
import { ExactReportDetailScreen } from './pages/ExactReportDetailScreen';
import { ExactSettingsScreen } from './pages/ExactSettingsScreen';
import { ExactNotificationScreen } from './pages/ExactNotificationScreen';
import { ExactBottomNav } from './components/ExactBottomNav';

export const App: React.FC = () => {
  const { isLoggedIn, activeTab } = useApp();

  const renderCurrentContent = () => {
    // When not logged in, show Welcome Screen
    if (!isLoggedIn) {
      return (
        <div key="auth" className="w-full h-full screen-transition">
          <WelcomeAuthScreen />
        </div>
      );
    }

    // When signed in, directly render active screen
    switch (activeTab) {
      case 'home':
        return (
          <div key="home" className="w-full h-full screen-transition">
            <ExactDashboardScreen />
          </div>
        );
      case 'scanner':
        return (
          <div key="scanner" className="w-full h-full screen-transition">
            <ExactScannerScreen />
          </div>
        );
      case 'results':
        return (
          <div key="results" className="w-full h-full screen-transition">
            <ExactResultsScreen />
          </div>
        );
      case 'animals':
      case 'animal-detail':
        return (
          <div key="animal" className="w-full h-full screen-transition">
            <ExactAnimalProfileScreen />
          </div>
        );
      case 'history':
        return (
          <div key="history" className="w-full h-full screen-transition">
            <ExactHistoryScreen />
          </div>
        );
      case 'report-detail':
        return (
          <div key="report" className="w-full h-full screen-transition">
            <ExactReportDetailScreen />
          </div>
        );
      case 'profile':
        return (
          <div key="settings" className="w-full h-full screen-transition">
            <ExactSettingsScreen />
          </div>
        );
      case 'notifications':
        return (
          <div key="notifications" className="w-full h-full screen-transition">
            <ExactNotificationScreen />
          </div>
        );
      default:
        return (
          <div key="default" className="w-full h-full screen-transition">
            <ExactDashboardScreen />
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 w-full h-full md:bg-gradient-to-br md:from-[#f0f6ff] md:via-[#e2edfc] md:to-[#edf4fc] bg-white flex flex-col items-center justify-start md:justify-center p-0 md:p-6 select-none font-sans overflow-hidden">
      {/* Mobile Device Frame: Zero top gap on mobile, exact native viewport */}
      <div className="relative w-full h-full md:h-[844px] md:max-w-[390px] mx-auto bg-white md:rounded-[48px] overflow-hidden md:shadow-[0_25px_60px_rgba(0,0,0,0.25),0_0_0_10px_#0f172a,0_0_0_12px_#334155] md:border-[3px] md:border-black flex flex-col">
        {/* iOS Top Status Bar (9:41) with Speaker Notch - ONLY visible on Desktop Mockup frame (md:flex), completely HIDDEN on real mobile */}
        <div
          className={`hidden md:flex relative w-full pt-3 px-6 pb-1 items-center justify-between text-[13px] font-semibold z-50 select-none shrink-0 ${
            activeTab === 'scanner' && isLoggedIn ? 'text-white' : 'text-slate-900'
          }`}
        >
          <span>9:41</span>

          {/* Notch Speaker */}
          <div className="absolute left-1/2 -translate-x-1/2 top-2.5 w-24 h-4 bg-slate-950 rounded-full flex items-center justify-end px-2">
            <div className="w-2 h-2 rounded-full bg-slate-900 border border-slate-800"></div>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-bold">
            <span className="text-[10px]">5G</span>
            <div className="w-5 h-2.5 border border-current rounded-sm p-[1px] flex items-center">
              <div className="w-full h-full bg-current rounded-[1px]"></div>
            </div>
          </div>
        </div>

        {/* Live Screen Content - Fully native & fixed layout with zero bouncing */}
        <div className="flex-1 w-full h-full overflow-hidden relative flex flex-col bg-white">
          {renderCurrentContent()}

          {/* Persistent Bottom Bar when logged in - Hidden on Report Detail */}
          {isLoggedIn && activeTab !== 'report-detail' && <ExactBottomNav />}
        </div>
      </div>
    </div>
  );
};

export default App;
