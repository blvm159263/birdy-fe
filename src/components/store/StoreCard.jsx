import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

export default function StoreCard() {
  return (
    <div className='storeCard flex bg-white rounded-sm py-4 px-2 md:px-6'>
      <div className='flex flex-col md:flex-row grow'>
        <div className='flex justify-between'>
          <div className='flex flex-col md:flex-row justify-start'>
            <div className='flex'>
              <img className='w-8 h-8 lg:w-16 lg:h-16' src="/assets/images/avatar-empty.png" alt="avatar" />
              <div className='flex-col ml-2'>
                <h2 className='text-sm lg:text-xl font-bold'>BIRD CAGE.LTD</h2>
                <p className='text-xs lg:text-lg'>@cage.shop</p>
              </div>
            </div>
            <div className='flex flex-row md:flex-col gap-2 md:ml-6 pt-2 md:pt-0'>
              <Link to="/search" className='block bg-gradient-to-r from-blue-500 to-sky-500 text-center basis-1/2 rounded-sm py-1 px-2 lg:px-8 font-semibold text-white text-xs md:text-sm'>Chat</Link>
              <Link to="/search" className='block bg-gradient-to-r from-blue-500 to-sky-500 text-center basis-1/2 rounded-sm py-1 px-2 lg:px-8 font-semibold text-white text-xs md:text-sm'>View</Link>
            </div>
          </div>
          <div className='border border-neutral-200 mx-2 md:mx-4 lg:mx-6 xl:mx-12 hidden md:block' />
          <div className='flex-col'>
            <p className='text-xs md:text-base'><span className='font-semibold'>128</span> Products</p>
            <p className='text-xs md:text-base pt-2'>Rating <span className='font-semibold'>5.0</span></p>
            <div className="items-center flex">
              <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Second star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Third star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fourth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              <svg aria-hidden="true" className="w-5 h-5 text-gray-300 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fifth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">(102)</p>
            </div>
          </div>
          <div className='border border-neutral-200 mx-2 md:mx-4 lg:mx-6 xl:mx-12 hidden md:block' />
        </div>
        <div className='flex items-center mt-2'>
          <FontAwesomeIcon className='text-sky-500 pr-6' icon={faLocationDot} size='2x' />
          <p className='text-xs md:text-base'>FPTU, District 9, Thu Duc City, Ho Chi Minh City</p>
        </div>
      </div>
    </div>
  )
}
