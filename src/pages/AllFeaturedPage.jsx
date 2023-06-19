import React, {useEffect, useState} from "react";
import ProductCardList from "../components/product/ProductCardList";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {decreasePage, increasePage, setPage} from "../features/search/searchSlice";
import productApi from "../api/productApi";
import {useDispatch, useSelector} from "react-redux";

export default function() {
  const [products, setProducts] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const page = useSelector(state => state.search.page);
  const dispatch = useDispatch();

  useEffect(() => {
    let isStillInPage = true;

    // Call api to get all feature product
    productApi.getAllFeaturedProduct({page: page}).then((response) => {
        if (isStillInPage) {
          setProducts(response.data[0]);
          setTotalPage(response.data[1]);
          console.log(response.data);
        } else {
          console.log('Leave page, cancel load data');
        }
      })
      .catch((error) => console.log(error));

    return () => {
      isStillInPage = false;
    }
  }, [page]);

  return (
    <div id='AllFeaturedPage' className='bg-neutral-100 px-2 md:px-0 py-4'>
      <section className="container mx-auto flex flex-col">
        {/* Section header */}
        <div className="flex justify-center py-4">
          <img className="h-6" src="/assets/images/logo-orange.png" alt="logo" />
          <h1 className="font-bold text-2xl mx-4">
            <span className="text-orange-500">Feature</span> Product
          </h1>
        </div>

        {/* Products List */}
        <ProductCardList products={products} />

        {/* No product found */}
        {products.length === 0 ? (
          <div className='px-8 py-16'>
            <img className='w-64 h-64 mx-auto' src="/assets/images/No_Product_Found.png" alt='no product' />
          </div>
        ) : ''}

        {/* Pagination */}
        <div className='flex justify-center items-center gap-2 text-neutral-500 font-semibold py-4'>
          {page <= 0 ?
            (<span className="block px-2 rounded-sm text-neutral-300"><FontAwesomeIcon icon={faChevronLeft}/></span>) :
            (<button onClick={() => dispatch(decreasePage())} className="block px-2 rounded-sm text-neutral-500"><FontAwesomeIcon icon={faChevronLeft}/></button>)
          }
          {[...Array(totalPage)].map((x, i) => (
            <button onClick={() => dispatch(setPage(i))} className={`block px-2 rounded-sm ${Number(page) === i ? "text-white bg-orange-500" : ""}`}>{i + 1}</button>
          ))}
          {page >= totalPage - 1 ?
            (<span className="block px-2 rounded-sm text-neutral-300"><FontAwesomeIcon icon={faChevronRight}/></span>) :
            (<button onClick={() => dispatch(increasePage())} className="block px-2 rounded-sm text-neutral-500"><FontAwesomeIcon icon={faChevronRight}/></button>)
          }
        </div>
      </section>
    </div>
  )
}