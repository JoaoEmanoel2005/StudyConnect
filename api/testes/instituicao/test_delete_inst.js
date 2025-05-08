const fetch = require('node-fetch'); // Versão 2 para CommonJS
const BASE_URL = 'http://localhost:3000'; // Altere se necessário

const cnpjsParaDeletar = [
    '11111111111111',
    '22222222222222',
    '33333333333333',
    '44444444444444',
    '55555555555555',
    '66666666666666',
    '77777777777777',
    '88888888888888',
    '99999999999999',
    '10101010101010',
    '12121212121212',
    '13131313131313'
];

async function deletarInstituicoes() {
    for (const cnpj of cnpjsParaDeletar) {
        try {
            const response = await fetch(`${BASE_URL}/instituicao/delete`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cnpj })
            });

            const data = await response.json();
            if (response.ok) {
                console.log(`🗑️ CNPJ ${cnpj} excluído com sucesso.`);
            } else {
                console.log(`⚠️ Erro ao excluir ${cnpj}: ${data.message}`);
            }
        } catch (err) {
            console.error(`🚨 Erro de conexão ao excluir ${cnpj}:`, err.message);
        }
    }
}

deletarInstituicoes();
