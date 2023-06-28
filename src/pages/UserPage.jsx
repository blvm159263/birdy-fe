import React, { useEffect, useState } from "react"
import UserSidebar from "../components/user/UserSidebar"

import { Routes, Route, Outlet } from "react-router-dom"
import UserInfor from "../components/user/userInfor/UserInfor"
import UserAddress from "../components/user/userAddress/UserAddress"
import UserOrder from "../components/user/userOrder/UserOrder"
import { useParams } from "react-router-dom"

import { useDispatch, useSelector } from "react-redux"
import userApi from "../api/userApi"
import { getAUser } from "../features/user/userSlice"

function UserPage() {
  const userInformation = useSelector((state) => state.user.userInformation)
  const [isLoading, setIsLoading] = useState(true)

  const dispatch = useDispatch()
  const { userid } = useParams()
  const fetchUser = (userid) => {
    userApi
      .getUserById(userid)
      .then((response) => {
        dispatch(getAUser(response.data))
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    fetchUser(userid)
  }, [])
  return (
    <div className="flex h-full bg-gray-200 px-16 py-10">
      <UserSidebar />
      {/* <Routes>
        <Route
          index
          element={
            <UserInfor isLoading={isLoading} setIsLoading={setIsLoading} />
          }
        />
        <Route path="/address" element={<UserAddress />} />
        <Route path="/order" element={<UserOrder />} />
      </Routes> */}
      <Outlet />
    </div>
  )
}

export default UserPage
