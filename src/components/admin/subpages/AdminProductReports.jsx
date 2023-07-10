import { Empty, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import shopApi from "../../../api/shopApi";
import AdminSubPageType from "../../../constants/AdminSubPageType";
import { setCurrentAdminSubPage } from "../../../features/ui/uiSlice";
import ProductReportList from "../product-reports/ProductReportList";
import adminApi from "../../../api/adminApi";
import ProductReportModal from "../product-reports/ProductReportModal";

export default function AdminProductReports() {
  const [reports, setReports] = useState([]);
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setReports([]);
    setLoading(true);
    dispatch(setCurrentAdminSubPage(AdminSubPageType.PRODUCT_REPORTS));

    // Fetch shops
    adminApi.getAllProductReports()
      .then((response) => {
        setReports(response.data);
        setLoading(false);
      })
  }, [])

  return (
    <div id='admin-all-stores' className='p-4'>
      <h1 className='text-2xl font-bold my-4'>Sản phẩm bị báo xấu</h1>

      {/* Loading icon */}
      {isLoading &&
        <div className='flex justify-center items-center h-[400px]'>
          <Spin size='large' />
        </div>
      }

      {/* Product report results */}
      {reports.length > 0 ? (
        <ProductReportList reports={reports} />
      ) : (
        !isLoading && <div className='flex justify-center items-center h-[400px]'>
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </div>
      )}

      <ProductReportModal/>
    </div>
  )
}