import {Select} from "antd";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {updateProductFormValues} from "../../../../../features/shops/shopSlice";

export default function CategoryField() {
  const categoryId = useSelector(state => state.shop.productFormValues.categoryId);
  const categories = ["Bird", "Accessories", "Food"];
  const dispatch = useDispatch();

  function getCategoryId(category) {
    for (let cate of categories) {
      if (category === cate) {
        return categories.indexOf(cate) + 1;
      }
    }
  }

  return (
    <div className="mb-4">
      <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">
        <p className="text-red-500 inline-block">*</p> Category
      </label>
      <Select
        required
        size="large"
        className="block w-40"
        onChange={(value) =>
          dispatch(updateProductFormValues(
            {
              categoryId: getCategoryId(value),
              categoryName: value
            }
          ))}
        defaultValue='Loading'
        value={categories[categoryId-1]}
        options={categories.map((category) => ({
          label: category,
          value: category,
        }))}
      />
    </div>
  )
}