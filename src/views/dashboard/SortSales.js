import React, { useState,useEffect } from 'react';
import axios from 'axios';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormSelect,
  CFormLabel,
  CRow,
  CAlert
} from '@coreui/react';

const SortSales = ({ onDateChange }) => {
    const [createdDates, setCreatedDates] = useState([]);  // Store distinct dates from backend
    const [selectedDate, setSelectedDate] = useState(null);  // State for selected date
    const [salesData, setSalesData] = useState([]);  // State to store filtered sales data
    const [loading, setLoading] = useState(false);  // Loading state
    const [responseMessage, setResponseMessage] = useState(''); // Response message state
  
    // Fetch distinct created_at dates from backend when component mounts
    useEffect(() => {
      const fetchDates = async () => {
        try {
          const response = await axios.get('http://localhost:8080/api/salesdata/created-at');
          setCreatedDates(response.data);
        } catch (error) {
          console.error('Error fetching dates:', error);
          setResponseMessage('Error fetching dates.');
        }
      };
  
      fetchDates();
    }, []);
  // Handle date selection
  const handleDateChange = (e) => {
    const date = e.target.value || null;  // Set to null if no date is selected
    setSelectedDate(date);
    onDateChange(date); // Call the function from props
  };

  // Handle form submission
  

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          
          <CCardBody>
            <CForm className="form-layout" >
              <CFormLabel htmlFor="formSelectDate" style={{ fontSize: '1.2rem' }}>
                Sort By Created Date:
              </CFormLabel>
              <CFormSelect 
                id="formSelectDate" 
                size="lg" 
                onChange={handleDateChange}  // Link dropdown to state
                value={selectedDate}
                style={{ fontSize: '1rem' }}
                disabled={loading}  // Disable dropdown when loading
              >
            <option value="null">-- Select a Date --</option>
            {createdDates.map((date, index) => (
              <option key={index} value={date}>{date}</option>
            ))}
              </CFormSelect>
              {responseMessage && (
                <CAlert 
                  color={responseMessage.includes('Error') ? 'danger' : 'success'}
                  className="mt-4"
                  style={{ fontSize: '1rem', textAlign: 'center' }}
                >
                  {responseMessage}
                </CAlert>
              )}

            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default SortSales;
