// server/routes/userRoutes.js
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const router = express.Router();
import User from '../models/UserModel.js'; // Importa o modelo User

// === 1. POST /api/user/ - Criar Novo Usuário (Registro) ===
router.post('/', async (req, res) => {
    const { nomeCompleto, email, password, role } = req.body; 

    if (!nomeCompleto || !email || !password) {
        return res.status(400).json({ error: 'Os campos nome, email e senha são obrigatórios.' });
    }

    try {
        // Criptografa a senha antes de salvar
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        const novoUser = new User({ nomeCompleto, email, password: hashedPassword, role: role || 'normal' });
        const salvo = await novoUser.save();
        
        // Retorna o usuário criado, mas remove o campo 'password' da resposta
        const userResponse = salvo.toObject();
        delete userResponse.password;
        
        res.status(201).json(userResponse);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ error: 'E-mail já cadastrado.' });
        }
        res.status(500).json({ error: error.message });
    }
});

// === 2. POST /api/user/login - Login de Usuário ===
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
    }

    try {
        // Busca o usuário pelo email
        const user = await User.findOne({ email: email.toLowerCase() });
        
        if (!user) {
            return res.status(401).json({ error: 'Usuário não encontrado.' });
        }

        // Verifica se a senha está correta
        const isValidPassword = await bcrypt.compare(password, user.password);
        
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Senha incorreta.' });
        }

        // Cria token JWT (se você quiser implementar autenticação por token)
        const token = jwt.sign(
            { userId: user._id, email: user.email, role: user.role }, 
            process.env.JWT_SECRET || 'secret_key_temporaria', 
            { expiresIn: '24h' }
        );

        // Retorna os dados do usuário (sem a senha) e o token
        const userResponse = user.toObject();
        delete userResponse.password;
        
        res.json({
            message: 'Login realizado com sucesso',
            user: userResponse,
            token
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// === 3. GET /api/user/ - Listar Todos os Usuários (Admin) ===
router.get('/', async (req, res) => {
    try {
        // Busca todos e exclui a senha da resposta
        const users = await User.find().select('-password').sort({ createdAt: -1 });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// === 4. GET /api/user/:id - Buscar Usuário por ID (Admin) ===
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// === 5. PUT /api/user/:id - Atualizar Usuário por ID (Admin) ===
router.put('/:id', async (req, res) => {
    try {
        const atualizado = await User.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        ).select('-password'); 

        if (!atualizado) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        res.json(atualizado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// === 6. DELETE /api/user/:id - Remover Usuário por ID (Admin) ===
router.delete('/:id', async (req, res) => {
    try {
        const removido = await User.findByIdAndDelete(req.params.id);

        if (!removido) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        res.json({ message: 'Usuário removido com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// === 7. PUT /api/users/profile - Atualizar Perfil do Usuário Autenticado ===
router.put('/profile', async (req, res) => {
    try {
        // Extrair token do cabeçalho Authorization
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ error: 'Token não fornecido' });
        }

        // Verificar e decodificar o token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key_temporaria');
        const userId = decoded.userId;

        // Atualizar apenas os campos permitidos: nomeCompleto e curso
        const { nomeCompleto, curso } = req.body;
        const updateData = {};
        
        if (nomeCompleto !== undefined) updateData.nomeCompleto = nomeCompleto;
        if (curso !== undefined) updateData.curso = curso;

        const atualizado = await User.findByIdAndUpdate(
            userId, 
            updateData, 
            { new: true, runValidators: true }
        ).select('-password'); 

        if (!atualizado) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        res.json({
            message: 'Perfil atualizado com sucesso',
            user: atualizado
        });
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Token inválido' });
        }
        res.status(500).json({ error: error.message });
    }
});

export default router;