// useStore: 저장소에 직접 액세스 할 수 있다.
// useSelector: 저장소가 관리하는 상태 부분을 우리가 자동으로 선택할 수 있다 <- 조금 더 편리
import { useSelector, useDispatch } from "react-redux";
import classes from './Counter.module.css';

const Counter = () => {
  // Redux store에 대한 action을 보내는 dispatch
  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch({type: "increment"})
  };

  const handleIncrease = () => {
    dispatch({type: "increase", amount: 5})
  };

  const handleDecrement = () => {
    dispatch({type: "decrement"})
  };

  // useSelector를 통해
  // 해당 컴포넌트에 필요한 상태를 자동으로 구독
  const counter = useSelector(state => state.counter);
  const toggleCounterHandler = () => {};

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>{counter}</div>
      <div>
        <button onClick={handleIncrement}>+</button>
        <button onClick={handleIncrease}>+5</button>
        <button onClick={handleDecrement}>-</button>
        <button onClick={handleDecrement}>-5</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
