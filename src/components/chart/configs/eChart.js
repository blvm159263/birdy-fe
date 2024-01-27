const eChart = {

  series: [
    {
      name: "On page",
      data: [450, 200, 100, 220, 500, 100, 400, 230, 500, 200, 300, 400],
      color: "#fff",
    },
  ],

  options: {
    chart: {
      type: "bar",
      width: "100%",
      height: "auto",

      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        borderRadius: 5,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 1,
      colors: ["transparent"],
    },
    grid: {
      show: true,
      borderColor: "#ccc",
      strokeDashArray: 2,
    },
    xaxis: {
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
      labels: {
        show: true,
        align: "right",
        minWidth: 0,
        maxWidth: 160,
        style: {
          colors: [
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff"
          ],
        },
      },
    },
    yaxis: {
      labels: {
        show: true,
        align: "right",
        minWidth: 0,
        maxWidth: 160,
        style: {
          colors: [
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff"
          ],
        },
      },
    },

    tooltip: {
      y: {
        formatter: function (val) {
          if (val >= 1000000000) {
            // Convert to billions (e.g., 1.2b)
            return (val / 1000000000).toFixed(1) + "b products";
          } else if (val >= 1000000) {
            // Convert to millions (e.g., 1.2m)
            return (val / 1000000).toFixed(1) + "m products";
          } else if (val >= 1000) {
            // Convert to thousands (e.g., 1.2k)
            return (val / 1000).toFixed(1) + "k products";
          } else {
            return val + ' products';
          }
          // return number + " products";
        },
      },
    },
  },
};

export default eChart;
