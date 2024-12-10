import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = { counter: 0, showCounter: true }

// 객체를 인자로 생성한다
// 전역 상태의 slice를 미리 생성한다
// 모든 slice는 이름이 있어야한다.
// 초기 상태를 설정 해야한다.
const counterSlice = createSlice({
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
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    },
    increase(state, action) {
      // redux-toolkit 으로 변경 후
      // action.amount -> action.payload로 변경
      state.counter = state.counter + action.payload;
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    },
  }
});

// createStore처럼 store를 생성한다
// 여러 개의 reducer를 하나의 reducer로 합칠 수 있다
// configureStore에 객체를 전달 ( 설정 객체 )
// 리덕스에는 전역 상태를 담당하는 주요 reducer 하나만 있어야한다

// 상태 slice가 여러개라면 reducer map을 형성
// const store = configureStore({
//   reducer: { counter: counterSlice.reducer},
// });

const store = configureStore({
  reducer: counterSlice.reducer,
});

export const counterActions = counterSlice.actions;
export default store;