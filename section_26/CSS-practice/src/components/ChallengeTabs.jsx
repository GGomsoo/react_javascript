import { motion } from 'framer-motion';
import Badge from './Badge.jsx';

function Tab({ isSelected, onSelect, badgeCaption, children }) {
  return (
    <li>
      <button
        className={isSelected ? 'selected' : undefined}
        onClick={onSelect}
      >
        {children}
        {/* badgeCaption은 badge와 연결된 list에 속한 항목의 갯수 */}
        {/* 이 값이 변경될 때마다 애니메이션 효과를 준다 */}
        <Badge key={badgeCaption} caption={badgeCaption}></Badge>
      </button>
      {/* UI에서 함께 움직여야하는 요소가 있다면 layoutId를 사용하여 애니메이션 효과를 준다 */}
      {/* layoutId는 애니메이션 효과를 줄 요소의 고유 식별자이다 */}
      {isSelected && <motion.div layoutId='tab' className="active-tab-indicator" />}
    </li>
  );
}

export default function ChallengeTabs({
  selectedType,
  onSelectType,
  challenges,
  children,
}) {
  return (
    <>
      <menu id="tabs">
        <Tab
          isSelected={selectedType === 'active'}
          onSelect={() => onSelectType('active')}
          badgeCaption={challenges.active.length}
        >
          Active
        </Tab>
        <Tab
          isSelected={selectedType === 'completed'}
          onSelect={() => onSelectType('completed')}
          badgeCaption={challenges.completed.length}
        >
          Completed
        </Tab>
        <Tab
          isSelected={selectedType === 'failed'}
          onSelect={() => onSelectType('failed')}
          badgeCaption={challenges.failed.length}
        >
          Failed
        </Tab>
      </menu>
      <div>{children}</div>
    </>
  );
}
