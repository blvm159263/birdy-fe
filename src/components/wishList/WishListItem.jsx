import React, { useEffect, useState } from "react"
import productApi from "../../api/productApi"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import userApi from "../../api/userApi"
import { useContext } from "react"
import { NotificationContext } from "../../context/NotificationProvider"
import { deleteItemWishList } from "../../features/user/userSlice"

function WishListItem({ productid }) {
  const userInformation = useSelector((state) => state.user.userInformation)
  const wishList = useSelector((state) => state.user.wishlist)

  const openNotificationWithIcon = useContext(NotificationContext)
  const dispatch = useDispatch()
  const [product, setProduct] = useState()
  const fetchProduct = () => {
    if ((productid, userInformation)) {
      productApi
        .getProductById(productid)
        .then((response) => setProduct(response.data))
        .catch((e) => console.log(e))
    }
  }

  const handleDeleteProductWishList = (productid) => {
    userApi
      .deleteWishlist(userInformation.id, productid)
      .then((res) => {
        openNotificationWithIcon(
          "Remove from Wishlist",
          "Remove from Wishlist Successfully!"
        )
        dispatch(deleteItemWishList(product))
      })
      .catch((err) => {
        console.log(err)
      })

    fetchProduct()
  }

  useEffect(() => {
    fetchProduct()
  }, [productid, userInformation, product, wishList])

  return (
    <>
      {product && (
        <div className="flex justify-between border-b py-4 border-b-gray-300">
          <div className="flex">
            <Link to={`/detail-item/${productid}`} className="h-fit w-28 mr-4">
              <img
                className="object-contain h-full w-full "
                src={product.imageMain}
                alt=""
              />
            </Link>
            <div>
              <h2 className="font-bold text-xl mb-2">{product.productName}</h2>
              <p className="text-xl mb-2">${product.unitPrice}</p>
              <div className="flex items-center">
                {[...Array(5)].map((x, i) => (
                  <svg
                    key={i}
                    aria-hidden="true"
                    className={`w-5 h-5 ${
                      i < product.rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                    // className="w-6 h-6 text-yellow-400 "
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>{i}th star</title>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              {/* <p>Shop</p> */}
            </div>
          </div>
          <div className="w-3/5">
            <p>{product?.description?.replaceAll("class", "className")}</p>
          </div>
          <div className="flex items-center">
            <Link
              to={`/detail-item/${productid}`}
              className="bg-sky-400 border border-sky-400 text-white hover:bg-white hover:text-sky-400 rounded-md px-2 py-1 mr-2"
            >
              View
            </Link>
            <button
              onClick={() => handleDeleteProductWishList(productid)}
              className="bg-red-500 border border-red-500 text-white hover:bg-white hover:text-red-500 rounded-md px-2 py-1"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default WishListItem
