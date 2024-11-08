// Obtém o elemento com o ID "year"
const year = document.getElementById("year");

// Obtém o ano atual
const current_year = new Date().getFullYear();
year.textContent = current_year;
