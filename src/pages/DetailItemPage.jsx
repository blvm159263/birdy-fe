import React, { useEffect, useState } from "react"
import ProductOverview from "../components/detail-page/ProductOverview/ProductOverview"
import ShopInfo from "../components/detail-page/ShopInfo"
import ProductDetails from "../components/detail-page/ProductDetails"
import Review from "../components/detail-page/Review"
import RelatedProduct from "../components/detail-page/RelatedProduct"
import productApi from "../api/productApi"
import { useParams } from "react-router"

function DetailItemPage() {
  const [product, setProduct] = useState({})
  const { id } = useParams()

  useEffect(() => {
    productApi
      .getProductById(id)
      .then((response) => {
        setProduct(response.data)
        console.log(response.data)
      })
      .catch((error) => console.log(error))

    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="bg-gray-200 py-10">
      <div className=" flex flex-col justify-center items-center mx-20">
        <ProductOverview product={product} />
        <ShopInfo />
        <div className="flex">
          <ProductDetails product={product} />
          <Review />
        </div>
        <RelatedProduct />
      </div>
    </div>
  )
}

export default DetailItemPage
