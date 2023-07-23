import { Empty, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import adminApi from "../../../api/adminApi";
import AdminSubPageType from "../../../constants/AdminSubPageType";
import CustomSearchBar from "../../../features/search/CustomSearchBar";
import Pagination from "../../../features/search/Pagination";
import { setCurrentAdminSubPage } from "../../../features/ui/uiSlice";
import ProductRequestDetailModal from "../product-requests/ProductRequestDetailModal";
import ProductRequestList from "../product-requests/ProductRequestList";

export default function AdminProductRequests() {
  const [products, setProducts] = useState([]);
  const searchText = useSelector((state) => state.search.searchText);
  const searchTrigger = useSelector((state) => state.search.searchTrigger);
  const [oldSearchText, setOldSearchText] = useState("");
  const page = useSelector((state) => state.search.page);
  const [totalPage, setTotalPage] = useState(1);
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setProducts([]);
    setLoading(true);
    dispatch(setCurrentAdminSubPage(AdminSubPageType.NEW_PRODUCT_REQUESTS));
    setOldSearchText(searchText);

    const params = {
      search: searchText,
      page: page,
    };

    // Fetch products request
    adminApi.getAllProducts(params).then((response) => {
      setProducts(response.data[0]);
      setTotalPage(response.data[1]);
      setLoading(false);
    }).catch((error) => {
      console.log(error);
      setLoading(false);
    });
  }, [page, searchTrigger]);

  return (
    <div id="admin-new-product-request" className="p-4">
      <CustomSearchBar placeholder="Search product request..." />
      <h1 className="text-2xl font-bold my-4">New product requests</h1>
      {oldSearchText.length > 0 && (
        <div className="flex justify-between mb-4">
          <p className="text-neutral-500">
            All product requests related to “
            <span className="text-orange-500">{oldSearchText}</span>”
          </p>
        </div>
      )}

      {/* Loading icon */}
      {isLoading && (
        <div className="flex justify-center items-center h-[400px]">
          <Spin size="large" />
        </div>
      )}

      {/* Search shop results */}
      {products.length > 0 ? (
        <ProductRequestList products={products} />
      ) : (
        !isLoading && (
          <div className="flex justify-center items-center h-[400px]">
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          </div>
        )
      )}

      {/* Pagination */}
      <Pagination totalPage={totalPage} />

      {/* Product details modal */}
      <ProductRequestDetailModal />
    </div>
  );
}
