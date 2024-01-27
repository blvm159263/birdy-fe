import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {updateProductFormValues} from "../../../../../features/shops/shopSlice";

export default function QuantityField() {
  const quantity = useSelector(state => state.shop.productFormValues.quantity);
  const dispatch = useDispatch();

  return (
    <div className="mb-7">
      <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900" >
        <p className="text-red-500 inline-block">*</p> Quantity
      </label>
      <input
        placeholder="product quantity"
        type="number"
        id="quantity"
        name="quantity"
        value={quantity}
        onChange={(e) => dispatch(updateProductFormValues({quantity: e.target.value}))}
        min={1}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 hover:border-blue-500 focus:outline-none focus:shadow-outline block w-full p-2.5"
        required
      />
    </div>
  )
}