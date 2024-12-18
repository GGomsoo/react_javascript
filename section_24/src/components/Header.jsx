import { useIsFetching } from "@tanstack/react-query";

export default function Header({ children }) {
  const isFetching = useIsFetching();

  return (
    <>
      {/* 데이터를 가져 올 때 진행바를 통해 사용자에게 알림 */}
      <div id="main-header-loading">
        {isFetching > 0 && <progress />}
      </div>
      <header id="main-header">
        <div id="header-title">
          <h1>React Events</h1>
        </div>
        <nav>{children}</nav>
      </header>
    </>
  );
}
