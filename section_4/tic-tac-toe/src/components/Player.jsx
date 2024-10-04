import { useState } from "react";

const Player = ({ initialName, symbol, isActive, onChangeName }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(initialName);

  const handleEditClick = () => {
    // 버튼 클릭 시 마다, isEditing의 상태가 변함
    setIsEditing((prevEdit) => !prevEdit);

    if (isEditing) {
      onChangeName(symbol, playerName);
    };
  };

  const handleChangeName = (event) => {
    setPlayerName(event.target.value);
  };
  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        <span className="player-name">
          {isEditing ? (
            <input
              type="text"
              required
              defaultValue={playerName}
              onChange={handleChangeName}
            />
          ) : (
            playerName
          )}
        </span>
        <span className="player-symbol">{symbol}</span>
      </span>
      {/* isEditing의 상태에 따른 다른 문구 출력 */}
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
};

export default Player;
