import React, { useState } from 'react'
import ProductRow from './ProductRow'
import { useEffect } from 'react'
import shopApi from '../../api/shopApi';

export default function ShopWrapper({shopId, itemsInShop}) {
    const [shop, setShop] = useState({shopName: 'null'});

    useEffect(() => {
        shopApi.getShopInformationByShopId(shopId).then((response) => {
            setShop(response.data);
        }).catch((error) => console.error(error));
    }, []);

    return (
        <div className='bg-white rounded-sm mt-4'>
            <div className='grid grid-cols-9 text-center p-2 drop-shadow-sm'>
                <div className='col-span-1'>
                    <input type='checkbox' />
                </div>
                <div className="col-span-3 text-left font-bold">
                    {shop.shopName}
                </div>
            </div>
            {
                itemsInShop.map(item => <ProductRow key={item.id} id={item.id}/>)
            }
        </div>
    )
}
