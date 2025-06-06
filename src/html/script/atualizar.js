import { API_URL } from './globalVar.js';
const BASE_URL = API_URL;

const form = document.getElementById('formAtualizar');
const mensagem = document.getElementById('mensagem');
const togglePasswordBtn = document.getElementById('togglePassword');
const senhaInput = document.getElementById('senha');
const cpfInput = document.getElementById('cpf');
const themeToggleBtn = document.getElementById('themeToggle');

// Função para mostrar mensagem com estilo
function mostrarMensagem(texto, tipo = 'success') {
    mensagem.textContent = texto;
    mensagem.className = tipo;
}

// Calcula idade a partir da data de nascimento (string YYYY-MM-DD)
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

// Máscara para CPF (000.000.000-00)
cpfInput.addEventListener('input', () => {
    let valor = cpfInput.value.replace(/\D/g, ''); // Remove tudo que não é número

    if (valor.length > 11) valor = valor.slice(0, 11); // Limita a 11 dígitos

    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

    cpfInput.value = valor;
});

// Toggle para mostrar/ocultar senha
togglePasswordBtn.addEventListener('click', () => {
    const type = senhaInput.getAttribute('type') === 'password' ? 'text' : 'password';
    senhaInput.setAttribute('type', type);

    togglePasswordBtn.querySelector('i').classList.toggle('fa-eye-slash');
    togglePasswordBtn.querySelector('i').classList.toggle('fa-eye');
});

// Alternar tema claro/escuro com animação e ícone
function updateThemeIcon(theme) {
    const icon = themeToggleBtn.querySelector('i');
    if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Carregar tema salvo ou padrão
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    // Carregar dados do usuário
    carregarDadosDoUsuario();
});

themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    themeToggleBtn.classList.add('rotate');

    setTimeout(() => {
        updateThemeIcon(newTheme);
    }, 250);

    setTimeout(() => {
        themeToggleBtn.classList.remove('rotate');
    }, 500);

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Função para preencher formulário com dados atuais
async function carregarDadosDoUsuario() {
    const token = localStorage.getItem('token');

    if (!token) {
        mostrarMensagem('Token não encontrado. Faça login primeiro.', 'error');
        return;
    }

    try {
        const response = await fetch(`${BASE_URL}/users/perfil`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (response.ok) {
            const userData = data.user; // <-- aqui pegamos o objeto user

            for (const campo in userData) {
                if (form.elements[campo]) {
                    form.elements[campo].value = userData[campo];
                }
            }
        } else {
            mostrarMensagem('Erro ao buscar dados do perfil.', 'error');
        }
    } catch (error) {
        console.error('Erro ao buscar perfil:', error);
        mostrarMensagem('Erro ao carregar perfil.', 'error');
    }
}


// Validação e envio do formulário
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Validações

    const senha = senhaInput.value.trim();
    if (senha.length < 8) {
        mostrarMensagem('A senha deve ter pelo menos 8 caracteres.', 'error');
        senhaInput.focus();
        return;
    }

    const nascimento = form.elements['nascimento'].value;
    if (!nascimento) {
        mostrarMensagem('Informe a data de nascimento.', 'error');
        form.elements['nascimento'].focus();
        return;
    }

    const idade = calcularIdade(nascimento);
    if (idade < 14) {
        mostrarMensagem('Você precisa ter pelo menos 14 anos para atualizar os dados.', 'error');
        form.elements['nascimento'].focus();
        return;
    }

    // Remove máscara do CPF para enviar só números
    const cpfComMascara = cpfInput.value;
    const cpf = cpfComMascara.replace(/\D/g, '');

    if (cpf.length !== 11) {
        mostrarMensagem('CPF inválido. Deve conter 11 números.', 'error');
        cpfInput.focus();
        return;
    }

    // Monta objeto para envio
    const formData = new FormData(form);
    const dados = Object.fromEntries(formData.entries());
    dados.cpf = cpf; // substitui com cpf sem máscara

    const token = localStorage.getItem('token');
    if (!token) {
        mostrarMensagem('Token não encontrado.', 'error');
        return;
    }

    try {
        const response = await fetch(`${BASE_URL}/users/atualizar`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(dados)
        });

        const result = await response.json();

        if (response.ok) {
            mostrarMensagem('✅ Dados atualizados com sucesso!', 'success');
        } else {
            mostrarMensagem(`❌ Erro: ${result.mensagem || 'Desconhecido'}`, 'error');
        }
    } catch (error) {
        console.error('Erro ao atualizar:', error);
        mostrarMensagem('Erro ao conectar com o servidor.', 'error');
    }
});
