import React from "react"
import ProductOverviewImg from "./ProductOverviewImg"
import ProductOverviewAction from "./ProductOverviewAction"

function ProductOverview({ product }) {
  return (
    <div className="bg-white rounded-md lg:py-4 sm: py-1 lg:px-10 sm: px-0  lg:mx-3 sm: mx-0 flex lg:flex-row sm: flex-col">
      <ProductOverviewImg product={product} />
      <ProductOverviewAction product={product} />
    </div>
  )
}

export default ProductOverview
