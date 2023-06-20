import React, { useEffect } from "react"
import ShopProductCard from "./ShopProductCard"

import { useState } from "react"

import shopApi from "../../../api/shopApi"
import { useSelector } from "react-redux"

function ShopProductManage() {
  const page = useSelector((state) => state.search.page)
  const [products, setProducts] = useState([])

  useEffect(() => {
    shopApi
      .getShopProductsByShopIdForShop(1, page)
      .then((res) => {
        setProducts(res.data[0])
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <div className="bg-gray-300 h-auto py-10 w-4/5 absolute top-0 right-0">
      <h1 className="text-2xl text-center font-bold mb-10">
        Product Management
      </h1>

      <div className="flex gap-9 flex-wrap justify-evenly">
        {products.map((product) => {
          return <ShopProductCard key={product.id} product={product} />
        })}

        {products.length === 0 && (
          <div className="px-8 py-16">
            <img
              className="w-64 h-64 mx-auto"
              src="/assets/images/No_Product_Found.png"
              alt="no product"
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default ShopProductManage
