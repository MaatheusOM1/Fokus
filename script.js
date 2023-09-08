//Declaração de variáveis
const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const startPauseBt = document.querySelector('#start-pause')
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const tempoNaTela = document.querySelector('#timer')
const imagemContador = document.querySelector('.app__card-primary-butto-icon')

//Declaração de variáveis dos áudios
const musicaFocoInput = document.querySelector('#alternar-musica')
const musica = new Audio('./sons/luna-rise-part-one.mp3')
const audioPause = new Audio('./sons/pause.mp3')
const audioPlay = new Audio('./sons/play.wav')
const audioAlerta = new Audio('./sons/beep.mp3')

//Declaração de variáveis do contador
let tempoDecorridoEmSegundos = 1500
let intervaloId = null

//Método para a música tocar para sempre
musica.loop = true

//Toda vez que o input checkbox for checado, ele toca música, quando volta, para
musicaFocoInput.addEventListener('change', () => {
    if(musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})

//Trocar para a página "foco", tempo de 25 minutos
focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500 //Tempo do cronômetro
    alterarContexto('foco') //Alterar
    focoBt.classList.add('active')//Adicionar a classe "active", css para o botão
})

//Trocar para a página "descanso curto", tempo de 5 minutos
curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

//Trocar para a página "descanso longo", tempo de 15 minutos
longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})


//Função para trocar a página
function alterarContexto(contexto) {
    mostrarTempo() //Mostrar o contador
    botoes.forEach(function (contexto){ //Remover a classe "active", css para botão
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)//Trocar a cor de fundo de acordo com a página
    banner.setAttribute('src', `./imagens/${contexto}.png`)//Trocar a foto de acordo com a página
    switch (contexto) { //Trocar o texto de acordo com a página
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
            ` 
            break;
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>
            `
        default:
            break;
    }
}

//Função para a contagem regressiva do contador
const contagemRegressiva = () => { 
    if(tempoDecorridoEmSegundos <= 0){ //Se o contador chegar em 0, toca o som de alerta
        audioAlerta.play()
        alert('Tempo finalizado!')
        pararContagem()
        return //Return para acabar por aqui, e não popar o alerta infinitamente
    }
    tempoDecorridoEmSegundos -= 1 //Tira um segundo do contador por vez
    mostrarTempo()
}

startPauseBt.addEventListener('click', iniciarOuPausar) //Chama a função de Iniciar ou Pausar o cronômetro

//Função de Iniciar ou Pausar o cronômetro
function iniciarOuPausar() {
    if(intervaloId){ //Se "intervaloId" existir (for diferente de nulo)
        audioPause.play()
        pararContagem()
        return
    }
    audioPlay.play() //Como a condição do if não é satisfeita, o código dentro deste bloco é executado
    intervaloId = setInterval(contagemRegressiva, 1000) //Inicia contagemRegressiva a cada 1000 milissegundose e armazena o ID do intervalo resultante na variável intervaloId
    iniciarOuPausarBt.textContent = 'Pausar' //Método textContent é viável apenas para inserir textos, não sendo igual o innerHTML, nesse caso, se colocasse <strong>pausar</strong>, ele apareceria escrito ao pé da letra, e não acrescentaria a tag.
    imagemContador.setAttribute('src', './imagens/pause.png') //Mudar a imagem do botão de começar/Pausar
}

//Função para parar o contador
function pararContagem(){
    clearInterval(intervaloId) //Parar contagem iniciada na função iniciarOuPausar
    iniciarOuPausarBt.textContent = 'Começar'
    imagemContador.setAttribute('src', './imagens/play_arrow.png') //Mudar a imagem do botão de começar/Pausar
    intervaloId = null //Quando "intervaloId" é null, isso significa que não há nenhuma contagem regressiva em andamento, e se define novamente pois a função iniciarOuPausar armazenou o ID do intervalo na variável intervaloId
}

//Funcção de mostrar o tempo do cronômetro, e formatado, para que não exiba "900" por exemplo
function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'}) //Formatar o tempo do contador
    tempoNaTela.innerHTML = `${tempoFormatado}` //Para aparecer o contador com o tempo formatado
}

mostrarTempo() //Puxa a função no escopo global para sempre aparecer o cronômetro na tela, e não apenas quando clicar no botão iniciar
