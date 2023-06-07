import React from "react"
import Sidebar from "../components/shop_manage/Sidebar"
import { Outlet } from "react-router-dom"

function ShopLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <Outlet />
    </div>
  )
}

export default ShopLayout
