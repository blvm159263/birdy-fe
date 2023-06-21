import {faTrashCan} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import React, {useEffect, useState} from 'react'
import productApi from '../../api/productApi';
import {useDispatch, useSelector} from 'react-redux';
import {decrementQuantity, incrementQuantity, setDeleteId, toggleSelectItem} from '../../features/cart/cartSlice';
import {Link} from 'react-router-dom';
import {setShowCartDeleteModal} from "../../features/ui/uiSlice";

export default function ProductRow({id, hideControl}) {
    const [product, setProduct] = useState({});
    const quantity = useSelector(state => state.cart.items.find((item) => item.id === id).quantity);
    const selected = useSelector(state => state.cart.items.find((item) => item.id === id).selected);
    const dispatch = useDispatch();

    useEffect(() => {
        productApi.getProductById(id).then((response) => {
            setProduct(response.data);
        }).catch((error) => console.error(error));
    }, [id, selected]);

    return (
        <div className={`grid ${hideControl ? 'grid-cols-7' : 'grid-cols-9'} items-center text-center bg-white rounded-sm p-2 py-4 border-t`}>
            <div className='col-span-1' hidden={hideControl}>
                <input type='checkbox' checked={selected} onChange={() => dispatch(toggleSelectItem({id: id}))}/>
            </div>
            <Link className="flex col-span-3 items-center gap-4" to={`/detail-item/${id}`}>
                <img className='aspect-square rounded-sm w-24' src={product.imageMain} alt='product' />
                <p className='font-bold'>{product.productName}</p>
            </Link>
            <div className='col-span-1'>
                {product.categoryName}
            </div>
            <div className='col-span-1'>
                ${(product.unitPrice * (100 - product.salePtc) / 100).toFixed(2)}
            </div>
            <div className='col-span-1 flex justify-center gap-1'>
                <button
                className="border w-7 h-7 rounded-md bg-sky-200 disabled:bg-gray-100 disabled:text-gray-400 hover:bg-sky-400 hover:text-white duration-200"
                onClick={() => dispatch(decrementQuantity(id))}
                disabled={quantity === 1} hidden={hideControl}
                >-</button>
                <p className="border w-10 rounded-md text-center">{quantity}</p>
                <button
                className="border w-7 h-7 rounded-md bg-sky-200 disabled:bg-gray-100 disabled:text-gray-400 hover:bg-sky-400 hover:text-white duration-200"
                onClick={() => dispatch(incrementQuantity({id: id, quantity: 1}))}
                disabled={quantity >= product.quantity} hidden={hideControl}
                >+</button>
            </div>
            <div className='col-span-1 font-bold'>
                ${(quantity * product.unitPrice * (100 - product.salePtc) / 100).toFixed(2)}
            </div>
            <div className='col-span-1 text-red-500 hover:text-red-700 duration-200' hidden={hideControl}>
                <button onClick={() => {
                  dispatch(setShowCartDeleteModal(id));
                  dispatch(setDeleteId(id));
                }} className='p-2'><FontAwesomeIcon icon={faTrashCan} size='lg' /></button>
            </div>
        </div>
    )
}
