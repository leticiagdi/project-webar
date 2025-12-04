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
    origin: function (origin, callback) {
        // Permite acesso se não tiver origem (ex: Postman, App Mobile)
        if (!origin) return callback(null, true);

        // Verifica se a origem é permitida
        // Aceita localhost OU qualquer site que termine em .vercel.app
        if (origin === 'http://localhost:3000' || 
            origin === 'http://localhost:5173' || 
            origin.endsWith('.vercel.app')) {
            return callback(null, true);
        }

        // Se não for nenhum desses, bloqueia (mas avisa no log)
        console.log('Bloqueado pelo CORS:', origin);
        return callback(new Error('Bloqueado pelo CORS: ' + origin));
    },
    credentials: true
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

