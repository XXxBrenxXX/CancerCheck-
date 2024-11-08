// Obtém o elemento com o ID "year"
const year = document.getElementById("year");

// Obtém o ano atual
const current_year = new Date().getFullYear();
year.textContent = current_year;

let user_screen_width = window.innerWidth;
let user_screen_height = window.innerHeight;

bug(); // Chama a função inicialmente para aplicar a lógica de uma vez

function bug() {
    // Condição para verificar se a largura da tela é menor que a altura
    if (user_screen_width < user_screen_height) {
        const body = document.querySelector("body");

        body.classList.add("resize");
    }
}

// Evento para verificar o redimensionamento da janela
window.addEventListener('resize', function() {
    user_screen_width = window.innerWidth;
    user_screen_height = window.innerHeight;

    bug(); // Chama a função novamente após o redimensionamento
});
