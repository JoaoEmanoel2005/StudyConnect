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
document.getElementById('loginForm').addEventListener('submit', function(e) {
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