import { useState, useEffect } from 'react';
import { ArrowLeft, Eye, Info } from 'lucide-react';
import { Page, Structure } from '../App';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { StructureCard } from './StructureCard';

interface StructureDetailProps {
  structure: Structure | null;
  onNavigate: (page: Page) => void;
  onSelectStructure: (structure: Structure) => void;
}

export function StructureDetail({ structure, onNavigate, onSelectStructure }: StructureDetailProps) {
  const [relatedStructures, setRelatedStructures] = useState<Structure[]>([]);
  const [loading, setLoading] = useState(true);

  // Carregar estruturas relacionadas
  useEffect(() => {
    if (structure) {
      const fetchRelatedStructures = async () => {
        try {
          const response = await fetch('/api/content/');
          if (response.ok) {
            const data = await response.json();
            
            // Mapear e filtrar estruturas relacionadas
            const mappedStructures: Structure[] = data
              .filter((content: any) => content.marker_key !== structure.id) // Excluir a estrutura atual
              .slice(0, 2) // Pegar apenas 2 relacionadas
              .map((content: any) => {
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
            
            setRelatedStructures(mappedStructures);
          }
        } catch (error) {
          console.error('Erro ao carregar estruturas relacionadas:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchRelatedStructures();
    }
  }, [structure]);

  if (!structure) {
    return (
      <div className="max-w-md mx-auto bg-white min-h-screen p-6">
        <p className="text-gray-500">Estrutura não encontrada</p>
        <Button onClick={() => onNavigate('home')} className="mt-4">
          Voltar para Home
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      {/* Banner / Render prévio */}
      <div className="relative">
        <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100">
          <ImageWithFallback
            src={structure.imageUrl}
            alt={structure.title}
            className="w-full h-full object-cover"
          />
        </div>
        <button
          onClick={() => onNavigate('home')}
          className="absolute top-4 left-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg"
        >
          <ArrowLeft className="w-5 h-5 text-gray-900" />
        </button>
      </div>

      <div className="px-6 py-6">
        {/* Categoria */}
        <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm mb-3">
          {structure.category}
        </div>

        {/* Título */}
        <h1 className="text-gray-900 mb-4">{structure.title}</h1>

        {/* Botão primário AR */}
        <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white mb-6">
          <Eye className="w-5 h-5 mr-2" />
          Visualizar em AR
        </Button>

        {/* Descrição extensa */}
        <div className="mb-6">
          <h2 className="text-gray-900 mb-2 flex items-center gap-2">
            <Info className="w-5 h-5 text-blue-600" />
            Sobre esta estrutura
          </h2>
          <p className="text-gray-600 leading-relaxed">{structure.fullDescription}</p>
        </div>

        {/* Composição */}
        {structure.composition && (
          <div className="mb-6 p-4 bg-gray-50 rounded-xl">
            <h3 className="text-gray-900 mb-2">Composição</h3>
            <p className="text-gray-600">{structure.composition}</p>
          </div>
        )}

        {/* Estrutura Molecular */}
        {structure.molecularStructure && (
          <div className="mb-6 p-4 bg-blue-50 rounded-xl">
            <h3 className="text-gray-900 mb-2">Estrutura Molecular</h3>
            <p className="text-gray-600">{structure.molecularStructure}</p>
          </div>
        )}

        {/* Funções no organismo */}
        {structure.functions && structure.functions.length > 0 && (
          <div className="mb-6">
            <h3 className="text-gray-900 mb-3">Funções no Organismo</h3>
            <ul className="space-y-2">
              {structure.functions.map((func, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-600">{func}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Curiosidades */}
        {structure.curiosities && structure.curiosities.length > 0 && (
          <div className="mb-6">
            <h3 className="text-gray-900 mb-3">Curiosidades</h3>
            <div className="space-y-3">
              {structure.curiosities.map((curiosity, index) => (
                <div key={index} className="p-4 bg-purple-50 rounded-xl">
                  <p className="text-gray-700">{curiosity}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Relacionados */}
        {relatedStructures.length > 0 && (
          <div className="mb-8">
            <h3 className="text-gray-900 mb-4">Estruturas Relacionadas</h3>
            <div className="space-y-4">
              {relatedStructures.map((relatedStructure) => (
                <StructureCard
                  key={relatedStructure.id}
                  structure={relatedStructure}
                  onSelect={onSelectStructure}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
