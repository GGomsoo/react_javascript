import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "./counter-slice.js";
import authReducer from "./auth-slice.js";

// createStore처럼 store를 생성한다
// 여러 개의 reducer를 하나의 reducer로 합칠 수 있다
// configureStore에 객체를 전달 ( 설정 객체 )
// 리덕스에는 전역 상태를 담당하는 주요 reducer 하나만 있어야한다

// 상태 slice가 여러개라면 reducer map을 형성
// const store = configureStore({
//   reducer: { counter: counterSlice.reducer},
// });

const store = configureStore({
  reducer: { counter: counterReducer, auth: authReducer,}
});

export default store;