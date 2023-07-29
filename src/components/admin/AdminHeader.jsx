import {resetAllState} from "../../features/search/searchSlice";
import {Link} from "react-router-dom";
import React from "react";
import {useDispatch} from "react-redux";

export default function AdminHeader() {
  const dispatch = useDispatch();

  return (
    <header className='bg-gradient-to-r from-sky-500 via-blue-500 to-sky-500 border-gray-200 p-4'>
      <Link to="/admin" className="flex items-center" onClick={() => dispatch(resetAllState())}>
        <img
          src="/assets/images/btp.png"
          className="h-4 md:h-8 mr-3"
          alt="Birdy Logo"
        />
        <span className="self-center text-lg md:text-xl lg:text-2xl font-semibold whitespace-nowrap dark:text-white">Birdy admin</span>
      </Link>
    </header>
  )
}