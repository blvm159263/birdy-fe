import React from "react"
import { Rate } from "antd"
import shopApi from "../../api/shopApi"
import { useEffect, useState, useContext } from "react"
import { SelectionChatContext } from "../../context/SelectionChatContext"
import { ChatContext } from "../../context/ChatContext"
function ShopInfo({ product }) {
  const [shop, setShop] = useState()

  const { setUser, handleSelect } = useContext(SelectionChatContext);

  const onChat = () => {
    handleSelect()
  }

  useEffect(() => {
    shopApi.getShopInformationByShopId(product.shopId).then((res) => {
      setShop(res.data);
      setUser({
        phoneNumber: res.data.phoneNumber,
        fullName: res.data.shopName,
        avatarUrl: res.data.avatarUrl,
      })
    }).catch((err) => {
      console.log(err)
    })

  }, [product])

  return (
    <div className="my-3 w-full flex rounded-md bg-white lg:flex-row sm: flex-col py-3 px-8">
      <div className="lg:mb-0 sm: mb-4 flex lg:flex-row sm: flex-col lg:w-2/5 sm: w-full lg:border-r-2 lg:border-r-grey-200 sm:border-0 lg:pr-6 sm: pr-0 items-center">
        <div className="h-14 lg:mr-3 sm: mr-0 lg:pl-4 sm: pl-0 lg:mb-0 sm:mb-2">
          <img src="/assets/images/shop_avar.png " alt="" className="h-full" />
        </div>
        <div className="">
          <h1 className="font-bold text-2xl">{shop?.shopName}</h1>
        </div>
        <div className="lg:ml-6 sm: ml-0 flex flex-col justify-between">
          <button className="py-1 px-10 my-1 bg-sky-300 rounded-md text-white border border-white font-bold hover:bg-white hover:border-blue-400 hover:text-blue-400"
            onClick={onChat}>
            Chat
          </button>
          <button className="py-1 px-10 my-1 bg-sky-300 rounded-md text-white border border-white font-bold hover:bg-white hover:border-blue-400 hover:text-blue-400">
            View store
          </button>
        </div>
      </div>
      <div className="lg:px-5 sm: px-3 lg:mb-0 md:mb-3 sm: mb-4 lg:w-1/5 md:w-full sm: w-full">
        <p>
          <span className="font-bold">{shop?.totalProduct}</span> Products
        </p>
        <p className="mt-2">
          Rating <span className="font-bold">{shop?.rating}</span>
        </p>
        <div className="flex items-center mt-2">
          <Rate disabled value={shop?.rating} />
          <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
            (76)
          </p>
        </div>
      </div>
      <div className="flex justify-start lg:w-2/5 md:w-full sm: w-full items-center lg:pl-8 lg:border-l-2 lg:sborder-l-grey-200 sm: border-0">
        <div className="h-5 w-5">
          <img src="/assets/images/location-log.png" alt="" />
        </div>
        <p className="ml-7 ">{shop?.address}</p>
      </div>
    </div>
  )
}

export default ShopInfo
