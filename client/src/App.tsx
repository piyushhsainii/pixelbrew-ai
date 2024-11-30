import axios from 'axios'
import './App.css'
import ImageGenerationComponent from './components/ImageGenerationComponent'
import Navbar from './components/Navbar/Navbar'
import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import ProfileSetup from './components/screens/ProfileSetup';
import { LandingPage } from './components/screens/HomeScreen';
import LoginPage from './components/screens/LoginPage';
import { useRecoilState } from 'recoil';
import ProtectedRoute from './components/screens/ProtectedRoute';
import { authUser, Balance, userCompleteInfo } from './atoms/atoms';
import { supabase } from './lib/supabase';
import MyImagesPage from './components/screens/MyImagesPage';
import { BACKEND_URL } from './lib/url';
import MyAccount from './components/screens/MyAccount';
import { useToast } from './hooks/use-toast';
import PayButton from './components/razorpay/PayButtons';
import Explore from './components/screens/Explore'
import Footer from './components/screens/Footer'
import NotFound from './components/screens/NotFound'
import AllPurchases from './components/razorpay/AllPurchases'
import AboutUs from './components/AboutUs'
import { Analytics } from "@vercel/analytics/react"
import Announcement from './components/Announcement'
import ExploreModels from './components/screens/ExploreModels'
import MyModels from './components/screens/MyModels'
import DashboardNavbar from './components/Dashboard/DashboardNavbar'
import AboutPage from './components/About'
import HowItWorks from './components/HowItWorks'

function App() {
  const [user, setUser] = useRecoilState(authUser)
  const [userBalance, setBalance] = useRecoilState(Balance)
  const [UserCompleteInfo, setUserCompleteInfo] = useRecoilState(userCompleteInfo)
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
      if (data) {
        setBalance(data.user.balance)
        setUserCompleteInfo(data)
      }
    } catch (error) {
      navigate('/profileSetup')
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
          <Route path='/dashboard/myModels' element={<MyModels />} />
          <Route path='/dashboard/myImages' element={<MyImagesPage />} />
        </Route>
        <Route path='/shop' element={<PayButton />} />
        <Route path='/dashboard' element={<DashboardNavbar />} />
        <Route path='/dashboard/exploreModels' element={<ExploreModels />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/about-us' element={<AboutPage />} />
        <Route path='/how-it-works' element={<HowItWorks />} />
        <Route path='/explore' element={<Explore />} />
        <Route path='/purchases' element={<AllPurchases />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
      <Analytics />
      <Announcement />
    </>
  )
}

export default App