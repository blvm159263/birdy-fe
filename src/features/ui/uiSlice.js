import { createSlice } from "@reduxjs/toolkit"
import ViewShopSubPageType from "../../constants/ViewShopSubPageType";

const initialState = {
    isShowFilterSideBar: false,
    currentViewShopSubPage: ViewShopSubPageType.HOME,
    isShowCartDeleteAllSelectedModal: false,
    isShowCartDeleteModal: false,
}

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleFilterSideBar: (state) => {
            state.isShowFilterSideBar = !state.isShowFilterSideBar;
        },
        setCurrentViewShopSubPage: (state, action) => {
            state.currentViewShopSubPage = action.payload;
        },
        setShowCartDeleteAllSelectedModal: (state, action) => {
            state.isShowCartDeleteAllSelectedModal = action.payload;
        },
        setShowCartDeleteModal: (state, action) => {
            state.isShowCartDeleteModal = action.payload;
        }
    }
});

export const {toggleFilterSideBar,
    setCurrentViewShopSubPage,
    setShowCartDeleteAllSelectedModal,
    setShowCartDeleteModal} = uiSlice.actions;

export default uiSlice.reducer;