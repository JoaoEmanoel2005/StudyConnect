import { API_URL } from './globalVar.js';
const BASE_URL = API_URL;

window.toggleSidebar = function () {
    const sidebar = document.getElementById("sidebar");
    const isOpen = sidebar.classList.contains("open");

    if (isOpen) {
        sidebar.classList.remove("open");
        document.body.classList.remove("content-shift");
    } else {
        sidebar.classList.add("open");
        document.body.classList.add("content-shift");
    }
};


document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("toggleSidebarBtn").addEventListener("click", toggleSidebar);
});

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("logout").addEventListener("click", toggleSidebar);
});

async function carregarInstituicoes() {
    try {
        const response = await fetch(`${BASE_URL}/instituicao/todos`);
        const instituicoes = await response.json();
        const container = document.getElementById('instituicoesContainer');
        container.innerHTML = '';

        instituicoes.forEach(inst => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
        <h3>${inst.nome}</h3>
        <p><strong>Email:</strong> ${inst.email}</p>
        <p><strong>CNPJ:</strong> ${inst.cnpj}</p>
        <p><strong>Local:</strong> ${inst.local}</p>
        <p><strong>Tipo:</strong> ${inst.tipo}</p>
        <p><strong>Descrição:</strong> ${inst.descricao}</p>
        <p><strong>Registrado em:</strong> ${new Date(inst.data_registro).toLocaleString()}</p>
      `;
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Erro ao carregar instituições:', error);
    }
}

carregarInstituicoes();
