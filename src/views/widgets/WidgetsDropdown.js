import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

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

const WidgetsDropdown = (props) => {
  const widgetChartRef1 = useRef(null)
  const widgetChartRef2 = useRef(null)
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
  useEffect(() => {
    document.documentElement.addEventListener('ColorSchemeChange', () => {
      if (widgetChartRef1.current) {
        setTimeout(() => {
          widgetChartRef1.current.data.datasets[0].pointBackgroundColor = getStyle('--cui-primary')
          widgetChartRef1.current.update()
        })
      }

      if (widgetChartRef2.current) {
        setTimeout(() => {
          widgetChartRef2.current.data.datasets[0].pointBackgroundColor = getStyle('--cui-info')
          widgetChartRef2.current.update()
        })
      }
    })
  }, [widgetChartRef1, widgetChartRef2])

  return (
    <CRow className={props.className}>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
           title={<span style={{ fontWeight: 'bold', fontSize: '18px', color: '#000' }}>Total Revenue</span>}
          chart={
            <div style={{ paddingBottom: '20px' }}> {/* Added padding at the bottom */}
              <CChartBar
                data={{
                  labels: ['LMTD', 'MTD'], // Labels for LMTD and MTD
                  datasets: [
                    {
                      label: 'Revenue',
                      data: [205.84, 200.08], // Values for LMTD and MTD
                      backgroundColor: ['#dcdcdc', '#ffcc00'], // Colors for LMTD and MTD
                      barPercentage: 0.6, // Adjust bar width
                      borderRadius: 5, // Rounded bar edges
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { display: false }, // Hide legend
                  },
                  
                  scales: {
                    x: {
                      grid: {
                        display: false, // Hide grid lines on the x-axis
                      },
                    },
                    y: {
                      grid: {
                        display: false, // Hide grid lines on the y-axis
                      },
                      ticks: {
                        display: false, // Hide y-axis ticks
                      },
                    },
                  },
                }}
              />
                    {/* Add MOM percentage below the chart */}
      <div style={{ textAlign: 'center', marginTop: '10px' }}>
      <span style={{ fontWeight: 'bold', fontSize: '14px', color: '#6c757d' }}>MOM</span> {/* MOM Text */}
      <span style={{ color: 'red', fontWeight: 'bold', marginLeft: '5px' }}> {/* Arrow and percentage */}
        ▼ 24.0%
      </span>
    </div>
            </div>
          }
        />
      </CCol>

      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          title={<span style={{ fontWeight: 'bold', fontSize: '18px', color: '#000' }}>RGU GA</span>}
          chart={
            <div style={{ paddingBottom: '20px' }}>
              <CChartBar
                data={{
                  labels: ['LMTD', 'MTD'],
                  datasets: [
                    {
                      label: 'Revenue',
                      data: [205.84, 200.08], // LMTD, MTD values
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
            <span style={{ fontWeight: 'bold', fontSize: '14px', color: '#6c757d' }}>MOM</span> {/* MOM Text */}
            <span style={{ color: 'red', fontWeight: 'bold', marginLeft: '5px' }}> {/* Arrow and percentage */}
              ▼ 24.0%
            </span>
          </div>
            </div>
          }
        >

        </CWidgetStatsA>

      </CCol>

      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          title={<span style={{ fontWeight: 'bold', fontSize: '18px', color: '#000' }}>VLR</span>}
          chart={
            <div style={{ paddingBottom: '20px' }}>
              <CChartBar
                data={{
                  labels: ['LMTD', 'MTD'],
                  datasets: [
                    {
                      label: 'Revenue',
                      data: [205.84, 200.08], // LMTD, MTD values
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
            <span style={{ fontWeight: 'bold', fontSize: '14px', color: '#6c757d' }}>MOM</span> {/* MOM Text */}
            <span style={{ color: 'red', fontWeight: 'bold', marginLeft: '5px' }}> {/* Arrow and percentage */}
              ▼ 24.0%
            </span>
          </div>
            </div>
          }
        >

        </CWidgetStatsA>

      </CCol>
      <CCol sm={7} xl={4} xxl={3}>
        <CWidgetStatsA
          title={<span style={{ fontWeight: 'bold', fontSize: '18px', color: '#000' }}>Subscriber</span>}
          chart={
            <div style={{ padding: '28px', position: 'relative' }}> 
              {/* Box with 2x2 layout and vertical/horizontal divider */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1px 1fr' }}>
                
                {/* Net Add 30D */}
                <div style={{ textAlign: 'center' ,margin:'5px' }}>
                  <div style={{ color: '#000' }}>Net Add 30D</div>
                  <div style={{ color: 'red', fontWeight: 'Bold' }}>(406,797)</div>
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
                  <div style={{ color: '#000' }}>Net Add 90D</div>
                  <div style={{ color: 'red', fontWeight: 'Bold' }}>(243,807)</div>
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
                  <div style={{ color: '#000' }}>Gross Churn 30D</div>
                  <div style={{ color: 'green', fontWeight: 'Bold' }}>818,371</div>
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
                  <div style={{ color: '#000'}}>Gross Churn 90D</div>
                  <div style={{ color: 'green', fontWeight: 'Bold' }}>282,242</div>
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
