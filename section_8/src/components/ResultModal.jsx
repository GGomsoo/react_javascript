import { forwardRef, useImperativeHandle, useRef } from "react"; 
// forwardRef: 참조를 컴포넌트 -> 컴포넌트로 전달

import { createPortal } from "react-dom";
// elemets에서 출력의 위치를 바꿔준다.
// 주로 모달에 사용된다.

const ResultModal = forwardRef((props, ref) => {
  const dialog = useRef();

  const userLost = props.remainingTime <= 0;
  const formattedTime = (props.remainingTime / 1000).toFixed(2); // 소수점 2자리 까지만 표시
  const score = Math.round((1 - props.remainingTime / (props.targetTime * 1000)) * 100);

  // TimerChallenge 컴포넌트와 분리되었다.
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      }
    }
  });
  return createPortal(
    // "dialog" tag를 "div" 로 변경해도 작동에 문제가 없어졌다.
    <dialog ref={dialog} className="result-modal" onClose={props.onReset}>
      {userLost && <h2>You lost</h2>}
      {!userLost && <h2>Your score: {score}</h2>}
      <p>
        The Target Time was <strong>{props.targetTime} seconds.</strong>
      </p>
      <p>
        You Stopped the timer with <strong>{formattedTime} seconds left.</strong>
      </p>
      <form method="dialog" onSubmit={props.onReset}>
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});

export default ResultModal;
