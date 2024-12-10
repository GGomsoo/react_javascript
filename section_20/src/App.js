// import { useEffect, useState } from "react";
import { useSelector } from "react-redux"

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';

function App() {
  const showCart = useSelector(state => state.ui.cartIsVisible);
  // const cart = useSelector(state => state.cart);

  // // Redux와 Back-end 통신
  // // 강의에선 firebase와 통신을 예시로 든다
  // // 장바구니가 변경 될 때 마다 useEffect 함수가 실행된다
  // // Back-end 서버가 따로 있다면, API 통신으로 하면 된다
  // useEffect(() => {
  //   const sendCartData = async () => {
  //     const response = await fetch(
  //       "https://firebase.url/cart.json",
  //       {
  //         method: "PUT",
  //         body: JSON.stringify(cart),
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Sending cart data failed")
  //     }

  //     const responseData = await response.json();
  //   }
  // }, [])

  return (
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
