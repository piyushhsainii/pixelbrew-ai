import imageCompression from 'browser-image-compression';
import axios from 'axios'
import './App.css'
import ImageGenerationComponent from './components/ImageGenerationComponent'
import Navbar from './components/Navbar'
import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import ProfileSetup from './components/screens/ProfileSetup';
import { LandingPage } from './components/screens/HomeScreen';
import LoginPage from './components/screens/LoginPage';
import { useRecoilState } from 'recoil';
import ProtectedRoute from './components/screens/ProtectedRoute';
import { authUser, Balance } from './atoms/atoms';
import { supabase } from './lib/supabase';
import MyImagesPage from './components/screens/MyImagesPage';
import { BACKEND_URL } from './lib/url';
import MyAccount from './components/screens/MyAccount';
import { useToast } from './hooks/use-toast';

function App() {
  const [user, setUser] = useRecoilState(authUser)
  const [userBalance, setBalance] = useRecoilState(Balance)
  const { toast } = useToast()
  const navigate = useNavigate()

  async function getSession() {
    const user = await supabase.auth.getSession()
    setUser(user.data.session.user)
    return user
  }
  const fetchUserDetails = async () => {
    try {
      const { data } = await axios.post(`${BACKEND_URL}/getUserDetails`, {
        email: user.user_metadata.email
      })
      console.log('10')
      if (data) {
        setBalance(data.user.balance)
      }
    } catch (error) {
      // if (window.location.href !== '/profileSetup') {
      //   window.location.href = '/profileSetup'
      // }
      navigate('/profileSetup')
      console.log('loladad')
      toast({
        title: "Could not fetch balance",
        variant: "default",
        className: "bg-primmaryColor text-white font-sans border-gray-800 border",
      });
    }
  }
  useEffect(() => {
    getSession()
  }, []) // First useEffect to get session

  useEffect(() => {
    if (user && user.user_metadata?.email) {
      fetchUserDetails()
    }
  }, [user])

  setInterval(() => {
    fetch(`${BACKEND_URL}/`, {
      method: 'GET'
    })
  }, 150000)

  return (

    <>
      <Navbar balance={userBalance} />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route element={<ProtectedRoute />} >
          <Route path='/generate' element={<ImageGenerationComponent />} />
          <Route path='/profileSetup' element={<ProfileSetup />} />
          <Route path='/profile' element={<MyAccount />} />
          <Route path='/myImages' element={<MyImagesPage />} />
        </Route>
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </>
  )
}

export default App