import {createSlice} from "@reduxjs/toolkit";
import {MAX_FILTER_PRICE} from '../../constants/Constants'
import SortType from "../../constants/SortType";
import SearchType from "../../constants/SearchType";

const initialState = {
    searchText: '',
    searchType: SearchType.ALL_PRODUCT,
    sortType: SortType.DEFAULT,
    searchTrigger: false,
    rating: undefined,
    fromPrice: undefined,
    toPrice: undefined,
    page: 0
}

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        updateSearchText: (state, action) => {
            state.searchText = action.payload;
        },
        updateSearchType: (state, action) => {
            state.searchType = Object.values(SearchType).find(type => type.text === action.payload);
        },
        updateSortType: (state, action) => {
            state.sortType = action.payload;
        },
        toggleRatingFilter: (state) => {
            if(state.rating !== undefined) state.rating = undefined;
            else state.rating = 5;
        },
        updateRatingFilter: (state, action) => {
            state.rating = action.payload;
            console.log("Updated filter rating: " + state.rating);
        },
        togglePriceFilter: (state) => {
            if(state.fromPrice !== undefined) {
                state.fromPrice = undefined;
                state.toPrice = undefined;
            } else {
                state.fromPrice = 0;
                state.toPrice = MAX_FILTER_PRICE;
            }
        },
        updatePriceFilter: (state, action) => {
            state.fromPrice = action.payload.fromPrice;
            state.toPrice = action.payload.toPrice;
            console.log("Updated filterFromPrice: " + state.toPrice);
            console.log("Updated filterToPrice: " + state.toPrice);
        },
        updatePage: (state, action) => {
            state.page = action.payload;
        },
        triggerSearch: (state) => {
            state.searchTrigger = !state.searchTrigger;
        }
    }
});

export const { updateSearchText,
    updateSearchType,
    updateSortType,
    toggleRatingFilter,
    updateRatingFilter,
    togglePriceFilter,
    updatePriceFilter,
    triggerSearch,
    updatePage } = searchSlice.actions;

export default searchSlice.reducer;