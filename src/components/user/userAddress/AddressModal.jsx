import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import userApi from "../../../api/userApi"
import { useDispatch } from "react-redux"
import { addNewAddressSlice } from "../../../features/user/userSlice"

function AddressModal({ isModal, setIsModal, fetchAddress }) {
  const { userid } = useParams()
  const dispatch = useDispatch()
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
    console.log(newAddress)
  }

  const handleAddAddress = (e) => {
    e.preventDefault()

    addNewAddressInForm()

    handleResetForm()

    setIsModal(false)
    fetchAddress()
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
    <div className="fixed z-50 w-full p-4  md:inset-0 h-[calc(100%-1rem)] max-h-full flex justify-center items-center inset-0 bg-black bg-opacity-25">
      <form onSubmit={handleAddAddress} className=" bg-white p-10 h-2/4 w-2/5">
        <h1 className="text-center font-bold text-2xl mb-5">Add new Address</h1>
        <div className="w-full flex justify-between mb-5">
          <label className="w-1/5" htmlFor="name">
            Name
          </label>
          <input
            className="rounded-md border w-4/5 text-black"
            type="text"
            onChange={handleChange}
            name="fullName"
            value={newAddress.fullName}
          />
        </div>
        <div className="w-full flex justify-between mb-5">
          <label className="w-1/5" htmlFor="address">
            Address
          </label>
          <input
            className="rounded-md w-4/5 border text-black"
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
