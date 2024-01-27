import {updateProductFormValues} from "../../../../../features/shops/shopSlice";
import React from "react";
import {useDispatch, useSelector} from "react-redux";

export default function NameField() {
  const productName = useSelector(state => state.shop.productFormValues.productName);
  const dispatch = useDispatch();

  return (
    <div className="mb-4">
      <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
        <p className="text-red-500 inline-block">*</p> Name
      </label>
      <div className="flex flex-wrap items-stretch w-full relative">
        <input disabled type="text" id="name" value={productName} onChange={(e) => dispatch(updateProductFormValues({productName: e.target.value}))} maxLength={120} required name="name" placeholder="Loading"
               className="bg-gray-50 border border-gray-300 text-gray-900 flex-shrink flex-grow w-px flex-1 text-sm rounded-lg rounded-r-none block p-2.5 relative"/>
        <div className="flex">
          <span className="flex items-center leading-normal bg-white rounded-lg rounded-l-none border border-l-0 border-gray-300 p-2.5 whitespace-no-wrap text-grey-dark text-sm">
            {productName.length + "/120"}
          </span>
        </div>
      </div>
    </div>
  )
}