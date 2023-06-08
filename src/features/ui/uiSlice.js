import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isShowFilterSideBar: false
}

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleFilterSideBar: (state) => {
            state.isShowFilterSideBar = !state.isShowFilterSideBar;
        }
    }
});

export const {toggleFilterSideBar} = uiSlice.actions;

export default uiSlice.reducer;