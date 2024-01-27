import React from "react"
import ProductCard from "./ProductCard"

export default function ProductCardList({ products }) {
  return (
    <div className="productCardList grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4 lg:gap-6 xl:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
