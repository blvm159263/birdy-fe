import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  userInformation: null,
  userAddress: null,
  userOrder: null,
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getAUser: (state, action) => {
      return { ...state, userInformation: action.payload }
    },
    getAllOrder: () => {},
  },
})

export const { getAUser } = userSlice.actions

export default userSlice.reducer
