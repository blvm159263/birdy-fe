import React from "react"
import ProductCard from "../product/ProductCard"

function RelatedProduct() {
  return (
    <div className="bg-white p-7 w-full mt-3 rounded-md">
      <h1 className="text-3xl font-bold text-left mb-5">Related Products</h1>
      <div className="flex justify-between gap-8">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
      <div className="py-10 text-center">
        <button className="underline ">View all related products</button>
      </div>
    </div>
  )
}

export default RelatedProduct
