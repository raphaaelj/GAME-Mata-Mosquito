var altura = innerHeight; 
var largura = innerWidth;
var timing = 2000; //Tempo utilizado para definir velocidade de spawn das moscas
var tempo = 15 //Tempo utilizado no cronometro
var vidas = 1;
var cronometro = null; //VariávelGlobal
var spawnMosca = null; //VariávelGlobal
var musica = new Audio('../assets/som/musica_mata_mosquito.wav');

function ajustaTamanhoTela() {
    altura = innerHeight;
    largura = innerWidth;

    console.log(altura, largura)
}

//Verifica nível de dificuldade selecionado
var dificuldade = location.search //recupera o querystirng de uma URL (basicamente tudo que é parâmetro)
dificuldade = dificuldade.replace('?', ''); //substitui o "?" por vazio
if (dificuldade === 'facil') {
    timing = 2000;
} else if (dificuldade === 'medio') {
    timing = 1100;
} else if (dificuldade === 'dificil') {
    timing = 950;
} else if (dificuldade === 'chucknorris') {
    timing = 750;
}


//Inicia o Jogo através do click no botão do menu
function iniciarJogo() {
    var dificuldade = document.getElementById('dificuldade').value;
    if (dificuldade === '') {
        alert('Selecione uma dificuldade para iniciar o jogo!')
        return false;
    }
    
    location.href = "content/app.html?" + dificuldade;
}

//Faz o processamento das funções do game utilizando o 'onload=' no body do app.html
function gameLoader() {
    musica.play();
    spawnMosca = setInterval(function () { criaMosca() }, timing);
    cronometro = setInterval(function () {
        tempo -= 1;
        document.getElementById('cronometro').innerHTML = tempo + 's';
        if (tempo == 0) {
            clearInterval(spawnMosca, cronometro);
            location.href = '../content/vitoria.html'
        }
    }, 1000);
}

//Função da Mosca >> remove / checa vida / gera posição / cria o elemento / gera tamanho / gera rotação
function criaMosca() {
    //remover mosca anterior caso exista
    if (document.getElementById('mosquito')) {
        document.getElementById('mosquito').remove()

        //se vida maior que 3, interrompe o jogo
        if (vidas > 3) {
            location.href = '../content/fim_de_jogo.html?' + dificuldade;
            clearInterval(spawnMosca, cronometro);
        } else {
            document.getElementById('v' + vidas).src = '../assets/imagens/coracao_vazio.png';
            vidas++
        }

        console.clear()
    }

    //Gera Posição Aleatória e arredonda para baixo
    var posX = Math.floor(Math.random() * largura) - 100;
    var posY = Math.floor(Math.random() * altura) - 100;
    posX = posX < 0 ? 0 : posX; //operador condicional ternário, "posX é igual a se posX for menor que 0 então posX é igual a 0 se não é igual a ele mesmo"
    posY = posY < 0 ? 0 : posY;

    //Criar o Elemento(mosca)
    var mosquito = document.createElement('img'); //Cria
    mosquito.src = '../assets/imagens/mosca.png'; //Define o SRC
    mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio(); //Seta a classe
    mosquito.style.left = posX + 'px'; //Seta a posição X (left)
    mosquito.style.top = posY + 'px'; //Seta a posição Y (top)
    mosquito.style.position = 'absolute'; //Seta a posição do Obj
    mosquito.id = 'mosquito'
    mosquito.onclick = function () { this.remove() }; //Ao clicar no mosquito, remove ele

    document.body.appendChild(mosquito); //Adiciona o elemento 'mosquito' ao Body
};

function voltarMenu() {
    location.href = "../index.html"
}

function reiniciarJogo() {
    dificuldade;
    location.href = "../content/app.html?" + dificuldade;
}

//Gera número aleatório de 0 a 3 para setar a classe com tamanhos  diferentes
function tamanhoAleatorio() {
    var classe = Math.floor(Math.random() * 3);

    switch (classe) {
        case 0:
            return 'mosca1';
        case 1:
            return 'mosca2';
        case 2:
            return 'mosca3';
    }
}

//Gera lados aleatórios da imagem
function ladoAleatorio() {
    var classe = Math.round(Math.random() * 2)

    switch (classe) {
        case 0:
            return 'ladoA';
        case 1:
            return 'ladoB';
    }
}
