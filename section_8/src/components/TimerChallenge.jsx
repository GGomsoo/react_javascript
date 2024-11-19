import { useState, useRef } from "react";
import ResultModal from "./ResultModal";

const TimerChallenge = (props) => {
  const timer = useRef(); // timer 관련 참조
  const dialog = useRef(); // modal 창 관련 참조

  const [timerStarted, setTimerStarted] = useState(false); // 타이머 시작여부
  const [timerExpired, setTimerExpired] = useState(false); // 타이머 만료

  const handleStart = () => {
    timer.current = setTimeout(() => {
      setTimerExpired(true);
      dialog.current.showModal();
    }, props.targetTime * 1000);

    setTimerStarted(true);
  };

  const handleStop = () => {
    clearTimeout(timer.current);
  };

  return (
    <>
    <ResultModal ref={dialog} targetTime={props.targetTime} result="lost"/>
      <section className="challenge">
        <h2>{props.title}</h2>
        {timerExpired && <p>You lost!</p>}
        <p className="challenge-time">
          {props.targetTime} second{props.targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerStarted ? handleStop : handleStart}>
            {timerStarted ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timerStarted ? "active" : undefined}>
          {timerStarted ? "Time is running..." : "Timer Inactive"}
        </p>
      </section>
    </>
  );
};

export default TimerChallenge;
