import React from "react"
import AdminProductCard from "./AdminProductCard"
function AdminProductManage() {
  return (
    <div className="bg-gray-400 pt-10 pb-10 w-full">
      <h1 className="text-2xl text-center font-bold mb-10">
        Product Management
      </h1>
      <div className="flex gap-2 flex-wrap justify-evenly">
        <AdminProductCard />
        <AdminProductCard />
        <AdminProductCard />
        <AdminProductCard />
        <AdminProductCard />
        <AdminProductCard />
        <AdminProductCard />
        <AdminProductCard />
      </div>
    </div>
  )
}

export default AdminProductManage
