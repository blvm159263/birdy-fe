import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import orderApi from "../../../api/orderApi"
import { useDispatch, useSelector } from "react-redux"
import { getAllOrder, getOrderDetail } from "../../../features/user/userSlice"
import UserOrderDetail from "./UserOrderDetail"

function UserOrderList({ orderid, onGetTotal }) {
  const dispatch = useDispatch()
  const [orderDetail, setOrderDetail] = useState([])
  // const orderDetail = useSelector((state) => state.user.userOrderDetail)

  const fetchOrderDetail = async () => {
    await orderid
    // console.log(orderid)s
    orderApi
      .getOrderDetailByOrderId(orderid)
      .then((response) => setOrderDetail(response.data))
  }
  const totalPrice = orderDetail
    .reduce((sum, item) => sum + item.price, 0)
    .toFixed(2)

  useEffect(() => {
    fetchOrderDetail()
    onGetTotal(totalPrice)
    console.log(totalPrice)
    // console.log(orderDetail)
    // console.log(total)
  }, [])

  return (
    <div>
      {orderDetail &&
        orderDetail.map((detail) => (
          <div key={detail.id} className="flex justify-between py-2 border-b">
            <UserOrderDetail productid={detail.productId} detail={detail} />
          </div>
        ))}
    </div>
  )
}

export default UserOrderList
