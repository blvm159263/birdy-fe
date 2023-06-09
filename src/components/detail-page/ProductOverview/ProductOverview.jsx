import React from "react"
import ProductOverviewImg from "./ProductOverviewImg"
import ProductOverviewAction from "./ProductOverviewAction"

function ProductOverview({ product }) {
  return (
    <div className="bg-white rounded-md py-4 px-10 flex">
      <ProductOverviewImg product={product} />
      <ProductOverviewAction product={product} />
    </div>
  )
}

export default ProductOverview
