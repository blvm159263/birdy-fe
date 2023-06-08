import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function ProductRow() {
    return (
        <div className='grid grid-cols-9 items-center text-center bg-white rounded-sm p-2 py-4 border-t'>
            <div className='col-span-1'>
                <input type='checkbox' />
            </div>
            <div className="flex col-span-3 items-center gap-4">
                <img className='aspect-square rounded-sm w-24' src='/assets/images/product-demo.png' alt='product' />
                <p className='font-bold'>{'Product Name'}</p>
            </div>
            <div className='col-span-1'>
                {'Bird'}
            </div>
            <div className='col-span-1'>
                {'$29.00'}
            </div>
            <div className='col-span-1'>
                {'1'}
            </div>
            <div className='col-span-1 font-bold'>
                {'$29.00'}
            </div>
            <div className='col-span-1 text-red-500'>
                <button className='p-2'><FontAwesomeIcon icon={faTrashCan} size='lg' /></button>
            </div>
        </div>
    )
}
