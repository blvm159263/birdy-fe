import ReactApexChart from "react-apexcharts";
import { Row, Col, Typography } from "antd";
import eChart from "./configs/eChart";
import chartApi from "../../api/chartApi";
import { Select } from "antd";
import React, { useEffect, useState, useContext } from "react";
import { LoginContext } from "../../context/LoginProvider";


function EChart() {
  const { shopId } = useContext(LoginContext);
  const { Paragraph } = Typography;
  const [all, setAll] = useState(0);
  const [bird, setBird] = useState(0);
  const [accessories, setAccessories] = useState(0);
  const [food, setFood] = useState(0);
  const [data, setData] = useState([]);
  const [allYears, setAllYears] = useState([]);
  const [currentYear, setCurrentYear] = useState(null);

  const fetchYear = async () => {
    if(shopId) {
      try {
        await chartApi.getAllYearsProduct(shopId)
          .then((res) => {
            // console.log('hi');
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
        await chartApi.getChartProduct(shopId, currentYear)
          .then((res) => {
            console.log(res);
            setAll(res.data.allInYear);
            setBird(res.data.allBirds);
            setAccessories(res.data.allAccessories);
            setFood(res.data.allFood);

            const chartData = res.data.chartData;

            // Update eChart.series.data with chartData
            const updatedSeries = [{ ...eChart.series[0], data: chartData }];
            // const updatedChart = { ...eChart, series: updatedSeries };

            setData(updatedSeries);
          })
      } catch (error) {
        console.log(error);
      }
    }
  }
  useEffect(() => {
    fetchData();
  }, [shopId, currentYear])

  const formatNumber = (number) => {
    if (number >= 1000000000) {
      // Convert to billions (e.g., 1.2b)
      return (number / 1000000000).toFixed(1) + "b";
    } else if (number >= 1000000) {
      // Convert to millions (e.g., 1.2m)
      return (number / 1000000).toFixed(1) + "m";
    } else if (number >= 1000) {
      // Convert to thousands (e.g., 1.2k)
      return (number / 1000).toFixed(1) + "k";
    } else {
      return number.toString();
    }
  }

  const items = [
    {
      Title: formatNumber(all),
      user: "All products",
    },
    {
      Title: formatNumber(bird),
      user: "Bird",
    },
    {
      Title: formatNumber(accessories),
      user: "Accessories",
    },
    {
      Title: formatNumber(food),
      user: "Food",
    },
  ];

  const options = allYears.map((v) => ({
    value: v,
    label: v,
  }))

  const handleChange = (value) => {
    console.log(`Selected: ${value}`);
    setCurrentYear(value);
  };

  return (
    <div className="flex justify-between">
      <div className="basis-[55%]">
        <ReactApexChart
          className="bg-gradient-to-r from-blue-900 to-blue-500 via-indigo-700 bg-no-repeat bg-padding-box shadow-sm rounded-lg"
          options={eChart.options}
          series={data}
          type="bar"
          height={220}
        />
      </div>

      <div className="basis-[40%]">
        <div className="flex justify-between">
          <>
            <p className="m-0 font-bold text-xl">Products Chart</p>
          </>
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
        <Paragraph className="text-gray-500 font-semibold">
          All products posted on shop page in <span className="text-green-500 font-bold">{currentYear}</span>
        </Paragraph>
        <Paragraph className="text-gray-500 font-semibold">
          This is the chart that shows the number of products<br />
          that were published on shop page <br />
          from each month in 2023.
        </Paragraph>
        <Row gutter>
          {items.map((v, index) => (
            <Col xs={6} xl={6} sm={6} md={6} key={index}>
              <div className="mt-5">
                <p className="m-0 font-bold text-xl text-center" >{v.Title}</p>
                <p className="text-black-65 font-semibold text-center">{v.user}</p>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default EChart;
