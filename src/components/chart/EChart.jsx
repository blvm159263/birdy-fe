import ReactApexChart from "react-apexcharts";
import { Row, Col, Typography } from "antd";
import eChart from "./configs/eChart";

function EChart() {
  const { Paragraph } = Typography;

  const items = [
    {
      Title: "3,6K",
      user: "Users",
    },
    {
      Title: "2m",
      user: "Clicks",
    },
    {
      Title: "$772",
      user: "Sales",
    },
    {
      Title: "82",
      user: "Items",
    },
  ];

  return (
    <div className="flex justify-between">
      <div className="basis-1/2">
        <ReactApexChart
          className="bg-gradient-to-r from-blue-900 to-blue-500 via-indigo-700 bg-no-repeat bg-padding-box shadow-sm rounded-lg"
          options={eChart.options}
          series={eChart.series}
          type="bar"
          height={220}
        />
      </div>

      <div className="basis-[45%]">
        <p className="m-0 font-bold text-xl">Active Users</p>
        <Paragraph className="text-gray-500 font-semibold">
          than last week <span className="text-green-500 font-bold">+30%</span>
        </Paragraph>
        <Paragraph className="text-gray-500 font-semibold">
          We have created multiple options for you to put together and customise
          into pixel perfect pages.
        </Paragraph>
        <Row gutter>
          {items.map((v, index) => (
            <Col xs={6} xl={6} sm={6} md={6} key={index}>
              <div className="mt-5">
                <p className="m-0 font-bold text-xl" >{v.Title}</p>
                <span className="text-black-65 font-semibold">{v.user}</span>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default EChart;
