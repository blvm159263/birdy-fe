import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useState } from 'react';
import productApi from '../../api/productApi';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrementQuantity, incrementQuantity, removeItem } from '../../features/cart/cartSlice';
import { Link } from 'react-router-dom';

export default function ProductRow({id}) {
    const [product, setProduct] = useState({});
    const quantity = useSelector(state => state.cart.items.find((item) => item.id === id).quantity);
    const dispatch = useDispatch();

    useEffect(() => {
        productApi.getProductById(id).then((response) => {
            setProduct(response.data);
        }).catch((error) => console.error(error));
    }, []);

    return (
        <div className='grid grid-cols-9 items-center text-center bg-white rounded-sm p-2 py-4 border-t'>
            <div className='col-span-1'>
                <input type='checkbox' />
            </div>
            <Link className="flex col-span-3 items-center gap-4" to={`/detail-item/${id}`}>
                <img className='aspect-square rounded-sm w-24' src='/assets/images/product-demo.png' alt='product' />
                <p className='font-bold'>{product.productName}</p>
            </Link>
            <div className='col-span-1'>
                {product.categoryName}
            </div>
            <div className='col-span-1'>
                ${(product.unitPrice * (100 - product.salePtc) / 100).toFixed(2)}
            </div>
            <div className='col-span-1 flex gap-1'>
                <button
                className="border w-7 h-7 rounded-md bg-sky-200 disabled:bg-gray-100 disabled:text-gray-400 hover:bg-sky-400 hover:text-white duration-200"
                onClick={() => dispatch(decrementQuantity(id))}
                disabled={quantity === 1}
                >-</button>
                <p className="border w-10 rounded-md text-center">{quantity}</p>
                <button
                className="border w-7 h-7 rounded-md bg-sky-200 disabled:bg-gray-100 disabled:text-gray-400 hover:bg-sky-400 hover:text-white duration-200"
                onClick={() => dispatch(incrementQuantity({id: id, quantity: 1}))}
                disabled={quantity >= product.quantity}
                >+</button>
            </div>
            <div className='col-span-1 font-bold'>
                ${(quantity * product.unitPrice * (100 - product.salePtc) / 100).toFixed(2)}
            </div>
            <div className='col-span-1 text-red-500 hover:text-red-700 duration-200'>
                <button onClick={() => dispatch(removeItem(id))} className='p-2'><FontAwesomeIcon icon={faTrashCan} size='lg' /></button>
            </div>
        </div>
    )
}
