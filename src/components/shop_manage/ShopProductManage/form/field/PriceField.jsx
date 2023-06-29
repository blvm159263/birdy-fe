import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {updateProductFormValues} from "../../../../../features/shops/shopSlice";

export default function PriceField() {
  const unitPrice = useSelector(state => state.shop.productFormValues.unitPrice);
  const dispatch = useDispatch();

  return (
    <div className="mb-4">
      <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">
        <p className="text-red-500 inline-block">*</p> Price
      </label>
      <div className="flex flex-wrap items-stretch w-full relative">
        <div className="flex">
          <span className="flex items-center leading-normal bg-white rounded-lg rounded-r-none border border-r-0 border-gray-300 p-2.5 whitespace-no-wrap text-grey-dark text-sm">
            $
          </span>
        </div>
        <input
          type="number"
          min={0.01}
          step={0.01}
          id="price"
          name="price"
          value={unitPrice}
          onChange={event => dispatch(updateProductFormValues({unitPrice: event.target.value}))}
          placeholder="0.00"
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 flex-shrink flex-grow w-px flex-1 text-sm rounded-lg rounded-l-none focus:ring-blue-500 focus:border-blue-500 hover:border-blue-500 focus:outline-none focus:shadow-outline block p-2.5 relative"
        />
      </div>
    </div>
  )
}