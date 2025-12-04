# 🧬 Plataforma WebAR Educativa de Ciências da Vida

Uma plataforma inovadora de Realidade Aumentada via navegador (WebAR) para ensino imersivo e acessível em biologia, anatomia e bioinformática.

## 📋 Sobre o Projeto

**Plataforma WebAR Educativa de Ciências da Vida** desenvolvida pela UFCSPA para ensino imersivo e acessível em biologia, anatomia e bioinformática. Utiliza Realidade Aumentada via navegador (WebAR) permitindo projeção e interação com modelos 3D de estruturas biológicas usando apenas **smartphone ou tablet com câmera**.

## 🎯 Características Principais

- **WebAR Acessível**: Funciona diretamente no navegador, sem aplicativos específicos
- **Autenticação Completa**: Sistema de login/registro com JWT
- **Gestão de Conteúdo**: CMS para estruturas biológicas via MongoDB
- **Interface Multilíngue**: Português/Inglês com troca dinâmica
- **Design Mobile-First**: Interface responsiva otimizada para dispositivos móveis
- **Painel Administrativo**: Gestão de usuários e conteúdos educacionais

## 🛠️ Stack Tecnológico

### Frontend
- **React 19.2.0**: Interface de usuário moderna
- **TypeScript**: Tipagem estática
- **Vite 6.3.5**: Build tool e dev server
- **Tailwind CSS**: Framework CSS utilitário
- **Radix UI**: Componentes UI acessíveis
- **Lucide React**: Ícones modernos

### Backend
- **Node.js**: Runtime JavaScript
- **Express.js**: Framework web minimalista
- **MongoDB**: Banco de dados NoSQL
- **Mongoose**: ODM para MongoDB
- **JWT**: Autenticação via tokens
- **bcryptjs**: Criptografia de senhas
- **CORS**: Comunicação frontend-backend

### Estrutura do Banco de Dados
- **Users**: Usuários (admin/normal) com perfis editáveis
- **Content**: Estruturas biológicas (DNA, Proteínas, Células, Anatomia)

## 📱 Funcionalidades Implementadas

### Autenticação
- ✅ Sistema completo de login/registro
- ✅ Autenticação JWT com localStorage
- ✅ Controle de acesso por roles (admin/normal)
- ✅ Proteção de rotas sensíveis

### Interface de Usuário
- ✅ **HomePage**: Estruturas em destaque e navegação
- ✅ **StructuresPage**: Lista categorizada com busca
- ✅ **StructureDetail**: Detalhes das estruturas biológicas
- ✅ **SettingsPage**: Configurações de idioma e perfil
- ✅ **InfoPage**: Informações sobre o projeto e equipe
- ✅ **LoginPage**: Autenticação de usuários

### Sistema de Configurações
- ✅ **Multilíngue**: Português/Inglês com contexto global
- ✅ **Edição de Perfil**: Nome e curso editáveis no backend
- ✅ **Navegação Bottom**: Três seções principais

### Backend API
- ✅ **CRUD Usuários**: Registro, login, perfil
- ✅ **CRUD Conteúdo**: Estruturas biológicas
- ✅ **Autenticação JWT**: Middleware de segurança
- ✅ **Conexão MongoDB**: Armazenamento persistente

## 🚀 Status Atual do Projeto

**✨ FUNCIONAL - Fase Full-Stack Completa**

Sistema completo Full-Stack funcional incluindo:

- ✅ **Backend**: Express.js + MongoDB + JWT
- ✅ **Frontend**: React + TypeScript + Vite
- ✅ **Autenticação**: Sistema completo de login/registro
- ✅ **Base de Dados**: 6 estruturas biológicas iniciais
- ✅ **Interface Responsiva**: Design mobile-first
- ✅ **Multilíngue**: Português/Inglês dinâmico

