import { Select } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
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
  const [years, setYears] = useState([]);
  const [year, setYear] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    adminApi.getAllYears()
      .then((response) => {
        setYears(response.data);
        console.log(response.data);
      })

    if (year) {
      adminApi.getChartDataByYear(year)
        .then((response) => {
          setData(response.data);
          console.log(response.data);
        })
    }
  }, [year])

  const chartOptions = {
    chart: {
      height: 350,
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
    xaxis: {
      type: "datetime",
    },
    yaxis: [
      {
        title: {
          text: "Total orders",
        },
      },
      {
        opposite: true,
        title: {
          text: "Total orders price",
        },
      },
    ],
  };

  return (
    <div className="bg-gradient-to-br from-green-300 via-green-400 to-green-300">
      <div className="flex">
        <h2 className="font-semibold text-xl">Sales graph</h2>
        <Select
          defaultValue={dayjs().year()}
          onChange={value => setYear(value)}
          options={years}
        />
      </div>
      {data && <ReactApexChart options={chartOptions}
        series={[
          {
            name: "Total orders",
            type: "column",
            data: data.dataOrders,
          },
          {
            name: "Total orders price",
            type: "line",
            data: data.dataRevenue,
          },
        ]}></ReactApexChart>}
    </div>
  );
}
