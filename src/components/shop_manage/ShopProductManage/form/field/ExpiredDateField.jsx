import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {DatePicker} from "antd";

export default function ExpiredDateField() {
  const expDate = useSelector(state => state.shop.productFormValues.expDate);
  const dispatch = useDispatch();

  return (
    <div className="mb-7">
      <label htmlFor="expDate" className="block mb-2 text-sm font-medium text-gray-900" >
        Expired date (optional)
      </label>
      {/* TODO: Configure Datepicker */}
      <DatePicker
        className="block"
        id="expDate"
        name="expDate"
        size="large"
      />
    </div>
  )
}