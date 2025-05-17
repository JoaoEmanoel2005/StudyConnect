import { API_URL } from './globalVar.js';
const BASE_URL = API_URL;

// Recupera o token do localStorage
const token = localStorage.getItem('token');

// Função para sidebar toggle
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

// Função para formatar CPF com pontos e traço (XXX.XXX.XXX-XX)
function formatarCPF(cpf) {
    // Remove caracteres não numéricos
    cpf = cpf.replace(/\D/g, '');
    
    // Aplica a formatação
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

// Função para validar CPF
function validarCPF(cpf) {
    // Remove caracteres não numéricos
    cpf = cpf.replace(/\D/g, '');
    
    // Verifica se tem 11 dígitos
    if (cpf.length !== 11) {
        return false;
    }
    
    // Verifica CPFs com dígitos iguais (que são inválidos)
    if (/^(\d)\1+$/.test(cpf)) {
        return false;
    }
    
    // Validação do primeiro dígito verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = soma % 11;
    let dv1 = resto < 2 ? 0 : 11 - resto;
    
    if (parseInt(cpf.charAt(9)) !== dv1) {
        return false;
    }
    
    // Validação do segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = soma % 11;
    let dv2 = resto < 2 ? 0 : 11 - resto;
    
    if (parseInt(cpf.charAt(10)) !== dv2) {
        return false;
    }
    
    return true;
}

// Função para carregar dados do perfil do servidor ou usar dados de exemplo
function carregarPerfil() {
    // Se tivermos um token, tentamos carregar do servidor
    if (token) {
        fetch(`${BASE_URL}/users/perfil`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Dados do perfil:', data);
            const user = data.user;
            
            // Atualiza os elementos do DOM com os dados do servidor
            document.getElementById('profileName').textContent = user.nome;
            document.getElementById('profileBio').textContent = user.escolaridade; // Usando escolaridade como "bio" temporário
            document.getElementById('escolaridade').textContent = user.escolaridade;
            document.getElementById('email').textContent = user.email;
            document.getElementById('cidade').textContent = user.cidade;
            document.getElementById('cpf').textContent = formatarCPF(user.cpf);
            
            // Se tiver foto de perfil, atualiza
            if (user.foto_perfil) {
                document.getElementById('profilePic').src = user.foto_perfil;
            }
        })
        .catch(error => {
            console.error('Erro ao carregar perfil:', error);
            carregarPerfilExemplo(); // Carrega dados de exemplo em caso de erro
        });
    } else {
        console.log('Token não encontrado, carregando dados de exemplo');
        carregarPerfilExemplo();
    }
}

// Função para carregar dados de exemplo (quando não há API ou token)
function carregarPerfilExemplo() {
    const dadosExemplo = {
        nome: "Maxson Daniel",
        escolaridade: "Ensino Superior",
        email: "maxsonExemplo@gmail.com",
        cidade: "Lorena",
        cpf: "12345678910"
    };
    
    // Atualiza os elementos do DOM com os dados de exemplo
    document.getElementById('profileName').textContent = dadosExemplo.nome;
    document.getElementById('profileBio').textContent = "Estudante de Tecnologia";
    document.getElementById('escolaridade').textContent = dadosExemplo.escolaridade;
    document.getElementById('email').textContent = dadosExemplo.email;
    document.getElementById('cidade').textContent = dadosExemplo.cidade;
    document.getElementById('cpf').textContent = formatarCPF(dadosExemplo.cpf);
}

// Função para alternar entre visualização e edição
function toggleEdicao() {
    const isEditing = document.body.classList.contains('editing-profile');
    const editBtn = document.getElementById('editProfileBtn');
    const photoEditOverlay = document.getElementById('photoEditOverlay');
    const editControls = document.getElementById('profileEditControls');
    
    if (!isEditing) {
        // Ativa modo de edição
        document.body.classList.add('editing-profile');
        editBtn.textContent = 'Cancelar';
        photoEditOverlay.classList.add('active');
        editControls.classList.remove('hidden');
        
        // Converter campos para modo de edição
        converterParaInputs();
    } else {
        // Desativa modo de edição
        document.body.classList.remove('editing-profile');
        editBtn.textContent = 'Editar Perfil';
        photoEditOverlay.classList.remove('active');
        editControls.classList.add('hidden');
        
        // Converter campos para modo de visualização
        converterParaTexto();
    }
}

