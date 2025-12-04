import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';

export async function createAdminUser() {
    try {
        // Verificar se já existe um usuário admin
        const adminExists = await User.findOne({ email: 'admin@ufcspa.edu.br' });
        
        if (!adminExists) {
            // Criar senha hash para o admin
            const saltRounds = 10;
            const adminPassword = 'admin123'; // Senha padrão
            const hashedPassword = await bcrypt.hash(adminPassword, saltRounds);
            
            // Criar usuário admin
            const adminUser = new User({
                nomeCompleto: 'Administrador UFCSPA',
                email: 'admin@ufcspa.edu.br',
                password: hashedPassword,
                role: 'admin'
            });
            
            await adminUser.save();
            console.log('✅ Usuário admin criado com sucesso!');
            console.log('📧 Email: admin@ufcspa.edu.br');
            console.log('🔑 Senha: admin123');
            
            return {
                created: true,
                email: 'admin@ufcspa.edu.br',
                password: 'admin123'
            };
        } else {
            console.log('👤 Usuário admin já existe');
            return {
                created: false,
                message: 'Admin já existe'
            };
        }
    } catch (error) {
        console.error('❌ Erro ao criar usuário admin:', error);
    }
}