import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {updateProductFormValues} from "../../../../../features/shops/shopSlice";

export default function MaterialField() {
  const material = useSelector(state => state.shop.productFormValues.material);
  const dispatch = useDispatch();

  return (
    <div className="mb-4">
      <label htmlFor="material" className="block mb-2 text-sm font-medium text-gray-900">
        Material (optional)
      </label>
      <input
        type="text"
        id="material"
        name="material"
        value={material}
        onChange={e => dispatch(updateProductFormValues({material: e.target.value}))}
        placeholder="product material"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 hover:border-blue-500 focus:outline-none focus:shadow-outline block w-full p-2.5"
      />
    </div>
  );
}