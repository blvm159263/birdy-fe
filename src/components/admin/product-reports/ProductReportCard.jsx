import { CheckCircleOutlined, CloseCircleOutlined, WarningOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";
import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import adminApi from "../../../api/adminApi";
import { NotificationContext } from "../../../context/NotificationProvider";
import { openProductReportModal, openProductRequestDetailModal } from "../../../features/admin/adminSlice";
import { triggerSearch } from "../../../features/search/searchSlice";

export default function ProductReportCard({ report }) {
  const openNotificationWithIcon = useContext(NotificationContext);
  const dispatch = useDispatch();
  const { product } = report;

  function onViewDetail(e) {
    dispatch(openProductReportModal(report));
  }

  return (
    <div
      onClick={(e) => onViewDetail(e)}
      className="productRequestCard flex cursor-pointer bg-white rounded border shadow hover:border-neutral-300 hover:scale-105 active:scale-100 duration-200"
    >
      <img
        src={product.imageMain}
        className="h-24 w-24 object-cover"
        alt={product.productName}
      />
      <div className="p-2">
        <div className="flex justify-between items-baseline">
          <p className="font-bold">{product.productName}</p>
          <p className="font-black text-orange-500 ml-4">${product.unitPrice}</p>
        </div>
        <div className="flex justify-between text-sm">
          <span className="font-semibold">Phân loại:</span>
          <p>{product.categoryName}</p>
        </div>
        <hr className="my-1" />
        <div className="flex items-baseline  text-sm">
          <p className="mr-4">Cửa hàng:</p>
          <Link
            to={`/view-shop/${product.shopId}`}
            className="font-semibold underline hover:text-neutral-500 active:text-neutral-700 duration-200"
          >
            {product.shopName}
          </Link>
        </div>
      </div>
      <div className={`p-2 flex grow justify-center items-center  ${report.reportCount > 3 ? 'text-red-500' : 'text-orange-400'}`}>
        <p className={`font-bold text-2xl px-2`}>{report.reportCount}</p>
        <p className="text-sm mr-2">Lượt báo xấu</p>
        <WarningOutlined />
      </div>
    </div>
  );
}
