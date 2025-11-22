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
                botao.textContent = "❤️Favoritar";
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

    // Evitar que haja duplicação
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


