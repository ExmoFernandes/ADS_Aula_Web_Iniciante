/***************************************************************************************************
 * formulario.js – Validação inteligente de formulário
 /***************************************************************************************************/

// Aguarda o carregamento do DOM
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  // Seleciona todos os campos obrigatórios
  const campos = form.querySelectorAll("input[required], select[required], textarea[required]");
  const mensagem = document.createElement("div");
  mensagem.classList.add("alerta");
  form.appendChild(mensagem);

  /********************************************
   *  Função de Máscara com persistência
   ********************************************/
  const aplicarMascara = (campo, tipo) => {
    const formatar = (valor) => {
      valor = valor.replace(/\D/g, ""); // remove tudo que não é número

      if (tipo === "cpf") {
        valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
        valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
        valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
      }

      if (tipo === "telefone") {
        valor = valor.replace(/(\d{2})(\d)/, "($1)$2");
        valor = valor.replace(/(\d{5})(\d{4})$/, "$1-$2");
      }

      if (tipo === "cep") {
        valor = valor.replace(/(\d{5})(\d)/, "$1-$2");
      }

      return valor;
    };

    const atualizarMascara = () => {
      campo.value = formatar(campo.value);
    };

    // Atualiza durante a digitação e ao sair do campo
    campo.addEventListener("input", atualizarMascara);
    campo.addEventListener("blur", atualizarMascara);
  };

  // Aplica as máscaras
  aplicarMascara(document.querySelector("#cpf"), "cpf");
  aplicarMascara(document.querySelector("#telefone"), "telefone");
  aplicarMascara(document.querySelector("#cep"), "cep");

  /********************************************
   *  Função de Validação Visual
   ********************************************/
  const validarCampo = (campo) => {
    if (!campo.checkValidity()) {
      campo.classList.add("input-erro");
      campo.classList.remove("input-ok");
      return false;
    } else {
      campo.classList.remove("input-erro");
      campo.classList.add("input-ok");
      return true;
    }
  };

  // Valida cada campo ao perder o foco
  campos.forEach((campo) => {
    campo.addEventListener("blur", () => validarCampo(campo));
  });

  /********************************************
   *  Envio e Validação Final
   ********************************************/
  form.addEventListener("submit", (evento) => {
    evento.preventDefault(); // evita envio automático

    let valido = true;
    mensagem.textContent = ""; // limpa mensagens anteriores

    campos.forEach((campo) => {
      if (!validarCampo(campo)) {
        valido = false;
      }
    });

    if (!valido) {
      mensagem.textContent = "⚠️ Verifique os campos destacados e tente novamente.";
      mensagem.classList.add("alerta-erro");
      mensagem.classList.remove("alerta-sucesso");
    } else {
      mensagem.textContent = "✅ Cadastro realizado com sucesso! Obrigado por se inscrever.";
      mensagem.classList.add("alerta-sucesso");
      mensagem.classList.remove("alerta-erro");

      // Simula envio de dados e limpa o formulário
      setTimeout(() => {
        form.reset();
        campos.forEach((campo) => {
          campo.classList.remove("input-ok");
        });
      }, 1500);
    }
  });
});
