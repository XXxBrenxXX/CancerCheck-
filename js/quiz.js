const year = document.getElementById("year");
const current_year = new Date().getFullYear();
year.textContent = current_year;

const the_title = document.querySelector("h1");
const first = document.getElementById("first");
const second = document.getElementById("second");
const third = document.getElementById("third");
const fourth = document.getElementById("fourth");
const the_question = document.getElementById("question");
const left_arrow = document.getElementsByClassName("left-arrow")[0];
const right_arrow = document.getElementsByClassName("right-arrow")[0];
const boxes = document.querySelectorAll(".check");
const send_button = document.getElementsByClassName("button")[0];

let porcentagem = 0;
let question = 1;
let answered_questions = [false, false, false, false, false, false, false, false, false, false];
let client_answers = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

let title = [
    "Com que frequência você fuma?", 
    "Com que frequência você consome álcool?", 
    "Com que frequência você pratica atividade física?", 
    "Com que frequência você consome frutas e vegetais?", 
    "Quanto você se expõe ao sol sem proteção?", 
    "Quantas vezes por ano você realiza exames de rotina?",     
    "Qual é o seu nível de estresse diário?",
    "Quantas pessoas da sua família próxima (pais, irmãos) tiveram câncer?", 
    "Quantas horas de sono você tem por noite?",
    "Qual é a sua idade?"
];

let answers = [
    [["Nunca", -10], ["Raramente", 5], ["Regularmente", 15], ["Diariamente", 25]],
    [["Nunca", -5], ["Ocasionalmente", 0], ["Regularmente", 5], ["Frequentemente", 10]],
    [["Diariamente", -10], ["3-5 vezes por semana", -5], ["1-2 vezes por semana", 0], ["Raramente", 5]],
    [["Diariamente", -10], ["3-5 vezes por semana", -5], ["1-2 vezes por semana", 0], ["Raramente", 5]],
    [["Nunca", 0], ["Raramente", 5], ["Regularmente", 10], ["Frequentemente", 15]],
    [["Nunca", 10], ["Uma vez a cada 2 anos", 5], ["Uma vez por ano", 0], ["Mais de uma vez por ano", -5]],
    [["Baixo", -5], ["Moderado", 0], ["Alto", 5], ["Muito alto", 10]],
    [["Nenhuma", 0], ["Uma", 10], ["Duas", 20], ["Três ou mais", 30]],
    [["Menos de 5 horas", 10], ["5-6 horas", 5], ["7-8 horas", 0], ["Mais de 8 horas", -5]],
    [["Menos de 30 anos", -5], ["30-40 anos", 0], ["41-50 anos", 5], ["Mais de 50 anos", 10]]
];

function informacao(question) {
    the_title.textContent = title[question - 1];
    the_question.textContent = question + "/10";

    // Usando loop para preencher as respostas
    first.textContent = answers[question - 1][0][0];  // Primeira resposta
    second.textContent = answers[question - 1][1][0]; // Segunda resposta
    third.textContent = answers[question - 1][2][0];  // Terceira resposta
    fourth.textContent = answers[question - 1][3][0]; // Quarta resposta
}

function percentage(){
    let totalPercentage = 0;

    for (let i = 0; i < 10; i++) {
        let answer = client_answers[i];
        if (answer !== -1) { // Certifique-se de que há uma resposta válida
            let value = answers[i][answer][1]; // Corrigido para pegar o valor correto
            totalPercentage += value; // Acumula o valor
        }
    }

    return totalPercentage;
}


// Chama a função quando o DOM está carregado
document.addEventListener("DOMContentLoaded", function() {
    informacao(question);
});

// Lógica para o botão esquerdo
left_arrow.addEventListener("click", function() {
    if (question === 1) {
        return; // Não faz nada se já estiver na primeira pergunta
    } else {
        if (question === 10){
            const hidden_elements = document.getElementsByClassName("visible");

            Array.from(hidden_elements).forEach(element => {
                element.classList.add("hidden");
                element.classList.remove("visible")
            });
        }
        question--;
        informacao(question);
    }

    updateBoxes(); // Chama a função para atualizar as boxes
});

// Lógica para o botão direito
right_arrow.addEventListener("click", function() {
    if (question === 10) {
        return; // Não faz nada se já estiver na última pergunta
    } else {
        question++;
        informacao(question);

        if(question === 10){
            const hidden_elements = document.getElementsByClassName("hidden");

            Array.from(hidden_elements).forEach(element => {
                element.classList.remove("hidden");
                element.classList.add("visible")
            });
        }
    }

    updateBoxes(); // Chama a função para atualizar as boxes
});

// Função para atualizar as boxes com base nas respostas
function updateBoxes() {
    boxes.forEach((box, index) => {
        if (client_answers[question - 1] === index && answered_questions[question - 1] === true) {
            box.classList.add("show");
        } else {
            box.classList.remove("show");
        }
    });
}

boxes.forEach((box, index) => {
    box.addEventListener("click", function(event) {
        if (answered_questions[question - 1] === false) {
            box.classList.add("show"); // Adiciona a classe ao box clicado

            answered_questions[question - 1] = true;
            client_answers[question - 1] = index; // Salva o índice da caixa clicada
        } 
        else if (answered_questions[question - 1] === true && client_answers[question - 1] === index) {
            // Se o box clicado já foi selecionado
            box.classList.remove("show");
            answered_questions[question - 1] = false;
            client_answers[question - 1] = -1; // Use -1 para indicar que não há resposta
        } 
        else {
            // Para todas as caixas, remova a classe se a resposta for a mesma
            boxes.forEach((otherBox, otherIndex) => {
                if (client_answers[question - 1] === otherIndex) {
                    otherBox.classList.remove("show");
                }
            });
            // Adiciona a classe ao novo box clicado
            box.classList.add("show");
            // Atualiza a resposta
            client_answers[question - 1] = index;
        }
    });
});

send_button.addEventListener("click", () => {
    if (question === 10) {
        if (answered_questions.every(element => element === true)) {
            document.querySelector(".content").classList.add("none");
            document.querySelector(".results").classList.remove("none");

            const number = percentage();

            const result_h1 = document.getElementsByClassName("percentage")[0];
            const span_percentage = document.getElementById("percentage");
            const span_text = document.getElementById("phrase");

            // Resultados
            if (number > 79) {
                result_h1.textContent = "Seu risco está extremamente elevado. É crucial realizar mudanças em seus hábitos.";
            } else if (number >= -200 && number <= 20) {
                result_h1.textContent = "Parabéns! Seu risco é baixo, mas lembre-se de continuar adotando hábitos saudáveis.";
            } else if (number > 21 && number < 41) {
                span_percentage.textContent = number;
                span_text.textContent = "Você está no caminho certo, mas algumas mudanças podem fazer a diferença. Continue com bons hábitos!";
            } else if (number > 40 && number < 61) {
                span_percentage.textContent = number;
                span_text.textContent = "Atenção! Esse resultado indica que vale a pena revisar seu estilo de vida e adotar hábitos mais saudáveis.";
            } else {
                span_percentage.textContent = number;
                span_text.textContent = "Seu risco é alto. Busque informações e faça ajustes no seu estilo de vida para diminuir essa porcentagem.";
            }
        }
    }
});

