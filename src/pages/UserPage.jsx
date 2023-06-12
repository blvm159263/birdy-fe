import React from "react"
import UserSidebar from "../components/user/UserSidebar"

import UserAction from "./UserAction"
import { Routes, Route } from "react-router-dom"
import UserInfor from "../components/user/userInfor/UserInfor"
import UserAddress from "../components/user/userAddress/UserAddress"
import UserOrder from "../components/user/userOrder/UserOrder"

function UserPage() {
  return (
    <div className="flex bg-gray-200 px-16 py-10">
      <UserSidebar />
      {/* <UserAction /> */}
      <Routes>
        <Route index element={<UserInfor />} />
        <Route path="/address" element={<UserAddress />} />
        <Route path="/order" element={<UserOrder />} />
      </Routes>
    </div>
  )
}

export default UserPage
