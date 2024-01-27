import React from 'react'
import ShopWrapper from '../components/cart/ShopWrapper'
import {useDispatch, useSelector} from 'react-redux'
import {deSelectAllItems, selectAllItems} from '../features/cart/cartSlice';
import {Link} from 'react-router-dom';
import CartDeleteConfirmModal from "../components/cart/CartDeleteConfirmModal";
import {setShowCartDeleteAllSelectedModal} from "../features/ui/uiSlice";
import CartDeleteAllSelectedConfirmModal from "../components/cart/CartDeleteAllSelectedConfirmModal";

export default function CartPage() {
  const items = useSelector(state => state.cart.items);
  const shopIds = items.map(item => item.shopId).filter((shopId, index, shopIds) => shopIds.indexOf(shopId) === index);
  const selected = items.filter(item => item.selected === false).length === 0;
  const totalSelectedProduct = items.filter(item => item.selected === true).reduce((total, {quantity}) => total + quantity, 0);
  const totalSelectedPrice = items.filter(item => item.selected === true).reduce((total, {quantity, price}) => total + quantity * price, 0);
  const dispatch = useDispatch();

  return (
    <div id='cardPage' className='bg-neutral-100 py-6 pb-12'>
      <CartDeleteConfirmModal/>
      <CartDeleteAllSelectedConfirmModal/>
      <section className='container mx-auto'>
        <div className='grid grid-cols-9 text-center bg-white rounded-sm p-2'>
          <div className='col-span-1'>
            <input type='checkbox' checked={selected} onChange={() => selected ? dispatch(deSelectAllItems()) : dispatch(selectAllItems())}/>
          </div>
          <div className="col-span-3 text-left font-bold">
            Sản phẩm
          </div>
          <div className='col-span-1'>
            Loại
          </div>
          <div className='col-span-1'>
            Giá
          </div>
          <div className='col-span-1'>
            Số lượng
          </div>
          <div className='col-span-1 font-bold'>
            Tổng
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
            Chọn tất cả
          </div>
          <div className="col-span-2 text-red-500 font-bold">
            {totalSelectedProduct === 0 ?
              <span className='text-neutral-500'>Xóa sản phẩm đang chọn</span> :
              <button onClick={() => dispatch(setShowCartDeleteAllSelectedModal(true))}>Xóa sản phẩm đang chọn</button>}
          </div>
          <div className="col-span-3">
            Tổng (<span className='font-bold'>{totalSelectedProduct}</span> sản phẩm): <span className='font-bold'>${totalSelectedPrice.toFixed(2)}</span>
          </div>
          <div className="col-span-2">
            {totalSelectedProduct === 0 ?
            (<span className='py-1 px-4 w-full rounded-sm text-white bg-gradient-to-r from-neutral-500 via-neutral-600 to-neutral-400'>Thánh toán</span>) :
            (<Link to="/cart/checkout" className='py-1 px-4 w-full rounded-sm text-white bg-gradient-to-r from-sky-500 via-sky-600 to-sky-400'>Thánh toán</Link>)}
          </div>
        </div>
      </section>
    </div>
  )
}
