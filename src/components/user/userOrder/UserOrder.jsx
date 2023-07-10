import React from "react"
import UserAllOrder from "./UserAllOrder"
import { Link, Outlet, Route, Router, Routes } from "react-router-dom"
import UserOrderCancel from "./UserOrderCancel"
import UserDeliveryOrder from "./UserDeliveryOrder"
import UserPendingOrder from "./UserPendingOrder"
import UserCompletedOrder from "./UserCompletedOrder"

function UserOrder() {
  console.log("render UserOrder");
  return (
    <div className="bg-white w-4/5">
      <h1 className="text-center py-2 text-2xl font-bold">Đơn hàng của bạn</h1>
      <hr />
      <div className="flex items-center justify-evenly py-1">
        <Link to="">Tất cả </Link>
        <Link to="pending">Đang chờ</Link>
        <Link to="delivery">Đang vận chuyển</Link>
        <Link to="completed">Hoàn tất</Link>
        <Link to="canceled">Đã hủy</Link>
      </div>
      <hr />
      <div>
        {/* <UserAllOrder />

        <UserPendingOrder /> 
        <UserCompletedOrder />
        <UserDeliveryOrder />
       <UserOrderCancel /> */}
        <Outlet />
      </div>
    </div>
  )
}

export default UserOrder
