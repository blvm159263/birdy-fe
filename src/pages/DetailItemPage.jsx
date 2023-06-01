import React from "react"
import ProductOverview from "../components/detail-page/ProductOverview/ProductOverview"
import ShopInfo from "../components/detail-page/ShopInfo"
import ProductDetails from "../components/detail-page/ProductDetails"
import Review from "../components/detail-page/Review"
import RelatedProduct from "../components/detail-page/RelatedProduct"

function DetailItemPage() {
  return (
    <div className="bg-gray-200 py-10">
      <div className=" flex flex-col justify-center items-center mx-20">
        <ProductOverview />
        <ShopInfo />
        <div className="flex">
          <ProductDetails />
          <Review />
        </div>
        <RelatedProduct />
      </div>
    </div>
  )
}

export default DetailItemPage
