const fetch = require('node-fetch'); // npm install node-fetch@2
const BASE_URL = 'http://localhost:3000'; // Ajuste conforme necessário

const credenciais = {
    email: 'ana.silva@email.com', // use um e-mail cadastrado
    senha: 'senha123'
};

async function testarLogin() {
    try {
        const response = await fetch(`${BASE_URL}/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credenciais)
        });

        const data = await response.json();

        if (response.ok) {
            console.log('✅ Login bem-sucedido!');
            console.log('🔑 Token:', data.token);
            console.log('⏳ Expira em (s):', data.expiresIn);

            // Aqui você pode encadear o teste de logout se quiser
            await testarLogout(data.token);
        } else {
            console.log('❌ Falha no login:', data.message);
        }

    } catch (err) {
        console.error('🚨 Erro ao tentar login:', err.message);
    }
}

async function testarLogout(token) {
    try {
        const response = await fetch(`${BASE_URL}/users/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // se você quiser passar o token
            }
        });

        const data = await response.json();

        if (response.ok) {
            console.log('👋 Logout realizado com sucesso!');
            console.log(data);
        } else {
            console.log('❌ Erro no logout:', data.message);
        }

    } catch (err) {
        console.error('🚨 Erro ao tentar logout:', err.message);
    }
}

testarLogin();
