import express from 'express';
const router = express.Router();
import Content from '../models/contentModel.js';

// 1 Rota para criar novo conteudo/modelo 3D
router.post('/', async (req, res) => { 
    const { tema, titulo, marker_key, glb_file_name } = req.body;

    if (!tema || !titulo || !marker_key || !glb_file_name) {
        return res.status(400).json({ error: 'Os campos obrigatórios (tema, título, marker_key, glb_file_name) estão faltando.' });
    }

    try {
        const novoContent = new Content(req.body);
        const salvo = await novoContent.save();
        res.status(201).json(salvo);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ error: 'Título ou Marker Key já existe.' });
        }
        res.status(500).json({ error: error.message });
    }
});

    // === 2. GET /api/content/ - Listar Todos os Conteúdos (Normal/Admin) ===
router.get('/', async (req, res) => {
    try {
        const { tema } = req.query;
        const filter = tema ? { tema: tema } : {};
        const contents = await Content.find(filter).sort({ tema: 1, titulo: 1 });
        console.log('Conteúdos encontrados:', contents.length);
        res.json(contents);
    } catch (error) {
        console.error('Erro ao buscar conteúdos:', error);
        res.status(500).json({ error: error.message });
    }
});

// === 3. GET /api/content/tema/:tema - Buscar por Tema (DNA, Proteinas, Anatomia) ===
router.get('/tema/:tema', async (req, res) => {
    try {
        const { tema } = req.params;
        const contents = await Content.find({ 
            tema: tema, 
            ativo: true 
        }).sort({ titulo: 1 });
        res.json(contents);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// === 4. GET /api/content/:marker_key - Buscar pela Chave do Marker (Normal/Admin) ===
// Rota principal para o WebAR
router.get('/:marker_key', async (req, res) => {
    try {
        const { marker_key } = req.params;
        const content = await Content.findOne({ marker_key: marker_key });

        if (!content) {
            return res.status(404).json({ error: 'Conteúdo/Marker Key não encontrado' });
        }
        res.json(content);
    } catch (error) {
        // Assume que um ID Inválido ou erro interno é 500
        res.status(500).json({ error: error.message });
    }
});

// === 5. PUT /api/content/:id - Atualizar Conteúdo por ID (Admin) ===
router.put('/:id', async (req, res) => {
    try {
        const atualizado = await Content.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true } // Retorna o doc atualizado e valida campos
        );

        if (!atualizado) {
            return res.status(404).json({ error: 'Conteúdo não encontrado' });
        }
        res.json(atualizado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// === 6. DELETE /api/content/:id - Remover Conteúdo por ID (Admin) ===
router.delete('/:id', async (req, res) => {
    try {
        const removido = await Content.findByIdAndDelete(req.params.id);

        if (!removido) {
            return res.status(404).json({ error: 'Conteúdo não encontrado' });
        }
        res.json({ message: 'Conteúdo removido com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;