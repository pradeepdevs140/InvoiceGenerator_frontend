import React from 'react'
import Menubar from './Components/Menubar'
import MainPage from './Pages/MainPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './Pages/Dashboard'
import PreviewPage from './Pages/PreviewPage'
import LandingPage from './Pages/LandingPage'
const App = () => {
  return (
    <>
    <BrowserRouter>
    <Menubar/>
   
    <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/generate' element={<MainPage/>}/>
      <Route path='/preview' element={<PreviewPage/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
