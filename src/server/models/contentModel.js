import mongoose from 'mongoose';

// Define o Schema (estrutura) para o nosso conteúdo educacional/modelo 3D.
const contentSchema = new mongoose.Schema({
    // Tipo de conteúdo (DNA, Proteínas ou Anatomia), usado na Tela 1: Home.
    tema: {
        type: String,
        required: true,
        enum: ['DNA', 'Proteinas', 'Anatomia']
    },

    titulo: {
        type: String,
        required: true,
        trim: true,
        unique: true // Garante que cada modelo tenha um título único.
    },

    // Chave única para identificação (ex: "dna-helix", "hemoglobin")
    marker_key: {
        type: String,
        required: true,
        unique: true
    },

    // Caminho/nome do arquivo 3D otimizado (GLB/glTF).
    glb_file_name: {
        type: String,
        required: true
    },

    // Descrição breve para os cards
    descricao_curta: {
        type: String,
        required: true
    },

    // Descrição completa para a página de detalhes
    descricao_completa: {
        type: String,
        required: true
    },

    // Características/detalhes técnicos
    caracteristicas: [{
        type: String
    }],

    // Curiosidades interessantes
    curiosidades: [{
        type: String
    }],

    // URL da imagem de preview/thumbnail
    imagem_url: {
        type: String,
        default: ''
    },

    // Status se está ativo/disponível
    ativo: {
        type: Boolean,
        default: true
    },

}, {
    timestamps: true // Adiciona campos createdAt e updatedAt automaticamente
});

// Verificar se o modelo já foi compilado antes de criar
const Content = mongoose.models.Content || mongoose.model('Content', contentSchema);
export default Content;