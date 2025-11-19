/*******************************************
 * spa.js – Navegação dinâmica estilo SPA (com fade)
 * ONG 5 Fs - Finanças Familiares Fortes
 *******************************************/

document.addEventListener("DOMContentLoaded", () => {
  const conteudo = document.querySelector("main");

  const rotas = {
    "": "index.html",
    "#inicio": "index.html",
    "#projetos": "projetos.html",
    "#cadastro": "cadastro.html",
  };

  // Função para carregar a rota com efeito de transição
  async function carregarRota(hash) {
    const rota = rotas[hash] || rotas[""];
    try {
      // Adiciona classe de fade-out
      conteudo.classList.add("fade-out");

      // Espera a transição (CSS) antes de trocar o conteúdo
      setTimeout(async () => {
        const resposta = await fetch(rota);
        if (!resposta.ok) throw new Error("Página não encontrada");

        const html = await resposta.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const novoConteudo = doc.querySelector("main").innerHTML;

        conteudo.innerHTML = novoConteudo;

        // Adiciona efeito fade-in
        conteudo.classList.remove("fade-out");
        conteudo.classList.add("fade-in");

        // Remove a classe fade-in depois de exibir
        setTimeout(() => conteudo.classList.remove("fade-in"), 500);

        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 300);

    } catch (erro) {
      conteudo.innerHTML = `
        <section>
          <h2>Erro ao carregar a página</h2>
          <p>${erro.message}</p>
        </section>
      `;
    }
  }

  window.addEventListener("hashchange", () => {
    carregarRota(location.hash);
  });

  // Carrega rota inicial
  carregarRota(location.hash);
});
