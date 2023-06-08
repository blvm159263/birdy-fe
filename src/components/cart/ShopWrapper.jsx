import React from 'react'
import ProductRow from './ProductRow'

export default function ShopWrapper() {
    return (
        <div className='bg-white rounded-sm mt-4'>
            <div className='grid grid-cols-9 text-center p-2 drop-shadow-sm'>
                <div className='col-span-1'>
                    <input type='checkbox' />
                </div>
                <div className="col-span-3 text-left font-bold">
                    {'Shop Name'}
                </div>
            </div>
            <ProductRow/>
            <ProductRow/>
            <ProductRow/>
        </div>
    )
}
