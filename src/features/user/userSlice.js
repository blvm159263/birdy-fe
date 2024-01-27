import { createSlice } from "@reduxjs/toolkit"
import orderApi from "../../api/orderApi"

const initialState = {
  userInformation: null,
  userAddress: null,
  userOrder: null,
  wishlist: null,
  userOrderDetail: [],
  totalPriceList: [],
  orderFeedbacked: [],
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
    getOrderFeedbacked: (state, action) => {
      state.orderFeedbacked = [...state.orderFeedbacked, action.payload]
    },
    addNewAddressSlice: (state, action) => {
      return {
        ...state,
        userAddress: action.payload,
      }
    },

    getWishlist: (state, action) => {
      return {
        ...state,
        wishlist: action.payload,
      }
    },

    deleteItemWishList: (state, action) => {
      const updatedWishlist = state.wishlist.filter(
        (item) => item.productId !== action.payload
      )
      return {
        ...state,
        wishlist: updatedWishlist,
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
  getOrderFeedbacked,
  getWishlist,
  deleteItemWishList,
} = userSlice.actions

export default userSlice.reducer
