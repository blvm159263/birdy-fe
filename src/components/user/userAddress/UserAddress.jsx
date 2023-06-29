import React, { useState, useEffect } from "react"

import { useParams } from "react-router-dom"
import userApi from "../../../api/userApi"
import { useDispatch, useSelector } from "react-redux"
import { getUserAddresses } from "../../../features/user/userSlice"
import AddressModal from "./AddressModal"
import UpdateAddressModal from "./UpdateAddressModal"

function UserAddress() {
  const { userid } = useParams()
  const [updated, setUpdated] = useState(false)
  const [isAddNew, setIsAddNew] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const userAddresses = useSelector((state) => state.user.userAddress)

  const dispatch = useDispatch()

  const fetchAddress = (userid) => {
    userApi
      .getAllUserAddress(userid)
      .then((response) => {
        dispatch(getUserAddresses(response.data))
      })
      .catch((e) => {
        console.log(e)
      })
  }

  useEffect(() => {
    fetchAddress(userid)
  }, [updated])

  return (
    <div className="w-5/6 bg-white">
      <div className="flex justify-between items-center py-4 px-10">
        <h1 className=" text-center text-2xl font-bold">Address</h1>
        <button
          onClick={() => {
            setIsAddNew(!isAddNew)
            setUpdated(false)
          }}
          className="rounded-md py-3 px-2 text-white bg-sky-400"
        >
          + Add new Address
        </button>
      </div>
      <hr />

      <div className="py-4 px-6">
        {userAddresses &&
          userAddresses.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b py-4"
            >
              <div>
                <div className="flex">
                  <h2 className="">{item.fullName}</h2>
                  <div className="mx-2 border-l"></div>
                  <p>1234567890</p>
                </div>
                <p>{item.address}</p>
                {item.isDefault && (
                  <p className="text-red-400">Default Address</p>
                )}
              </div>
              <div className="flex flex-col items-end">
                <button
                  className="text-sky-400"
                  onClick={() => {
                    setIsUpdate(item.id)
                    setUpdated(false)
                  }}
                >
                  Update
                </button>
              </div>
              {isUpdate === item.id && (
                <UpdateAddressModal
                  updated={updated}
                  // userAddresses={userAddresses}
                  setUpdated={setUpdated}
                  address={item}
                  setIsUpdate={setIsUpdate}
                  fetchAddress={fetchAddress}
                />
              )}
            </div>
          ))}
      </div>

      {isAddNew && (
        <AddressModal
          isAddNew={isAddNew}
          updated={updated}
          // userAddresses={userAddresses}
          setUpdated={setUpdated}
          setIsAddNew={setIsAddNew}
          fetchAddress={fetchAddress}
        />
      )}
    </div>
  )
}

export default UserAddress
