import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    // {id: 1, quantity: 9, shopId: 1, selected: true, price: 44}
    items: [],
    deleteId: undefined
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
        },
        incrementQuantity: (state, action) => {
            const item = state.items.find((item) => item.id === action.payload.id);
            item.quantity += action.payload.quantity;
        },
        decrementQuantity: (state, action) => {
            const item = state.items.find((item) => item.id === action.payload);
            if (item.quantity > 1) {
                item.quantity--;
            }
        },
        removeItem: (state, action) => {
            const nonRemoveItems = state.items.filter((item) => item.id !== action.payload);
            state.items = nonRemoveItems;
        },
        toggleSelectItem: (state, action) => {
            const item = state.items.find((item) => item.id === action.payload.id);
            item.selected = !item.selected;
        },
        selectAllItemsInShop: (state, action) => {
            state.items.map((item) => {
                if(item.shopId === action.payload.shopId) item.selected = true;
                return item;
            });
        },
        selectAllItems: (state, action) => {
            state.items.map((item) => {
                item.selected = true;
                return item;
            });
        },
        deSelectAllItemsInShop: (state, action) => {
            state.items.map((item) => {
                if(item.shopId === action.payload.shopId) item.selected = false;
                return item;
            });
        },
        deSelectAllItems: (state, action) => {
            state.items.map((item) => {
                item.selected = false;
                return item;
            });
        },
        deleteAllSelected: (state, action) => {
            const nonRemoveItems = state.items.filter((item) => item.selected === false);
            state.items = nonRemoveItems;
        },
        setDeleteId: (state, action) => {
            state.deleteId = action.payload;
        }
    }
});

export const cartReducer = cartSlice.reducer;

export const {addToCart, incrementQuantity, decrementQuantity, removeItem, toggleSelectItem, selectAllItemsInShop, selectAllItems, deSelectAllItemsInShop, deSelectAllItems, deleteAllSelected,
    setDeleteId} = cartSlice.actions;