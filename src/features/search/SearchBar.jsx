import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSearchText } from './searchSlice';

export default function SearchBar() {
    const searchText = useSelector((state) => state.search.searchText);
    const dispatch = useDispatch();

    return (
        <div className="searchBar relative hidden md:block min-w-[400px]">
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-5 h-5 text-neutral-600" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
              <span className="sr-only">Search icon</span>
            </div>
            <input value={searchText} onChange={e => dispatch(updateSearchText(e.target.value))} type="text" id="search-navbar" className="block w-full p-2 pr-10 text-sm border text-neutral-700 border-neutral-600 rounded-sm bg-sky-500 placeholder-neutral-100 outline-sky-500 ring-black" placeholder="Search on Birdy"/>
        </div>
    )
}