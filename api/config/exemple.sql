-- ============================================
-- Script de Criação do Banco de Dados TG
-- Sistema de Gestão de Instituições e Cursos
-- ============================================

-- Tabelas de Domínio/Lookup
-- ============================================

CREATE TABLE estado (
    id_estado INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    sigla CHAR(2) NOT NULL
);

CREATE TABLE cidade (
    id_cidade INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    regiao VARCHAR(50),
    id_estado INT NOT NULL,
    FOREIGN KEY (id_estado) REFERENCES estado (id_estado)
);

CREATE TABLE tipo_instituicao (
    id_tipo_inst INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE categorias (
    id_categoria INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE modalidade (
    id_modalidade INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE tipo_curso (
    id_tipo INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL
);

-- Tabela Principal: Usuario
-- ============================================

CREATE TABLE usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    cpf VARCHAR(14) UNIQUE,
    nascimento DATE,
    imagem VARCHAR(255),
    email_verificado BOOLEAN DEFAULT FALSE,
    token_verificado VARCHAR(255),
    codigo_reset VARCHAR(255),
    codigo_expira DATETIME,
    createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updateat TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela Principal: Instituicao
-- ============================================

CREATE TABLE instituicao (
    id_instituicao INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(200) NOT NULL,
    cidade VARCHAR(100),
    estado VARCHAR(100),
    email VARCHAR(200),
    senha VARCHAR(255),
    telefone VARCHAR(20),
    endereco TEXT,
    descricao TEXT,
    area VARCHAR(100),
    tipo INT,
    imagem VARCHAR(255),
    custo_matricula DECIMAL(10, 2),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updateat TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (tipo) REFERENCES tipo_instituicao (id_tipo_inst)
);

-- Tabela Principal: Curso
-- ============================================

CREATE TABLE curso (
    id_curso INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(200) NOT NULL,
    tipo_id INT,
    categoria_id INT,
    vagas INT,
    modalidade_id INT,
    horario VARCHAR(100),
    turno VARCHAR(50),
    duracao VARCHAR(100),
    custo DECIMAL(10, 2),
    descricao TEXT,
    instituicao_id INT NOT NULL,
    onde_trabalhar TEXT,
    imagem VARCHAR(255),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updateat TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (tipo_id) REFERENCES tipo_curso (id_tipo),
    FOREIGN KEY (categoria_id) REFERENCES categorias (id_categoria),
    FOREIGN KEY (modalidade_id) REFERENCES modalidade (id_modalidade),
    FOREIGN KEY (instituicao_id) REFERENCES instituicao (id_instituicao)
);

-- Tabelas de Relacionamento (Muitos-para-Muitos)
-- ============================================

CREATE TABLE insti_salvo (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    id_instituicao INT NOT NULL,
    createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuario (id),
    FOREIGN KEY (id_instituicao) REFERENCES instituicao (id_instituicao),
    UNIQUE KEY unique_save (id_usuario, id_instituicao)
);

CREATE TABLE curso_salvo (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    id_curso INT NOT NULL,
    createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuario (id),
    FOREIGN KEY (id_curso) REFERENCES curso (id_curso),
    UNIQUE KEY unique_save (id_usuario, id_curso)
);

-- Tabelas Complementares do Curso
-- ============================================

CREATE TABLE pre_requisitos (
    id_pre INT PRIMARY KEY AUTO_INCREMENT,
    curso_id INT NOT NULL,
    descricao TEXT NOT NULL,
    FOREIGN KEY (curso_id) REFERENCES curso (id_curso)
);

CREATE TABLE matriz_curricular (
    id_matriz INT PRIMARY KEY AUTO_INCREMENT,
    curso_id INT NOT NULL,
    semestre INT,
    disciplina VARCHAR(200) NOT NULL,
    FOREIGN KEY (curso_id) REFERENCES curso (id_curso)
);

CREATE TABLE disciplina (
    id_disciplina INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(200) NOT NULL,
    matriz_id INT NOT NULL,
    FOREIGN KEY (matriz_id) REFERENCES matriz_curricular (id_matriz)
);

CREATE TABLE links (
    id_link INT PRIMARY KEY AUTO_INCREMENT,
    curso_id INT NOT NULL,
    site_oficial VARCHAR(500),
    pagina_curso VARCHAR(500),
    inscricao VARCHAR(500),
    FOREIGN KEY (curso_id) REFERENCES curso (id_curso)
);

-- Índices para melhor performance
-- ============================================

CREATE INDEX idx_usuario_email ON usuario (email);

CREATE INDEX idx_usuario_cpf ON usuario (cpf);

CREATE INDEX idx_instituicao_nome ON instituicao (nome);

CREATE INDEX idx_curso_nome ON curso (nome);

CREATE INDEX idx_curso_instituicao ON curso (instituicao_id);

CREATE INDEX idx_curso_categoria ON curso (categoria_id);

CREATE INDEX idx_curso_modalidade ON curso (modalidade_id);
