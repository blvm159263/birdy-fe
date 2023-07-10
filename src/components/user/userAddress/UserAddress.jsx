import React, { useState, useEffect } from "react"

import { useParams } from "react-router-dom"
import userApi from "../../../api/userApi"
import { useDispatch, useSelector } from "react-redux"
import { getUserAddresses } from "../../../features/user/userSlice"
import AddressModal from "./AddressModal"
import UpdateAddressModal from "./UpdateAddressModal"

function UserAddress() {
  // const { userid } = useParams()
  const [updated, setUpdated] = useState(false)
  const [isAddNew, setIsAddNew] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [error, setError] = useState(null)
  const userAddresses = useSelector((state) => state.user.userAddress)
  const userInformation = useSelector((state) => state.user.userInformation)

  const dispatch = useDispatch()

  const fetchAddress = () => {
    if (userInformation) {
      userApi
        .getAllUserAddress(userInformation.id)
        .then((response) => {
          dispatch(getUserAddresses(response.data))
        })
        .catch((e) => {
          console.log(e)
          setError(e)
          // dispatch(getUserAddresses([]))
        })
    }
  }

  useEffect(() => {
    fetchAddress()
  }, [updated, userInformation])
  if (error && error.response && error.response.status === 404) {
    // Handle 404 error, e.g., show a message or perform an action
    return (
      <div className="w-5/6 bg-white">
        <div className="flex justify-between items-center py-4 px-10">
          <h1 className=" text-center text-2xl font-bold">Địa chỉ</h1>
          <button
            onClick={() => {
              setIsAddNew(!isAddNew)
              setUpdated(false)
            }}
            className="rounded-md py-3 px-2 text-white bg-sky-400"
          >
            + Thêm địa chỉ mới
          </button>
        </div>
        <hr />

        <div className="py-4 px-6">
          <p>Không có địa chỉ</p>
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

  return (
    <div className="w-5/6 bg-white">
      <div className="flex justify-between items-center py-4 px-10">
        <h1 className=" text-center text-2xl font-bold">Địa chỉ</h1>
        <button
          onClick={() => {
            setIsAddNew(!isAddNew)
            setUpdated(false)
          }}
          className="rounded-md py-3 px-2 text-white bg-sky-400"
        >
          + Thêm địa chỉ mới
        </button>
      </div>
      <hr />

      {/* <div className="py-4 px-6">
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
                  <p>{userInformation.phoneNumber}</p>
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
      </div> */}
      <div className="py-4 px-6">
        {userAddresses &&
          userAddresses.length > 0 &&
          userAddresses.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b py-4"
            >
              <div>
                <div className="flex">
                  <h2 className="">{item.fullName}</h2>
                  <div className="mx-2 border-l"></div>
                  <p>{userInformation.phoneNumber}</p>
                </div>
                <p>{item.address}</p>
                {item.isDefault && (
                  <p className="text-red-400">Địa chỉ mặc định</p>
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
                  Cập nhật
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
