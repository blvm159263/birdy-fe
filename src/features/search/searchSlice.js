import { createSlice } from "@reduxjs/toolkit"; 

const initialState = {
    searchText: '',
    searchTrigger: false,
    isAtSearchPage: false
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
        },
        updateIsAtSearchPage: (state, action) => {
            state.isAtSearchPage = action.payload;
        },
        triggerSearch: (state) => {
            state.searchTrigger = !state.searchTrigger;
        }
    }
});

export const { cleanSearchText, updateSearchText, updateIsAtSearchPage, triggerSearch } = searchSlice.actions;

export default searchSlice.reducer;