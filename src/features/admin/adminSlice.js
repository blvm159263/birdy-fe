import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isProductRequestDetailModalOpen: false,
    selectedProductRequest: null
}

const adminSlice = createSlice({
    name: 'admin',
    initialState: initialState,
    reducers: {
        openProductRequestDetailModal: (state, action) => {
            state.isProductRequestDetailModalOpen = true;
            state.selectedProductRequest = action.payload;
        },
        closeProductRequestDetailModal: (state) => {
            state.isProductRequestDetailModalOpen = false;
            state.selectedProductRequest = null;
        }
    }
})

export const adminReducer = adminSlice.reducer;

export const {
    openProductRequestDetailModal,
    closeProductRequestDetailModal
} = adminSlice.actions;