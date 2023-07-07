import React from "react"
import Sidebar from "../components/shop_manage/Sidebar"
import { Outlet } from "react-router-dom"
import ShopManageHeader from "../components/shop_manage/ShopManageHeader";

function ShopLayout() {

  return (
    <>
      <ShopManageHeader />
      <div className='grid grid-cols-12'>
        <Sidebar />
        <Outlet />
      </div>
    </>
  )
}

export default ShopLayout
