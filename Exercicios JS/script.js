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
