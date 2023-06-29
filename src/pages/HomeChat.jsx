import React from 'react'
import Sidebar from '../components/chat/Sidebar'
import Chat from '../components/chat/Chat'

const HomeChat = ({ setIsChatOpen }) => {
  return (
    <div className='home'>
      <div className="container">
        <Sidebar />
        <Chat setIsChatOpen={setIsChatOpen} />
      </div>
    </div>
  )
}

export default HomeChat