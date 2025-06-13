// EXERCÍCIO 1 --------------------------------------------------------
const msPorDia = 1000 * 60 * 60 * 24;
const hoje = new Date();
const dataFerias = new Date("2025-07-01");
const dataNiver = new Date("2026-03-28");

function contarDias(data) {
  return Math.ceil((data - hoje) / msPorDia);
}

document.getElementById("saidaFerias").textContent =
  `Faltam ${contarDias(dataFerias)} dia(s) para as férias (01/07/2025).`;

document.getElementById("saidaNiver").textContent =
  `Faltam ${contarDias(dataNiver)} dia(s) para meu próximo o aniversário (28/03/2026).`;

// EXERCÍCIO 2 --------------------------------------------------------

function calcularIMC() {
  let peso = parseFloat(document.getElementById("peso").value);
  let altura = parseFloat(document.getElementById("altura").value);

  if (isNaN(peso) || isNaN(altura) || altura <= 0 || peso <= 0) {
    return -1;
  }

  let imc = peso / (altura * altura);
  return imc;
}

function classificarIMC(imc) {
  if (imc < 18.5) return "Abaixo do peso";
  if (imc < 25) return "Peso ideal - Parabéns!";
  if (imc < 30) return "Levemente acima do peso";
  if (imc < 35) return "Obesidade grau I";
  if (imc < 40) return "Obesidade grau II (severa)";
  return "Obesidade grau III (mórbida)";
}

function formatarIMC(imc) {
  const imcFormatado = imc.toFixed(1);
  const classificacao = classificarIMC(imc);
  return `Seu IMC é ${imcFormatado}: ${classificacao}`;
}

document.getElementById("botaoIMC").addEventListener("click", () => {
  const imcCalculado = calcularIMC();
  const resultado = document.getElementById("resultadoIMC");

  if (imcCalculado === -1) {
    resultado.textContent = "Dados inválidos.";
  } else {
    resultado.textContent = formatarIMC(imcCalculado);
  }
});

// EXERCÍCIO 3 --------------------------------------------------------
function obterConceito(media) {
	switch (true) {
		case (media >= 9.5 && media <= 10.0):
			return {conceito: 'Excelente', cor: '#006400'};
		case (media >= 8.5 && media < 9.5):
			return {conceito: 'Ótimo', cor: '#006400'};
		case (media >= 7.5 && media < 8.5):
			return {conceito: 'Bom', cor: '#006400'};
		case (media >= 6.0 && media < 7.5):
			return {conceito: 'Regular', cor: '#cc8400'};
		default:
			return {conceito: 'Insuficiente', cor: '#8b0000'};
	}
}

function calcularMedia() {
	let nota1 = parseFloat(document.getElementById('nota1').value);
	let nota2 = parseFloat(document.getElementById('nota2').value);
	let resultadoDiv = document.getElementById('resultadoMedia');

	if (isNaN(nota1) || isNaN(nota2)) {
		resultadoDiv.textContent = 'Erro: Ambas as notas devem ser números válidos.';
		resultadoDiv.style.color = 'grey';
		return;
	}

	if (nota1 < 0 || nota1 > 10 || nota2 < 0 || nota2 > 10) {
		resultadoDiv.textContent = 'Erro: As notas devem estar entre 0 e 10.';
		resultadoDiv.style.color = 'grey';
		return;
	}

	let media = ((nota1 + nota2) / 2).toFixed(2);
	let mediaNum = parseFloat(media);
	let {conceito, cor} = obterConceito(mediaNum);

	resultadoDiv.innerHTML = `Média: <b>${media}</b> - Conceito <b>${conceito}</b>`;
	resultadoDiv.style.color = cor;
}

document.getElementById('botaoMedia').addEventListener('click', calcularMedia);

// EXERCÍCIO 4 --------------------------------------------------------
function obterNomes() {
  let nomes = document.getElementById('nomes').value;
	nomes = nomes
    .split(',')
    .map(nome => nome.trim())
    .filter(nome => nome.length > 0)
    .map(nome => nome.toUpperCase())
    .sort();
	return nomes;
}

function atualizarLista(listaNomes) {
  const lista = document.getElementById('listaNomes');
  lista.innerHTML = '';

  if (listaNomes.length === 0) {
    lista.innerHTML = '<li><em>Digite ao menos um nome válido.</em></li>';
    return;
  }

  listaNomes.forEach(nome => {
    const liNome = document.createElement('li');
    liNome.textContent = nome;
    lista.appendChild(liNome);
  });
}

function processarOrdenacao() {
  const nomes = obterNomes();
  atualizarLista(nomes);
}

document.getElementById('botaoOrdenar').addEventListener('click', processarOrdenacao);

// EXERCÍCIO 5 --------------------------------------------------------
function formatarDigito(digito) {
    if (digito < 10) {
			return`0${digito}`;
		} else {
			return digito;
		}
}

