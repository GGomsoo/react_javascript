// 세가지 A를 이용하여 test를 준비
// Arrange (준비)
// Act (실행), 
// Assert (단언) - 아웃풋 검토

import Greeting from "./Greeting";
import { render, screen } from "@testing-library/react"

test("test Hello World!", () => {
  // 준비
  render(<Greeting />);

  // 실행

  // 단언
  // 원하는 문구를 찾고 있다면 성공, 없다면 실패
  // exact를 false로 설정하면, 문구를 감싸는 것은 상관없고 하위 문자열과도 매치
  // const helloworldElement = screen.getByText("hello world", {exact: false}); <- 먹히지 않는다
  const helloworldElement = screen.getByText(/hello world/i);
  expect(helloworldElement).toBeInTheDocument();
});