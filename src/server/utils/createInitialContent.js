import Content from '../models/contentModel.js';

export async function createInitialContent() {
    try {
        // Limpar conteúdos antigos e recriar
        console.log('🧹 Limpando conteúdos antigos...');
        await Content.deleteMany({});
        
        console.log('📚 Criando conteúdos iniciais...');
        const initialContents = [
            {
                tema: 'DNA',
                titulo: 'DNA Helix',
                marker_key: '1',
                glb_file_name: 'dna_helix.glb',
                descricao_curta: 'Descubra as complexidades da dupla hélice do DNA',
                descricao_completa: 'A dupla hélice do DNA é a estrutura fundamental que armazena a informação genética em todos os organismos vivos. Composta por duas cadeias de nucleotídeos que se enrolam uma na outra, o DNA é responsável pela transmissão de características hereditárias.',
                caracteristicas: [
                    'Armazenamento de informação genética',
                    'Transmissão hereditária de características',
                    'Síntese de proteínas através da transcrição'
                ],
                curiosidades: [
                    'Se desenrolássemos todo o DNA de uma única célula humana, ele mediria cerca de 2 metros',
                    'O DNA foi descoberto por Friedrich Miescher em 1869',
                    'Aproximadamente 99,9% do DNA é idêntico entre todos os seres humanos'
                ],
                imagem_url: 'https://images.unsplash.com/photo-1655891709782-15c1303a2a25?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxETkElMjBoZWxpeCUyMG1vbGVjdWxlfGVufDF8fHx8MTc2NDcxNjYwNXww&ixlib=rb-4.1.0&q=80&w=1080',
                ativo: true
            },
            {
                tema: 'Proteinas',
                titulo: 'Proteína Hemoglobina',
                marker_key: '2',
                glb_file_name: 'hemoglobin.glb',
                descricao_curta: 'Explore a proteína responsável pelo transporte de oxigênio',
                descricao_completa: 'A hemoglobina é uma proteína complexa presente nos glóbulos vermelhos, responsável pelo transporte de oxigênio dos pulmões para os tecidos do corpo e pelo retorno do dióxido de carbono aos pulmões.',
                caracteristicas: [
                    'Transporte de oxigênio dos pulmões para os tecidos',
                    'Transporte de dióxido de carbono dos tecidos para os pulmões',
                    'Regulação do pH sanguíneo'
                ],
                curiosidades: [
                    'Cada molécula de hemoglobina pode transportar até 4 moléculas de oxigênio',
                    'A cor vermelha do sangue vem da hemoglobina oxigenada',
                    'Mutações na hemoglobina podem causar doenças como a anemia falciforme'
                ],
                imagem_url: 'https://images.unsplash.com/photo-1746422125898-b88912e01582?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm90ZWluJTIwbW9sZWN1bGUlMjBzdHJ1Y3R1cmV8ZW58MXx8fHwxNzY0NzkwMjQwfDA&ixlib=rb-4.1.0&q=80&w=1080',
                ativo: true
            },
            {
                tema: 'Anatomia',
                titulo: 'Célula Animal',
                marker_key: '3',
                glb_file_name: 'cell_animal.glb',
                descricao_curta: 'Visualize a estrutura básica da vida animal',
                descricao_completa: 'A célula animal é a unidade fundamental da vida nos organismos animais. Contém diversos organelas especializadas, cada uma com funções específicas essenciais para a sobrevivência celular.',
                caracteristicas: [
                    'Produção de energia através das mitocôndrias',
                    'Síntese de proteínas nos ribossomos',
                    'Armazenamento de informação genética no núcleo'
                ],
                curiosidades: [
                    'O corpo humano contém cerca de 37,2 trilhões de células',
                    'Células diferentes podem ter tamanhos muito variados',
                    'Algumas células vivem apenas dias, enquanto outras duram toda a vida'
                ],
                imagem_url: 'https://images.unsplash.com/photo-1631556095523-132117e8a8b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxodW1hbiUyMGNlbGwlMjBiaW9sb2d5fGVufDF8fHx8MTc2NDc5MDI5NHww&ixlib=rb-4.1.0&q=80&w=1080',
                ativo: true
            },
            {
                tema: 'Anatomia',
                titulo: 'Sistema Esquelético',
                marker_key: '4',
                glb_file_name: 'skeletal_system.glb',
                descricao_curta: 'Explore a estrutura de suporte do corpo humano',
                descricao_completa: 'O sistema esquelético é composto por 206 ossos no adulto humano, fornecendo suporte estrutural, proteção para órgãos vitais e ancoragem para músculos.',
                caracteristicas: [
                    'Suporte estrutural do corpo',
                    'Proteção de órgãos vitais',
                    'Produção de células sanguíneas na medula óssea',
                    'Armazenamento de minerais como cálcio e fósforo'
                ],
                curiosidades: [
                    'O fêmur é o osso mais forte do corpo humano',
                    'Os ossos são mais fortes que o concreto em resistência à compressão',
                    'O corpo humano nasce com cerca de 270 ossos, que se fundem até 206 na idade adulta'
                ],
                imagem_url: 'https://images.unsplash.com/photo-1714938944803-7589601c962b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmF0b215JTIwaHVtYW4lMjBib2R5fGVufDF8fHx8MTc2NDc5MDI5NHww&ixlib=rb-4.1.0&q=80&w=1080',
                ativo: true
            },
            {
                tema: 'Proteinas',
                titulo: 'Enzima Amilase',
                marker_key: '5',
                glb_file_name: 'amilase.glb',
                descricao_curta: 'Conheça a enzima que quebra carboidratos',
                descricao_completa: 'A amilase é uma enzima digestiva que catalisa a quebra do amido em açúcares menores. É produzida principalmente pelas glândulas salivares e pelo pâncreas.',
                caracteristicas: [
                    'Quebra do amido em maltose e dextrina',
                    'Início da digestão de carboidratos',
                    'Facilitação da absorção de nutrientes'
                ],
                curiosidades: [
                    'A digestão do amido começa na boca pela amilase salivar',
                    'A amilase funciona melhor em pH ligeiramente alcalino',
                    'Níveis elevados de amilase no sangue podem indicar problemas pancreáticos'
                ],
                imagem_url: 'https://images.unsplash.com/photo-1746422125898-b88912e01582?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm90ZWluJTIwbW9sZWN1bGUlMjBzdHJ1Y3R1cmV8ZW58MXx8fHwxNzY0NzkwMjQwfDA&ixlib=rb-4.1.0&q=80&w=1080',
                ativo: true
            },
            {
                tema: 'Anatomia',
                titulo: 'Mitocôndria',
                marker_key: '6',
                glb_file_name: 'mitochondria.glb',
                descricao_curta: 'A usina de energia da célula',
                descricao_completa: 'A mitocôndria é uma organela essencial responsável pela produção de energia na forma de ATP através da respiração celular. Possui DNA próprio e se reproduz independentemente.',
                caracteristicas: [
                    'Produção de ATP através da fosforilação oxidativa',
                    'Regulação do metabolismo celular',
                    'Participação na apoptose (morte celular programada)'
                ],
                curiosidades: [
                    'As mitocôndrias têm seu próprio DNA herdado apenas da mãe',
                    'Uma célula pode ter de dezenas a milhares de mitocôndrias',
                    'Acredita-se que as mitocôndrias eram bactérias independentes há bilhões de anos'
                ],
                imagem_url: 'https://images.unsplash.com/photo-1631556095523-132117e8a8b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxodW1hbiUyMGNlbGwlMjBiaW9sb2d5fGVufDF8fHx8MTc2NDc5MDI5NHww&ixlib=rb-4.1.0&q=80&w=1080',
                ativo: true
            }
        ];

        await Content.insertMany(initialContents);
        console.log('✅ Conteúdos iniciais criados com sucesso!');
        console.log(`📊 ${initialContents.length} estruturas adicionadas ao banco de dados`);
        
        return {
            created: true,
            count: initialContents.length,
            contents: initialContents.map(c => ({ titulo: c.titulo, tema: c.tema }))
        };
    } catch (error) {
        console.error('❌ Erro ao criar conteúdos iniciais:', error);
        throw error;
    }
}