import { useState } from 'react';

import Counter from './components/Counter/Counter.jsx';
import Header from './components/Header.jsx';
import { log } from './log.js';
import ConfigureCounter from './components/Counter/ConfigureCounter.jsx';

function App() {
  log('<App /> rendered');
  const [chosenCount, setChosenCount] = useState(0);

  const handleSetCount = (newCount) => {
    setChosenCount(newCount);
  };
  
  return (
    <>
      <Header />
      <main>
        <ConfigureCounter onSet={handleSetCount}/>

        {/* set Counter에 숫자를 입력 후 set을 하게 되면 */}
        {/* 문구의 숫자는 변하지만, 증감 버튼 사이의 숫자는 변하지 않는다 */}
        {/* 이를 변하게 하기 위해 Counter 컴포넌트에 key값으로 chosenCount를 전달 */}
        {/* key 값이 바뀔 때 마다 choseCount의 상태도 변한다 */}
        <Counter key={chosenCount} initialCount={chosenCount} />
      </main>
    </>
  );
}

export default App;
