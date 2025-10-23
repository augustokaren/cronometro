// seleciona o elemento que mostra o tempo
const timerEl = document.getElementById('timer');

// seleciona a lista onde serão exibidas as marcas
const marksList = document.getElementById('marks-list');

// guarda o id do setInterval para poder parar depois
let intervalId = 0;

// tempo do cronômetro (em centésimos de segundo)
let timer = 0;

// armazena as marcas de tempo
let marks = [];

// formata o tempo em horas:minutos:segundos:centésimos
const formatTime = (time) => {
    const hours = Math.floor(time / 360000);
    const minutes = Math.floor((time % 360000) / 6000);
    const seconds = Math.floor((time % 6000) / 100);
    const hundredths = time % 100;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${hundredths.toString().padStart(2, '0')}`;
}

// atualiza o elemento do cronômetro com o tempo formatado
const setTimer = (time) => {
    timerEl.innerText = formatTime(time);
}

// adiciona uma marca de tempo na tela
const addMarkToList = (markIndex, markTime) => {
    marksList.innerHTML += `<p>Marca ${markIndex}: ${formatTime(markTime)}</p>`;
}

// controla o início, pausa e continuação do cronômetro
const toggleTimer = () => {
    const button = document.getElementById('power');
    const action = button.getAttribute('action');

    clearInterval(intervalId); // pausa o loop anterior (evita múltiplos setInterval e sobrecarga)

    if (action == 'start' || action == 'continue') {
        // inicia um novo intervalo que atualiza o tempo a cada 10ms
        intervalId = setInterval(() => {
            timer += 1;         // incrementa o tempo
            setTimer(timer);    // mostra o novo tempo
        }, 10);

        // muda o botão para o estado de pausa
        button.setAttribute('action', 'pause');
        button.innerHTML = '<i class="fa-solid fa-pause"></i>';
    } else if (action == 'pause') {
        // pausa a contagem (sem zerar)
        // o tempo para, mas pode continuar do mesmo ponto
        button.setAttribute('action', 'continue');
        button.innerHTML = '<i class="fa-solid fa-play"></i>';
    }
}

// adiciona uma marca (salva o tempo atual)
const markTime = () => {
    marks.push(timer);
    addMarkToList(marks.length, timer);
}

// reseta o cronômetro e limpa tudo
const resetTimer = () => {
    clearInterval(intervalId); // interrompe qualquer loop ativo
    timer = 0;                 // zera o tempo
    marks = [];                // limpa as marcas
    setTimer(timer);           // atualiza o visor
    marksList.innerHTML = '';  // limpa a lista de marcas

    // volta o botão para o estado inicial (play)
    const button = document.getElementById('power');
    button.setAttribute('action', 'start');
    button.innerHTML = '<i class="fa-solid fa-play"></i>';
}

// eventos dos botões: iniciar/pausar, marcar e resetar
document.getElementById('power').addEventListener('click', toggleTimer); // controla o cronômetro
document.getElementById('mark').addEventListener('click', markTime);     // adiciona marca
document.getElementById('reset').addEventListener('click', resetTimer);  // reseta tudo
