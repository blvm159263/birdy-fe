import React, { useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

function UserSidebar(isAtPage, handleChangePage) {
  const [isDropDown, setIsDropDown] = useState(false)
  const userInformation = useSelector((state) => state.user.userInformation)

  return (
    <div className="w-1/6 py-3 bg-sky-400 border-gray-200 text-white">
      <div className="flex flex-col items-center ">
        <div className="h-10 mb-1">
          <img className="h-full" src="/assets/images/shop_avar.png" alt="" />
        </div>
        <p>{userInformation && userInformation.fullName}</p>
      </div>
      <hr />
      <div className="pl-8">
        <div className="pt-4">
          <button
            id="user-info"
            className="flex items-center relative"
            onClick={() => setIsDropDown(!isDropDown)}
          >
            <p>Your Account</p>
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
              Profile
            </Link>
            <Link to="/user/address" className="p-3">
              Address
            </Link>
          </div>
        )}
        <Link to="/user/order">Your Order</Link>
      </div>
    </div>
  )
}

export default UserSidebar
