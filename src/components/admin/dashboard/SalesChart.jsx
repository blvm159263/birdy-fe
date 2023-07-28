import { AppstoreAddOutlined, AppstoreOutlined, ShopOutlined, UserOutlined, DollarOutlined, InboxOutlined } from "@ant-design/icons";
import { Select, Spin } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import adminApi from "../../../api/adminApi";

// TODO: API for admin dashboard
/*
request: gửi đi month và year (để lấy data cho chart)

response:
{
  totalPendingShopRequests: <Số shop requests chưa xử lý>,
  totalPendingProductRequests: <Số product requests chưa xử lý>,
  totalActiveShops: <Tổng số shop đang active>,
  totalActiveProducts: <Tổng số product đang active>,
  salesData: [
    {
      date: '1/<month>/<year>',
      totalOrders: <Tổng số order của ngày này>,
      totalOrdersPrice: <Tổng số tiền các sản phẩm của các order trong ngày này>
    },
    {
      date: '2/<month>/<year>',
      totalOrders: <Tổng số order của ngày này>,
      totalOrdersPrice: <Tổng số tiền các sản phẩm của các order trong ngày này>
    },
    ...
  ]
}
*/
export default function SalesChart() {
  const [years, setYears] = useState(null);
  const [year, setYear] = useState(dayjs().year());
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!years) {
      adminApi.getAllYears()
        .then((response) => {
          setYears(response.data);
          console.log(response.data);
        })
    }

    if (year) {
      adminApi.getChartDataByYear(year)
        .then((response) => {
          setData(response.data);
          console.log(response.data);
        })
    }
  }, [years, year])

  const chartOptions = {
    chart: {
      height: '100%',
      type: "line",
    },
    stroke: {
      width: [0, 4],
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [1],
    },
    labels: [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ],
    yaxis: [
      {
        title: {
          text: "Tổng số đơn",
        },
      },
      {
        opposite: true,
        title: {
          text: "Doanh thu",
        },
      },
    ],
  };

  if (!data) {
    return (
      <div className='flex justify-center items-center h-[80vh]'>
        <Spin size='large' />
      </div>
    )
  }

  return (
    <div className="">
      <div className="grid grid-cols-4 my-4 gap-2">
        <div className="p-4 gap-4 text-white flex flex-wrap items-center shadow rounded bg-gradient-to-r from-sky-400 to-sky-500">
          <AppstoreAddOutlined className="text-lg" /><div className='w-full'></div>
          <p className="text-sm">Yêu cầu đang chờ</p>
          <p className="font-bold text-2xl px-2">{data.totalProductRequests}</p>
        </div>
        <div className="p-4 gap-4 text-white flex flex-wrap items-center shadow rounded bg-gradient-to-r from-sky-400 to-sky-500">
          <ShopOutlined className="text-lg" /><div className='w-full'></div>
          <p className="text-sm">Shop hoạt động</p>
          <p className="font-bold text-2xl px-2">{data.totalShop}</p>
        </div>
        <div className="p-4 gap-4 text-white flex flex-wrap items-center shadow rounded bg-gradient-to-r from-sky-400 to-sky-500">
          <AppstoreOutlined className="text-lg" /><div className='w-full'></div>
          <p className="text-sm">Tổng sản phẩm</p>
          <p className="font-bold text-2xl px-2">{data.totalActiveProducts}</p>
        </div>
        <div className="p-4 gap-4 text-white flex flex-wrap items-center shadow rounded bg-gradient-to-r from-sky-400 to-sky-500">
          <UserOutlined className="text-lg" /><div className='w-full'></div>
          <p className="text-sm">Số người dùng</p>
          <p className="font-bold text-2xl px-2">{data.totalUsers}</p>
        </div>
      </div>
      <div className="flex gap-8 pt-4">
        <h2 className="font-bold text-xl">Tổng doanh số</h2>
        <div className="flex items-center">
          <p className="mr-2">Năm</p>
          {years && <Select
            defaultValue={dayjs().year().toString()}
            onChange={value => setYear(value)}
            value={year}
            options={years.map(year => ({
              value: year,
              label: year,
            }))}
          />}
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-3">
          <div className="p-4 mt-4 gap-4 text-white flex flex-wrap items-center shadow rounded bg-gradient-to-r from-sky-400 to-sky-600">
            <InboxOutlined className="text-lg" /><div className='w-full'></div>
            <p className="text-sm">Tổng số đơn</p>
            <p className="font-bold text-2xl px-2">{data.dataOrders.reduce((total, num) => total + num)}</p>
          </div>
          <div className="p-4 mt-2 gap-4 text-white flex flex-wrap items-center shadow rounded bg-gradient-to-r from-green-400 to-green-600">
            <DollarOutlined className="text-lg" /><div className='w-full'></div>
            <p className="text-sm">Tổng doanh thu</p>
            <p className="font-bold text-2xl px-2">${data.dataRevenue.reduce((total, num) => total + num)}</p>
          </div>
        </div>
        <div className="col-span-9">
          <ReactApexChart options={chartOptions}
            series={[
              {
                name: "Tổng số đơn",
                type: "column",
                data: data.dataOrders,
              },
              {
                name: "Doanh thu",
                type: "line",
                data: data.dataRevenue,
              },
            ]}></ReactApexChart>
        </div>
      </div>
    </div>
  );
}
