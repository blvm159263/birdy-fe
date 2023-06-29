import {useDispatch, useSelector} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {setShowCartDeleteModal} from "../../features/ui/uiSlice";
import React from "react";
import {removeItem} from "../../features/cart/cartSlice";

export default function CartDeleteConfirmModal() {
  const deleteId = useSelector(state => state.cart.deleteId);
  const isVisible = useSelector(state => state.ui.isShowCartDeleteModal);
  const dispatch = useDispatch();

  if(!isVisible) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur flex z-10 justify-center items-center p-2'>
      <div className='relative px-6 py-8 w-[500px] rounded shadow border bg-white text-center'>
        <button onClick={() => dispatch(setShowCartDeleteModal(false))} className='absolute top-0 right-0'>
          <FontAwesomeIcon className='p-2 text-neutral-400 hover:text-neutral-500 active:text-neutral-900 duration-200' icon={faXmark} size="xl"/>
        </button>
        <h2 className='text-xl font-bold'>Confirm delete</h2>
        <p className='py-6'>Are you sure you want to delete this item?</p>
        <div className='flex justify-center gap-4'>
          <button onClick={() => dispatch(setShowCartDeleteModal(false))} className='py-1 px-8 rounded-sm text-white bg-gradient-to-r from-neutral-400 via-neutral-500 to-neutral-400'>Cancel</button>
          <button onClick={() => {
            dispatch(removeItem(deleteId));
            dispatch(setShowCartDeleteModal(false));
          }} className='py-1 px-8 rounded-sm text-white bg-gradient-to-r from-red-500 via-red-600 to-red-400'>Delete</button>
        </div>
      </div>
    </div>
  )
}