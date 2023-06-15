import { createSlice } from "@reduxjs/toolkit"
import { useContext } from "react";

const initialState = {
    // {id: 1, quantity: 9, shopId: 1, selected: true, price: 44}
    items: [],
    totalProduct: 0,
    totalPrice: 0
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
                state.items.push({ ...action.payload, quantity: action.payload.quantity, shopId: action.payload.shopId, selected: false, price: action.payload.price });
            }
            state.totalProduct = state.items.filter(item => item.selected === true).reduce((total, {quantity}) => total + quantity, 0);
            state.totalPrice = state.items.filter(item => item.selected === true).reduce((total, {quantity, price}) => total + quantity * price, 0);

        },
        incrementQuantity: (state, action) => {
            const item = state.items.find((item) => item.id === action.payload.id);
            item.quantity += action.payload.quantity;
            state.totalProduct = state.items.filter(item => item.selected === true).reduce((total, {quantity}) => total + quantity, 0);
            state.totalPrice = state.items.filter(item => item.selected === true).reduce((total, {quantity, price}) => total + quantity * price, 0);
        },
        decrementQuantity: (state, action) => {
            const item = state.items.find((item) => item.id === action.payload);
            if (item.quantity === 1) {
                return;
            } else {
                item.quantity--;
            }
            state.totalProduct = state.items.filter(item => item.selected === true).reduce((total, {quantity}) => total + quantity, 0);
            state.totalPrice = state.items.filter(item => item.selected === true).reduce((total, {quantity, price}) => total + quantity * price, 0);
        },
        removeItem: (state, action) => {
            const nonRemoveItems = state.items.filter((item) => item.id !== action.payload);
            state.items = nonRemoveItems;
            state.totalProduct = state.items.filter(item => item.selected === true).reduce((total, {quantity}) => total + quantity, 0);
            state.totalPrice = state.items.filter(item => item.selected === true).reduce((total, {quantity, price}) => total + quantity * price, 0);
        },
        toggleSelectItem: (state, action) => {
            const item = state.items.find((item) => item.id === action.payload.id);
            item.selected = !item.selected;
            state.totalProduct = state.items.filter(item => item.selected === true).reduce((total, {quantity}) => total + quantity, 0);
            state.totalPrice = state.items.filter(item => item.selected === true).reduce((total, {quantity, price}) => total + quantity * price, 0);
        },
        selectAllItemsInShop: (state, action) => {
            state.items.map((item) => {
                if(item.shopId === action.payload.shopId) item.selected = true;
                return item;
            });
            state.totalProduct = state.items.filter(item => item.selected === true).reduce((total, {quantity}) => total + quantity, 0);
            state.totalPrice = state.items.filter(item => item.selected === true).reduce((total, {quantity, price}) => total + quantity * price, 0);
        },
        selectAllItems: (state, action) => {
            state.items.map((item) => {
                item.selected = true;
                return item;
            });
            state.totalProduct = state.items.filter(item => item.selected === true).reduce((total, {quantity}) => total + quantity, 0);
            state.totalPrice = state.items.filter(item => item.selected === true).reduce((total, {quantity, price}) => total + quantity * price, 0);
        },
        deSelectAllItemsInShop: (state, action) => {
            state.items.map((item) => {
                if(item.shopId === action.payload.shopId) item.selected = false;
                return item;
            });
            state.totalProduct = state.items.filter(item => item.selected === true).reduce((total, {quantity}) => total + quantity, 0);
            state.totalPrice = state.items.filter(item => item.selected === true).reduce((total, {quantity, price}) => total + quantity * price, 0);
        },
        deSelectAllItems: (state, action) => {
            state.items.map((item) => {
                item.selected = false;
                return item;
            });
            state.totalProduct = state.items.filter(item => item.selected === true).reduce((total, {quantity}) => total + quantity, 0);
            state.totalPrice = state.items.filter(item => item.selected === true).reduce((total, {quantity, price}) => total + quantity * price, 0);
        },
        deleteAllSelected: (state, action) => {
            const nonRemoveItems = state.items.filter((item) => item.selected === false);
            state.items = nonRemoveItems;
            state.totalProduct = state.items.filter(item => item.selected === true).reduce((total, {quantity}) => total + quantity, 0);
            state.totalPrice = state.items.filter(item => item.selected === true).reduce((total, {quantity, price}) => total + quantity * price, 0);
        },
    }
});

export const cartReducer = cartSlice.reducer;

export const {addToCart, incrementQuantity, decrementQuantity, removeItem, toggleSelectItem, selectAllItemsInShop, selectAllItems, deSelectAllItemsInShop, deSelectAllItems, deleteAllSelected} = cartSlice.actions;  