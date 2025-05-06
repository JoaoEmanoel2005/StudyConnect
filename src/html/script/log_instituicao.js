import { API_URL } from './globalVar.js';
const BASE_URL = API_URL;

document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    try {
        const resposta = await fetch(`${BASE_URL}/instituicao/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, senha })
        });

        const resultado = await resposta.json();
        document.getElementById('resposta').textContent = JSON.stringify(resultado, null, 2);

        if (resultado.token) {
            localStorage.setItem('token', resultado.token);
            console.log("Token armazenado:", resultado.token);
        }

    } catch (error) {
        document.getElementById('resposta').textContent = 'Erro: ' + error.message;
    }
});