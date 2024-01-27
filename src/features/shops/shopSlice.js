import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import productApi from "../../api/productApi";
import productImagesApi from "../../api/productImagesApi";

const initialState = {
  editId: undefined,
  productFormValues: {
    id:	undefined,
    productName: '',
    imageMain: undefined,
    unitPrice: 1,
    salePtc: undefined,
    quantity: 1,
    rating: undefined,
    createDate: undefined,
    species: '',
    age: undefined,
    gender: undefined,
    color: '',
    expDate: undefined,
    madeIn: undefined,
    weight: '',
    size: undefined,
    material: undefined,
    description: '',
    brandName: undefined,
    state: undefined,
    categoryId: undefined,
    categoryName: undefined,
    shopId: undefined,
    shopName: undefined,
    isWarned: undefined,
    isDisabled: undefined,
    isBanned: undefined,
    totalRating: undefined
  },
  subImages: undefined,
  updated: false,
}

// Async Thunk
export const fetchProductFormValues = createAsyncThunk(
  'shop/fetchProductFormValues',
  async (id) => {
    const response = await productApi.getProductById(id);
    console.log("Edit product data:")
    console.log(response.data)
    return response.data;
  }
)

export const fetchProductSubImages = createAsyncThunk(
  'shop/fetchProductSubImages',
  async (id) => {
    const response = await productImagesApi.getProductImagesByProductId(id);
    console.log("fetchProductSubImages response.data:");
    console.log(response.data);
    return response.data;
  }
)

export const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setUpdated: (state, action) => {
      state.updated = action.payload;
    },
    setEditId: (state, action) => {
      state.editId = action.payload;
    },
    updateProductFormValues: (state, action) => {
      state.productFormValues = {
        ...state.productFormValues,
        ...action.payload
      }
    },
    resetAllState: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductFormValues.fulfilled, (state, action) => {
        state.productFormValues = {
          ...state.productFormValues,
          ...action.payload
        }
      })
      .addCase(fetchProductSubImages.fulfilled, (state, action) => {
        state.subImages = action.payload;
      })
  },
})

export const { setUpdated, setEditId,
  updateProductFormValues,
  resetAllState} = shopSlice.actions

export default shopSlice.reducer
