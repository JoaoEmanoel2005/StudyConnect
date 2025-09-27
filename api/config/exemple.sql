-- ==============================
-- Enums
-- ==============================
CREATE TYPE Modalidade AS ENUM ('PRESENCIAL', 'EAD', 'HIBRIDO');

CREATE TYPE TipoCurso AS ENUM ('GRADUACAO', 'POS', 'TECNICO', 'LIVRE');

-- ==============================
-- Tabela Usuario
-- ==============================
CREATE TABLE Usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(191) NOT NULL,
    email VARCHAR(191) NOT NULL UNIQUE,
    senha VARCHAR(191) NOT NULL,
    email_verificado BOOLEAN NOT NULL DEFAULT FALSE,
    token_verificacao VARCHAR(191) UNIQUE,
    codigo_reset VARCHAR(191),
    codigo_expira DATETIME,
    imagem VARCHAR(191),
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ==============================
-- Tabela Instituicao
-- ==============================
CREATE TABLE Instituicao (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(191) NOT NULL,
    cnpj VARCHAR(191) NOT NULL UNIQUE,
    email VARCHAR(191) NOT NULL UNIQUE,
    senha VARCHAR(191) NOT NULL,
    telefone VARCHAR(191),
    endereco VARCHAR(191),
    cidade VARCHAR(191),
    estado VARCHAR(191),
    cep VARCHAR(191),
    site VARCHAR(191),
    descricao TEXT,
    ativo BOOLEAN NOT NULL DEFAULT TRUE,
    imagem VARCHAR(191),
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX (email),
    INDEX (cnpj)
);

-- ==============================
-- Tabela Curso
-- ==============================
CREATE TABLE Curso (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(191) NOT NULL,
    tipo TipoCurso NOT NULL,
    categoria VARCHAR(191) NOT NULL,
    vagas INT NOT NULL,
    modalidade Modalidade NOT NULL,
    horario VARCHAR(191) NOT NULL,
    duracao VARCHAR(191) NOT NULL,
    custo DECIMAL(10, 2) NOT NULL,
    descricao TEXT NOT NULL,
    onde_trabalhar TEXT NOT NULL,
    imagem VARCHAR(191) NOT NULL,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    instituicaoId INT NOT NULL,
    CONSTRAINT fk_curso_instituicao FOREIGN KEY (instituicaoId) REFERENCES Instituicao (id) ON DELETE CASCADE
);

-- ==============================
-- Tabela PreRequisito
-- ==============================
CREATE TABLE PreRequisito (
    id INT AUTO_INCREMENT PRIMARY KEY,
    texto VARCHAR(191) NOT NULL,
    cursoId INT NOT NULL,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_prerequisito_curso FOREIGN KEY (cursoId) REFERENCES Curso (id) ON DELETE CASCADE
);

-- ==============================
-- Tabela MatrizCurricular
-- ==============================
CREATE TABLE MatrizCurricular (
    id INT AUTO_INCREMENT PRIMARY KEY,
    semestre VARCHAR(191) NOT NULL,
    cursoId INT NOT NULL,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_matriz_curso FOREIGN KEY (cursoId) REFERENCES Curso (id) ON DELETE CASCADE
);

-- ==============================
-- Tabela Disciplina
-- ==============================
CREATE TABLE Disciplina (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(191) NOT NULL,
    matrizId INT NOT NULL,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_disciplina_matriz FOREIGN KEY (matrizId) REFERENCES MatrizCurricular (id) ON DELETE CASCADE
);

-- ==============================
-- Tabela Link
-- ==============================
CREATE TABLE Link (
    id INT AUTO_INCREMENT PRIMARY KEY,
    site_oficial VARCHAR(191) NOT NULL,
    pagina_curso VARCHAR(191) NOT NULL,
    inscricao VARCHAR(191) NOT NULL,
    cursoId INT UNIQUE NOT NULL,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_link_curso FOREIGN KEY (cursoId) REFERENCES Curso (id) ON DELETE CASCADE
);