import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isProductRequestDetailModalOpen: false,
    isProductReportModalOpen: false,
    selectedProductRequest: null,
    selectedProductReport: null,
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
        },
        openProductReportModal: (state, action) => {
            state.isProductReportModalOpen = true;
            state.selectedProductReport = action.payload;
        },
        closeProductReportModal: (state) => {
            state.isProductReportModalOpen = false;
            state.selectedProductReport = null;
        }
    }
})

export const adminReducer = adminSlice.reducer;

export const {
    openProductRequestDetailModal,
    closeProductRequestDetailModal,
    openProductReportModal,
    closeProductReportModal
} = adminSlice.actions;