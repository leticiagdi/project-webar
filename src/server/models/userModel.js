// server/models/UserModel.js
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Define o Schema (estrutura) para o usuário.
const UserSchema = new Schema({
    nomeCompleto: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true, // Garante que não haja dois usuários com o mesmo email
        trim: true,
        lowercase: true // Normaliza o email para minúsculas
    },
    // O campo password armazenará a senha (DEVE SER CRIPTOGRAFADA antes de salvar!)
    password: {
        type: String,
        required: true,
        minlength: 6 // Força um mínimo de 6 caracteres na senha
    },
    // Campo para definir o tipo de permissão do usuário
    role: {
        type: String,
        required: true,
        // Tipos de usuários que você definiu:
        enum: ['normal', 'admin'], 
        default: 'normal' // Define 'normal' como padrão para novos cadastros
    },
    // Campo para o curso do usuário
    curso: {
        type: String,
        required: false,
        trim: true
    },
}, { 
    // Adiciona campos 'createdAt' e 'updatedAt' automaticamente
    timestamps: true 
});

// ====================================================================
// !!! NOTA DE SEGURANÇA !!!
// Antes de salvar um novo usuário no banco de dados (ex: na rota POST /api/user),
// você DEVE usar um middleware (como o 'pre' hook do Mongoose com 'bcrypt')
// para criptografar o 'password'. NUNCA armazene senhas em texto puro.
// ====================================================================

// Verificar se o modelo já foi compilado antes de criar
const User = mongoose.models.User || mongoose.model('User', UserSchema);
export default User;