import { useState, useEffect } from 'react';
import { HomePage } from './components/HomePage';
import { StructuresPage } from './components/StructuresPage';
import { StructureDetail } from './components/StructureDetail';
import { TutorialPage } from './components/TutorialPage';
import { InfoPage } from './components/InfoPage';
import { SettingsPage } from './components/SettingsPage';
import { LoginPage } from './components/LoginPage';
import { BottomNav } from './components/BottomNav';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { SettingsProvider } from './contexts/SettingsContext';
import { ARViewer } from './components/ARViewer';

export type Page =
  | 'home'
  | 'structures'
  | 'structure-detail'
  | 'tutorial'
  | 'info'
  | 'settings'
  | 'login'
  | 'ar';

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
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const { user, isLoading } = useAuth();

  // Detecta ?model=xxxxx.glb e abre o modo AR
  useEffect(() => {
    const url = new URL(window.location.href);
    const model = url.searchParams.get("model");

    if (model) {
      setSelectedModel(model);
      setCurrentPage("ar");
    }
  }, []);

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
  };

  const handleSelectStructure = (structure: Structure) => {
    setSelectedStructure(structure);
    setCurrentPage('structure-detail');
  };

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
    if (!user && currentPage !== 'login') {
      return <LoginPage onNavigate={handleNavigate} />;
    }

    switch (currentPage) {
      case 'login':
        return <LoginPage onNavigate={handleNavigate} />;

      case 'home':
        return (
          <HomePage
            onNavigate={handleNavigate}
            onSelectStructure={handleSelectStructure}
          />
        );

      case 'structures':
        return (
          <StructuresPage
            onNavigate={handleNavigate}
            onSelectStructure={handleSelectStructure}
          />
        );

      case 'structure-detail':
        return (
          <StructureDetail
            structure={selectedStructure}
            onNavigate={handleNavigate}
            onSelectStructure={handleSelectStructure}
          />
        );

      case 'tutorial':
        return <TutorialPage onNavigate={handleNavigate} />;

      case 'info':
        return <InfoPage onNavigate={handleNavigate} />;

      case 'settings':
        return <SettingsPage onNavigate={handleNavigate} />;

      case 'ar':
        if (!selectedModel) {
          return <p>Nenhum modelo carregado.</p>;
        }
        return <ARViewer model={selectedModel} />;

      default:
        return user ? (
          <HomePage
            onNavigate={handleNavigate}
            onSelectStructure={handleSelectStructure}
          />
        ) : (
          <LoginPage onNavigate={handleNavigate} />
        );
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
