import {FloatButton} from "antd"
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom"
import "./App.css"
import "./style.scss"
// Components
import CreateProduct from "./components/shop_manage/CreateProduct"
import ShopDashboard from "./components/shop_manage/ShopDashboard"
import ShopOrderManage from "./components/shop_manage/ShopOrderManage"
import ShopProductManage from "./components/shop_manage/ShopProductManage/ShopProductManage"
import ShopProfile from "./components/shop_manage/ShopProfile"
import UserAddress from "./components/user/userAddress/UserAddress"
import UserInfor from "./components/user/userInfor/UserInfor"
import UserOrder from "./components/user/userOrder/UserOrder"
import AdminLayout from "./layouts/AdminLayout"
import Layout from "./layouts/Layout"
import ShopLayout from "./layouts/ShopLayout"
import AllShopsPage from "./pages/AllShopsPage"
import CartPage from "./pages/CartPage"
import CheckoutPage from "./pages/CheckoutPage"
import DetailItemPage from "./pages/DetailItemPage"
import HomeChat from "./pages/HomeChat"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import NoPage from "./pages/NoPage"
import SearchPage from "./pages/SearchPage"
import UserPage from "./pages/UserPage"
import ViewShopPage from "./pages/ViewShopPage"
// import ShopDashboard from "./components/shop_manage/ShopDashboard";
import jwtDecode from "jwt-decode"
import {useContext, useEffect} from "react"
import storageService from "./api/storage"
import ShopAllProductsSubPage from "./components/store/ShopAllProductsSubPage"
import ShopHomeSubPage from "./components/store/ShopHomeSubPage"
import ShopLatestProductsSubPage from "./components/store/ShopLatestProductsSubPage"
import ShopProductsByCategorySubPage from "./components/store/ShopProductsByCategorySubPage"
import ViewShopSubPageType from "./constants/ViewShopSubPageType"
import {LoginContext} from "./context/LoginProvider"
import AllFeaturedPage from "./pages/AllFeaturedPage"

import {useDispatch, useSelector} from "react-redux"
import shopApi from "./api/shopApi"
import userApi from "./api/userApi"
import AdminAllShops from "./components/admin/subpages/AdminAllShops"
import AdminDashboard from "./components/admin/subpages/AdminDashboard"
import AdminProductReports from "./components/admin/subpages/AdminProductReports"
import AdminProductRequests from "./components/admin/subpages/AdminProductRequests"
import UserAllOrder from "./components/user/userOrder/UserAllOrder"
import UserCompletedOrder from "./components/user/userOrder/UserCompletedOrder"
import UserDeliveryOrder from "./components/user/userOrder/UserDeliveryOrder"
import UserOrderCancel from "./components/user/userOrder/UserOrderCancel"
import UserPendingOrder from "./components/user/userOrder/UserPendingOrder"
import WishList from "./components/wishList/WishList"
import AdminSubPageType from "./constants/AdminSubPageType"
import {ChatContext} from "./context/ChatContext"
import {getUser} from "./features/user/userSlice"
import ShopLoginPage from "./pages/ShopLoginPage"
import AdminLoginPage from "./components/admin/AdminLoginPage"
import ProtectedRoutes from "./components/admin/utils/ProtectedRoutes"
import ShopDelivery from "./components/shop_manage/ShopDelivery";

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
                {role === "USER"? (<Route path="/wishlist" element={<WishList />} />) : ''}
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
                <Route path="delivery" element={<ShopDelivery />} />
              </Route>
            </>
          )}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/shop-login" element={<ShopLoginPage />} />

          {/* Admin routes */}
          <Route path="/admin" element={<ProtectedRoutes/>}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to={AdminSubPageType.DASHBOARD.path} replace />} />
              <Route
                path={AdminSubPageType.DASHBOARD.path}
                element={<AdminDashboard />}
              />
              <Route
                path={AdminSubPageType.ALL_SHOPS.path}
                element={<AdminAllShops />}
              />
              <Route
                path={AdminSubPageType.PRODUCT_REPORTS.path}
                element={<AdminProductReports />}
              />
              <Route
                path={AdminSubPageType.NEW_PRODUCT_REQUESTS.path}
                element={<AdminProductRequests />}
              />
            </Route>
          </Route>
          <Route
            path={'/admin/login'}
            element={<AdminLoginPage />}
          />
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
