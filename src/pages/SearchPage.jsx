import {faChevronRight, faFilter} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router'
import {Link} from 'react-router-dom'
import productApi from '../api/productApi'
import ProductCardList from '../components/product/ProductCardList'
import SearchType from '../constants/SearchType'
import SortType from '../constants/SortType'
import {updateSearchType} from '../features/search/searchSlice'
import FilterSideBar from '../components/FilterSideBar'
import {toggleFilterSideBar} from '../features/ui/uiSlice'
import shopApi from "../api/shopApi";
import StoreCardList from "../components/store/StoreCardList";
import Pagination from "../features/search/Pagination";
import SortBar from "../features/search/SortBar";

export default function SearchPage() {
  const searchText = useSelector((state) => state.search.searchText);
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const isShowing = useSelector(state => state.ui.isShowFilterSideBar);
   const [oldSearchText, setOldSearchText] = useState(undefined);
   const triggerSearch = useSelector(state => state.search.searchTrigger);
   const sortType = useSelector(state => state.search.sortType);
   const rating = useSelector(state => state.search.rating);
   const fromPrice = useSelector(state => state.search.fromPrice);
   const toPrice = useSelector(state => state.search.toPrice);
   const page = useSelector(state => state.search.page);
   const [shops, setShops] = useState([]);
   const [totalPage, setTotalPage] = useState(1);
   const { searchType } = useParams();
  
  useEffect(() => {
    let isStillInPage = true;
    setOldSearchText(searchText);
    dispatch(updateSearchType(searchType));

    logInfo();
    const categoryId = Object.values(SearchType).filter((type) => type.text === searchType)[0].id;
    console.log("Param Category id: " + categoryId);

    let apiPromise;
    const params = {
      id: categoryId,
      search: searchText,
      page: page,
      rating: rating,
      from: fromPrice,
      to: toPrice,
    };

    // Call api based on sortType
    switch (sortType) {
      case SortType.DEFAULT:
        apiPromise = productApi.getAll(params);
        break;
      case SortType.ASC:
        apiPromise = productApi.getAllAscending(params);
        break;
      case SortType.DESC:
        apiPromise = productApi.getAllDescending(params);
        break;
      case SortType.NEWEST:
        apiPromise = productApi.getAllLatest(params);
        break;
      default:
        console.log("SortType not found!");
        return;
    }

    // Process api if still in page
    apiPromise
      .then((response) => {
        if (isStillInPage) {
          setProducts(response.data[0]);
          setTotalPage(response.data[1]);
          console.log(response.data);
        } else {
          console.log('Leave page, cancel load data');
        }
      })
      .catch((error) => console.log(error));

    // Call search shop api
    shopApi.searchShopByName({name: searchText}).then((response) => {
      if(isStillInPage) {
        setShops(response.data);
        console.log(response.data);
      } else {
        console.log('Leave page, cancel load shop data');
      }
    }).catch((error) => console.log(error));

    return () => {
      isStillInPage = false;
    }
  }, [triggerSearch, page, searchType, sortType, rating, fromPrice, toPrice]);

  function logInfo() {
    console.log("---------------------------")
    console.log("SearchText: " + searchText);
    console.log("Search type: " + searchType);
    console.log("Rating: " + rating);
    console.log("From price: " + fromPrice);
    console.log("To price: " + toPrice);
    console.log("Page: " + page);
    console.log("Sort type: " + sortType);
  }

  return (
    <div id='searchPage' className='bg-neutral-100 px-2 md:px-0 py-4'>
      {isShowing && <div className='fixed bg-neutral-800 bg-opacity-60 top-0 left-0 w-full h-screen'></div>}
      <FilterSideBar />

      {/* Search shop results */}
      {shops.length > 0 ? (<section className='container mx-auto'>
        <div className='flex justify-between mb-4'>
          <p className='text-neutral-500'>Shop related to “<span className='text-orange-500'>{oldSearchText}</span>”</p>
          <Link to="/search/all-shop" className='text-orange-500 text-lg font-semibold'>See more <FontAwesomeIcon className='ml-1' icon={faChevronRight} size='xs'/></Link>
        </div>
        <StoreCardList shops={shops.slice(0, 1)}/>
      </section>) : ''}

      {/* Search product results */}
      <section className='container mx-auto mt-6'>
        <div className='flex justify-between mb-4'>
          <p className='text-neutral-500'>{searchType} - <span className='text-neutral-500'>Search result for “<span className='text-orange-500'>{oldSearchText}</span>”</span></p>
          <button onClick={() => {dispatch(toggleFilterSideBar())}} className='text-orange-500 text-lg font-semibold'><FontAwesomeIcon className='mr-2' icon={faFilter} />Filter</button>
        </div>

        {/* Sort Bar */}
        <SortBar totalPage={totalPage}/>

        {/* Products List */}
        <ProductCardList products={products} />

        {/* No Product Found */}
        {products.length === 0 ? (
          <div className='px-8 py-16'>
            <img className='w-64 h-64 mx-auto' src="/assets/images/No_Product_Found.png" alt='no product' />
          </div>
        ) : ''}

        {/* Pagination */}
        <Pagination totalPage={totalPage}/>
      </section>
    </div>
  )
}
