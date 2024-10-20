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
        backgroundColor: `rgba(${getStyle('--cui-info-rgb')}, .1)`,
        borderColor: getStyle('--cui-info'),
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

    const fetchAverageSalesData = async () => {
      try {
        const averageUrl = selectedDate
        ? 'http://localhost:8080/api/salesdata/average?created_at='+selectedDate
        : 'http://localhost:8080/api/salesdata/average';
        const response = await axios.get(averageUrl);
        const averageData = response.data;

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
        style={{ height: '200px', marginTop: '40px' }}
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
                maxTicksLimit: 5,
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
