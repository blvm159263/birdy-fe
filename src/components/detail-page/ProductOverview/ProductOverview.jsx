import React from "react"
import ProductOverviewImg from "./ProductOverviewImg"
import ProductOverviewAction from "./ProductOverviewAction"

function ProductOverview() {
  return (
    <div className="bg-white rounded-md py-4 px-10 flex">
      <ProductOverviewImg />
      <ProductOverviewAction />
    </div>
  )
}

export default ProductOverview
