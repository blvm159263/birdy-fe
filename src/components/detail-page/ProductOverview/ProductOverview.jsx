import React from "react"
import ProductOverviewImg from "./ProductOverviewImg"
import ProductOverviewAction from "./ProductOverviewAction"

function ProductOverview({ product, noControl }) {
  return (
    <div className="bg-white rounded-md shadow grid grid-cols-12 gap-4 lg:gap-8 p-4 lg:p-8 mb-2">
      <ProductOverviewImg product={product} />
      <ProductOverviewAction product={product} noControl={noControl}/>
    </div>
  )
}

export default ProductOverview
