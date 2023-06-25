import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.css"

// Components
import Layout from "./layouts/Layout"
import HomePage from "./pages/HomePage"
import NoPage from "./pages/NoPage"
import SearchPage from "./pages/SearchPage"
import LoginPage from "./pages/LoginPage"
import DetailItemPage from "./pages/DetailItemPage"
import AdminLayout from "./layouts/AdminLayout"
import AdminProductManage from "./components/admin/admin_product_manage/AdminProductManage"
import AdminUserManage from "./components/admin/user_manage/AdminUserManage"
import ShopLayout from "./layouts/ShopLayout"
import ShopProfile from "./components/shop_manage/ShopProfile"
import ShopProductManage from "./components/shop_manage/ShopProductManage/ShopProductManage"
import ShopOrderManage from "./components/shop_manage/ShopOrderManage"
import CreateProduct from "./components/shop_manage/CreateProduct"
import CartPage from "./pages/CartPage"
import UserInfor from "./components/user/userInfor/UserInfor"
import UserAddress from "./components/user/userAddress/UserAddress"
import UserPage from "./pages/UserPage"
import UserOrder from "./components/user/userOrder/UserOrder"
import ViewShopPage from "./pages/ViewShopPage"
import AllShopsPage from "./pages/AllShopsPage"
import CheckoutPage from "./pages/CheckoutPage"
import { useEffect, useContext } from "react"
import storageService from "./api/storage"
import jwtDecode from "jwt-decode"
import { LoginContext } from "./context/LoginProvider"
import AllFeaturedPage from "./pages/AllFeaturedPage"
import ShopHomeSubPage from "./components/store/ShopHomeSubPage"
import ShopAllProductsSubPage from "./components/store/ShopAllProductsSubPage"
import ViewShopSubPageType from "./constants/ViewShopSubPageType"
import ShopLatestProductsSubPage from "./components/store/ShopLatestProductsSubPage"
import ShopProductsByCategorySubPage from "./components/store/ShopProductsByCategorySubPage"

import ShopLoginPage from "./pages/ShopLoginPage"

function App() {
  const { isLogin, setIsLogin, setRole } = useContext(LoginContext)

  function convertTimestampToDate(timestamp) {
    return new Date(timestamp * 1000)
  }

  useEffect(() => {
    var token = storageService.getAccessToken()
    if (token) {
      token = jwtDecode(token)
      const currentTime = Math.floor(Date.now() / 1000)
      if (currentTime > token.exp) {
        storageService.removeAccessToken()
        setIsLogin(false)
        setRole("")
      } else {
        setIsLogin(true)
        setRole(token.role)
      }
    }
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="all-featured" element={<AllFeaturedPage />} />
          <Route path="/search">
            <Route path="all-shop" element={<AllShopsPage />} />
            <Route path=":searchType" element={<SearchPage />} />
          </Route>
          <Route path="/detail-item/:id" element={<DetailItemPage />} />
          <Route path="/cart">
            <Route index element={<CartPage />} />
            <Route path="/cart/checkout" element={<CheckoutPage />} />
          </Route>
          <Route path="/user/:userid" element={<UserPage />}>
            <Route index element={<UserInfor />} />
            <Route path="/user/:userid/address" element={<UserAddress />} />
            <Route path="/user/:userid/order" element={<UserOrder />} />
          </Route>
          <Route path="view-shop/:id" element={<ViewShopPage />}>
            <Route index element={<ShopHomeSubPage />} />
            <Route
              path={ViewShopSubPageType.ALL_PRODUCTS.path}
              element={<ShopAllProductsSubPage />}
            />
            <Route
              path={ViewShopSubPageType.LATEST.path}
              element={<ShopLatestProductsSubPage />}
            />
            <Route
              path={ViewShopSubPageType.BIRDS.path}
              element={
                <ShopProductsByCategorySubPage
                  viewShopSubPageType={ViewShopSubPageType.BIRDS}
                />
              }
            />
            <Route
              path={ViewShopSubPageType.ACCESSORIES.path}
              element={
                <ShopProductsByCategorySubPage
                  viewShopSubPageType={ViewShopSubPageType.ACCESSORIES}
                />
              }
            />
            <Route
              path={ViewShopSubPageType.FOODS.path}
              element={
                <ShopProductsByCategorySubPage
                  viewShopSubPageType={ViewShopSubPageType.FOODS}
                />
              }
            />
          </Route>
          <Route path="*" element={<NoPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/shop-login" element={<ShopLoginPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminProductManage />} />
          <Route path="/admin/user-manage-ad" element={<AdminUserManage />} />
          {/* <Route path="/store-manage-ad" element={} /> */}
        </Route>
        <Route path="/shop" element={<ShopLayout />}>
          <Route index element={<ShopProfile />} />
          <Route path="/shop/products" element={<ShopProductManage />} />
          <Route path="/shop/orders" element={<ShopOrderManage />} />
          <Route path="/shop/product/new" element={<CreateProduct />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
