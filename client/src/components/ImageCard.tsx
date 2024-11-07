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


const ImageCard = (
    { image, url, userInfo, likes, email, setRefresh, myLikes }:
        { url: string, userInfo: any, likes: any, email: string, image: any, setRefresh: React.Dispatch<any>, myLikes: userLikes[] }) => {

    const { toast } = useToast()
    const isPostLiked = myLikes.filter((like) => like.isLiked == true && like.postID == image.id)
    // console.log(myLikes.filter((like) => like.isLiked == true && like.postID == image.id))
    console.log(image)

    const updateLikeCount = async (image, likes) => {
        try {
            const updateLikes = await axios.put(`${BACKEND_URL}/updateLikes`, {
                likes: isPostLiked.length > 0 ? image.Likes - 1 : image.Likes + 1,              //add like or remove like based on current status
                isLiked: isPostLiked.length > 0 ? true : false,
                postID: image.id,
                userEmail: email,
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
            console.log(error)
            toast({
                title: "Something went wrong, please try again",
                variant: "default",
                className: "bg-primmaryColor text-white font-sans border-gray-800 border",
            });
        }
    }
    const formattedDate = new Date(image.createdAt).toLocaleString()
    return (
        <Dialog>
            <div className='h-72 min-w-[300px]  max-w-[400px] border-purple-700 border-opacity-35 border m-4 rounded-lg my-1 mx-1  select-none' >
                <DialogTrigger className='cursor-pointer'>
                    <img
                        src={url}
                        alt=""
                        className='h-[100%] object-cover'
                    />
                </DialogTrigger>

                <DialogContent className='bg-black shadow-purple-700 shadow-[22px_17px_45px_-32px_rgba(0,0,0,0.3)] rounded-lg border-none text-white font-sans min-w-[40vw] max-w-[70vw] min-h-[45vh] max-h-[65vh]'>
                    <DialogHeader>
                        <DialogTitle>
                            <div className='flex items-center gap-3 select-none'>
                                <img src={userInfo.trainingImg} className='h-6 w-6 rounded-xl select-none selection:select-none' />
                                <div className='font-mono text-sm text-white pt-1'> {userInfo.name} </div>
                            </div>
                        </DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                        <div className='flex justify-center items-center  '>
                            <div className='max-h-[20rem] max-w-[25rem] border-purple-700 cursor-pointer m-10'>
                                <img
                                    src={url}
                                    alt=""
                                    className='rounded-2xl object-fill border-purple-700 border-2'
                                />
                            </div>
                            <div className=' flex flex-col text-white items-start text-left w-[50%] border-purple-700 border-2 p-5 rounded-xl'>
                                <div className='text-pretty text-sm flex  justify-center items-center  m-3 rounded-lg '>
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
                                className={`mt-[0.1rem]  duration-150 transition-all ${isPostLiked.length > 0 ? 'fill-red-600' : ''} hover:fill-red-600 hover:scale-105 active:scale-90 `} />
                        </span>
                    </div>
                </div>
            </div>
        </Dialog>

    )
}

export default ImageCard