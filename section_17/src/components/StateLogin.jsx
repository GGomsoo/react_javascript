import { useState } from "react";

export default function Login() {
  const [entered, setEntered] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    // React 에서의 양식 제출 관리 방법
    // 브라우저의 기본 구성이 일어나지 않게 한다
    e.preventDefault();
    console.log(entered)
  };

  const handleChangeInput = (identifier, value) => {
    setEntered(prevValue => ({
      ...prevValue,
      [identifier]: value,
    }))
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" onChange={(e) => handleChangeInput("email", e.target.value)} value={entered.email}/>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" onChange={(e) => handleChangeInput("password", e.target.value)} value={entered.password} />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
};