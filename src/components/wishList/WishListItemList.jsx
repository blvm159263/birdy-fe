import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import WishListItem from "./WishListItem"
import storageService from "../../api/storage"
import jwtDecode from "jwt-decode"
import userApi from "../../api/userApi"
import { useState } from "react"

function WishListItemList() {
  const wishList = useSelector((state) => state.user.wishlist)
  const [list, setList] = useState([])

  useEffect(() => {
    let token = storageService.getAccessToken()
    if(token){
      token = jwtDecode(token)
      userApi.getUserByPhoneNumber(token.sub).then((response) => {
        if(response.data){
          userApi.getWishlist(response.data.id).then((response) => {
            setList(response.data)
          }).catch(e => console.log(e))
        }
      }
      )

    
    }
  }, [wishList])

  return (
    <div className="bg-white px-10 py-2">
      {list ? (
        list.map((item) => (
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
