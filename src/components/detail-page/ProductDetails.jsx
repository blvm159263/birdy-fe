import React from "react"

function ProductDetails({ product }) {
  return (
    <div className="bg-white p-7 lg:w-3/5 sm:w-full rounded-md lg:mb-0 sm: mb-3">
      <h1 className="text-3xl font-bold text-left mb-5">Product Details</h1>
      <div id="detail" className="flex justify-between w-1/3 mb-5">
        <div id="" className="text-left">
          <p className="font-bold">Category:</p>
          <p className="font-bold">Species:</p>
          <p className="font-bold">Age:</p>
          <p className="font-bold">Gender:</p>
          <p className="font-bold">Color:</p>
          <p className="font-bold">Weight:</p>
          <p className="font-bold">Size:</p>
        </div>
        <div>
          <p> {product.categoryName} </p>
          <p> {product.species} </p>
          <p> {product.age} </p>
          <p> {product.gender} </p>
          <p> {product.color} </p>
          <p> {product.weight} </p>
          <p> {product.size} </p>
        </div>
      </div>
      <p id="description" className="mb-10">
        {product.description}
      </p>
    </div>
  )
}

export default ProductDetails
