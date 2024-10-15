import imageCompression from 'browser-image-compression';
import axios from 'axios'
import './App.css'
import MainComponent from './components/MainComponent'
import Navbar from './components/Navbar'
import { useState } from 'react'

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
      <Navbar />
      <MainComponent />
      <input type="file" onChange={handleImage} accept="image/*" />
      <button className='bg-red-600 text-white px-3'
        onClick={uploadToCloudinary}
      >
        Upload to Cloudinary
      </button>
      <img src={Image} alt="" />
    </>
  )
}

export default App