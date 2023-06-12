import React from 'react'
import ShopWrapper from '../components/cart/ShopWrapper'
import { useDispatch, useSelector } from 'react-redux'
import { deSelectAllItems, deleteAllSelected, selectAllItems } from '../features/cart/cartSlice';
import { Link } from 'react-router-dom';

export default function CartPage() {
  const items = useSelector(state => state.cart.items);
  const shopIds = items.map(item => item.shopId).filter((shopId, index, shopIds) => shopIds.indexOf(shopId) === index);
  const selected = items.filter(item => item.selected === false).length === 0;
  const totalProduct = useSelector(state => state.cart.totalProduct);
  const totalPrice = useSelector(state => state.cart.totalPrice);
  const dispatch = useDispatch();

  return (
    <div id='cardPage' className='bg-neutral-100 py-6 pb-12'>
      <section className='container mx-auto'>
        <div className='grid grid-cols-9 text-center bg-white rounded-sm p-2'>
          <div className='col-span-1'>
            <input type='checkbox' checked={selected} onChange={() => selected ? dispatch(deSelectAllItems()) : dispatch(selectAllItems())}/>
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
        {shopIds.map(shopId => {
          const itemsInShop = items.filter(item => item.shopId === shopId);
          return <ShopWrapper key={shopId} shopId={shopId} itemsInShop={itemsInShop}/>
        })}
        <div className='bg-white rounded-sm mt-4 grid grid-cols-9 items-center text-center p-2 drop-shadow-sm'>
          <div className='col-span-1'>
            <input type='checkbox' checked={selected} onChange={() => selected ? dispatch(deSelectAllItems()) : dispatch(selectAllItems())}/>
          </div>
          <div className="col-span-1 text-left">
            Choose All
          </div>
          <div className="col-span-2 text-red-500 font-bold">
            <button onClick={() => dispatch(deleteAllSelected())}>Delete Selected</button>
          </div>
          <div className="col-span-3">
            Total (<span className='font-bold'>{totalProduct}</span> products): <span className='font-bold'>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="col-span-2">
            {totalProduct === 0 ?
            (<span to="/cart/checkout" className='py-1 px-4 w-full rounded-sm text-white bg-gradient-to-r from-neutral-500 via-neutral-600 to-neutral-400'>Checkout</span>) :
            (<Link to="/cart/checkout" className='py-1 px-4 w-full rounded-sm text-white bg-gradient-to-r from-sky-500 via-sky-600 to-sky-400'>Checkout</Link>)}
          </div>
        </div>
      </section>
    </div>
  )
}
