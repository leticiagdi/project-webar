import { Structure } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface StructureCardProps {
  structure: Structure;
  onSelect: (structure: Structure) => void;
  compact?: boolean;
}

export function StructureCard({ structure, onSelect, compact = false }: StructureCardProps) {
  if (compact) {
    return (
      <button
        onClick={() => onSelect(structure)}
        className="w-full bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
      >
        <div className="aspect-video w-full overflow-hidden bg-gray-100">
          <ImageWithFallback
            src={structure.imageUrl}
            alt={structure.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <div className="inline-block px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs mb-2">
            {structure.category}
          </div>
          <h3 className="text-gray-900 mb-1">{structure.title}</h3>
          <p className="text-sm text-gray-500 mb-3">{structure.description}</p>
          <div className="text-sm text-blue-600">Visualizar em AR →</div>
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={() => onSelect(structure)}
      className="w-full bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex gap-4 p-4">
        <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
          <ImageWithFallback
            src={structure.imageUrl}
            alt={structure.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 text-left">
          <div className="inline-block px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs mb-2">
            {structure.category}
          </div>
          <h3 className="text-gray-900 mb-1">{structure.title}</h3>
          <p className="text-sm text-gray-500">{structure.description}</p>
        </div>
      </div>
    </button>
  );
}
