const ResultModal = (props) => {
  return (
    <dialog className="result-modal">
      <h2>You {props.result} </h2>
      <p>The Target Time was <strong>{props.targetTime} seconds.</strong></p>
      <p>You Stopped the timer with <strong>X seconds left.</strong></p>
      <form method="dialog">
        <button>Close</button>
      </form>
    </dialog>
  );
};

export default ResultModal;