import React from "react";
import ProductRequestCard from "./ProductRequestCard";

export default function ProductRequestList({products}) {
  return (
    <div className='productRequestList grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4 lg:gap-6 xl:gap-6'>
      {products.map((product) => (<ProductRequestCard key={product.id} product={product}/>))}
    </div>
  )
}