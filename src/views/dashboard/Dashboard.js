import React, { useEffect, useRef, useState } from 'react'
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
import axios from 'axios'; // Ensure axios is imported
import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import MainChart from './MainChart'
import SortSales from './SortSales'
import { getStyle } from '@coreui/utils'

const Dashboard = () => {

  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0'); // Menambahkan 1 karena bulan dimulai dari 0
  const dd = String(today.getDate()).padStart(2, '0');
  const formattedToday = `${yyyy}-${mm}-${dd}`;
  const formatNumber = (number) => {
    return new Intl.NumberFormat('id-ID', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);
  };
  const chartRef = useRef(null);
  const [totalRevenueData, setTotalRevenueData] = useState({
    totalRevenue: { dailyssogrowth: 0, dailyurogrowth: 0,
      qurogrowth:0,quromtd:0,
      qssogrowth:0,qssomtd:0,
      moboMtd: 0, dataRevMtd: 0, vasRevMtd: 0, 
      moboTradeMtd: 0, moboNonTradeMtd: 0, orgRevMtd: 0 
      ,salesDatanorth:0,salesDatasouth:0,
      tradeSupplyMtd:0, tradeCvmRevMtd:0,tradeSpMtd:0,tradeRebuyMtd:0
      ,labelshighest: 0,
      revenueshighest: 0,
      labelslowest : 0,
      revenueslowest:0,
      lmtd: 0, mtd: 0,
      vlrlmtd: 0, vlrmtd: 0,
      rgu90lmtd: 0, rgu90mtd: 0,
      net30: 0, net90: 0,
      churn30: 0, churn90: 0,
      totRevGrowth:0, vltGrowth:0,
     rgu90Growth:0
       },
  });
  const progressExample = [
    { title: 'Highest',city: totalRevenueData.totalRevenue.labelshighest, value:formatNumber(Math.round(totalRevenueData.totalRevenue.revenueshighest))},
    { title: 'Average', value: formatNumber(Math.round(totalRevenueData.totalRevenue.mtd)), color: 'info' },
    { title: 'Lowest',city: totalRevenueData.totalRevenue.labelslowest, value: formatNumber(Math.round(totalRevenueData.totalRevenue.revenueslowest)), color: 'danger' },
  ]
  const totalSales = totalRevenueData.totalRevenue.salesDatanorth + totalRevenueData.totalRevenue.salesDatasouth;
    
  // tradeSupplyMtd, tradeCvmRevMtd,tradeSpMtd,tradeRebuyMtd
  const southPercentage = totalRevenueData.totalRevenue.salesDatasouth / totalSales * 100;
  const northPercentage = totalRevenueData.totalRevenue.salesDatanorth / totalSales * 100;
  const displayedPercentage = totalRevenueData.totalRevenue.salesDatasouth > totalRevenueData.totalRevenue.salesDatanorth 
        ? southPercentage 
        : northPercentage;
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
          setSelectedDate(date);
        };
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

  
    // Menampilkan persentase untuk South atau North tergantung mana yang lebih besar
    

    const fetchData = async () => {
      try {
       
        const secondUrl = selectedDate
        ? import.meta.env.VITE_API_URL +'/SecondColumn?created_at='+selectedDate
        : import.meta.env.VITE_API_URL +'/SecondColumn?created_at='+formattedToday;
        const response = await axios.get(secondUrl); // Adjust the URL if necessary
        const salesData = response.data;

        const revenueSouthUrl = selectedDate
        ? import.meta.env.VITE_API_URL +'/RevenueSouth?created_at='+selectedDate
        : import.meta.env.VITE_API_URL +'/RevenueSouth?created_at='+formattedToday;
        const responsesouth = await axios.get(revenueSouthUrl);
        const salesDatasouth = responsesouth.data;

        const revenueNorthUrl = selectedDate
        ? import.meta.env.VITE_API_URL +'/RevenueNorth?created_at='+selectedDate
        : import.meta.env.VITE_API_URL +'/RevenueNorth?created_at='+formattedToday;
        const responsenorth = await axios.get(revenueNorthUrl);
        const salesDatanorth = responsenorth.data;

        const highest = selectedDate
        ? import.meta.env.VITE_API_URL +'/highest?created_at='+selectedDate
        : import.meta.env.VITE_API_URL +'/highest?created_at='+formattedToday;
        const responsehighest = await axios.get(highest);
        const highestData = responsehighest.data;

        const lowest = selectedDate
        ? import.meta.env.VITE_API_URL +'/lowest?created_at='+selectedDate
        : import.meta.env.VITE_API_URL +'/lowest?created_at='+formattedToday;
        const responselowest = await axios.get(lowest);
        const lowestData = responselowest.data;

        const responseapi = selectedDate
        ? import.meta.env.VITE_API_URL +'/TopColumn?created_at='+selectedDate
        : import.meta.env.VITE_API_URL +'/TopColumn?created_at='+formattedToday;
        const responses = await axios.get(responseapi);
        const salesDatas = responses.data;
        // Assuming the response is structured like:
        // { totRevLmtd: number, totRevGrowth: number }
        if (!Array.isArray(highestData)) {
          console.error('Expected an array, but got:', highestData);
          return; // Early return if data is not as expected
        }
        if (!Array.isArray(lowestData)) {
          console.error('Expected an array, but got:', lowestData);
          return; // Early return if data is not as expected
        }

        const totalRevenueData = {
          totalRevenue: {
            dailyssogrowth: salesData.dailySsoGrowth,
            dailyurogrowth: salesData.dailyUroGrowth,
            mtd: salesData.totRevMtd,
            qurogrowth:salesData.quroGrowth,
            quromtd:salesData.quroMtd,
            qssogrowth:salesData.qssoGrowth,
            qssomtd:salesData.qssoMtd,
            moboMtd: salesData.moboMtd, // Replace with the actual field names from the backend
            dataRevMtd: salesData.dataRevMtd,
            vasRevMtd: salesData.vasRevMtd,
            moboTradeMtd: salesData.moboTradeMtd,
            moboNonTradeMtd: salesData.moboNonTradeMtd,
            orgRevMtd: salesData.orgRevMtd,
            salesDatanorth:salesDatanorth.totRevMtd,
            salesDatasouth:salesDatasouth.totRevMtd,
            tradeSupplyMtd:salesData.tradeSupplyMtd,
            tradeCvmRevMtd:salesData.tradeCvmRevMtd,
            tradeSpMtd:salesData.tradeSpMtd,
            tradeRebuyMtd:salesData.tradeRebuyMtd,
            labelshighest: highestData.map(item => item.salesArea),
            revenueshighest: highestData.map(item => item.averageRevenue),
            labelslowest : lowestData.map(item => item.salesArea),
            revenueslowest: lowestData.map(item => item.averageRevenue),
            lmtd: salesDatas.totRevLmtd,
            vlrlmtd: salesDatas.vlrLmtd,
            vlrmtd: salesDatas.vlrMtd,
            rgu90lmtd: salesDatas.rgu90Lmtd,
            rgu90mtd: salesDatas.rgu90Mtd,
            net30: salesDatas.netAdd30d,
            net90:salesDatas.netAdd90d,
            churn30:salesDatas.grossMtdChurn30d,
            churn90:salesDatas.grossMtdChurn90d,
            totRevGrowth:salesDatas.totRevGrowth,
            rgu90Growth:salesDatas.rgu90Growth,
            vltGrowth:salesDatas.vlrGrowth,
          },
        };

        setTotalRevenueData(totalRevenueData);
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    };

    fetchData();
  },[selectedDate])

  return (
    <>
    <CRow>
      <CCol sm={6} xl={4} xxl={3}>
      <SortSales onDateChange={handleDateChange} />
      <CWidgetStatsA
          chart={
            <div style={{ padding: '0px 20px 20px 19px', paddingBottom: '20px', position: 'relative' }}> 
              {/* Box with 2x2 layout and vertical/horizontal divider */}
              <div style={{ display: 'grid' }}>
                
                {/* Net Add 30D */}
                <div style={{ textAlign: 'Left' ,margin:'5px' }}>
                  <div>Daily URO</div>

                </div>
                {/* Net Add 90D */}
                <div style={{ textAlign: 'Right',margin:'5px' }}>
                <span style={{ color: totalRevenueData.totalRevenue.dailyurogrowth < 0 ? 'Red' : 'Green', fontWeight: 'bold', marginLeft: '5px' }}>
                {totalRevenueData.totalRevenue.dailyurogrowth < 0 ? '▼' : '▲'} {totalRevenueData.totalRevenue.dailyurogrowth === null ? 0 : totalRevenueData.totalRevenue.dailyurogrowth.toFixed(2)}%
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
                  <div >Daily SSO</div>
                </div>
                <div style={{ textAlign: 'Right',margin:'5px' }}>
                <span style={{ color: totalRevenueData.totalRevenue.dailyssogrowth < 0 ? 'red' : 'green', fontWeight: 'bold', marginLeft: '5px' }}>
                {totalRevenueData.totalRevenue.dailyssogrowth < 0 ? '▼' : '▲'} {totalRevenueData.totalRevenue.dailyssogrowth === null ? 0 : totalRevenueData.totalRevenue.dailyssogrowth.toFixed(2)}%
              </span>
              </div>

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
            {totalRevenueData.totalRevenue.rgu90Growth < 0 ? '▼' : '▲'} {totalRevenueData.totalRevenue.rgu90Growth === null ? 0 : totalRevenueData.totalRevenue.rgu90Growth.toFixed(2)}%
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
            {totalRevenueData.totalRevenue.vltGrowth < 0 ? '▼' : '▲'} {totalRevenueData.totalRevenue.vltGrowth === null ? 0 : totalRevenueData.totalRevenue.vltGrowth.toFixed(2)}%
            </span>
          </div>
            </div>
          }
        >

        </CWidgetStatsA>

      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
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
      <br/>
   

      <CRow>

      <CCol sm={9} xl={6} xxl={5}>
      <CWidgetStatsA
            title={<span style={{ fontWeight: 'bold', fontSize: '18px' }}>Revenue</span>}
            chart={
              <div style={{ margin: '0px 20px 20px 20px' }}>
                <CChartBar
                  data={{
                    labels: ['Data', 'Mobo', 'Organic', 'Mobo Trade', 'Mobo Non-trade', 'Vas'],
                    datasets: [
                      {
                        label: 'Revenue',
                        data : [
                          totalRevenueData.totalRevenue.dataRevMtd !== null 
                              ? totalRevenueData.totalRevenue.dataRevMtd.toFixed(2) 
                              : 0, 
                          totalRevenueData.totalRevenue.moboMtd !== null 
                              ? totalRevenueData.totalRevenue.moboMtd.toFixed(2) 
                              : 0,
                          totalRevenueData.totalRevenue.orgRevMtd !== null 
                              ? totalRevenueData.totalRevenue.orgRevMtd.toFixed(2) 
                              : 0,
                          totalRevenueData.totalRevenue.moboTradeMtd !== null 
                              ? totalRevenueData.totalRevenue.moboTradeMtd.toFixed(2) 
                              : 0,
                          totalRevenueData.totalRevenue.moboNonTradeMtd !== null 
                              ? totalRevenueData.totalRevenue.moboNonTradeMtd.toFixed(2) 
                              : 0,
                          totalRevenueData.totalRevenue.vasRevMtd !== null 
                              ? totalRevenueData.totalRevenue.vasRevMtd.toFixed(2) 
                              : 0,
                      ],
                        backgroundColor: [
                          'rgba(75, 192, 192, 0.6)', // Data
                          'rgba(255, 99, 132, 0.6)', // Mobo
                          'rgba(54, 162, 235, 0.6)', // Organic
                          'rgba(255, 206, 86, 0.6)',  // Mobo Trade
                          'rgba(75, 192, 192, 0.6)', // Mobo Non-trade
                          'rgba(153, 102, 255, 0.6)', // Vas
                        ],
                      },
                    ],
                  }}
                  options={{
                    indexAxis: 'y',
                    plugins: {
                      legend: { display: false },
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {
                          maxTicksLimit: 7,
                          stepSize: Math.ceil(250 / 5),
                        },
                      },
                    },
                  }}
                />
              </div>
            }
          />

              <br/>
             
              
      </CCol>
      
      <CCol sm={7} xl={5} xxl={3}>
 

  <CWidgetStatsA
  title={
    <span style={{ fontWeight: 'bold', fontSize: '18px' }}>
      Target Total Revenue
    </span>
  }
  chart={
    <div style={{ position: 'relative', height: '244px', padding: '25px' }}>
      {/* Custom styles for chart height and padding */}
      <CChartDoughnut
        data={{
          labels: ['North Central Java', 'South Central Java'],
          datasets: [
            {
              data: [
                totalRevenueData.totalRevenue.salesDatanorth === null ? 0 : totalRevenueData.totalRevenue.salesDatanorth.toFixed(2),
                totalRevenueData.totalRevenue.salesDatasouth === null ? 0 : totalRevenueData.totalRevenue.salesDatasouth.toFixed(2)
              ], // Your actual values for the two regions
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
              const totalRevenue =
                totalRevenueData.totalRevenue.salesDatanorth +
                totalRevenueData.totalRevenue.salesDatasouth;
                const percentageNorth = 
                totalRevenue !== 0 && totalRevenueData.totalRevenue.salesDatanorth !== null
                    ? ((totalRevenueData.totalRevenue.salesDatanorth / totalRevenue) * 100).toFixed(2)
                    : 0; // You can change 0 to any desired placeholder for when it's null
            
            const percentageSouth = 
                totalRevenue !== 0 && totalRevenueData.totalRevenue.salesDatasouth !== null
                    ? ((totalRevenueData.totalRevenue.salesDatasouth / totalRevenue) * 100).toFixed(2)
                    : 0; // Same as above for the South percentage
            
      
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.font = 'bold 24px Arial';
              const textX = width / 2;
              const textY = height / 2;
      
              // Draw percentage based on which region is greater
              if (totalRevenueData.totalRevenue.salesDatanorth > totalRevenueData.totalRevenue.salesDatasouth) {
                ctx.fillText(percentageNorth + '%', textX, textY);
              } else {
                ctx.fillText(percentageSouth + '%', textX, textY);
              }
      
              ctx.restore();
          },
        }
        }
      }
      />
      <div style={{
        position: 'relative', 
        top: '-85px', 
        left: '-60px',
        textAlign: 'center', 
        fontWeight: 'bold', 
        fontSize: '15px'
      }}>
       {displayedPercentage === null ? 0 : displayedPercentage.toFixed(2)}%
      </div>
    </div>
  }
