import { useState, useRef } from "react";

export default function Player() {
  const playerName = useRef();
  const [enteredPlayerName, setEnteredPlayerName] = useState(null);
  // const [submitted, setSubmitted] = useState(false);

  // const handleChange = (event) => {
  //   setSubmitted(false)
  //   setEnteredPlayerName(event.target.value);
  // };

  const handleClick = () => {
    setEnteredPlayerName(playerName.current.value);
    playerName.current.value = "" // 이름 설정 후, 입력창 초기화
  };

  return (
    <section id="player">
      <h2>Welcome {enteredPlayerName ?? "unknown entity"}</h2>
      <p>
        <input ref={playerName} type="text" />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
