import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {triggerSearch, updateSearchText} from './searchSlice';
import {Link} from "react-router-dom";

export default function SearchBar({forMobile = false}) {
    const searchText = useSelector(state => state.search.searchText);
    const searchType = useSelector(state => state.search.searchType);
    const dispatch = useDispatch();

    return (
        <div className={`searchBar ${forMobile ? "md:hidden pt-4" : "hidden md:block"} relative min-w-[400px]`}>
            <Link to={`/search/${searchType.text}`} onClick={() => dispatch(triggerSearch())} className="bg-sky-400 hover:brightness-110 active:brightness-95 duration-200 border border-neutral-500 absolute inset-y-1 right-1 w-12 flex items-center justify-center">
                <svg className="w-5 h-5 text-neutral-600" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                <span className="sr-only">Search icon</span>
            </Link>
            <input value={searchText} onKeyDown={(e) => e.key === "Enter" ? dispatch(triggerSearch()) : ''} onChange={e => dispatch(updateSearchText(e.target.value))} type="text" id="search-navbar" className="block w-full p-2 pr-10 text-sm border text-neutral-700 border-neutral-600 rounded-sm bg-sky-500 placeholder-neutral-100 outline-0" placeholder="Tìm kiếm sản phẩm"/>
        </div>
    )
}
