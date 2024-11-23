import { useContext } from "react"
import { CartContext } from "../store/shopping-cart-context.jsx";

export default function Cart() {
  // 연결된 context 값이 변경되었을 때
  // 리액트가 컴포넌트 함수를 재실행 하는 이유는
  // 새로운 UI를 만들어낼 수 있게 하기 위해서
  const { items, updateItemQuantity } = useContext(CartContext);

  // 장바구니에 담긴 물품들의 총 가격
  // 값을 하나로 줄이는 자체가 아래 reduce의 역할(기능)
  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

  return (
    <div id="cart">
      {items.length === 0 && <p>No items in cart!</p>}
      {items.length > 0 && (
        <ul id="cart-items">
          {items.map((item) => {
            const formattedPrice = `$${item.price.toFixed(2)}`;

            return (
              <li key={item.id}>
                <div>
                  <span>{item.name}</span>
                  <span> ({formattedPrice})</span>
                </div>
                <div className="cart-item-actions">
                  <button onClick={() => updateItemQuantity(item.id, -1)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateItemQuantity(item.id, 1)}>
                    +
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <p id="cart-total-price">
        Cart Total: <strong>{formattedTotalPrice}</strong>
      </p>
    </div>
  );
}
