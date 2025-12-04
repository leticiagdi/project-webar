import { useState, useEffect } from 'react';
import { Search, ArrowLeft } from 'lucide-react';
import { Page, Structure } from '../App';
import { StructureCard } from './StructureCard';
import { Input } from './ui/input';

interface StructuresPageProps {
  onNavigate: (page: Page) => void;
  onSelectStructure: (structure: Structure) => void;
}

export function StructuresPage({ onNavigate, onSelectStructure }: StructuresPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [structures, setStructures] = useState<Structure[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const categories = ['Todos', 'DNA', 'Proteínas', 'Células'];

  // Carregar estruturas do backend
  useEffect(() => {
    const fetchStructures = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/content/');
        if (response.ok) {
          const data = await response.json();
          
          // Converter dados do backend para formato do frontend
          const mappedStructures: Structure[] = data.map((content: any) => {
            // Mapear temas do backend para categorias do frontend
            const categoryMapping: Record<string, 'DNA' | 'Proteínas' | 'Células' | 'Corpo Humano'> = {
              'DNA': 'DNA',
              'Proteinas': 'Proteínas', 
              'Anatomia': 'Células' // Anatomia no backend vira Células no frontend
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
          
          setStructures(mappedStructures);
        } else {
          setError('Erro ao carregar estruturas');
        }
      } catch (error) {
        setError('Erro de conexão com o servidor');
        console.error('Erro ao buscar estruturas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStructures();
  }, []);

  const filteredStructures = structures.filter((structure) => {
    const matchesSearch = structure.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         structure.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || structure.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const recommendedStructures = structures.slice(0, 3);

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white px-6 py-4 sticky top-0 z-10 border-b border-gray-200">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={() => onNavigate('home')} className="text-gray-600">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-gray-900">Estruturas Biológicas</h1>
        </div>

        {/* Barra de busca */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Buscar estruturas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Filtros por categoria */}
      <div className="px-6 py-4 bg-white border-b border-gray-200">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Lista de Estruturas */}
      <div className="px-6 py-6">
        <h2 className="text-gray-900 mb-4">Estruturas Biológicas</h2>
        
        {loading && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🧬</div>
            <p className="text-gray-500">Carregando estruturas...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">⚠️</div>
            <p className="text-red-500 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Tentar Novamente
            </button>
          </div>
        )}

        {!loading && !error && (
          <div className="space-y-4">
            {filteredStructures.map((structure) => (
              <StructureCard
                key={structure.id}
                structure={structure}
                onSelect={onSelectStructure}
              />
            ))}
          </div>
        )}

        {!loading && !error && filteredStructures.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🔍</div>
            <p className="text-gray-500">Nenhuma estrutura encontrada</p>
            <p className="text-sm text-gray-400 mt-2">
              Tente ajustar os filtros ou termos de busca
            </p>
          </div>
        )}
      </div>

      {/* Destaques / Recomendados */}
      {!loading && !error && searchQuery === '' && selectedCategory === 'Todos' && structures.length > 0 && (
        <div className="px-6 pb-8">
          <h2 className="text-gray-900 mb-4">Mais Populares</h2>
          <div className="grid grid-cols-1 gap-4">
            {structures.slice(0, 2).map((structure) => (
              <StructureCard
                key={structure.id}
                structure={structure}
                onSelect={onSelectStructure}
                compact
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
