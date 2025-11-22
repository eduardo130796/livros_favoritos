// -------------------------------------
// Ir para páginas
// -------------------------------------
function irParaFavoritos() {
    location.href = "favoritos.html";
}

function irParaIndex() {
    location.href = "index.html";
}

// -------------------------------------
// Buscar livro na API (Google Books)
// -------------------------------------
function buscarLivro() {

    let termo = document.getElementById("campoBusca").value;

    if (termo == "") {
        alerta("Digite o nome de um livro.", 'erro', 'Campo Vazio');
        return;
    }

    let url = "https://www.googleapis.com/books/v1/volumes?q=" + termo;

    fetch(url)
        .then(function(resposta) { return resposta.json(); })
        .then(function(dados) {

            let area = document.getElementById("resultado");
            area.innerHTML = ""; // limpa antes de criar

            if (!dados.items) {
                area.textContent = "Nenhum livro encontrado.";
                return;
            }

            for (let i = 0; i < dados.items.length; i++) {

                let info = dados.items[i].volumeInfo;

                let titulo = info.title;
                let imagem;
                if (info.imageLinks) {
                    imagem = info.imageLinks.thumbnail;
                } else {
                    imagem = "https://via.placeholder.com/200x300?text=SEM+IMAGEM";
                }

                // ----------------------------
                // Criando card via DOM (SEM innerHTML)
                // ----------------------------
                let col = document.createElement("div");
                col.classList.add("col-md-3", "mb-3");

                let card = document.createElement("div");
                card.classList.add("card");

                let img = document.createElement("img");
                img.src = imagem;
                img.classList.add("card-img-top");

                let corpo = document.createElement("div");
                corpo.classList.add("card-body");

                let tituloEl = document.createElement("h5");
                tituloEl.classList.add("card-title");
                tituloEl.textContent = titulo;

                let botao = document.createElement("button");
                botao.classList.add("btn", "btn-outline-success");
                botao.textContent = "Favoritar";
                botao.onclick = function() {
                    salvarFavorito(titulo, imagem);
                };

                corpo.appendChild(tituloEl);
                corpo.appendChild(botao);

                card.appendChild(img);
                card.appendChild(corpo);

                col.appendChild(card);

                area.appendChild(col);
            }

        });
}

// -------------------------------------
// Salvar livro no localStorage
// -------------------------------------
function salvarFavorito(titulo, imagem) {

    let lista = JSON.parse(localStorage.getItem("favoritos"));

    if (lista == null) {
        lista = [];
    }

    // Evitar duplicado
    for (let i = 0; i < lista.length; i++) {
        if (lista[i].titulo == titulo) {
            alerta("Este livro já está nos favoritos.",'erro','Já Existe!');
            return;
        }
    }

    let item = {
        titulo: titulo,
        imagem: imagem,
        anotacoes: []  // agora lista!!!
    };

    lista.push(item);

    localStorage.setItem("favoritos", JSON.stringify(lista));

    alerta("Livro adicionado com sucesso!",'sucesso','Favorito!');
}

// -------------------------------------
// Carregar favoritos na página
// -------------------------------------
function carregarFavoritos() {

    let lista = JSON.parse(localStorage.getItem("favoritos"));

    if (lista == null) {
        lista = [];
    }

    let area = document.getElementById("listaFavoritos");
    if (!area) return;

    if (lista.length == 0) {
        area.textContent = "Nenhum favorito salvo.";
        return;
    }

    area.innerHTML = "";

    for (let i = 0; i < lista.length; i++) {

        let col = document.createElement("div");
        col.classList.add("col-md-4", "mb-3");

        let card = document.createElement("div");
        card.classList.add("card");

        let img = document.createElement("img");
        img.src = lista[i].imagem;
        img.classList.add("card-img-top");

        let corpo = document.createElement("div");
        corpo.classList.add("card-body");

        let tituloEl = document.createElement("h5");
        tituloEl.textContent = lista[i].titulo;

        // --------------------------
        // LISTA DE ANOTAÇÕES (UL)
        // --------------------------
        let listaUl = document.createElement("ul");
        listaUl.id = "listaNotas" + i;

        for (let j = 0; j < lista[i].anotacoes.length; j++) {
            let li = document.createElement("li");
            li.textContent = lista[i].anotacoes[j];
            listaUl.appendChild(li);
        }

        // Campo para adicionar nova anotação
        let textarea = document.createElement("textarea");
        textarea.id = "nota" + i;
        textarea.placeholder = "Escreva uma anotação...";

        let botaoSalvar = document.createElement("button");
        botaoSalvar.classList.add("btn", "btn-primary", "mt-2");
        botaoSalvar.textContent = "Salvar Anotação";
        botaoSalvar.onclick = function() {
            salvarAnotacao(i);
        };

        corpo.appendChild(tituloEl);
        corpo.appendChild(listaUl);
        corpo.appendChild(textarea);
        corpo.appendChild(botaoSalvar);

        card.appendChild(img);
        card.appendChild(corpo);

        col.appendChild(card);

        area.appendChild(col);
    }
}

// -------------------------------------
// Salvar anotação em lista
// -------------------------------------
function salvarAnotacao(indice) {

    let lista = JSON.parse(localStorage.getItem("favoritos"));

    let texto = document.getElementById("nota" + indice).value;

    if (texto == "") {
        alerta("A anotação não pode estar vazia.",'erro',"Vazio");
        return;
    }

    lista[indice].anotacoes.push(texto);

    localStorage.setItem("favoritos", JSON.stringify(lista));

    // adicionar item visualmente sem recarregar
    let li = document.createElement("li");
    li.textContent = texto;

    let listaUl = document.getElementById("listaNotas" + indice);
    listaUl.appendChild(li);

    document.getElementById("nota" + indice).value = "";
}

// -------------------------------------
carregarFavoritos();
// -------------------------------------
