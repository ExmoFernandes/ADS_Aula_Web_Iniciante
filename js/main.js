/*******************************************
 * main.js – Menu responsivo e animações globais
 * ONG 5 Fs - Finanças Familiares Fortes
 *******************************************/

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector("nav ul");

  if (menuToggle && menu) {
    menuToggle.addEventListener("click", () => {
      menu.classList.toggle("mostrar");
      menuToggle.classList.toggle("ativo");
    });
  }

  // Fecha o menu ao clicar em um link (boa prática mobile)
  const links = document.querySelectorAll("nav a");
  links.forEach(link => {
    link.addEventListener("click", () => {
      if (menu.classList.contains("mostrar")) {
        menu.classList.remove("mostrar");
        menuToggle.classList.remove("ativo");
      }
    });
  });
});
