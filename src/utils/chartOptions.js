const chartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      display: true,
      position: "top",
    },
    tooltip: {
      enabled: true,
      mode: "index",
      intersect: false,
      backgroundColor: "rgba(0,0,0,0.7)",
      
    },
  },
  scales: {
    x: {
      display: true,
      title: {
        display: true,
        text: "Prices",
      },
    },
    y: {
      display: true,
      title: {
        display: true,
        text: "Profit / Loss",
      },
    },
  },
};

export default chartOptions;
