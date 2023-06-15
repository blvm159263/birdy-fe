import {faChevronLeft, faChevronRight, faFilter} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router'
import {Link} from 'react-router-dom'
import productApi from '../api/productApi'
import ProductCardList from '../components/product/ProductCardList'
import StoreCard from '../components/store/StoreCard'
import SearchType from '../constants/SearchType'
import SortType from '../constants/SortType'
import {decreasePage, increasePage, setPage, updateSortType} from '../features/search/searchSlice'
import FilterSideBar from '../components/FilterSideBar'
import {toggleFilterSideBar} from '../features/ui/uiSlice'
import shopApi from "../api/shopApi";
import StoreCardList from "../components/store/StoreCardList";

export default function SearchPage() {
  const searchText = useSelector(state => state.search.searchText);
  const [oldSearchText, setOldSearchText] = useState(undefined);
  const triggerSearch = useSelector(state => state.search.searchTrigger);
  const sortType = useSelector(state => state.search.sortType);
  const rating = useSelector(state => state.search.rating);
  const fromPrice = useSelector(state => state.search.fromPrice);
  const toPrice = useSelector(state => state.search.toPrice);
  const page = useSelector(state => state.search.page);
  const [products, setProducts] = useState([]);
  const [shops, setShops] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const { searchType } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    let isStillInPage = true;
    setOldSearchText(searchText);

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
    switch(sortType) {
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
        if(isStillInPage) {
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
      <FilterSideBar/>

      {/* Search shop results */}
      {shops.length > 0 ? (<section className='container mx-auto'>
        <div className='flex justify-between mb-4'>
          <p className='text-neutral-500'>Shop related to “<span className='text-orange-500'>{oldSearchText}</span>”</p>
          <Link to="/search" className='text-orange-500 text-lg font-semibold'>See more <FontAwesomeIcon className='ml-1' icon={faChevronRight} size='xs'/></Link>
        </div>
        <StoreCardList shops={shops.slice(0, 2)}/>
      </section>) : ''}

      {/* Search product results */}
      <section className='container mx-auto mt-6'>
        <div className='flex justify-between mb-4'>
          <p className='text-neutral-500'>{searchType} - <span className='text-neutral-500'>Search result for “<span className='text-orange-500'>{oldSearchText}</span>”</span></p>
          <button onClick={() => {dispatch(toggleFilterSideBar())}} className='text-orange-500 text-lg font-semibold'><FontAwesomeIcon className='mr-2' icon={faFilter} />Filter</button>
        </div>
        <div className='sortByMenu flex justify-between items-center bg-gradient-to-r from-sky-500 to-blue-500 p-4 py-0 rounded-sm mb-6 text-xs md:text-base'>
          <div className='flex items-center flex-wrap gap-2'>
            <p>Sort by</p>
            <button onClick={() => dispatch(updateSortType(SortType.DEFAULT))} className={`${sortType === SortType.DEFAULT ? "text-white bg-orange-500" : "bg-white"} py-1 px-4 rounded-sm`}>Relevant</button>
            <button onClick={() => dispatch(updateSortType(SortType.NEWEST))} className={`${sortType === SortType.NEWEST ? "text-white bg-orange-500" : "bg-white"} py-1 px-4 rounded-sm`}>Newest</button>
            <select onChange={e => dispatch(updateSortType(e.target.value))} className={`${(sortType === SortType.DESC || sortType === SortType.ASC) ? "text-white bg-orange-500" : "bg-white"} py-1 px-4 rounded-sm focus:outline-0`}>
              <option value={SortType.DEFAULT}>Price</option>
              <option value={SortType.DESC}>Price: highest first</option>
              <option value={SortType.ASC}>Price: lowest first</option>
            </select>
          </div>
          <div className='flex justify-center items-center gap-2 text-neutral-500 font-semibold py-4'>
            <p className='font-semibold text-white'>{1 + Number(page)}/{totalPage === 0 ? 1 : totalPage}</p>
            <div className='ml-4 flex'>
              {page <= 0 ?
                (<span className="block px-3 py-1 text-center rounded-sm bg-neutral-100 text-neutral-300"><FontAwesomeIcon icon={faChevronLeft}/></span>) :
                (<button onClick={() => dispatch(decreasePage())} className="block px-3 py-1 text-center rounded-sm bg-neutral-100"><FontAwesomeIcon icon={faChevronLeft}/></button>)
              }
              {page >= totalPage - 1 ?
                (<span className="block px-3 py-1 text-center rounded-sm bg-neutral-100 text-neutral-300"><FontAwesomeIcon icon={faChevronRight}/></span>) :
                (<button onClick={() => dispatch(increasePage())} className="block px-3 py-1 text-center rounded-sm bg-neutral-100"><FontAwesomeIcon icon={faChevronRight}/></button>)
              }
            </div>
          </div>
        </div>
        <ProductCardList products={products}/>
        {products.length === 0 ? (
          <div className='px-8 py-16'>
            <img className='w-64 h-64 mx-auto' src="/assets/images/No_Product_Found.png" alt='no product'/>
          </div>
        ) : ''}
        <div className='flex justify-center items-center gap-2 text-neutral-500 font-semibold py-4'>
          {page <= 0 ?
            (<span className="block px-2 rounded-sm text-neutral-300"><FontAwesomeIcon icon={faChevronLeft}/></span>) :
            (<button onClick={() => dispatch(decreasePage())} className="block px-2 rounded-sm text-neutral-500"><FontAwesomeIcon icon={faChevronLeft}/></button>)
          }
          {[...Array(totalPage)].map((x, i) => (
            <button onClick={() => dispatch(setPage(i))} className={`block px-2 rounded-sm ${Number(page) === i ? "text-white bg-orange-500" : ""}`}>{i + 1}</button>
          ))}
          {page >= totalPage - 1 ?
            (<span className="block px-2 rounded-sm text-neutral-300"><FontAwesomeIcon icon={faChevronRight}/></span>) :
            (<button onClick={() => dispatch(increasePage())} className="block px-2 rounded-sm text-neutral-500"><FontAwesomeIcon icon={faChevronRight}/></button>)
          }
        </div>
      </section>
    </div>
  )
}
