'use client'
import { Box, Button, ButtonText, HStack, Heading, Text } from '@gluestack-ui/themed'
import Image from 'next/image'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './views/home'



export default function App() {
  return (
    <main>
      <div className="App">
      
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path='/view' element={<div />} /> */}
          </Routes>
        </BrowserRouter>
      </div>
    </main>
  );
}
