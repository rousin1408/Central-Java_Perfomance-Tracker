import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
  CAlert
} from '@coreui/react';
import CIcon from '@coreui/icons-react'
import {
  cilWarning,
} from '@coreui/icons'
const UploadCSV = () => {

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file before uploading.");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setLoading(true);
      const response = await axios.post(import.meta.env.VITE_API_URL +'/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle successful upload
      setResponseMessage('File uploaded successfully!');
      console.log(response.data);

    } catch (error) {
      // Handle error
      console.error('Error uploading file:', error);
      setResponseMessage('Error uploading file. Please try again.');
    } finally {
      setLoading(false);
    }
  };



  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong style={{ fontSize: '1.5rem' }}>Upload CSV</strong>
          </CCardHeader>
          <CCardBody>
            {responseMessage && (
              <CAlert
                color={responseMessage.includes('Error') ? 'danger' : 'success'}
                className="mt-4 d-flex align-items-center"
                style={{ fontSize: '1rem', textAlign: 'center' }}
              >
                <CIcon icon={cilWarning} />
                &nbsp;{responseMessage}
              </CAlert>
            )}
            <CForm className="form-layout" onSubmit={handleSubmit}>
              <CFormLabel htmlFor="formFileLg" style={{ fontSize: '1.2rem' }}>
                Upload File:
              </CFormLabel>
              <CFormInput 
                type="file" 
                size="lg" 
                id="formFileLg" 
                onChange={handleFileChange}
                style={{ fontSize: '1rem' }}
                disabled={loading}
              />
              
              <div className="mt-4" style={{ textAlign: 'center' }}>
                <CButton 
                  color="primary" 
                  type="submit" 
                  style={{ fontSize: '1.2rem', padding: '10px 20px' }}
                  disabled={loading}
                >
                  {loading ? 'Uploading...' : 'Submit'}
                </CButton>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default UploadCSV;
