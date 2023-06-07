import { createSlice } from "@reduxjs/toolkit"; 

const initialState = {
    searchText: ''
}

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        cleanSearchText: (state) => {
            state.searchText = '';
        },
        updateSearchText: (state, action) => {
            state.searchText = action.payload;
        }
    }
});

export const { cleanSearchText, updateSearchText } = searchSlice.actions;

export default searchSlice.reducer;