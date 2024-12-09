import { useRef, useState } from "react";

// Refs(참조)를 이용하는 경우에는 입력에 따른 유효성 검사가 어렵다
// ==> 양식을 제출했을 때에만 검증을 진행하면 된다
export default function Login() {
  const [formInvalid, setFormInvalid] = useState(false);

  const email = useRef();
  const password = useRef();

  const handleSubmit = (e) => {
    // React 에서의 양식 제출 관리 방법
    // 브라우저의 기본 구성이 일어나지 않게 한다
    e.preventDefault();

    const inputEmail = email.current.value;
    const inputPassword = password.current.value;

    // 이메일이 유효한지 검사
    const emailIsInvalid = inputEmail.includes("@");

    // 유효한지 검사
    if (!emailIsInvalid) {
      setFormInvalid(true);
      // return을 넣어줌으로 이 이후의 코드가 실행되지 않도록 조치
      // 유효하지 않은 데이터가 입력됐을 때, 과정이 진행되지 않도록 조치
      return;
    }

    // 유효한 양식이 제출됌
    setFormInvalid(false);

    console.log(inputEmail, inputPassword);
    console.log("Sending HTTP request...");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" ref={email} />
          <div className="control-error">{formInvalid && <p>Please enter a valid email address.</p>}</div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" ref={password} />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
