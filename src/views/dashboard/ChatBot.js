import React, { useState } from 'react';
import axios from 'axios';
import CIcon from '@coreui/icons-react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormTextarea,
  CAlert,
  CRow
} from '@coreui/react';
import {
  cilUser,
  cibProbot,
  cilSend
} from '@coreui/icons';

const ChatBot = () => {
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleUserInputSubmit = async (e) => {
    e.preventDefault();

    if (!userInput) {
      alert("Please enter a message before sending.");
      return;
    }

    const payload = { query: userInput };

    try {
      setLoading(true);
      const response = await axios.post(import.meta.env.VITE_API_AUTOBOT + '/run_query/', payload);
      const botReply = response.data.response;
      const userMessage = userInput;

      setChatHistory((prev) => [...prev, { user: userMessage, bot: botReply, timestamp: new Date() }]);
      setUserInput('');
    } catch (error) {
      console.error('First attempt failed, retrying...', error);

      try {
        const response = await axios.post(import.meta.env.VITE_API_AUTOBOT + '/run_query/', payload);
        const botReply = response.data.response
        const userMessage = userInput;

        setChatHistory((prev) => [...prev, { user: userMessage, bot: botReply, timestamp: new Date() }]);
        setUserInput('');
      } catch (secondError) {
        console.error('Second attempt failed:', secondError);
        setResponseMessage('Error sending message. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong style={{ fontSize: '1.5rem' }}>ChatBot</strong>
          </CCardHeader>
          <CCardBody>
            {/* Chat History Display */}
            <div className="chat-history mt-4" style={{ maxHeight: '300px', overflowY: 'auto' }}>
              {chatHistory.map((chat, index) => (
                <div key={index} style={{ marginBottom: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', marginBottom: '5px' }}>
                    <div style={{ backgroundColor: '#404040', color: '#ffffff', padding: '10px', borderRadius: '10px', maxWidth: '60%', textAlign: 'right' }}>
                      <strong><CIcon icon={cilUser} style={{ color: '#ffffff' }} /> :</strong> {chat.user}
                      <div style={{ fontSize: '0.8rem', marginTop: '5px', textAlign: 'right' }}>
                        {chat.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%', marginBottom: '5px' }}>
                    <div style={{ backgroundColor: '#404040', color: '#ffffff', padding: '10px', borderRadius: '10px', maxWidth: '80%', textAlign: 'center' }}>
                      <strong><CIcon icon={cibProbot} style={{ color: '#ffffff' }} /> :</strong> {chat.bot}
                      <div style={{ fontSize: '0.8rem', marginTop: '5px', textAlign: 'right' }}>
                        {chat.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Response Message Display */}
            {responseMessage && (
              <CAlert color="warning" className="mt-3">
                {responseMessage}
              </CAlert>
            )}

            {/* Chat Input Section */}
            <CForm onSubmit={handleUserInputSubmit} className="mt-4" style={{ display: 'flex', alignItems: 'center' }}>
              <CFormTextarea 
                value={userInput} 
                onChange={(e) => setUserInput(e.target.value)} 
                placeholder="Type your message..." 
                rows={1} 
                style={{ fontSize: '1rem', resize: 'none', flexGrow: 1, marginRight: '8px' }} 
              />
              <CButton 
                
                type="submit" 
                style={{ padding: '10px', display: 'flex', alignItems: 'center', backgroundColor: '#FFD400',color:'white' }}
                disabled={loading}
              >
                {loading ? <span>...</span> : <CIcon icon={cilSend} />}
              </CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default ChatBot;
