// Obtém o elemento com o ID "year"
const year = document.getElementById("year");

// Obtém o ano atual
const current_year = new Date().getFullYear();
year.textContent = current_year;

user_screen_width = window.innerWidth;
user_screen_height = window.innerHeight;

if (user_screen_width < user_screen_height0){
    const footer = document.querySelector("footer");
    const content = document.getElementsByClassName("content")[0];

    footer.classList.add("bug");
    content.classList.add("bug");
}

