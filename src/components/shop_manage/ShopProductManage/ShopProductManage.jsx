import React, { useEffect } from "react"
import ShopProductCard from "./ShopProductCard"

import { useState } from "react"

import shopApi from "../../../api/shopApi"
import { useDispatch, useSelector } from "react-redux"
import shopManageApi from "../../../api/shopManageApi"
import { getAllProductForShopManage } from "../../../features/shops/shopSlice"
import Pagination from "../../../features/search/Pagination"
import ShopProductManageForm from "./ShopProductManageForm"

function ShopProductManage() {
  const page = useSelector((state) => state.search.page)
  const [totalPage, setTotalPage] = useState(1)
  const shopProducts = useSelector((state) => state.shop.shopProducts)
  const [isEditing, setIsEditing] = useState(false)
  const dispatch = useDispatch()

  const fetchProductForShop = () => {
    shopManageApi
      .getShopProductsByShopIdForShopManage(1, { page })
      .then((response) => {
        dispatch(getAllProductForShopManage(response.data[0]))
        console.log(response.data)
        setTotalPage(response.data[1])
        console.log(totalPage)
        console.log(page)
      })
  }

  useEffect(() => {
    fetchProductForShop()
  }, [page])

  return (
    <div className="bg-gray-300 h-auto py-10 w-4/5 absolute top-0 right-0">
      <h1 className="text-2xl text-center font-bold mb-10">
        Product Management
      </h1>

      <div className="flex gap-9 flex-wrap justify-evenly">
        {shopProducts &&
          shopProducts.map((product) => {
            return (
              <ShopProductCard
                key={product.id}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                product={product}
              />
            )
          })}

        {shopProducts && shopProducts.length === 0 && (
          <div className="px-8 py-16">
            <img
              className="w-64 h-64 mx-auto"
              src="/assets/images/No_Product_Found.png"
              alt="no product"
            />
          </div>
        )}
      </div>
      <Pagination totalPage={totalPage} />
      {isEditing && (
        <ShopProductManageForm
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  )
}

export default ShopProductManage
