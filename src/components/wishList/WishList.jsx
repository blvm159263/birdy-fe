import React from "react"
import WishListItemList from "./WishListItemList"

function WishList() {
  return (
    <div className="px-10 py-2 bg-gray-100">
      <h1 className=" text-center font-bold text-2xl py-2 mb-1">WishList</h1>
      <WishListItemList />
    </div>
  )
}

export default WishList
