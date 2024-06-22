let jogo = {
  iniciarNovoJogo() {
    jogo = {
      ...jogo,
      turno: 0,
      jogadorAtual: "X",
      campo: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      jogoFinalizado: false,
    };
  },

  imprimir() {
    console.log(`
        ${jogo.campo[6]} | ${jogo.campo[7]} | ${jogo.campo[8]}
      ------------
        ${jogo.campo[3]} | ${jogo.campo[4]} | ${jogo.campo[5]}
      ------------
        ${jogo.campo[0]} | ${jogo.campo[1]} | ${jogo.campo[2]}
        `);
  },

  trocarJogador() {
    jogo.jogadorAtual = jogo.jogadorAtual === "X" ? "O" : "X";
  },

  fazerJogada(posicao) {
    if (
      posicao > 0 &&
      posicao < 10 &&
      typeof jogo.campo[posicao - 1] === "number"
    ) {
      jogo.campo[posicao - 1] = jogo.jogadorAtual;
      jogo.turno++;
      return true;
    }
    return false;
  },

  comparar: (a, b, c) =>
    jogo.campo[a] === jogo.campo[b] && jogo.campo[a] === jogo.campo[c],

  verificarGanhador() {
    return (
      jogo.comparar(0, 1, 2) || //linha
      jogo.comparar(3, 4, 5) || //linha
      jogo.comparar(6, 7, 8) || //linha
      
      jogo.comparar(0, 3, 6) || //coluna
      jogo.comparar(1, 4, 7) || //coluna
      jogo.comparar(2, 5, 8) || //coluna
      jogo.comparar(0, 4, 8) ||
      
      jogo.comparar(2, 4, 6) //diagonal
    );
  },

  verficarFimDeJogo() {
    const temGanhador = jogo.verificarGanhador();
    if (temGanhador) {
      console.clear();
      jogo.imprimir();
      jogo.trocarJogador();
      console.log(`${jogo.jogadorAtual} ganhou!!`);
      return true;
    } else if (jogo.turno >= 9) {
      console.clear();
      jogo.imprimir();
      console.log("EMPATE!");
      return true;
    }
    return false;
  },
};

function iniciar() {
  jogo.iniciarNovoJogo();
  while (!jogo.jogoFinalizado) {
    console.clear();
    jogo.imprimir();
    console.log(`O jogador atual é: ${jogo.jogadorAtual}`);
    const posicao = parseInt(prompt("Escolha a posisção: "));
    if (!posicao) {
      break;
    }
    if (jogo.fazerJogada(posicao)) {
      jogo.trocarJogador();
    }
    jogo.jogoFinalizado = jogo.verficarFimDeJogo();
  }
}

iniciar();
