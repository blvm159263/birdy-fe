import React, { useEffect } from "react"
import { useParams } from "react-router-dom"
import orderApi from "../../../api/orderApi"
import UserOrderList from "./UserOrderList"
import UserOrderDetail from "./UserOrderDetail"

function UserAllOrder() {
  return (
    <div>
      <UserOrderList />
      <UserOrderDetail />
      {/* <div className="px-6 mt-6 border-b">
        <div className="flex justify-between border-b py-2">
          <div className="flex items-center">
            <h2 className="font-bold mr-2">ShopName</h2>
            <button className="mr-2 px-2 py-1 border rounded-md text-white bg-sky-300">
              Chat
            </button>
            <button className="px-2 py-1 border rounded-md text-white bg-sky-300">
              View Shop
            </button>
          </div>
          <div className="flex">
            <p className="text-orange-400">Deliveried !!!</p>
            <div className="mx-2 w-[1px]  h-4/5 bg-gray-200"></div>
            <p className="text-sky-400">Completed!</p>
          </div>
        </div>
        <div className="flex justify-between py-2 border-b">
          <div className="h-20">
            <img
              className="h-full"
              src="/assets/images/product-demo.png"
              alt=""
            />
          </div>
          <div>
            <p>Product Name</p>
            <p className="text-gray-400">Category: bird</p>
            <p>x1</p>
          </div>
          <div>4.000.000đ</div>
        </div>
        <div className="flex justify-end py-2 border-b">
          <p>Total Price: 4.000.000đ</p>
        </div>
        <div className="py-2 flex justify-end">
          <button className="px-2 py-1 border rounded-md">Feedback</button>
          <button className="px-2 py-1 border rounded-md ml-2">
            Buy Again
          </button>
        </div>
      </div> */}
    </div>
  )
}

export default UserAllOrder
