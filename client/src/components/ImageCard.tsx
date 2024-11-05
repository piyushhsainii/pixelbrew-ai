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



const ImageCard = (
    { image, url, userInfo, likes, email, setRefresh }:
        { url: string, userInfo: any, likes: number, email: string, image: any, setRefresh: React.Dispatch<any> }) => {

    const [isLiked, setisLiked] = useState<boolean | null>(null)
    const { toast } = useToast()
    const formattedDate = new Date(image.createdAt).toLocaleString()
    console.log(image)

    const isLikedOrNot = () => {
        const AlreadyLikedOrNot = userInfo.postLiked.filter((img) => (img.postLiked.createdBy == userInfo.name && likes > 0))   //checking if the user has already liked the post or not
        console.log(AlreadyLikedOrNot)
        if (AlreadyLikedOrNot.length > 0) {
            setisLiked(true)
        } else {
            setisLiked(false)
        }
    }

    const updateLikeCount = async () => {
        const postLiked = {             //This field will be stored in user table
            ImgID: image.id,
            ImgUrl: image.url,
            createdBy: userInfo.name
        }
        const likedBy = {
            userName: userInfo.name,
            userEmail: userInfo.email,

        }
        const likesCount = isLiked == false ? likes + 1 : likes - 1
        try {
            const updateLikes = await axios.put(`${BACKEND_URL}/updateLikes`, {
                likeCount: likesCount,
                id: image.id,
                email: userInfo.email,
                likedBy,
                postLiked
            })
            if (updateLikes.status == 200) {
                toast({
                    title: "Updated your liked posts",
                    variant: "default",
                    className: "bg-primmaryColor text-white font-sans border-gray-800 border",
                });
                setRefresh(updateLikes)
            }
        } catch (error) {
            toast({
                title: "Something went wrong, please try again",
                variant: "default",
                className: "bg-primmaryColor text-white font-sans border-gray-800 border",
            });
        }
    }
    useEffect(() => {
        isLikedOrNot()
    }, [])

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
                        <div className='flex justify-center items-center gap-3 '>
                            <div className='max-h-[20rem] max-w-[25rem] border-purple-700 cursor-pointer m-10'>
                                <img
                                    src={url}
                                    alt=""
                                    className='rounded-2xl object-fill border-purple-700 border-2'
                                />
                            </div>
                            <div className=' flex flex-col gap-9 text-white items-start text-left w-[50%] '>
                                <div className='text-pretty text-base flex  justify-center items-center bg-gray-950 p-8 rounded-lg'>
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
                        <span className='text-base'> {likes.toString()}</span>
                        <span>
                            <Heart
                                onClick={updateLikeCount}
                                size={17}
                                color={` red `}
                                className={`mt-[0.1rem]  duration-150 transition-all ${isLiked ? 'fill-red-600' : ''} hover:fill-red-600 hover:scale-105 active:scale-90 `} />
                        </span>
                    </div>
                </div>
            </div>
        </Dialog>

    )
}

export default ImageCard