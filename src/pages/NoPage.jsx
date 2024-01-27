import React from 'react'
import { Link } from 'react-router-dom'

export default function NoPage() {
  return (
    <div className='bg-neutral-100'>
      <div className='container mx-auto grid grid-cols-12 justify-center items-center pb-16'>
        <img className='col-span-12 md:col-span-8' src='/assets/images/404-illustration.png' alt='404 illustration' />
        <div className='col-span-12 md:col-span-4'>
          <h2 className='text-4xl font-black'>U ồ...</h2>
          <p className='font-semibold'>Trang bạn đang tìm kiếm không tồn tại</p>
          <Link to="/" className={`block text-center mt-3 p-4 h-12 w-full rounded shadow bg-gradient-to-r from-sky-500 to-sky-700 text-white font-bold hover:brightness-125 active:brightness-110 duration-150`}>Trở về trang chủ</Link>
        </div>
      </div>
    </div>
  )
}
