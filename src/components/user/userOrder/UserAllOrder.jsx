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
import shopApi from "../../../api/shopApi"
import paymentApi from "../../../api/paymentApi"
import { ChatContext } from "../../../context/ChatContext"
import { NotificationContext } from "../../../context/NotificationProvider"
import { ExclamationCircleFilled } from "@ant-design/icons"
import { Modal } from "antd"
import TextArea from "antd/es/input/TextArea"
function UserAllOrder() {
  const { setUser, handleSelect } = useContext(SelectionChatContext)
  const { setIsChatOpen } = useContext(ChatContext)
  const userInformation = useSelector((state) => state.user.userInformation)
  const userOrder = useSelector((state) => state.user.userOrder)
  // const orderDetailProduct = useSelector((state) => state.user.userOrderDetail)
  // const orderFeedbacked = useSelector((state) => state.user.orderFeedbacked)
  const [error, setError] = useState(null)
  const openNotificationWithIcon = useContext(NotificationContext)
  const isDone = true
  const [comment, setComment] = useState("")
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isModalPaymentVisible, setIsModalPaymentVisible] = useState(false)
  const [selectedOrderId, setSelectedOrderId] = useState(null)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [orderPay, setOrderPay] = useState(null)

  const dispatch = useDispatch()
  const { confirm } = Modal

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
          setError(e)
        })
    }
  }

  const handlePayment = async () => {
    if(orderPay === null) return
    var amount = (orderPay.total * 23000)?.toFixed(0)
    const orderCp = (orderPay.code + orderPay.id).toString()
    await paymentApi
      .getQRMomoIndividual({ amount: amount, orderId: orderCp })
      .then((res) => {
        window.location.href = res.data.payUrl
      })
  }

  const handlePaymentFromBalance = async () => {
    if(orderPay === null) return
    console.log(orderPay.id);
    if (userInformation.balance < orderPay.total) {
      openNotificationWithIcon("Error", "Your balance is not enough!!!")
      return
    }
    await orderApi.payOrder(orderPay.id, userInformation.id, orderPay.total).then((res) => {
      openNotificationWithIcon("Success", "Payment success!!!")
      fetchUserOrder()
      setIsModalPaymentVisible(false)
    }).catch((e) => {
      console.log(e)
      openNotificationWithIcon("Error", "Payment failed!!!")
    }
    )
  }

  const handleCancelOrder = (id) => {
    setSelectedOrderId(id)
    setIsModalVisible(true)
  }

  const handleModalConfirm = () => {
    if (selectedOrderId) {
      orderApi
        .editOrderState(selectedOrderId, "CANCELED", comment)
        .then((response) => {
          console.log(response.data)
          openNotificationWithIcon("Cancel the order complete!!!")
          fetchUserOrder()
        })
        .catch((e) => console.log(e))
    }
    setIsModalVisible(false)
    setComment("")
  }

  const handleModalCancel = () => {
    setIsModalVisible(false)
    setComment("")
  }

  const handleModalPaymentCancel = () => {
    setIsModalPaymentVisible(false)
  }


  const showPromiseConfirm = () => {
    return new Promise((resolve, reject) => {
      confirm({
        title: "Did you received the order?",
        icon: <ExclamationCircleFilled />,
        content: `Click "OK" to confirm`,
        onOk() {
          return new Promise((resolve) => {
            setTimeout(resolve, 1000)
          })
            .then(() => {
              resolve(true)
            })
            .catch(() => {
              console.log("Oops errors!")
              reject(false)
            })
        },
        onCancel() {
          resolve(false)
        },
      })
    })
  }

  const handleUpdateState = async (id, state, comment) => {
    try {
      const confirmed = await showPromiseConfirm()
      if (confirmed) {
        orderApi
          .editOrderState(id, state, comment)
          .then((response) => {
            console.log(response.data)
            openNotificationWithIcon("Update state complete!!!")
          })
          .catch((e) => console.log(e))

        await fetchUserOrder()
      }
    } catch (error) {
      console.log("Oops errors!")
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
  }, [])

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

  if (error && error.response && error.response.status === 404) {
    // Handle 404 error, e.g., show a message or perform an action
    return <p className="p-4">Không có đơn hàng.</p>
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
                    Xem của hàng
                  </Link>
                </div>
                <div className="flex">
                  <p className="text-red-500">
                    <span className="text-gray-400">Trạng thái:</span>{" "}
                    {order.state} !!!
                  </p>
                  <div className="mx-2 w-[1px]  h-4/5 bg-gray-200"></div>
                  <p className="text-sky-400">
                    <span className="text-gray-400">Trạng thái thanh toán:</span>{" "}
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
                <p>Total Price: ${order?.total?.toFixed(2)}</p>
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
                {order.state === "DONE" && order.paymentStatus === "PAID" || order.state === "CANCELED" ? (
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

                {order.state === "Delivery" && order.paymentStatus === "PAID" ? (
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
                      onClick={() => {
                        setOrderPay(order)
                        setIsModalPaymentVisible(true)
                      }
                      }
                    >
                      PAY THE ORDER
                    </button>
                    <Modal
                      title="Choose payment method?"
                      visible={isModalPaymentVisible}
                      onCancel={handleModalPaymentCancel}
                      cancelText="Cancel"
                      okButtonProps={{ style: { display: "none" } }}
                    >
                      <button
                        className="border border-green-500 bg-green-500 text-white px-2 py-1 rounded-md ml-2 hover:bg-white hover:text-green-500 hover:border-green-500"
                        onClick={handlePaymentFromBalance}>
                        Thanh toán bằng số dư
                      </button>
                      <button
                        className="border border-green-500 bg-green-500 text-white px-2 py-1 rounded-md ml-2 hover:bg-white hover:text-green-500 hover:border-green-500"
                        onClick={handlePayment}>
                        Thanh toán bằng Momo QR code
                      </button>
                    </Modal>
                  </>
                ) : (
                  ""
                )}
                {order.state === "PENDING" ? (
                  <>
                    <button
                      onClick={() => handleCancelOrder(order.id)}
                      className="border border-red-500 bg-red-500 text-white px-2 py-1 rounded-md ml-2 hover:bg-white hover:text-red-500 hover:border-red-500"
                    >
                      Cancel
                    </button>
                    <Modal
                      title="Are you sure?"
                      visible={isModalVisible}
                      onCancel={handleModalCancel}
                      onOk={handleModalConfirm}
                      okText="Confirm"
                      cancelText="Cancel"
                    >
                      <p>Are you sure you want to cancel the order?</p>
                      <p>Please enter a reason:</p>
                      <TextArea
                        rows={4}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                    </Modal>
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
