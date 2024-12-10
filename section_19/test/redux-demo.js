// Redux import
const redux = require("redux");

// Reducer 함수 생성
// Redux 라이브러리에 의해 호출
// 기존의 상태, 발송된 액션을 파라미터로 받는다
// 새로운 상태 객체를 return 해야한다

// 처음 실행할 때, 보조 기본값이 있어야 한다
const counterReducer = (state = {counter: 0}, action) => {
  return {
    counter: state.counter + 1
  }
};


// 저장소 생성
// createStore는 현재 사용하지 않는다고 한다.
// 하지만, 강의 진행 상 createStore를 현재 사용한다.
const store = redux.createStore(counterReducer);


// 구독 시작
// 상태가 변경 될 때 마다 getState를 통해
// 최신 상태를 받을 수 있다
const counterSubscriber = () => {
  const latestState = store.getState();
  console.log(latestState)
}


// Redux는 데이터와 저장소가 변경 될 때 마다
// 구독 함수를 실행
// 실행 하지않고, 가리키기만 한다 => 우리가 아닌 Redux가 실행하기 때문
store.subscribe(counterSubscriber);


// dispatch = action을 발송하는 method
store.dispatch({ type: "increment" })