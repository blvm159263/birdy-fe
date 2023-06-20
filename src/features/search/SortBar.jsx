import {decreasePage, increasePage, updateSortType} from "./searchSlice";
import SortType from "../../constants/SortType";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import {useDispatch, useSelector} from "react-redux";

export default function SortBar({totalPage}) {
  const page = useSelector(state => state.search.page);
  const sortType = useSelector(state => state.search.sortType);
  const dispatch = useDispatch();

  return (
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
  )
}