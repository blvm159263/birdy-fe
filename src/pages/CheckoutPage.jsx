import React, { useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import ShopWrapper from '../components/cart/ShopWrapper';
import { useEffect } from 'react';
import { LoginContext } from '../context/LoginProvider';
import { useNavigate } from 'react-router-dom';
import userApi from '../api/userApi';
import jwtDecode from 'jwt-decode';
import storageService from '../api/storage';
import { HttpStatusCode } from 'axios';

export default function CheckoutPage() {
    const navigate = useNavigate();

    const { isLogin } = useContext(LoginContext);

    const items = useSelector(state => state.cart.items.filter(item => item.selected === true));
    const shopIds = items.map(item => item.shopId).filter((shopId, index, shopIds) => shopIds.indexOf(shopId) === index);
    const totalProduct = useSelector(state => state.cart.totalProduct);
    const totalPrice = useSelector(state => state.cart.totalPrice);
    const [address, setAddress] = useState('');
    const [user, setUser] = useState();

    useEffect(() => {
        if(!isLogin){
            navigate('/login');
            return;
        }
        window.scrollTo(0, 0);
        var token = jwtDecode(storageService.getAccessToken());
        getUser(token);
    }, []);

    var getUser = async (token) =>{
        let userId;
        await userApi.getUserByPhoneNumber(token.sub).then(res => {
            setUser(res.data);
            userId = res.data.id;
        })
        await userApi.getDefaultAddress(userId).then(res => {
            setAddress(res.data.address);
        })
    }

    return (
        <div id='checkout' className='bg-neutral-100 py-6 pb-12'>
            
            <section className='container mx-auto'>
            <div className='grid grid-cols-7 text-center bg-white rounded-sm p-2'>
                    <div className="col-span-3 text-left font-bold">
                        Địa chỉ nhận hàng
                    </div>
                </div>
                <div className='grid grid-cols-7 text-center bg-white rounded-sm p-2'>
                    <div className="col-span-2 text-left ">
                        {user?.fullName}
                    </div>
                    <div className='col-span-4'>
                        {address? address : 'Chưa có địa chỉ nhận hàng'}
                    </div>
                    <div className='col-span-1 underline text-cyan-500'>
                        <a href=''>Thay đổi</a>
                    </div>
                </div>

                <div className='grid grid-cols-7 text-center bg-white rounded-sm p-2 mt-3'>
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
                </div>
                {shopIds.map(shopId => {
                const itemsInShop = items.filter(item => item.shopId === shopId);
                return <ShopWrapper key={shopId} shopId={shopId} itemsInShop={itemsInShop} hideControl={true}/>
                })}
                <div className='bg-white rounded-sm mt-4 flex justify-between gap-4 items-center text-center p-2 drop-shadow-sm'>
                    <div className="col-span-3 font-bold">
                        Shipping address:
                        <input type="text" className='bg-neutral-100 ml-3 py-1 px-3 rounded-md text-sm font-normal placeholder:text-neutral-400 placeholder:italic' placeholder='address...' value={address} onChange={e => setAddress(e.target.value)}/>
                    </div>
                    <div className="col-span-3">
                        Total (<span className='font-bold'>{totalProduct}</span> products): <span className='font-bold'>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="col-span-2">
                        {totalProduct === 0 ?
                        (<span to="/cart/checkout" className='py-1 px-4 w-full rounded-sm text-white bg-gradient-to-r from-neutral-500 via-neutral-600 to-neutral-400'>Checkout</span>) :
                        (<button to="/cart/checkout" className='py-1 px-4 w-full rounded-sm text-white bg-gradient-to-r from-sky-500 via-sky-600 to-sky-400'>Checkout</button>)}
                    </div>
                </div>
            </section>
        </div>
    )
}
