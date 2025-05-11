import { API_URL } from './globalVar.js';
const BASE_URL = API_URL;

const perguntas = [
    { texto: "Você gosta de resolver problemas matemáticos?", area: "Exatas" },
    { texto: "Você curte tribunal?", area: "Direito" },
    { texto: "Gosta de lógica e raciocínio para criar soluções digitais?", area: "Computação" },
    { texto: "Você gosta de desenhar, pintar ou criar obras visuais?", area: "Artes" },
    { texto: "Você gostaria de trabalhar em escolas ou ambientes educacionais?", area: "Educação" },
    { texto: "Você curte aprender novas linguagens de programação?", area: "Computação" },
    { texto: "Você gosta de programar e resolver desafios tecnológicos?", area: "Computação" },
    { texto: "Você gosta de escrever, falar em público ou se comunicar?", area: "Comunicação" },
    { texto: "Você se vê liderando equipes ou tomando decisões financeiras?", area: "Administração" },
    { texto: "Se sente bem ajudando os outros a aprender?", area: "Educação" },
    { texto: "Você gostaria de defender pessoas ou causas juridicamente?", area: "Direito" },
    { texto: "Você se interessa por filosofia e reflexões sobre a sociedade?", area: "Humanas" },
    { texto: "Gosta de planejar e analisar metas e resultados?", area: "Administração" },
    { texto: "Você aprecia cinema, teatro ou música de forma profunda?", area: "Artes" },
    { texto: "Gosta de estudar história, geografia e sociologia?", area: "Humanas" },
    { texto: "Gosta de resolver problemas práticos usando ciência?", area: "Engenharia" },
    { texto: "Tem paciência para explicar ideias de formas diferentes?", area: "Educação" },
    { texto: "Você se interessa por inteligência artificial, jogos ou cibersegurança?", area: "Computação" },
    { texto: "Você gosta de desenhar projetos ou estruturas?", area: "Engenharia" },
    { texto: "Gosta de criar layouts ou interfaces visuais?", area: "Design" },
    { texto: "Você gosta de atuar, cantar ou se apresentar em público?", area: "Artes" },
    { texto: "Se interessa por inteligência artificial, jogos ou cibersegurança?", area: "Computação" },
    { texto: "Gosta de interpretar textos legais e discutir argumentos?", area: "Direito" },
    { texto: "Você tem interesse em estética, formas e cores?", area: "Design" },
    { texto: "Você se interessa por física e como o universo funciona?", area: "Exatas" },
    { texto: "Gosta de acompanhar o desenvolvimento de outras pessoas?", area: "Educação" },
    { texto: "Você curte trabalhar com ferramentas de edição e criação visual?", area: "Design" },
    { texto: "Gosta de resolver problemas de forma visual e criativa?", area: "Design" },
    { texto: "Tem interesse em entender o comportamento humano?", area: "Humanas" },
    { texto: "Gosta de buscar explicações exatas e objetivas para as coisas?", area: "Exatas" },
    { texto: "Tem interesse em leis e justiça?", area: "Direito" },
    { texto: "Gosta de aprender sobre genética e evolução das espécies?", area: "Biológicas" },
    { texto: "Você se interessa por design gráfico ou design de produtos?", area: "Design" },
    { texto: "Se interessa pelo funcionamento do corpo humano?", area: "Biológicas" },
    { texto: "Gosta de pensar em soluções para melhorar a infraestrutura?", area: "Engenharia" },
    { texto: "Você se interessa por redes sociais e mídias digitais?", area: "Comunicação" },
    { texto: "Acha fascinante estudar plantas, animais ou microrganismos?", area: "Biológicas" },
    { texto: "Tem facilidade em raciocínio lógico e abstrato?", area: "Exatas" },
    { texto: "Tem interesse por jornalismo, marketing ou publicidade?", area: "Comunicação" },
    { texto: "Você gostaria de trabalhar com saúde ou meio ambiente?", area: "Biológicas" },
    { texto: "Você tem interesse em como os softwares e aplicativos são feitos?", area: "Computação" },
    { texto: "Tem interesse em organizar e gerir empresas?", area: "Administração" },
    { texto: "Você se interessa por direitos humanos, constituição e cidadania?", area: "Direito" },
    { texto: "Gosta de pensar em estratégias para melhorar negócios?", area: "Administração" },
    { texto: "Você gosta de ensinar e compartilhar conhecimento com os outros?", area: "Educação" },
    { texto: "Gosta de analisar como as pessoas se expressam?", area: "Comunicação" },
    { texto: "Curte matemática e física aplicadas à criação de coisas?", area: "Engenharia" },
    { texto: "Você gosta de lidar com números e fórmulas?", area: "Exatas" },
    { texto: "Prefere ajudar pessoas a resolver conflitos?", area: "Humanas" },
    { texto: "Gosta de expressar sentimentos por meio da arte?", area: "Artes" },
    { texto: "Você gosta de contar histórias ou criar conteúdo criativo?", area: "Comunicação" },
    { texto: "Se interessa por temas como ecologia e sustentabilidade?", area: "Biológicas" },
    { texto: "Você gosta de construir, projetar ou entender como máquinas funcionam?", area: "Engenharia" },
    { texto: "Se interessa por marketing, finanças ou recursos humanos?", area: "Administração" }
];



let resultados = {
    "Exatas": 0,
    "Humanas": 0,
    "Biológicas": 0,
    "Computação": 0,
    "Administração": 0,
    "Direito": 0,
    "Artes": 0,
    "Engenharia": 0,
    "Educação": 0,
    "Comunicação": 0,
    "Design": 0
};

let indice = 0;

document.getElementById("start-btn").addEventListener("click", () => {
    document.getElementById("start-btn").style.display = "none";
    document.querySelector(".progress-container").style.display = "block";
    exibirPergunta();
});

function atualizarProgresso() {
    const progresso = ((indice / perguntas.length) * 100).toFixed(1);
    document.getElementById("progress-bar").style.width = `${progresso}%`;
}

function exibirPergunta() {
    if (indice < perguntas.length) {
        const pergunta = perguntas[indice];
        document.getElementById("question-container").innerHTML = `
      <p class="question">${pergunta.texto}</p>
      <button id="btnSim">Sim</button>
      <button id="btnNao">Não</button>
    `;
        document.getElementById("btnSim").addEventListener("click", () => responder(true));
        document.getElementById("btnNao").addEventListener("click", () => responder(false));
        atualizarProgresso();
    } else {
        mostrarResultado();
    }
}

function responder(resposta) {
    if (resposta === true) {
        const area = perguntas[indice].area;
        resultados[area]++;
    }
    indice++;
    exibirPergunta();
}

function mostrarResultado() {
    const max = Math.max(...Object.values(resultados));
    const melhoresAreas = Object.keys(resultados).filter(area => resultados[area] === max);

    let resultadoTexto;
    if (max === 0) {
        resultadoTexto = "Você não respondeu 'Sim' a nenhuma pergunta!";
    } else if (melhoresAreas.length > 1) {
        resultadoTexto = `Seu perfil se encaixa em mais de uma área, sendo elas: <strong>${melhoresAreas.join(', ')}</strong>`;
    } else {
        resultadoTexto = `Seu perfil se encaixa mais na área de: <strong>${melhoresAreas[0]}</strong>!`;
    }

    document.getElementById("question-container").innerHTML = "";
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = resultadoTexto;
    resultDiv.classList.add("show");

}

exibirPergunta();
