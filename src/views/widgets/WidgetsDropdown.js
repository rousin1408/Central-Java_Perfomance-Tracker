import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'; // Ensure axios is imported
import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartBar, CChartDoughnut, CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom, cilArrowTop, cilOptions } from '@coreui/icons'

const WidgetsDropdown = (props,{selectedDate}) => {
  const chartRef = useRef(null);
const centerTextPlugin = {
    id: 'centerText',
    afterDraw(chart) {
      const { width, height, ctx } = chart;
      ctx.restore();
      const fontSize = (height / 114).toFixed(2);
      ctx.font = `${fontSize}em sans-serif`;
      ctx.textBaseline = 'middle';

      // Calculate the center position
      const text = '46.01%'; // Center text (percentage)
      const textX = Math.round((width - ctx.measureText(text).width) / 2);
      const textY = height / 2;

      // Draw text in the center
      ctx.fillText(text, textX, textY);
      ctx.save();
    },
  };
  const [totalRevenueData, setTotalRevenueData] = useState({
    totalRevenue: { lmtd: 0, mtd: 0,
       vlrlmtd: 0, vlrmtd: 0,
       rgu90lmtd: 0, rgu90mtd: 0,
       net30: 0, net90: 0,
       churn30: 0, churn90: 0,
       totRevGrowth:0, vltGrowth:0,
      rgu90Growth:0 },
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
   
    const fetchData = async () => {
      try {
        const responseapi = selectedDate
        ? 'http://localhost:8080/api/salesdata/TopColumn?created_at='+selectedDate
        : 'http://localhost:8080/api/salesdata/TopColumn';
        const response = await axios.get(responseapi);
        const salesData = response.data;

        // Assuming the response is structured like:
        // { totRevLmtd: number, totRevGrowth: number }
        const totalRevenueData = {
          totalRevenue: {
            lmtd: salesData.totRevLmtd,
            mtd: salesData.totRevMtd,
            vlrlmtd: salesData.vlrLmtd,
            vlrmtd: salesData.vlrMtd,
            rgu90lmtd: salesData.rgu90Lmtd,
            rgu90mtd: salesData.rgu90Mtd,
            net30: salesData.netAdd30d,
            net90:salesData.netAdd90d,
            churn30:salesData.grossMtdChurn30d,
            churn90:salesData.grossMtdChurn90d,
            totRevGrowth:salesData.totRevGrowth,
            rgu90Growth:salesData.rgu90Growth,
            vltGrowth:salesData.vlrGrowth
          },
        };

        setTotalRevenueData(totalRevenueData);
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    };

    fetchData();
  }, [])

  return (
    <CRow className={props.className}>
      <CCol sm={6} xl={4} xxl={3}>
      <CWidgetStatsA
      title={
        <span style={{ fontWeight: 'bold', fontSize: '18px' }}>Total Revenue</span>
      }
      chart={
        <div style={{ paddingBottom: '20px' }}>
          <CChartBar
            data={{
              labels: ['LMTD', 'MTD'],
              datasets: [
                {
                  label: 'Revenue',
                  data: [
                    Math.round(totalRevenueData?.totalRevenue?.lmtd || 0),
                    Math.round(totalRevenueData?.totalRevenue?.mtd || 0),
                  ],
                  backgroundColor: ['#dcdcdc', '#ffcc00'],
                  barPercentage: 0.6,
                  borderRadius: 5,
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { display: false },
                datalabels: {
                  anchor: 'center', // Tempatkan label di dalam batang
                  align: 'center', // Menyesuaikan label agar berada di tengah
                  color: '#fff', // Warna teks di dalam batang
                  font: {
                    weight: 'bold',
                    size: '12', // Ukuran font
                  },
                  formatter: (value) => {
                    return value; // Tampilkan nilai di dalam batang
                  },
                },
              },
              scales: {
                x: {
                  grid: { display: false },
                },
                y: {
                  grid: { display: false },
                  ticks: { display: false },
                },
              },
              
            }}
          />
          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <span style={{ fontWeight: 'bold', fontSize: '14px' }}>MOM</span>
            <span style={{ color: totalRevenueData.totalRevenue.totRevGrowth < 0 ? 'red' : 'green', fontWeight: 'bold', marginLeft: '5px' }}>
            {totalRevenueData.totalRevenue.totRevGrowth < 0 ? '▼' : '▲'} {totalRevenueData.totalRevenue.totRevGrowth.toFixed(2)}%
            </span>
          </div>
        </div>
      }
    />


      </CCol>

      <CCol sm={6} xl={4} xxl={3}>
        
        <CWidgetStatsA
          title={<span style={{ fontWeight: 'bold', fontSize: '18px' }}>RGU GA</span>}
          chart={
            <div style={{ paddingBottom: '20px' }}>
              <CChartBar
                data={{
                  labels: ['LMTD', 'MTD'],
                  datasets: [
                    {
                      label: 'Revenue',
                      data: [
                        Math.round(totalRevenueData?.totalRevenue?.rgu90lmtd || 0),
                        Math.round(totalRevenueData?.totalRevenue?.rgu90mtd|| 0),
                      ],
                      backgroundColor: ['#dcdcdc', '#ffcc00'],
                      barPercentage: 0.6,
                      borderRadius: 5,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { display: false },
                  },
                  scales: {
                    x: {
                      grid: { display: false },
                    },
                    y: {
                      grid: { display: false },
                      ticks: { display: false },
                    },
                  },
                }}
              />
                    {/* Add MOM percentage below the chart */}
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <span style={{ fontWeight: 'bold', fontSize: '14px' }}>MOM</span> {/* MOM Text */}
            <span style={{ color: totalRevenueData.totalRevenue.rgu90Growth < 0 ? 'red' : 'green', fontWeight: 'bold', marginLeft: '5px' }}> {/* Arrow and percentage */}
            {totalRevenueData.totalRevenue.rgu90Growth < 0 ? '▼' : '▲'} {totalRevenueData.totalRevenue.rgu90Growth.toFixed(2)}%
            </span>
          </div>
            </div>
          }
        >

        </CWidgetStatsA>

      </CCol>

      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          title={<span style={{ fontWeight: 'bold', fontSize: '18px' }}>VLR</span>}
          chart={
            <div style={{ paddingBottom: '20px' }}>
              <CChartBar
                data={{
                  labels: ['LMTD', 'MTD'],
                  datasets: [
                    {
                      label: 'Revenue',
                      data: [
                        Math.round(totalRevenueData?.totalRevenue?.vlrlmtd || 0),
                        Math.round(totalRevenueData?.totalRevenue?.vlrmtd || 0),
                      ],
                      backgroundColor: ['#dcdcdc', '#ffcc00'],
                      barPercentage: 0.6,
                      borderRadius: 5,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { display: false },
                  },
                  scales: {
                    x: {
                      grid: { display: false },
                    },
                    y: {
                      grid: { display: false },
                      ticks: { display: false },
                    },
                  },
                }}
              />
                    {/* Add MOM percentage below the chart */}
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <span style={{ fontWeight: 'bold', fontSize: '14px' }}>MOM</span> {/* MOM Text */}
            <span style={{ color: totalRevenueData.totalRevenue.vltGrowth < 0 ? 'red' : 'green', fontWeight: 'bold', marginLeft: '5px' }}> {/* Arrow and percentage */}
            {totalRevenueData.totalRevenue.vltGrowth < 0 ? '▼' : '▲'} {totalRevenueData.totalRevenue.vltGrowth.toFixed(2)}%
            </span>
          </div>
            </div>
          }
        >

        </CWidgetStatsA>

      </CCol>
      <CCol sm={7} xl={4} xxl={3}>
        <CWidgetStatsA
          title={<span style={{ fontWeight: 'bold', fontSize: '18px' }}>Subscriber</span>}
          chart={
            <div style={{ padding: '28px', position: 'relative' }}> 
              {/* Box with 2x2 layout and vertical/horizontal divider */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1px 1fr' }}>
                
                {/* Net Add 30D */}
                <div style={{ textAlign: 'center' ,margin:'5px' }}>
                  <div>Net Add 30D</div>
                  <div style={{ color: 'red', fontWeight: 'Bold' }}>({Math.round(totalRevenueData.totalRevenue.net30)})</div>
                </div>

                {/* Vertical Divider */}
                <div style={{
                  backgroundColor: '#ccc',
                  width: '1px',
                  height: '100%',
                  alignSelf: 'center'
                }}></div>

                {/* Net Add 90D */}
                <div style={{ textAlign: 'center',margin:'5px' }}>
                  <div>Net Add 90D</div>
                  <div style={{ color: 'red', fontWeight: 'Bold' }}>({Math.round(totalRevenueData.totalRevenue.net90)})</div>
                </div>

                {/* Horizontal Divider */}
                <div style={{
                  backgroundColor: '#ccc',
                  height: '1px',
                  width: 'calc(100% + 10px)',  // Adjust width to span full grid width
                  gridColumn: '1 / span 3',  // Ensures it spans across both columns
                  // marginTop: '10px',
                  // marginBottom: '10px',
                  alignSelf: 'center'
                }}></div>

                {/* Gross Churn 30D */}
                <div style={{ textAlign: 'center',margin:'5px' }}>
                  <div>Gross Churn 30D</div>
                  <div style={{ color: 'green', fontWeight: 'Bold' }}>{Math.round(totalRevenueData.totalRevenue.churn30)}</div>
                </div>

                {/* Vertical Divider */}
                <div style={{
                  backgroundColor: '#ccc',
                  width: '1px',
                  height: '100%',
                  alignSelf: 'center'
                }}></div>

                {/* Gross Churn 90D */}
                <div style={{ textAlign: 'center',margin:'5px' }}>
                  <div>Gross Churn 90D</div>
                  <div style={{ color: 'green', fontWeight: 'Bold' }}>{Math.round(totalRevenueData.totalRevenue.churn90)}</div>
                </div>

              </div>
            </div>
          }
        />
      </CCol>

     
    </CRow>



    
  )
}

WidgetsDropdown.propTypes = {
  className: PropTypes.string,
  withCharts: PropTypes.bool,
}

export default WidgetsDropdown
