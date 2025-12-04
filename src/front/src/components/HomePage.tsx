import { useState, useEffect } from 'react';
import { Dna, Atom, User, BookOpen } from 'lucide-react';
import { Page, Structure } from '../App';
import { StructureCard } from './StructureCard';
import { useSettings } from '../contexts/SettingsContext';
import { translations } from '../contexts/translations';

interface HomePageProps {
  onNavigate: (page: Page) => void;
  onSelectStructure: (structure: Structure) => void;
}

export function HomePage({ onNavigate, onSelectStructure }: HomePageProps) {
  const [featuredStructures, setFeaturedStructures] = useState<Structure[]>([]);
  const [loading, setLoading] = useState(true);
  const { language } = useSettings();
  const t = translations[language];

  // Carregar estruturas em destaque do backend
  useEffect(() => {
    const fetchFeaturedStructures = async () => {
      try {
        const response = await fetch('/api/content/');
        if (response.ok) {
          const data = await response.json();
          
          // Mapear dados e pegar apenas 2 para destaque
          const mappedStructures: Structure[] = data.slice(0, 2).map((content: any) => {
            const categoryMapping: Record<string, 'DNA' | 'Proteínas' | 'Células' | 'Corpo Humano'> = {
              'DNA': 'DNA',
              'Proteinas': 'Proteínas', 
              'Anatomia': 'Células'
            };

            return {
              id: content.marker_key,
              title: content.titulo,
              category: categoryMapping[content.tema] || 'Células',
              description: content.descricao_curta,
              fullDescription: content.descricao_completa,
              imageUrl: content.imagem_url || '/images/placeholder.jpg',
              composition: content.caracteristicas?.join(', '),
              curiosities: content.curiosidades,
              molecularStructure: content.glb_file_name,
              functions: content.caracteristicas
            };
          });
          
          setFeaturedStructures(mappedStructures);
        }
      } catch (error) {
        console.error('Erro ao carregar estruturas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedStructures();
  }, []);

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      {/* Header do Usuário */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8 text-white">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-white">{t.welcome}</h1>
            <p className="text-white/80 text-sm">{t.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Navegação Rápida */}
      <div className="px-6 py-6">
        <div className="grid grid-cols-3 gap-4">
          <button
            onClick={() => onNavigate('structures')}
            className="flex flex-col items-center gap-3 p-4 bg-gradient-to-br from-purple-100 to-purple-50 rounded-2xl hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Dna className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm text-gray-700">DNA</span>
          </button>

          <button
            onClick={() => onNavigate('structures')}
            className="flex flex-col items-center gap-3 p-4 bg-gradient-to-br from-pink-100 to-pink-50 rounded-2xl hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center">
              <Atom className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm text-gray-700">Proteínas</span>
          </button>

          <button
            onClick={() => onNavigate('structures')}
            className="flex flex-col items-center gap-3 p-4 bg-gradient-to-br from-orange-100 to-orange-50 rounded-2xl hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm text-gray-700">Corpo Humano</span>
          </button>
        </div>
      </div>

      {/* Explore Estruturas */}
      <div className="px-6 pb-6">
        <h2 className="text-gray-900 mb-4">Explore Estruturas Biológicas</h2>
        
        {loading && (
          <div className="text-center py-8">
            <div className="text-2xl mb-2">🧬</div>
            <p className="text-gray-500 text-sm">Carregando estruturas...</p>
          </div>
        )}

        {!loading && (
          <div className="space-y-4">
            {featuredStructures.map((structure) => (
              <StructureCard
                key={structure.id}
                structure={structure}
                onSelect={onSelectStructure}
              />
            ))}
            
            {featuredStructures.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500 text-sm">Nenhuma estrutura disponível</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Tutorial / Calibração */}
      <div className="px-6 pb-6">
        <h2 className="text-gray-900 mb-4">Tutorial RA / Calibração</h2>
        <button
          onClick={() => onNavigate('tutorial')}
          className="w-full bg-gray-50 rounded-xl p-4 flex items-start gap-4 hover:bg-gray-100 transition-colors"
        >
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex-1 text-left">
            <h3 className="text-gray-900 mb-1">Como usar a RA?</h3>
            <p className="text-sm text-gray-500">Guia de como usar o app.</p>
          </div>
          <div className="text-right">
            <span className="text-xs text-gray-400">Publicado em</span>
            <p className="text-sm text-gray-600">2025</p>
          </div>
        </button>
      </div>

      {/* Contribuições */}
      <div className="px-6 pb-8">
        <h2 className="text-gray-900 mb-4">Contribuir com Estruturas</h2>
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <User className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-gray-900 mb-2 font-medium">Tenha sua estrutura na plataforma</h3>
              <p className="text-sm text-gray-600 mb-3">
                Para contribuir com novas estruturas biológicas para a plataforma, entre em contato conosco:
              </p>
              <a 
                href="mailto:admin@ufcspa.edu.br" 
                className="inline-flex items-center gap-2 text-sm text-green-700 font-medium hover:text-green-800 transition-colors"
              >
                <span>admin@ufcspa.edu.br</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
