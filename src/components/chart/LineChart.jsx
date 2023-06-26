import ReactApexChart from "react-apexcharts";
import { Typography } from "antd";
import { MinusOutlined } from "@ant-design/icons";
import lineChart from "./configs/lineChart";

function LineChart() {
  const { Title, Paragraph } = Typography;

  return (
    <>
      <div className="flex justify-between items-center">
        <div>
        <p className="m-0 font-bold text-xl">Active Users</p>
          <Paragraph className="text-gray-500 font-semibold">
            than last week <span className="text-green-500 font-bold">+30%</span>
          </Paragraph>
        </div>
        <div className="sales">
          <ul className="list-none p-0 m-0">
            <li className="text-blue-500 mb-3 cursor-pointer font-semibold text-sm">{<MinusOutlined />} Traffic</li>
            <li className="text-green-500 mb-3 cursor-pointer font-semibold text-sm">{<MinusOutlined />} Sales</li>
          </ul>
        </div>
      </div>

      <ReactApexChart
        className="w-full"
        options={lineChart.options}
        series={lineChart.series}
        type="area"
        height={350}
        // width={"100%"}
      />
    </>
  );
}

export default LineChart;
