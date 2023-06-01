import { faChevronLeft, faChevronRight, faFilter } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import productApi from '../api/productApi'
import ProductCardList from '../components/product/ProductCardList'

export default function SearchPage() {
  const [searchString, setSearchString] = useState("");
  const [sortType, setSortType] = useState("default");
  const [products, setProducts] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const { searchType, page } = useParams();

  useEffect(() => {
    const params = {
      search: searchString,
      page: page
    };

    let apiPromise;
    switch(sortType) {
      case "asc":
        apiPromise = productApi.getAllAscending(params);
        break;
      case "desc":
        apiPromise = productApi.getAllDescending(params);
        break;
      case "newest":
        apiPromise = productApi.getAllLatest(params);
        break;
      default:
        apiPromise = productApi.getAll(params);
    }
      
    apiPromise
      .then((response) => {
        setProducts(response.data[0]);
        setTotalPage(response.data[1])
        console.log(response.data);
        console.log(page);
        console.log(sortType);
      })
      .catch((error) => console.log(error));
  }, [page, sortType])

  return (
    <div id='searchPage' className='bg-neutral-100 px-2 md:px-0 py-4'>
      {/* <section className='container mx-auto'>
        <div className='flex justify-between mb-4'>
          <p className='text-neutral-500'>Shop related to “<span className='text-orange-500'>cage</span>”</p>
          <button to="/search" className='text-orange-500 text-lg font-semibold'>See more <FontAwesomeIcon className='ml-1' icon={faChevronRight} size='xs'/></button>
        </div>
        <StoreCard/>
      </section> */}
      <section className='container mx-auto mt-6'>
        <div className='flex justify-between mb-4'>
          {searchString.trim.length === 0 ?
            <p className='text-neutral-500 uppercase'>{searchType}</p> :
            <p className='text-neutral-500'>Search result for “<span className='text-orange-500'>cage</span>”</p>
          }
          <button to="/search" className='text-orange-500 text-lg font-semibold'><FontAwesomeIcon className='mr-2' icon={faFilter} />Filter</button>
        </div>
        <div className='sortByMenu flex justify-between items-center bg-gradient-to-r from-sky-500 to-blue-500 p-4 rounded-sm mb-6 text-xs md:text-base'>
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
                (<Link to={`/search/all-products/${page - 1}`} className="block px-3 py-1 text-center rounded-sm bg-neutral-100"><FontAwesomeIcon icon={faChevronLeft}/></Link>)
              }
              {page >= totalPage - 1 ?
                (<span className="block px-3 py-1 text-center rounded-sm bg-neutral-100 text-neutral-300"><FontAwesomeIcon icon={faChevronRight}/></span>) :
                (<Link to={`/search/all-products/${1 + Number(page)}`} className="block px-3 py-1 text-center rounded-sm bg-neutral-100"><FontAwesomeIcon icon={faChevronRight}/></Link>)
              }
            </div>
          </div>
        </div>
        <ProductCardList products={products}/>
        <div className='flex justify-center items-center gap-2 text-neutral-500 font-semibold py-4'>
          {page <= 0 ?
            (<span className="block px-2 rounded-sm text-neutral-300"><FontAwesomeIcon icon={faChevronLeft}/></span>) :
            (<Link to={`/search/all-products/${page - 1}`} className="block px-2 rounded-sm text-neutral-500"><FontAwesomeIcon icon={faChevronLeft}/></Link>)
          }
          {[...Array(totalPage)].map((x, i) => (
            <Link to={`/search/all-products/${i}`} key={i} className={`block px-2 rounded-sm ${page == i ? "text-white bg-orange-500" : ""}`}>{i + 1}</Link>
          ))}
          {page >= totalPage - 1 ?
            (<span className="block px-2 rounded-sm text-neutral-300"><FontAwesomeIcon icon={faChevronRight}/></span>) :
            (<Link to={`/search/all-products/${1 + Number(page)}`} className="block px-2 rounded-sm text-neutral-500"><FontAwesomeIcon icon={faChevronRight}/></Link>)
          }
        </div>
      </section>
    </div>
  )
}
