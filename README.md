# StudyConnect

> Descrição do projeto StudyConnect: Este projeto esta sendo desenvolvido como Trabalho de Graduação (TG) da faculdade de tecnologia FATEC Cruzeiro - Waldomiro May, idealizado pelos estudantes: João Emanoel de Araujo Silva, Juliana Maria Ribeiro Jacinto e Maxson Daniel Barbosa da Silva.
Dentro do nosso repositório estão as pastas de API e do Front-end separados, para que o projeto rode como um todo, é necessario colocar as 2 partes em execução separadamente para assim funcionar ambas as partes como um projeto só.

Este README traz o passo a passo para instalar, configurar e rodar o projeto localmente.

---

# Parte da API 

## Índice

1. Pré-requisitos
2. Instalação rápida
3. Variáveis de ambiente (`.env`)
4. Configuração do banco de dados (Prisma)
5. Executando localmente
6. Contato
---

## 1. Pré-requisitos

* Node.js **versões acima de 18.0** (recomendado)
* npm (ou yarn/pnpm)
* Banco de dados (MySQL) ou Docker para subir um banco local
* \[Prisma CLI] (usado via `npx prisma`)

---

## 2. Instalação rápida

```bash
# clonar
git clone https://github.com/JoaoEmanoel2005/StudyConnect.git
cd StudyConnect
cd api

# instalar dependências (recomendado usar npm ci em CI)
npm install

# .env
para obter o .env, entre em contato com João Emanoel

# gerar client do Prisma
npx prisma generate

# criar/migrar banco (desenvolvimento)
npx prisma migrate dev --name init

# rodar em modo desenvolvimento
npm run dev
```

---

## 3. Variáveis de ambiente (`.env`)

Copie para `.env` e preencha com seus valores (são apenas de exemplo).

```env
# servidor
PORT=3000

# banco (exemplos)
DATABASE_URL=postgresql://user:password@localhost:5432/appdb?schema=public
# MySQL
# DATABASE_URL=mysql://user:password@localhost:3306/studyconnect

# Nodemailer / SMTP
MAIL_HOST=smtp.example.com
MAIL_PORT=587
MAIL_USER=seu_usuario
MAIL_PASS=sua_senha
NEXT_PUBLIC_BASE_URL=http://localhost:3000

```

---

## 4. Configuração do banco de dados (Prisma)

### Gerar client

```bash
npx prisma generate
```

### Criar migração para desenvolvimento

```bash
npx prisma migrate dev --name init
```

---

## 5. Executando localmente — passo a passo definitivo

1. `git clone ... && cd ...`
2. `solicite ao João Emanoel o .env`
3. `npm install`
4. `npx prisma generate`
5. `npx prisma migrate dev --name init`
6. `npm run dev`

A API deve rodar em `http://localhost:${process.env.PORT || 3000}`

---


## 6. Contato / Contribuição

João Emanoel
Linkedin: 
Github: https://github.com/JoaoEmanoel2005

Juliana Maria
Linkedin: [(Juliana Jacinto)https://www.linkedin.com/in/juliana-jacinto/]
Github: [(Juliana Jacinto)https://github.com/JulianaJacinto]

Maxson Daniel
Linkedin:
Github:


---

Obrigado pela atenção! 🚀
