import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

export default function StoreCard({shop}) {
  return (
    <div className='storeCard flex flex-wrap bg-white rounded-sm py-4 px-2 md:px-6'>
      <div className='flex mr-2 md:mr-6'>
        <img className='w-12 h-12 md:w-16 md:h-16 mb-4' src="/assets/images/avatar-empty.png" alt="avatar" />
        <div className='ml-2 mr-2 md:mr-6'>
          <h2 className='text-xs md:text-xl font-bold'>{shop.shopName}</h2>
          <p className='text-xs md:text-lg'>@{shop.shopName}</p>
        </div>
        <div className=''>
          <Link to="/search" className='block bg-gradient-to-r from-blue-500 to-sky-500 text-center rounded-sm py-1 px-2 md:px-8 font-semibold text-white text-xs md:text-sm mb-1'>Chat</Link>
          <Link to={`/view-shop/${shop.id}`} className='block bg-gradient-to-r from-blue-500 to-sky-500 text-center rounded-sm py-1 px-2 md:px-8 font-semibold text-white text-xs md:text-sm'>View</Link>
        </div>
      </div>
      <div className='border border-neutral-100 mr-2 md:mr-6 hidden lg:block' />
      <div className='col-span-4 mr-2 md:mr-6'>
        {/* TODO: Store total product */}
        <p className='text-xs md:text-base'><span className='font-semibold'>{'24'}</span> Products</p>
        {/* TODO: Store rating */}
        <p className='text-xs md:text-base pt-1'>Rating <span className='font-semibold'>4.0</span></p>
        <div className="items-center flex">
          {[...Array(5)].map((x, i) => (
              <svg key={i} aria-hidden="true" className={`w-3 h-3 md:w-5 md:h-5 ${i < 4 ? "text-yellow-400" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <title>{i}th star</title>
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
          ))}
          <p className="ml-2 text-xs md:text-sm font-medium text-gray-500 dark:text-gray-400">(3)</p>
        </div>
      </div>
      <div className='border border-neutral-100 mr-2 md:mr-6 hidden lg:block' />
      <div className='flex items-center'>
        <FontAwesomeIcon className='text-sky-500 pr-2 md:pr-4 w-6 h-6 md:w-8 md:h-8' icon={faLocationDot} size='2x' />
        <p className='text-xs md:text-base'>{shop.address}</p>
      </div>
    </div>
  )
}
