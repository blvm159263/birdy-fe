import React, { useEffect, useState, useContext } from "react"
import ShopProductCard from "./ShopProductCard"
import ShopProductEditModal from "./ShopProductEditModal";
import ShopManageProductSearchBar from "../../../features/search/ShopManageProductSearchBar";
import Pagination from "../../../features/search/Pagination";
import { useDispatch, useSelector } from "react-redux"
import shopManageApi from "../../../api/shopManageApi"
import { setShowShopProductEditModal } from "../../../features/ui/uiSlice";
import { LoginContext } from "../../../context/LoginProvider";

function ShopProductManage() {
  const [totalPage, setTotalPage] = useState(1);
  const [shopProducts, setShopProducts] = useState([]);
  const [oldSearchText, setOldSearchText] = useState('');
  const searchState = useSelector(state => state.search);
  const { shopId } = useContext(LoginContext);
  const dispatch = useDispatch();

  const fetchProductForShop = () => {
    setOldSearchText(searchState.searchText);
    if (shopId) {
      shopManageApi
        .getShopProductsByShopIdForShopManage(shopId, { page: searchState.page, search: searchState.searchText })
        .then((response) => {
          console.log(response.data);
          setShopProducts(response.data[0]);
          setTotalPage(response.data[1]);
          console.log(searchState.searchText);
        });
    }
  }

  useEffect(() => {
    fetchProductForShop();

    return () => {
      dispatch(setShowShopProductEditModal(false));
    }
  }, [searchState.page, searchState.searchTrigger, shopId])

  const handleDeleteSuccess = () => {
    // When a deletion is successful, re-fetch the products
    fetchProductForShop();
  };
  return (
    <div className="bg-gray-200 p-4 col-span-9 min-h-screen">
      <ShopProductEditModal onEditSuccess={fetchProductForShop} />
      <h1 className="text-2xl text-center font-bold mb-5">Product Management</h1>

      {/* Search bar */}
      <ShopManageProductSearchBar />
      {oldSearchText !== '' && <p className='text-neutral-500 mt-3'>Search result for “<span className='text-orange-500'>{oldSearchText}</span>”</p>}

      {/* Shop Products */}
      <div className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-3">
        {shopProducts && shopProducts.map((product) => (<ShopProductCard key={product.id} product={product} onDeleteSuccess={handleDeleteSuccess} />))}
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
