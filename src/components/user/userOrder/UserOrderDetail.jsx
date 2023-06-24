import React, { useEffect } from "react"
import orderApi from "../../../api/orderApi"

function UserOrderDetail() {
  const fetchOrderDetail = () => {
    orderApi
      .getOrderDetailByOrderId(1)
      .then((response) => console.log(response.data))
  }
  useEffect(() => {
    fetchOrderDetail()
  }, [])
  return <div>UserOrderDetail</div>
}

export default UserOrderDetail
