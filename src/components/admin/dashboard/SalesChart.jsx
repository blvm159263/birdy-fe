import ReactApexChart from "react-apexcharts";

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
  const chartData = [
    {
      name: "Total orders",
      type: "column",
      data: [1, 5,2,6],
    },
    {
      name: "Total orders price",
      type: "line",
      data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16],
    },
  ];

  const chartOptions = {
    chart: {
      height: 350,
      type: "line",
    },
    stroke: {
      width: [0, 4],
    },
    title: {
      text: "Total sales",
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [1],
    },
    labels: [
      "01 Jan 2001",
      "02 Jan 2001",
      "03 Jan 2001",
      "04 Jan 2001",
      "05 Jan 2001",
      "06 Jan 2001",
      "07 Jan 2001",
      "08 Jan 2001",
      "09 Jan 2001",
      "10 Jan 2001",
      "11 Jan 2001",
      "12 Jan 2001",
      "13 Jan 2001",
      "14 Jan 2001",
      "15 Jan 2001",
      "16 Jan 2001",
      "17 Jan 2001",
      "18 Jan 2001",
      "19 Jan 2001",
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

  return <ReactApexChart options={chartOptions} series={chartData}></ReactApexChart>;
}
