const fetch = require('node-fetch'); // Versão 2 para CommonJS
const BASE_URL = 'http://localhost:3000'; // Altere se sua API estiver em outra porta/host

const instituicoesParaCadastrar = [
    {
        nome: 'Instituição Alpha',
        email: 'alpha@email.com',
        senha: 'senha123',
        cnpj: '11111111111111',
        local: 'São Paulo',
        descricao: 'Instituição focada em educação.',
        tipo: 'ONG'
    },
    {
        nome: 'Instituição Beta',
        email: 'beta@email.com',
        senha: 'senha456',
        cnpj: '22222222222222',
        local: 'Rio de Janeiro',
        descricao: 'Apoio a comunidades carentes.',
        tipo: 'Associação'
    },
    {
        nome: 'Instituição Gama',
        email: 'gama@email.com',
        senha: 'senha789',
        cnpj: '33333333333333',
        local: 'Belo Horizonte',
        descricao: 'Projeto de inclusão digital.',
        tipo: 'Fundação'
    },
    {
        nome: 'Instituição Delta',
        email: 'delta@email.com',
        senha: 'senha101',
        cnpj: '44444444444444',
        local: 'Curitiba',
        descricao: 'Apoio a jovens aprendizes.',
        tipo: 'ONG'
    },
    {
        nome: 'Instituição Épsilon',
        email: 'epsilon@email.com',
        senha: 'senha202',
        cnpj: '55555555555555',
        local: 'Fortaleza',
        descricao: 'Cultura e arte para crianças.',
        tipo: 'Associação'
    },
    {
        nome: 'Instituição Zeta',
        email: 'zeta@email.com',
        senha: 'senha303',
        cnpj: '66666666666666',
        local: 'Salvador',
        descricao: 'Combate à fome.',
        tipo: 'ONG'
    },
    {
        nome: 'Instituição Eta',
        email: 'eta@email.com',
        senha: 'senha404',
        cnpj: '77777777777777',
        local: 'Porto Alegre',
        descricao: 'Projetos de reciclagem urbana.',
        tipo: 'Fundação'
    },
    {
        nome: 'Instituição Theta',
        email: 'theta@email.com',
        senha: 'senha505',
        cnpj: '88888888888888',
        local: 'Recife',
        descricao: 'Inclusão social e acessibilidade.',
        tipo: 'Associação'
    },
    {
        nome: 'Instituição Iota',
        email: 'iota@email.com',
        senha: 'senha606',
        cnpj: '99999999999999',
        local: 'Florianópolis',
        descricao: 'Capacitação para mulheres.',
        tipo: 'ONG'
    },
    {
        nome: 'Instituição Kappa',
        email: 'kappa@email.com',
        senha: 'senha707',
        cnpj: '10101010101010',
        local: 'Goiânia',
        descricao: 'Saúde preventiva em comunidades.',
        tipo: 'Associação'
    },
    {
        nome: 'Instituição Lambda',
        email: 'lambda@email.com',
        senha: 'senha808',
        cnpj: '12121212121212',
        local: 'Manaus',
        descricao: 'Conservação da natureza.',
        tipo: 'ONG'
    },
    {
        nome: 'Instituição Mu',
        email: 'mu@email.com',
        senha: 'senha909',
        cnpj: '13131313131313',
        local: 'Natal',
        descricao: 'Apoio a pessoas com deficiência.',
        tipo: 'ONG'
    }

];

async function cadastrarInstituicoes() {
    for (const inst of instituicoesParaCadastrar) {
        try {
            const response = await fetch(`${BASE_URL}/instituicao/cadastro`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(inst)
            });

            const data = await response.json();
            if (response.ok) {
                console.log(`✅ ${inst.nome} cadastrada com sucesso! ID: ${data.id}`);
            } else {
                console.log(`❌ Erro ao cadastrar ${inst.nome}: ${data.message}`);
            }
        } catch (err) {
            console.error(`🚨 Erro de conexão para ${inst.nome}:`, err.message);
        }
    }
}

cadastrarInstituicoes();
