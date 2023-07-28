import React, { useEffect, useState, useContext } from "react"
import ShopProductCard from "./ShopProductCard"
import ShopProductEditModal from "./ShopProductEditModal";
import ShopManageProductSearchBar from "../../../features/search/ShopManageProductSearchBar";
import Pagination from "../../../features/search/Pagination";
import { useDispatch, useSelector } from "react-redux"
import shopManageApi from "../../../api/shopManageApi"
import { setShowShopProductEditModal } from "../../../features/ui/uiSlice";
import { LoginContext } from "../../../context/LoginProvider";
import { resetAllState } from "../../../features/search/searchSlice";
import DeleteOptionModal from "./DeleteOptionModal";

function ShopProductManage() {
  const [searchCategory, setSearchCategory] = useState('ALL_PRODUCTS');
  const [totalPage, setTotalPage] = useState(1);
  const [shopProducts, setShopProducts] = useState([]);
  const [oldSearchText, setOldSearchText] = useState('');
  const searchState = useSelector(state => state.search);
  const { shopId } = useContext(LoginContext);
  const dispatch = useDispatch();

  const fetchProductForShop = () => {
    setOldSearchText(searchState.searchText);
    if (shopId) {
      let apiPromise;
      const params = { page: searchState.page, search: searchState.searchText }
      switch(searchCategory) {
        case 'ALL_PRODUCTS':
          apiPromise = shopManageApi.getShopProductsByShopIdForShopManage(shopId, params);
          break;
        case 'LATEST':
          apiPromise = shopManageApi.getLatestShopProductsByShopIdForShopManage(shopId, params);
          break;
        case 'BIRDS':
          apiPromise = shopManageApi.getShopProductsByShopIdAndCategoryIdForShopManage(shopId, 1, params);
          break;
        case 'ACCESSORIES':
          apiPromise = shopManageApi.getShopProductsByShopIdAndCategoryIdForShopManage(shopId, 2, params);
          break;
        case 'FOODS':
          apiPromise = shopManageApi.getShopProductsByShopIdAndCategoryIdForShopManage(shopId, 3, params);
          break;
        default:
          console.log('search category not valid in fetch product for shop');
      }
      console.log("Here is promise");
      console.log(apiPromise);

      apiPromise.then(response => {
        console.log(response.data);
        setShopProducts(response.data[0]);
        setTotalPage(response.data[1]);
      })
    }
  }

  const changeSearchCategory = (category) => {
    setSearchCategory(category);
    dispatch(resetAllState());
  }

  useEffect(() => {
    fetchProductForShop();

    return () => {
      dispatch(setShowShopProductEditModal(false));
    }
  }, [searchState.page, searchState.searchTrigger, shopId, dispatch, searchCategory])

  const handleDeleteSuccess = () => {
    // When a deletion is successful, re-fetch the products
    fetchProductForShop();
  };
  return (
    <div className="bg-gray-200 p-4 col-span-9 min-h-screen">
      <ShopProductEditModal onEditSuccess={fetchProductForShop} />
      <h1 className="text-2xl text-center font-bold mb-5">Product Management</h1>

      <div className="flex gap-2">
        {/* Category bar */}
        <ul className="category-bar flex h-full gap-1 items-baseline">
          {/* <p className="font-bold pr-2">Category:</p> */}
          <li><button onClick={() => changeSearchCategory('ALL_PRODUCTS')} className={`rounded p-2 ${searchCategory === 'ALL_PRODUCTS' ? 'text-white bg-sky-500 font-bold shadow' : 'border border-neutral-300'}`}>All product</button></li>
          <li><button onClick={() => changeSearchCategory('LATEST')} className={`rounded p-2 ${searchCategory === 'LATEST' ? 'text-white bg-sky-500 font-bold shadow' : 'border border-neutral-300'}`}>Latest</button></li>
          <li><button onClick={() => changeSearchCategory('BIRDS')} className={`rounded p-2 ${searchCategory === 'BIRDS' ? 'text-white bg-sky-500 font-bold shadow' : 'border border-neutral-300'}`}>Birds</button></li>
          <li><button onClick={() => changeSearchCategory('ACCESSORIES')} className={`rounded p-2 ${searchCategory === 'ACCESSORIES' ? 'text-white bg-sky-500 font-bold shadow' : 'border border-neutral-300'}`}>Accessories</button></li>
          <li><button onClick={() => changeSearchCategory('FOODS')} className={`rounded p-2 ${searchCategory === 'FOODS' ? 'text-white bg-sky-500 font-bold shadow' : 'border border-neutral-300'}`}>Foods</button></li>
        </ul>

        {/* Search bar */}
        <ShopManageProductSearchBar />
      </div>
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

      {/* Delete product options modal */}
      <DeleteOptionModal onDeleteSuccess={handleDeleteSuccess}/>
    </div>
  )
}

export default ShopProductManage
