// config.js

const dev = {
  API_URL: "http://localhost:3000",
};

const prod = {
  API_URL: "https://minha-api-na-nuvem.com",
};

// Escolhe config dependendo do ambiente de execução
const config = process.env.NODE_ENV === "development" ? dev : prod;

export default config;
