import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

const Messages = () => {
  const navigateTo = useNavigate();
  const handleReturnToDashboard = () => {
    // Navigate to dashboard
    navigateTo('/')
  }
  const { } = useSelector((state) => state.messages);
  const [messageId, setMessageId] = useState(""); 
  return (
    <div>
      
    </div>
  )
}

export default Messages
