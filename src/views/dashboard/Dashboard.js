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
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
CDropdownItem
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
      qurogrowth:0,quromtd:0,qurolmtd:0,
      qssogrowth:0,qssomtd:0,qssolmtd:0,
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
     rgu90Growth:0, city:0
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
  const displayedPercentage = (totalRevenueData.totalRevenue.salesDatanorth === 0 && totalRevenueData.totalRevenue.salesDatasouth === 0)
  ? 0  // If both are 0, set displayedPercentage to 0
  : (totalRevenueData.totalRevenue.salesDatasouth > totalRevenueData.totalRevenue.salesDatanorth ? southPercentage : northPercentage);

  const [selectedDate, setSelectedDate] = useState(null);
  const [CityRGU,setCityRGU]= useState(null);
  const [CityVLR, setCityVLR]= useState(null);
  const [CityQuro,setCityQuro]= useState(null);
  const [CityQSSO, setCityQSSO]= useState(null);
  const [salesAreas, setSalesAreas] = useState([]);
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
        const cityUrl = import.meta.env.VITE_API_URL + '/city';
        const responsecity = await axios.get(cityUrl);
        const areas = responsecity.data.map((item) => item.salesArea);
    
        const secondUrl = selectedDate
          ? import.meta.env.VITE_API_URL + '/SecondColumn?created_at=' + selectedDate
          : import.meta.env.VITE_API_URL + '/SecondColumn?created_at=' + formattedToday;
        const response = await axios.get(secondUrl);
        const salesData = response.data;
    
        const revenueSouthUrl = selectedDate
          ? import.meta.env.VITE_API_URL + '/RevenueSouth?created_at=' + selectedDate
          : import.meta.env.VITE_API_URL + '/RevenueSouth?created_at=' + formattedToday;
        const responsesouth = await axios.get(revenueSouthUrl);
        const salesDatasouth = responsesouth.data;
    
        const revenueNorthUrl = selectedDate
          ? import.meta.env.VITE_API_URL + '/RevenueNorth?created_at=' + selectedDate
          : import.meta.env.VITE_API_URL + '/RevenueNorth?created_at=' + formattedToday;
        const responsenorth = await axios.get(revenueNorthUrl);
        const salesDatanorth = responsenorth.data;
    
        const highest = selectedDate
          ? import.meta.env.VITE_API_URL + '/highest?created_at=' + selectedDate
          : import.meta.env.VITE_API_URL + '/highest?created_at=' + formattedToday;
        const responsehighest = await axios.get(highest);
        const highestData = responsehighest.data;
    
        const lowest = selectedDate
          ? import.meta.env.VITE_API_URL + '/lowest?created_at=' + selectedDate
          : import.meta.env.VITE_API_URL + '/lowest?created_at=' + formattedToday;
        const responselowest = await axios.get(lowest);
        const lowestData = responselowest.data;
    
        const responseapi = selectedDate
          ? import.meta.env.VITE_API_URL + '/TopColumn?created_at=' + selectedDate
          : import.meta.env.VITE_API_URL + '/TopColumn?created_at=' + formattedToday;
        const responses = await axios.get(responseapi);
        const salesDatas = responses.data;
    
        const averageUrl = CityRGU && selectedDate
          ? import.meta.env.VITE_API_URL + '/TopColumn?created_at=' + selectedDate + '&sales_area=' + CityRGU
          : CityRGU
            ? import.meta.env.VITE_API_URL + '/TopColumn?created_at=' + formattedToday + '&sales_area=' + CityRGU
            : selectedDate
              ? import.meta.env.VITE_API_URL + '/TopColumn?created_at=' + selectedDate + '&sales_area=null'
              : import.meta.env.VITE_API_URL + '/TopColumn?created_at=' + formattedToday + '&sales_area=null';
        const responserguga = await axios.get(averageUrl);
        const responhasilrgu = responserguga.data;
    
        const averageVLR = CityVLR && selectedDate
          ? import.meta.env.VITE_API_URL + '/TopColumn?created_at=' + selectedDate + '&sales_area=' + CityVLR
          : CityVLR
            ? import.meta.env.VITE_API_URL + '/TopColumn?created_at=' + formattedToday + '&sales_area=' + CityVLR
            : selectedDate
              ? import.meta.env.VITE_API_URL + '/TopColumn?created_at=' + selectedDate + '&sales_area=null'
              : import.meta.env.VITE_API_URL + '/TopColumn?created_at=' + formattedToday + '&sales_area=null';
        const responseVLR = await axios.get(averageVLR);
        const responhasilvlr = responseVLR.data;
    
        const quroUrl = CityQuro && selectedDate
          ? import.meta.env.VITE_API_URL + '/SecondColumn?created_at=' + selectedDate + '&sales_area=' + CityQuro
          : CityQuro
            ? import.meta.env.VITE_API_URL + '/SecondColumn?created_at=' + formattedToday + '&sales_area=' + CityQuro
            : selectedDate
              ? import.meta.env.VITE_API_URL + '/SecondColumn?created_at=' + selectedDate + '&sales_area=null'
              : import.meta.env.VITE_API_URL + '/SecondColumn?created_at=' + formattedToday + '&sales_area=null';
        const responsequro = await axios.get(quroUrl);
        const responhasilquro = responsequro.data;
    
        const qssoUrl = CityQSSO && selectedDate
          ? import.meta.env.VITE_API_URL + '/SecondColumn?created_at=' + selectedDate + '&sales_area=' + CityQSSO
          : CityQSSO
            ? import.meta.env.VITE_API_URL + '/SecondColumn?created_at=' + formattedToday + '&sales_area=' + CityQSSO
            : selectedDate
              ? import.meta.env.VITE_API_URL + '/SecondColumn?created_at=' + selectedDate + '&sales_area=null'
              : import.meta.env.VITE_API_URL + '/SecondColumn?created_at=' + formattedToday + '&sales_area=null';
        const responseqsso = await axios.get(qssoUrl);
        const responhasilqsso = responseqsso.data;
    
        if (!Array.isArray(highestData)) {
          console.error('Expected an array, but got:', highestData);
          return;
        }
        if (!Array.isArray(lowestData)) {
          console.error('Expected an array, but got:', lowestData);
          return;
        }
    
        const totalRevenueData = {
          totalRevenue: {
            dailyssogrowth: salesData.dailySsoGrowth,
            dailyurogrowth: salesData.dailyUroGrowth,
            mtd: salesData.totRevMtd,
            qurogrowth: responhasilquro.quroGrowth,
            quromtd: responhasilquro.quroMtd,
            qurolmtd: responhasilquro.quroLmtd,
            qssogrowth: responhasilqsso.qssoGrowth,
            qssomtd: responhasilqsso.qssoMtd,
            qssolmtd: responhasilqsso.qssoLmtd,
            moboMtd: salesData.moboMtd,
            dataRevMtd: salesData.dataRevMtd,
            vasRevMtd: salesData.vasRevMtd,
            moboTradeMtd: salesData.moboTradeMtd,
            moboNonTradeMtd: salesData.moboNonTradeMtd,
            orgRevMtd: salesData.orgRevMtd,
            salesDatanorth: salesDatanorth.totRevMtd,
            salesDatasouth: salesDatasouth.totRevMtd,
            tradeSupplyMtd: salesData.tradeSupplyMtd,
            tradeCvmRevMtd: salesData.tradeCvmRevMtd,
            tradeSpMtd: salesData.tradeSpMtd,
            tradeRebuyMtd: salesData.tradeRebuyMtd,
            labelshighest: highestData.map(item => item.salesArea),
            revenueshighest: highestData.map(item => item.averageRevenue),
            labelslowest: lowestData.map(item => item.salesArea),
            revenueslowest: lowestData.map(item => item.averageRevenue),
            lmtd: salesDatas.totRevLmtd,
            vlrlmtd: responhasilvlr.vlrLmtd,
            vlrmtd: responhasilvlr.vlrMtd,
            rgu90lmtd: responhasilrgu.rgu90Lmtd,
            rgu90mtd: responhasilrgu.rgu90Mtd,
            net30: salesDatas.netAdd30d,
            net90: salesDatas.netAdd90d,
            churn30: salesDatas.grossMtdChurn30d,
            churn90: salesDatas.grossMtdChurn90d,
            totRevGrowth: salesDatas.totRevGrowth,
            rgu90Growth: responhasilrgu.rgu90Growth,
            vltGrowth: responhasilvlr.vlrGrowth,
          },
        };
    
        console.log(responhasilrgu.rgu90Growth);
        setSalesAreas(areas);
        setTotalRevenueData(totalRevenueData);
    
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    };
    

    fetchData();
  },[selectedDate,CityVLR, CityRGU,CityQuro,CityQSSO])

  return (
    <>

   <CRow className="gx-3 gy-4">
  <CCol xs={12} sm={6} lg={4} xl={3}>
    <SortSales onDateChange={handleDateChange} />

    <CWidgetStatsA
  style={{
    minHeight: '175px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  }}
  chart={
    <div style={{ padding: '0px 20px 20px', position: 'relative', flex: 1 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <div style={{ textAlign: 'left', margin: '5px 0' }}>
          <div><b>Daily URO</b></div>
        </div>
        <div style={{ textAlign: 'right', margin: '5px 0' }}>
          <span
            style={{
              color: totalRevenueData.totalRevenue.dailyurogrowth < 0 ? 'red' : 'green',
              fontWeight: 'bold',
            }}
          >
            {totalRevenueData.totalRevenue.dailyurogrowth < 0 ? '▼' : '▲'}{' '}
            {totalRevenueData.totalRevenue.dailyurogrowth?.toFixed(2) ?? 0}%
          </span>
        </div>
        <div
          style={{
            backgroundColor: '#ccc',
            height: '1px',
            width: '100%',
            gridColumn: '1 / -1',
          }}
        ></div>
        <div style={{ textAlign: 'left', margin: '5px 0' }}>
          <div><b>Daily SSO</b></div>
        </div>
        <div style={{ textAlign: 'right', margin: '5px 0' }}>
          <span
            style={{
              color: totalRevenueData.totalRevenue.dailyssogrowth < 0 ? 'red' : 'green',
              fontWeight: 'bold',
            }}
          >
            {totalRevenueData.totalRevenue.dailyssogrowth < 0 ? '▼' : '▲'}{' '}
            {totalRevenueData.totalRevenue.dailyssogrowth?.toFixed(2) ?? 0}%
          </span>
        </div>
      </div>
    </div>
  }
/>

  </CCol>

  <CCol xs={12} sm={6} lg={4} xl={3}>
  <CWidgetStatsA
    style={{ minHeight: '272px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
    title={
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <span style={{ fontWeight: 'bold', fontSize: '1.2em' }}>RGU GA</span>
        <CDropdown variant="btn-group" style={{ marginTop: '10px' }}>
          <CDropdownToggle color="secondary" variant="outline">
            {CityRGU ?? 'All City'} {/* Show 'All City' when CityRGU is null */}
          </CDropdownToggle>
          <CDropdownMenu>
            {/* Option for 'All City' */}
            <CDropdownItem 
              key="all-city" 
              onClick={() => setCityRGU(null)} // Set CityRGU to null when "All City" is selected
            >
              All City
            </CDropdownItem>

            {/* List of other cities */}
            {salesAreas.length > 0 ? (
              salesAreas.map((city, index) => (
                <CDropdownItem 
                  key={index} 
                  onClick={() => setCityRGU(city)} // Set CityRGU to the selected city
                >
                  {city}
                </CDropdownItem>
              ))
            ) : (
              <CDropdownItem disabled>No cities available</CDropdownItem>
            )}
          </CDropdownMenu>
        </CDropdown>

      </div>
    }
    chart={
      <div style={{ padding: '5% 0', height: '100%' }}>
        <CChartBar
          data={{
            labels: ['LMTD', 'MTD'],
            datasets: [
              {
                label: 'Revenue',
                data: [
                  Math.round(totalRevenueData?.totalRevenue?.rgu90lmtd || 0),
                  Math.round(totalRevenueData?.totalRevenue?.rgu90mtd || 0),
                ],
                backgroundColor: ['#dcdcdc', '#ffcc00'],
                barPercentage: 0.6,
                borderRadius: 5,
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              x: {
                grid: { display: false },
                ticks: {
                  font: {
                    size: '1em',
                  },
                },
              },
              y: {
                grid: { display: false },
                ticks: {
                  display: false,
                  font: {
                    size: '1em',
                  },
                },
              },
            },
          }}
        />
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <span style={{ fontWeight: 'bold', fontSize: '1em' }}>MOM</span>
          <span
            style={{
              color: totalRevenueData.totalRevenue.rgu90Growth < 0 ? 'red' : 'green',
              fontWeight: 'bold',
              marginLeft: '5px',
              fontSize: '1em',
            }}
          >
            {totalRevenueData.totalRevenue.rgu90Growth < 0 ? '▼' : '▲'}{' '}
            {totalRevenueData.totalRevenue.rgu90Growth?.toFixed(2) ?? 0}%
          </span>
        </div>
      </div>
    }
  />
</CCol>

<CCol xs={12} sm={6} lg={4} xl={3}>
  <CWidgetStatsA
    style={{ minHeight: '272px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
    title={
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <span style={{ fontWeight: 'bold', fontSize: '1.2em' }}>VLR</span>
        <CDropdown variant="btn-group" style={{ marginTop: '10px' }}>
          <CDropdownToggle color="secondary"variant="outline" >
            {CityVLR ?? 'All City'} {/* Show 'All City' when CityRGU is null */}
          </CDropdownToggle>
          <CDropdownMenu>
            {/* Option for 'All City' */}
            <CDropdownItem 
              key="all-city" 
              onClick={() => setCityVLR(null)} // Set CityRGU to null when "All City" is selected
            >
              All City
            </CDropdownItem>

            {/* List of other cities */}
            {salesAreas.length > 0 ? (
              salesAreas.map((city, index) => (
                <CDropdownItem 
                  key={index} 
                  onClick={() => setCityVLR(city)} // Set CityRGU to the selected city
                >
                  {city}
                </CDropdownItem>
              ))
            ) : (
              <CDropdownItem disabled>No cities available</CDropdownItem>
            )}
          </CDropdownMenu>
        </CDropdown>
      </div>
     
    }
    chart={
      <div style={{ padding: '5% 0', height: '100%' }}>
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
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              x: {
                grid: { display: false },
                ticks: {
                  font: {
                    size: '1em',
                  },
                },
              },
              y: {
                grid: { display: false },
                ticks: {
                  display: false,
                  font: {
                    size: '1em',
                  },
                },
              },
            },
          }}
        />
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <span style={{ fontWeight: 'bold', fontSize: '1em' }}>MOM</span>
          <span
            style={{
              color: totalRevenueData.totalRevenue.vltGrowth < 0 ? 'red' : 'green',
              fontWeight: 'bold',
              marginLeft: '5px',
              fontSize: '1em',
            }}
          >
            {totalRevenueData.totalRevenue.vltGrowth < 0 ? '▼' : '▲'}{' '}
            {totalRevenueData.totalRevenue.vltGrowth?.toFixed(2) ?? 0}%
          </span>
        </div>
      </div>
    }
  />
</CCol>





<CCol xs={12} sm={6} lg={4} xl={3}>
    <CWidgetStatsA
        style={{ minHeight: '308px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
        title={<span style={{ fontWeight: 'bold', fontSize: '18px' }}>Subscriber</span>}
        chart={
            <div style={{ padding: '20px', position: 'relative', height: '220px' }}>  {/* Set a fixed height */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1px 1fr' }}>
                    <div style={{ textAlign: 'center', margin: '5px' }}>
                        <div>Net Add 30D</div>
                        <div style={{ color: 'red', fontWeight: 'Bold' }}>{Math.round(totalRevenueData.totalRevenue.net30)}</div>
                    </div>

                    <div style={{
                        backgroundColor: '#ccc',
                        width: '1px',
                        height: '100%',
                        alignSelf: 'center'
                    }}></div>

                    <div style={{ textAlign: 'center', margin: '5px' }}>
                        <div>Net Add 90D</div>
                        <div style={{ color: 'red', fontWeight: 'Bold' }}>{Math.round(totalRevenueData.totalRevenue.net90)}</div>
                    </div>

                    <div style={{
                        backgroundColor: '#ccc',
                        height: '1px',
                        gridColumn: '1 / span 3',
                        alignSelf: 'center'
                    }}></div>

                    <div style={{ textAlign: 'center', margin: '5px' }}>
                        <div>Gross Churn 30D</div>
                        <div style={{ color: 'green', fontWeight: 'Bold' }}>{Math.round(totalRevenueData.totalRevenue.churn30)}</div>
                    </div>

                    <div style={{
                        backgroundColor: '#ccc',
                        width: '1px',
                        height: '100%',
                        alignSelf: 'center'
                    }}></div>

                    <div style={{ textAlign: 'center', margin: '5px' }}>
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
      <CRow className="gx-3 gy-4">
  <CCol xs={12} md={6} xl={4} style={{ display: 'flex', flexDirection: 'column' }}>
    <CWidgetStatsA
      style={{
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        maxHeight: '300px',
      }}
      title={<span style={{ fontWeight: 'bold', fontSize: '1.2em' }}>Revenue</span>}
      chart={
        <CChartBar
          ref={chartRef}
          style={{ height: '223px', margin: '2%', marginBottom: '2%' }}
          data={{
            labels: ['Data', 'Mobo', 'Organic', 'Mobo Trade', 'Mobo Non-trade', 'Vas'],
            datasets: [
              {
                label: 'Revenue',
                data: [
                  totalRevenueData.totalRevenue.dataRevMtd ?? 0,
                  totalRevenueData.totalRevenue.moboMtd ?? 0,
                  totalRevenueData.totalRevenue.orgRevMtd ?? 0,
                  totalRevenueData.totalRevenue.moboTradeMtd ?? 0,
                  totalRevenueData.totalRevenue.moboNonTradeMtd ?? 0,
                  totalRevenueData.totalRevenue.vasRevMtd ?? 0,
                ].map((val) => val.toFixed(2)),
                backgroundColor: [
                  'rgba(255, 100, 0, 0.6)',   // Kuning Cerah
                  'rgba(238, 28, 37, 0.6)',   // Merah Cerah
                  'rgba(255, 206, 86, 0.6)',
                  'rgba(255, 255, 0, 0.6)',   // Kuning Emas
                  'rgba(255, 99, 71, 0.6)',
                  'rgba(255, 140, 0, 0.6)',   // Oranye Terang
                ],
                
              },
            ],
          }}
          options={{
            maintainAspectRatio: false,
            responsive: true,
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
      }
    />
    <br />
  </CCol>

  <CCol xs={12} md={6} xl={4} style={{ display: 'flex', flexDirection: 'column' }}>
    <CWidgetStatsA
      style={{ height: '290px' }}
      title={<span style={{ fontWeight: 'bold', fontSize: '1.2em' }}>Total Revenue</span>}
      chart={
        <div style={{ position: 'relative', height: '250px', padding: '5%' }}>
          <CChartDoughnut
            data={{
              labels: ['North Central Java', 'South Central Java'],
              datasets: [
                {
                  data: [
                    totalRevenueData.totalRevenue.salesDatanorth ?? 0,
                    totalRevenueData.totalRevenue.salesDatasouth ?? 0,
                  ].map((val) => val.toFixed(2)),
                  backgroundColor: ['#FFCE56', '#FF6347'],
                  hoverBackgroundColor: ['#FFC300', '#FF4500'],
                  borderWidth: 0,
                },
              ],
            }}
            options={{
              maintainAspectRatio: false,
              cutout: '80%',
              plugins: {
                legend: {
                  display: true,
                  position: 'right',
                  labels: {
                    usePointStyle: true,
                    font: { size: 10, weight: 'bold' },
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
                      : 0;
                  const percentageSouth =
                    totalRevenue !== 0 && totalRevenueData.totalRevenue.salesDatasouth !== null
                      ? ((totalRevenueData.totalRevenue.salesDatasouth / totalRevenue) * 100).toFixed(2)
                      : 0;

                  ctx.textAlign = 'center';
                  ctx.textBaseline = 'middle';
                  ctx.font = 'bold 1.5em Arial';
                  ctx.fillText(
                    percentageNorth > percentageSouth ? `${percentageNorth}%` : `${percentageSouth}%`,
                    width / 2,
                    height / 2
                  );
                  ctx.restore();
                },
              },
            }}
          />
          <div
            style={{
              position: 'relative',
              top: '-83px',
              left: '-60px',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: '1em',
            }}
          >
            {displayedPercentage == null || isNaN(displayedPercentage) ? '0.00%' : `${displayedPercentage.toFixed(2)}%`}
          </div>
        </div>
      }
    />
    <br />
  </CCol>

  <CCol xs={12} md={6} xl={4} style={{ display: 'flex', flexDirection: 'column' }}>
  <CWidgetStatsA
    title={<span style={{ fontWeight: 'bold', fontSize: '1.2em' }}>Trade</span>}
    chart={
      <CChartBar
        style={{ height: '223px', margin: '2%', marginBottom: '2%' }}
        data={{
          labels: ['Trade Supply', 'Trade Rebuy', 'Trade Cum Rev', 'Trade SP'],
          datasets: [
            {
              label: 'Trade Data',
              data: [
                totalRevenueData.totalRevenue.tradeSupplyMtd ?? 0,
                totalRevenueData.totalRevenue.tradeRebuyMtd ?? 0,
                totalRevenueData.totalRevenue.tradeCvmRevMtd ?? 0,
                totalRevenueData.totalRevenue.tradeSpMtd ?? 0,
              ].map((val) => val.toFixed(2)),
              backgroundColor: [
                'rgba(255, 100, 0, 0.6)',   // Kuning Cerah
                'rgba(238, 28, 37, 0.6)',   // Merah Cerah
                'rgba(255, 206, 86, 0.6)',
                'rgba(255, 255, 0, 0.6)',   // Kuning Emas
              ],
            },
          ],
        }}
        options={{
          maintainAspectRatio: false, // Prevent resizing when maximizing
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
    }
  />
  <br />
</CCol>

</CRow>



<CRow>
<CCol sm={12} md={6} xl={4} xxl={3}>
  <CWidgetStatsA
    style={{ minHeight: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
    title={
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <span style={{ fontWeight: 'bold', fontSize: '1.2em' }}>QURO</span>
        <CDropdown variant="btn-group" style={{ marginTop: '10px' }}>
          <CDropdownToggle color="secondary" variant="outline">
            {CityQuro ?? 'All City'} {/* Show 'All City' when CityRGU is null */}
          </CDropdownToggle>
          <CDropdownMenu>
            {/* Option for 'All City' */}
            <CDropdownItem 
              key="all-city" 
              onClick={() => setCityQuro(null)} // Set CityRGU to null when "All City" is selected
            >
              All City
            </CDropdownItem>

            {/* List of other cities */}
            {salesAreas.length > 0 ? (
              salesAreas.map((city, index) => (
                <CDropdownItem 
                  key={index} 
                  onClick={() => setCityQuro(city)} // Set CityRGU to the selected city
                >
                  {city}
                </CDropdownItem>
              ))
            ) : (
              <CDropdownItem disabled>No cities available</CDropdownItem>
            )}
          </CDropdownMenu>
        </CDropdown>

      </div>
    }
    chart={
      <div style={{ padding: '5% 0', height: '100%' }}>
        <CChartBar
          data={{
            labels: ['LMTD', 'MTD'],
            datasets: [
              {
                label: 'Revenue',
                data: [
                  (totalRevenueData?.totalRevenue?.qurolmtd || 0).toFixed(2),
                  (totalRevenueData?.totalRevenue?.quromtd || 0).toFixed(2),                  
                ],
                backgroundColor: ['#dcdcdc', '#ffcc00'],
                barPercentage: 0.6,
                borderRadius: 5,
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              x: {
                grid: { display: false },
                ticks: {
                  font: {
                    size: '1em',
                  },
                },
              },
              y: {
                grid: { display: false },
                ticks: {
                  display: false,
                  font: {
                    size: '1em',
                  },
                  
                },
              },
            },
          }}
        />
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <span style={{ fontWeight: 'bold', fontSize: '1em' }}>MOM</span>
          <span
            style={{
              color: totalRevenueData.totalRevenue.qurogrowth < 0 ? 'red' : 'green',
              fontWeight: 'bold',
              marginLeft: '5px',
              fontSize: '1em',
            }}
          >
            {totalRevenueData.totalRevenue.qurogrowth < 0 ? '▼' : '▲'}{' '}
            {totalRevenueData.totalRevenue.qurogrowth?.toFixed(2) ?? 0}%
          </span>
        </div>
      </div>
    }
  />
<br/>
<CWidgetStatsA
    style={{ minHeight: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
    title={
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <span style={{ fontWeight: 'bold', fontSize: '1.2em' }}>QSSO</span>
        <CDropdown variant="btn-group" style={{ marginTop: '10px' }}>
          <CDropdownToggle color="secondary"  variant="outline">
            {CityQSSO ?? 'All City'} {/* Show 'All City' when CityRGU is null */}
          </CDropdownToggle>
          <CDropdownMenu>
            {/* Option for 'All City' */}
            <CDropdownItem 
              key="all-city" 
              onClick={() => setCityQSSO(null)} // Set CityRGU to null when "All City" is selected
            >
              All City
            </CDropdownItem>

            {/* List of other cities */}
            {salesAreas.length > 0 ? (
              salesAreas.map((city, index) => (
                <CDropdownItem 
                  key={index} 
                  onClick={() => setCityQSSO(city)} // Set CityRGU to the selected city
                >
                  {city}
                </CDropdownItem>
              ))
            ) : (
              <CDropdownItem disabled>No cities available</CDropdownItem>
            )}
          </CDropdownMenu>
        </CDropdown>

      </div>
    }
    chart={
      <div style={{ padding: '5% 0', height: '100%' }}>
        <CChartBar
          data={{
            labels: ['LMTD', 'MTD'],
            datasets: [
              {
                label: 'Revenue',
                data: [
                  (totalRevenueData?.totalRevenue?.qssolmtd || 0).toFixed(2),
                  (totalRevenueData?.totalRevenue?.qssomtd || 0).toFixed(2),                  
                ],
                backgroundColor: ['#dcdcdc', '#ffcc00'],
                barPercentage: 0.6,
                borderRadius: 5,
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              x: {
                grid: { display: false },
                ticks: {
                  font: {
                    size: '1em',
                  },
                },
              },
              y: {
                grid: { display: false },
                ticks: {
                  display: false,
                  font: {
                    size: '1em',
                  },
                },
              },
            },
          }}
        />
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <span style={{ fontWeight: 'bold', fontSize: '1em' }}>MOM</span>
          <span
            style={{
              color: totalRevenueData.totalRevenue.qurogrowth < 0 ? 'red' : 'green',
              fontWeight: 'bold',
              marginLeft: '5px',
              fontSize: '1em',
            }}
          >
            {totalRevenueData.totalRevenue.qssogrowth < 0 ? '▼' : '▲'}{' '}
            {totalRevenueData.totalRevenue.qssogrowth?.toFixed(2) ?? 0}%
          </span>
        </div>
      </div>
    }
  />
   <br/>
</CCol>




  <CCol sm={12} md={12} xl={8} xxl={9} style={{ maxWidth: '110%', flex: '1 1 auto', minWidth: '200px' }}> {/* Added minWidth */}
    <div className="revenue-container">
      <CCard className="mb-4"style={{minHeight: '400px'}}>
        <CCardBody>
          <CRow>
            <CCol>
              <h5 id="traffic" className="card-title mb-0">
                <b>Revenue By Branch</b>
              </h5>
            </CCol>
          </CRow>
          <MainChart selectedDate={selectedDate} key={selectedDate} /> {/* Use key to ensure chart updates */}
        </CCardBody>
       
        <CCardFooter style={{ paddingBottom: '-10px' }}>
          <CRow className="mb-8 text-center justify-content-center align-items-center">
            {progressExample.map((item, index) => (
              <CCol
                xs={12} // Stack vertically on extra small screens
                sm={4}  // Three items per row on small screens
                className="mb-4" // Add bottom margin for spacing
                key={index}
              >
                <div style={{ fontSize: '18px' }} className="text-body-secondary">{item.title}</div>
                <div style={{ fontSize: '16px' }} className="fw-semibold text-truncate">
                  {item.value}
                </div>
                <div style={{ fontSize: '18px' }} className="text-body-secondary">{item.city}</div>
              </CCol>
            ))}
          </CRow>
        </CCardFooter>
      </CCard>
    </div>
  </CCol>
 
</CRow>






    </>
  )
}

export default Dashboard
