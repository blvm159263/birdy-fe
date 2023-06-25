import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {decreasePage, increasePage, setPage} from "./searchSlice";
import React from "react";
import {useDispatch, useSelector} from "react-redux";

export default function Pagination({totalPage}) {
  const page = useSelector(state => state.search.page);
  const dispatch = useDispatch();

  return (
    <div className='flex justify-center items-center gap-2 text-neutral-500 font-semibold py-4'>
      {page <= 0 ?
        (<span className="block px-2 rounded-sm text-neutral-300"><FontAwesomeIcon icon={faChevronLeft}/></span>) :
        (<button onClick={() => dispatch(decreasePage())} className="block px-2 rounded-sm text-neutral-500"><FontAwesomeIcon icon={faChevronLeft}/></button>)
      }
      {[...Array(totalPage)].map((x, i) => (
        <button key={i} onClick={() => dispatch(setPage(i))} className={`block px-2 rounded-sm ${Number(page) === i ? "text-white bg-orange-500" : ""}`}>{i + 1}</button>
      ))}
      {page >= totalPage - 1 ?
        (<span className="block px-2 rounded-sm text-neutral-300"><FontAwesomeIcon icon={faChevronRight}/></span>) :
        (<button onClick={() => dispatch(increasePage())} className="block px-2 rounded-sm text-neutral-500"><FontAwesomeIcon icon={faChevronRight}/></button>)
      }
    </div>
  )
}