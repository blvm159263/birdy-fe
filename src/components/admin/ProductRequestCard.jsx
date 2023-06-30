import React, {useContext} from 'react'
import {Link} from "react-router-dom";
import adminApi from "../../api/adminApi";
import {NotificationContext} from "../../context/NotificationProvider";

export default function ProductRequestCard({product}) {
  const openNotificationWithIcon = useContext(NotificationContext);

  function onApprove() {
    adminApi.approveProductById(product.id).then((response) => {
      if(response.status === 200) {
        openNotificationWithIcon('success', 'Approved product ' + product.productName);
      }
    }).catch((error) => {
      openNotificationWithIcon('error', 'Error while approving product');
    })
  }

  return (
    // TODO: Show product details
    <div onClick={() => null} className="productRequestCard cursor-pointer bg-white rounded border shadow hover:border-neutral-300 duration-200">
      <img src={product.imageMain} className='h-56 w-full object-cover' alt={product.productName}/>
      <div className='p-3'>
        <div className='flex justify-between'>
          <p className='font-bold text-lg'>{product.productName}</p>
          <p className='font-black text-orange-500'>${product.unitPrice}</p>
        </div>
        <div className='flex justify-between'>
          <span className='font-semibold'>Category:</span>
          <p>{product.categoryName}</p>
        </div>
        <hr className='my-3'/>
        <p className='text-sm'>Requested by</p>
        <Link to={`/view-shop/${product.shopId}`} className='font-semibold underline hover:text-neutral-500 active:text-neutral-700 duration-200'>{product.shopName}</Link>
        <button onClick={() => onApprove()} className='w-full bg-gradient-to-r from-green-300 via-green-500 to-green-400 p-1 mt-3 rounded-lg border border-green-400 font-semibold hover:brightness-110 active:brightness-95 duration-200'>Approve</button>
      </div>
    </div>
  )
}
