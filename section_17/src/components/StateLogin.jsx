import { useState } from "react";
import Input from "./Input";

export default function Login() {
  const [entered, setEntered] = useState({
    email: "",
    password: "",
  });

  // 입력창 focus 해제 여부 관리하는 상태
  const [didEdit, seteDidEdit] = useState({
    email: false,
    password: false,
  });

  // 이메일에 @가 포함되어 있는지에 따라 true, false
  // 없으면 true
  const emailIsInvalid = didEdit.email && !entered.email.includes("@");
  const passwordInvalid = didEdit.password && entered.password.trim().length < 6;

  const handleSubmit = (e) => {
    // React 에서의 양식 제출 관리 방법
    // 브라우저의 기본 구성이 일어나지 않게 한다
    e.preventDefault();
    console.log(entered);

    // 상태를 통해 입력값을 관리할 때, 초기화 하는 방법
    setEntered({
      email: "",
      password: "",
    });
  };

  const handleChangeInput = (identifier, value) => {
    setEntered((prevValue) => ({
      ...prevValue,
      [identifier]: value,
    }));

    // 입력중엔 focus 되어있다
    seteDidEdit((prevEdit) => ({
      ...prevEdit,
      [identifier]: false,
    }));
  };

  // focus를 잃은 경우
  const handleInputBlur = (identifier) => {
    seteDidEdit((prevEdit) => ({
      ...prevEdit,
      [identifier]: true,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <Input
          label="Email"
          id="email"
          type="email"
          name="email"
          onBlur={() => handleInputBlur("email")}
          onChange={(e) => handleChangeInput("email", e.target.value)}
          value={entered.email}
          error={emailIsInvalid && "Please enter a valid email"}
        />

        <Input
          label="Password"
          id="password"
          type="password"
          name="password"
          onBlur={() => handleInputBlur("password")}
          onChange={(e) => handleChangeInput("password", e.target.value)}
          value={entered.password}
          error={passwordInvalid && "Please enter a valid password"}
        />
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
