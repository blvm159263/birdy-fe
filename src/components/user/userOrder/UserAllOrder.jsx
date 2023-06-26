import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import orderApi from "../../../api/orderApi"
import UserOrderList from "./UserOrderList"
import UserOrderDetail from "./UserOrderDetail"
import { useDispatch, useSelector } from "react-redux"
import { getAllOrder } from "../../../features/user/userSlice"

function UserAllOrder() {
  const { userid } = useParams()
  // const userOrder = useSelector((state) => state.user.userOrder)
  const [userOrder, setUserOrder] = useState()
  const [total, setTotal] = useState(0)
  const dispatch = useDispatch()
  const fetchUserOrder = async (userid) => {
    await orderApi
      .getAllOrderByUserId(userid)
      .then((response) => {
        // dispatch(getAllOrder(response.data))
        setUserOrder(response.data)
      })
      .catch((e) => console.log(e))
  }
  const handleGetTotal = (data) => {
    setTotal(data)
  }

  useEffect(() => {
    fetchUserOrder(userid)
    console.log(total)
  }, [])

  return (
    <div>
      {userOrder &&
        userOrder.map((order) => (
          <div key={order.id} className="px-6 mt-6 border-b border-b-gray-600">
            <div className="flex justify-between border-b py-2">
              <div className="flex items-center">
                <h2 className="font-bold text-gray-300 mr-2">#{order.id}</h2>
                <p className="font-bold mr-2">{order.code}</p>
                <button className="mr-2 px-2 py-1 border rounded-md text-white bg-sky-300">
                  Chat
                </button>
                <button className="px-2 py-1 border rounded-md text-white bg-sky-300">
                  View Shop
                </button>
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
            <UserOrderList
              onGetTotal={handleGetTotal}
              orderid={order.id}
              setTotal={setTotal}
            />
            <div className="flex justify-between py-3 border-b">
              <p className="">
                <span className="font-bold">Delivery to: </span> {order.address}
              </p>
              <p>Total Price: {total}</p>
            </div>
            <div className="py-2 flex justify-end">
              <button className="px-2 py-1 border rounded-md">Feedback</button>
              <button className="px-2 py-1 border rounded-md ml-2">
                Buy Again
              </button>
            </div>
          </div>
        ))}
    </div>
  )
}

export default UserAllOrder
