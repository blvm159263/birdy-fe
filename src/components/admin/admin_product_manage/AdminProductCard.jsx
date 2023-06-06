import React, { useState } from "react"

function AdminProductCard() {
  return (
    <div className="bg-white rounded-lg h-50 shadow-md p-6 sm:w-full lg:w-1/5 flex flex-col items-center">
      <div className="h-40 w-5/6">
        <img
          src="assets/images/product-demo.png"
          alt="Card Image"
          className="h-full w-full object-cover object-center mb-4"
        />
      </div>
      <p className="text-gray-600 mb-4">Product Name</p>
      <h1 className="text-xl text-left font-semibold mb-2">Quantity</h1>

      <p className="mb-3 border rounded-md p-1 bg-gray-400">Disabled</p>

      <div className="flex justify-between w-full">
        <button className=" text-red-500 px-4 py-2  border-grey-100 w-1/2">
          Edit
        </button>
        <button className=" text-green-500 px-4 py-2 border-l w-1/2 border-grey-100">
          Delete
        </button>
      </div>
    </div>
  )
}

export default AdminProductCard
