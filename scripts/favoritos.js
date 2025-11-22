// -------------------------------------
// Excluir Livro Favorito
// -------------------------------------
function excluirFavorito(indice) {
    if (confirm("Tem certeza que deseja remover este livro dos favoritos?")) {

        let lista = JSON.parse(localStorage.getItem("favoritos"));

        //Remove 1 elemento no índice passado
        lista.splice(indice, 1);

        // Salva a lista atualizada de volta no localStorage
        localStorage.setItem("favoritos", JSON.stringify(lista));

        alerta("Livro removido com sucesso!", 'sucesso', "Removido!");

        carregarFavoritos();
    }
}
// -------------------------------------
// Página de Favoritos
// -------------------------------------
function mostrarAnotacao(indice) {
    //mostrar e ocultar botão de anotação
    let container = document.getElementById("inputContainer" + indice);
    if (container.classList.contains("d-none")) { //condição para caso esteja escondido(d-none)
        container.classList.remove("d-none");
        container.classList.add("d-flex", "flex-column");
        document.getElementById("nota" + indice).focus();
    } else { //caso esteja visível
        container.classList.add("d-none");
        container.classList.remove("d-flex", "flex-column");
    }
}

// -------------------------------------
// Carregar favoritos na página
// -------------------------------------
function carregarFavoritos() {

    let lista = JSON.parse(localStorage.getItem("favoritos"));

    if (lista == null) {
        lista = []; //se lista não existir, recebe array vazio
    }

    let area = document.getElementById("listaFavoritos");
    if (!area) return;

    if (lista.length == 0) { //texto para caso tamanho da lista seja igual a 0
        area.textContent = "Nenhum favorito salvo.";
        return;
    }

    area.innerHTML = "";

    for (let i = 0; i < lista.length; i++) { //cria cada card contendo livro de acordo com o tamanho da lista

        let col = document.createElement("div");
        col.classList.add("col-md-4", "mb-3");

        let card = document.createElement("div");
        card.classList.add("card");

        let img = document.createElement("img");
        img.src = lista[i].imagem;
        img.classList.add("card-img-top");

        let corpo = document.createElement("div");
        // Adiciona d-flex e flex-column para melhor layout do corpo
        corpo.classList.add("card-body", "d-flex", "flex-column");

        let tituloEl = document.createElement("h5");
        tituloEl.textContent = lista[i].titulo;


        // --------------------------
        // LISTA DE ANOTAÇÕES (UL)
        // --------------------------
        let listaUl = document.createElement("ul");
        listaUl.id = "listaNotas" + i;
        listaUl.classList.add("list-unstyled", "mt-3", "mb-3"); // Estilos limpos para UL

        for (let j = 0; j < lista[i].anotacoes.length; j++) {
            let li = document.createElement("li");
            li.textContent = `• ${lista[i].anotacoes[j]}`; // Adiciona marcador visual
            li.classList.add("text-secondary");
            listaUl.appendChild(li);
        }

        // ------------------------------------
        // Lápis
        // ------------------------------------

        let botaoLapis = document.createElement("button");
        // mx-auto centraliza horizontalmente (margin auto)
        botaoLapis.classList.add("btn", "btn-link", "mt-3", "text-decoration-none", "mx-auto");
        botaoLapis.innerHTML = '✏️ Escrever Anotação';
        botaoLapis.onclick = function() { // Ao clicar, chama a função de toggle para mostrar o input
            mostrarAnotacao(i);
        };

        let botaoExcluir = document.createElement("button");
        // mx-auto centraliza horizontalmente, btn-sm é pequeno e btn-outline-danger é a cor
        botaoExcluir.classList.add("btn", "btn-sm", "btn-outline-danger", "mx-auto");
        botaoExcluir.innerHTML = '🗑️ Excluir';

        botaoExcluir.onclick = function() {
            excluirFavorito(i);
        };

        // Adiciona o Título e o Botão ao corpo do card
        corpo.appendChild(tituloEl);
        corpo.appendChild(botaoExcluir);

        let inputContainer = document.createElement("div");
        inputContainer.id = "inputContainer" + i;
        //'d-none' para esconder o campo
        inputContainer.classList.add("mostrarAnotacao-input-container", "d-none", "mt-3", "mb-3");

        let textarea = document.createElement("textarea");
        textarea.id = "nota" + i; // id para capturar o valor
        textarea.placeholder = "Escreva sua anotação aqui...";
        textarea.classList.add("form-control");

        //Botão Salvar
        let botaoSalvar = document.createElement("button");
        botaoSalvar.classList.add("btn", "btn-primary", "mt-2", "w-100"); // w-100 para largura total
        botaoSalvar.textContent = "Salvar Anotação";
        botaoSalvar.onclick = function() {
            salvarAnotacao(i);
        };

        // monta o inputContainer
        inputContainer.appendChild(textarea);
        inputContainer.appendChild(botaoSalvar);

        // adiciona tudo ao corpo do card
        corpo.appendChild(tituloEl);
        corpo.appendChild(listaUl);
        corpo.appendChild(botaoLapis); // botão Lápis
        corpo.appendChild(inputContainer); // container escondido
        card.appendChild(img);
        card.appendChild(corpo);
        col.appendChild(card);
        area.appendChild(col);
    }
}

// -------------------------------------
carregarFavoritos();
// -------------------------------------

// Salvar anotação em lista
// -------------------------------------
function salvarAnotacao(indice) {

    let lista = JSON.parse(localStorage.getItem("favoritos"));

    let texto = document.getElementById("nota" + indice).value;

    if (texto == "") {
        // Validação: Exibe alerta se o campo estiver vazio
        alerta("A anotação não pode estar vazia.",'erro',"Vazio");
        return;
    }

    // Adiciona a anotação à lista e atualiza o localStorage
    lista[indice].anotacoes.push(texto);
    localStorage.setItem("favoritos", JSON.stringify(lista));

    // Adicionar item visualmente sem recarregar
    let li = document.createElement("li");
    li.textContent = `• ${texto}`; // Adiciona marcador para consistência visual
    li.classList.add("text-secondary"); // Adiciona classe para consistência visual

    let listaUl = document.getElementById("listaNotas" + indice);
    listaUl.appendChild(li);

    // Limpa o campo de texto
    document.getElementById("nota" + indice).value = "";

    //Fecha o inputContainer chamando a função de toggle
    mostrarAnotacao(indice);

    //Mostra notificação de sucesso
    alerta("Anotação salva com sucesso!", 'sucesso', "Salva!");
}