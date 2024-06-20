// chartOptions.js

export const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Underlying Price at Expiry',
          font: {
            size: 14
          }
        },
        grid: {
            display: false,
          }
      },
      y: {
        title: {
          display: true,
          text: 'Profit / Loss',
          font: {
            size: 14
          }
        }
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  };
  