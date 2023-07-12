import { configureStore } from "@reduxjs/toolkit"
import searchReducer from "../features/search/searchSlice"
import uiReducer from "../features/ui/uiSlice"
import { cartReducer } from "../features/cart/cartSlice"
import storage from "redux-persist/lib/storage"
import userReducer from "../features/user/userSlice"
import shopReducer from "../features/shops/shopSlice"

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist"
import { adminReducer } from "../features/admin/adminSlice"

const persistConfig = {
  key: "root",
  storage,
}

const persistedReducer = persistReducer(persistConfig, cartReducer)
const persistedAdminReducer = persistReducer(persistConfig, adminReducer)

export const store = configureStore({
  reducer: {
    search: searchReducer,
    ui: uiReducer,
    cart: persistedReducer,
    user: userReducer,
    shop: shopReducer,
    admin: persistedAdminReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)
