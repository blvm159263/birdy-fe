import React from "react"
import UserAllOrder from "./UserAllOrder"
import { Link, Outlet, Route, Router, Routes } from "react-router-dom"
import UserOrderCancel from "./UserOrderCancel"
import UserDeliveryOrder from "./UserDeliveryOrder"
import UserPendingOrder from "./UserPendingOrder"
import UserCompletedOrder from "./UserCompletedOrder"

function UserOrder() {
  return (
    <div className="bg-white w-4/5">
      <h1 className="text-center py-2 text-2xl font-bold">User Order</h1>
      <hr />
      <div className="flex items-center justify-evenly py-1">
        <Link to="">All Orders</Link>
        <Link to="pending">Pending</Link>
        <Link to="delivery">Delivery</Link>
        <Link to="completed">Completed</Link>
        <Link to="canceled">Canceled</Link>
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
