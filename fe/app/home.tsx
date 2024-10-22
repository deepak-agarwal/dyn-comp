import React, { useEffect, useState } from 'react'
import GeneratedComponentsList from '../components/generatedComponentList'
import CompChat from './compChat'
import '../globals.css'
import { getActiveCompId } from '../utils/ls'

function Chat() {
  const [activeCompId, setActiveCompId] = useState()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [newCompState, setNewCompState] = useState(false)

  const handleNewChat = () => {
    setNewCompState(true)
    setActiveCompIdLS(undefined)

  }

  useEffect(() => {
    const idInLs = getActiveCompId
    setActiveCompId(idInLs)
    return () => {
      setActiveCompIdLS(undefined)
    }

  }, [])

  const setActiveCompIdLS = (id) => {
    localStorage.setItem('activeCompId', id)
    setActiveCompId(id)
  }

  return (
    <div className='chat-app'>
      <div className='contact-sidebar'>
        <button className='new-chat' onClick={handleNewChat}>
          New Chat
        </button>

        <div className='generated-comp'>
          <GeneratedComponentsList setActiveCompId={setActiveCompIdLS} activeCompId={activeCompId} />
        </div>
      </div>
      <div className='chat-container'>
        <CompChat
          isnewCompActive={newCompState}
          componentId={activeCompId}
          setActiveCompId={setActiveCompIdLS}
        />
      </div>
    </div>

    //     <div className='chat-app'>
    //          <button className='toggle-drawer' onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
    //   <div className={`icon ${isDrawerOpen ? 'close' : ''}`}>
    //       {isDrawerOpen ? '\u2715' /* Close icon (×) */ : '\u2630' /* Hamburger icon (☰) */}
    //     </div>
    //   </button>
    //   <button className='fab' onClick={handleNewChat}>
    //     +
    //   </button>
    //   <div className={`drawer ${isDrawerOpen ? 'open' : ''}`}>
    //   <GeneratedComponentsList setActiveCompId={setActiveCompId} />
    // </div>
    //   <div className='content'>
    //     <CompChat
    //       isnewCompActive={newCompState}
    //       componentId={activeCompId}
    //       setActiveCompId={setActiveCompId}
    //     />
    //   </div>
    // </div>

  )
}

export default Chat
