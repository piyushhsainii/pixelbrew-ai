import axios from 'axios'
import { Heart } from 'lucide-react'
import { BACKEND_URL } from '../lib/url'
import { useEffect, useState } from 'react'
import { useToast } from '../hooks/use-toast'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../components/ui/dialog"
import { userLikes } from '../lib/interface'
import { useNavigate } from 'react-router-dom'


const ImageCard = (
    { image, url, userInfo, likes, email, setRefresh, myLikes }:
        { url: string, userInfo: any, likes: any, email: string, image: any, setRefresh: React.Dispatch<any>, myLikes: userLikes[] }) => {

    const { toast } = useToast()
    const isPostLiked = myLikes.filter((like) => like.isLiked == true && like.postID == image.id)
    const navigate = useNavigate()

    const updateLikeCount = async (image, likes) => {
        if (email == null) return
        try {
            const updateLikes = await axios.put(`${BACKEND_URL}/updateLikes`, {
                likes: isPostLiked.length > 0 ? image.Likes - 1 : image.Likes + 1,              //add like or remove like based on current status
                isLiked: isPostLiked.length > 0 ? true : false,
                postID: image.id,
                userEmail: email,
                url: image.url
            })

            if (updateLikes.status == 200) {
                toast({
                    title: "Added your liked posts",
                    variant: "default",
                    className: "bg-primmaryColor text-white font-sans border-gray-800 border",
                });
                setRefresh(updateLikes)
            }
        } catch (error) {
            if (error.response.status == 402) {
                toast({
                    title: "Setup your profile to add likes",
                    variant: "default",
                    className: "bg-primmaryColor text-white font-sans border-gray-800 border",
                })
                setTimeout(() => {
                    navigate('/profileSetup')
                }, 3000)
            }
        }
    }
    const formattedDate = new Date(image.createdAt).toLocaleString()
    return (
        <Dialog >
            <div className='h-72 min-w-[300px]  max-h-[400px] duration-300 hover:bg-slate-900 cursor-pointer transition-all max-w-[400px] shadow-[1px_1px_4px_[0.5]px_rgba(2,1,1,0.1)] shadow-purple-700 border-purple-700 border-opacity-35 border m-4 rounded-lg my-1 mx-1  select-none' >
                <DialogTrigger className='cursor-pointer'>
                    <img
                        src={url}
                        alt=""
                        className='  max-w-[400px] max-h-[240px] object-cover '
                    />
                </DialogTrigger>
                <DialogContent className='bg-black flex flex-col  rounded-lg border-none text-white font-sans h-[84vh] md:h-[90vh] w-[90vw] md:w-[90vw] mt-10'>
                    <div className='overflow-y-scroll' >
                        <DialogTitle>
                            <div className='flex  items-center gap-3 select-none'>
                                <img src={userInfo.trainingImg} className='h-6 w-6 rounded-xl select-none selection:select-none' />
                                <div className='font-mono text-sm text-white pt-1'> {userInfo.name} </div>
                            </div>
                        </DialogTitle>
                        <DialogDescription>
                            <div className='flex flex-col md:flex-row justify-center items-center  '>
                                <div className='max-h-[25rem]  w-full md:w-[70%] border-purple-700  cursor-pointer m-10'>
                                    <img
                                        src={url}
                                        alt=""
                                        className='rounded-2xl object-fill border-purple-700 border-2 border-opacity-35'
                                    />
                                </div>
                                <div className=' flex flex-col text-white items-start text-left w-full md:w-[50%] p-5 rounded-xl'>
                                    <div className='text-pretty text-sm flex  justify-center items-center  m-3 rounded-lg tracking-wider'>
                                        {image.prompt}
                                    </div>
                                    <div className="flex justify-between w-full bg-gray-900 rounded-2xl px-3">
                                        <div className=" p-2 font-semibold " >
                                            Date created
                                        </div>
                                        <div className="  bg-opacity-40 p-2 text-gray-300 flex items-center text-sm">
                                            {formattedDate}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </DialogDescription>

                    </div>
                </DialogContent>

                <div className='flex justify-between items-center p-1 m-1'>
                    <div className='flex items-center gap-3 select-none'>
                        <img src={userInfo.trainingImg} className='h-6 w-6 rounded-xl select-none selection:select-none' />
                        <div className='font-mono text-sm text-white pt-1'> {userInfo.name} </div>
                    </div>
                    <div className=' flex items-center  gap-2 cursor-pointer font-mono text-white'>
                        <span className='text-base'> {image.Likes}</span>
                        <span>
                            <Heart
                                onClick={() => updateLikeCount(image, likes)}
                                size={17}
                                color={` red `}
                                className={`mt-[0.1rem]  duration-150 transition-all ${email && isPostLiked.length > 0 ? 'fill-red-600' : ''} hover:fill-red-600 hover:scale-105 active:scale-90 `} />
                        </span>
                    </div>
                </div>
            </div>
        </Dialog>

    )
}

export default ImageCard