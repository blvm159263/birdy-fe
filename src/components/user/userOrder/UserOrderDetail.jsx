import React, { useEffect, useState } from "react"
import orderApi from "../../../api/orderApi"
import productApi from "../../../api/productApi"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import {
  getOrderDetail,
  getOrderTotalPrice,
} from "../../../features/user/userSlice"

function UserOrderDetail({ detail, orderid }) {
  const [product, setProducts] = useState([])
  const dispatch = useDispatch()
  const fetchProduct = async () => {
    await productApi.getProductById(detail.productId).then((response) => {
      setProducts(response.data)
      dispatch(
        getOrderDetail({
          id: orderid,
          price: response.data.unitPrice * detail.quantity,
          shopId: response.data.shopId,
        })
      )
      // console.log(product)
    })
  }

  useEffect(() => {
    fetchProduct()
  }, [])

  return (
    <>
      <Link to={`/detail-item/${detail.productId}`} className="h-20">
        <img
          className="h-full"
          src={product.id === detail.productId ? product.imageMain : ""}
          alt=""
        />
      </Link>
      <div>
        <p>{product.id === detail.productId ? product.productName : ""}</p>
        <p className="text-gray-400">
          Category:{" "}
          {product.id === detail.productId ? product.categoryName : ""}{" "}
        </p>
        <p>Quantity: x{detail.quantity}</p>
      </div>
      <div className="text-md">
        ${(product.unitPrice * detail.quantity).toFixed(3)}
      </div>
    </>
  )
}

export default UserOrderDetail
