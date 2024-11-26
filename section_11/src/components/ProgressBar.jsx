import { useEffect, useState } from "react";

const ProgressBar = ({ timer }) => {
  const [remainingTime, setRemainingTime] = useState(timer);

  // setInterval을 통해 매 10ms 마다 컴포넌트를 작동시키는데
  // 이 부분을 새로운 컴포넌트로 빼내어 관리 ==> 상태 업데이트 최적화
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

  return (
    <progress value={remainingTime} max={timer}/>
  )
}

export default ProgressBar;