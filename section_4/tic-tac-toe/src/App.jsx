import { useState } from "react";

import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";

import { WINNING_COMBINATIONS } from "./winning-combinations";

const deriveActivePlayer = (gameTurns) => {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  };

  return currentPlayer;
};

const deriveGameBoard = (gameTurns) => {
  // gameBoard는 계산된 값
  // 어떠한 상태에서 파생된 것 (App.jsx의 gameTurns)

  // 게임 재시작하면 배열이 초기화되지 않는다.
  // initialGameBoard를 깊은 복사로 복사한다.
  // 이후 내부 배열을 모두 작성한다.
  // let gameBoard = INITIAL_GAME_BOARD; 수정 전
  let gameBoard = [...INITIAL_GAME_BOARD.map((arr) => [...arr])]; // 수정 후

  // 제어하는 상태의 수는 최소화하면서
  // 가능한 많은 정보와 많은 값을 파생시키는 것
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  };

  return gameBoard;
};

const deriveWinner = (gameBoard, players) => {
  // 우승 조건
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].col];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].col];
    const thridSquareSymbol = gameBoard[combination[2].row][combination[2].col];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thridSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }

  return winner;
};

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
}

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const App = () => {
  const [gameTurns, setGameTurns] = useState([]);

  // 승리했을 경우, 기호가 아닌 플레이어 이름을 보여주기 위한 useState
  const [players, setPlayers] = useState(PLAYERS);

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  // 게임 순서
  // 최근 순서가 X 였으면, 이번엔 O
  const handlePlayer = (rowIdx, colIdx) => {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      // 이전 차례에 기반한 내용
      const updatedTurns = [
        { square: { row: rowIdx, col: colIdx }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  };

  // 게임 재시작 함수
  const handleRestart = () => {
    setGameTurns([]);
  };

  // 심볼에 저장된 내용에 따라 새로운 이름으로 변경
  const handleChangeName = (symbol, newName) => {
    setPlayers((prevPlayer) => {
      return {
        ...prevPlayer,
        [symbol]: newName,
      };
    });
  };

  return (
    <main>
      <div id="game-container">
        {/* 본인 차례인 경우, 이름 주위를 강조하는 CSS 추가 */}
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handleChangeName}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handleChangeName}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard onPlayer={handlePlayer} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
};

export default App;
