import AuthForm from '../components/AuthForm';
import { json, redirect } from 'react-router-dom';

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({request}) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";

  if (mode !== "login" && mode !== "signup") {
    throw json({message: "Unsupported mode."}, {status: 422});
  }

  const data = await request.formData();
  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  const response = await fetch(`http://localhost:8080/${mode}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(authData)
  });

  // 유효성 검사에 실패 or 유효하지 않은 토큰에 대한 에러
  if (response.status === 422 || response.status === 401) {
    return response;
  }

  // 응답이 ok가 아닌 경우
  if (!response.ok) {
    throw json({message: "Could not authenticate user."}, {status: 500});
  }

  // 토큰 관리
  // 로그인 성공하면 메인 페이지로 redirect
  return redirect("/")
}