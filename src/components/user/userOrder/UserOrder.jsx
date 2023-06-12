import React from "react"
import UserAllOrder from "./UserAllOrder"

function UserOrder() {
  return (
    <div className="bg-white w-4/5">
      <h1 className="text-center py-2 text-2xl font-bold">User Order</h1>
      <hr />
      <div className="flex items-center justify-evenly py-1">
        <button>All Orders</button>
        <button>Pending</button>
        <button>Delivery</button>
        <button>Complete</button>
      </div>
      <hr />
      <div>
        <UserAllOrder />
      </div>
    </div>
  )
}

export default UserOrder
