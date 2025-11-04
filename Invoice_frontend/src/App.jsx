import React from 'react'
import Menubar from './Components/Menubar'
import MainPage from './Pages/MainPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './Pages/Dashboard'
import PreviewPage from './Pages/PreviewPage'
import LandingPage from './Pages/LandingPage'
import { AppContextProvider } from './Context/AppContext'
import { Toaster } from 'react-hot-toast'
import { RedirectToSignIn, SignedIn, SignedOut } from '@clerk/clerk-react';
import UserSyncHandler from './Components/UserSyncHandler'
const App = () => {
  return (
    <>
    <BrowserRouter>
    
    
     <AppContextProvider>
      <UserSyncHandler/>
      <Menubar/>
    <Toaster />
       <Routes>
      <Route path='/' element={<LandingPage/>}/>

      <Route path='/dashboard' element={
        <>
        <SignedIn>
          <Dashboard/>
        </SignedIn>
        <SignedOut>
         <RedirectToSignIn />
        </SignedOut>
        </>
      }/>
      <Route path='/generate' element={
     <>
        <SignedIn>
          <MainPage/>
        </SignedIn>
        <SignedOut>
         <RedirectToSignIn />
        </SignedOut>
        </>
    }/>
      <Route path='/preview' element={
        <>
        <SignedIn>
          <PreviewPage/>
        </SignedIn>
        <SignedOut>
         <RedirectToSignIn />
        </SignedOut>
        </>
      }/>
    </Routes>
     </AppContextProvider>
   
    </BrowserRouter>
    </>
  )
}

export default App
