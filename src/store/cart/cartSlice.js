import { createSlice } from "@reduxjs/toolkit";

const cart = {
  itemsList: [],
  totalQuantity: 0,
  showCart: false,
  changed: false, //to check if it has been updated from the db
};
const cartSlice = createSlice({
  name: "cart",
  initialState: cart,
  reducers: {
    replaceData: (state, action) => {
      state.totalQuantity = action.payload.itemsList.reduce(
        (ack, item) => ack + item.quantity,
        0
      );
      state.itemsList = action.payload.itemsList;
    },
    addToCart: (state, action) => {
      state.changed = true;
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
    removeFromCart: (state, action) => {
      state.changed = true;
      const id = action.payload;
      const existingItem = state.itemsList.find((item) => item.id === id);
      if (existingItem.quantity === 1) {
        state.itemsList = state.itemsList.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      }
      state.totalQuantity = state.itemsList.reduce(
        (ack, item) => ack + item.quantity,
        0
      );
    },
    setShowCart: (state) => {
      state.showCart = !state.showCart;
    },
  },
});

export const { addToCart, setShowCart, removeFromCart, replaceData } =
  cartSlice.actions;
export default cartSlice.reducer;
