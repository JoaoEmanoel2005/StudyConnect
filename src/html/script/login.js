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
  
  // Toggle para mostrar/ocultar senha
  document.getElementById('togglePassword').addEventListener('click', function() {
    const passwordInput = document.getElementById('password');
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
  
  // Validação básica ao enviar o formulário
  document.querySelector('button').addEventListener('click', function() {
    const cpf = document.getElementById('cpf').value.replace(/\D/g, '');
    const password = document.getElementById('password').value;
    
    if (cpf.length !== 11) {
      alert('Por favor, insira um CPF válido com 11 dígitos.');
      return;
    }
    
    if (password.length < 6) {
      alert('A senha deve ter pelo menos 6 caracteres.');
      return;
    }
    
    // Aqui você adicionaria o código para enviar os dados para seu backend
    console.log('Dados válidos, enviando para autenticação...');
    // Exemplo: window.location.href = 'dashboard.html';
  });