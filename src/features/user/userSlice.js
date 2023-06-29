import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  userInformation: null,
  userAddress: null,
  userOrder: null,
  userOrderDetail: [],
  totalPriceList: [],
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUser: (state, action) => {
      state.userInformation = action.payload
    },

    getAllOrder: (state, action) => {
      state.userOrder = action.payload
    },

    getOrderDetail: (state, action) => {
      state.userOrderDetail = [...state.userOrderDetail, action.payload]
    },

    getOrderTotalPrice: (state, action) => {
      // state.totalPriceList = [...state.totalPriceList, action.payload]
      // const existingIndex = state.totalPriceList.findIndex(
      //   (item) => item.id === action.payload.id
      // )
      // if (existingIndex !== -1) {
      //   state.totalPriceList[existingIndex] = action.payload
      // } else {
      //   state.totalPriceList.push(action.payload)
      // }
      const existingIndex = state.totalPriceList.findIndex(
        (item) => item.id === action.payload.id
      )

      if (existingIndex !== -1) {
        state.totalPriceList.splice(existingIndex, 1, action.payload)
      } else {
        state.totalPriceList.push(action.payload)
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
  getUser,
  getUserAddresses,
  addNewAddressSlice,
  getAllOrder,
  getOrderTotalPrice,
  getOrderDetail,
} = userSlice.actions

export default userSlice.reducer
