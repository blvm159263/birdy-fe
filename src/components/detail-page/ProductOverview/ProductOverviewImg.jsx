import React from "react"

function ProductOverviewImg({ product }) {
  return (
    <div className="lg:w-1/2 sm: w-full flex flex-col lg:p-10 sm: p-3">
      <div className="w-full p-5 ">
        <img
          src={product.imageMain}
          className="rounded-sm"
          alt=""
        />
      </div>
      <div className="w-full flex">
        <div className="w-1/5 p-3">
          <img
            className="w-full rounded-sm"
            src={product.imageMain}
            alt=""
          />
        </div>
        <div className="w-1/5 p-3">
          <img
            className="w-full rounded-sm"
            src={product.imageMain}
            alt=""
          />
        </div>
        <div className="w-1/5 p-3">
          <img
            className="w-full rounded-sm"
            src={product.imageMain}
            alt=""
          />
        </div>
        <div className="w-1/5 p-3">
          <img
            className="w-full rounded-sm"
            src={product.imageMain}
            alt=""
          />
        </div>
        <div className="w-1/5 p-3">
          <img
            className="w-full rounded-sm"
            src={product.imageMain}
            alt=""
          />
        </div>
      </div>
    </div>
  )
}

export default ProductOverviewImg
