import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    // {id, quantity, shopId}
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
                state.items.push({ ...action.payload, quantity: 1, shopId: action.payload.shopId });
            }
            console.log('Add item ' + action.payload.id + ' to cart!');
            console.log(state.items);
        },
        incrementQuantity: (state, action) => {
            const item = state.items.find((item) => item.id === action.payload);
            item.quantity++;
            console.log('incrementQuantity for item id ' + action.payload);
            console.log(state.items);
        },
        decrementQuantity: (state, action) => {
            const item = state.items.find((item) => item.id === action.payload);
            if (item.quantity === 1) {
                return;
            } else {
                item.quantity--;
            }
            console.log('decrementQuantity for item id ' + action.payload);
            console.log(state.items);
        },
        removeItem: (state, action) => {
            const nonRemoveItems = state.items.filter((item) => item.id !== action.payload);
            state.items = nonRemoveItems;
            console.log('removeItem id' + action.payload);
            console.log(state.items);
        }
    }
});

export const cartReducer = cartSlice.reducer;

export const {addToCart, incrementQuantity, decrementQuantity, removeItem} = cartSlice.actions;  