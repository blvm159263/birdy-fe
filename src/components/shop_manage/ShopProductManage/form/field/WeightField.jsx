import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {updateProductFormValues} from "../../../../../features/shops/shopSlice";

export default function WeightField() {
  const weight = useSelector(state => state.shop.productFormValues.weight);
  const dispatch = useDispatch();

  return (
    <div className="mb-4">
      <label htmlFor="weight" className="block mb-2 text-sm font-medium text-gray-900" >
        <p className="text-red-500 inline-block">*</p> Weight
      </label>
      <div className="flex flex-wrap items-stretch w-full relative">
        <input
          type="number"
          min={0.1}
          step={0.1}
          required
          id="weight"
          name="weight"
          value={weight}
          onChange={e => dispatch(updateProductFormValues({weight: e.target.value}))}
          placeholder="weight in grams"
          className="bg-gray-50 border border-gray-300 text-gray-900 flex-shrink flex-grow w-px flex-1 text-sm rounded-lg rounded-r-none focus:ring-blue-500 focus:border-blue-500 hover:border-blue-500 focus:outline-none focus:shadow-outline block p-2.5 relative"
        />
        <div className="flex">
          <span className="flex items-center leading-normal bg-white rounded-lg rounded-l-none border border-l-0 border-gray-300 p-2.5 whitespace-no-wrap text-grey-dark text-sm">
            gram
          </span>
        </div>
      </div>
    </div>
  )
}