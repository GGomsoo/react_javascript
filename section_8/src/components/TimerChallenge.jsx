import { useState, useRef } from "react";
import ResultModal from "./ResultModal";

const TimerChallenge = (props) => {
  const timer = useRef();
  const [timerStarted, setTimerStarted] = useState(false); // 타이머 시작여부
  const [timerExpired, setTimerExpired] = useState(false); // 타이머 만료

  const handleStart = () => {
    timer.current = setTimeout(() => {
      setTimerExpired(true);
    }, props.targetTime * 1000);

    setTimerStarted(true);
  };

  const handleStop = () => {
    clearTimeout(timer.current);
  };

  return (
    <>
    {timerExpired && <ResultModal targetTime={props.targetTime} result="lost"/>}
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
