// Footer year
const year = document.getElementById("year");
const current_year = new Date().getFullYear();
year.textContent = current_year;

// HTML elements
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
const advice_text = document.getElementById("advice-text");

///////////////

if (window.innerWidth < window.innerHeight) {
    const touch = document.getElementsByClassName("touch");

    // Converte a HTMLCollection em um array para usar forEach
    Array.from(touch).forEach(element => {
        element.classList.remove("touch");
    });
}

// Questions
let questions = [
    "Com que frequência você fuma?", 
    "Com que frequência você consome álcool?", 
    "Com que frequência você pratica atividade física?", 
    "Com que frequência você consome frutas e vegetais?",
    "Com que frequência você consome alimentos ultraprocessados?",
    "Quanto você se expõe ao sol sem proteção?", 
    "Quantas vezes por ano você realiza exames médicos, como o de sangue?",     
    "Qual é o seu nível de estresse diário?",
    "Quantas pessoas da sua família próxima (pais, irmãos) tiveram câncer?", 
    "Quantas horas de sono você tem por noite?",
    "Qual é a sua idade?"
];

let increments = [
    "O hábito de fumar é prejudicial à saúde.", 
    "O consumo excessivo de álcool pode afetar sua saúde negativamente.", 
    "A prática regular de atividades físicas é fundamental para a saúde.", 
    "Incluir frutas e vegetais na dieta regularmente é ideal para o bem-estar.", 
    "Consumir alimentos ultraprocessados com frequência não é saudável.", 
    "Usar protetor solar ao se expor ao sol é essencial para a proteção da pele.", 
    "Realizar exames médicos regularmente é importante para a detecção precoce de doenças, como o câncer.", 
    "Manter uma rotina organizada pode ajudar a reduzir o nível de estresse diário.", 
    "Ter uma rotina equilibrada contribui para uma boa qualidade de sono.", 
    "Monitorar a saúde é importante, especialmente se há histórico de câncer na família."
];

// Possible answers and percentage value
let answers = [
    [["Nunca", -10], ["Raramente", 5], ["Regularmente", 15], ["Diariamente", 25]],
    [["Nunca", -5], ["Ocasionalmente", 0], ["Regularmente", 10], ["Frequentemente", 20]],
    [["Diariamente", -10], ["3-5 vezes por semana", -5], ["1-2 vezes por semana", 0], ["Raramente", 5]],
    [["Diariamente", -10], ["3-5 vezes por semana", -5], ["1-2 vezes por semana", 0], ["Raramente", 5]],
    [["Nunca", -10], ["Raramente", -5], ["Regularmente", 5], ["Diariamente", 10]],
    [["Nunca", 0], ["Raramente", 5], ["Regularmente", 10], ["Frequentemente", 15]],
    [["Nunca", 10], ["Uma vez a cada 2 anos", 5], ["Uma vez por ano", 0], ["Mais de uma vez por ano", -5]],
    [["Baixo", -5], ["Moderado", 0], ["Alto", 5], ["Muito alto", 10]],
    [["Nenhuma", 0], ["Uma", 10], ["Duas", 20], ["Três ou mais", 30]],
    [["Menos de 5 horas", 10], ["5-6 horas", 5], ["7-8 horas", 0], ["Mais de 8 horas", -5]],
    [["Menos de 30 anos", -5], ["30-40 anos", 0], ["41-50 anos", 5], ["Mais de 50 anos", 10]]
];

// Variables
let porcentagem = 0;
let question = 1;
let numQuestions = questions.length;
let answered_questions = Array(numQuestions).fill(false);
let client_answers = Array(numQuestions).fill(0);

// Function to change the answers and question
function informacao(question) {
    the_title.textContent = questions[question - 1];
    the_question.textContent = question + "/" + numQuestions;

    first.textContent = answers[question - 1][0][0];  
    second.textContent = answers[question - 1][1][0]; 
    third.textContent = answers[question - 1][2][0];  
    fourth.textContent = answers[question - 1][3][0]; 
}

// Calculate final percentage
function percentage(){
    let totalPercentage = 0;

    for (let i = 0; i < numQuestions; i++) {
        let answer = client_answers[i];
        if (answer !== -1) {
            let value = answers[i][answer][1]; 
            totalPercentage += value; 
        }
    }

    return totalPercentage;
}

