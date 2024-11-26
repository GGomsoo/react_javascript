import { useEffect, useState } from "react";

const TIMER = 3000;

export default function DeleteConfirmation({ onConfirm, onCancel }) {
  const [remainingTime, setRemainingTime] = useState(TIMER);

  useEffect(() => {
    const interval = console.log("INTERVAL CHECK")
    setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 10);
    }, 10);

    return () => {
      console.log("END INTERVAL")
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    // 3초 후에 자동으로 modal창이 닫기면서 yes 처리된다.
    console.log("SET TIMER");
    const timer = setTimeout(() => {
      onConfirm();
    }, TIMER);

    return () => {
      console.log("CLEAN UP TIMER");
      clearTimeout(timer);
    };
    // 종속성으로 함수를 추가하는 경우에는
    // 무한 루프를 발생시킬 가능성이 있다.
  }, [onConfirm]);

  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
      <progress value={remainingTime} max={TIMER} />
    </div>
  );
}
