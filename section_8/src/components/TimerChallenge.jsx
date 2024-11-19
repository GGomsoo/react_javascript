import { useState, useRef } from "react";
import ResultModal from "./ResultModal";

const TimerChallenge = (props) => {
  const timer = useRef(); // timer 관련 참조
  const dialog = useRef(); // modal 창 관련 참조

  const [timeRemaining, setTimeRemaining] = useState(props.targetTime * 1000);

  const timerIsActive =
    timeRemaining > 0 && timeRemaining < props.targetTime * 1000;

  // 타이머 만료된 경우
  if (timeRemaining <= 0) {
    clearInterval(timer.current);
    dialog.current.open();
  };

  const handleResetTime = () => {
    setTimeRemaining(props.targetTime * 1000);
  };

  const handleStart = () => {
    timer.current = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10);
    }, 10);
  };

  // 수동으로 타이머 정지시킨 경우
  const handleStop = () => {
    dialog.current.open();
    clearInterval(timer.current);
  };

  return (
    <>
      <ResultModal
        ref={dialog}
        targetTime={props.targetTime}
        remainingTime={timeRemaining}
        onReset={handleResetTime}
      />
      <section className="challenge">
        <h2>{props.title}</h2>
        <p className="challenge-time">
          {props.targetTime} second{props.targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timerIsActive ? "active" : undefined}>
          {timerIsActive ? "Time is running..." : "Timer Inactive"}
        </p>
      </section>
    </>
  );
};

export default TimerChallenge;
