import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import orderApi from "../../../api/orderApi"
import { useDispatch, useSelector } from "react-redux"
import {
  getAllOrder,
  getOrderDetail,
  getOrderTotalPrice,
} from "../../../features/user/userSlice"
import UserOrderDetail from "./UserOrderDetail"

function UserOrderList({ orderid }) {
  const dispatch = useDispatch()
  const [product, setProduct] = useState([])
  const [orderDetail, setOrderDetail] = useState([])
  const orderDetailProduct = useSelector((state) => state.user.userOrderDetail)

  const [totalPrice, setTotalPrice] = useState(0)
  const fetchOrderDetail = async () => {
    await orderApi.getOrderDetailByOrderId(orderid).then((response) => {
      // const order = {
      //   id: orderid,
      //   data: response.data,
      // }
      setOrderDetail(response.data)

      // dispatch(getOrderDetail(order))
      // console.log(orderDetail)
    })
  }

  // console.log(totalPrice(product, orderid))
  useEffect(() => {
    fetchOrderDetail()

    // onGetTotal(totalPrice)
    // console.log(totalPrice)
    // console.log(orderDetail)

    // console.log(total)
  }, [])

  useEffect(() => {
    let total = 0
    orderDetailProduct.forEach((item) => {
      if (item.id === orderid) {
        total += item.price
      }
    })
    dispatch(getOrderTotalPrice({ id: orderid, price: total }))
    // setTotalPrice(total)
    // console.log(total)
  }, [orderDetailProduct, orderid])

  return (
    <div>
      {orderDetail &&
        orderDetail.map((detail) => (
          <div key={detail.id} className="flex justify-between py-2 border-b">
            <UserOrderDetail orderid={orderid} detail={detail} />
          </div>
        ))}
    </div>
  )
}
// function UserOrderList({ orderid }) {
//   const dispatch = useDispatch()
//   const orderDetail = useSelector((state) => state.user.userOrderDetail)

//   const fetchOrderDetail = async () => {
//     await orderApi.getOrderDetailByOrderId(orderid).then((response) => {
//       const order = {
//         id: orderid,
//         data: response.data,
//       }
//       dispatch(getOrderDetail(order))
//     })
//   }

//   useEffect(() => {
//     fetchOrderDetail()
//   }, [])

//   return (
//     <div>
//       {orderDetail &&
//       orderDetail.detail &&
//       Array.isArray(orderDetail.detail) &&
//       orderDetail.id === orderid
//         ? orderDetail.detail.map((detail) => (
//             <div key={detail.id} className="flex justify-between py-2 border-b">
//               <UserOrderDetail orderid={orderid} detail={detail} />
//             </div>
//           ))
//         : ""}
//     </div>
//   )
// }

export default UserOrderList
