import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface SettingsContextType {
  // Configurações visuais
  language: 'pt-BR' | 'en-US';
  
  // Funções para alterar configurações
  setLanguage: (lang: 'pt-BR' | 'en-US') => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

interface SettingsProviderProps {
  children: ReactNode;
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
  // Estado da configuração
  const [language, setLanguageState] = useState<'pt-BR' | 'en-US'>('pt-BR');

  // Carregar idioma do localStorage na inicialização
  useEffect(() => {
    const savedLanguage = localStorage.getItem('app-language') as 'pt-BR' | 'en-US';
    if (savedLanguage) setLanguageState(savedLanguage);
  }, []);

  // Função para alterar idioma e salvar no localStorage
  const setLanguage = (lang: 'pt-BR' | 'en-US') => {
    setLanguageState(lang);
    localStorage.setItem('app-language', lang);
  };

  const value: SettingsContextType = {
    language,
    setLanguage
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};