import { configureStore } from "@reduxjs/toolkit";
import searchReducer from '../features/search/searchSlice'
import uiReducer from '../features/ui/uiSlice'
import { cartReducer } from "../features/cart/cartSlice";

export const store = configureStore({
    reducer: {
        search: searchReducer,
        ui: uiReducer,
        cart: cartReducer
    }
})