const fetch = require('node-fetch'); // npm install node-fetch@2
const BASE_URL = 'http://localhost:3000'; // Ajuste conforme seu backend

const cpfsParaDeletar = [
    '11111111111',
    '22222222222',
    '33333333333',
    '44444444444',
    '55555555555',
    '66666666666',
    '77777777777',
    '88888888888',
    '99999999999',
    '10101010101',
    '12121212121',
    '13131313131',
    '14141414141',
    '15151515151',
    '16161616161'
];

async function deletarUsuarios() {
    for (const cpf of cpfsParaDeletar) {
        try {
            const response = await fetch(`${BASE_URL}/users/delete`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cpf })
            });

            const data = await response.json();
            if (response.ok) {
                console.log(`🗑️ CPF ${cpf} excluído com sucesso.`);
            } else {
                console.log(`⚠️ Erro ao excluir ${cpf}: ${data.message}`);
            }
        } catch (err) {
            console.error(`🚨 Erro de conexão ao excluir ${cpf}:`, err.message);
        }
    }
}

deletarUsuarios();
