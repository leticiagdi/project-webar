import { useState } from 'react';
import { HomePage } from './components/HomePage';
import { StructuresPage } from './components/StructuresPage';
import { StructureDetail } from './components/StructureDetail';
import { TutorialPage } from './components/TutorialPage';
import { InfoPage } from './components/InfoPage';
import { SettingsPage } from './components/SettingsPage';
import { LoginPage } from './components/LoginPage';
import { BottomNav } from './components/BottomNav';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { SettingsProvider, useSettings } from './contexts/SettingsContext';

export type Page = 'home' | 'structures' | 'structure-detail' | 'tutorial' | 'info' | 'settings' | 'login';

export interface Structure {
  id: string;
  title: string;
  category: 'DNA' | 'Proteínas' | 'Células' | 'Corpo Humano';
  description: string;
  fullDescription: string;
  imageUrl: string;
  composition?: string;
  curiosities?: string[];
  molecularStructure?: string;
  functions?: string[];
}

function MainApp() {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [selectedStructure, setSelectedStructure] = useState<Structure | null>(null);
  const { user, isLoading } = useAuth();

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
  };

  const handleSelectStructure = (structure: Structure) => {
    setSelectedStructure(structure);
    setCurrentPage('structure-detail');
  };

  // Mostrar loading enquanto verifica autenticação
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🧬</div>
          <p>Carregando WebAR UFCSPA...</p>
        </div>
      </div>
    );
  }

  const renderPage = () => {
    // Se não está logado e não está na página de login, mostrar login
    if (!user && currentPage !== 'login') {
      return <LoginPage onNavigate={handleNavigate} />;
    }

    switch (currentPage) {
      case 'login':
        return <LoginPage onNavigate={handleNavigate} />;
      case 'home':
        return <HomePage onNavigate={handleNavigate} onSelectStructure={handleSelectStructure} />;
      case 'structures':
        return <StructuresPage onNavigate={handleNavigate} onSelectStructure={handleSelectStructure} />;
      case 'structure-detail':
        return <StructureDetail structure={selectedStructure} onNavigate={handleNavigate} onSelectStructure={handleSelectStructure} />;
      case 'tutorial':
        return <TutorialPage onNavigate={handleNavigate} />;
      case 'info':
        return <InfoPage onNavigate={handleNavigate} />;
      case 'settings':
        return <SettingsPage onNavigate={handleNavigate} />;
      default:
        return user ? <HomePage onNavigate={handleNavigate} onSelectStructure={handleSelectStructure} /> : <LoginPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {renderPage()}
      {user && currentPage !== 'login' && (
        <BottomNav currentPage={currentPage} onNavigate={handleNavigate} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <SettingsProvider>
      <AuthProvider>
        <MainApp />
      </AuthProvider>
    </SettingsProvider>
  );
}
