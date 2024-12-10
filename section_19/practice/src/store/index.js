import { createStore } from "redux";
import { createSlice } from "@reduxjs/toolkit";

const initialState = { counter: 0, showCounter: true }

// 객체를 인자로 생성한다
// 전역 상태의 slice를 미리 생성한다
// 모든 slice는 이름이 있어야한다.
// 초기 상태를 설정 해야한다.
createSlice({
  name: "counter",
  initialState: initialState,
  reducers: {
    // action이 필요가 없다
    // 어떤 액션을 했느냐에 따라 method가 자동으로 호출
    // 더이상 if문을 작성할 필요는 없다
    // 단 서로 다른 reducer를 구별, 각각의 reducer에 해당하는 action을 발생

    // 기존 state를 변경하는 것 처럼 보이지만
    // createSlice와 redux-toolkit을 사용하면 기존 상태를 바꿀 수 없다
    // redux-toolkit는 내부적으로 immer 이라는 패키지를 사용하는데
    // 자동으로 원래 상태를 복제, 새로운 상태 객체를 생성
    increment(state) {
      state.counter ++;
    },
    decrement(state) {
      state.counter --;
    },
    increase(state, action) {
      state.counter = state.counter + action.amount;
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    },
  }
});

const counterReducer = (state = initialState, action) => {
  if (action.type === "increment") {
    return {
      counter: state.counter + 1,
      showCounter: state.showCounter,
    };
  }

  if (action.type === "increase") {
    return {
      counter: state.counter + action.amount,
      showCounter: state.showCounter,
    };
  }

  if (action.type === "decrement") {
    return {
      counter: state.counter - 1,
      showCounter: state.showCounter,
    };
  }

  if (action.type === "toggle") {
    return {
      counter: state.counter,
      showCounter: !state.showCounter,
    }
  }

  return state;
};

const store = createStore(counterReducer);

export default store;