// Update box selections with check mark
function updateBoxes() {
    boxes.forEach((box, index) => {
        if (client_answers[question - 1] === index && answered_questions[question - 1] === true) {
            box.classList.add("show");
        } else {
            box.classList.remove("show");
        }
    });
}

// Call function when DOM loads
document.addEventListener("DOMContentLoaded", function() {
    informacao(question);
});

// Left arrow click event
left_arrow.addEventListener("click", function() {
    if (question === 1) return;

    if (question === numQuestions) {
        const hidden_elements = document.getElementsByClassName("visible");

        Array.from(hidden_elements).forEach(element => {
            element.classList.toggle("hidden");
            element.classList.toggle("visible");
        });
    }
    question--;
    informacao(question);

    if (advice_text.classList.contains("text-visible")) {
        advice_text.classList.remove("text-visible");
        advice_text.classList.add("not-visible");
    }

    updateBoxes(); 
});

// Right arrow click event
right_arrow.addEventListener("click", function() {
    if (question === numQuestions) return;

    question++;
    informacao(question);

    if (question === numQuestions) {
        const hidden_elements = document.getElementsByClassName("hidden");

        Array.from(hidden_elements).forEach(element => {
            element.classList.remove("hidden");
            element.classList.add("visible");
        });
    }

    updateBoxes();
});

// Event when user selects an answer
boxes.forEach((box, index) => {
    box.addEventListener("click", function(event) {
        if (!answered_questions[question - 1]) {
            answered_questions[question - 1] = true;
            client_answers[question - 1] = index;

            if (question < numQuestions) {
                question++;
                informacao(question);

                if (question === numQuestions) {
                    const hidden_elements = document.getElementsByClassName("hidden");

                    Array.from(hidden_elements).forEach(element => {
                        element.classList.remove("hidden");
                        element.classList.add("visible");
                    });
                }

                if(answered_questions[question - 1] === true){
                    box.classList.add("show");
                }
            } else {
                box.classList.add("show");
            }
        } else if (answered_questions[question - 1] && client_answers[question - 1] === index) {
            box.classList.remove("show");
            answered_questions[question - 1] = false;
            client_answers[question - 1] = -1;
        } else {
            boxes.forEach((otherBox, otherIndex) => {
                if (client_answers[question - 1] === otherIndex) {
                    otherBox.classList.remove("show");
                }
            });
            box.classList.add("show");
            client_answers[question - 1] = index;
        }
    });
});

// When user clicks send button
send_button.addEventListener("click", () => {
    if (question === numQuestions) {
        if (answered_questions.every(element => element === true)) {
            document.querySelector(".content").classList.add("none");
            document.querySelector(".results").classList.remove("none");

            const number = percentage();
            const result_h1 = document.getElementsByClassName("percentage")[0];
            const span_percentage = document.getElementById("percentage");
            const span_text = document.getElementById("phrase");

            // Result messages based on percentage
            if (number > 79) {
                result_h1.textContent = "Seu risco está extremamente elevado. É crucial realizar mudanças em seus hábitos.";
                span_percentage.textContent = number;
                span_text.textContent = "";
            } else if (number <= 20) {
                result_h1.textContent = number <= 0
                    ? "Parabéns! Seu risco é quase nulo, mas lembre-se de continuar adotando hábitos saudáveis."
                    : `Parabéns! Seu risco é de ${number}%, mas lembre-se de continuar adotando hábitos saudáveis.`;
            } else if (number < 41) {
                span_percentage.textContent = number;
                span_text.textContent = "Você está no caminho certo, mas algumas mudanças podem fazer a diferença. Continue com bons hábitos!";
            } else if (number < 61) {
                span_percentage.textContent = number;
                span_text.textContent = "Atenção! Esse resultado indica que vale a pena revisar seu estilo de vida e adotar hábitos mais saudáveis.";
            } else {
                span_percentage.textContent = number;
                span_text.textContent = "Seu risco é alto. Busque informações e faça ajustes no seu estilo de vida para diminuir essa porcentagem.";
            }
        } else {
            advice_text.classList.add("text-visible");
            advice_text.classList.remove("not-visible");
        }
    }
});
