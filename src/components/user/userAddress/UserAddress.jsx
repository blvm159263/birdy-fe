import React, { useState } from "react"
import data from "./UserAddressDataTMP"
function UserAddress() {
  const [isModal, setIsModal] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [addresses, setAddresses] = useState(data)
  const [selectedAddress, setSelectedAddress] = useState(null)

  // const handleSelectAddress = () => {
  //   add
  // }

  const handleSetDefault = (id) => {
    const itemdefault = data.map((item) => {
      if (item.id === id) {
        item.isDefault = true
      }
    })
  }

  return (
    <div className="w-5/6 bg-white">
      <div className="flex justify-between items-center py-4 px-10">
        <h1 className=" text-center text-2xl font-bold">Address</h1>
        <button
          onClick={() => setIsModal(!isModal)}
          className="rounded-md py-3 px-2 text-white bg-sky-400"
        >
          + Add new Address
        </button>
      </div>
      <hr />

      {data.map((item) => {
        return (
          <div key={item.id} className="flex justify-between p-8">
            <div>
              <div className="flex">
                <h2 className="">{item.name}</h2>
                <div className="mx-2 border-l"></div>
                <p>{item.phone}</p>
              </div>
              <p>{item.address}</p>
              {item.isDefault && (
                <p className="text-red-400">Default Address</p>
              )}
            </div>
            <div className="flex flex-col items-end">
              <button className="text-sky-400">Update</button>
              <button
                onClick={() => handleSetDefault(item.id)}
                className="rounded-md border px-1 py-1"
                disabled={item.isDefault}
              >
                Set as default
              </button>
            </div>
          </div>
        )
      })}

      {isModal && (
        <div className="fixed z-50 w-full p-4  md:inset-0 h-[calc(100%-1rem)] max-h-full flex justify-center items-center inset-0 bg-black bg-opacity-25">
          <form className=" bg-white p-10 h-2/4 w-2/5">
            <h1 className="text-center font-bold text-2xl mb-5">
              Add new Address
            </h1>
            <div className="w-full flex justify-between mb-5">
              <label className="w-1/5" htmlFor="name">
                Name
              </label>
              <input
                className="rounded-md border w-4/5"
                type="text"
                id="name"
              />
            </div>
            <div className="w-full flex justify-between mb-5">
              <label className="w-1/5" htmlFor="address">
                Address
              </label>
              <input
                className="rounded-md w-4/5 border"
                type="text"
                id="address"
              />
            </div>
            <div className="w-full flex justify-between mb-5">
              <label className="w-1/5" htmlFor="phone">
                Phone
              </label>
              <input
                className="rounded-md w-4/5 border"
                type="text"
                id="phone"
              />
            </div>
            <div className="flex justify-end">
              <button className="text-sky-500 hover:text-sky-300">Add</button>
              <button
                className="ml-4 text-red-500 hover:text-red-300"
                onClick={() => setIsModal(false)}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default UserAddress
