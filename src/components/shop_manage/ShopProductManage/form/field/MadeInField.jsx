import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {updateProductFormValues} from "../../../../../features/shops/shopSlice";

export default function MadeInField() {
  const madeIn = useSelector(state => state.shop.productFormValues.madeIn);
  const dispatch = useDispatch();

  return (
    <div className="mb-4">
      <label htmlFor="made-in" className="block mb-2 text-sm font-medium text-gray-900">
        Made in (optional)
      </label>
      <input
        type="text"
        id="made-in"
        name="made-in"
        value={madeIn}
        onChange={e => dispatch(updateProductFormValues({madeIn: e.target.value}))}
        placeholder="country of origin"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 hover:border-blue-500 focus:outline-none focus:shadow-outline block w-full p-2.5"
      />
    </div>
  )
}