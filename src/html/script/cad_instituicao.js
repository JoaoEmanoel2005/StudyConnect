import { API_URL } from './globalVar.js';
const BASE_URL = API_URL;

document.getElementById('cadastroForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch(`${BASE_URL}/instituicao/cadastro`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const resultado = await response.json();
        window.alert("cadastro de instituicao realizado");
    } catch (error) {
        window.alert("cadastro invalido", error);
    }
});