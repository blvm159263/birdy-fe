import React from "react"
import AdminHeader from "../components/admin/AdminHeader"
import { Outlet } from "react-router-dom"
import AdminProductManage from "../components/admin/admin_product_manage/AdminProductManage"

function AdminLayout() {
  return (
    <>
      <AdminHeader />
      <Outlet />
      {/* <AdminProductManage /> */}
    </>
  )
}

export default AdminLayout
