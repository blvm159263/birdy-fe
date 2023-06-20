import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  shopProducts: null,
}

export const uiSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    getAllProduct: (state, action) => {
      return {
        ...state,
        shopProducts: action.payload,
      }
    },
  },
})

export const { getAllProduct } = uiSlice.actions

export default uiSlice.reducer
