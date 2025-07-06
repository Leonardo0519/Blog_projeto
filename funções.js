console.log("Arquivo funções.js carregado com sucesso!");

function fazerlogin(event) {
    event.preventDefault(); // Evita o recarregamento da página
    const usuario = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;

    // Simulação de validação
    if (usuario == "admin" && senha == "1234") {
        alert("Login realizado com sucesso!");
    } else {
        alert("Usuário ou senha incorretos.");
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 1, // Rola para o topo da página
        behavior: 'smooth' // Faz a rolagem suave
    });
}

function scrollToBottom() {
    window.scrollTo({
        top: document.body.scrollHeight, // Rola para o final da página
        behavior: 'smooth' // Faz a rolagem suave
    });
}


// Fuções para adicionar um link para cadastrar um novo usuário //
function mostrarCadastro(event) {
    event.preventDefault();
    document.getElementById('container-login').style.display = 'block'; // Evita o recarregamento da página
}
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('loginForm');
    if (form) {
        form.addEventListener('submit', fazerlogin);
        e.preventDefault();
    }



    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
try{
    const response =  fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, senha })
    });

    const dados =  response.json();
    document.getElementById('mensagem').innerText = dados.message;
}catch (error) {
   document.getElementById('mensagem').innerText = 'Erro ao conectar com o servidor.';
}
});