// Função para converter os campos de exibição para inputs editáveis
function converterParaInputs() {
    // Escolaridade (usando select)
    const escolaridadeSpan = document.getElementById('escolaridade');
    const escolaridadeAtual = escolaridadeSpan.textContent;
    
    const selectEscolaridade = document.createElement('select');
    selectEscolaridade.id = 'editEscolaridade';
    selectEscolaridade.className = 'edit-input';
    
    const opcoes = ["Ensino Fundamental", "Ensino Médio", "Ensino Superior", "Pós-graduação", "Mestrado", "Doutorado"];
    opcoes.forEach(opcao => {
        const option = document.createElement('option');
        option.value = opcao;
        option.textContent = opcao;
        if (opcao === escolaridadeAtual) {
            option.selected = true;
        }
        selectEscolaridade.appendChild(option);
    });
    
    escolaridadeSpan.innerHTML = '';
    escolaridadeSpan.appendChild(selectEscolaridade);
    
    // Email (usando input text)
    const emailSpan = document.getElementById('email');
    const emailAtual = emailSpan.textContent;
    
    const inputEmail = document.createElement('input');
    inputEmail.type = 'email';
    inputEmail.id = 'editEmail';
    inputEmail.className = 'edit-input';
    inputEmail.value = emailAtual;
    
    emailSpan.innerHTML = '';
    emailSpan.appendChild(inputEmail);
    
    // Cidade (usando input text)
    const cidadeSpan = document.getElementById('cidade');
    const cidadeAtual = cidadeSpan.textContent;
    
    const inputCidade = document.createElement('input');
    inputCidade.type = 'text';
    inputCidade.id = 'editCidade';
    inputCidade.className = 'edit-input';
    inputCidade.value = cidadeAtual;
    
    cidadeSpan.innerHTML = '';
    cidadeSpan.appendChild(inputCidade);
    
    // CPF (usando input com máscara)
    const cpfSpan = document.getElementById('cpf');
    const cpfAtual = cpfSpan.textContent;
    
    const inputCpf = document.createElement('input');
    inputCpf.type = 'text';
    inputCpf.id = 'editCpf';
    inputCpf.className = 'edit-input';
    inputCpf.value = cpfAtual;
    inputCpf.maxLength = 14;
    
    inputCpf.addEventListener('input', function() {
        mascaraCPF(this);
    });
    
    cpfSpan.innerHTML = '';
    cpfSpan.appendChild(inputCpf);
}

// Função para converter os inputs de volta para campos de exibição
function converterParaTexto() {
    // Recuperar valores dos inputs (se existirem)
    const escolaridadeInput = document.getElementById('editEscolaridade');
    const emailInput = document.getElementById('editEmail');
    const cidadeInput = document.getElementById('editCidade');
    const cpfInput = document.getElementById('editCpf');
    
    if (escolaridadeInput) {
        document.getElementById('escolaridade').textContent = escolaridadeInput.value;
    }
    
    if (emailInput) {
        document.getElementById('email').textContent = emailInput.value;
    }
    
    if (cidadeInput) {
        document.getElementById('cidade').textContent = cidadeInput.value;
    }
    
    if (cpfInput) {
        document.getElementById('cpf').textContent = cpfInput.value;
    }
}

// Função para aplicar máscara de CPF durante digitação
function mascaraCPF(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{2})$/, '$1-$2');
    
    input.value = value;
}

