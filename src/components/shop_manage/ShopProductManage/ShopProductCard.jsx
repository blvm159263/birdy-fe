import React, { useState, useContext } from "react"
import { useDispatch } from "react-redux";
import { Popconfirm } from "antd";
import { NotificationContext } from "../../../context/NotificationProvider";
import productApi from "../../../api/productApi";
import { setShowShopProductManageForm } from "../../../features/ui/uiSlice";
import { setEditId } from "../../../features/shops/shopSlice";

import {useDispatch} from "react-redux";
import {fetchProductFormValues, fetchProductSubImages, setEditId} from "../../../features/shops/shopSlice";
import {setShowShopProductEditModal} from "../../../features/ui/uiSlice";

function ShopProductCard({ product, onDeleteSuccess }) {
  const dispatch = useDispatch();
  console.log(product);

  const openNotificationWithIcon = useContext(NotificationContext);

  const confirm = (e) => {
    productApi.deleteProduct(product.id).then((res) => {
      // console.log(res);
      if (res.status === 200) {
        openNotificationWithIcon('Success', 'Delete product successfully!');
        onDeleteSuccess();
      }
    }).catch((err) => {
      console.log(err);
    })
  };
  // const cancel = (e) => {
  //   console.log(e);
  //   // message.error('Click on No');
  // };

  return (
    <div className="bg-white rounded-lg h-full shadow-md flex flex-col items-center">
      <div className="h-52 w-full overflow-hidden">
        <img
          src={product.imageMain}
          alt="Card"
          className="h-full w-full object-cover object-center rounded-lg rounded-b-none"
        />
      </div>
      <div className="px-6 py-3 flex flex-col items-center">
        <p className="text-gray-600 mb-4 truncate w-44 text-center">{product.productName}</p>
        <h1 className="text-lg text-left font-semibold mb-2">Quantity: {product.quantity}</h1>

        {product.state === 0 && <p className="mb-3 w-fit border text-sm font-medium text-white text-center rounded-md px-2 py-1 bg-yellow-300">PENDING...</p>}
        {product.state === 1 && <p className="mb-3 w-fit border text-sm font-medium text-white text-center rounded-md px-2 py-1 bg-green-400">APPROVED</p>}

        <div className="flex justify-between w-full">
          <button
            onClick={() => {
              dispatch(setEditId(product.id));
              dispatch(fetchProductFormValues(product.id));
              dispatch(fetchProductSubImages(product.id));
              dispatch(setShowShopProductEditModal(true));
            }}
            className=" text-red-500 px-4 py-2  border-grey-100 w-1/2"
          >
            Edit
          </button>
          <Popconfirm
            title="Delete this product?"
            description="This action cannot be undone."
            // onCancel={cancel}
            onConfirm={confirm}
            okText="OK"
            cancelText="Cancel"
          >
            <button
              className=" text-green-500 px-4 py-2 border-l w-1/2 border-grey-100"
            >
              Delete
            </button>
          </Popconfirm>
        </div>
      </div>
    </div>
  )
}

export default ShopProductCard
