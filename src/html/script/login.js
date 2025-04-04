// Formatar CPF enquanto digita
document.getElementById('cpf').addEventListener('input', function (e) {
    let value = e.target.value;
    // Remove todos os caracteres não numéricos
    value = value.replace(/\D/g, '');
    // Aplica a máscara de CPF (000.000.000-00)
    if (value.length <= 11) {
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }
    e.target.value = value;
  });
  
  // Validação básica de CPF ao enviar o formulário
  document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');
    if (form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        const cpf = document.getElementById('cpf').value.replace(/\D/g, '');
        if (cpf.length !== 11) {
          alert('Por favor, insira um CPF válido com 11 dígitos.');
          return false;
        }
        // Aqui você pode adicionar uma validação mais completa do CPF
        // ou enviar o formulário para processamento
        alert('Formulário enviado com sucesso!');
      });
    }
  });
  
  // Toggle para mostrar/esconder senha
  document.getElementById('togglePassword').addEventListener('click', function() {
    const passwordInput = document.getElementById('password');
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    
    // Alterna o ícone
    this.classList.toggle('fa-eye-slash');
    this.classList.toggle('fa-eye');
  });
  
  // Configuração do tema escuro
  document.addEventListener('DOMContentLoaded', function() {
    // Verificar se há uma preferência de tema salva
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
      updateThemeIcon(savedTheme);
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