import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import productApi from "../../api/productApi";

const initialState = {
  editId: undefined,
  productFormValues: {
    id:	undefined,
    productName: '',
    imageMain: undefined,
    unitPrice: undefined,
    salePtc: undefined,
    quantity: undefined,
    rating: undefined,
    createDate: undefined,
    species: '',
    age: undefined,
    gender: undefined,
    color: undefined,
    expDate: undefined,
    madeIn: undefined,
    weight: undefined,
    size: undefined,
    material: undefined,
    description: '',
    brandName: undefined,
    state: undefined,
    categoryId: undefined,
    categoryName: undefined,
    shopId: undefined,
    shopName: undefined,
    subImages: [],
  },
}

// Async Thunk
export const fetchProductFormValues = createAsyncThunk(
  'shop/fetchProductFormValues',
  async (id) => {
    const response = await productApi.getProductById(id);
    console.log(response.data);
    return response.data;
  }
)

export const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setEditId: (state, action) => {
      state.editId = action.payload;
    },
    updateProductFormValues: (state, action) => {
      state.productFormValues = {
        ...state.productFormValues,
        ...action.payload
      }
    },
    setSubImages: (state, action) => {
      state.productFormValues.subImages = action.payload;
    },
    resetAllState: (state, action) => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductFormValues.fulfilled, (state, action) => {
      state.productFormValues = {
        ...state.productFormValues,
        ...action.payload
      }
    })
  }
})

export const { setEditId ,
  updateProductFormValues,
  setSubImages,
  resetAllState} = shopSlice.actions

export default shopSlice.reducer
