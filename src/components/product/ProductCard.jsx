import React from "react"
import { Link } from "react-router-dom"

export default function ProductCard({ product }) {
  return (
    <Link to={`/detail-item/${product.id}`} className='rounded-md overflow-hidden shadow-md hover:scale-105 duration-150'>
      <div className="productCard cursor-pointer bg-white">
        <div className="h-60 overflow-hidden">
          <img
            className="object-cover w-full h-80"
            src={product.imageMain}
            alt="product"
          />
        </div>
        <div className="p-3">
          <p className="line-clamp-2 text-sm md:text-base h-12">
            {product.productName}
          </p>
          <p className="text-base md:text-lg font-bold text-orange-500 py-2">
            ${product.unitPrice - (product.unitPrice * product.salePtc / 100).toFixed(2)} <span className="text-neutral-400 line-through ml-2">${product.unitPrice}</span>
          </p>
          <div className="flex items-center">
            {[...Array(5)].map((x, i) => (
                <svg
                  key={i}
                  aria-hidden="true"
                  className={`w-5 h-5 ${i < product.rating ? "text-yellow-400" : "text-gray-300"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>{i}th star</title>
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              ))}
            <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
              ({product.totalRating})
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}