/>
<br/>

</CCol>
<CCol sm={6} xl={4} xxl={4}>
  <CCard className="mb-4" style={{ height: '286px' }}>
  {/* tradeSupplyMtd, tradeCvmRevMtd,tradeSpMtd,tradeRebuyMtd */}
    <CCardHeader><b>Trade</b></CCardHeader>
    <CCardBody>
      <div style={{ display: 'flex', height: '80%', gap: '5px' }}>
        {/* Kolom kiri: Trade Supply */}
        <div style={{ width: '38%', backgroundColor: '#6CC24A', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <p style={{ margin: 0,color:'white' }}>Trade Supply</p>
          <p style={{ margin: 0,color:'white' }}>{formatNumber(totalRevenueData.totalRevenue.tradeSupplyMtd === null ? 0 :totalRevenueData.totalRevenue.tradeSupplyMtd.toFixed(2))}B</p>
        </div>

        {/* Kolom kanan (atas): Trade Rebuy */}
        <div style={{ width: '88%', display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <div style={{ backgroundColor: '#F8D565', height: '80%', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <p style={{ margin: 0,color:'white' }}>Trade Rebuy</p>
            <p style={{ margin: 0 ,color:'white'}}>{formatNumber(totalRevenueData.totalRevenue.tradeRebuyMtd === null ? 0 : totalRevenueData.totalRevenue.tradeRebuyMtd.toFixed(2))}B</p>
          </div>

          {/* Kolom kanan bawah: Trade Cum Rev dan Trade (kecil) */}
          <div style={{ display: 'flex', height: '80%', gap: '5px' }}>
            <div style={{ width: '80%', backgroundColor: '#A8D1F2', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
              <p style={{ margin: 0,color:'white' }}>Trade Cum Rev</p>
              <p style={{ margin: 0 ,color:'white'}}>{formatNumber(totalRevenueData.totalRevenue.tradeCvmRevMtd === null ? 0 :totalRevenueData.totalRevenue.tradeCvmRevMtd.toFixed(2))}B</p>
            </div>
            <div style={{ width: '80%', backgroundColor: '#789C61', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
              <p style={{ margin: 0,color:'white' }}>Trade SP</p>
              <p style={{ margin: 0,color:'white' }}>{formatNumber(totalRevenueData.totalRevenue.tradeSpMtd === null ? 0 : totalRevenueData.totalRevenue.tradeSpMtd.toFixed(2))}B</p>
            </div>
          </div>
        </div>
      </div>
    </CCardBody>
  </CCard>
</CCol>

    </CRow>
    <CRow>
      <CCol sm={6} xl={4} xxl={3}>
      <CCard className="mb-4">
        <CCardBody>
          <div style={{ display: 'flex', alignItems: 'center', padding:'10px 0px 0px 0px' }}>
            <div style={{ width: '60%', height: '60%' }}>
              <CChartDoughnut 
                data={{
                  labels: [], // Empty array to remove labels
                  datasets: [{
                    data: [totalRevenueData.totalRevenue.quromtd === null ? 0 : totalRevenueData.totalRevenue.quromtd.toFixed(2),1-(totalRevenueData.totalRevenue.quromtd === null ? 0 :totalRevenueData.totalRevenue.quromtd.toFixed(2))],
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
                {totalRevenueData.totalRevenue.qurogrowth === null ? 0 :totalRevenueData.totalRevenue.qurogrowth.toFixed(2)}%
              </div>
            </div>
            <div style={{ paddingLeft: '20px', fontSize:'12px' }}>
              <h6>Quro</h6>
              <p>{totalRevenueData.totalRevenue.quromtd === null ? 0 :totalRevenueData.totalRevenue.quromtd.toFixed(2)}<br/>Month To Date</p>

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
                    data: [totalRevenueData.totalRevenue.qssomtd === null ? 0 :totalRevenueData.totalRevenue.qssomtd.toFixed(2), 1-(totalRevenueData.totalRevenue.qssomtd === null ? 0 :totalRevenueData.totalRevenue.qssomtd.toFixed(2))],
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
                {totalRevenueData.totalRevenue.qssogrowth === null ? 0 :totalRevenueData.totalRevenue.qssogrowth.toFixed(2)}%
              </div>
            </div>
            <div style={{ paddingLeft: '20px', fontSize:'12px' }}>
              <h6>QSSO</h6>
              <p>{totalRevenueData.totalRevenue.qssomtd === null ? 0 : totalRevenueData.totalRevenue.qssomtd.toFixed(2)}</p>
              <p>Month To Date</p>
            </div>

          </div>
        </CCardBody>
      
      </CCard>
      </CCol>
      <CCol sm={12} xl={10} xxl={9}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ width: '100%' }}>
                        <CCard className="mb-4">
                          <CCardBody>
                            <CRow>
                              <CCol >
                                <h5 id="traffic" className="card-title mb-0">
                                  <b>Revenue By Branch</b>
                                </h5>   
                              </CCol>
                            </CRow> 
                            <MainChart selectedDate={selectedDate} key={selectedDate} /> {/* Gunakan key */}
                          </CCardBody>
                          <CCardFooter>
                            <CRow
                            sm={9} xl={6} xxl={5}
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
                                    {item.value} 
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
    </CRow>
    </>
  )
}

export default Dashboard
