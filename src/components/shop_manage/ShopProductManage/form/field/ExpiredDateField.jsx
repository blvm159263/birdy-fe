import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {DatePicker} from "antd";
import dayjs from "dayjs";
import {updateProductFormValues} from "../../../../../features/shops/shopSlice";

export default function ExpiredDateField() {
  const expDate = useSelector(state => state.shop.productFormValues.expDate);
  const dispatch = useDispatch();
  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];

  return (
    <div className="mb-7">
      <label htmlFor="expDate" className="block mb-2 text-sm font-medium text-gray-900" >
        Expired date (optional)
      </label>
      <DatePicker
        value={dayjs(expDate)}
        onChange={(date, dateString) => {
          dispatch(updateProductFormValues({expDate: date.format()}))
        }}
        className="block w-40"
        id="expDate"
        name="expDate"
        size="large"
        format={dateFormatList}
      />
    </div>
  )
}