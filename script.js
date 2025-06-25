let perguntas = "";
let perguntaAtual = 0;
let pontuacao = 0;
let tempo = 30;
let timer;
let dificuldade = "";

const somAcerto = document.getElementById('somAcerto');
const somErro = document.getElementById('somErro');


function setDificuldade(nivel) {
  dificuldade = nivel;
  if(nivel === "facil") {
    perguntas = perguntasArray;
  } else if(nivel === "medio") {
    perguntas = perguntas2Array;
  } else if(nivel === "dificil") {
    perguntas = perguntas3Array;
  }
  perguntaAtual = 0;
  pontuacao = 0;
  carregarPergunta();
  document.getElementById('dificuldade').style.display = 'none';
  document.getElementById('quiz-container').style.display = 'block';
}


function carregarPergunta() {
  if (perguntaAtual >= perguntas.length) {
    clearInterval(timer);
    document.getElementById('quiz-container').style.display = 'none';
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = `Fim do quiz!<p>Sua pontuação foi: ${pontuacao}</p>`;
    resultado.style.display = 'block';
    return;
  }

  const pergunta = perguntas[perguntaAtual];
  if (pergunta.icone) {
  document.getElementById('icone').innerHTML = `<img src="${pergunta.icone}" alt="icone da pergunta" class="icone-pergunta">`;
} else {
  document.getElementById('icone').innerHTML = "";
}
  
  document.getElementById('pergunta').textContent = pergunta.pergunta;

  const opcoesDiv = document.getElementById('opcoes');
  opcoesDiv.innerHTML = '';

  pergunta.opcoes.forEach(opcao => {
    const button = document.createElement('button');
    button.textContent = opcao;
    button.onclick = () => verificarResposta(opcao);
    opcoesDiv.appendChild(button);
  });

  tempo = 30;
  document.getElementById('tempo').textContent = tempo;
  clearInterval(timer);
  timer = setInterval(contagemRegressiva, 1000);
}

function contagemRegressiva() {
  tempo--;
  document.getElementById('tempo').textContent = tempo;

  if (tempo <= 0) {
    clearInterval(timer);
    somErro.play();
    perguntaAtual++;
    carregarPergunta();
  }
}

function verificarResposta(resposta) {
  const pergunta = perguntas[perguntaAtual];

  if (resposta === pergunta.resposta) {
    pontuacao += 10;
    somAcerto.play();
  } else {
    somErro.play();
  }

  
document.getElementById('pontuacao').textContent = `Pontos: ${pontuacao}`;
  clearInterval(timer);
  perguntaAtual++;
  setTimeout(carregarPergunta, 500);
}