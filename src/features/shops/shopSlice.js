import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  shopProducts: null,
  isEditing: false,
  
}

export const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    getAllProductForShopManage: (state, action) => {
      return {
        ...state,
        shopProducts: action.payload,
      }
    },
  },
})

export const { getAllProductForShopManage } = shopSlice.actions

export default shopSlice.reducer
