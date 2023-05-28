import React from 'react'
import { Link } from 'react-router-dom'

export default function StoreCard() {
  return (
    <div className='storeCard flex bg-white rounded-sm py-4 px-6'>
      <img className='w-16 h-16' src="/assets/images/avatar-empty.png" alt="avatar" />
      <div className='flex-col ml-2'>
        <h2 className='text-xl font-bold'>BIRD CAGE.LTD</h2>
        <p className='text-lg'>@cage.shop</p>
      </div>
      <div className='flex flex-col gap-2 ml-6'>
        <Link to="/search" className='block bg-gradient-to-r from-blue-500 to-sky-500 text-center basis-1/2 rounded-sm py-1 px-4 font-semibold text-white text-sm'>Chat</Link>
        <Link to="/search" className='block bg-gradient-to-r from-blue-500 to-sky-500 text-center basis-1/2 rounded-sm py-1 px-4 font-semibold text-white text-sm'>View Store</Link>
      </div>
      <div className='border border-neutral-400 ml-6'></div>
      <div className='flex-col ml-6'>
        <p className=''><span className='font-semibold'>128</span> Products</p>
        <p className=''>Rating <span className='font-semibold'>5.0</span></p>
      </div>
    </div>
  )
}
