import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentAdminSubPage} from "../../../features/ui/uiSlice";
import AdminSubPageType from "../../../constants/AdminSubPageType";
import shopApi from "../../../api/shopApi";
import StoreCardList from "../../store/StoreCardList";
import Pagination from "../../../features/search/Pagination";
import {Empty, Spin} from "antd";
import CustomSearchBar from "../../../features/search/CustomSearchBar";

export default function AdminNewShopRequests() {
  const [shops, setShops] = useState([]);
  const searchText = useSelector((state) => state.search.searchText);
  const searchTrigger = useSelector((state) => state.search.searchTrigger);
  const [oldSearchText, setOldSearchText] = useState('')
  const page = useSelector((state) => state.search.page);
  const [totalPage, setTotalPage] = useState(1)
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setShops([]);
    setLoading(true);
    dispatch(setCurrentAdminSubPage(AdminSubPageType.NEW_SHOP_REQUESTS));
    setOldSearchText(searchText);

    const params = {
      search: searchText,
      page: page,
    }

    // Fetch shops
    shopApi
      .searchShopByNameAndStatus(false, params)
      .then((response) => {
        setShops(response.data[0]);
        setTotalPage(response.data[1]);
        setLoading(false);
      });
  }, [page, searchTrigger])

  return (
    <div id='admin-all-stores' className='p-4'>
      <CustomSearchBar placeholder='Search shop request...'/>
      <h1 className='text-2xl font-bold my-4'>New shop requests</h1>
      {oldSearchText.length > 0 &&
        <div className="flex justify-between mb-4">
          <p className="text-neutral-500">
            All shop requests related to “<span className="text-orange-500">{oldSearchText}</span>”
          </p>
        </div>
      }

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