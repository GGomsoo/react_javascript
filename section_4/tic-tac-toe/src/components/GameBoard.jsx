const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const GameBoard = ({onPlayer, turns}) => {
  // gameBoard는 계산된 값
  // 어떠한 상태에서 파생된 것 (App.jsx의 gameTurns)
  let gameBoard = initialGameBoard;

  // 제어하는 상태의 수는 최소화하면서
  // 가능한 많은 정보와 많은 값을 파생시키는 것
  for (const turn of turns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }
  // const [gameBoard, setGameBoard] = useState(initialGameBoard);

  // const handleChangeBoard = (rowIdx, colIdx) => {
  //   setGameBoard((prevBoard) => {
  //     const updateGameBoard = [...prevBoard.map(innerArr => [...innerArr])];
  //     updateGameBoard[rowIdx][colIdx] = activePlayerSymbol;
  //     return updateGameBoard;
  //   });

  //   onPlayer();
  // };

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIdx) => (
        <li key={rowIdx}>
          <ol>
            {row.map((playerSymbol, colIdx) => (
              <li key={colIdx}>
                <button onClick={() => onPlayer(rowIdx, colIdx)}>{playerSymbol}</button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
};

export default GameBoard;
