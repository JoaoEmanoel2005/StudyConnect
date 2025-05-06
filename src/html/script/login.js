import { API_URL } from './globalVar.js';
const BASE_URL = API_URL;
//ip do notbook do joao
//  const BASE_URL = "http://192.168.142.47:3000"

// Validação de e-mail enquanto digita (opcional, sem máscara)
document.getElementById('loginEmail').addEventListener('input', function (e) {
  let value = e.target.value;

  // Remove espaços no início/fim
  value = value.trim();

  e.target.value = value;
});

// Toggle para mostrar/ocultar senha
document.getElementById('togglePassword').addEventListener('click', function () {
  const passwordInput = document.getElementById('loginSenha');
  const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordInput.setAttribute('type', type);

  // Alterna o ícone
  this.classList.toggle('fa-eye-slash');
  this.classList.toggle('fa-eye');
});

document.addEventListener('DOMContentLoaded', function () {
  // Verificar se há uma preferência de tema salva
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
  }

  const themeToggle = document.getElementById('themeToggle');
  themeToggle.addEventListener('click', function () {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    this.classList.add('rotate');

    setTimeout(() => {
      updateThemeIcon(newTheme);
    }, 250);

    setTimeout(() => {
      this.classList.remove('rotate');
    }, 500);

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
});

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
document.getElementById('loginForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const email = document.getElementById('loginEmail').value.trim();
  const senha = document.getElementById('loginSenha').value;

  // Validação básica de e-mail
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Por favor, insira um e-mail válido.');
    return;
  }

  if (senha.length < 8) {
    alert('A senha deve ter pelo menos 8 caracteres.');
    return;
  }


  console.log(email, senha);

  fetch(`${BASE_URL}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, senha })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro de login: ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      console.log("Auth data: " + data.auth);

      if (data.auth) {
        window.alert("Login realizado")
        localStorage.setItem('token', data.token);  // Salva o token no localStorage (ou o que for necessário)
        console.log(localStorage.getItem('token'));
        const token = localStorage.getItem('token');

        // Limpar os campos de login após o sucesso
        document.getElementById('loginEmail').value = '';
        document.getElementById('loginSenha').value = '';

        if (token) {
          fetch(`${BASE_URL}/users/perfil`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`  // Envia o token no cabeçalho Authorization
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
            })
            .catch(error => {
              console.log('Erro:', error);
            });
        } else {
          console.error('Token não encontrado!');
        }

      } else {
        window.alert("Login falhou");
      }
    })
    .catch(error => {
      window.alert("Login falhou");
    });
});
