import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./Feedback.css"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import orderApi from "../../../api/orderApi"
import productApi from "../../../api/productApi"

function Feedback({ setIsPopupOpen, order }) {
  const [hoverd, setHovered] = useState() // used for when hoved on star
  const [rated, setRated] = useState(1)
  const [comment, setComment] = useState("")
  const [orderDetail, setOrderDetail] = useState()
  const orderDetailProduct = useSelector((state) => state.user.userOrderDetail)

  const handleCommentChange = (event) => {
    setComment(event.target.value)
  }

  // const handleSetRated = (value) => {
  //   setRated(value)
  // }
  // const handleSetHovered = (value) => {
  //   setHovered(value)
  // }

  const handleSubmit = (event) => {
    event.preventDefault()
    // Reset the form
    // setRating(0)
    setComment("")
    setIsPopupOpen(false)
  }

  const fetchOrderDetail = async (orderid) => {
    await orderApi.getOrderDetailByOrderId(orderid).then((response) => {
      setOrderDetail({ id: orderid, data: response.data })
    })
  }

  const fetchProductOfOrder = async (productid) => {
    await productApi
      .getProductById(productid)
      .then((response) => console.log(response.data))
  }

  // useEffect(() => {
  //   if (orderDetail && orderDetail.data && orderDetail.data.id)
  //     fetchOrderDetail(order.id)
  // }, [order, orderDetailProduct])

  // useEffect(() => {
  //   if (orderDetail && orderDetail.data && orderDetail.data.id) {
  //     fetchProductOfOrder(orderDetail.data.id)
  //   }
  // }, [orderDetail])

  return (
    <div className="fixed z-50 lg:w-full sm: w-full p-4  md:inset-0 h-[calc(100%-1rem)] max-h-full flex justify-center items-center inset-0 bg-gray-100 bg-opacity-5">
      <form className="w-4/5 bg-white p-2">
        <div className="border-b-2 py-4">
          <h1 className=" text-center font-bold text-2xl ">Feedback</h1>
          <p className="font-bold px-4">Order: {order.code}</p>
        </div>

        <div className="h-auto py-3 px-2 justify-between flex border-b border-b-black">
          <div className="w-40">
            <img
              src="assets/images/product-demo.png"
              alt=""
              className="w-full h-full"
            />
          </div>
          <div className="flex flex-col items-center">
            <h1 className="text-md font-semibold">Rating</h1>
            <div className="flex star-container">
              {[...Array(5)].map((star, i) => (
                <span
                  key={i + 1}
                  onMouseOver={() => {
                    setHovered(i)
                  }}
                  onMouseOut={() => {
                    setHovered(rated)
                  }}
                  onClick={() => {
                    setRated(i + 1)
                  }}
                  className={i <= hoverd ? "hovered" : ""}
                >
                  ★
                </span>
              ))}
              rate: {rated}
            </div>
          </div>
          <div>
            <div className="flex-col">
              <label className="block text-md font-semibold" htmlFor="comment">
                Comment
              </label>
              <textarea
                name="comment"
                id="comment"
                className="border-2"
                cols="50"
                rows="5"
              ></textarea>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            className="mt-2 right-0 border border-white rounded-md bg-sky-400 text-white px-5 py-1 hover:bg-white hover:text-sky-400 hover:border-sky-400 mr-2"
            onClick={handleSubmit}
          >
            Send
          </button>
          <button
            className="mt-2 right-0 border border-white rounded-md bg-red-400 text-white px-5 py-1 hover:bg-white hover:text-red-400 hover:border-red-400"
            onClick={() => setIsPopupOpen(false)}
          >
            Close
          </button>
        </div>
      </form>
    </div>
  )
}

export default Feedback
