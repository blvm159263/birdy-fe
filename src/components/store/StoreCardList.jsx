import React from 'react'
import StoreCard from './StoreCard'

export default function StoreCardList({shops}) {
  return (
    <div className='storeCardList grid gap-2'>
      {shops.map((shop) => (<StoreCard key={shop.id} shop={shop}/>))}
    </div>
  )
}
