import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  userInformation: null,
  userAddress: null,
  userOrder: null,
  userOrderDetail: [],
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
    getAllOrder: (state, action) => {
      return {
        ...state,
        userOrder: action.payload,
      }
    },
    getOrderDetail: (state, action) => {
      const newDetailList = [...state.userOrderDetail, action.payload]
      return {
        ...state,
        userOrderDetail: newDetailList,
      }
    },

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

export const {
  getAUser,
  getUserAddresses,
  addNewAddressSlice,
  getAllOrder,
  getOrderDetail,
} = userSlice.actions

export default userSlice.reducer
