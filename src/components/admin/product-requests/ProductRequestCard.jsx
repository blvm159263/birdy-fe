import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";
import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import adminApi from "../../../api/adminApi";
import { NotificationContext } from "../../../context/NotificationProvider";
import { openProductRequestDetailModal } from "../../../features/admin/adminSlice";
import { triggerSearch } from "../../../features/search/searchSlice";

export default function ProductRequestCard({ product }) {
  const openNotificationWithIcon = useContext(NotificationContext);
  const dispatch = useDispatch();

  function onViewDetail(e) {
    if(!(e.target instanceof HTMLDivElement ||
      e.target instanceof HTMLImageElement ||
      e.target instanceof HTMLParagraphElement)) return;
    dispatch(openProductRequestDetailModal(product));
  }

  function onDecline() {
    adminApi
      .declineProductById(product.id)
      .then((response) => {
        if (response.status === 200) {
          openNotificationWithIcon(
            "success",
            "Declined product " + product.productName
          );
        }
        dispatch(triggerSearch())
      })
      .catch((error) => {
        openNotificationWithIcon("error", "Error while declining product");
      });
  }

  function onApprove() {
    adminApi
      .approveProductById(product.id)
      .then((response) => {
        if (response.status === 200) {
          openNotificationWithIcon(
            "success",
            "Approved product " + product.productName
          );
          dispatch(triggerSearch())
        }
      })
      .catch((error) => {
        openNotificationWithIcon("error", "Error while approving product");
      });
  }

  return (
    <div
      onClick={(e) => onViewDetail(e)}
      className="productRequestCard cursor-pointer bg-white rounded border shadow hover:border-neutral-300 duration-200"
    >
      <img
        src={product.imageMain}
        className="h-56 w-full object-cover"
        alt={product.productName}
      />
      <div className="p-3">
        <div className="flex justify-between">
          <p className="font-bold text-lg w-28 truncate">{product.productName}</p>
          <p className="font-black text-orange-500">${product.unitPrice}</p>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Category:</span>
          <p>{product.categoryName}</p>
        </div>
        <hr className="my-3" />
        <p className="text-sm">Requested by</p>
        <Link
          to={`/view-shop/${product.shopId}`}
          className="font-semibold underline hover:text-neutral-500 active:text-neutral-700 duration-200"
        >
          {product.shopName}
        </Link>
        <div>
          <Popconfirm
            title="Decline this request"
            description="Are you sure to decline this request?"
            onConfirm={onDecline}
            icon={<CloseCircleOutlined />}
            okText="Yes"
            cancelText="No"
          >
            <button className="w-full bg-gradient-to-r from-red-300 via-red-500 to-red-400 p-1 mt-3 rounded-lg border border-red-400 font-semibold hover:brightness-110 active:brightness-95 duration-200">
              Decline
            </button>
          </Popconfirm>
          <Popconfirm
            title="Approve this request"
            description="Are you sure to approve this request?"
            onConfirm={onApprove}
            icon={<CheckCircleOutlined />}
            okText="Yes"
            cancelText="No"
          >
            <button className="w-full bg-gradient-to-r from-green-300 via-green-500 to-green-400 p-1 mt-3 rounded-lg border border-green-400 font-semibold hover:brightness-110 active:brightness-95 duration-200">
              Approve
            </button>
          </Popconfirm>
        </div>
      </div>
    </div>
  );
}
