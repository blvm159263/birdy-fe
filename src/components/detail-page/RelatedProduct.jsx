import React, { useEffect, useState } from "react"
import ProductCard from "../product/ProductCard"
import productApi from "../../api/productApi"

function RelatedProduct() {
  // TO-DO: replace this code
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
      <div className="flex justify-between gap-8">
        {/*TO-DO: replace this code */}
        {/* {product == undefined ? (
          ""
        ) : (
          <>
            <ProductCard product={product} />
            <ProductCard product={product} />
            <ProductCard product={product} />
            <ProductCard product={product} />
            <ProductCard product={product} />
          </>
        )} */}
      </div>
      <div className="py-10 text-center">
        <button className="underline ">View all related products</button>
      </div>
    </div>
  )
}

export default RelatedProduct
