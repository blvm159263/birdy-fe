import React from "react"
import AdminHeader from "../components/admin/AdminHeader"
import {Outlet} from "react-router-dom"
import AdminSidebar from "../components/admin/AdminSidebar";

function AdminLayout() {
  return (
    <>
      <AdminHeader />
      <div className='grid grid-cols-12 w-full h-screen'>
        <AdminSidebar/>
        <div className='col-span-9 bg-neutral-100'>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default AdminLayout
