import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import SearchBar from '../features/search/SearchBar';

export default function NavBar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleMobileMenu = () => setShowMobileMenu(!showMobileMenu);

  return (
    <nav className="bg-gradient-to-r from-sky-500 via-blue-500 to-sky-500 border-gray-200">
      <div className="container flex flex-wrap items-center justify-between mx-auto p-3 md:p-8 relative">
        <Link to="/" className="flex items-center">
          <img src="/assets/images/logo-white.png" className="h-12 mr-3" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Birdy</span>
        </Link>
        <div className="flex flex-col">
          <SearchBar/>
          <ul className='hidden md:flex text-white justify-between pt-2'>
            <li><Link to="/search/all-products/0">All Products</Link></li>
            <li><Link to="/">Birds</Link></li>
            <li><Link to="/">Accessories</Link></li>
            <li><Link to="/">Decorations</Link></li>
          </ul>
        </div>
        <div className='flex'>
          <Link to="/cart" className="block p-2.5 mr-1 text-white" aria-current="page"><FontAwesomeIcon icon={faCartShopping} size='1x'/></Link>
          <button onClick={toggleMobileMenu} data-collapse-toggle="navbar-search" type="button" className="inline-flex items-center p-2 text-sm text-white rounded-lg md:hidden focus:outline-none" aria-controls="navbar-search" aria-expanded="false">
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
          </button>
        </div>
        
        <div className={`${showMobileMenu ? "" : "hidden"} md:hidden mobile-menu items-center justify-between w-full md:flex md:w-auto md:order-1`} id="navbar-search">
          <div className="relative mt-3 md:hidden">
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-5 h-5 text-neutral-600" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
              <span className="sr-only">Search icon</span>
            </div>
            <input type="text" id="search-navbar" className="block w-full p-2 pr-10 text-sm border text-neutral-700 border-neutral-600 rounded-sm bg-sky-500 placeholder-neutral-100 outline-sky-500 ring-black" placeholder="Search on Birdy"/>
          </div>
          <ul className="flex flex-col p-2 mt-4 gap-4 font-semibold text-white uppercase">
            <li><Link to="/">All Products</Link></li>
            <li><Link to="/">Birds</Link></li>
            <li><Link to="/">Accessories</Link></li>
            <li><Link to="/">Decorations</Link></li>
            <hr/>
            <li><Link to="/login">Sign in</Link></li>
            <li><Link to="/login">Sign up</Link></li>
            <li><Link to="/">Sell product</Link></li>
          </ul>
        </div>

        <div className='absolute top-0 right-0 hidden md:flex text-neutral-800'>
          <Link to="/" className='px-2 pt-1 mr-4'>SELL PRODUCT</Link>
          <Link to="/login" className='px-2 pt-1'>SIGN IN</Link>
          <span className='px-2 pt-[0.2rem]'>|</span>
          <Link to="/" className='px-2 pt-1'>SIGN UP</Link>
        </div>
      </div>
    </nav>
  )
}
