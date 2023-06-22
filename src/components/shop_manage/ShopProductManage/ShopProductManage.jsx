import React, {useEffect, useState} from "react"
import ShopProductCard from "./ShopProductCard"
import {useSelector} from "react-redux"
import shopManageApi from "../../../api/shopManageApi"
import Pagination from "../../../features/search/Pagination"
import ShopProductManageForm from "./ShopProductManageForm"
import ShopManageProductSearchBar from "../../../features/search/ShopManageProductSearchBar";

function ShopProductManage() {
  const [totalPage, setTotalPage] = useState(1);
  const [shopProducts, setShopProducts] = useState([]);
  const [oldSearchText, setOldSearchText] = useState('');
  const searchState = useSelector(state => state.search);

  const fetchProductForShop = () => {
    setOldSearchText(searchState.searchText);

    shopManageApi
      .getShopProductsByShopIdForShopManage(1, { page: searchState.page, search: searchState.searchText })
      .then((response) => {
        console.log(response.data);
        setShopProducts(response.data[0]);
        setTotalPage(response.data[1]);
        console.log(searchState.searchText);
      });
  }

  useEffect(() => {
    fetchProductForShop();
  }, [searchState.page, searchState.searchTrigger])

  return (
    <div className="bg-gray-200 min-h-screen py-10 px-6 w-4/5 absolute top-0 right-0">
      <ShopProductManageForm/>
      <h1 className="text-2xl text-center font-bold mb-10">Product Management</h1>

      {/* Search bar */}
      <ShopManageProductSearchBar/>
      <p className='text-neutral-500 my-3'>Search result for “<span className='text-orange-500'>{oldSearchText}</span>”</p>

      {/* Shop Products */}
      <div className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {shopProducts && shopProducts.map((product) => (<ShopProductCard key={product.id} product={product} />))}
      </div>

      {/* No Product */}
      {shopProducts && shopProducts.length === 0 && (
        <div className="px-8 py-16">
          <img className="w-64 h-64 mx-auto" src="/assets/images/No_Product_Found.png" alt="no product" />
        </div>
      )}

      {/* Pagination */}
      <Pagination totalPage={totalPage} />
    </div>
  )
}

export default ShopProductManage
