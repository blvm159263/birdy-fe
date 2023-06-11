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
import CartPage from "./pages/CartPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/search">
            <Route path=":searchType/:page" element={<SearchPage />} />
          </Route>
          <Route path="/detail-item/:id" element={<DetailItemPage />} />
          <Route path="/cart">
            <Route index element={<CartPage/>}/>
          </Route>
          <Route path="*" element={<NoPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminProductManage />} />
          <Route path="/admin/user-manage-ad" element={<AdminUserManage />} />
          {/* <Route path="/store-manage-ad" element={} /> */}
        </Route>
        <Route path="/shop" element={<ShopLayout />}>
          <Route index element={<ShopProfile />} />
          <Route path="/shop/products" element={<ShopProductManage />} />
          <Route path="/shop/orders" element={<ShopOrderManage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
