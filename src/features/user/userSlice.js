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
      return {
        ...state,
        userInformation: action.payload,
      }
    },
    getAllOrder: () => {},
    getUserAddresses: (state, action) => {
      return {
        ...state,
        userAddress: action.payload,
      }
    },
    addNewAddressSlice: (state, action) => {
      return {
        ...state,
        userAddress: action.payload,
      }
    },
  },
})

export const { getAUser, getUserAddresses, addNewAddressSlice } =
  userSlice.actions

export default userSlice.reducer
