import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  editId: undefined,
}

export const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setEditId: (state, action) => {
      state.editId = action.payload;
    }
  },
})

export const { setEditId } = shopSlice.actions

export default shopSlice.reducer
