import { Button, Input, Modal } from "antd"
import React, { useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import paymentApi from "../../api/paymentApi"
import { useContext } from "react"
import { NotificationContext } from "../../context/NotificationProvider"
function UserSidebar(isAtPage, handleChangePage) {

  const  openNotificationWithIcon  = useContext(NotificationContext)

  const [isDropDown, setIsDropDown] = useState(false)
  const userInformation = useSelector((state) => state.user.userInformation)
  const [chargeBalance, setChargeBalance] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleRecharge = async () => {
    if (chargeBalance < 1) {
      openNotificationWithIcon("Error", "Minimum recharge is 1$ !!!")
      return
    }
    setIsModalOpen(false);
    var amount = (chargeBalance * 23000).toFixed(0)
    await paymentApi
      .getQRMomoRecharge({ amount: amount, accountId: userInformation.accountId })
      .then((res) => {
        window.location.href = res.data.payUrl
      }).catch((e) => {
        console.log(e)
        openNotificationWithIcon("Error", "Momo is maintained!!!")
      }
      )
  }

  return (
    <div className="w-1/6 py-3 bg-sky-400 border-gray-200 text-white">
      <div className="flex flex-col items-center ">
        <div className="h-10 mb-1">
          <img className="h-full" src="/assets/images/shop_avar.png" alt="" />
        </div>
        <p>{userInformation && userInformation.fullName}</p>
        <p>
          Số dư hiện tại: $ {userInformation && (userInformation?.balance).toFixed(2)}

        </p>
        <Button className="mb-2 mt-2" type="dashed" onClick={showModal}>Nap tiền</Button>
        <Modal
          title="Nap tiền vào ví"
          open={isModalOpen}
          okButtonProps={{ style: { background: "#FF66CC" } }}
          okText="Nap tien bằng Momo QR Code"
          okType="dashed"
          onOk={handleRecharge}
          onCancel={handleCancel}>
          Số tiền muốn nạp:
          <Input
            type="number"
            className="w-auto m-2"
            prefix="$"
            min={1}
            defaultValue={1}
            onChange={(e) => setChargeBalance(e.target.value)}
          />
        </Modal>
      </div>
      <hr />
      <div className="pl-8">
        <div className="pt-4">
          <button
            id="user-info"
            className="flex items-center relative"
            onClick={() => setIsDropDown(!isDropDown)}
          >
            <p>Tài khoản</p>
            <span className="ml-2 w-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </button>
        </div>
        {isDropDown && (
          <div className="flex flex-col items-start">
            <Link to="/user" className="p-3">
              Thông tin
            </Link>
            <Link to="/user/address" className="p-3">
              Địa chỉ
            </Link>
          </div>
        )}
        <Link to="/user/order">Đơn hàng</Link>
      </div>
    </div>
  )
}

export default UserSidebar
