import { forwardRef } from "react"; // 참조를 컴포넌트 -> 컴포넌트로 전달

const ResultModal = forwardRef((props, ref) => {
  return (
    <dialog ref={ref} className="result-modal">
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
