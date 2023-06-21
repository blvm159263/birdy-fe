import {useParams} from "react-router-dom";
import ProductCardList from "../product/ProductCardList";
import {useEffect, useState} from "react";
import shopApi from "../../api/shopApi";
import {useSelector} from "react-redux";
import Pagination from "../../features/search/Pagination";

export default function ShopAllProductsSubPage() {
    const page = useSelector(state => state.search.page);
    const {id} = useParams();
    const [products, setProducts] = useState([]);
    const [totalPage, setTotalPage] = useState(1);

    useEffect(() => {
        shopApi.getAllShopProducts(id, {page: page}).then(response => {
            console.log(response.data);
            setProducts(response.data[0]);
            setTotalPage(response.data[1]);
        }).catch(error => console.log(error));
    }, [page]);

    return (
        <section className='bg-white rounded-sm mt-4 px-2 py-4 md:px-6'>
            <div className='flex justify-between mb-4'>
                <h1 className='text-xl font-bold'>All products</h1>
            </div>
            <ProductCardList products={products}/>
            <Pagination totalPage={totalPage} />
        </section>
    )
}