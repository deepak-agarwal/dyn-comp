import React, { useState, useEffect } from 'react'
import MyTabsComponent from '../components/tabsComponent'
import { User } from 'lucide-react'
import './compChat.css'
import { Loader } from 'lucide-react'
import { Heading } from '@gluestack-ui/themed'

export default function CompChat({
  componentId,
  setActiveCompId,
  isnewCompActive
}) {
  const [generatedVersions, setGeneratedVersions] = useState([])
  const [userInput, setUserInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [newComponent, setNewComponent] = useState(false)

  console.log('active id', componentId)

  useEffect(() => {
    async function load_stuff() {
      setNewComponent(false)
      console.log('error here??')



      const generatedComponents = await import(
        `../components/generated/${componentId}/metadata.json`
      )
      console.log(generatedComponents)
      // Load child components dynamically based on the JSON data
      const imports = generatedComponents.iterations.map(async (item: any) => {
        // Construct the import path for each child component
        const importPath = `../components/generated/${componentId}/${item.version}.tsx`

        console.log(importPath)
        try {
          // Use dynamic import to load the component, and catch any errors
          console.log('importPath', item)
          const module = await import(
            `../components/generated/${componentId}/${item.version}.tsx`
          )
          console.log('item', item)
          return {
            prompt: item.prompt,
            version: item.version,
            timestamp: item.timestamp,
            code: item.code,
            component: module.default
          }
        } catch (error) {
          console.error(
            `Failed to import component for ${item.name}: ${error.message}`
          )
          // Return a placeholder component or null
          return false
        }
      })

      Promise.all(imports).then((components) => {
        setGeneratedVersions(components.filter((e) => e))
        console.log(components)
        fetch(
          `http://localhost:3001/component/ping/?from=View Component&component=${componentId}`
        )
      })
    }

    if (componentId) setTimeout(() => {
      load_stuff(), 5000
    })
    else setNewComponent(true)
    // Wait for all dynamic imports to complete
  }, [componentId])

  const handleInputChange = (e) => {
    setUserInput(e.target.value)
  }

  const handleIteration = async () => {
    if (!userInput || isLoading) {
      return
    }

    // Disable the button and show "Processing..." text
    setIsLoading(true)

    try {
      // Make the API POST request with the user input
      const response = await fetch('http://localhost:3001/component/iterate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: userInput, componentId })
      })

      if (response.ok) {
        // Handle a successful response here
        console.log('API response:', await response.json())
        setUserInput('')
        setNewComponent(false)
      } else {
        // Handle an error response here
        console.error('API error:', response.statusText)
      }
    } catch (error) {
      console.error('API request failed:', error)
    } finally {
      // Re-enable the button
      setIsLoading(false)
    }
  }

  const generateNewComponent = async () => {
    if (!userInput || isLoading) {
      return
    }

    setIsLoading(true)

    try {
      
      const response = await fetch("http://localhost:3001/component/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMjU2MWNlOWJiNGRlMDM1M2NhNjM1NWY1ZGNiOWQ1MTZhZmJhZTdiMjBkODgyMmYyZTVhMzdmMDE1MjYzZWIwYjAxYzVjNzQ0YzA5YWExNTgiLCJpYXQiOjE3MDA2MzQwOTQuODcwOTkxLCJuYmYiOjE3MDA2MzQwOTQuODcwOTkyLCJleHAiOjE3MzIyNTY0OTQuODUwNjkxLCJzdWIiOiI1Iiwic2NvcGVzIjpbXX0.xbBxSHFJQESO36tqY9JqQOFTW1fiTpgXgEUnbcScooCDSBmMTJxjvpDWQ7IVYDhGNVNkwOg_27oaWtUX2UIUe7JGORtL6yMoE5Aa21DwZHhDNNBaR4VBwjvs7CMv1rg4hRbA9U-PWZZycXUbKois-8bAOr7fbuaOFCoYYrlsciS4T2W0JzmqSyZXgDZSQ07hsroz_DLrI_SJLQL_f3AXGpf2YUCjyPnUw_m4XKniDMNnlX-tdtX70xNdTOOSms6HdPJeTTfXlpCJ5m8f5t1wLBoMH-PFWj7eMf-GjX3dqC6oCQNLdoO12jc3j7cX3TKVoTv9yiLbrLQMSX9v9rSDA3Yl-5jExgiCNwZeoXrw-3xk2WH7244qtesClSfThd-C-vKOph2rGujRt9o1cXBHxN0E1SxVG4q3Ys6WaV55jXvCEWbIqbOB-VVgkELl1LQOyTN3YvtSzUVy9u16QQ0AwHAssMu9RTBtxDMYg_X5HoRVMXUCKbL0F7NyCTQQEE4m-tM2C_Vw-M4Xp0wcpdP0NF_PdMiOfcUEGaXXMEwDm86yL7z7wLOCnCeDCnfdJM4NBKCiQuz6gVpbUeQ6LD2xuLcSIT8SkTrfVrZQtzI1hxrKDpE0z-fSZ-B4DcN75dqirTL0212gEk5MnzD7rE94Rb4dgJ8ldENL7Drl-NtTPxg`,
        },
        body: JSON.stringify({ query: userInput }),
      });

      if (response.ok) {
        const data = await response.json()
        console.log('API response:', data)
        setActiveCompId(data.componentId)
        setUserInput('')
      } else {
        console.error('API error:', response.statusText)
      }
    } catch (error) {
      console.error('API request failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className='chat-window'>
        {newComponent || isnewCompActive ? (
          <div className='center-content'>
            <div>
              <Heading size='2xl'>Hi there! How can I help you?</Heading>
            </div>
            <div className='m-auto'>
              {isLoading && (
                <div>
                  <div className='loader1'></div>
                </div>
              )}
            </div>
          </div>
        ) : (
          generatedVersions.map((e, index) => (
            <div key={index}>
              <div className='user-prompt'>
                <div className='user-icon'>
                  <User size={24} />
                </div>
                <div className='prompt-text'>{e.prompt}</div>
              </div>
              <MyTabsComponent code={e.code}>
                <e.component />
              </MyTabsComponent>
            </div>
          ))
        )}
      </div>
      <div className='message-input'>
        <input
          type='text'
          placeholder='Type a message...'
          value={userInput}
          onChange={handleInputChange}
          className='input-style'
        />
        {isLoading ? (
          <div>
            <div className='loader'></div>
          </div>
        ) : (
          <button
            onClick={newComponent ? generateNewComponent : handleIteration}
            disabled={isLoading}
          >
            Send
          </button>
        )}
      </div>
    </>
  )
}
