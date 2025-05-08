const fetch = require('node-fetch'); // npm install node-fetch@2
const BASE_URL = 'http://localhost:3000'; // Ajuste conforme seu backend

const usuariosParaCadastrar = [
    {
        nome: 'Ana Silva',
        email: 'ana.silva@email.com',
        senha: 'senha123',
        cpf: '11111111111',
        codigo_recuperacao: 'ANA123',
        nascimento: '1990-01-01',
        cidade: 'São Paulo',
        escolaridade: 'Ensino Superior'
    },
    {
        nome: 'Bruno Souza',
        email: 'bruno.souza@email.com',
        senha: 'senha123',
        cpf: '22222222222',
        codigo_recuperacao: 'BRU456',
        nascimento: '1988-04-10',
        cidade: 'Rio de Janeiro',
        escolaridade: 'Ensino Médio'
    },
    {
        nome: 'Carla Pereira',
        email: 'carla.pereira@email.com',
        senha: 'senha123',
        cpf: '33333333333',
        codigo_recuperacao: 'CAR789',
        nascimento: '1995-06-15',
        cidade: 'Belo Horizonte',
        escolaridade: 'Ensino Superior'
    },
    {
        nome: 'Diego Rocha',
        email: 'diego.rocha@email.com',
        senha: 'senha123',
        cpf: '44444444444',
        codigo_recuperacao: 'DIE321',
        nascimento: '1992-08-20',
        cidade: 'Curitiba',
        escolaridade: 'Técnico'
    },
    {
        nome: 'Eduarda Lima',
        email: 'eduarda.lima@email.com',
        senha: 'senha123',
        cpf: '55555555555',
        codigo_recuperacao: 'EDU654',
        nascimento: '1993-11-30',
        cidade: 'Fortaleza',
        escolaridade: 'Ensino Fundamental'
    },
    {
        nome: 'Fernando Oliveira',
        email: 'fernando.oliveira@email.com',
        senha: 'senha123',
        cpf: '66666666666',
        codigo_recuperacao: 'FER987',
        nascimento: '1985-07-05',
        cidade: 'Salvador',
        escolaridade: 'Ensino Médio'
    },
    {
        nome: 'Gabriela Santos',
        email: 'gabriela.santos@email.com',
        senha: 'senha123',
        cpf: '77777777777',
        codigo_recuperacao: 'GAB111',
        nascimento: '2000-03-12',
        cidade: 'Brasília',
        escolaridade: 'Ensino Superior'
    },
    {
        nome: 'Henrique Alves',
        email: 'henrique.alves@email.com',
        senha: 'senha123',
        cpf: '88888888888',
        codigo_recuperacao: 'HEN222',
        nascimento: '1999-01-22',
        cidade: 'Porto Alegre',
        escolaridade: 'Ensino Médio'
    },
    {
        nome: 'Isabela Martins',
        email: 'isabela.martins@email.com',
        senha: 'senha123',
        cpf: '99999999999',
        codigo_recuperacao: 'ISA333',
        nascimento: '1991-10-10',
        cidade: 'Recife',
        escolaridade: 'Ensino Superior'
    },
    {
        nome: 'João Pedro',
        email: 'joao.pedro@email.com',
        senha: 'senha123',
        cpf: '10101010101',
        codigo_recuperacao: 'JOA444',
        nascimento: '1987-05-18',
        cidade: 'Manaus',
        escolaridade: 'Técnico'
    },
    {
        nome: 'Katia Mendes',
        email: 'katia.mendes@email.com',
        senha: 'senha123',
        cpf: '12121212121',
        codigo_recuperacao: 'KAT555',
        nascimento: '1996-09-14',
        cidade: 'Belém',
        escolaridade: 'Ensino Médio'
    },
    {
        nome: 'Lucas Costa',
        email: 'lucas.costa@email.com',
        senha: 'senha123',
        cpf: '13131313131',
        codigo_recuperacao: 'LUC666',
        nascimento: '1998-12-01',
        cidade: 'Florianópolis',
        escolaridade: 'Ensino Superior'
    },
    {
        nome: 'Mariana Faria',
        email: 'mariana.faria@email.com',
        senha: 'senha123',
        cpf: '14141414141',
        codigo_recuperacao: 'MAR777',
        nascimento: '1994-07-07',
        cidade: 'João Pessoa',
        escolaridade: 'Ensino Fundamental'
    },
    {
        nome: 'Nicolas Barros',
        email: 'nicolas.barros@email.com',
        senha: 'senha123',
        cpf: '15151515151',
        codigo_recuperacao: 'NIC888',
        nascimento: '2001-02-28',
        cidade: 'Campo Grande',
        escolaridade: 'Ensino Médio'
    },
    {
        nome: 'Olívia Teixeira',
        email: 'olivia.teixeira@email.com',
        senha: 'senha123',
        cpf: '16161616161',
        codigo_recuperacao: 'OLI999',
        nascimento: '1989-03-03',
        cidade: 'Aracaju',
        escolaridade: 'Ensino Superior'
    }
];


async function cadastrarUsuarios() {
    for (const user of usuariosParaCadastrar) {
        try {
            const response = await fetch(`${BASE_URL}/users/cadastro`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            });

            const data = await response.json();

            if (response.ok) {
                console.log(`✅ ${user.nome} cadastrado com sucesso! ID: ${data.id}`);
            } else {
                console.log(`❌ Erro ao cadastrar ${user.nome}: ${data.message}`);
            }

        } catch (err) {
            console.error(`🚨 Erro de conexão para ${user.nome}:`, err.message);
        }
    }
}

cadastrarUsuarios();
