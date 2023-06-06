import React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"

function AdminHeader() {
  const [isDropDown, setIsDropDown] = useState(false)
  const handleClickAdmin = () => {
    setIsDropDown(!isDropDown)
  }
  return (
    <nav className="bg-white p-5">
      <div className="flex justify-between">
        <Link to="/admin">Product Management</Link>
        <Link to="/admin/user-manage-ad">User Management</Link>
        {/* <Link to="/store-manage-ad">Store Management</Link> */}
        <div
          className="flex items-center cursor-pointer relative"
          onClick={handleClickAdmin}
        >
          <div className="w-5 mr-2 ">
            <img src="assets/images/shop_avar.png" alt="" />
          </div>
          <p>Admin</p>
          {isDropDown && (
            <div className="absolute top-5 right-0">
              <button>Logout</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default AdminHeader
