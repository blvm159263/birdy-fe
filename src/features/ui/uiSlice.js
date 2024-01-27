import {createSlice} from "@reduxjs/toolkit"
import ViewShopSubPageType from "../../constants/ViewShopSubPageType";

const initialState = {
    isShowFilterSideBar: false,
    currentViewShopSubPage: ViewShopSubPageType.HOME,
    isShowCartDeleteAllSelectedModal: false,
    isShowCartDeleteModal: false,
    isShowShopProductEditModal: false,
    currentAdminSubPage: undefined,
    isUpdateOptionModalOpen: false,
    isDeleteOptionModalOpen: false
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
        },
        setUpdateOptionModalOpen: (state, action) => {
            state.isUpdateOptionModalOpen = action.payload;
        },
        setDeleteOptionModalOpen: (state, action) => {
            state.isDeleteOptionModalOpen = action.payload;
        }
    }
});

export const {toggleFilterSideBar,
    setCurrentViewShopSubPage,
    setShowCartDeleteAllSelectedModal,
    setShowCartDeleteModal,
    setCurrentAdminSubPage,
    setShowShopProductEditModal,
    setUpdateOptionModalOpen,
    setDeleteOptionModalOpen} = uiSlice.actions;

export default uiSlice.reducer;