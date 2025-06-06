import { API_URL } from './globalVar.js';
const BASE_URL = API_URL;

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

// Toggle para mostrar/ocultar senha
document.getElementById('togglePassword').addEventListener('click', function() {
    const passwordInput = document.getElementById('senha');
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    
    // Alterna o ícone
    this.classList.toggle('fa-eye-slash');
    this.classList.toggle('fa-eye');
});
    
document.addEventListener('DOMContentLoaded', function() {
    // Verificar se há uma preferência de tema salva
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    } else {
        // Defina o tema padrão para 'light' caso não tenha uma preferência salva
        document.documentElement.setAttribute('data-theme', 'light');
    }

    // Alternar tema ao clicar no botão
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        // Adicionar classe para animação de rotação
        this.classList.add('rotate');
        
        // Aguardar metade da animação para trocar o ícone
        setTimeout(() => {
            updateThemeIcon(newTheme);
        }, 250);
        
        // Remover classe após a animação terminar
        setTimeout(() => {
            this.classList.remove('rotate');
        }, 500);
        
        // Atualizar tema
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
});

// Função para atualizar o ícone do tema
function updateThemeIcon(theme) {
    const themeIcon = document.getElementById('themeToggle');
    if (theme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

document.getElementById('cpf').addEventListener('input', function () {
    let valor = this.value.replace(/\D/g, ''); // Remove tudo que não é número
    
    if (valor.length > 11) valor = valor.slice(0, 11); // Limita a 11 dígitos
    
    // Aplica a máscara: 000.000.000-00
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    
    this.value = valor;
});


document.getElementById("btnCadastrar").addEventListener("click", function (event) {
    event.preventDefault();
   
    const validarSenha = document.getElementById("senha").value;

        if (validarSenha.length < 8){
        window.alert("tem q ter mais de 8 digitos");
        return;
        }
    
    
    const nome = document.getElementById("nome").value;
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const cpfMascara = document.getElementById("cpf").value;
    // Removendo o Regex para o envio
    const cpf = cpfMascara.replace(/\D/g, ''); 
    const codigo_recuperacao = document.getElementById("codigoRecuperacao").value;
    const nascimento = document.getElementById("dataNascimento").value;
    const cidade = document.getElementById("cidade").value;
    const escolaridade = document.getElementById("escolaridade").value;

    const idade = calcularIdade(nascimento)

    if (idade < 14) {
        alert("Você precisa ter pelo menos 14 anos para se cadastrar.");
        return; // cancela o envio
    }

    console.log("Enviando:", { nome, username, email, senha, cpf,codigo_recuperacao, nascimento, cidade, escolaridade });


    fetch(`${BASE_URL}/users/cadastro`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, username, email, senha, cpf, codigo_recuperacao, nascimento, cidade, escolaridade })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro na requisição");
            }
            return response.json();
        })
        .then(data => {
            console.log("Resposta:", data);
            alert("Cadastro realizado com sucesso!");
            window.location.href = 'login';

            document.getElementById('nome').value = '';
            document.getElementById('username').value = '';
            document.getElementById('email').value = '';
            document.getElementById('senha').value = '';
            document.getElementById('cpf').value = '';
            document.getElementById('codigoRecuperacao').value = '';
            document.getElementById('dataNascimento').value = '';
            document.getElementById('cidade').value = '';
            document.getElementById('escolaridade').value = '';

            
        })
        .catch(error => {
            console.error("Erro:", error);
            alert("Cadastro não realizado.");
        });

});

