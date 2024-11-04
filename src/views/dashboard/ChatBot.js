import React, { useState } from 'react';
import axios from 'axios';
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

const ChatBot = () => {
  const [userInput, setUserInput] = useState(''); // State for user input
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]); // State for chat history

  // Handle user input submission
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

      const botReply = response.data.response.output;
      const userMessage = response.data.response.input;

      setChatHistory((prev) => [...prev, { user: userMessage, bot: botReply }]);
      setUserInput('');

    } catch (error) {
      console.error('Error sending message:', error);
      setResponseMessage('Error sending message. Please try again.');
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
            {/* Chat Input Section */}
            <div>
              <CForm onSubmit={handleUserInputSubmit}>
                <CFormTextarea 
                  value={userInput} 
                  onChange={(e) => setUserInput(e.target.value)} 
                  placeholder="Type your message..." 
                  rows={4} // Set height of textarea
                  style={{ fontSize: '1rem' }} 
                />
                <div className="mt-2" style={{ textAlign: 'center' }}>
                  <CButton 
                    color="primary" 
                    type="submit" 
                    style={{ fontSize: '1.2rem', padding: '10px 20px' }}
                    disabled={loading}
                  >
                    {loading ? 'Sending...' : 'Send'}
                  </CButton>
                </div>
              </CForm>
            </div>

            {/* Chat History Display */}
            <div className="mt-4">
              {chatHistory.map((chat, index) => (
                <div key={index} style={{ marginBottom: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', marginBottom: '5px' }}>
                    <div className="user-message" style={{ backgroundColor: '#e1f5fe', padding: '10px', borderRadius: '10px', maxWidth: '60%', textAlign: 'right' }}>
                      <strong>User :</strong> {chat.user}
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%', marginBottom: '5px' }}>
                    <div className="bot-message" style={{ backgroundColor: '#f0f4c3', padding: '10px', borderRadius: '10px', maxWidth: '80%', textAlign: 'center' }}>
                      <strong>Autobot - Team 4 :</strong> {chat.bot}
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
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default ChatBot;
