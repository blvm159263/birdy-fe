import { configureStore } from "@reduxjs/toolkit";
import searchReducer from '../features/search/searchSlice'
import uiReducer from '../features/ui/uiSlice'

export const store = configureStore({
    reducer: {
        search: searchReducer,
        ui: uiReducer
    }
})