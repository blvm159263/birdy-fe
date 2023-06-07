import React from "react"
import ShopProductCard from "./ShopProductCard"
import ShopProductManageForm from "./ShopProductManageForm"
import { useState } from "react"
import BirdAddForm from "./BirdAddForm"
import AccessoryAddForm from "./AccessoryAddForm"
import FoodsAddForm from "./FoodsAddForm"

function ShopProductManage() {
  const [isAdding, setIsAdding] = useState(false)
  const [isChoosen, setIsChoosen] = useState("")
  return (
    <div className="bg-gray-300 pt-10 pb-10 w-4/5 absolute top-0 right-0">
      <h1 className="text-2xl text-center font-bold mb-10">
        Product Management
      </h1>
      <div className="m-12">
        <button
          className="p-3 bg-red-300 rounded-md"
          onClick={() => setIsAdding(!isAdding)}
        >
          Add new Product
        </button>
        {isAdding && (
          <div className="flex justify-center">
            <button
              className="p-3 m-3 bg-red-300 rounded-md "
              onClick={() => setIsChoosen("1")}
            >
              Bird
            </button>
            <button
              className="p-3 m-3 bg-red-300 rounded-md"
              onClick={() => setIsChoosen("2")}
            >
              Accessory
            </button>
            <button
              className="p-3 m-3 bg-red-300 rounded-md"
              onClick={() => setIsChoosen("3")}
            >
              Food
            </button>
          </div>
        )}
      </div>
      {isChoosen === "1" && (
        <BirdAddForm isChoosen={isChoosen} setIsChoosen={setIsChoosen} />
      )}
      {isChoosen === "2" && (
        <AccessoryAddForm isChoosen={isChoosen} setIsChoosen={setIsChoosen} />
      )}
      {isChoosen === "3" && (
        <FoodsAddForm isChoosen={isChoosen} setIsChoosen={setIsChoosen} />
      )}
      {/* <ShopProductManageFosrm /> */}
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
