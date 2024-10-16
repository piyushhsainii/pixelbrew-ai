import imageCompression from 'browser-image-compression';
import axios from 'axios'
import './App.css'
import MainComponent from './components/MainComponent'
import Navbar from './components/Navbar'
import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProfileSetup from './components/screens/ProfileSetup';
import { VortexDemo } from './components/screens/HomeScreen';

function App() {
  const [file, setFile] = useState<File | null>(null)
  const [Image, setImage] = useState(null)

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const imageFile = files[0]

      try {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true
        }
        const compressedFile = await imageCompression(imageFile, options)
        setFile(compressedFile)
      } catch (error) {
        console.error('Error compressing image:', error)
      }
    }
  }

  const uploadToCloudinary = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'ideogram');

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/dzow59kgu/image/upload`,
          formData,
          {
            headers: { 'Content-Type': 'multipart/form-data' }
          }
        );
        setImage(response.data.secure_url)
        return response.data.secure_url;
      } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
      }
    }
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<VortexDemo />} />
          <Route path='/generate' element={
            <>
              <Navbar />
              <MainComponent />
            </>
          }
          />
          <Route path='/profileSetup' element={<ProfileSetup />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App