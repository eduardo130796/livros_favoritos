//Exclusão de livro favorito

function excluirFavorito(indice) {

    if (confirm("Tem certeza que deseja remover este livro dos favoritos?")) {

        // Carrega a lista salva
        let lista = JSON.parse(localStorage.getItem("favoritos"));

        // Remove UM elemento no índice recebido
        lista.splice(indice, 1);

        // Salva novamente no localStorage
        localStorage.setItem("favoritos", JSON.stringify(lista));

        // Notificação
        alerta("Livro removido com sucesso!", 'sucesso', "Removido!");

        // Recarrega a tela
        carregarFavoritos();
    }
}


// Mostrar/ocultar campo de anotação

function mostrarAnotacao(indice) {

    // Pega o container do textarea
    let container = document.getElementById("inputContainer" + indice);

    // Se está oculto → mostrar
    if (container.classList.contains("d-none")) {

        container.classList.remove("d-none");
        container.classList.add("d-flex", "flex-column");

        // Dá foco ao textarea
        document.getElementById("nota" + indice).focus();

    } else {
        // Se está aberto → esconder novamente
        container.classList.add("d-none");
        container.classList.remove("d-flex", "flex-column");
    }
}



// Carregar todos os livros favoritos na página

function carregarFavoritos() {

    // Lê os favoritos do localStorage
    let lista = JSON.parse(localStorage.getItem("favoritos"));

    // Se for nulo (primeiro uso), cria lista vazia
    if (lista == null) {
        lista = [];
    }

    let area = document.getElementById("listaFavoritos");

    // Se a página não tem a área (por segurança)
    if (!area) return;

    // Caso não tenha favoritos
    if (lista.length == 0) {
        area.textContent = "Nenhum favorito salvo.";
        return;
    }

    // Limpa a área antes de montar novamente
    area.innerHTML = "";



    // LOOP PRINCIPAL — cria 1 card para cada livro favorito

    for (let i = 0; i < lista.length; i++) {

        let col = document.createElement("div");
        col.classList.add("col-md-4", "mb-3");

        let card = document.createElement("div");
        card.classList.add("card");

        //  Imagem 
        let img = document.createElement("img");
        img.src = lista[i].imagem;
        img.classList.add("card-img-top");


        // Corpo do Card 
        let corpo = document.createElement("div");
        corpo.classList.add("card-body", "d-flex", "flex-column");

        let tituloEl = document.createElement("h5");
        tituloEl.textContent = lista[i].titulo;



        // Lista UL com TODAS as anotações do livro atual

        let listaUl = document.createElement("ul");
        listaUl.id = "listaNotas" + i;
        listaUl.classList.add("list-unstyled", "mt-3", "mb-3");


        // Loop para criar LI de cada anotação salva
        for (let j = 0; j < lista[i].anotacoes.length; j++) {

            // Cada LI possui texto + botão remover
            let li = document.createElement("li");
            li.classList.add("d-flex", "justify-content-between", "align-items-center", "text-secondary");

            let texto = document.createElement("span");
            texto.textContent = "• " + lista[i].anotacoes[j];

            let botaoExcluirAnotacao = document.createElement("button");
            botaoExcluirAnotacao.classList.add("btn", "btn-sm", "btn-outline-danger");
            botaoExcluirAnotacao.textContent = "Remover";

            // Botão remove aquela anotação específica
            botaoExcluirAnotacao.onclick = function () {
                BotaoRemoverAnotacao(i, j);
            }

            li.appendChild(texto);
            li.appendChild(botaoExcluirAnotacao);
            listaUl.appendChild(li);
        }



        // Botão para abrir o campo de anotação
     

        let botaoLapis = document.createElement("button");
        botaoLapis.classList.add("btn", "btn-link", "mt-3", "text-decoration-none", "mx-auto");
        botaoLapis.textContent = '✏️ Escrever Anotação';

        botaoLapis.onclick = function () {
            mostrarAnotacao(i);
        };



        // Botão para excluir o livro

        let botaoExcluir = document.createElement("button");
        botaoExcluir.classList.add("btn", "btn-sm", "btn-outline-danger", "mx-auto");
        botaoExcluir.textContent = '🗑️ Excluir';

        botaoExcluir.onclick = function () {
            excluirFavorito(i);
        };



        // Container onde o textarea aparece

        let inputContainer = document.createElement("div");
        inputContainer.id = "inputContainer" + i;
        inputContainer.classList.add("mostrarAnotacao-input-container", "d-none", "mt-3", "mb-3");

        let textarea = document.createElement("textarea");
        textarea.id = "nota" + i;
        textarea.placeholder = "Escreva sua anotação aqui...";
        textarea.classList.add("form-control");

        let botaoSalvar = document.createElement("button");
        botaoSalvar.classList.add("btn", "btn-primary", "mt-2", "w-100");
        botaoSalvar.textContent = "Salvar Anotação";
        botaoSalvar.onclick = function () {
            salvarAnotacao(i);
        };

        inputContainer.appendChild(textarea);
        inputContainer.appendChild(botaoSalvar);



        // MONTAGEM FINAL DO CARD

        corpo.appendChild(tituloEl);
        corpo.appendChild(botaoExcluir);
        corpo.appendChild(listaUl);
        corpo.appendChild(botaoLapis);
        corpo.appendChild(inputContainer);

        card.appendChild(img);
        card.appendChild(corpo);
        col.appendChild(card);
        area.appendChild(col);
    }
}



// Carrega ao abrir a página
carregarFavoritos();



// Salvar nova anotação na UL e no localStorage

function salvarAnotacao(indice) {

    let lista = JSON.parse(localStorage.getItem("favoritos"));
    let texto = document.getElementById("nota" + indice).value;

    // Validação
    if (texto == "") {
        alerta("A anotação não pode estar vazia.", 'erro', "Vazio");
        return;
    }

    // Salva no array e no localStorage
    lista[indice].anotacoes.push(texto);
    localStorage.setItem("favoritos", JSON.stringify(lista));

    // UL que mostra as anotações
    let listaUl = document.getElementById("listaNotas" + indice);

    // Cria LI nova
    let li = document.createElement("li");
    li.classList.add("d-flex", "justify-content-between", "align-items-center", "text-secondary");

    let textoSpan = document.createElement("span");
    textoSpan.textContent = "• " + texto;

    let novoIndice = lista[indice].anotacoes.length - 1;

    let botaoExcluirAnotacao = document.createElement("button");
    botaoExcluirAnotacao.classList.add("btn", "btn-sm", "btn-outline-danger");
    botaoExcluirAnotacao.textContent = "Remover";

    botaoExcluirAnotacao.onclick = function () {
        BotaoRemoverAnotacao(indice, novoIndice);
    };

    li.appendChild(textoSpan);
    li.appendChild(botaoExcluirAnotacao);

    listaUl.appendChild(li);

    // Limpa textarea
    document.getElementById("nota" + indice).value = "";

    // Fecha o campo
    mostrarAnotacao(indice);

    alerta("Anotação salva com sucesso!", 'sucesso', "Salva!");
}



// Remoção de anotação individual

function BotaoRemoverAnotacao(i, j) {

    let lista = JSON.parse(localStorage.getItem("favoritos"));

    lista[i].anotacoes.splice(j, 1);

    localStorage.setItem("favoritos", JSON.stringify(lista));

    carregarFavoritos();

    alerta("Anotação removida!", "sucesso", "Removida!");
}
