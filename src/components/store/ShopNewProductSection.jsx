import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import shopApi from "../../api/shopApi";
import ProductCardList from "../product/ProductCardList";
import ViewShopSubPageType from "../../constants/ViewShopSubPageType";

export default function ShopNewProductSection({id}) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    shopApi.getLatestShopProductsByShopId(id, {page: 0}).then(response => {
      console.log(response.data[0]);
      setProducts(response.data[0]);
    }).catch(error => console.log(error));
  }, [id]);

  return (
    <section className='bg-white rounded-sm mt-4 px-2 py-4 md:px-6'>
      <div className='flex justify-between mb-4'>
        <h1 className='text-xl font-bold'>New products</h1>
        <Link to={`/view-shop/${id}/${ViewShopSubPageType.LATEST.path}`} className='font-semibold underline'>View all new products <FontAwesomeIcon className='ml-1' icon={faChevronRight} size={"sm"}/></Link>
      </div>
      <ProductCardList products={products.slice(0, 5)}/>
    </section>
  )
}