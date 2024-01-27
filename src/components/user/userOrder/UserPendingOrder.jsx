import React, { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import orderApi from "../../../api/orderApi"
import UserOrderList from "./UserOrderList"
import UserOrderDetail from "./UserOrderDetail"
import { useDispatch, useSelector } from "react-redux"
import { getAllOrder, getUser } from "../../../features/user/userSlice"
import paymentApi from "../../../api/paymentApi"
import { ExclamationCircleFilled } from "@ant-design/icons"
import CommentModal from "./CommentModal"
import { Modal, Input } from "antd"
import { NotificationContext } from "../../../context/NotificationProvider"
import { set } from "date-fns"
import userApi from "../../../api/userApi"

const { TextArea } = Input

function UserPendingOrder() {
  const { userid } = useParams()
  const userOrder = useSelector((state) => state.user.userOrder)
  const userInformation = useSelector((state) => state.user.userInformation)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedOrderId, setSelectedOrderId] = useState(null)
  const [comment, setComment] = useState("")
  const openNotificationWithIcon = useContext(NotificationContext)
  const [isModalPaymentVisible, setIsModalPaymentVisible] = useState(false)
  const [orderPay, setOrderPay] = useState(null)

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
          fetchUserOrder(userid)
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

  const handlePayment = async () => {
    var amount = (orderPay.total * 23000)?.toFixed(0)
    const orderCp = (orderPay.code + orderPay.id).toString()
    await paymentApi
      .getQRMomoIndividual({ amount: amount, orderId: orderCp })
      .then((res) => {
        window.location.href = res.data.payUrl
      }).catch((e) => {
        console.log(e)
        openNotificationWithIcon("Error", "Momo is maintained!!!")
      }
      )
  }

  const handlePaymentFromBalance = async () => {
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

  const handleModalPaymentCancel = () => {
    setIsModalPaymentVisible(false)
  }

  // useEffect(() => {
  //   setTotal(totalPrice)
  // }, [totalPrice])
  const pendingOrder =
    userOrder &&
    userOrder.filter(
      (order) => order.state === "PENDING"
    )

  useEffect(() => {
    fetchUserOrder()
  }, [])
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
              <p>Total Price: ${order?.total?.toFixed(2)}</p>
            </div>
            <div className="py-2 flex justify-end">
              {order.state === "PENDING" &&
                order.paymentStatus === "PENDING" ?
                (<>
                  <button
                      className="border border-green-500 bg-green-500 text-white px-2 py-1 rounded-md ml-2 hover:bg-white hover:text-green-500 hover:border-green-500"
                      onClick={() => {
                        setOrderPay(order)
                        setIsModalPaymentVisible(true)}}
                    >
                      PAY THE ORDER
                    </button>
                    <Modal
                      title="Choose payment method?"
                      visible={isModalPaymentVisible}
                      onCancel={handleModalPaymentCancel}
                      cancelText="Cancel"
                      okButtonProps={{ style: { display: "none" }}}
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
                </>)
                :
                ("")
              }

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
            </div>
            {/* {isConfirmed && <CommentModal />} */}
          </div>
        ))}
    </div>
  )
}

export default UserPendingOrder
