import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import shopApi from "../../api/shopApi";
import ProductCardList from "../product/ProductCardList";

export default function ShopCategoryProductSection({id, viewShopSubPageType}) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    shopApi.getShopProductsByShopIdAndCategoryId(id, viewShopSubPageType.categoryId, {page: 0}).then(response => {
      console.log(response.data[0]);
      setProducts(response.data[0]);
    }).catch(error => console.log(error));
  }, [id, viewShopSubPageType.categoryId]);

  return (
    <section className='bg-white rounded-sm mt-4 px-2 py-4 md:px-6'>
      <div className='flex justify-between mb-4'>
        <h1 className='text-xl font-bold'>{viewShopSubPageType.text}</h1>
        <Link to={`/view-shop/${id}/${viewShopSubPageType.path}`} className='font-semibold underline'>View all {viewShopSubPageType.text} <FontAwesomeIcon className='ml-1' icon={faChevronRight} size={"sm"}/></Link>
      </div>
      <ProductCardList products={products.slice(0, 5)}/>
    </section>
  )
}