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
