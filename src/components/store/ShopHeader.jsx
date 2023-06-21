import StoreCard from "./StoreCard";
import {Link} from "react-router-dom";
import {useParams} from "react-router";
import {useEffect, useState} from "react";
import shopApi from "../../api/shopApi";
import {useSelector} from "react-redux";
import ViewShopSubPageType from "../../constants/ViewShopSubPageType";

export default function ShopHeader() {
    const {id} = useParams();
    const currentViewShopSubPage = useSelector(state => state.ui.currentViewShopSubPage);
    const [shop, setShop] = useState();

    useEffect(() => {
        shopApi.getShopDetailByShopId(id).then((response) => {
            setShop(response.data[0]);
            console.log("Id: " + id);
            console.log(response.data);
            console.log("currentViewShopSubPage: " + currentViewShopSubPage);
        }).catch(error => console.log(error));
    }, [id, currentViewShopSubPage]);

    return (
        <>
            {shop && <StoreCard shop={shop} hideView/>}
            <ul className={'bg-white rounded-sm flex justify-between px-24 py-2'}>
                {
                    Object.values(ViewShopSubPageType).map((subPage) => (
                      <li className={currentViewShopSubPage === subPage ? 'font-bold' : ''}>
                          <Link to={`/view-shop/${id}/${subPage.path}`}>{subPage.text}</Link>
                          {currentViewShopSubPage === subPage ? <span className={'block h-1 bg-sky-500 rounded-full'}/> : ''}
                      </li>
                    ))
                }
            </ul>
        </>
    )
}