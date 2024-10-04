const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const GameBoard = ({onPlayer, turns}) => {
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
                <button onClick={onPlayer}>{playerSymbol}</button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
};

export default GameBoard;
