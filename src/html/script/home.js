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
    document.getElementById("logout").addEventListener("click", toggleSidebar);

    // Cursos
    document.getElementById('cursos-prev').addEventListener('click', () => {
        document.getElementById('cursosCarousel').scrollBy({ left: -270, behavior: 'smooth' });
    });

    document.getElementById('cursos-next').addEventListener('click', () => {
        document.getElementById('cursosCarousel').scrollBy({ left: 270, behavior: 'smooth' });
    });

    // Instituições
    document.getElementById('instituicoes-prev').addEventListener('click', () => {
        document.getElementById('instituicoesCarousel').scrollBy({ left: -270, behavior: 'smooth' });
    });

    document.getElementById('instituicoes-next').addEventListener('click', () => {
        document.getElementById('instituicoesCarousel').scrollBy({ left: 270, behavior: 'smooth' });
    });

    carregarInstituicoes();
    carregarCursos();
});

async function carregarInstituicoes() {
    try {
        const response = await fetch(`${BASE_URL}/instituicao/todos`);
        const instituicoes = await response.json();
        const container = document.getElementById('instituicoesCarousel');
        container.innerHTML = '';

        instituicoes.forEach(inst => {
            const card = document.createElement('div');
            card.className = 'carousel-card';
            card.innerHTML = `
        <h4>${inst.nome}</h4>
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

async function carregarCursos() {
    try {
        const response = await fetch(`${BASE_URL}/cursos/todos`);
        const cursos = await response.json();
        const carousel = document.getElementById('cursosCarousel');
        carousel.innerHTML = '';

        cursos.forEach(curso => {
            const card = document.createElement('div');
            card.className = 'carousel-card';
            card.innerHTML = `
        <h4>${curso.nome}</h4>
        <p><strong>Área:</strong> ${curso.area}</p>
        <p><strong>Tipo:</strong> ${curso.tipo}</p>
        <p><strong>Período:</strong> ${curso.periodo}</p>
        <p><strong>Duração:</strong> ${curso.duracao}</p>
        <p><strong>Custo:</strong> ${curso.custo}</p>
      `;
            carousel.appendChild(card);
        });
    } catch (error) {
        console.error('Erro ao carregar cursos:', error);
    }
}
