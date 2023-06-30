import {createSlice} from "@reduxjs/toolkit"
import ViewShopSubPageType from "../../constants/ViewShopSubPageType";

const initialState = {
    isShowFilterSideBar: false,
    currentViewShopSubPage: ViewShopSubPageType.HOME,
    isShowCartDeleteAllSelectedModal: false,
    isShowCartDeleteModal: false,
    isShowShopProductEditModal: false,
    currentAdminSubPage: undefined
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
        },
        setCurrentAdminSubPage: (state, action) => {
            state.currentAdminSubPage = action.payload;
        },
        setShowShopProductEditModal: (state, action) => {
            state.isShowShopProductEditModal = action.payload;
        }
    }
});

export const {toggleFilterSideBar,
    setCurrentViewShopSubPage,
    setShowCartDeleteAllSelectedModal,
    setShowCartDeleteModal,
    setCurrentAdminSubPage,
    setShowShopProductEditModal} = uiSlice.actions;

export default uiSlice.reducer;