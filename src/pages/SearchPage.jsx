import { faChevronLeft, faChevronRight, faFilter } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import productApi from '../api/productApi'
import ProductCardList from '../components/product/ProductCardList'
import StoreCard from '../components/store/StoreCard'
import SearchType from '../constants/SearchType'
import SortType from '../constants/SortType'
import { updateIsAtSearchPage, updateSearchText } from '../features/search/searchSlice'

export default function SearchPage() {
  const searchText = useSelector((state) => state.search.searchText);
  const isAtSearchPage = useSelector((state) => state.search.isAtSearchPage);
  const searchTrigger = useSelector((state) => state.search.searchTrigger);
  const dispatch = useDispatch();
  const [oldSearchText, setOldSearchText] = useState('');
  const [sortType, setSortType] = useState(SortType.DEFAULT);
  const [products, setProducts] = useState([]);
  const [totalPage, setTotalPage] = useState(undefined);
  const [rating, setRating] = useState(undefined);
  const [fromPrice, setFromPrice] = useState(undefined);
  const [toPrice, setToPrice] = useState(undefined);
  const { searchType, page } = useParams();

  useEffect(() => {
    dispatch(updateIsAtSearchPage(true));

    console.log("SearchText: " + searchText);
    console.log("Search type: " + searchType);
    console.log("Page: " + page);
    console.log("Sort type: " + sortType);
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
    if(isAtSearchPage) {
      apiPromise
      .then((response) => {
        setProducts(response.data[0]);
        setTotalPage(response.data[1]);
        setOldSearchText(searchText);
        console.log(response.data);
        dispatch(updateSearchText(''));
      })
      .catch((error) => console.log(error));
    }

    return () => {
      dispatch(updateIsAtSearchPage(false));
    }
  }, [searchTrigger, page, searchType, sortType]);

  return (
    <div id='searchPage' className='bg-neutral-100 px-2 md:px-0 py-4'>
      {searchType === SearchType.DEFAULT.text ? (<section className='container mx-auto'>
        <div className='flex justify-between mb-4'>
          <p className='text-neutral-500'>Shop related to “<span className='text-orange-500'>{oldSearchText}</span>”</p>
          <button to="/search" className='text-orange-500 text-lg font-semibold'>See more <FontAwesomeIcon className='ml-1' icon={faChevronRight} size='xs'/></button>
        </div>
        <StoreCard/>
      </section>) : ''}

      <section className='container mx-auto mt-6'>
        <div className='flex justify-between mb-4'>
            <p className='text-neutral-500'>{searchType} - <span className='text-neutral-500'>Search result for “<span className='text-orange-500'>{oldSearchText}</span>”</span></p>
            
          <button to="/search" className='text-orange-500 text-lg font-semibold'><FontAwesomeIcon className='mr-2' icon={faFilter} />Filter</button>
        </div>
        <div className='sortByMenu flex justify-between items-center bg-gradient-to-r from-sky-500 to-blue-500 p-4 py-0 rounded-sm mb-6 text-xs md:text-base'>
          <div className='flex items-center flex-wrap gap-2'>
            <p>Sort by</p>
            <button onClick={e => setSortType('default')} className={`${sortType === 'default' ? "text-white bg-orange-500" : "bg-white"} py-1 px-4 rounded-sm`}>Relevent</button>
            <button onClick={e => setSortType('newest')}className={`${sortType === 'newest' ? "text-white bg-orange-500" : "bg-white"} py-1 px-4 rounded-sm`}>Newest</button>
            <select onChange={e => setSortType(e.target.value)} className={`${(sortType === 'desc' || sortType === 'asc') ? "text-white bg-orange-500" : "bg-white"} py-1 px-4 rounded-sm focus:outline-0`}>
              <option value="default">Price</option>
              <option value="desc">Price: highest first</option>
              <option value='asc'>Price: lowest first</option>
            </select>
          </div>
          <div className='flex justify-center items-center gap-2 text-neutral-500 font-semibold py-4'>
            <p className='font-semibold text-white'>{1 + Number(page)}/{totalPage}</p>
            <div className='ml-4 flex'>
              {page <= 0 ?
                (<span className="block px-3 py-1 text-center rounded-sm bg-neutral-100 text-neutral-300"><FontAwesomeIcon icon={faChevronLeft}/></span>) :
                (<Link to={`/search/${searchType}/${page - 1}`} className="block px-3 py-1 text-center rounded-sm bg-neutral-100"><FontAwesomeIcon icon={faChevronLeft}/></Link>)
              }
              {page >= totalPage - 1 ?
                (<span className="block px-3 py-1 text-center rounded-sm bg-neutral-100 text-neutral-300"><FontAwesomeIcon icon={faChevronRight}/></span>) :
                (<Link to={`/search/${searchType}/${1 + Number(page)}`} className="block px-3 py-1 text-center rounded-sm bg-neutral-100"><FontAwesomeIcon icon={faChevronRight}/></Link>)
              }
            </div>
          </div>
        </div>
        <ProductCardList products={products}/>
        <div className='flex justify-center items-center gap-2 text-neutral-500 font-semibold py-4'>
          {page <= 0 ?
            (<span className="block px-2 rounded-sm text-neutral-300"><FontAwesomeIcon icon={faChevronLeft}/></span>) :
            (<Link to={`/search/${searchType}/${page - 1}`} className="block px-2 rounded-sm text-neutral-500"><FontAwesomeIcon icon={faChevronLeft}/></Link>)
          }
          {[...Array(totalPage)].map((x, i) => (
            <Link to={`/search/${searchType}/${i}`} key={i} className={`block px-2 rounded-sm ${Number(page) === i ? "text-white bg-orange-500" : ""}`}>{i + 1}</Link>
          ))}
          {page >= totalPage - 1 ?
            (<span className="block px-2 rounded-sm text-neutral-300"><FontAwesomeIcon icon={faChevronRight}/></span>) :
            (<Link to={`/search/${searchType}/${1 + Number(page)}`} className="block px-2 rounded-sm text-neutral-500"><FontAwesomeIcon icon={faChevronRight}/></Link>)
          }
        </div>
      </section>
    </div>
  )
}
