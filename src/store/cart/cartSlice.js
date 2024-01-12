import { createSlice } from "@reduxjs/toolkit";
const cart = {
  itemsList: [],
  totalQuantity: 0,
  showCart: false,
};
const cartSlice = createSlice({
  name: "cart",
  initialState: cart,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      //   to check for existing
      const existingItem = state.itemsList.find(
        (item) => item.id === newItem.id
      );
      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
        // state.totalQuantity++;
      } else {
        state.itemsList.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.name,
        });
        // state.totalQuantity++;
      }
      state.totalQuantity = state.itemsList.reduce(
        (ack, item) => ack + item.quantity,
        0
      );
          
    },
    removeFromCart: () => {},
    setShowCart: (state) => {
      state.showCart = true;
    },
  },
});
export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
