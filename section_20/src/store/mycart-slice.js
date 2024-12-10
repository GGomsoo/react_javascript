import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
  },
  reducers: {
    // 장바구니에 항목 추가
    addItemToCart(state, action) {
      const newItem = action.payload;
      const exisitingItem = state.items.find(item => item.id === newItem.id)
      state.totalQuantity++;

      if (!exisitingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title
        });
      } else {
        exisitingItem.quantity++;
        exisitingItem.totalPrice = exisitingItem.totalPrice + newItem.price;
      }
    },
    // 장바구니에서 항목 제거
    removeItemToCart(state, action) {
      const id = action.payload;
      const exisitingItem = state.items.find(item => item.id === id)
      state.totalQuantity--;

      // 항목이 1개 이상
      // 배열에서 동일 항목을 완전히 제거
      // id가 동일한 여러개의 항목인 경우, 이를 필터링하여 제거
      if (exisitingItem.quantity === 1) {
        state.items = state.items.filter(item => item.id !== id)
      } else {
        exisitingItem.quantity--;
        exisitingItem.totalPrice = exisitingItem.totalPrice - exisitingItem.price;
      }
    },
  }
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer