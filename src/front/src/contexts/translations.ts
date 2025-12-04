// Textos em português
const ptBR = {
  // Navegação
  home: 'Início',
  structures: 'Estruturas',
  ar: 'RA',
  info: 'Informações',
  settings: 'Configurações',
  
  // HomePage
  welcome: 'Bem-vindo ao WebAR Educativo',
  subtitle: 'Explore estruturas biológicas em realidade aumentada',
  exploreStructures: 'Explore Estruturas Biológicas',
  tutorialTitle: 'Tutorial RA / Calibração',
  howToUseAR: 'Como usar a RA?',
  arGuide: 'Guia de como usar o app.',
  publishedIn: 'Publicado em',
  contributeTitle: 'Contribuir com Estruturas',
  contributeSubtitle: 'Tenha sua estrutura na plataforma',
  contributeText: 'Para contribuir com novas estruturas biológicas para a plataforma, entre em contato conosco:',
  loading: 'Carregando estruturas...',
  noStructures: 'Nenhuma estrutura disponível',
  
  // StructuresPage
  searchPlaceholder: 'Buscar estruturas...',
  allCategories: 'Todas as categorias',
  
  // Categorias
  categories: {
    'DNA': 'DNA',
    'Proteínas': 'Proteínas', 
    'Células': 'Células',
    'Corpo Humano': 'Corpo Humano'
  },
  
  // SettingsPage
  profile: 'Perfil',
  administrator: 'Administrador',
  user: 'Usuário',
  logoutAccount: 'Sair da Conta',
  administration: 'Administração',
  adminTools: 'Ferramentas exclusivas para administradores',
  createInitialContent: 'Criar Conteúdos Iniciais (DNA + Hemoglobina)',
  accessibility: 'Acessibilidade',
  fontSize: 'Tamanho da fonte',
  darkMode: 'Modo escuro',
  reduceFatigue: 'Reduzir cansaço visual',
  appPreferences: 'Preferências do App',
  language: 'Idioma',
  personalData: 'Dados Pessoais',
  editProfile: 'Editar perfil',
  nameAndCourse: 'Nome e curso',
  fullName: 'Nome Completo',
  course: 'Curso',
  courseExample: 'Ex: Biomedicina, Biologia...',
  saveChanges: 'Salvar Alterações',
  profileUpdated: 'Perfil atualizado com sucesso!',
  
  // Tamanhos de fonte
  fontSizes: {
    small: 'Pequeno',
    medium: 'Médio',
    large: 'Grande',
    xlarge: 'Muito Grande'
  },
  
  // InfoPage
  about: 'Sobre o aplicativo e sua base científica',
  aboutApp: 'Sobre o App',
  objective: 'Objetivo',
  objectiveText: 'Este aplicativo foi desenvolvido para facilitar o aprendizado de Biologia e áreas relacionadas através da visualização de estruturas moleculares e biológicas em Realidade Aumentada.',
  functioning: 'Funcionamento',
  functioningText: 'Utilizando tecnologia de AR, o app permite que estudantes e professores visualizem modelos 3D precisos de estruturas como DNA, proteínas, células e sistemas do corpo humano em tempo real no ambiente físico.',
  targetAudience: 'Público-alvo',
  targetAudienceText: 'Estudantes de ensino médio, graduação e pós-graduação em áreas de Ciências Biológicas, Saúde, Biomedicina e Informática Biomédica, além de professores e profissionais da área.',
  team: 'Equipe',
  references: 'Referências Bibliográficas'
};

// Textos em inglês
const enUS = {
  // Navigation
  home: 'Home',
  structures: 'Structures',
  ar: 'AR',
  info: 'Information',
  settings: 'Settings',
  
  // HomePage
  welcome: 'Welcome to Educational WebAR',
  subtitle: 'Explore biological structures in augmented reality',
  exploreStructures: 'Explore Biological Structures',
  tutorialTitle: 'AR Tutorial / Calibration',
  howToUseAR: 'How to use AR?',
  arGuide: 'Guide on how to use the app.',
  publishedIn: 'Published in',
  contributeTitle: 'Contribute Structures',
  contributeSubtitle: 'Have your structure on the platform',
  contributeText: 'To contribute new biological structures to the platform, contact us:',
  loading: 'Loading structures...',
  noStructures: 'No structures available',
  
  // StructuresPage
  searchPlaceholder: 'Search structures...',
  allCategories: 'All categories',
  
  // Categories
  categories: {
    'DNA': 'DNA',
    'Proteínas': 'Proteins',
    'Células': 'Cells',
    'Corpo Humano': 'Human Body'
  },
  
  // SettingsPage
  profile: 'Profile',
  administrator: 'Administrator',
  user: 'User',
  logoutAccount: 'Logout',
  administration: 'Administration',
  adminTools: 'Exclusive tools for administrators',
  createInitialContent: 'Create Initial Content (DNA + Hemoglobin)',
  accessibility: 'Accessibility',
  fontSize: 'Font size',
  darkMode: 'Dark mode',
  reduceFatigue: 'Reduce eye strain',
  appPreferences: 'App Preferences',
  language: 'Language',
  personalData: 'Personal Data',
  editProfile: 'Edit profile',
  nameAndCourse: 'Name and course',
  fullName: 'Full Name',
  course: 'Course',
  courseExample: 'Ex: Biomedicine, Biology...',
  saveChanges: 'Save Changes',
  profileUpdated: 'Profile updated successfully!',
  
  // Font sizes
  fontSizes: {
    small: 'Small',
    medium: 'Medium',
    large: 'Large',
    xlarge: 'Very Large'
  },
  
  // InfoPage
  about: 'About the app and its scientific foundation',
  aboutApp: 'About the App',
  objective: 'Objective',
  objectiveText: 'This application was developed to facilitate learning Biology and related areas through visualization of molecular and biological structures in Augmented Reality.',
  functioning: 'How it works',
  functioningText: 'Using AR technology, the app allows students and teachers to visualize accurate 3D models of structures like DNA, proteins, cells and human body systems in real time in the physical environment.',
  targetAudience: 'Target audience',
  targetAudienceText: 'High school, undergraduate and graduate students in Biological Sciences, Health, Biomedicine and Biomedical Informatics, as well as teachers and professionals in the field.',
  team: 'Team',
  references: 'References'
};

export const translations = {
  'pt-BR': ptBR,
  'en-US': enUS
};

export type TranslationKey = keyof typeof ptBR;