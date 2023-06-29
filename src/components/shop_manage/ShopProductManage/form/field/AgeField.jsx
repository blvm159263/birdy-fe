import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {updateProductFormValues} from "../../../../../features/shops/shopSlice";

export default function AgeField() {
  const age = useSelector(state => state.shop.productFormValues.age);
  const dispatch = useDispatch();

  return (
    <div className="mb-4">
      <label htmlFor="age" className="block mb-2 text-sm font-medium text-gray-900">
        Age (optional)
      </label>
      <input
        type="text"
        id="age"
        name="age"
        value={age}
        onChange={e => dispatch(updateProductFormValues({age: e.target.value}))}
        placeholder="bird age"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 hover:border-blue-500 focus:outline-none focus:shadow-outline block w-full p-2.5"
      />
    </div>
  )
}