const fetch = require('node-fetch'); // npm install node-fetch@2
const BASE_URL = 'http://localhost:3000'; // ajuste conforme necessário

const usuarioOriginal = {
    nome: 'Teste Completo',
    username: 'teste.completo',
    email: 'teste.completo@email.com',
    senha: 'senha123',
    cpf: '17171717171',
    codigo_recuperacao: 'TESTE123',
    nascimento: '1990-01-01',
    cidade: 'Cidade Inicial',
    escolaridade: 'Ensino Médio'
};

const dadosAtualizados = {
    nome: 'Teste Atualizado',
    username: 'teste.atualizado',
    email: 'teste.atualizado@email.com',
    senha: 'novaSenha123',
    cpf: '17171717171', // mesmo CPF
    codigo_recuperacao: 'NOVO123',
    nascimento: '1991-02-02',
    cidade: 'Cidade Atualizada',
    escolaridade: 'Ensino Superior'
};

async function cadastrarUsuario() {
    const response = await fetch(`${BASE_URL}/users/cadastro`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuarioOriginal)
    });

    const data = await response.json();

    if (response.ok) {
        console.log('✅ Usuário cadastrado com sucesso:', data);
    } else {
        throw new Error(`❌ Erro ao cadastrar usuário: ${data.message}`);
    }
}

async function logarUsuario() {
    const response = await fetch(`${BASE_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: usuarioOriginal.email,
            senha: usuarioOriginal.senha
        })
    });

    const data = await response.json();

    if (response.ok && data.token) {
        console.log('🔐 Login realizado com sucesso!');
        console.log('🔑 Token:', data.token);
        return data.token;
    } else {
        throw new Error(`❌ Falha no login: ${data.message}`);
    }
}

async function atualizarUsuario(token) {
    const response = await fetch(`${BASE_URL}/users/atualizar`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(dadosAtualizados)
    });

    const data = await response.json();

    if (response.ok) {
        console.log('✏️ Dados atualizados com sucesso:', data.mensagem);
    } else {
        throw new Error(`❌ Erro ao atualizar dados: ${data.message}`);
    }
}

(async () => {
    try {
        console.log('\n📦 Iniciando fluxo de teste completo...\n');
        await cadastrarUsuario();
        const token = await logarUsuario();
        await atualizarUsuario(token);
        console.log('\n✅ Fluxo de teste completo finalizado com sucesso.\n');
    } catch (err) {
        console.error('\n🚨 Erro no teste:', err.message);
    }
})();
