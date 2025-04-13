// Recupera o token do localStorage
const token = localStorage.getItem('token');
// Verifique se o token foi recuperado corretamente

if (token) {
    fetch('http://localhost:3000/users/perfil', {
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
        })
        .catch(error => {
            console.error('Erro:', error);
        });
} else {
    console.error('Token não encontrado!');
}