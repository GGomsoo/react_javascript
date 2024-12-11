// useSearchParams = 검색 파라미터
import { Form, Link, useSearchParams, useActionData, useNavigation } from 'react-router-dom';

import classes from './AuthForm.module.css';

function AuthForm() {
  const data = useActionData();
  const navigation = useNavigation();

  // 쿼리 매개변수를 찾기 위한 searchParams
  const [searchParams] = useSearchParams();

  // mode에 따라 로그인, 회원가입으로 변환
  // mode가 login인 경우엔 회원가입으로
  // mode가 signup인 경우엔 로그인으로
  const isLogin = searchParams.get("mode") === "login"
  const isSubmitting = navigation.state === "submitting"

  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>{isLogin ? 'Log in' : 'Create a new user'}</h1>
        {data && data.errors &&
          <ul>
            {Object.values(data.errors).map(err =>
              <li key={err}>
                {err}
              </li>)}
          </ul>
        }
        {data && data.message && <p>{data.message}</p>}
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div className={classes.actions}>
          <Link to={`?mode=${isLogin ? "signup" : "login"}`}>
            {isLogin ? 'Create new user' : 'Login'}
          </Link>
          <button disabled={isSubmitting}>{isSubmitting ? "Submitting..." : "Save"}</button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
