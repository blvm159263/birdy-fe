import {Spin} from "antd";
import React, {useContext, useEffect, useState} from "react";
import shopApi from "../../api/shopApi";
import {LoginContext} from "../../context/LoginProvider";
import {NotificationContext} from "../../context/NotificationProvider";

export default function ShopDelivery() {
  const [shipmentData, setShipmentData] = useState(null);
  const [data1, setData1] = useState(null);
  const [data2, setData2] = useState(null);
  const [data3, setData3] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const {shopId} = useContext(LoginContext);
  const openNotificationWithIcon = useContext(NotificationContext)

  useEffect(() => {
    setShipmentData(null);
    setLoading(true);

    // Fetch shops
    if(shopId) {
      shopApi.getShipmentByShopId(shopId)
        .then((response) => {
          setShipmentData(response.data);
          setData1(response.data[0].pricePerKm);
          setData2(response.data[1].pricePerKm);
          setData3(response.data[2].pricePerKm);
          console.log("response.data:");
          console.log(response.data);
        }).catch((error) => {
          setData1(null);
          setData2(null);
          setData3(null);
          setShipmentData([{pricePerKm: null}, {pricePerKm: null}, {pricePerKm: null}]);
          console.log(error);
          setLoading(false);
        }).finally(() => {
          setLoading(false);
        })
    }
  }, [shopId])

  function handleSubmit(e) {
    e.preventDefault();
    let flag = false;

    if(data1 !== shipmentData[0].pricePerKm) {
      shopApi.updateShipmentByShopIdAndShipmentType(shopId, 1, data1).then((response) => {
        openNotificationWithIcon("Thành công", "Đã cập nhật giá vận chuyển giao hàng nhanh!");
        console.log("Updated shipment 1")
        flag = true;
      }).catch((error) => {
        console.log(error);
      })
    }
    if(data2 !== shipmentData[1].pricePerKm) {
      shopApi.updateShipmentByShopIdAndShipmentType(shopId, 2, data2).then((response) => {
        openNotificationWithIcon("Thành công", "Đã cập nhật giá vận chuyển giao hàng tiết kiệm!");
        console.log("Updated shipment 2");
        flag = true;
      }).catch((error) => {
        console.log(error);
      })
    }
    if(data3 !== shipmentData[2].pricePerKm) {
      shopApi.updateShipmentByShopIdAndShipmentType(shopId, 3, data3).then((response) => {
        openNotificationWithIcon("Thành công", "Đã cập nhật giá vận chuyển giao hàng thường!");
        console.log("Updated shipment 3");
        flag = true;
      }).catch((error) => {
        console.log(error);
      })
    }

    console.log(flag);
  }

  {/* Loading icon */}
  if(isLoading) return (
    <div className='col-span-9 flex justify-center items-center h-[400px]'>
      <Spin size='large' />
    </div>
  )

  return (
    <div id='shop-delivery' className='col-span-9 bg-gray-200'>
      <div className='min-h-[90vh] p-3 m-4 shadow rounded bg-white'>
        <h1 className='text-2xl font-bold my-4'>Quản lý giao hàng</h1>
        <form onSubmit={(e) => handleSubmit(e)} className='flex flex-col justify-center items-center px-[16vw]'>
          <div className='w-full mt-[8vh]'>
            <label className='block'>Giao hàng nhanh</label>
            <input required value={data1} onChange={(e) => setData1(e.target.value)} type='number' min='0.001' step='0.001' className='bg-gray-100 rounded px-2 py-1 border border-gray-300 w-full' placeholder="$/km"/>
          </div>
          <div className='mt-[4vh] w-full'>
            <label className='block'>Giao hàng tiết kiệm</label>
            <input required value={data2} onChange={(e) => setData2(e.target.value)} type='number' min='0.001' step='0.001' className='bg-gray-100 rounded px-2 py-1 border border-gray-300 w-full' placeholder="$/km"/>
          </div>
          <div className='mt-[4vh] w-full'>
            <label className='block'>Giao hàng thường</label>
            <input required value={data3} onChange={(e) => setData3(e.target.value)} type='number' min='0.001' step='0.001' className='bg-gray-100 rounded px-2 py-1 border border-gray-300 w-full' placeholder="$/km"/>
          </div>
          <div className='mt-[4vh] self-end'>
            <button type='submit' className='px-2 mt-6 py-2 w-full rounded shadow bg-gradient-to-r from-sky-500 to-sky-700 text-white font-bold hover:brightness-125 active:brightness-110 duration-150 disabled:bg-gray-200'>Cập nhật</button>
          </div>
        </form>
      </div>


    </div>
  )
}