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
        <CWidgetStatsA
         title={<span style={{ fontWeight: 'bold', fontSize: '18px', color: '#000' }}>Target Total Revenue</span>}
          chart={
            <div style={{ paddingBottom: '20px' }}> {/* Added padding at the bottom */}
            <CChartDoughnut 
            data={{
              labels: ['North Central Java', 'South Central Java'],
              datasets: [{
                data: [90.77, 9.23],
                backgroundColor: ['#FFCE56', '#E7E9ED'],
              }]
            }} 
            options={{ maintainAspectRatio: false, cutout: '80%' }} 
          />
            </div>
          }
        />
       

      </CCol>
      <CCol sm={6} xl={4} xxl={3}>

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
                top: '-83px', 
                textAlign: 'center', 
                fontWeight: 'bold', 
                fontSize: '18px'
              }}>
                90.77%
              </div>
            </div>
            <div style={{ paddingLeft: '10px' }}>
              <h6>Daily Uro</h6>
              <p>-9.72%</p>
              <p>Month To Date</p>
            </div>

          </div>
        </CCardBody>
      </CCard>
        
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
                top: '-83px', 
                textAlign: 'center', 
                fontWeight: 'bold', 
                fontSize: '18px'
              }}>
                90.77%
              </div>
            </div>
            <div style={{ paddingLeft: '10px' }}>
              <h6>Daily Uro</h6>
              <p>-9.72%</p>
              <p>Month To Date</p>
            </div>

          </div>
        </CCardBody>
      </CCard>
        </CCol>
      <CCol sm={9} xl={7} xxl={6}>
      
     
      <CWidgetStatsA
         title={<span style={{ fontWeight: 'bold', fontSize: '18px', color: '#000'}}>Revenue</span>}
          chart={
            <div style={{ margin: '0px 20px 20px 20px' }}> {/* Added padding at the bottom */}
            <CChartBar
                data={{
                  labels: ['Data', 'Mobo', 'Organic', 'Mobo Trade', 'Mobo Non-trade', 'Vas'],
                  datasets: [
                    {
                      label: 'Dataset Example',
                      data: [1964.90, 1945.09, 85.000, 30.000, 20.000,  20.000],
                      backgroundColor: 'rgba(75, 192, 192, 0.2)',
                      borderColor: 'rgba(75, 192, 192, 1)',
                      
                    },
                  ],
                }}
                options={{
                  indexAxis: 'y', // membuat bar menjadi horizontal
                  responsive: true,
                  plugins: {
                    legend: { display: false },
                  },
                  scales: {
                    x: {
                      grid: { display: false },
                      beginAtZero: true, // Mulai dari 0 di sumbu x
                    },
                    y: {
                      grid: { display: false }, // Grid di sumbu y tetap tidak tampil
                      ticks: { display: true }, // Pastikan label di sumbu y tampil
                    },
                  },
                }}
              />
            </div>
          }
        />
         
        </CCol>

    </CRow>
 
    <br/>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Revenue By Branch
              </h4>
             
            </CCol>
          </CRow>
          <MainChart />
        </CCardBody>
        <CCardFooter>
          <CRow
            xs={{ cols: 1, gutter: 4 }}
            sm={{ cols: 2 }}
            lg={{ cols: 4 }}
            xl={{ cols: 5 }}
             className="mb-2 text-center justify-content-center align-items-center"
          >
            {progressExample.map((item, index, items) => (
              <CCol
                className={classNames({
                  'd-none d-xl-block': index + 1 === items.length,
                })}
                key={index}
              >
                <div className="text-body-secondary">{item.title}</div>
                <div className="fw-semibold text-truncate">
                  {item.value} ({item.percent}%)
                </div>
                <div className="text-body-secondary">{item.city}</div>
                {/* <CProgress thin className="mt-2" color={item.color} value={item.percent} /> */}
              </CCol>
            ))}
          </CRow>
        </CCardFooter>
      </CCard>
      <CCard className="mb-4">
   
  </CCard>
  <CRow>
      {/* First Column */}
      <CCol sm={4}>
        {/* Daily Uro */}
        <CCard className="mb-4">
          <CCardBody>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h6>Daily Uro</h6>
                <p>-9.72%</p>
              </div>
              
            </div>
          </CCardBody>
        </CCard>

        {/* Daily SSO */}
        <CCard className="mb-4">
          <CCardBody>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h6>Daily SSO</h6>
                <p>-67.99%</p>
              </div>
              
            </div>
          </CCardBody>
        </CCard>
      </CCol>

      {/* Second Column - Revenue Charts */}
      <CCol sm={4}>
        <CCard className="mb-4">
          <CCardHeader>Revenue</CCardHeader>
          <CCardBody>
           
          </CCardBody>
        </CCard>

        {/* Revenue by Branch */}
        <CCard className="mb-4">
          <CCardHeader>Revenue By Branch</CCardHeader>
          <CCardBody>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
              <div>
                <h6>Highest</h6>
                <p>67,273,653,395</p>
                <small>PURWOKERTO</small>
              </div>
              <div>
                <h6>Average</h6>
                <p>46,251,691,200</p>
              </div>
              <div>
                <h6>Lowest</h6>
                <p>32,877,311,298</p>
                <small>SALATIGA</small>
              </div>
            </div>
          </CCardBody>
        </CCard>
      </CCol>

      {/* Third Column - Trade Section */}
      <CCol sm={4}>
        <CCard className="mb-4">
          <CCardHeader>TRADE</CCardHeader>
          <CCardBody>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ width: '45%' }}>
                <div style={{ backgroundColor: 'green', height: '100px', textAlign: 'center' }}>
                  <p>Trade Supply</p>
                  <p>62.22B</p>
                </div>
              </div>
              <div style={{ width: '45%' }}>
                <div style={{ backgroundColor: 'orange', height: '100px', textAlign: 'center' }}>
                  <p>Trade Rebuy</p>
                  <p>61.08B</p>
                </div>
              </div>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    </>
  )
}

export default Dashboard
