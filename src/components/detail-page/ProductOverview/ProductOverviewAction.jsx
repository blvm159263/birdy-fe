import React, { useState } from "react"

function ProductOverviewAction() {
  const [quantity, setQuantity] = useState(1)
  return (
    <div className="p-14 w-1/2">
      <h1 className="text-2xl font-bold">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores,
        laudantium ex numquam nisi dolorum,
      </h1>
      <div className="my-4 text-lg">
        <p class="text-lg font-bold text-orange-500 py-2">$29.00 - $79.39</p>
      </div>
      <div className="flex my-4">
        <svg
          aria-hidden="true"
          class="w-5 h-5 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>First star</title>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
        <svg
          aria-hidden="true"
          class="w-5 h-5 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>First star</title>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
        <svg
          aria-hidden="true"
          class="w-5 h-5 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>First star</title>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
        <svg
          aria-hidden="true"
          class="w-5 h-5 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>First star</title>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
        <svg
          aria-hidden="true"
          class="w-5 h-5 text-gray-300 dark:text-gray-500"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Fifth star</title>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
        <p class="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
          (102)
        </p>
      </div>
      <div className="my-4">
        <p>Availability: 5 left in stock</p>
      </div>
      <div className="my-4">
        <p>
          Shipping to: Lorem ipsum dolor sit amet loronete consectetur ipsum
          dolor sis - Change addess
        </p>
      </div>
      <div className="flex my-4">
        <p className="mr-6">Quantity:</p>
        <button className="border w-7 h-7 rounded-md bg-blue-100">-</button>
        <p className="border mx-1 w-10 rounded-md text-center">{quantity}</p>
        <button className="border w-7 h-7 rounded-md bg-blue-100 ">+</button>
      </div>
      <div className="action my-4">
        <div className="w-full flex items-center my-3 ">
          <button className="border-2 border-white bg-sky-100 hover:bg-white  hover:border-sky-300 py-4 w-5/6 mr-3 font-bold rounded-md">
            ADD TO CART
          </button>
          <button className=" h-14 w-14 flex items-center justify-center border-2 border-blue-100 hover:bg-sky-200 hover:border-white rounded-md">
            <img
              src="/assets/images/heart-orange.png"
              className="h-2/5"
              alt=""
            />
          </button>
        </div>
        <button className="py-4 bg-sky-400 border-2 text-white font-bold border-white w-5/6 rounded-md hover:bg-white  hover:border-sky-300 hover:text-sky-400">
          BUY NOW
        </button>
      </div>
    </div>
  )
}

export default ProductOverviewAction
