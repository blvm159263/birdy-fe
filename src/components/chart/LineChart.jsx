import ReactApexChart from "react-apexcharts";
import React, { useState, useEffect, useContext } from "react";
import { Typography } from "antd";
import { MinusOutlined } from "@ant-design/icons";
import lineChart from "./configs/lineChart";
import chartApi from "../../api/chartApi";
import { Select } from "antd";
import { LoginContext } from "../../context/LoginProvider";

function LineChart() {
  const { shopId } = useContext(LoginContext);
  const { Paragraph } = Typography;
  const [allYears, setAllYears] = useState([]);
  const [currentYear, setCurrentYear] = useState(null);
  const [series, setSeries] = useState([]);

  const fetchYear = async () => {
    if (shopId) {
      try {
        await chartApi.getAllYearsOrder(shopId)
          .then((res) => {
            setAllYears(res.data);
            setCurrentYear(res.data[0]);
          })
      } catch (error) {
        console.log(error);
        setAllYears([new Date().getFullYear()]);
        setCurrentYear([new Date().getFullYear()]);
      }
    }
  }

  useEffect(() => {
    fetchYear();
  }, [shopId])

  const fetchData = async () => {
    if (shopId && currentYear) {
      try {
        await chartApi.getChartOrder(shopId, currentYear)
          .then((res) => {
            console.log(res);

            const updatedSeries = [
              {
                ...lineChart.series[0],
                data: res.data.done,
              },
              {
                ...lineChart.series[1],
                data: res.data.canceled,
              },
            ];
            setSeries(updatedSeries);
          })
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    fetchData();
  }, [shopId, currentYear])

  const options = allYears.map((v) => ({
    value: v,
    label: v,
  }));

  const handleChange = (value) => {
    console.log(`Selected: ${value}`);
    setCurrentYear(value);
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <div className="flex justify-start items-center">
            <div className="mr-7">
              <p className="m-0 font-bold text-xl">Orders Chart</p>
            </div>
            <>
              <Select
                size='default'
                value={currentYear}
                onChange={handleChange}
                style={{
                  width: 100,
                }}
                status="error"
                options={options}
              />
            </>
          </div>
          <Paragraph className="text-gray-500 font-semibold mt-1">
            All processed orders in <span className="text-green-500 font-bold">2023</span>
          </Paragraph>
        </div>
        <div className="sales">
          <ul className="list-none p-0 m-0">
            <li className="text-green-500 mb-3 cursor-pointer font-semibold text-sm">{<MinusOutlined />} Done</li>
            <li className="text-red-500 mb-3 cursor-pointer font-semibold text-sm">{<MinusOutlined />} Canceled</li>
          </ul>
        </div>
      </div>

      <ReactApexChart
        className="w-full"
        options={lineChart.options}
        series={series}
        type="area"
        height={350}
      // width={"100%"}
      />
    </>
  );
}

export default LineChart;
