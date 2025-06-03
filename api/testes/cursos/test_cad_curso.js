const fetch = require('node-fetch'); // ou use axios se preferir
const BASE_URL = 'http://localhost:3000';

const instituicoes = [
    { email: 'alpha@email.com', senha: 'senha123' },
    { email: 'beta@email.com', senha: 'senha456' },
    { email: 'gama@email.com', senha: 'senha789' },
    { email: 'delta@email.com', senha: 'senha101' },
    { email: 'epsilon@email.com', senha: 'senha202' },
    { email: 'zeta@email.com', senha: 'senha303' },
    { email: 'eta@email.com', senha: 'senha404' },
    { email: 'theta@email.com', senha: 'senha505' },
    { email: 'iota@email.com', senha: 'senha606' },
    { email: 'kappa@email.com', senha: 'senha707' },
    { email: 'lambda@email.com', senha: 'senha808' },
    { email: 'mu@email.com', senha: 'senha909' }
];

// Cursos exemplo
const cursosBase = [
    {
        nome: 'Curso de Programação Web',
        area: 'Tecnologia',
        tipo: 'Presencial',
        descricao: 'Curso introdutório à programação web.',
        periodo: 'Manhã',
        custo: 'Gratuito',
        duracao: '6 meses'
    },
    {
        nome: 'Curso de Design Gráfico',
        area: 'Artes',
        tipo: 'Online',
        descricao: 'Criação de peças visuais e identidade.',
        periodo: 'Noite',
        custo: 'R$ 300,00',
        duracao: '3 meses'
    }
];

async function loginInstituicao(email, senha) {
    const res = await fetch(`${BASE_URL}/instituicao/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.mensagem || 'Login falhou');
    return data.token;
}

async function cadastrarCurso(token, curso) {
    const res = await fetch(`${BASE_URL}/cursos/cadastro`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(curso)
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.mensagem || 'Erro no cadastro do curso');
    return data;
}

async function rodarTestes() {
    for (let i = 0; i < instituicoes.length; i++) {
        const { email, senha } = instituicoes[i];
        const cursos = cursosBase.map(curso => ({
            ...curso,
            nome: `${curso.nome} - ${email.split('@')[0]}`
        }));

        try {
            const token = await loginInstituicao(email, senha);
            console.log(`🔑 Login bem-sucedido para ${email}`);

            for (const curso of cursos) {
                const resultado = await cadastrarCurso(token, curso);
                console.log(`✅ Curso "${curso.nome}" cadastrado! ID: ${resultado.cursoId}`);
            }
        } catch (err) {
            console.error(`❌ Falha com ${email}: ${err.message}`);
        }
    }
}

rodarTestes();
