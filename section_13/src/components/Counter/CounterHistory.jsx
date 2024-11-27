import { useState } from 'react';

import { log } from '../../log.js';

function HistoryItem({ count }) {
  log('<HistoryItem /> rendered', 3);

  const [selected, setSelected] = useState(false);

  function handleClick() {
    setSelected((prevSelected) => !prevSelected);
  }

  return (
    <li onClick={handleClick} className={selected ? 'selected' : undefined}>
      {count}
    </li>
  );
}

export default function CounterHistory({ history }) {
  log('<CounterHistory /> rendered', 2);

  return (
    <ol>
      {/* 특정 값과 연결된 속성 값을 key 값으로 사용해야 한다. */}
      {/* index를 key로 사용하게 될 경우, 
      증감 버튼을 누를 때 마다 historyItem 배열 전체에 변화를 준다. */}
      {/* count의 id값을 key로 사용할 경우, 배열에 새로운 값만 추가될 뿐
      배열 전체에 변화를 주진 않는다. */}
      {history.map((count) => (
        <HistoryItem key={count.id} count={count.value} />
      ))}
    </ol>
  );
}