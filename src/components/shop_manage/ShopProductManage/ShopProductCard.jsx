import React from "react"
import {useDispatch} from "react-redux";
import {fetchProductFormValues, setEditId} from "../../../features/shops/shopSlice";
import {setShowShopProductEditModal} from "../../../features/ui/uiSlice";

function ShopProductCard({ product }) {
  const dispatch = useDispatch();

  return (
    <div className="bg-white rounded-lg shadow-md flex flex-col items-center">
      <div className="h-52 w-full overflow-hidden">
        <img
          src={product.imageMain}
          alt="Card Image"
          className="h-full w-full object-cover object-center rounded-lg rounded-b-none"
        />
      </div>
      <div className="px-6 py-3 flex flex-col items-center">
        <p className="text-gray-600 mb-4">{product.productName}</p>
        <h1 className="text-lg text-left font-semibold mb-2">
          Quantity: {product.quantity}
        </h1>

        {product.state === 0 && (
          <p className="mb-3 w-fit border text-sm font-medium text-white text-center rounded-md px-2 py-1 bg-yellow-300">
            PENDING...
          </p>
        )}
        {product.state === 1 && (
          <p className="mb-3 w-fit border text-sm font-medium text-white text-center rounded-md px-2 py-1 bg-green-400">
            APPROVED
          </p>
        )}

        <div className="flex justify-between w-full">
          <button
            onClick={() => {
              dispatch(setEditId(product.id));
              dispatch(fetchProductFormValues(product.id));
              dispatch(setShowShopProductEditModal(true));
            }}
            className=" text-red-500 px-4 py-2  border-grey-100 w-1/2"
          >
            Edit
          </button>
          <button className=" text-green-500 px-4 py-2 border-l w-1/2 border-grey-100">
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default ShopProductCard
