import { configureStore } from "@reduxjs/toolkit";
import searchReducer from '../features/search/searchSlice'
import { cartReducer } from "../features/cart/cartSlice";

export const store = configureStore({
    reducer: {
        search: searchReducer,
        cart: cartReducer
    }
})