import React, { useEffect, useState } from "react"
import orderApi from "../../../api/orderApi"
import productApi from "../../../api/productApi"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {
  getOrderDetail,
  getOrderFeedbacked,
  getOrderTotalPrice,
} from "../../../features/user/userSlice"
import Feedback from "./Feedback"

function UserOrderDetail({ detail, orderid, isDone }) {
  const [product, setProducts] = useState([])

  const [reload, setReload] = useState(false)

  const dispatch = useDispatch()
  // console.log(detail)
  const fetchProduct = async () => {
    await productApi.getProductById(detail.productId).then((response) => {
      // console.log(response.data)
      setProducts(response.data)
      dispatch(
        getOrderDetail({
          id: orderid,
          price: response.data.unitPrice * detail.quantity,
          shopId: response.data.shopId,
        })
      )
      if (response.data.comment !== null && response.data.rating !== null) {
        dispatch(getOrderFeedbacked(response.data))
      }
      // console.log(product)
    })
  }

  useEffect(() => {
    fetchProduct()
  }, [reload])

  return (
    <>
      <Link to={`/detail-item/${detail.productId}`} className="h-fit w-20">
        <img
          className="h-full object-contain"
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
      <div className="text-md flex flex-col items-end w-2/5">
        <div>${(detail.price * detail.quantity)?.toFixed(2)}</div>
        {
          isDone && detail.rating ? (
            <div className="flex items-center">
              {[...Array(5)].map((x, i) => (
                <svg
                  key={i}
                  aria-hidden="true"
                  className={`w-5 h-5 ${
                    i < detail.rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>{i}th star</title>
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              ))}
            </div>
          ) : (
            ""
          )
          // {}
        }
        {isDone && !detail.rating ? <Feedback detail={detail} setReload={setReload} reload={reload}/> : ""}
        {isDone && detail.comment && <div className="">"{detail.comment}"</div>}
      </div>
    </>
  )
}

export default UserOrderDetail
