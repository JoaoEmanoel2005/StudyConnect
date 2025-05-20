import { API_URL } from './globalVar.js';
const BASE_URL = API_URL;

//Function Exibe e Oculta senha
document.getElementById('togglePassword').addEventListener('click', function() {
    const passwordInput = document.getElementById('senha');
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    
    // Alterna o ícone
    this.classList.toggle('fa-eye-slash');
    this.classList.toggle('fa-eye');
});

// Function Regex CNPJ
document.getElementById('cnpj').addEventListener('input', function () {
    let valor = this.value.replace(/\D/g, ''); // Remove tudo que não é número
    
    if (valor.length > 14) valor = valor.slice(0, 14); // Limita a 11 dígitos
    
    // Aplica a máscara: 000.000.000-00
    valor = valor.replace(/(\d{2})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d)/, '$1/$2');
    valor = valor.replace(/(\d{4})(\d{1,2})$/, '$1-$2');
    
    this.value = valor;
});

document.getElementById("btnCadastrar").addEventListener("click", function (event) {
    event.preventDefault();

    // Limpa erros anteriores
    const campos = document.querySelectorAll(".input-field");
    campos.forEach(campo => campo.classList.remove("erro"));

    // Captura os valores
    const nome = document.getElementById("nome");
    const email = document.getElementById("email");
    const senha = document.getElementById("senha");
    const cnpjInput = document.getElementById("cnpj");
    const local = document.getElementById("local");
    const descricao = document.getElementById("descricao");
    const tipo = document.getElementById("tipo");

    // Validação manual
    let valido = true;

    if (!nome.value.trim()) { nome.classList.add("erro"); valido = false; }
    if (!email.value.trim()) { email.classList.add("erro"); valido = false; }
    if (senha.value.length < 8) { senha.classList.add("erro"); valido = false; alert("A senha deve ter pelo menos 8 caracteres."); }
    if (!cnpjInput.value.trim()) { cnpjInput.classList.add("erro"); valido = false; }
    if (!local.value.trim()) { local.classList.add("erro"); valido = false; }
    if (!descricao.value.trim()) { descricao.classList.add("erro"); valido = false; }
    if (!tipo.value) { tipo.classList.add("erro"); valido = false; }

    if (!valido) {
        alert("Por favor, preencha todos os campos obrigatórios corretamente.");
        return;
    }

    // Remover regex CNPJ
    const cnpj = cnpjInput.value.replace(/\D/g, '');

    // Enviar dados
    fetch(`${BASE_URL}/instituicao/cadastro`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome: nome.value,
            email: email.value,
            senha: senha.value,
            local: local.value,
            cnpj: cnpj,
            descricao: descricao.value,
            tipo: tipo.value
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Erro na requisição");
        }
        return response.json();
    })
    .then(data => {
        alert("Cadastro realizado com sucesso!");
        // Limpar campos
        [nome, email, senha, cnpjInput, local, descricao, tipo].forEach(el => el.value = '');
    })
    .catch(error => {
        console.error("Erro:", error);
        alert("Cadastro não realizado.");
    });
});