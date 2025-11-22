// -------------------------------------
// Customização das mensagens de alerta
// -------------------------------------
function alerta(mensagem, tipo = 'sucesso', titulo) {
    let toastId, toastTituloElId, toastMensagemElId;

    if (tipo === 'erro') { //escolhe o toast de acordo com o tipo passado em parâmetro
        toastId = 'toast-erro';
        toastTituloElId = 'toast-erro-titulo';
        toastMensagemElId = 'toast-erro-mensagem';
        if (titulo === null) titulo = 'Atenção';
    } else { //por padrão a mensagem é de sucesso
        toastId = 'toast-sucesso';
        toastTituloElId = 'toast-sucesso-titulo';
        toastMensagemElId = 'toast-sucesso-mensagem';
        if (titulo === null) titulo = 'Sucesso';
    }

    const toastEl = document.getElementById(toastId);

    if (toastEl) {
        //Pega os elementos com id e substitui pelo texto passado em parâmetro
        document.getElementById(toastTituloElId).textContent = titulo;
        document.getElementById(toastMensagemElId).textContent = mensagem;

        // Cria e mostra o Toast
        const toast = new bootstrap.Toast(toastEl);
        toast.show();
    } else {
        alert(mensagem); //se algo falhar, emite um alerta com a mensagem
    }
}
