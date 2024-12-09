export default function Signup() {
  const handleSubmit = (event) => {
    event.preventDefault();

    // 양식에 입력된 각기 다른 값들을
    // 쉽게 얻을 수 있도록 도와주는 객체
    const fd = new FormData(event.target);

    // // 내장된 메소드 중 get을 이용하여
    // // 특정 이름에 대한 값을 추출할 수 있음
    // const enteredEmail = fd.get("email")
    // const enteredPassword = fd.get("password")

    // 체크박스의 모든 값들을 불러온다
    const acquisitionChannel = fd.getAll("acquisition")

    // 모든 입력창과 그에 속한 값들의 배열을 제공한다
    const data = Object.fromEntries(fd.entries());
    data.acquisitionChannel = acquisitionChannel
    console.log(data);

    // 제출 후 입력상태 초기화
    event.target.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Welcome on board!</h2>
      <p>We just need a little bit of data from you to get you started 🚀</p>

      <div className="control">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" />
      </div>

      <div className="control-row">
        <div className="control">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" />
        </div>

        <div className="control">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            name="confirm-password"
          />
        </div>
      </div>

      <hr />

      <div className="control-row">
        <div className="control">
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" name="first-name" />
        </div>

        <div className="control">
          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" name="last-name" />
        </div>
      </div>

      <div className="control">
        <label htmlFor="phone">What best describes your role?</label>
        <select id="role" name="role">
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="employee">Employee</option>
          <option value="founder">Founder</option>
          <option value="other">Other</option>
        </select>
      </div>

      <fieldset>
        <legend>How did you find us?</legend>
        <div className="control">
          <input
            type="checkbox"
            id="google"
            name="acquisition"
            value="google"
          />
          <label htmlFor="google">Google</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="friend"
            name="acquisition"
            value="friend"
          />
          <label htmlFor="friend">Referred by friend</label>
        </div>

        <div className="control">
          <input type="checkbox" id="other" name="acquisition" value="other" />
          <label htmlFor="other">Other</label>
        </div>
      </fieldset>

      <div className="control">
        <label htmlFor="terms-and-conditions">
          <input type="checkbox" id="terms-and-conditions" name="terms" />I
          agree to the terms and conditions
        </label>
      </div>

      <p className="form-actions">
        {/* type 종류: button, submit, reset */}
        {/* button: 단순 버튼의 역할 */}
        {/* submit: 제출 */}
        {/* reset: 초기화 */}
        <button type="reset" className="button button-flat">
          Reset
        </button>
        <button type="submit" className="button">
          Sign up
        </button>
      </p>
    </form>
  );
}
