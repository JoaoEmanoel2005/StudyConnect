import { API_URL } from './globalVar.js';
const BASE_URL = API_URL;

// Recupera o token do localStorage
const token = localStorage.getItem('token');
// Verifique se o token foi recuperado corretamente

// Função para formatar a data como DD/MM/AAAA
function formatarData(dataISO) {
    const data = new Date(dataISO);
    return data.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
}

// Função para calcular a idade
function calcularIdade(dataNascimento) {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const m = hoje.getMonth() - nascimento.getMonth();

    if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
        idade--;
    }

    return idade;
}

if (token) {
    fetch(`${BASE_URL}/users/perfil`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`  // Envia o token aqui
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.statusText}`);
            }
            return response.json(); // Só tenta converter para JSON se a resposta for válida
        })
        .then(data => {
            console.log('Dados do perfil:', data);
            const user = data.user;

            const profileDiv = document.getElementById('profileInfo');


            const nascimentoFormatado = formatarData(user.nascimento);
            const registroFormatado = formatarData(user.data_registro);
            const idade = calcularIdade(user.nascimento);

            // Substitua os campos abaixo pelos que seu backend realmente envia
            profileDiv.innerHTML = `

            <img src="${user.foto_perfil}" alt="Foto de perfil" class="profile-pic">

                <div class="info-item">
                    <label>Nome:</label>
                    <span>${user.nome}</span>
                </div>
                <div class="info-item">
                    <label>Email:</label>
                    <span>${user.email}</span>
                </div>
                 <div class="info-item">
                    <label>Senha:</label>
                    <span>${user.senha}</span>
                </div>
                 <div class="info-item">
                    <label>CPF:</label>
                    <span>${user.cpf}</span>
                </div>
                <div class="info-item">
                    <label>Idade:</label>
                    <span>${idade}</span>
                </div>
                 <div class="info-item">
                    <label>Codigo Recuperacao:</label>
                    <span>${user.codigo_recuperacao}</span>
                </div>
                 <div class="info-item">
                    <label>Nascimento:</label>
                    <span>${nascimentoFormatado}</span>
                </div>
                 <div class="info-item">
                    <label>Cidade:</label>
                    <span>${user.cidade}</span>
                </div>
                 <div class="info-item">
                    <label>Escolaridade:</label>
                    <span>${user.escolaridade}</span>
                </div>
                 <div class="info-item">
                    <label>Data de Registro:</label>
                    <span>${registroFormatado}</span>
                </div>
               
            `;

        })
        .catch(error => {
            console.error('Erro:', error);
        });
} else {
    console.error('Token não encontrado!');
}