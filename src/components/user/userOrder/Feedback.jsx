import {
  faComment,
  faMessage,
  faStar,
} from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { set } from "date-fns"
import React, { useEffect, useState } from "react"
import orderApi from "../../../api/orderApi"
import { NotificationContext } from "../../../context/NotificationProvider"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"

function Feedback({ detail, reload, setReload }) {

  const openNotificationWithIcon = useContext(NotificationContext)
  const navigate = useNavigate();

  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [isComment, setIsComment] = useState(false)
  const [comment, setComment] = useState("")
  const [orderDetail, setOrderDetail] = useState()

  useEffect(() => {
    setOrderDetail(detail);
  }, [detail])

  const handleSubmitRating = () => {
    orderApi.updateOrderDetail({
      id: orderDetail.id,
      quantity: orderDetail.quantity,
      price: orderDetail.price,
      rating: rating,
      comment: comment,
      productId: orderDetail.productId,
      productName: orderDetail.productName,
      productCategory: orderDetail.productCategory,
      orderId: orderDetail.orderId,
    }).then((response) => {
      openNotificationWithIcon("Success", "Review success!!!")
      navigate("/user/order");
    }).catch((error) => {
      openNotificationWithIcon("Fail", "Review Fail!!!")
    })

  }

  return (
    <div>
      <div>
        <div className="star-rating flex justify-end">
          {[...Array(5)].map((star, index) => {
            index += 1
            return (
              <svg
                aria-hidden="true"
                type="button"
                key={index}
                className={`${index <= (hover || rating)
                  ? "text-yellow-400"
                  : "text-gray-300"
                  }
                    cursor-pointer w-5 h-5`}
                onClick={() => setRating(index)}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(rating)}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>{index}th star</title>
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            )
          })}
        </div>
      </div>
      <div className="flex items-end flex-col">
        <button
          className="text-sm text-blue-400"
          onClick={() => setIsComment(!isComment)}
        >
          <FontAwesomeIcon icon={faComment} /> Comment
        </button>
        {isComment && (
          <div className="flex flex-col">
            <textarea
              className="border mb-1 text-sm"
              placeholder="Write your comment!"
              name=""
              id=""
              cols="35"
              rows="5"
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <button className="text-sm text-blue-500"
              onClick={handleSubmitRating}
            >
              <FontAwesomeIcon icon={faMessage} />
              Submit feedback
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Feedback
