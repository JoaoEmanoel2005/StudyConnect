// Toggle Menu for Mobile
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
}

// Tab switching functionality
const loginTab = document.getElementById('loginTab');
const registerTab = document.getElementById('registerTab');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const switchFormBtn = document.getElementById('switchFormBtn');
const toRegisterLink = document.getElementById('toRegisterLink');
const toLoginLink = document.getElementById('toLoginLink');

function switchToLogin() {
    loginTab.classList.add('active');
    registerTab.classList.remove('active');
    loginForm.classList.add('active');
    registerForm.classList.remove('active');
    switchFormBtn.textContent = 'Create an Account';
}

function switchToRegister() {
    registerTab.classList.add('active');
    loginTab.classList.remove('active');
    registerForm.classList.add('active');
    loginForm.classList.remove('active');
    switchFormBtn.textContent = 'Login to Account';
}

if (loginTab && registerTab) {
    loginTab.addEventListener('click', switchToLogin);
    registerTab.addEventListener('click', switchToRegister);
    
    // Switch form button on image side
    switchFormBtn.addEventListener('click', () => {
        if (loginForm.classList.contains('active')) {
            switchToRegister();
        } else {
            switchToLogin();
        }
    });
    
    // Links at the bottom of forms
    toRegisterLink.addEventListener('click', (e) => {
        e.preventDefault();
        switchToRegister();
    });
    
    toLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        switchToLogin();
    });
}

// Password visibility toggle
const passwordToggles = document.querySelectorAll('.password-toggle');

passwordToggles.forEach(toggle => {
    toggle.addEventListener('click', function() {
        const passwordField = this.previousElementSibling;
        const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordField.setAttribute('type', type);
        this.textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
    });
});

// Form validation
const loginFormElement = document.getElementById('loginFormElement');
const registerFormElement = document.getElementById('registerFormElement');

loginFormElement.addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;
    
    const emailInput = document.getElementById('loginEmail');
    const passwordInput = document.getElementById('loginPassword');
    
    // Basic email validation
    if (!emailInput.value || !emailInput.value.includes('@')) {
        emailInput.parentElement.classList.add('error');
        isValid = false;
    } else {
        emailInput.parentElement.classList.remove('error');
    }
    
    // Password validation
    if (!passwordInput.value) {
        passwordInput.parentElement.parentElement.classList.add('error');
        isValid = false;
    } else {
        passwordInput.parentElement.parentElement.classList.remove('error');
    }
    
    if (isValid) {
        // Simulate login success
        alert('Login successful! Redirecting to dashboard...');
        // In a real app, you would handle the login process here
        // window.location.href = 'dashboard.html';
    }
});

registerFormElement.addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;
    
    const nameInput = document.getElementById('registerName');
    const emailInput = document.getElementById('registerEmail');
    const passwordInput = document.getElementById('registerPassword');
    const confirmPasswordInput = document.getElementById('registerConfirmPassword');
    const termsAgreement = document.getElementById('termsAgreement');
    
    // Name validation
    if (!nameInput.value) {
        nameInput.parentElement.classList.add('error');
        isValid = false;
    } else {
        nameInput.parentElement.classList.remove('error');
    }
    
    // Email validation
    if (!emailInput.value || !emailInput.value.includes('@')) {
        emailInput.parentElement.classList.add('error');
        isValid = false;
    } else {
        emailInput.parentElement.classList.remove('error');
    }
    
    // Password validation
    if (!passwordInput.value || passwordInput.value.length < 8) {
        passwordInput.parentElement.parentElement.classList.add('error');
        isValid = false;
    } else {
        passwordInput.parentElement.parentElement.classList.remove('error');
    }
    
    // Confirm password validation
    if (passwordInput.value !== confirmPasswordInput.value) {
        confirmPasswordInput.parentElement.parentElement.classList.add('error');
        isValid = false;
    } else {
        confirmPasswordInput.parentElement.parentElement.classList.remove('error');
    }
    
    // Terms agreement validation
    if (!termsAgreement.checked) {
        alert('Please agree to the Terms & Conditions to continue.');
        isValid = false;
    }
    
    if (isValid) {
        // Simulate registration success
        alert('Registration successful! Please check your email to verify your account.');
        // In a real app, you would handle the registration process here
        // window.location.href = 'verify-email.html';
    }
});
