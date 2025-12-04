import { Home, Info, Settings } from 'lucide-react';
import { Page } from '../App';
import { useSettings } from '../contexts/SettingsContext';
import { translations } from '../contexts/translations';

interface BottomNavProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export function BottomNav({ currentPage, onNavigate }: BottomNavProps) {
  const { language } = useSettings();
  const t = translations[language];
  
  const isActive = (page: Page) => {
    if (page === 'home' && (currentPage === 'home' || currentPage === 'structures' || currentPage === 'structure-detail' || currentPage === 'tutorial')) {
      return true;
    }
    return currentPage === page;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 max-w-md mx-auto">
      <div className="flex justify-around items-center">
        <button
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
            isActive('home') ? 'text-blue-600' : 'text-gray-500'
          }`}
        >
          <Home className="w-6 h-6" />
          <span className="text-xs">{t.home}</span>
        </button>
        <button
          onClick={() => onNavigate('info')}
          className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
            isActive('info') ? 'text-blue-600' : 'text-gray-500'
          }`}
        >
          <Info className="w-6 h-6" />
          <span className="text-xs">{t.info}</span>
        </button>
        <button
          onClick={() => onNavigate('settings')}
          className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
            isActive('settings') ? 'text-blue-600' : 'text-gray-500'
          }`}
        >
          <Settings className="w-6 h-6" />
          <span className="text-xs">{t.settings}</span>
        </button>
      </div>
    </nav>
  );
}
