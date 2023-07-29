import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import orderApi from "../../../api/orderApi"
import UserOrderList from "./UserOrderList"
import UserOrderDetail from "./UserOrderDetail"
import { useDispatch, useSelector } from "react-redux"
import { getAllOrder, getUser } from "../../../features/user/userSlice"
import userApi from "../../../api/userApi"

function UserDeliveryOrder() {
  const { userid } = useParams()
  const userOrder = useSelector((state) => state.user.userOrder)
  const userInformation = useSelector((state) => state.user.userInformation)
  // const totalPrice = useSelector((state) => state.user.totalPriceList)
  // const orderDetailProduct = useSelector((state) => state.user.userOrderDetail)

  // // const [userOrder, setUserOrder] = useState()
  // const [total, setTotal] = useState([])

  const dispatch = useDispatch()
  const fetchUserOrder = async () => {
    if (userInformation) {
      await orderApi
        .getAllOrderByUserId(userInformation.id)
        .then((response) => {
          dispatch(getAllOrder(response.data))
          // setUserOrder(response.data)
        })
        .catch((e) => {
          console.log(e)
        })
        await userApi.getUserById(userInformation.id).then((res) => {
          dispatch(getUser(res.data))
        }
        )
    }
  }

  const handleUpdateState = (id, state, comment) => {
    const confirmed = window.confirm(
      "Are you sure you want to change state of order?"
    )
    if (confirmed) {
      orderApi
        .editOrderState(id, state, comment)
        .then((response) => console.log(response.data))
        .catch((e) => console.log(e))

      fetchUserOrder()
    }
  }

  const deliveryOrder =
    userOrder &&
    userOrder.filter(
      (order) => order.state === "DELIVERING"
    )

  useEffect(() => {
    fetchUserOrder()
  }, [])
  // useEffect(() => {
  //   setTotal(totalPrice)
  // }, [totalPrice])

  return (
    <div>
      {userOrder &&
        deliveryOrder.map((order) => (
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
              <p>Total Price: ${order?.total?.toFixed(2)}</p>
            </div>
            <div className="py-2 flex justify-end">
              {/* <button
                onClick={() => handleUpdateState(order.id, "DONE", ".")}
                className="border border-sky-500 bg-sky-500 text-white px-2 py-1 rounded-md ml-2 hover:bg-white hover:text-sky-500 hover:border-sky-500"
              >
                RECEIVED
              </button> */}
            </div>
          </div>
        ))}
    </div>
  )
}

export default UserDeliveryOrder
