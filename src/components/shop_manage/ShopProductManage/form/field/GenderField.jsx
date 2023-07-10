import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {updateProductFormValues} from "../../../../../features/shops/shopSlice";
import {Select} from "antd";

export default function GenderField() {
  const gender = useSelector(state => state.shop.productFormValues.gender);
  const dispatch = useDispatch();

  const genders = ["M/F", "Male", "Female"]

  return (
    <div className="mb-4">
      <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900">
        Gender (optional)
      </label>
      <Select
        size="large"
        className="block"
        onChange={(value) => dispatch(updateProductFormValues({gender: genders.indexOf(value)}))}
        defaultValue={gender[0]}
        value={genders[gender]}
        options={genders.map((gender) => ({
          label: gender,
          value: gender,
        }))}
      />
    </div>
  )
}