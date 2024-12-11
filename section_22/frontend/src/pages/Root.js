import { Outlet, useLoaderData, useNavigation, useSubmit } from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';
import { useEffect } from 'react';
import { getTokenDuration } from '../util/auth';

function RootLayout() {
  const token = useLoaderData()
  const submit = useSubmit();
  // const navigation = useNavigation();

  // 토큰 만료됐을 경우 로그아웃 요청하는 useEffect
  useEffect(() => {
    if (!token) {
      return;
    }

    if (token === "EXPIRED") {
      submit(null, {action: "/logout", method: "post"})
      return;
    }

    const tokenDuration = getTokenDuration();
    console.log(tokenDuration)

    // 토큰이 있는 경우, 타이머가 작동
    // 1시간 뒤 자동 로그아웃
    setTimeout(() => {
      submit(null, {action: "/logout", method: "post"})
    }, tokenDuration);
  }, [token, submit]);

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
