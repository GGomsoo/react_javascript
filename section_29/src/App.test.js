import { render, screen } from '@testing-library/react';
import App from './App';

// 테스팅 코드를 포함한 파일
// (테스트에 대한 설명, 함수) 를 인자로 갖는다
// 실제 테스트와 코드를 포함하고 있다
test('renders learn react link', () => {
  render(<App />);

  // 요소를 식별할 때, 그 안에서 렌더링되는 텍스트로 식별
  // 대소문자 구별이 없다
  // 요소가 실제로 문서에 있는지 확인한다
  // 못 찾으면 실패, 찾으면 성공
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
