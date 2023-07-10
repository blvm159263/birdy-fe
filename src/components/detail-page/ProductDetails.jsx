import React from "react"
import { useState } from "react"
import ReactQuill from "react-quill"
import format from "date-fns/format"

function ProductDetails({ product }) {
  return (
    <div className="bg-white col-span-12 lg:col-span-8 p-4 lg:p-8 rounded-md shadow">
      <h1 className="text-2xl font-bold text-left mb-5">Product Details</h1>
      {product.categoryId === 1 ? (
        <div id="detail" className="w-1/2 mb-5">

          <div className="flex justify-start">
            <div className="text-left w-24">
              <p className="font-bold">Category:</p>
            </div>
            <div>
              <p> {product.categoryName} </p>
            </div>
          </div>

          <div className="flex justify-start">
            <div className="text-left w-24">
              <p className="font-bold">Species:</p>
            </div>
            <div>
              <p> {product.species || 'Không có'} </p>
            </div>
          </div>

          <div className="flex justify-start">
            <div className="text-left w-24">
              <p className="font-bold">Age:</p>
            </div>
            <div>
              <p> {product.age || 'Không có'} </p>
            </div>
          </div>

          <div className="flex justify-start">
            <div className="text-left w-24">
              <p className="font-bold">Gender:</p>
            </div>
            <div>
              {!product.gender && <p>Không có</p>}
              {product.gender === 1 && <p>Male</p>}
              {product.gender === 2 && <p>Felmale</p>}
            </div>
          </div>

          <div className="flex justify-start">
            <div className="text-left w-24">
              <p className="font-bold">Color:</p>
            </div>
            <div>
              <p> {product.color || 'Không có'} </p>
            </div>
          </div>

          <div className="flex justify-start">
            <div className="text-left w-24">
              <p className="font-bold">Weight:</p>
            </div>
            <div>
              {product.weight ? <p>{product.weight} grams</p> : <p>Không có</p>}
            </div>
          </div>

          <div className="flex justify-start">
            <div className="text-left w-24">
              <p className="font-bold">Size:</p>
            </div>
            <div>
              <p> {product.size || 'Không có'} </p>
            </div>
          </div>


        </div>
      ) : (
        <div></div>
      )}
      {product.categoryId === 2 || product.categoryId === 3 ? (
        <div id="detail" className="w-full mb-5">

          <div className="flex justify-start">
            <div className="text-left w-24">
              <p className="font-bold">Category:</p>
            </div>
            <div>
              <p> {product.categoryName} </p>
            </div>
          </div>

          <div className="flex justify-start">
            <div className="text-left w-24">
              <p className="font-bold">Color:</p>
            </div>
            <div>
              <p> {product.color || 'Không có'} </p>
            </div>
          </div>

          <div className="flex justify-start">
            <div className="text-left w-24">
              <p className="font-bold">Weight:</p>
            </div>
            <div>
              {product.weight ? (
                <p>{product.weight > 1000 ? `${product.weight / 1000} kg` : `${product.weight} grams`}</p>
              ) : (
                <p>Không có</p>
              )}
            </div>
          </div>

          <div className="flex justify-start">
            <div className="text-left w-24">
              <p className="font-bold">Size:</p>
            </div>
            <div>
              <p> {product.size || 'Không có'} </p>
            </div>
          </div>

          <div className="flex justify-start">
            <div className="text-left w-24">
              <p className="font-bold">Made in:</p>
            </div>
            <div>
              <p> {product.madeIn || 'Không có'} </p>
            </div>
          </div>

          {product.categoryId === 2 && (
            <div className="flex justify-start">
              <div className="text-left w-24">
                <p className="font-bold">Material:</p>
              </div>
              <div>
                <p> {product.material || 'Không có'} </p>
              </div>
            </div>
          )}

          <div className="flex justify-start">
            <div className="text-left w-24">
              <p className="font-bold">Brand:</p>
            </div>
            <div>
              <p> {product.brandName || 'Không có'} </p>
            </div>
          </div>

          <div className="flex justify-start">
            <div className="text-left w-24">
              <p className="font-bold">Expired:</p>
            </div>
            <div>
              <p> {product.expDate ? format(new Date(product.expDate), 'dd/MM/yyyy') : 'Không có'} </p>
            </div>
          </div>

        </div>

      ) : (
        <div></div>
      )}


      <p id="description" className="mb-3">
        <span className="font-bold">Description: </span>
      </p>
      <ReactQuill
        className="text-gray-900 text-sm"
        theme="bubble"
        value={product.description}
        readOnly
      />
    </div>
  )
}

export default ProductDetails
