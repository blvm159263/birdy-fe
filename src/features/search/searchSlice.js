import { createSlice } from "@reduxjs/toolkit";
import { MAX_FILTER_PRICE } from '../../constants/Constants'

const initialState = {
    searchText: '',
    searchTrigger: false,
    filterRating: undefined,
    filterFromPrice: undefined,
    filterToPrice: undefined,
    isAtSearchPage: false,
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
        toggleRatingFilter: (state) => {
            if(state.filterRating !== undefined) state.filterRating = undefined;
            else state.filterRating = 5;
        },
        updateRatingFilter: (state, action) => {
            state.filterRating = action.payload;
            console.log("Updated filter rating: " + state.filterRating);
        },
        togglePriceFilter: (state) => {
            if(state.filterFromPrice !== undefined) {
                state.filterFromPrice = undefined;
                state.filterToPrice = undefined;
            } else {
                state.filterFromPrice = 0;
                state.filterToPrice = MAX_FILTER_PRICE;
            }
        },
        updatePriceFilter: (state, action) => {
            state.filterFromPrice = action.payload.fromPrice;
            state.filterToPrice = action.payload.toPrice;
            console.log("Updated filterFromPrice: " + state.filterFromPrice);
            console.log("Updated filterToPrice: " + state.filterToPrice);
        },
        triggerSearch: (state) => {
            state.searchTrigger = !state.searchTrigger;
        }
    }
});

export const { cleanSearchText, updateSearchText, updateIsAtSearchPage, toggleRatingFilter, updateRatingFilter, togglePriceFilter, updatePriceFilter, triggerSearch} = searchSlice.actions;

export default searchSlice.reducer;