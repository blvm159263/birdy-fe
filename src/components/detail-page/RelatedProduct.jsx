import React, { useEffect, useState } from "react"
import ProductCard from "../product/ProductCard"
import productApi from "../../api/productApi"
import { useSelector } from "react-redux"

function RelatedProduct({ product }) {
  const [allProducts, setAllProducts] = useState([])
  const rating = useSelector((state) => state.search.rating)
  const fromPrice = useSelector((state) => state.search.fromPrice)
  const toPrice = useSelector((state) => state.search.toPrice)
  const page = useSelector((state) => state.search.page)
  const { categoryId } = product
  // console.log("Category id: " + categoryId)

  const fetchRelatedProduct = () => {
    const params = {
      id: categoryId,
      search: "",
      page: 0,
      rating: rating,
      from: fromPrice,
      to: toPrice,
    }

    productApi
      .getAll(params)
      .then((response) => {
        // console.log(response.data[0])
        setAllProducts(response.data[0])
      })
      .catch((e) => console.log(e))
  }
  useEffect(() => {
    // console.log(allProducts)
    fetchRelatedProduct()
  }, [categoryId])
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
    <div className="bg-white p-7 w-full mt-3 rounded-md">
      <h1 className="text-3xl font-bold text-left mb-5">Related Products</h1>
      <div className="flex lg:flex-row lg:justify-between gap-8 sm:flex-col sm: flex-wrap">
        {/*TO-DO: replace this code */}
        {allProducts.slice(0, 4).map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
      <div className="py-10 text-center">
        <button className="underline ">View all related products</button>
      </div>
    </div>
  )
}

export default RelatedProduct