### 📁 Estrutura do Projeto:
```
projeto-webar/
├── src/
│   ├── server/              # Backend Node.js
│   │   ├── index.js         # Servidor Express
│   │   ├── models/          # Modelos MongoDB
│   │   │   ├── contentModel.js
│   │   │   └── userModel.js
│   │   ├── routes/          # Rotas da API
│   │   │   ├── contentRoutes.js
│   │   │   └── userRoutes.js
│   │   └── utils/           # Utilitários
│   │       ├── createAdmin.js
│   │       └── createInitialContent.js
│   └── front/               # Frontend React
│       ├── src/
│       │   ├── components/  # Componentes React
│       │   │   ├── HomePage.tsx
│       │   │   ├── StructuresPage.tsx
│       │   │   ├── StructureDetail.tsx
│       │   │   ├── SettingsPage.tsx
│       │   │   ├── InfoPage.tsx
│       │   │   └── LoginPage.tsx
│       │   ├── contexts/    # Contextos React
│       │   │   ├── AuthContext.tsx
│       │   │   ├── SettingsContext.tsx
│       │   │   └── translations.ts
│       │   └── App.tsx      # Aplicação principal
│       └── vite.config.ts
├── package.json
└── .env
```

## 🗄️ Modelos de Dados

### Content (Estruturas Biológicas)
- **id**: Identificador único
- **title**: Nome da estrutura
- **category**: DNA | Proteínas | Células | Corpo Humano
- **description**: Descrição resumida
- **fullDescription**: Explicação completa
- **composition**: Composição molecular
- **functions**: Funções biológicas
- **curiosities**: Curiosidades educativas

### User (Usuários)
- **nomeCompleto**: Nome completo
- **email**: Email único para login
- **password**: Senha criptografada (bcrypt)
- **role**: admin | normal
- **curso**: Curso do estudante

## 🚀 Como Executar

### Pré-requisitos
- Node.js (v18+)
- MongoDB Atlas ou local
- npm

### Instalação e Execução
```bash
# Clone o repositório
git clone [URL_DO_REPOSITORIO]

# Entre no diretório
cd projeto-webar

# Instale as dependências
npm install

# Configure o arquivo .env com sua string MongoDB:
# MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/webar
# JWT_SECRET=sua_chave_jwt_secreta

# Inicie o servidor backend
npm run server

# Em outro terminal, inicie o frontend
npm run frontend

# Ou execute ambos simultaneamente
npm run dev
```

**Acesso:**
- Frontend: http://localhost:5173 (Vite)
- Backend: http://localhost:5000
- API Docs: Endpoints listados abaixo

## 📡 API Endpoints

### Autenticação
- `POST /api/user/login` - Login de usuário
- `POST /api/user/` - Registro de usuário
- `PUT /api/user/profile` - Atualizar perfil (JWT required)

### Conteúdos Educacionais
- `GET /api/content/` - Listar estruturas biológicas
- `GET /api/content/:id` - Detalhes de uma estrutura
- `POST /api/content/` - Criar nova estrutura (Admin)
- `PUT /api/content/:id` - Atualizar estrutura (Admin)
- `DELETE /api/content/:id` - Remover estrutura (Admin)

### Utilitários
- `POST /create-admin` - Criar usuário administrador
- `POST /create-content` - Popular estruturas iniciais

## 👥 Equipe

- **Professora Isabel Cristina** - Coordenação e Orientação
- **Leticia Godoi** - Desenvolvimento
- **Taina Selaryan** - Desenvolvimento

## 🎯 Próximos Passos (Roadmap)

1. **WebAR/WebXR Implementation** - Integração da realidade aumentada
2. **3D Models Integration** - Carregamento de modelos GLTF/GLB
3. **Camera Controls** - Controles de câmera para AR
4. **Quiz System** - Sistema de avaliação educacional
5. **Performance Optimization** - Otimizações para dispositivos móveis
7. **Deploy**: Configuração para produção

## 🤝 Contribuindo

Este projeto está em desenvolvimento ativo. Contribuições são bem-vindas!

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Equipe

- **Desenvolvedores**: [Adicionar nomes da equipe]
- **Orientação**: [Adicionar orientadores]
- **Instituição**: UFCSPA (Universidade Federal de Ciências da Saúde de Porto Alegre)

---

**🔬 Educação + 🚀 Tecnologia + 🧬 Ciências da Vida = Futuro da Aprendizagem**
