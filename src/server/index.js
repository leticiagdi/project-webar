// Importa o framework Express para criar o servidor web
import express from 'express';

// Importa o Mongoose para conectar e interagir com MongoDB
import mongoose from 'mongoose';

// Importa o cors para permitir requisições do frontend
import cors from 'cors';

// Carrega as variáveis de ambiente do arquivo .env
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file

// Cria uma instância da aplicação Express
const app = express(); // Create an Express application

// Define a porta onde o servidor irá rodar
const PORT = 5000; // Define the port

// Middleware para interpretar requisições com corpo em JSON
app.use(express.json()); // Middleware to parse JSON bodies

// Configuração do CORS para permitir requisições do frontend
app.use(cors({
    origin: 'http://localhost:3000', // URL do frontend
    credentials: true
}));

// Obtém a URL de conexão do MongoDB das variáveis de ambiente
// Connect to MongoDB
const db_url = process.env.MONGODB_URI;

// Tenta conectar ao MongoDB usando a URL obtida
mongoose.connect(db_url)
    .then(() => {
        // Se a conexão for bem-sucedida, exibe mensagem de sucesso
        console.log('Connected to MongoDB');
        console.log('Sistema pronto! Usuários podem se cadastrar normalmente.');
    })
    .catch((error) => {
        // Se houver erro na conexão, exibe a mensagem de erro
        console.error('Error connecting to MongoDB:', error);
    });

// Importa as rotas
import contentRoutes from './routes/contentRoutes.js';
import userRoutes from './routes/userRoutes.js';

// Seção para definir as rotas da API
//rotas

app.get('/', (req, res) => {
    res.send('API do Projeto WebAR está rodando!');
});

// Rota especial para criar admin (apenas quando necessário)
app.post('/create-admin', async (req, res) => {
    try {
        const { createAdminUser } = await import('./utils/createAdmin.js');
        const result = await createAdminUser();
        res.json({ message: 'Admin criado com sucesso!', admin: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota para criar conteúdos iniciais
app.post('/create-content', async (req, res) => {
    try {
        const { createInitialContent } = await import('./utils/createInitialContent.js');
        const result = await createInitialContent();
        res.json({ message: 'Conteúdos criados com sucesso!', data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Middleware para todas as rotas que começam com '/api/' (usando import)
app.use('/api/content', contentRoutes); // Rotas de conteúdo
app.use('/api/user', userRoutes); // Rotas de usuário



// Inicia o servidor Express na porta definida
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Frontend proxy configured for http://localhost:3000`);
});