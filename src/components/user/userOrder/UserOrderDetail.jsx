import React, { useEffect, useState } from "react"
import orderApi from "../../../api/orderApi"
import productApi from "../../../api/productApi"

function UserOrderDetail({ productid, detail }) {
  const [products, setProducts] = useState([])
  const fetchProduct = () => {
    productApi
      .getProductById(productid)
      .then((response) => setProducts(response.data))
  }


  useEffect(() => {
    fetchProduct()
    // console.log(products)
  }, [])

  return (
    <>
      <div className="h-20">
        <img className="h-full" src="/assets/images/product-demo.png" alt="" />
      </div>
      <div>
        <p>{products.id === detail.productId ? products.productName : ""}</p>
        <p className="text-gray-400">
          Category:{" "}
          {products.id === detail.productId ? products.categoryName : ""}{" "}
        </p>
        <p>Quantity: x{detail.quantity}</p>
      </div>
      <div>{detail.price.toFixed(2)}$</div>
    </>
  )
}

export default UserOrderDetail
