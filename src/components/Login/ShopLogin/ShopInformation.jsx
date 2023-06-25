import React from "react"

function ShopInformation() {
  return (
    <div className="w-1/2 px-20 py-5">
      <form className="bg-white p-5 flex flex-col items-center rounded-md">
        <h2 className="text-2xl font-bold text-center mb-4">
          Shop Information
        </h2>
        <input
          type="text"
          className="w-4/5 p-2 border rounded-md border-gray-200"
          placeholder="Shop Name"
        />

        <button className="w-4/5 bg-orange-400 border mb-2 py-2 rounded-md text-white hover:bg-white hover:text-orange-400 hover:border-orange-400">
          Save
        </button>
      </form>
    </div>
  )
}

export default ShopInformation
