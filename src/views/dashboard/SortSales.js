import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormLabel,
  CRow,
  CAlert
} from '@coreui/react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"; // Import CSS untuk DatePicker

const SortSales = ({ onDateChange }) => {
  const [createdDates, setCreatedDates] = useState([]); // Menyimpan tanggal dari backend
  const [selectedDate, setSelectedDate] = useState(new Date()); // Default to today's date
  const [salesData, setSalesData] = useState([]); // Menyimpan data penjualan
  const [loading, setLoading] = useState(false); // Status loading
  const [responseMessage, setResponseMessage] = useState(''); // Pesan respon
  
  // Fetch tanggal dari backend saat komponen mount
  useEffect(() => {
    const fetchDates = async () => {
      try {

        const response = await axios.get(import.meta.env.VITE_API_URL + '/created-at');
        setCreatedDates(response.data);
      } catch (error) {
        console.error('Error fetching dates:', error);
        setResponseMessage('Error fetching dates.');
      }
    };

    fetchDates();
  }, []);
  const formatTodayDate = () => {
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return today.toLocaleDateString('id-ID', options); // Formats as "28 Oktober 2024"
  };
   // Handle perubahan tanggal
   const handleDateChange = (date) => {
    setSelectedDate(date);
    onDateChange(formatDate(date)); // Send the formatted date to the parent
  };

  // Format date to 'yyyy-mm-dd'
  const formatDate = (date) => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  
  return (

        <CCard className="mb-4">
          <CCardBody>
            <CForm className="form-layout">
              <CFormLabel htmlFor="formDatePicker" style={{ fontSize: '1.2rem' }}>
                <b>Sort By Date:</b>
              </CFormLabel>
              <br/>
              <DatePicker
                id="formDatePicker"
                selected={selectedDate}
                onChange={handleDateChange} // Mengatur state saat tanggal dipilih
                dateFormat="dd MMMM yyyy" // Format tanggal yang diinginkan
                placeholderText={formatTodayDate()} // Display today as placeholder
                className="form-control mp-4"
                
                showPopperArrow={false} // Optional: menghilangkan panah pada popper
                disabled={loading} // Disable DatePicker saat loading
              />
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

    
  );
};

export default SortSales;
