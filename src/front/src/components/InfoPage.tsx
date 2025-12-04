import { ArrowLeft, BookOpen, Users, GraduationCap, FileText } from 'lucide-react';
import { Page } from '../App';

interface InfoPageProps {
  onNavigate: (page: Page) => void;
}

export function InfoPage({ onNavigate }: InfoPageProps) {
  const references = [
    'Título do Artigo Aqui, Autor et al. (Ano). Nome da Revista Científica, Volume(Número), páginas.'
  ];

  const team = [
    { name: 'Professora Isabel Cristina', role: 'Coordenação e Orientação' },
    { name: 'Leticia Godoi', role: 'Desenvolvimento' },
    { name: 'Taina Selaryan', role: 'Desenvolvimento' }
  ];

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-6 text-white sticky top-0 z-10">
        <div className="flex items-center gap-4 mb-2">
          <button onClick={() => onNavigate('home')} className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-white">Informações</h1>
        </div>
        <p className="text-white/80 text-sm">Sobre o aplicativo e sua base científica</p>
      </div>

      <div className="px-6 py-6">
        {/* Sobre o App */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-gray-900">Sobre o App</h2>
          </div>
          <div className="p-5 bg-gray-50 rounded-xl">
            <h3 className="text-gray-900 mb-2">Objetivo</h3>
            <p className="text-gray-600 mb-4">
              Este aplicativo foi desenvolvido para facilitar o aprendizado de Biologia e áreas relacionadas através da visualização de estruturas moleculares e biológicas em Realidade Aumentada.
            </p>
            <h3 className="text-gray-900 mb-2">Funcionamento</h3>
            <p className="text-gray-600 mb-4">
              Utilizando tecnologia de AR, o app permite que estudantes e professores visualizem modelos 3D precisos de estruturas como DNA, proteínas, células e sistemas do corpo humano em tempo real no ambiente físico.
            </p>
            <h3 className="text-gray-900 mb-2">Público-alvo</h3>
            <p className="text-gray-600">
              Estudantes de ensino médio, graduação e pós-graduação em áreas de Ciências Biológicas, Saúde, Biomedicina e Informática Biomédica, além de professores e profissionais da área.
            </p>
          </div>
        </div>

        {/* Autores / Equipe */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <h2 className="text-gray-900">Equipe</h2>
          </div>
          <div className="space-y-3">
            {team.map((member, index) => (
              <div key={index} className="p-4 bg-purple-50 rounded-xl">
                <h3 className="text-gray-900">{member.name}</h3>
                <p className="text-sm text-purple-700">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Referências Bibliográficas */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-orange-600" />
            </div>
            <h2 className="text-gray-900">Referências Bibliográficas</h2>
          </div>
          <div className="p-5 bg-gray-50 rounded-xl">
            <ul className="space-y-4">
              {references.map((reference, index) => (
                <li key={index} className="text-sm text-gray-600 pl-4 border-l-2 border-orange-300">
                  {reference}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Versão do App */}
        <div className="text-center py-4 text-sm text-gray-500">
          Versão 1.0.0 • 2025
        </div>
      </div>
    </div>
  );
}
