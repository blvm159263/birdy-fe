import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import shopApi from '../../api/shopApi';
import {deSelectAllItemsInShop, selectAllItemsInShop} from '../../features/cart/cartSlice';
import ProductRow from './ProductRow';

export default function ShopWrapper({shopId, itemsInShop, hideControl}) {
    const [shop, setShop] = useState({shopName: 'null'});
    const selected = itemsInShop.filter(item => item.selected === false).length === 0;
    const dispatch = useDispatch();

    useEffect(() => {
        shopApi.getShopInformationByShopId(shopId).then((response) => {
            setShop(response.data);
        }).catch((error) => console.error(error));
    }, [shopId]);

    return (
        <div className='bg-white rounded-sm mt-4'>
            <div className='grid grid-cols-9 text-center p-2 drop-shadow-sm'>
                <div className='col-span-1' hidden={hideControl}>
                    <input type='checkbox' checked={selected} onChange={() => selected ? dispatch(deSelectAllItemsInShop({shopId: shopId})) : dispatch(selectAllItemsInShop({shopId: shopId}))}/>
                </div>
                <div className="col-span-3 text-left font-bold">
                    {shop.shopName}
                </div>
            </div>
            {
                itemsInShop.map(item => <ProductRow key={item.id} id={item.id} hideControl={hideControl}/>)
            }
        </div>
    )
}
