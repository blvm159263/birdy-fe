import {useParams} from "react-router-dom";
import ProductCardList from "../product/ProductCardList";
import {useEffect, useState} from "react";
import shopApi from "../../api/shopApi";
import {useDispatch, useSelector} from "react-redux";
import Pagination from "../../features/search/Pagination";
import {setCurrentViewShopSubPage} from "../../features/ui/uiSlice";

export default function ShopProductsByCategorySubPage({viewShopSubPageType}) {
    const page = useSelector(state => state.search.page);
    const {id} = useParams();
    const [products, setProducts] = useState([]);
    const [totalPage, setTotalPage] = useState(1);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(setCurrentViewShopSubPage(viewShopSubPageType));

      shopApi.getShopProductsByShopIdAndCategoryId(id, viewShopSubPageType.categoryId,{page: page}).then(response => {
          console.log(response.data);
          setProducts(response.data[0]);
          setTotalPage(response.data[1]);
      }).catch(error => console.log(error));
    }, [id, page, dispatch, viewShopSubPageType]);

    return (
        <section className='bg-white rounded-sm mt-4 px-2 py-4 md:px-6'>
            <div className='flex justify-between mb-4'>
                <h1 className='text-xl font-bold'>{viewShopSubPageType.text} products</h1>
            </div>
            <ProductCardList products={products}/>
            <Pagination totalPage={totalPage} />
        </section>
    )
}