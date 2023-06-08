import React from 'react'
import ShopWrapper from '../components/cart/ShopWrapper'

export default function CartPage() {
  return (
    <div id='cardPage' className='bg-neutral-100 py-6 pb-12'>
      <section className='container mx-auto'>
        <div className='grid grid-cols-9 text-center bg-white rounded-sm p-2'>
          <div className='col-span-1'>
            <input type='checkbox' />
          </div>
          <div className="col-span-3 text-left font-bold">
            Product
          </div>
          <div className='col-span-1'>
            Type
          </div>
          <div className='col-span-1'>
            Price
          </div>
          <div className='col-span-1'>
            Quantity
          </div>
          <div className='col-span-1 font-bold'>
            Total
          </div>
          <div className='col-span-1'>
          </div>
        </div>
        <ShopWrapper />
        <ShopWrapper />
        <div className='bg-white rounded-sm mt-4 grid grid-cols-9 items-center text-center p-2 drop-shadow-sm'>
          <div className='col-span-1'>
            <input type='checkbox' />
          </div>
          <div className="col-span-1 text-left">
            Choose All
          </div>
          <div className="col-span-2 text-red-500 font-bold">
            <button>Delete Selected</button>
          </div>
          <div className="col-span-3">
            Total (<span className='font-bold'>{'2'}</span> products): <span className='font-bold'>{'$129.00'}</span>
          </div>
          <div className="col-span-2">
            <button className='py-1 px-4 w-full rounded-sm text-white bg-gradient-to-r from-sky-500 via-sky-600 to-sky-400'>Checkout</button>
          </div>
        </div>
      </section>
    </div>
  )
}
