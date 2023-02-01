import React from 'react'
import Multiple from './Multiple'
import Navbar from './Navbar'
import Single from './Single'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import MultiDoc from './MultiDoc'

export default function App() {
  return <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/multi" element={<Multiple />} />
      <Route path="/single" element={<Single />} />
      <Route path="/multidoc" element={<MultiDoc />} />
    </Routes>
  </BrowserRouter>
}
