import ShopNewProductSection from "./ShopNewProductSection";
import ShopCategoryProductSection from "./ShopCategoryProductSection";
import {useParams} from "react-router-dom";
import {useEffect} from "react";

export default function ShopHomeSubPage() {
    const {id} = useParams();

    return (
        <>
            {/* Latest products section */}
            <ShopNewProductSection id={id}/>

            {/* Category products sections */}
            <ShopCategoryProductSection id={id} categoryId={1}/>
            <ShopCategoryProductSection id={id} categoryId={2}/>
            <ShopCategoryProductSection id={id} categoryId={3}/>
        </>
    )
}