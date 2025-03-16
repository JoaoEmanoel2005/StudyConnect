const bcrypt = require('bcrypt');

// Função para gerar o hash da senha
const encrypt = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10); // '10' é o fator de custo
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        throw new Error('Erro ao gerar o hash da senha');
    }
};

// Função para comparar a senha fornecida com a senha criptografada
const comcrypt = async (password, hashedPassword) => {
    try {
        const isMatch = await bcrypt.compare(password, hashedPassword);
        return isMatch;
    } catch (error) {
        throw new Error('Erro ao comparar a senha');
    }
};

module.exports = { encrypt, comcrypt };
