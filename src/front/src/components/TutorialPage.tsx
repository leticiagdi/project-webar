import { ArrowLeft, CheckCircle2, Eye, Lightbulb, Move, Smartphone } from 'lucide-react';
import { Page } from '../App';
import { Button } from './ui/button';

interface TutorialPageProps {
  onNavigate: (page: Page) => void;
}

export function TutorialPage({ onNavigate }: TutorialPageProps) {
  const steps = [
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: 'Como mover o celular',
      description: 'Mova o dispositivo lentamente em várias direções para que o app possa detectar superfícies planas no ambiente.'
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: 'Como identificar superfícies',
      description: 'Procure por áreas planas como mesas, chão ou paredes. Pontos brancos aparecerão quando uma superfície for detectada.'
    },
    {
      icon: <Move className="w-6 h-6" />,
      title: 'Como ajustar tamanho do modelo',
      description: 'Use gestos de pinça (dois dedos) para aumentar ou diminuir o tamanho do modelo 3D. Arraste com um dedo para mover.'
    }
  ];

  const calibrationChecklist = [
    {
      title: 'Iluminação adequada',
      description: 'Certifique-se de estar em um ambiente bem iluminado'
    },
    {
      title: 'Distância ideal',
      description: 'Mantenha o dispositivo a cerca de 40-60cm da superfície'
    },
    {
      title: 'Estabilidade',
      description: 'Movimente o celular de forma suave e controlada'
    }
  ];

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-6 text-white">
        <div className="flex items-center gap-4 mb-2">
          <button onClick={() => onNavigate('home')} className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-white">Tutorial RA</h1>
        </div>
        <p className="text-white/80 text-sm">Aprenda a usar a Realidade Aumentada</p>
      </div>

      <div className="px-6 py-6">
        {/* Vídeo explicativo placeholder */}
        <div className="aspect-video w-full bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl mb-8 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
              <Eye className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-gray-600">Vídeo Tutorial</p>
            <p className="text-sm text-gray-500">Como usar RA no app</p>
          </div>
        </div>

        {/* Passo a passo */}
        <div className="mb-8">
          <h2 className="text-gray-900 mb-4">Passo a Passo</h2>
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 text-blue-600">
                  {step.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-gray-900 mb-1">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Checklist de calibração */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-yellow-600" />
            <h2 className="text-gray-900">Checklist de Calibração</h2>
          </div>
          <div className="space-y-3">
            {calibrationChecklist.map((item, index) => (
              <div key={index} className="flex gap-3 p-4 bg-green-50 rounded-xl">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dicas adicionais */}
        <div className="p-4 bg-blue-50 rounded-xl mb-8">
          <h3 className="text-gray-900 mb-2 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-blue-600" />
            Dica Importante
          </h3>
          <p className="text-sm text-gray-600">
            Se o modelo não aparecer ou ficar instável, tente encontrar uma superfície com mais textura ou iluminação diferente.
          </p>
        </div>

        {/* Botão Experimentar */}
        <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
          <Eye className="w-5 h-5 mr-2" />
          Experimentar AR Agora
        </Button>
      </div>
    </div>
  );
}
