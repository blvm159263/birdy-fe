import StoreCard from "./StoreCard";
import {Link} from "react-router-dom";
import SearchType from "../../constants/SearchType";
import {useParams} from "react-router";
import {useEffect, useState} from "react";
import shopApi from "../../api/shopApi";

export default function ShopHeader() {
    const {id} = useParams();
    const [shop, setShop] = useState();
    const {searchType} = useParams();

    useEffect(() => {
        shopApi.getShopDetailByShopId(id).then((response) => {
            setShop(response.data[0]);
            console.log("Id: " + id);
            console.log(response.data[0]);
        }).catch(error => console.log(error));
    }, []);
    
    return (
        <>
            {shop && <StoreCard shop={shop}/>}
            <ul className={'bg-white rounded-sm flex justify-between px-24 py-2'}>
                <li className={'font-bold'}>
                    <Link to={`/view-store/${id}`}>Home</Link>
                    {searchType === undefined ? <span className={'block h-1 bg-sky-500 rounded-full'}/> : ''}
                </li>
                <li><Link to={`/view-shop/${id}/${SearchType.ALL_PRODUCT.text}`}>All products</Link></li>
                <li><Link to={`/view-shop/${id}/${SearchType.ALL_PRODUCT.text}`}>Latest</Link></li>
                <li><Link to={`/view-shop/${id}/${SearchType.BIRD.text}`}>Birds</Link></li>
                <li><Link to={`/view-shop/${id}/${SearchType.ACCESSORY.text}`}>Accessories</Link></li>
                <li><Link to={`/view-shop/${id}/${SearchType.FOOD.text}`}>Foods</Link></li>
            </ul>
        </>
    )
}