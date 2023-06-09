import React from "react"

function ProductOverviewImg({ product }) {
  return (
    <div className="w-1/2 flex flex-col p-10">
      <div className="w-full p-5 ">
        <img
          src="/assets/images/product-demo.png"
          className="rounded-sm"
          alt=""
        />
      </div>
      <div className="w-full flex">
        <div className="w-1/5 p-3">
          <img
            className="w-full rounded-sm"
            src="/assets/images/product-demo.png"
            alt=""
          />
        </div>
        <div className="w-1/5 p-3">
          <img
            className="w-full rounded-sm"
            src="/assets/images/product-demo.png"
            alt=""
          />
        </div>
        <div className="w-1/5 p-3">
          <img
            className="w-full rounded-sm"
            src="/assets/images/product-demo.png"
            alt=""
          />
        </div>
        <div className="w-1/5 p-3">
          <img
            className="w-full rounded-sm"
            src="/assets/images/product-demo.png"
            alt=""
          />
        </div>
        <div className="w-1/5 p-3">
          <img
            className="w-full rounded-sm"
            src="/assets/images/product-demo.png"
            alt=""
          />
        </div>
      </div>
    </div>
  )
}

export default ProductOverviewImg
