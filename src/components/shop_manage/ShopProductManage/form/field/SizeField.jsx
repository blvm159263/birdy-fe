import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {updateProductFormValues} from "../../../../../features/shops/shopSlice";

export default function SizeField() {
  const size = useSelector(state => state.shop.productFormValues.size);
  const dispatch = useDispatch();

  return (
    <div className="mb-4">
      <label htmlFor="size" className="block mb-2 text-sm font-medium text-gray-900" >
        Size (optional)
      </label>
      <input
        type="text"
        id="size"
        name="size"
        value={size}
        onChange={e => dispatch(updateProductFormValues({size: e.target.value}))}
        placeholder="Loading"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 hover:border-blue-500 focus:outline-none focus:shadow-outline block w-full p-2.5"
      />
    </div>
  )
}