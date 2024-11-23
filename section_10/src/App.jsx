import { useState } from "react";

import Header from "./components/Header.jsx";
import Shop from "./components/Shop.jsx";
import Product from "./components/Product.jsx";
import { DUMMY_PRODUCTS } from "./dummy-products.js";
import CartContextProvider from "./store/shopping-cart-context.jsx";

function App() {
  return (
    // shopping-cart-context.jsx에 기본값을 설정해 두었더라도
    // Provider에 value 속성과 context 값을 추가해줘야 한다.
    <CartContextProvider>
      <Header />
      <Shop>
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product} />
          </li>
        ))}
      </Shop>
    </CartContextProvider>
  );
}

export default App;
