// useStore: 저장소에 직접 액세스 할 수 있다.
// useSelector: 저장소가 관리하는 상태 부분을 우리가 자동으로 선택할 수 있다 <- 조금 더 편리
import { useSelector, useDispatch } from "react-redux";
import classes from './Counter.module.css';
// import { useState } from "react";
import { counterActions } from "../store/index.js"

const Counter = () => {

  // Redux store에 대한 action을 보내는 dispatch
  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(counterActions.increment())
  };

  const handleIncrease = () => {
    // redux-toolkit에서는 action을 자동으로 생성
    // { type: 어떤 값, payload: 인자로서 사용하려는 값}
    dispatch(counterActions.increase(5))
  };

  const handleDecrement = () => {
    dispatch(counterActions.decrement())
  };

  const toggleCounterHandler = () => {
    dispatch(counterActions.toggleCounter())
  };

  // useSelector를 통해
  // 해당 컴포넌트에 필요한 상태를 자동으로 구독
  const counter = useSelector(state => state.counter);
  const show = useSelector(state => state.showCounter);
  
  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {show && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={handleIncrement}>+</button>
        <button onClick={handleIncrease}>+5</button>
        <button onClick={handleDecrement}>-</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
