import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'; // Ensure axios is imported
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle } from '@coreui/utils'

const MainChart = ({ selectedDate }) => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Average Revenue',
        backgroundColor: `rgba(255, 206, 86, 0.1)`,
        borderColor:'#FFCE56',
        pointHoverBackgroundColor: getStyle('--cui-info'),
        borderWidth: 2,
        data: [], // Initially empty, will be populated on data fetch
        fill: true,
      },
    ],
  });

  useEffect(() => {
    document.documentElement.addEventListener('ColorSchemeChange', () => {
      if (chartRef.current) {
        setTimeout(() => {
          chartRef.current.options.scales.x.grid.borderColor = getStyle('--cui-border-color-translucent');
          chartRef.current.options.scales.x.grid.color = getStyle('--cui-border-color-translucent');
          chartRef.current.options.scales.x.ticks.color = getStyle('--cui-body-color');
          chartRef.current.options.scales.y.grid.borderColor = getStyle('--cui-border-color-translucent');
          chartRef.current.options.scales.y.grid.color = getStyle('--cui-border-color-translucent');
          chartRef.current.options.scales.y.ticks.color = getStyle('--cui-body-color');
          chartRef.current.update();
        });
      }
    });
    const formatDate = (date) => {
      if (!date) return '';
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
    const fetchAverageSalesData = async () => {
      try {
        const averageUrl = selectedDate
        ? import.meta.env.VITE_API_URL +'/average?created_at='+selectedDate
        : import.meta.env.VITE_API_URL +'/average?created_at='+ formatDate(new Date());
        const response = await axios.get(averageUrl);
        const averageData = response.data;
        console.log(import.meta.env.VITE_API_URL +'/average?created_at='+selectedDate)
        // Log the response to ensure it's an array
        console.log('API Response:', averageData);

        // Check if averageData is indeed an array
        if (!Array.isArray(averageData)) {
          console.error('Expected an array, but got:', averageData);
          return; // Early return if data is not as expected
        }

        // Extract labels and revenues from the averageData array
        const labels = averageData.map(item => item.salesArea);
        const revenues = averageData.map(item => item.averageRevenue);

        // Update the chart data state
        setChartData({
          labels,
          datasets: [
            {
              ...chartData.datasets[0], // Preserve other dataset properties
              data: revenues,
            },
          ],
        });
        // Update chart options
        console.log(Math.max(...revenues, 250))
        if (chartRef.current) {
          chartRef.current.options.scales.y.max = Math.max(...revenues, 250); // Set max dynamically
          chartRef.current.options.scales.y.ticks.stepSize = Math.ceil(chartRef.current.options.scales.y.max / 5);
          chartRef.current.update(); // Refresh the chart
        }
      } catch (error) {
        console.error('Error fetching average sales data:', error);
      }
    };

    fetchAverageSalesData();
  }, [chartRef]);

  return (
    <>
      <CChartLine
        ref={chartRef}
        style={{ height: '290px', marginTop: '40px' }}
        data={chartData} // Use the state for data
        options={{
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              grid: {
                color: getStyle('--cui-border-color-translucent'),
                drawOnChartArea: false,
              },
              ticks: {
                color: getStyle('--cui-body-color'),
              },
            },
            y: {
              beginAtZero: true,
              border: {
                color: getStyle('--cui-border-color-translucent'),
              },
              grid: {
                color: getStyle('--cui-border-color-translucent'),
              },
              
              ticks: {
                color: getStyle('--cui-body-color'),
                maxTicksLimit: 20,
                stepSize: Math.ceil(250 / 5),
              },
            },
          },
          elements: {
            line: {
              tension: 0.4,
            },
            point: {
              radius: 0,
              hitRadius: 10,
              hoverRadius: 4,
              hoverBorderWidth: 3,
            },
          },
        }}
      />
    </>
  )
}

export default MainChart;
