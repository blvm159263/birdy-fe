import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import userApi from "../../../api/userApi"
import { useDispatch, useSelector } from "react-redux"
import { addNewAddressSlice } from "../../../features/user/userSlice"

function AddressModal({ isModal, setIsModal, fetchAddress }) {
  const { userid } = useParams()
  const dispatch = useDispatch()
  const userInformation = useSelector((state) => state.user.userInformation)

  const [newAddress, setNewAddress] = useState({
    id: Math.random(),
    fullName: "",
    address: "",
    userId: userid,
    ward: "string",
    city: "string",
    province: "string",
    isDefault: true,
  })

  useEffect(() => {
    setNewAddress(newAddress)
  }, [newAddress])

  const handleChange = (evt) => {
    const { value, name } = evt.target

    setNewAddress({
      ...newAddress,
      [name]: value,
    })

    console.log(value, name)
  }

  const handleAddAddress = (e) => {
    e.preventDefault()

    addNewAddressInForm()

    handleResetForm()

    setIsModal(false)

    fetchAddress(userid)
  }

  const handleResetForm = () => {
    setNewAddress({
      fullName: "",
      phoneNumber: "",
      address: "",
      userId: userid,
    })
  }

  const addNewAddressInForm = () => {
    userApi
      .addNewAddress(userid, newAddress)
      .then((response) => console.log(response.data))
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className="fixed z-50 lg:w-full sm: w-full p-4  md:inset-0 h-[calc(100%-1rem)] max-h-full flex justify-center items-center inset-0 bg-black bg-opacity-25">
      <form
        onSubmit={handleAddAddress}
        className=" bg-white p-10 lg:h-2/4 lg:w-2/5 sm: w-full flex lg:flex-row sm: flex-col lg:items-between sm: items-center"
      >
        <h1 className="text-center font-bold text-2xl mb-5">Add new Address</h1>
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

        <div className="flex justify-end">
          <button className="text-sky-500 hover:text-sky-300" type="submit">
            Add
          </button>
          <button
            className="ml-4 text-red-500 hover:text-red-300"
            onClick={() => setIsModal(false)}
          >
            Close
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddressModal
