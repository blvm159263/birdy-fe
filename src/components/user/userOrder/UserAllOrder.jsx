import React, { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import orderApi from "../../../api/orderApi"
import UserOrderList from "./UserOrderList"
import UserOrderDetail from "./UserOrderDetail"
import { useDispatch, useSelector } from "react-redux"
import {
  getAllOrder,
  updateStateReceived,
} from "../../../features/user/userSlice"
import Feedback from "./Feedback"
import { SelectionChatContext } from "../../../context/SelectionChatContext"
import { async } from "q"
import { Button, Modal } from 'antd';
import shopApi from "../../../api/shopApi"
import { ChatContext } from "../../../context/ChatContext"
import { NotificationContext } from "../../../context/NotificationProvider"
function UserAllOrder() {
  const { setUser, handleSelect } = useContext(SelectionChatContext)
  const { setIsChatOpen } = useContext(ChatContext)
  const userInformation = useSelector((state) => state.user.userInformation)
  const userOrder = useSelector((state) => state.user.userOrder)
  // const totalPrice = useSelector((state) => state.user.totalPriceList)
  const orderDetailProduct = useSelector((state) => state.user.userOrderDetail)
  const orderFeedbacked = useSelector((state) => state.user.orderFeedbacked)
  // console.log(orderFeedbacked)
  const isDone = true
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cancelId, setCancelId] = useState();
  const showModal = (id) => {
    setCancelId(id);
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    orderApi.editOrderState(cancelId, "CANCELED", "Huy order").then((res) => {
      openNotificationWithIcon("Cancel order successfully", "You have cancelled order successfully");
      fetchUserOrder();
    }).catch((e) => {
      openNotificationWithIcon("Cancel order failed", "You have cancelled order failed")
      });
    setIsModalOpen(false);
    
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const dispatch = useDispatch()
  const fetchUserOrder = async () => {
    if (userInformation) {
      await orderApi
        .getAllOrderByUserId(userInformation.id)
        .then((response) => {
          dispatch(getAllOrder(response.data))
          // setUserOrder(response.data)
        })
        .catch((e) => console.log(e))
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

  const handleCancel = (id, state) => {
    const confirmed = window.confirm("Are you sure you want to cancel order?")
    if (confirmed) {
      const comment = prompt("Reason?")

      orderApi
        .editOrderState(id, state, comment)
        .then((response) => console.log(response.data))
        .catch((e) => console.log(e))

      fetchUserOrder()
    }
  }
  // console.log(orderDetailProduct)
  useEffect(() => {
    fetchUserOrder()
    // setTotal(totalPrice)
  }, [userInformation, userOrder])

  const setUserChat = async (shopId) => {
    await shopApi.getShopInformationByShopId(shopId).then((res) => {
      const user = {
        phoneNumber: res.data.phoneNumber,
        fullName: res.data.shopName,
        avatarUrl: res.data.avatarUrl,
      }
      setUser(user)
      handleSelect(user)
      setIsChatOpen(true)
    })
  }

  return (
    <div>
      {userOrder &&
        userOrder.map((order) => (
          <div key={order.id}>
            <div className="px-6 mt-6 border-b border-b-gray-600">
              <div className="flex justify-between border-b py-2">
                <div className="flex items-center">
                  <h2 className="font-bold text-gray-300 mr-2">#{order.id}</h2>
                  <p className="font-bold mr-2">{order.code}</p>
                  <button
                    onClick={() => {
                      setUserChat(order.shopId)
                    }}
                    className="mr-2 px-2 py-1 border rounded-md text-white bg-sky-300"
                  >
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
                  <p className="text-red-500">
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
                setIsPopupOpen={setIsPopupOpen}
                isPopupOpen={isPopupOpen}
                orderid={order.id}
                order={order}
                isDone={order.state === "DONE" ? isDone : !isDone}
              />
              <div className="flex justify-between py-3 border-b">
                <p className="">
                  <span className="font-bold">Delivery to: </span>{" "}
                  {order.address}
                </p>
                <p>Total Price: ${order.total.toFixed(2)}</p>
              </div>
              <div className="py-2 relative flex justify-end">
                {order.state === "CANCELED" ? (
                  <div className="absolute left-0">
                    <span className="font-bold">Canceled reason:</span> "
                    {order.comment}"
                  </div>
                ) : (
                  ""
                )}
                {order.state === "DONE" && order.paymentStatus === "PAID" ? (
                  <>
                    <button className="border border-sky-500 bg-sky-500 text-white px-2 py-1 rounded-md ml-2 hover:bg-white hover:text-sky-500 hover:border-sky-500">
                      Buy Again
                    </button>

                    {/* <button
                      className="border border-green-500 bg-green-500 text-white px-2 py-1 rounded-md ml-2 hover:bg-white hover:text-green-500 hover:border-green-500"
                      onClick={() => setIsPopupOpen(order.id)}
                    >
                      Feedback
                    </button> */}
                  </>
                ) : (
                  ""
                )}

                {order.state === "CANCELED" ? (
                  <button className="border border-sky-500 bg-sky-500 text-white px-2 py-1 rounded-md ml-2 hover:bg-white hover:text-sky-500 hover:border-sky-500">
                    Buy Again
                  </button>
                ) : (
                  ""
                )}

                {order.state === "PENDING" && order.paymentStatus === "PAID" ? (
                  <button
                    className="border border-sky-500 bg-sky-500 text-white px-2 py-1 rounded-md ml-2 hover:bg-white hover:text-sky-500 hover:border-sky-500"
                    onClick={() => handleUpdateState(order.id, "DONE", ".")}
                  >
                    RECEIVED
                  </button>
                ) : (
                  ""
                )}

                {order.state === "PENDING" &&
                order.paymentStatus === "PENDING" ? (
                  <>
                    <button
                      className="border border-green-500 bg-green-500 text-white px-2 py-1 rounded-md ml-2 hover:bg-white hover:text-green-500 hover:border-green-500"
                      // onClick={() => setIsPopupOpen(order.id)}
                    >
                      PAY THE ORDER
                    </button>
                    <button
                      onClick={() => handleCancel(order.id, "CANCELED")}
                      className="border border-red-500 bg-red-500 text-white px-2 py-1 rounded-md ml-2 hover:bg-white hover:text-red-500 hover:border-red-500"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}

export default UserAllOrder
