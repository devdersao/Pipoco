var timerId = null; //Variavel que armazena e chama a função timeout

function iniciaJogo(){
    //recuperando o valor da dificuldade do jogo
    var url = window.location.search;
    //utilizando para recuperar apenas o valor e não o caractere
    var nivel_jogo = url.replace("?", "");

    var tempo_segundos = 0;

    if(nivel_jogo == 1){//1 facil - 100 segundos
        tempo_segundos = 100;
    }
    if(nivel_jogo == 2){//2 normal - 60 segundos
        tempo_segundos = 60;
    }
    if(nivel_jogo == 3){//3 dificil - 40 segundos
        tempo_segundos = 40;
    }
    
    //inserindo segundos span
    document.getElementById('cronometro').innerHTML = tempo_segundos;
    //quantidade de baloes
    var qtd_baloes = 80;

    cria_baloes(qtd_baloes);

    //imprimir qtd baloes inteiros puxar a variavel daqui e mandar o valro via html id pelo jogo.html
    document.getElementById('baloes_inteiros').innerHTML= qtd_baloes;
    document.getElementById('baloes_estourados').innerHTML= 0;

    contagem_tempo(tempo_segundos +1);
}

function contagem_tempo(segundos){
    //decrementando os segundos
    segundos--;
    //passando o valor dos segundos reduzido via html
    document.getElementById('cronometro').innerHTML = segundos;
    //função utilizada para contagem de tempo de milisegundos 
   timerId =  setTimeout("contagem_tempo("+segundos+")",1000);
   if(segundos == 0){
        clearTimeout(timerId);// não deixa o cronometro correr forma negativa
        game_over();
        return false;
   }
}
//notificação de fim de jogo
function game_over(){
    alert('GAME OVER - Você não conseguiu completar o jogo a tempo');
}

function cria_baloes(qtd_baloes){
    //laço usado pra repetir as img
    for(var i = 1; i <= qtd_baloes; i++){
        var balao = document.createElement("img");
        //puxando a img
        balao.src = 'img/balao_pequeno.png';
        //espaçamento dos baloões
        balao.style.margin = '10px';
        balao.id = 'b' + i ;
        //função com evento ja realizada 
        balao.onclick = function(){estourar(this);}
        //utilizando como replica pra div
        document.getElementById('cenario').appendChild(balao);
        const imagem = document.getElementById("baloes_estourados");
        const audio = document.getElementById("audio");

        balao.addEventListener("click", function(){
 
         // Toca o som aqui
        audio.play();
});

    }
}

//função responsavel por trocar a imagem completando a ação de estouro
function estourar(e){
    var id_balao = e.id;
    //limpar evento onclick
    document.getElementById(id_balao).setAttribute("onclick","");
    //chamar imagem
    document.getElementById(id_balao).src = 'img/pow_pequeno.png';
    pontuacao(-1);
}

function pontuacao(acao){

    //puxando valores textual
     var baloes_inteiros = document.getElementById('baloes_inteiros').innerHTML;
     var baloes_estourados = document.getElementById('baloes_estourados').innerHTML;
    // convertendo valores textuais a numericos
     baloes_inteiros = parseInt(baloes_inteiros);
     baloes_estourados = parseInt(baloes_estourados);
    // calculo
     baloes_inteiros = baloes_inteiros + acao;
     baloes_estourados = baloes_estourados - acao;
    // devolvendo os valores convertidos
     document.getElementById('baloes_inteiros').innerHTML = baloes_inteiros;
     document.getElementById('baloes_estourados').innerHTML = baloes_estourados;

     situacao_jogo(baloes_inteiros);

}

function parar_jogo(){
    clearTimeout(timerId);
}