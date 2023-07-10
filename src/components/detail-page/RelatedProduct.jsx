import React, { useEffect, useState } from "react";
import ProductCardList from "../product/ProductCardList";
import productApi from "../../api/productApi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function RelatedProduct({ product }) {
  const [allProducts, setAllProducts] = useState([]);
  const rating = useSelector((state) => state.search.rating);
  const fromPrice = useSelector((state) => state.search.fromPrice);
  const toPrice = useSelector((state) => state.search.toPrice);
  const page = useSelector((state) => state.search.page);
  const { categoryId } = product;
  // console.log("Category id: " + categoryId)

  const fetchRelatedProduct = () => {
    const params = {
      id: categoryId,
      search: "",
      page: 0,
      rating: rating,
      from: fromPrice,
      to: toPrice,
    };

    productApi
      .getAll(params)
      .then((response) => {
        // console.log(response.data[0])
        setAllProducts(response.data[0]);
      })
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    // console.log(allProducts)
    fetchRelatedProduct();
  }, [categoryId]);
  // const relatedProduct = allProducts.filter(
  //   (item) => item.categoryId === product.categoryId
  // )

  // TO-DO: replace this code
  //  -------------DONE--------------
  // Related product base on category
  // const [product, setProduct] = useState(undefined);

  // useEffect(() => {
  //   productApi.getProductById(1)
  //     .then((response) => {
  //       setProduct(response.data);
  //       console.log(response.data);
  //     })
  //     .catch((error) => console.log(error));
  // }, [])

  return (
    <div className="bg-white p-4 lg:p-8 mt-2 rounded-md shadow">
      <h1 className="text-2xl font-bold text-left mb-5">Sản phẩm liên quan</h1>
      <ProductCardList products={allProducts.slice(0, 5)} />
      <div className="py-10 text-center">
        <Link
          to={`/search/${(categoryId === 1 && 'birds') || (categoryId === 2 && 'accessories') || (categoryId === 3 && 'foods')}`}
          className="underline hover:text-sky-500 active:text-sky-600 duration-150"
        >
          Xem tất cả
        </Link>
      </div>
    </div>
  );
}

export default RelatedProduct;
