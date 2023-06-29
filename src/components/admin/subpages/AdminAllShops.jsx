import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentAdminSubPage} from "../../../features/ui/uiSlice";
import AdminSubPageType from "../../../constants/AdminSubPageType";
import shopApi from "../../../api/shopApi";
import StoreCardList from "../../store/StoreCardList";
import Pagination from "../../../features/search/Pagination";
import {Empty, Spin} from "antd";

export default function AdminAllShops() {
  const [shops, setShops] = useState([]);
  const searchText = useSelector((state) => state.search.searchText);
  const [oldSearchText, setOldSearchText] = useState(undefined)
  const page = useSelector((state) => state.search.page);
  const [totalPage, setTotalPage] = useState(1)
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    dispatch(setCurrentAdminSubPage(AdminSubPageType.ALL_SHOPS));
    setOldSearchText(searchText);

    const params = {
      search: '',
      page: page,
    }

    // Fetch shops
    shopApi
      .searchShopByNameAndStatus(true, params)
      .then((response) => {
        setShops(response.data[0]);
        setTotalPage(response.data[1]);
        setLoading(false);
      });
  }, [])

  return (
    <div id='admin-all-stores' className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>All active shops</h1>

      {/* Loading icon */}
      {isLoading &&
        <div className='flex justify-center items-center h-[400px]'>
          <Spin size='large'/>
        </div>
      }

      {/* Search shop results */}
      {shops.length > 0 ? (
        <StoreCardList shops={shops} />
      ) : (
        !isLoading && <div className='flex justify-center items-center h-[400px]'>
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
        </div>
      )}

      {/* Pagination */}
      <Pagination totalPage={totalPage}/>
    </div>
  )
}