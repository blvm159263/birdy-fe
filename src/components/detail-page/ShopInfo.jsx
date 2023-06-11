import React from "react"
import { Rate } from 'antd';

function ShopInfo() {
  return (
    <div className="my-3 w-full rounded-md bg-white lg:flex-row sm: flex-col py-3 px-8">
      <div className="lg:mb-0 sm: mb-2 flex lg:w-2/5 sm:w-full lg:border-r-2 lg:border-r-grey-200 sm:border-0 pr-6 items-center">
        <div className="h-14 mr-3 lg:pl-4 sm: pl-0 lg:mb-0 sm:mb-2">
          <img src="/assets/images/shop_avar.png " alt="" className="h-full" />
        </div>
        <div className="">
          <h1 className="font-bold text-2xl">BIRD CAGE.LTD</h1>
          <p className="text-lg">@cage.shop</p>
        </div>
        <div className="ml-6 flex flex-col justify-between">
          <button className="py-1 px-10 my-1 bg-sky-300 rounded-md text-white border border-white font-bold hover:bg-white hover:border-blue-400 hover:text-blue-400">
            Chat
          </button>
          <button className="py-1 px-10 my-1 bg-sky-300 rounded-md text-white border border-white font-bold hover:bg-white hover:border-blue-400 hover:text-blue-400">
            View store
          </button>
        </div>
      </div>
      <div className="lg:px-5 sm: px-3 lg:mb-0 md:mb-3 sm: mb-4 lg:w-1/5 md:w-full sm: w-full">
        <p>
          <span className="font-bold">128</span> Products
        </p>
        <p className="mt-2">
          Rating <span className="font-bold">5.0</span>
        </p>
        <div className="flex mt-2">
        <Rate disabled defaultValue={2} />
          <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
            (1024 Reviews)
          </p>
        </div>
      </div>
      <div className="flex justify-start lg:w-2/5 md:w-full sm: w-full items-center lg:pl-8 lg:border-l-2 lg:sborder-l-grey-200 sm: border-0">
        <div className="h-5 w-5">
          <img src="/assets/images/location-log.png" alt="" />
        </div>
        <p className="ml-7 ">
          FPTU, District 9, <br />
          Thu Duc City, Ho Chi Minh City
        </p>
      </div>
    </div>
  )
}

export default ShopInfo