function exibirData() {
    let data = new Date();
		
    const listaSemana = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
    const listaMes = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
    
		let ano = data.getFullYear();
		let mes = listaMes[data.getMonth()];
		let semana = listaSemana[data.getDay()];
		let dia = formatarDigito(data.getDate());
    let horas = data.getHours();
    let minutos = formatarDigito(data.getMinutes());
    let segundos = formatarDigito(data.getSeconds());

    let saudacao;
    if (horas >= 6 && horas < 12) {
        saudacao = "Bom dia";
    } else if (horas >= 12 && horas < 18) {
        saudacao = "Boa tarde";
    } else {
        saudacao = "Boa noite";
    }

    return `${saudacao}! Hoje é ${semana}, ${dia} de ${mes} de ${ano} - ${formatarDigito(horas)}:${minutos}hs.`;
}

document.getElementById('data5').textContent = exibirData();

// EXERCÍCIO 6 --------------------------------------------------------
let numeroAleatorio;
let tentativasRestantes;

function iniciarJogo() {
  numeroAleatorio = Math.floor(Math.random() * 10) + 1;
  tentativasRestantes = 3;
  console.log("(Shhh!) Número gerado:", numeroAleatorio);
  document.getElementById('chuteMensagem').textContent = "";
  document.getElementById('chances').textContent = ' ● '.repeat(tentativasRestantes);
  document.getElementById('chuteInput').value = "";
  document.getElementById('chuteInput').style.backgroundColor = "white";
  document.getElementById('chuteBotao').disabled = false;
  document.getElementById('dnvBotao').style.display = "none";
}

function verificarAdivinhacao() {
  const chuteInput = parseInt(document.getElementById('chuteInput').value);
  const chuteMensagem = document.getElementById('chuteMensagem');
  const chances = document.getElementById('chances');

  if (isNaN(chuteInput) || chuteInput < 1 || chuteInput > 10) {
    chuteMensagem.textContent = "Por favor, digite um número entre 1 e 10.";
    chuteMensagem.style.color = "darkorange";
    return;
  }

  tentativasRestantes--;

  if (chuteInput === numeroAleatorio) {
    chuteMensagem.textContent = `Parabéns! Você acertou em ${3 - tentativasRestantes} tentativa(s)!`;
    chuteMensagem.style.color = "green";
    document.getElementById('chuteInput').style.backgroundColor = "lightgreen";
    document.getElementById('chuteBotao').disabled = true;
    document.getElementById('dnvBotao').style.display = "block";
  } else {
    if (tentativasRestantes > 0) {
      chuteMensagem.textContent = `Errou! ${chuteInput < numeroAleatorio ? 'Mais alto!' : 'Mais baixo!'}`;
      chuteMensagem.style.color = "red";
    } else {
      chuteMensagem.textContent = `Oh não, você perdeu! O número era ${numeroAleatorio}.`;
      chuteMensagem.style.color = "red";
      document.getElementById('chuteBotao').disabled = true;
      document.getElementById('dnvBotao').style.display = "block";
			document.getElementById('chuteInput').style.backgroundColor = "lightred";
    }
  }
  chances.textContent = 'Tentativas:' + ' ● '.repeat(tentativasRestantes);
}

document.getElementById('chuteBotao').addEventListener('click', verificarAdivinhacao);
document.getElementById('dnvBotao').addEventListener('click', iniciarJogo);

iniciarJogo();

// EXERCÍCIO 7 --------------------------------------------------------
const selecao7 = document.getElementById('selecao7');

document.getElementById('botao7').addEventListener('click', () => {
	  if (selecao7.value) {
        window.open(selecao7.value, '_blank');
    } else {
        alert("Escolha um site válido!");
    }
});

// EXERCÍCIO 8 --------------------------------------------------------
// Reutilizei a função formatarDigito do Exercício 5
function atualizarRelogioDigital() { 
    let agora = new Date();
    let horas = formatarDigito(agora.getHours());
    let minutos = formatarDigito(agora.getMinutes());
    let segundos = formatarDigito(agora.getSeconds());

    document.getElementById('RelogioDigital').textContent = `${horas}:${minutos}:${segundos}`;
}

setInterval(atualizarRelogioDigital, 1000);
atualizarRelogioDigital();

// EXERCÍCIO 9 --------------------------------------------------------
const coracao = document.getElementById('coracao');
let aumentando = true;
let tamanho = 100;

function pulsar() {
    if (aumentando) {
        tamanho += 1;
        if (tamanho >= 120) {
            aumentando = false;
        }
    } else {
        tamanho -= 1;
        if (tamanho <= 100) {
            aumentando = true;
        }
    }
    coracao.style.fontSize = `${tamanho}px`;
}

setInterval(pulsar, 50)

// EXERCÍCIO 10 --------------------------------------------------------
const imagens10 = [
    './imagens/assustado.jpg',
    './imagens/gato_maneiro.png',
    './imagens/chillguy.png',
    './imagens/uga.jpg',
		'./imagens/pensando.png'
];

const rollover = document.getElementById('rollover');
let i = 0

function mudarImagem() {
	i++;
	if (i >= 4) { i = 0; }
  rollover.src = imagens10[i];
}

setInterval(mudarImagem, 3000);
