// Importa o framework Express para criar o servidor web
import express from 'express';

// Importa o Mongoose para conectar e interagir com MongoDB
import mongoose from 'mongoose';

// Importa o cors para permitir requisições do frontend
import cors from 'cors';

// Carrega as variáveis de ambiente do arquivo .env
import dotenv from 'dotenv';
dotenv.config(); 

// Cria uma instância da aplicação Express
const app = express(); 

// --- CORREÇÃO 1: Porta Dinâmica (Obrigatório para o Render) ---
const PORT = process.env.PORT || 5000; 

app.use(express.json()); 

// --- CORREÇÃO 2: CORS liberado para a Vercel ---
app.use(cors({
    origin: [
        'http://localhost:3000',                  // Permite seu computador
        'http://localhost:5173',                  // Permite Vite local (às vezes usa essa porta)
        'https://project-webar-zhas.vercel.app',  // ✅ Permite seu site na Vercel
        'https://project-webar-zhas.vercel.app/'  // (Garante com e sem a barra no final)
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'] // Garante que todos os métodos funcionem
}));

const db_url = process.env.MONGODB_URI;

mongoose.connect(db_url)
    .then(() => {
        console.log('Connected to MongoDB');
        console.log('Sistema pronto!');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

// Importa as rotas
import contentRoutes from './routes/contentRoutes.js';
import userRoutes from './routes/userRoutes.js';

app.get('/', (req, res) => {
    res.send('API do Projeto WebAR está rodando!');
});

app.post('/create-admin', async (req, res) => {
    try {
        const { createAdminUser } = await import('./utils/createAdmin.js');
        const result = await createAdminUser();
        res.json({ message: 'Admin criado com sucesso!', admin: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/create-content', async (req, res) => {
    try {
        const { createInitialContent } = await import('./utils/createInitialContent.js');
        const result = await createInitialContent();
        res.json({ message: 'Conteúdos criados com sucesso!', data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rotas
app.use('/api/content', contentRoutes);
app.use('/api/user', userRoutes);

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
