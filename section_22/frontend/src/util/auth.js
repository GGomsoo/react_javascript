import { redirect } from "react-router-dom";

// 토큰 유효기간 관리 함수
export function getTokenDuration() {
  const storedExpiration = localStorage.getItem("expiration");
  const expirationDate = new Date(storedExpiration);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();
  return duration
}

export function getAuthToken() {
  const token = localStorage.getItem("token")
  
  // 토큰이 없으면 아무것도 return 하지 않는다
  if (!token) {
    return null;
  }

  const tokenDuration = getTokenDuration()

  if (tokenDuration < 0) {
    return "EXPIRED";
  }

  return token;
}

export function tokenLoader() {
  return getAuthToken();
}

export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect("/auth")
  }
}