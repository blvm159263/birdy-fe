import { AppstoreAddOutlined, AppstoreOutlined, ShopOutlined, UserOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { DatePicker, Spin } from "antd";
import dayjs from "dayjs";
import adminApi from "../../../api/adminApi";
import AdminApi from "../../../api/adminApi";

const { RangePicker } = DatePicker;

const rangePresets = [
  {
    label: 'Last 7 Days',
    value: [dayjs().add(-7, 'd'), dayjs()],
  },
  {
    label: 'Last 14 Days',
    value: [dayjs().add(-14, 'd'), dayjs()],
  },
  {
    label: 'Last 30 Days',
    value: [dayjs().add(-30, 'd'), dayjs()],
  },
  {
    label: 'Last 90 Days',
    value: [dayjs().add(-90, 'd'), dayjs()],
  },
];

export default function AdminIncomeSection() {
  const [data, setData] = useState(null);
  const [firstDate, setFirstDate] = useState(null);
  const [lastDate, setLastDate] = useState(null);

  const onRangeChange = (dates, dateStrings) => {
    if (dates) {
      setFirstDate(dates[0]);
      setLastDate(dates[1]);
    } else {
      setFirstDate(null);
      setLastDate(null);
    }

    console.log(dateStrings[0]);
    console.log(dateStrings[1]);

    if (firstDate !== dateStrings[0] && lastDate !== dateStrings[1]) {
      adminApi.getAdminIncomeByRange(dateStrings[0], dateStrings[1]).then((response) => {
        setData(response.data);
        console.log(response.data)
      })
    }
  };

  useEffect(() => {
    AdminApi.getAdminDefaultIncome().then((response) => {
      setData(response.data);
      console.log(response.data);
      if (rangePresets.length < 5) {
        rangePresets.push({
          label: 'All Time',
          value: [dayjs(response.data.startDate), dayjs(response.data.endDate)],
        })
      }
    }).catch((error) => {
      console.log(error);
    })
  }, [])

  {/* Loading icon */ }
  if (!data) return (
    <div className='flex justify-center items-center h-[200px]'>
      <Spin size='large' />
    </div>
  )

  return (
    <div>
      <div className="mr-7">
        <p className="m-0 mt-6 font-bold text-xl">Thu nhập</p>
      </div>
      <div className="mt-4">
        <RangePicker status='error' presets={rangePresets} onChange={onRangeChange} defaultValue={[dayjs(data.startDate, "YYYY-MM-DD"), dayjs(data.endDate, "YYYY-MM-DD")]} />
      </div>
      <div className="grid grid-cols-4 my-4 gap-3">
        <div className="p-4 gap-2 text-white flex flex-wrap items-center shadow rounded bg-gradient-to-r from-sky-400 to-sky-500">
          <AppstoreAddOutlined className="text-lg" /><div className='w-full'></div>
          <p className="text-sm">Tổng số đơn đã hoàn tất</p>
          <p className="font-bold text-lg px-2">{data.totalDoneOrders}</p>
        </div>
        <div className="p-4 gap-2 text-white flex flex-wrap items-center shadow rounded bg-gradient-to-r from-green-400 to-green-500">
          <ShopOutlined className="text-lg" /><div className='w-full'></div>
          <p className="text-sm">Tổng thu nhập</p>
          <p className="font-bold text-lg px-2">{data.totalIncome} $</p>
        </div>
        <div className="p-4 gap-2 text-white flex flex-wrap items-center shadow rounded bg-gradient-to-r from-yellow-400 to-yellow-500">
          <AppstoreOutlined className="text-lg" /><div className='w-full'></div>
          <p className="text-sm">Thu nhập của các shop</p>
          <p className="font-bold text-lg px-2">{data.totalShopsIncome} $</p>
        </div>
        <div className="p-4 gap-2 text-white flex flex-wrap items-center shadow rounded bg-gradient-to-r from-purple-400 to-purple-500">
          <UserOutlined className="text-lg" /><div className='w-full'></div>
          <p className="text-sm">Thu nhập cho nền tảng</p>
          <p className="font-bold text-lg px-2">{data.totalPlatformIncome} $</p>
        </div>
      </div>
    </div>
  )
}