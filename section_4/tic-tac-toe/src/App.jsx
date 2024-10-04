import { useState } from "react";

import Player from "./components/Player";
import GameBoard from "./components/GameBoard";

const App = () => {
  const [activePlayer, setActivePlayer] = useState("X");

  // 게임 순서
  // 최근 순서가 X 였으면, 이번엔 O
  const handlePlayer = () => {
    setActivePlayer((curPlayer) => curPlayer === "X" ? "O" : "X")
  };

  return (
    <main>
      <div id="game-container">
        {/* 본인 차례인 경우, 이름 주위를 강조하는 CSS 추가 */}
        <ol id="players" className="highlight-player">
          <Player initialName="Player 1" symbol="X" isActive={activePlayer === "X"}/>
          <Player initialName="Player 2" symbol="O" isActive={activePlayer === "O"}/>
        </ol>
        <GameBoard onPlayer={handlePlayer} activePlayerSymbol={activePlayer} />
      </div>
      LOG
    </main>
  );
};

export default App;
