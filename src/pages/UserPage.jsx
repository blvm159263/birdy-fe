import React, { useEffect, useState } from "react"
import UserSidebar from "../components/user/UserSidebar"

import { Routes, Route, Outlet } from "react-router-dom"
import UserInfor from "../components/user/userInfor/UserInfor"
import UserAddress from "../components/user/userAddress/UserAddress"
import UserOrder from "../components/user/userOrder/UserOrder"
import { useParams } from "react-router-dom"

import { useDispatch, useSelector } from "react-redux"
import userApi from "../api/userApi"
import { getUser } from "../features/user/userSlice"
import jwtDecode from "jwt-decode"
import storageService from "../api/storage"
function UserPage() {
  console.log("render UserPage")
  const userInformation = useSelector((state) => state.user.userInformation)
  const [isLoading, setIsLoading] = useState(true)

  const dispatch = useDispatch()
  //const { userid } = useParams()

  const fetchUser = async () => {
    let token = storageService.getAccessToken()
    if (token) {
      token = jwtDecode(token)
      await userApi
        .getUserByPhoneNumber(token.sub)
        .then((response) => {
          dispatch(getUser(response.data))
          setIsLoading(false)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])
  return (
    <div className="flex lg:flex-row sm: flex-col h-full bg-gray-200 lg:px-16 sm: px-1 lg:py-10 sm: py-4">
      <UserSidebar />
      <Outlet />
    </div>
  )
}

export default UserPage
