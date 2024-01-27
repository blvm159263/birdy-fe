const lineChart = {
  series: [
    {
      name: "Done orders",
      data: [350, 40, 300, 220, 500, 250, 400, 230, 500, 200, 300, 400],
      offsetY: 0,
    },
    {
      name: "Canceled orders",
      data: [30, 90, 40, 140, 290, 290, 340, 230, 400, 200, 500, 100],
      offsetY: 0,
    },
  ],

  options: {
    chart: {
      width: "100%",
      height: 350,
      type: "area",
      toolbar: {
        show: false,
      },
    },

    legend: {
      show: false,
    },

    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },

    yaxis: {
      labels: {
        style: {
          fontSize: "14px",
          fontWeight: 600,
          colors: ["#8c8c8c"],
        },
      },
    },

    xaxis: {
      labels: {
        style: {
          fontSize: "14px",
          fontWeight: 600,
          colors: [
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c"
          ],
        },
      },
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ],
    },

    colors: ['#22c55e', '#ff726f' ],

    tooltip: {
      y: {
        formatter: function (val) {
          console.log(val);
          if (val >= 1000000000) {
            // Convert to billions (e.g., 1.2b)
            return (val / 1000000000).toFixed(1) + "b";
          } else if (val >= 1000000) {
            // Convert to millions (e.g., 1.2m)
            return (val / 1000000).toFixed(1) + "m";
          } else if (val >= 1000) {
            // Convert to thousands (e.g., 1.2k)
            return (val / 1000).toFixed(1) + "k";
          } else {
            return val;
          }
        },
      },
    },
  },
};

export default lineChart;
