import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {updateProductFormValues} from "../../../../../features/shops/shopSlice";

export default function SpeciesField() {
  const species = useSelector(state => state.shop.productFormValues.species);
  const dispatch = useDispatch();

  return (
    <div className="mb-4">
      <label htmlFor="species" className="block mb-2 text-sm font-medium text-gray-900">
        Species (optional)
      </label>
      <input
        type="text"
        id="species"
        name="species"
        value={species}
        onChange={e => dispatch(updateProductFormValues({species: e.target.value}))}
        placeholder="Species"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 hover:border-blue-500 focus:outline-none focus:shadow-outline block w-full p-2.5"
      />
    </div>
  )
}