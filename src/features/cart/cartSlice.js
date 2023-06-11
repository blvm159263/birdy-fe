import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    // {id, quantity, shopId, selected}
    items: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        addToCart: (state, action) => {
            const itemInCart = state.items.find((item) => item.id === action.payload.id);
            if (itemInCart) {
                itemInCart.quantity += action.payload.quantity;
            } else {
                state.items.push({ ...action.payload, quantity: action.payload.quantity, shopId: action.payload.shopId });
            }
        },
        incrementQuantity: (state, action) => {
            const item = state.items.find((item) => item.id === action.payload.id);
            item.quantity += action.payload.quantity;
        },
        decrementQuantity: (state, action) => {
            const item = state.items.find((item) => item.id === action.payload);
            if (item.quantity === 1) {
                return;
            } else {
                item.quantity--;
            }
        },
        removeItem: (state, action) => {
            const nonRemoveItems = state.items.filter((item) => item.id !== action.payload);
            state.items = nonRemoveItems;
        }
    }
});

export const cartReducer = cartSlice.reducer;

export const {addToCart, incrementQuantity, decrementQuantity, removeItem} = cartSlice.actions;  