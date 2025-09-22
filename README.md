# Nome do Projeto

> Descrição curta: API em Node.js usando Express e Prisma (ORM). Suporta envio de e-mails com Nodemailer, autenticação (JWT), e integração com banco de dados (Postgres/MySQL). Este README traz o passo a passo para instalar, configurar e rodar o projeto localmente e em produção.

---

## Índice

1. Pré-requisitos
2. Instalação rápida
3. Variáveis de ambiente (`.env`)
4. Comandos úteis / scripts (npm)
5. Configuração do banco de dados (Prisma)
6. Seed (opcional)
7. Nodemailer — configuração e teste rápido
8. Executando localmente
9. Rodando em produção
10. Debug / problemas comuns
11. Estrutura exemplo de arquivos
12. Contato / Contribuição

---

## 1. Pré-requisitos

* Node.js **18+** (recomendado)
* npm (ou yarn/pnpm)
* Banco de dados (Postgres ou MySQL) ou Docker para subir um banco local
* \[Prisma CLI] (usado via `npx prisma`)

> Dica: para desenvolvimento local usar Docker pode simplificar — ex: Postgres com `docker run -e POSTGRES_PASSWORD=senha -e POSTGRES_DB=appdb -p 5432:5432 -d postgres:15`

---

## 2. Instalação rápida

```bash
# clonar
git clone <repo-url>
cd <repo-folder>

# instalar dependências (recomendado usar npm ci em CI)
npm install

# copiar .env exemplo
cp .env.example .env
# editar .env com suas variáveis (DATABASE_URL, credenciais SMTP, etc.)

# gerar client do Prisma
npx prisma generate

# criar/migrar banco (desenvolvimento)
npx prisma migrate dev --name init

# rodar seed (se existir)
npm run prisma:seed

# rodar em modo desenvolvimento
npm run dev
```

---

## 3. Variáveis de ambiente (`.env.example`)

Copie para `.env` e preencha com seus valores.

```env
# servidor
PORT=3000
NODE_ENV=development

# banco (exemplos)
# Postgres
DATABASE_URL=postgresql://user:password@localhost:5432/appdb?schema=public
# MySQL
# DATABASE_URL=mysql://user:password@localhost:3306/appdb

# JWT
JWT_SECRET=troque_por_uma_chave_secreta
JWT_EXPIRES_IN=7d

# Nodemailer / SMTP
MAIL_HOST=smtp.example.com
MAIL_PORT=587
MAIL_SECURE=false # true se usar 465
MAIL_USER=seu_usuario
MAIL_PASS=sua_senha
MAIL_FROM="Nome do App" <no-reply@exemplo.com>

# URL do frontend (CORS)
FRONTEND_URL=http://localhost:3000
```

---

## 4. Scripts (exemplo para `package.json`)

Inclua/adeque estes scripts ao seu `package.json`. Há variantes para JS e TypeScript — escolha a que corresponde ao seu projeto.

### Variante JavaScript (Node + nodemon)

```json
"scripts": {
  "dev": "nodemon --watch 'src/**' --exec \"node ./src/index.js\"",
  "start": "node ./src/index.js",
  "prisma:generate": "npx prisma generate",
  "prisma:migrate": "npx prisma migrate dev --name init",
  "prisma:deploy": "npx prisma migrate deploy",
  "prisma:seed": "node prisma/seed.js",
  "lint": "eslint . --ext .js",
  "test": "jest"
}
```

### Variante TypeScript

```json
"scripts": {
  "dev": "ts-node-dev --respawn --transpile-only src/index.ts",
  "build": "tsc",
  "start": "node dist/index.js",
  "prisma:generate": "npx prisma generate",
  "prisma:migrate": "npx prisma migrate dev --name init",
  "prisma:deploy": "npx prisma migrate deploy",
  "prisma:seed": "node prisma/seed.js",
  "lint": "eslint . --ext .ts,.js",
  "test": "jest"
}
```

> Nota: Se usa PM2 ou outro process manager para produção, adapte `start` para o comando apropriado.

---

## 5. Configuração do banco de dados (Prisma)

### Gerar client

```bash
npx prisma generate
```

### Criar migração para desenvolvimento

```bash
npx prisma migrate dev --name init
```

Isso cria as migrations na pasta `prisma/migrations` e atualiza o banco. Em produção, use:

```bash
npx prisma migrate deploy
```

### Caso queira apenas sincronizar o schema sem migrations (útil em protótipos):

```bash
npx prisma db push
```

---

## 6. Seed (opcional)

Exemplo mínimo `prisma/seed.js` (JS):

```js
// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'admin@example.com',
      password: 'senha_hasheada_aqui'
    }
  });
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
```

Rode com:

```bash
npm run prisma:seed
```

---

## 7. Nodemailer — configuração e teste rápido

Exemplo de criação de `transporter`:

```js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: process.env.MAIL_SECURE === 'true',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

module.exports = transporter;
```

Exemplo de uso e teste com conta de teste (Ethereal):

```js
const nodemailer = require('nodemailer');

(async () => {
  const testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure,
    auth: { user: testAccount.user, pass: testAccount.pass }
  });

  const info = await transporter.sendMail({
    from: 'Teste <teste@exemplo.com>',
    to: 'destinatario@exemplo.com',
    subject: 'Teste',
    text: 'Olá! Isso é um teste.'
  });

  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
})();
```

> Para produção, configure um SMTP real (Mailgun, SendGrid, Amazon SES, Mailtrap, etc.) e verifique políticas de envio.

---

## 8. Executando localmente — passo a passo definitivo

1. `git clone ... && cd ...`
2. `cp .env.example .env` e preencha
3. `npm install`
4. `npx prisma generate`
5. `npx prisma migrate dev --name init`
6. `npm run prisma:seed` (se houver seed)
7. `npm run dev`

A API deve rodar em `http://localhost:${process.env.PORT || 3000}`

---

## 9. Rodando em produção (exemplo)

1. No servidor/CI: `npm ci --production`
2. Configure variáveis de ambiente corretamente
3. `npx prisma generate`
4. `npx prisma migrate deploy` (aplicar migrations no DB de produção)
5. `npm start` (ou use PM2 / systemd / container)

Se usar container (Docker), garanta que o `DATABASE_URL` aponte para o serviço de banco e execute a migração antes do start (ou no entrypoint).

---

## 10. Debug / problemas comuns

* **Prisma: "P1001" / connection refused** — verifique `DATABASE_URL` e se o DB está escutando na porta correta; em Docker cheque network.
* **Migrations duplicadas** — apague a migration local apenas em desenvolvimento e recrie com `prisma migrate reset` (atenção: apaga dados).
* **Nodemailer: Autenticação falhou** — confira usuário/senha e se o provedor exige app password (ex: Gmail).
* **CORS** — se frontend acessa API, configure `cors()` no Express com `origin: process.env.FRONTEND_URL`.

---

## 11. Estrutura exemplo de arquivos

```
├─ prisma/
│  ├─ schema.prisma
│  └─ seed.js
├─ src/
│  ├─ index.js        # entrada (express)
│  ├─ routes/
│  ├─ controllers/
│  ├─ services/
│  └─ utils/
├─ .env.example
├─ package.json
└─ README.md
```

### Exemplo mínimo `prisma/schema.prisma`

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql" // ou "mysql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  password  String
  createdAt DateTime @default(now())
}
```

---

## 12. Contato / Contribuição

Se quiser que eu adapte este README ao seu `package.json` e ao seu `schema.prisma`, cole esses arquivos aqui que eu já ajusto tudo pronto para copiar/colar.

---

Boa sorte! 🚀
