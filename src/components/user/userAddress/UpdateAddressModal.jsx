import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import userApi from "../../../api/userApi"
import { useDispatch, useSelector } from "react-redux"
import { addNewAddressSlice } from "../../../features/user/userSlice"
import { Checkbox, Modal, Select, Space } from "antd"
import TextArea from "antd/es/input/TextArea"

function UpdateAddressModal({ setIsUpdate, fetchAddress, address }) {
  const { userid } = useParams()
  const dispatch = useDispatch()
  const userInformation = useSelector((state) => state.user.userInformation)

  const [newAddress, setNewAddress] = useState({
    id: address.id,
    // fullName: "",
    address: address.address,
    userId: userid,
    // ward: "string",
    // city: "string",
    // province: "string",
    isDefault: false,
  })

  const { address: newAddressAddress, ...newAddressRest } = newAddress
  console.log(newAddressAddress)

  useEffect(() => {
    setNewAddress(address)
  }, [address])

  const handleChange = (evt) => {
    const { value, name, checked } = evt.target

    setNewAddress((prevState) => ({
      ...prevState,
      [name]: name === "isDefault" ? checked : value,
    }))

    console.log(newAddress)

    // console.log(value, name)
  }

  const handleResetForm = () => {
    setNewAddress({
      fullName: "",
      phoneNumber: "",
      address: "",
      userId: userid,
    })
  }

  const updateAddress = (addressid, params) => {
    userApi
      .updateAddress(addressid, params)
      .then((response) => console.log(response.data))
      .catch((error) => {
        console.log(error)
      })
  }

  const handleUpdateAddress = (e) => {
    e.preventDefault()

    updateAddress(address.id, newAddressAddress)

    handleResetForm()

    setIsUpdate(false)

    fetchAddress(userid)
  }

  return (
    <div className="fixed z-50 lg:w-full sm: w-full p-4  md:inset-0 h-[calc(100%-1rem)] max-h-full flex justify-center items-center inset-0 bg-black bg-opacity-10">
      <form
        onSubmit={handleUpdateAddress}
        className=" bg-white p-10 lg:h-2/4 lg:w-2/5 sm: w-full flex lg:flex-col sm: flex-col lg:items-between sm: items-center"
      >
        <h1 className="text-center font-bold text-2xl mb-5">Update Address</h1>
        <div className="w-full flex lg:flex-nowrap sm: flex-wrap justify-between mb-5">
          <label className="lg:w-1/5 md: full sm: w-full" htmlFor="name">
            Name
          </label>
          <input
            className="rounded-md border lg:w-4/5 md: w-full sm:w-full text-black"
            type="text"
            disabled
            name="fullName"
            value={userInformation.fullName}
          />
        </div>
        <div className="w-full flex lg:flex-nowrap sm: flex-wrap justify-between mb-5">
          <label className="lg:w-1/5 md: w-full sm:w-full" htmlFor="address">
            Address
          </label>
          <input
            className="rounded-md lg:w-4/5 md: w-full sm:w-full border text-black"
            type="text"
            onChange={handleChange}
            name="address"
            value={newAddress.address}
          />
        </div>
        <div className="">
          <input
            type="checkbox"
            className="mr-2"
            name="isDefault"
            onChange={handleChange}
            checked={newAddress.isDefault}
          />
          <label htmlFor="">Set as default address</label>
        </div>

        <div className="flex justify-end">
          <button className="text-sky-500 hover:text-sky-300" type="submit">
            Update
          </button>
          <button
            className="ml-4 text-red-500 hover:text-red-300"
            onClick={() => setIsUpdate(false)}
          >
            Close
          </button>
        </div>
      </form>
    </div>
  )
}

export default UpdateAddressModal
