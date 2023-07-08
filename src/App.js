import {
  BrowserRouter,
  Route,
  Routes,
  useNavigate,
  Navigate,
} from "react-router-dom"
import { FloatButton } from "antd"
import "./App.css"
import "./style.scss"
// Components
import Layout from "./layouts/Layout"
import HomePage from "./pages/HomePage"
import NoPage from "./pages/NoPage"
import SearchPage from "./pages/SearchPage"
import LoginPage from "./pages/LoginPage"
import DetailItemPage from "./pages/DetailItemPage"
import AdminLayout from "./layouts/AdminLayout"
import ShopLayout from "./layouts/ShopLayout"
import ShopDashboard from "./components/shop_manage/ShopDashboard"
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
import HomeChat from "./pages/HomeChat"
// import ShopDashboard from "./components/shop_manage/ShopDashboard";
import { useEffect, useContext, useState } from "react"
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
import UserPendingOrder from "./components/user/userOrder/UserPendingOrder"
import UserDeliveryOrder from "./components/user/userOrder/UserDeliveryOrder"
import UserCompletedOrder from "./components/user/userOrder/UserCompletedOrder"
import UserOrderCancel from "./components/user/userOrder/UserOrderCancel"
import UserAllOrder from "./components/user/userOrder/UserAllOrder"
import AdminDashboard from "./components/admin/subpages/AdminDashboard"
import AdminSubPageType from "./constants/AdminSubPageType"
import AdminAllShops from "./components/admin/subpages/AdminAllShops"
import AdminNewShopRequests from "./components/admin/subpages/AdminNewShopRequests"
import AdminProductRequests from "./components/admin/subpages/AdminProductRequests"
import { ChatContext } from "./context/ChatContext"
import shopApi from "./api/shopApi"
import { useDispatch, useSelector } from "react-redux"
import userApi from "./api/userApi"
import { getUser } from "./features/user/userSlice"
import WishList from "./components/wishList/WishList"

function App() {
  const { isLogin, setIsLogin, setRole, role, setShopId } =
    useContext(LoginContext)
  const userInformation = useSelector((state) => state.user.userInformation)
  const dispatch = useDispatch()
  const { setIsChatOpen, isChatOpen } = useContext(ChatContext)
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
        if (token.role === "SHOP") {
          shopApi
            .getShopInformationByPhoneNumber(token.sub)
            .then((res) => {
              console.log(res.data)
              setShopId(res.data.id)
            })
            .catch((err) => {
              console.log(err)
            })
        } else {
          userApi
            .getUserByPhoneNumber(token.sub)
            .then((res) => {
              dispatch(getUser(res.data))
            })
            .catch((err) => {
              console.log(err)
            })
        }
      }
    }
  }, [])

  const showChat = () => {
    setIsChatOpen(true)
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          {role !== "SHOP" && (
            <>
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="all-featured" element={<AllFeaturedPage />} />
                <Route path="/search">
                  <Route path="all-shop" element={<AllShopsPage />} />
                  <Route path=":searchType" element={<SearchPage />} />
                </Route>
                <Route path="/detail-item/:id" element={<DetailItemPage />} />
                <Route path="/wishlist" element={<WishList />} />
                <Route path="/cart">
                  <Route index element={<CartPage />} />
                  <Route path="/cart/checkout" element={<CheckoutPage />} />
                </Route>
                <Route path="/user" element={<UserPage />}>
                  <Route index element={<UserInfor />} />
                  <Route path="/user/address" element={<UserAddress />} />
                  <Route path="/user/order" element={<UserOrder />}>
                    <Route index element={<UserAllOrder />} />
                    <Route
                      path="/user/order/pending"
                      element={<UserPendingOrder />}
                    />
                    <Route
                      path="/user/order/delivery"
                      element={<UserDeliveryOrder />}
                    />
                    <Route
                      path="/user/order/completed"
                      element={<UserCompletedOrder />}
                    />
                    <Route
                      path="/user/order/canceled"
                      element={<UserOrderCancel />}
                    />
                  </Route>
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
            </>
          )}
          {role === "SHOP" && (
            <>
              <Route path="/" element={<ShopLayout />}>
                <Route path="/" element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<ShopDashboard />} />
                <Route path="profile" element={<ShopProfile />} />
                <Route path="orders" element={<ShopOrderManage />} />
                <Route path="products" element={<ShopProductManage />} />
                <Route path="product/new" element={<CreateProduct />} />
              </Route>
            </>
          )}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/shop-login" element={<ShopLoginPage />} />

          {/* Admin routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="*" element={<Navigate to={AdminSubPageType.DASHBOARD.path} replace />} />
            <Route
              path={AdminSubPageType.DASHBOARD.path}
              element={<AdminDashboard />}
            />
            <Route
              path={AdminSubPageType.ALL_SHOPS.path}
              element={<AdminAllShops />}
            />
            <Route
              path={AdminSubPageType.NEW_SHOP_REQUESTS.path}
              element={<AdminNewShopRequests />}
            />
            <Route
              path={AdminSubPageType.NEW_PRODUCT_REQUESTS.path}
              element={<AdminProductRequests />}
            />
          </Route>
        </Routes>
      </BrowserRouter>

      {isLogin && (
        <>
          {isChatOpen ? (
            <HomeChat setIsChatOpen={setIsChatOpen} />
          ) : (
            <FloatButton
              shape="circle"
              badge={{
                dot: true,
              }}
              style={{
                right: 24,
              }}
              onClick={showChat}
            />
          )}
        </>
      )}
    </>
  )
}

export default App
