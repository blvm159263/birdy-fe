import React from "react"
import ShopProductCard from "./ShopProductCard"
import ShopProductManageForm from "./ShopProductManageForm"

function ShopProductManage() {
  return (
    <div className="bg-gray-300 pt-10 pb-10 w-4/5 absolute top-0 right-0">
      <h1 className="text-2xl text-center font-bold mb-10">
        Product Management
      </h1>
      <ShopProductManageForm />
      <div className="flex gap-2 flex-wrap justify-evenly">
        <ShopProductCard />
        <ShopProductCard />
        <ShopProductCard />
        <ShopProductCard />
        <ShopProductCard />
        <ShopProductCard />
        <ShopProductCard />
        <ShopProductCard />
      </div>
    </div>
  )
}

export default ShopProductManage
