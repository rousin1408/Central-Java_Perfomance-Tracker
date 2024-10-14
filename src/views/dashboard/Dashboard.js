import React from 'react'
import classNames from 'classnames'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CWidgetStatsA,
} from '@coreui/react'
import { CChartBar, CChartDoughnut, CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'
import AngularImg from 'src/assets/images/angular.jpg'
import ReactImg from 'src/assets/images/react.jpg'
import VueImg from 'src/assets/images/vue.jpg'
import IndosatImg from 'src/assets/images/indosat.jpg'
import favicon from 'src/assets/images/favicon.png'

import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import MainChart from './MainChart'

const Dashboard = () => {
  const progressExample = [
    { title: 'Highest',city: "Purwokerto", value: '3000000', percent: 40, color: 'success' },
    { title: 'Average', value: '2000000', percent: 20, color: 'info' },
    { title: 'Lowest',city: "Malang", value: '300000000', percent: 60, color: 'danger' },
  ]

  const progressGroupExample1 = [
    { title: 'Monday', value1: 34, value2: 78 },
    { title: 'Tuesday', value1: 56, value2: 94 },
    { title: 'Wednesday', value1: 12, value2: 67 },
    { title: 'Thursday', value1: 43, value2: 91 },
    { title: 'Friday', value1: 22, value2: 73 },
    { title: 'Saturday', value1: 53, value2: 82 },
    { title: 'Sunday', value1: 9, value2: 69 },
  ]

  const progressGroupExample2 = [
    { title: 'Male', icon: cilUser, value: 53 },
    { title: 'Female', icon: cilUserFemale, value: 43 },
  ]

  const progressGroupExample3 = [
    { title: 'Organic Search', icon: cibGoogle, percent: 56, value: '191,235' },
    { title: 'Facebook', icon: cibFacebook, percent: 15, value: '51,223' },
    { title: 'Twitter', icon: cibTwitter, percent: 11, value: '37,564' },
    { title: 'LinkedIn', icon: cibLinkedin, percent: 8, value: '27,319' },
  ]

  

  return (
    <>
      <WidgetsDropdown className="mb-4" />
      
      <CRow>
        <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          chart={
            <div style={{ padding: '0px 20px 20px 19px', paddingBottom: '16px', position: 'relative' }}> 
              {/* Box with 2x2 layout and vertical/horizontal divider */}
              <div style={{ display: 'grid' }}>
                
                {/* Net Add 30D */}
                <div style={{ textAlign: 'Left' ,margin:'5px' }}>
                  <div style={{ color: '#000' }}>Daily URO</div>

                </div>

               
                {/* Net Add 90D */}
                <div style={{ textAlign: 'Right',margin:'5px' }}>
                <span style={{ color: 'red', fontWeight: 'bold', marginLeft: '5px' }}>
                ▼ -92.0%
              </span>
              </div>

                {/* Horizontal Divider */}
                <div style={{
                  backgroundColor: '#ccc',
                  height: '1px',
                  width: 'calc(95% + 5px)',  // Adjust width to span full grid width
                  gridColumn: '1 / span 3',  // Ensures it spans across both columns
                  // marginTop: '10px',
                  // marginBottom: '10px',
                  alignSelf: 'center'
                }}></div>

                {/* Gross Churn 30D */}
                <div style={{ textAlign: 'Left',margin:'5px' }}>
                  <div style={{ color: '#000' }}>Daily SSO</div>
                </div>
                <div style={{ textAlign: 'Right',margin:'5px' }}>
                <span style={{ color: 'red', fontWeight: 'bold', marginLeft: '5px' }}>
                ▼ -20.0%
              </span>
              </div>

              </div>
            </div>
          }
        />
       
        <br/>
       

      <CCard className="mb-4">
        <CCardBody>
          <div style={{ display: 'flex', alignItems: 'center', padding:'10px 0px 0px 0px' }}>
            <div style={{ width: '60%', height: '60%' }}>
              <CChartDoughnut 
                data={{
                  labels: [], // Empty array to remove labels
                  datasets: [{
                    data: [90.77, 9.23],
                    backgroundColor: ['#FFCE56', '#E7E9ED'],
                  }]
                }} 
                options={{ 
                  maintainAspectRatio: false, 
                  cutout: '80%',  // Makes the center hollow
                  plugins: {
                    legend: { display: false },  // Hides the legend
                    tooltip: { enabled: false }  // Disables tooltips if unwanted
                  }
                }} 
              />
                    <div style={{
                position: 'relative', 
                top: '-85px', 
                textAlign: 'center', 
                fontWeight: 'bold', 
                fontSize: '15px'
              }}>
                90.77%
              </div>
            </div>
            <div style={{ paddingLeft: '20px', fontSize:'12px' }}>
              <h6>Quro</h6>
              <p>29,726<br/>Month To Date</p>

            </div>

          </div>
        </CCardBody>
      </CCard>
        <br/>
       
        
      <CCard className="mb-5">
        <CCardBody>
          <div style={{ display: 'flex', alignItems: 'center', padding:'10px 0px 0px 0px' }}>
            <div style={{ width: '60%', height: '100%' }}>
              <CChartDoughnut 
                data={{
                  labels: [], // Empty array to remove labels
                  datasets: [{
                    data: [90.77, 9.23],
                    backgroundColor: ['#FFCE56', '#E7E9ED'],
                  }]
                }} 
                options={{ 
                  maintainAspectRatio: false, 
                  cutout: '80%',  // Makes the center hollow
                  plugins: {
                    legend: { display: false },  // Hides the legend
                    tooltip: { enabled: false }  // Disables tooltips if unwanted
                  }
                }} 
              />
                    <div style={{
                position: 'relative', 
                top: '-85px', 
                textAlign: 'center', 
                fontWeight: 'bold', 
                fontSize: '15px'
              }}>
                90.77%
              </div>
            </div>
            <div style={{ paddingLeft: '20px', fontSize:'12px' }}>
              <h6>QSSO</h6>
              <p>5,862</p>
              <p>Month To Date</p>
            </div>

          </div>
        </CCardBody>
      
      </CCard>
       

      </CCol>
      <CCol sm={9} xl={7} xxl={5}>
          <CWidgetStatsA
                title={<span style={{ fontWeight: 'bold', fontSize: '18px', color: '#000' }}>Revenue</span>}
                chart={
                  <div style={{ margin: '0px 20px 20px 20px' }}> {/* Added width: 100% */}
                    <CChartBar
                      data={{
                        labels: ['Data', 'Mobo', 'Organic', 'Mobo Trade', 'Mobo Non-trade', 'Vas'],
                        datasets: [
                          {
                            label: 'Dataset Example',
                            data: [1964.90, 1945.09, 85.000, 30.000, 20.000, 20.000],
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                          },
                        ],
                      }}
                      options={{
                        indexAxis: 'y',
                        responsive: true,
                        plugins: {
                          legend: { display: false },
                        },
                        scales: {
                          x: {
                            grid: { display: false },
                            beginAtZero: true, 
                          },
                          y: {
                            grid: { display: false }, 
                            ticks: { display: true },
                          },
                        },
                      }}
                    />
                  </div>
                }
              />
              <br/>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ width: '100%' }}>
                        <CCard className="mb-4">
                          <CCardBody>
                            <CRow>
                              <CCol >
                                <h4 id="traffic" className="card-title mb-0">
                                  Revenue By Branch
                                </h4>   
                              </CCol>
                            </CRow> 
                            <MainChart />
                          </CCardBody>
                          <CCardFooter>
                            <CRow
                            sm={8} xl={6} xxl={4}
                              className="mb-8 text-center justify-content-center align-items-center"
                            >
                              {progressExample.map((item, index, items) => (
                                <CCol
                                  className={classNames({
                                    'd-none d-xl-block': index + 1 === items.length, 
                                  })}
                                  key={index}
                                >
                                  <div style={{ fontSize: '18px' }} className="text-body-secondary">{item.title}</div>
                                  <div  style={{ fontSize: '16px' }} className="fw-semibold text-truncate">
                                    {item.value} ({item.percent}%)
                                  </div>
                                  <div style={{ fontSize: '18px' }} className="text-body-secondary">{item.city}</div>
                                  {/* <CProgress thin className="mt-2" color={item.color} value={item.percent} /> */}
                                </CCol>
                              ))}
                            </CRow>
                          </CCardFooter>
                        </CCard>
                      </div>
              </div>
      </CCol>
      
      <CCol sm={8} xl={6} xxl={4}>
        <CCard className="mb-4" style={{ height: '39%' }}> {/* Match the height of Target Total Revenue */}
          <CCardHeader>TRADE</CCardHeader>
          <CCardBody>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ width: '45%'  }}>
                <div style={{ backgroundColor: 'green', height: '200px', textAlign: 'center' }}>
                  <p>Trade Supply</p>
                  <p>62.22B</p>
                </div>
              </div>
              <div style={{ width: '45%' }}>
                <div style={{ backgroundColor: 'orange', height: '200px', textAlign: 'center' }}>
                  <p>Trade Rebuy</p>
                  <p>61.08B</p>
                </div>
              </div>
            </div>
          </CCardBody>
        </CCard>
       <br/>
       <br/>
        <CWidgetStatsA
              title={
                <span style={{ fontWeight: 'bold', fontSize: '18px', color: '#000' }}>
                  Target Total Revenue
                </span>
              }
              chart={
                <div style={{ position: 'relative', height: '200px', padding: '10px' }}>
                  {/* Custom styles for chart height and padding */}
                  <CChartDoughnut
                    data={{
                      labels: ['North Central Java', 'South Central Java'],
                      datasets: [
                        {
                          data: [46.01, 53.99], // Your actual values for the two regions
                          backgroundColor: ['#FFCE56', '#FF6347'], // Custom colors
                          hoverBackgroundColor: ['#FFC300', '#FF4500'], // Hover effect colors
                          borderWidth: 0, // No border
                        },
                      ],
                    }}

                    options={{
                      maintainAspectRatio: false,
                      cutout: '80%', // Controls the inner circle size
                      plugins: {
                        legend: {
                          display: true,
                          position: 'right', // Display the labels on the right side
                          labels: {
                            usePointStyle: true, // Dot point style for legend items
                            font: {
                              size: 10, // Adjust font size as needed
                              weight: 'bold',
                            },
                          },
                        },
                        
                        
                        beforeDraw: function (chart) {
                          const { ctx, width, height } = chart;
                          ctx.save();
                          const text = '46.01%'; // Center percentage text
                          ctx.textAlign = 'center';
                          ctx.textBaseline = 'middle';
                          ctx.font = 'bold 24px Arial'; // Customize font size and style
                          const textX = width / 2;
                          const textY = height / 2;
                          ctx.fillText(text, textX, textY); // Draw the text in the center
                          ctx.restore();
                        },
                      },
                    }}
                  />
                  <div style={{
                        position: 'relative', 
                        top: '-85px', 
                        left:'-60px',
                        textAlign: 'center', 
                        fontWeight: 'bold', 
                        fontSize: '15px'
                      }}>
                        53.99%
                      </div>
                </div>
              }
            />
      </CCol>

    </CRow>
    </>
  )
}

export default Dashboard
