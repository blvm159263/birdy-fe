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
      })
      .catch((error) => console.log(error))

    window.scrollTo(0, 0)
  }, [id])

  return (
    <div className="bg-gray-200 py-10">
      <div className="flex flex-col justify-center items-center lg:mx-20 sm: mx-5">
        <ProductOverview product={product} />
        <ShopInfo product={product}/>
        <div className="flex w-full h-100 lg:flex-row sm: flex-col">
          <ProductDetails product={product} />
          <Review product={product} />
        </div>
        <RelatedProduct product={product} />
      </div>
    </div>
  )
}

export default DetailItemPage
