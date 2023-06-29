import React, { useState, useContext, useEffect } from "react"
import { Rate } from "antd"
import { useDispatch } from "react-redux"
import { addToCart } from "../../../features/cart/cartSlice"
import { useNavigate } from "react-router-dom"
import { NotificationContext } from "../../../context/NotificationProvider"
import userApi from "../../../api/userApi"
import storageService from "../../../api/storage"
import jwtDecode from "jwt-decode"
import { set } from "date-fns"

function ProductOverviewAction({ product }) {
  const openNotificationWithIcon = useContext(NotificationContext)

  const [quantity, setQuantity] = useState(1)
  const [wishlist, setWishlist] = useState()
  const [userId, setUserId] = useState()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onUpdateQuantity = (value) => {
    setQuantity(quantity + value)
  }

  const fetchData = async () => {
    let token = storageService.getAccessToken()
    if (token) {
      token = jwtDecode(token)
      await userApi
        .getUserByPhoneNumber(token.sub)
        .then((res) => {
          setUserId(res.data.id)
        })
        .catch((err) => {
          console.log(err)
        })
      if ((userId, product.id)) {
        userApi
          .getWishlist(userId, product.id)
          .then((res) => {
            setWishlist(res.data)
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
  }

  useEffect(() => {
    fetchData()
  }, [userId, product.id])

  const onWishlist = async () => {
    if (!userId) {
      openNotificationWithIcon(
        "Please login",
        "Please login to add to wishlist!"
      )
      return
    }
    if (!wishlist) {
      await userApi
        .addWishlist(userId, product.id)
        .then((res) => {
          openNotificationWithIcon(
            "Add to Wishlist",
            "Add to Wishlist Successfully!"
          )
        })
        .catch((err) => {
          console.log(err)
        })
      await userApi
        .getWishlist(userId, product.id)
        .then((res) => {
          setWishlist(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      await userApi
        .deleteWishlist(userId, product.id)
        .then((res) => {
          openNotificationWithIcon(
            "Remove from Wishlist",
            "Remove from Wishlist Successfully!"
          )
        })
        .catch((err) => {
          console.log(err)
        })
      setWishlist(null)
    }
  }

  return (
    <div className="lg:p-14 sm: p-5 lg:w-1/2 sm: w-full">
      <h1 className="text-2xl font-bold">{product.productName}</h1>
      <div
        style={{
          background: "#fafafa",
        }}
        className="my-4 text-lg"
      >
        <p className="text-lg font-bold text-orange-500 py-2">
          ${product.unitPrice}
        </p>
      </div>
      <div className="flex my-4 items-center">
        <Rate disabled value={product.rating} />
        <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400 pt-2">
          (102)
        </p>
      </div>
      <div className="my-4">
        <p>Availability: {product.quantity} left in stock</p>
      </div>
      <div className="my-4"></div>
      <div className="flex my-4">
        <p className="mr-6">Quantity:</p>
        <button
          className="border w-7 h-7 rounded-md bg-blue-100"
          onClick={() => onUpdateQuantity(-1)}
          disabled={quantity === 1}
        >
          -
        </button>
        <p className="border mx-1 w-10 rounded-md text-center">{quantity}</p>
        <button
          className="border w-7 h-7 rounded-md bg-blue-100 "
          onClick={() => onUpdateQuantity(1)}
          disabled={quantity >= product.quantity}
        >
          +
        </button>
      </div>
      <div className="action my-4">
        <div className="w-full flex items-center my-3 ">
          <button
            onClick={() => {
              dispatch(
                addToCart({
                  id: product.id,
                  quantity: quantity,
                  shopId: product.shopId,
                  price: (product.unitPrice * (100 - product.salePtc)) / 100,
                })
              )
              openNotificationWithIcon(
                "Add to Cart",
                "Add to Cart Successfully!"
              )
            }}
            className="border-2 border-white bg-sky-100 hover:bg-white  hover:border-sky-300 py-4 w-5/6 mr-3 font-bold rounded-md"
          >
            ADD TO CART
          </button>
          <button
            className=" h-14 w-14 flex items-center justify-center border-2 border-blue-100 hover:bg-sky-200 hover:border-white rounded-md"
            style={{
              background: wishlist ? "red" : "white",
            }}
            onClick={onWishlist}
          >
            <img
              src="/assets/images/heart-orange.png"
              className="h-2/5"
              alt=""
            />
          </button>
        </div>
        <button
          onClick={() => {
            dispatch(
              addToCart({
                id: product.id,
                quantity: quantity,
                shopId: product.shopId,
                price: (product.unitPrice * (100 - product.salePtc)) / 100,
              })
            )
            navigate("/cart")
          }}
          className="py-4 bg-sky-400 border-2 text-white font-bold border-white w-5/6 rounded-md hover:bg-white  hover:border-sky-300 hover:text-sky-400"
        >
          BUY NOW
        </button>
      </div>
    </div>
  )
}

export default ProductOverviewAction
