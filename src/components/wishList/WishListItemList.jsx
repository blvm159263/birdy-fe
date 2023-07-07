import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import WishListItem from "./WishListItem"

function WishListItemList() {
  const wishList = useSelector((state) => state.user.wishlist)
  useEffect(() => {}, [wishList])

  return (
    <div className="bg-white px-10 py-2">
      {wishList ? (
        wishList.map((item) => (
          <WishListItem key={item.productId} productid={item.productId} />
        ))
      ) : (
        <div className="text-center text-xl font-bold">
          {" "}
          Nothing in wishlist. Add more item !!!
        </div>
      )}
    </div>
  )
}

export default WishListItemList
