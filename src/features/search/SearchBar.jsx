import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {updateSearchText} from './searchSlice';
import {createSearchParams, Link} from 'react-router-dom';

export default function SearchBar({forMobile = false}) {
    const searchText = useSelector((state) => state.search.searchText);
    const searchType = useSelector((state) => state.search.searchType);
    const sortType = useSelector((state) => state.search.sortType);
    const rating = useSelector((state) => state.search.rating);
    const fromPrice = useSelector((state) => state.search.fromPrice);
    const toPrice = useSelector((state) => state.search.toPrice);
    const page = useSelector((state) => state.search.page);
    const dispatch = useDispatch();

    return (
        <div className={`searchBar ${forMobile ? "md:hidden pt-4" : "hidden md:block"} relative min-w-[400px]`}>
            <Link to={{
                pathname: `/search/${searchType.text}`,
                search: createSearchParams({
                    search: searchText,
                    ...rating !== undefined && {rating: rating},
                    ...fromPrice !== undefined && {fromPrice: fromPrice},
                    ...toPrice !== undefined && {toPrice: toPrice},
                    ...page !== undefined && {page: page},
                    ...sortType !== undefined && {sortType: sortType}
                }).toString()
            }} className="bg-sky-400 hover:bg-sky-300 border border-neutral-500 absolute inset-y-1 right-1 w-12 flex items-center justify-center">
                <svg className="w-5 h-5 text-neutral-600" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                <span className="sr-only">Search icon</span>
            </Link>
            <input value={searchText} onChange={e => dispatch(updateSearchText(e.target.value))} type="text" id="search-navbar" className="block w-full p-2 pr-10 text-sm border text-neutral-700 border-neutral-600 rounded-sm bg-sky-500 placeholder-neutral-100 outline-sky-500 ring-black" placeholder="Search on Birdy"/>
        </div>
    )
}
