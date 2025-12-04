import { ArrowLeft, User, Globe, LogOut, ChevronRight, ChevronDown, Save } from 'lucide-react';
import { Page } from '../App';

import { Button } from './ui/button';
import { useAuth } from '../contexts/AuthContext';
import { useSettings } from '../contexts/SettingsContext';
import { translations } from '../contexts/translations';
import { useState } from 'react';

interface SettingsPageProps {
  onNavigate: (page: Page) => void;
}

export function SettingsPage({ onNavigate }: SettingsPageProps) {
  const { user, logout } = useAuth();
  const { language, setLanguage } = useSettings();
  
  // Estados para controlar expansão dos menus
  const [expandedFontSize, setExpandedFontSize] = useState(false);
  const [expandedLanguage, setExpandedLanguage] = useState(false);
  const [expandedProfile, setExpandedProfile] = useState(false);
  
  // Estado para edição de perfil
  const [editingProfile, setEditingProfile] = useState({ name: user?.nomeCompleto || '', course: user?.curso || '' });

  const handleLogout = () => {
    logout();
    onNavigate('login');
  };

  // Obter traduções baseadas no idioma atual
  const t = translations[language];

  const fontSizes = [
    { value: 'small' as const, label: t.fontSizes.small, size: 'text-sm' },
    { value: 'medium' as const, label: t.fontSizes.medium, size: 'text-base' },
    { value: 'large' as const, label: t.fontSizes.large, size: 'text-lg' },
    { value: 'xlarge' as const, label: t.fontSizes.xlarge, size: 'text-xl' }
  ];

  const languages = [
    { value: 'pt-BR' as const, label: 'Português (Brasil)' },
    { value: 'en-US' as const, label: 'English (United States)' }
  ];

  // Função para salvar perfil no backend
  const handleSaveProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          nomeCompleto: editingProfile.name,
          curso: editingProfile.course
        })
      });

      if (response.ok) {
        alert(t.profileUpdated);
        setExpandedProfile(false);
        // Atualizar o contexto de auth se necessário
        window.location.reload(); // Recarrega para atualizar dados do usuário
      } else {
        const errorData = await response.json();
        alert(`Erro: ${errorData.error || 'Erro ao atualizar perfil'}`);
      }
    } catch (error) {
      alert('Erro ao conectar com o servidor');
      console.error('Erro:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-6 text-white sticky top-0 z-10">
        <div className="flex items-center gap-4 mb-2">
          <button onClick={() => onNavigate('home')} className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-white">{t.settings}</h1>
        </div>
        <p className="text-white/80 text-sm">{language === 'pt-BR' ? 'Personalize sua experiência' : 'Customize your experience'}</p>
      </div>

      <div className="px-6 py-6">
        {/* Informações do Usuário */}
        {user && (
          <div className="mb-6">
            <h2 className="text-gray-900 mb-4">{t.profile}</h2>
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{user.nomeCompleto}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <p className="text-xs text-blue-600 capitalize">
                    {user.role === 'admin' ? `👑 ${t.administrator}` : `👤 ${t.user}`}
                  </p>
                </div>
              </div>
              <Button 
                onClick={handleLogout}
                variant="outline" 
                className="w-full flex items-center justify-center gap-2 text-red-600 border-red-200 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4" />
                {t.logoutAccount}
              </Button>
            </div>
          </div>
        )}

        {/* Painel de Administração */}
        {user?.role === 'admin' && (
          <div className="mb-6">
            <h2 className="text-gray-900 mb-4">👑 {t.administration}</h2>
            <div className="bg-gray-50 rounded-xl p-4 space-y-3">
              <p className="text-sm text-gray-600 mb-3">
                {t.adminTools}
              </p>
              
              <Button 
                onClick={async () => {
                  try {
                    const response = await fetch('/create-content', { method: 'POST' });
                    const result = await response.json();
                    alert('✅ ' + (language === 'pt-BR' ? 'Conteúdos iniciais criados com sucesso!' : 'Initial content created successfully!'));
                  } catch (error) {
                    alert('❌ ' + (language === 'pt-BR' ? 'Erro ao criar conteúdos' : 'Error creating content'));
                  }
                }}
                variant="outline" 
                className="w-full flex items-center justify-center gap-2 text-blue-600 border-blue-200 hover:bg-blue-50"
              >
                🧬 {t.createInitialContent}
              </Button>
            </div>
          </div>
        )}

        {/* Preferências do App */}
        <div className="mb-6">
          <h2 className="text-gray-900 mb-4">{t.appPreferences}</h2>
          
          <div className="bg-gray-50 rounded-xl overflow-hidden">
            {/* Idioma */}
            <button 
              onClick={() => setExpandedLanguage(!expandedLanguage)}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-gray-600" />
                <div className="text-left">
                  <h3 className="text-gray-900">{t.language}</h3>
                  <p className="text-sm text-gray-500">{languages.find(l => l.value === language)?.label}</p>
                </div>
              </div>
              {expandedLanguage ? <ChevronDown className="w-5 h-5 text-gray-400" /> : <ChevronRight className="w-5 h-5 text-gray-400" />}
            </button>

            {expandedLanguage && (
              <div className="border-t border-gray-200 bg-white p-4 space-y-2">
                {languages.map((lang) => (
                  <button
                    key={lang.value}
                    onClick={() => setLanguage(lang.value)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      language === lang.value 
                        ? 'bg-blue-50 text-blue-600 border-2 border-blue-200' 
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Dados Pessoais */}
        <div className="mb-6">
          <h2 className="text-gray-900 mb-4">{t.personalData}</h2>
          
          <div className="bg-gray-50 rounded-xl overflow-hidden">
            {/* Editar perfil */}
            <button 
              onClick={() => setExpandedProfile(!expandedProfile)}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-gray-600" />
                <div className="text-left">
                  <h3 className="text-gray-900">{t.editProfile}</h3>
                  <p className="text-sm text-gray-500">{t.nameAndCourse}</p>
                </div>
              </div>
              {expandedProfile ? <ChevronDown className="w-5 h-5 text-gray-400" /> : <ChevronRight className="w-5 h-5 text-gray-400" />}
            </button>

            {expandedProfile && (
              <div className="border-t border-gray-200 bg-white p-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.fullName}
                  </label>
                  <input
                    type="text"
                    value={editingProfile.name}
                    onChange={(e) => setEditingProfile({...editingProfile, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={language === 'pt-BR' ? 'Seu nome completo' : 'Your full name'}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.course}
                  </label>
                  <input
                    type="text"
                    value={editingProfile.course}
                    onChange={(e) => setEditingProfile({...editingProfile, course: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={t.courseExample}
                  />
                </div>

                <Button 
                  onClick={handleSaveProfile}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {t.saveChanges}
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Informações adicionais */}
        <div className="mt-8 text-center space-y-2">
          <p className="text-sm text-gray-500">Versão 1.0.0</p>
        </div>
      </div>
    </div>
  );
}