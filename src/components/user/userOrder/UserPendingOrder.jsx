import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import orderApi from "../../../api/orderApi"
import UserOrderList from "./UserOrderList"
import UserOrderDetail from "./UserOrderDetail"
import { useDispatch, useSelector } from "react-redux"
import { getAllOrder } from "../../../features/user/userSlice"
import paymentApi from "../../../api/paymentApi"

function UserPendingOrder() {
  const { userid } = useParams()
  const userOrder = useSelector((state) => state.user.userOrder)
  // const totalPrice = useSelector((state) => state.user.totalPriceList)
  // const orderDetailProduct = useSelector((state) => state.user.userOrderDetail)

  // // const [userOrder, setUserOrder] = useState()
  // const [total, setTotal] = useState([])

  const dispatch = useDispatch()
  const fetchUserOrder = async (userid) => {
    if (userid) {
      orderApi
        .getAllOrderByUserId(userid)
        .then((response) => {
          dispatch(getAllOrder(response.data))
          // setUserOrder(response.data)
          // console.log(userOrder)
        })
        .catch((e) => console.log(e))
    }
  }

  const handleUpdateState = (id, state) => {
    const confirmed = window.confirm("Are you sure you want to cancel order?")
    if (confirmed) {
      const comment = prompt("Reason?")
      orderApi
        .editOrderState(id, state, comment)
        .then((response) => {
          console.log(response.data)
          fetchUserOrder(userid)
        })
        .catch((e) => console.log(e))
    }
  }

  const handlePayment = async (order) => {
    var amount = (order.total * 23000).toFixed(0);
    await paymentApi.getQRMomo({ amount: amount, orderId: order.code }).then(res => {
      window.location.href = res.data.payUrl;
  })
  }

  // useEffect(() => {
  //   setTotal(totalPrice)
  // }, [totalPrice])
  const pendingOrder =
    userOrder &&
    userOrder.filter(
      (order) => order.state === "PENDING" && order.paymentStatus === "PENDING"
    )

  useEffect(() => {
    fetchUserOrder(userid)
  }, [userid, pendingOrder, userOrder])
  return (
    <div>
      {userOrder &&
        pendingOrder.map((order) => (
          <div key={order.id} className="px-6 mt-6 border-b border-b-gray-600">
            <div className="flex justify-between border-b py-2">
              <div className="flex items-center">
                <h2 className="font-bold text-gray-300 mr-2">#{order.id}</h2>
                <p className="font-bold mr-2">{order.code}</p>
                <button className="mr-2 px-2 py-1 border rounded-md text-white bg-sky-300">
                  Chat
                </button>
                <Link
                  to={`/view-shop/${order.shopId}`}
                  className="px-2 py-1 border rounded-md text-white bg-sky-300"
                >
                  View Shop
                </Link>
              </div>
              <div className="flex">
                <p className="text-orange-400">
                  <span className="text-gray-400">ORDER STATUS:</span>{" "}
                  {order.state} !!!
                </p>
                <div className="mx-2 w-[1px]  h-4/5 bg-gray-200"></div>
                <p className="text-sky-400">
                  <span className="text-gray-400">PAYMENT STATUS:</span>{" "}
                  {order.paymentStatus}
                </p>
              </div>
            </div>
            <UserOrderList key={order.id} orderid={order.id} />
            <div className="flex justify-between py-3 border-b">
              <p className="">
                <span className="font-bold">Delivery to: </span> {order.address}
              </p>
              <p>Total Price: ${order.total.toFixed(2)}</p>
            </div>
            <div className="py-2 flex justify-end">
              <button className="border border-green-500 bg-green-500 text-white px-2 py-1 rounded-md ml-2 hover:bg-white hover:text-green-500 hover:border-green-500"
              onClick={() => handlePayment(order)}
              >
                PAY THE ORDER
              </button>
              <button
                onClick={() => handleUpdateState(order.id, "CANCELED")}
                className="border border-red-500 bg-red-500 text-white px-2 py-1 rounded-md ml-2 hover:bg-white hover:text-red-500 hover:border-red-500"
              >
                Cancel
              </button>
            </div>
          </div>
        ))}
    </div>
  )
}

export default UserPendingOrder