// Função para salvar os dados do perfil
function salvarPerfil() {
    const escolaridadeInput = document.getElementById('editEscolaridade');
    const emailInput = document.getElementById('editEmail');
    const cidadeInput = document.getElementById('editCidade');
    const cpfInput = document.getElementById('editCpf');
    
    // Verificar se os inputs existem
    if (!escolaridadeInput || !emailInput || !cidadeInput || !cpfInput) {
        alert('Erro ao encontrar campos de edição.');
        return;
    }
    
    const escolaridade = escolaridadeInput.value;
    const email = emailInput.value;
    const cidade = cidadeInput.value;
    const cpf = cpfInput.value.replace(/\D/g, ''); // Remove formatação
    
    // Validação básica
    if (!email || !cidade || !cpf) {
        alert('Por favor, preencha todos os campos.');
        return;
    }
    
    // Validação de CPF
    if (!validarCPF(cpf)) {
        alert('CPF inválido. Por favor, verifique.');
        return;
    }
    
    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Email inválido. Por favor, verifique.');
        return;
    }
    
    // Dados para enviar à API
    const dadosAtualizados = {
        escolaridade,
        email,
        cidade,
        cpf
    };
    
    // Se tivermos um token, enviamos para a API
    if (token) {
        fetch(`${BASE_URL}/users/atualizar`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(dadosAtualizados)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Perfil atualizado:', data);
            
            // Atualiza o campo Bio com a escolaridade
            document.getElementById('profileBio').textContent = escolaridade;
            
            // Desativa o modo de edição
            toggleEdicao();
            
            alert('Perfil atualizado com sucesso!');
        })
        .catch(error => {
            console.error('Erro ao atualizar perfil:', error);
            alert('Ocorreu um erro ao atualizar o perfil. Por favor, tente novamente.');
        });
    } else {
        // Sem API, apenas atualizamos a interface
        document.getElementById('profileBio').textContent = escolaridade;
        
        // Desativa o modo de edição
        toggleEdicao();
        
        alert('Perfil atualizado! (Modo simulação - sem API)');
    }
}

// Função para lidar com upload de foto
function handlePhotoUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // Verifica se é uma imagem
    if (!file.type.startsWith('image/')) {
        alert('Por favor, selecione um arquivo de imagem válido.');
        return;
    }
    
    // Verifica o tamanho (limita a 5MB)
    if (file.size > 5 * 1024 * 1024) {
        alert('A imagem deve ter no máximo 5MB.');
        return;
    }
    
    // Cria um objeto URL para visualização da imagem
    const imgURL = URL.createObjectURL(file);
    document.getElementById('profilePic').src = imgURL;
    
    // Se tiver um token, poderíamos enviar a imagem para o servidor aqui...
    if (token) {
        const formData = new FormData();
        formData.append('foto_perfil', file);
        
        // Exemplo de upload (precisaria ser implementado no backend)
        // fetch(`${BASE_URL}/users/upload-foto`, {
        //     method: 'POST',
        //     headers: {
        //         'Authorization': `Bearer ${token}`
        //     },
        //     body: formData
        // })
        // .then(response => response.json())
        // .then(data => console.log('Foto atualizada:', data))
        // .catch(error => console.error('Erro ao enviar foto:', error));
    }
}

// Inicializa a página quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    // Inicializa o botão da sidebar
    document.getElementById("toggleSidebarBtn").addEventListener("click", toggleSidebar);
    
    // Inicializa o botão de logout
    document.getElementById("logout").addEventListener("click", () => {
        localStorage.removeItem('token');
        window.location.href = 'login';
    });
    
    // Botão editar perfil
    document.getElementById("editProfileBtn").addEventListener("click", toggleEdicao);
    
    // Botão cancelar edição
    document.getElementById("cancelEditBtn").addEventListener("click", toggleEdicao);
    
    // Botão salvar
    document.getElementById("saveProfileBtn").addEventListener("click", salvarPerfil);
    
    // Input de foto de perfil
    document.getElementById("photoInput").addEventListener("change", handlePhotoUpload);
    
    // Carrega os dados do perfil
    carregarPerfil();
});