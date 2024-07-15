import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = JSON.parse(localStorage.getItem("airspace__cart")) || [];

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      //find if the item has already been added to the cart
      const findInCart = state.findIndex((el) => el.id === action.payload.id);
      //   if the product is already in the cart
      if (findInCart > -1) {
        //show an error sayin the product already exist in the cart
        toast.error("This house is already in your cart", { id: "123" });
      } else {
        toast.success("This house has been added to your cart.", { id: "123" });
        state.push({ ...action.payload, qty: 1 });
        localStorage.setItem("airspace__cart", JSON.stringify(state));
      }
    },
    // DECREASE IN CART
    changeInCart(state, action) {
      // for each element in the cart, if the element id matches the id we are sending from the payload , change the quantity to the quantity to the one coming  from the payload;
      state.forEach((el) => {
        if (el.id === action.payload.id) el.qty = action.payload.qty;
      });
      localStorage.setItem("airspace__cart", JSON.stringify(state));
    },

    // REMOVE FROM CART
    removeFromCart(state, action) {
      const productIndex = state.findIndex((el) => el.id === action.payload.id);
      state.splice(productIndex, 1);
      localStorage.setItem("airspace__cart", JSON.stringify(state));
    },
  },
});

export const { addToCart, changeInCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
