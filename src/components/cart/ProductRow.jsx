import { faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useEffect, useState } from "react"
import productApi from "../../api/productApi"
import { useDispatch, useSelector } from "react-redux"
import {
  decrementQuantity,
  incrementQuantity,
  setDeleteId,
  toggleSelectItem,
} from "../../features/cart/cartSlice"
import { Link } from "react-router-dom"
import { setShowCartDeleteModal } from "../../features/ui/uiSlice"

export default function ProductRow({ id, hideControl }) {
  const [product, setProduct] = useState({})
  const quantity = useSelector(
    (state) => state.cart.items.find((item) => item.id === id).quantity
  )
  const selected = useSelector(
    (state) => state.cart.items.find((item) => item.id === id).selected
  )
  const dispatch = useDispatch()

  useEffect(() => {
    productApi
      .getProductById(id)
      .then((response) => {
        setProduct(response.data)
      })
      .catch((error) => console.error(error))
  }, [id, selected])

  return (
    <div
      className={`grid ${
        hideControl ? "grid-cols-7" : "grid-cols-9"
      } items-center text-center bg-white rounded-sm  lg:p-2 lg:py-4 sm: p-0 sm: py-1 border-t`}
    >
      <div className="col-span-1" hidden={hideControl}>
        <input
          type="checkbox"
          checked={selected}
          onChange={() => dispatch(toggleSelectItem({ id: id }))}
        />
      </div>
      <Link
        className="flex col-span-3 items-center lg:gap-4 sm: gap-1"
        to={`/detail-item/${id}`}
      >
        <div className="lg:w-24 md: w-20 sm:w-8">
          <img
            className="aspect-square rounded-sm w-full h-fit"
            src={product.imageMain}
            alt="product"
          />
        </div>
        <p className="font-bold">{product.productName}</p>
      </Link>
      <div className="col-span-1">{product.categoryName}</div>
      <div className="col-span-1">
        ${((product.unitPrice * (100 - product.salePtc)) / 100).toFixed(2)}
      </div>
      <div className="col-span-1 flex justify-center gap-1">
        <button
          className="border w-7 h-7 rounded-md bg-sky-200 disabled:bg-gray-100 disabled:text-gray-400 hover:bg-sky-400 hover:text-white duration-200"
          onClick={() => dispatch(decrementQuantity(id))}
          disabled={quantity === 1}
          hidden={hideControl}
        >
          -
        </button>
        <p className="border w-10 rounded-md text-center">{quantity}</p>
        <button
          className="border w-7 h-7 rounded-md bg-sky-200 disabled:bg-gray-100 disabled:text-gray-400 hover:bg-sky-400 hover:text-white duration-200"
          onClick={() => dispatch(incrementQuantity({ id: id, quantity: 1 }))}
          disabled={quantity >= product.quantity}
          hidden={hideControl}
        >
          +
        </button>
      </div>
      <div className="col-span-1 font-bold">
        $
        {(
          (quantity * product.unitPrice * (100 - product.salePtc)) /
          100
        ).toFixed(2)}
      </div>

      <div className="">
        <div
          className="col-span-1 text-red-500 hover:text-red-700 duration-200"
          hidden={hideControl}
        >
          <button
            onClick={() => {
              dispatch(setShowCartDeleteModal(id))
              dispatch(setDeleteId(id))
            }}
            className="p-2"
          >
            <FontAwesomeIcon icon={faTrashCan} size="lg" />
          </button>
        </div>
      </div>
    </div>
  )
}
