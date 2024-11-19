import { forwardRef, useImperativeHandle, useRef } from "react"; 
// forwardRef: 참조를 컴포넌트 -> 컴포넌트로 전달

const ResultModal = forwardRef((props, ref) => {
  const dialog = useRef();

  // TimerChallenge 컴포넌트와 분리되었다.

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      }
    }
  });
  return (
    // "dialog" tag를 "div" 로 변경해도 작동에 문제가 없어졌다.
    <dialog ref={dialog} className="result-modal">
      <h2>You {props.result} </h2>
      <p>
        The Target Time was <strong>{props.targetTime} seconds.</strong>
      </p>
      <p>
        You Stopped the timer with <strong>X seconds left.</strong>
      </p>
      <form method="dialog">
        <button>Close</button>
      </form>
    </dialog>
  );
});

export default ResultModal;
