

const GameBoard = ({ onPlayer, board }) => {
  
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
      {board.map((row, rowIdx) => (
        <li key={rowIdx}>
          <ol>
            {row.map((playerSymbol, colIdx) => (
              <li key={colIdx}>
                {/* 한 번 선택한 버튼은 비활성화 */}
                <button
                  onClick={() => onPlayer(rowIdx, colIdx)}
                  disabled={playerSymbol !== null}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
};

export default GameBoard;
