import {faMinus, faPlus, faStar, faXmark} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  togglePriceFilter,
  toggleRatingFilter,
  updatePriceFilter,
  updateRatingFilter
} from '../features/search/searchSlice';
import {toggleFilterSideBar} from '../features/ui/uiSlice';
import {Slider} from 'antd';
import {MAX_FILTER_PRICE} from '../constants/Constants'
import {ControlOutlined, DollarOutlined, StarOutlined} from "@ant-design/icons";

export default function FilterSideBar() {
  const isShowing = useSelector(state => state.ui.isShowFilterSideBar);
  const rating = useSelector(state => state.search.rating);
  const fromPrice = useSelector(state => state.search.fromPrice);
  const toPrice = useSelector(state => state.search.toPrice);
  const dispatch = useDispatch();

  return (
    <aside className={`fixed top-0 right-0 h-screen bg-white w-[350px] ${isShowing ? '' : 'translate-x-full'} transition-transform p-6`}>
      <div className='flex text-neutral-500 justify-between items-center'>
        <p></p>
        <p className='font-bold'><ControlOutlined /> Bộ lọc</p>
        <button className='justify-self-end p-2' onClick={() => dispatch(toggleFilterSideBar())}><FontAwesomeIcon icon={faXmark} size='xl'/></button>
      </div>
      {/* <hr className='my-6'/> */}
      <div className='mt-7'>
        <div className='flex justify-between items-center'>
          <p className='ml-4'><StarOutlined />  Đánh giá</p>
          <button onClick={() => dispatch(toggleRatingFilter())} className='p-2'>{rating !== undefined ? <FontAwesomeIcon icon={faMinus}/> : <FontAwesomeIcon icon={faPlus}/>}</button>
        </div>
        {rating !== undefined ? (
          <div>
            <p className='text-center text-yellow-500 font-bold'>{rating} <FontAwesomeIcon icon={faStar} size='sm'/></p>
            <Slider defaultValue={rating} min={1} max={5} onAfterChange={(value) => dispatch(updateRatingFilter(value))}/>
          </div>) : ''}
      </div>
      <div className='mt-7'>
        <div className='flex justify-between items-center'>
          <p className='ml-4'><DollarOutlined />  Khoảng giá</p>
          <button onClick={() => dispatch(togglePriceFilter())} className='p-2'>{fromPrice !== undefined ? <FontAwesomeIcon icon={faMinus}/> : <FontAwesomeIcon icon={faPlus}/>}</button>
        </div>
        {fromPrice !== undefined ? (
          <div>
            <p className='text-center text-orange-500 font-bold'>${fromPrice} - ${toPrice}</p>
            <Slider range defaultValue={[fromPrice, toPrice]} min={0} max={MAX_FILTER_PRICE} onAfterChange={([fromPrice, toPrice]) => dispatch(updatePriceFilter({fromPrice: fromPrice, toPrice: toPrice}))}/>
          </div>) : ''}
      </div>
    </aside>
  )
}
