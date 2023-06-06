import { createSlice } from "@reduxjs/toolkit"; 

const initialState = {
    searchText: '',
    searchTrigger: false,
    isAtHomePage: false
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
        updateIsAtHomePage: (state, action) => {
            state.isAtHomePage = action.payload;
        },
        triggerSearch: (state) => {
            state.searchTrigger = !state.searchTrigger;
        }
    }
});

export const { cleanSearchText, updateSearchText, updateIsAtHomePage, triggerSearch } = searchSlice.actions;

export default searchSlice.reducer;