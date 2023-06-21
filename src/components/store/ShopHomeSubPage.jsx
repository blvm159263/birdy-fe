import ShopNewProductSection from "./ShopNewProductSection";
import ShopCategoryProductSection from "./ShopCategoryProductSection";
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {setCurrentViewShopSubPage} from "../../features/ui/uiSlice";
import ViewShopSubPageType from "../../constants/ViewShopSubPageType";

export default function ShopHomeSubPage() {
    const {id} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(setCurrentViewShopSubPage(ViewShopSubPageType.HOME));
    }, [dispatch])

    return (
        <>
            {/* Latest products section */}
            <ShopNewProductSection id={id}/>

            {/* Category products sections */}
            <ShopCategoryProductSection id={id} viewShopSubPageType={ViewShopSubPageType.BIRDS}/>
            <ShopCategoryProductSection id={id} viewShopSubPageType={ViewShopSubPageType.ACCESSORIES}/>
            <ShopCategoryProductSection id={id} viewShopSubPageType={ViewShopSubPageType.FOODS}/>
        </>
    )
}