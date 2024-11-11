import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import { Info } from "lucide-react"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../ui/tooltip"
import { useRecoilState } from "recoil"
import { authUser, userAbout, userCompleteInfo, userImageLink, userUsername } from "../../atoms/atoms"
import axios from "axios"
import imageCompression from 'browser-image-compression';
import { BACKEND_URL } from "../../lib/url"
import { useToast } from "../../hooks/use-toast"
import { useNavigate } from "react-router-dom"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel"

export default function ProfileSetup() {
    const [username, setUsername] = useRecoilState(userUsername)
    const [ImageLink, setImageLink] = useRecoilState(userImageLink)
    const [userabout, setUserAbout] = useRecoilState(userAbout)
    const [name, setName] = useState(username ?? "")
    const [about, setAbout] = useState(userabout ?? "")
    const [image, setImage] = useState<string | null>(null)
    const [CloudinaryURL, setCloudinaryURL] = useState<null | string>(ImageLink ?? null)
    const [isImageUploading, setisImageUploading] = useState(false)
    const [updatingProfile, setupdatingProfile] = useState(false)
    const [user, setUser] = useRecoilState(authUser)
    const [isSetModeOn, setisSetModeOn] = useState(false)
    const [UserInfo, setUserInfo] = useRecoilState(userCompleteInfo)
    const { toast } = useToast()

    const navigate = useNavigate()

    const uploadToCloudinary = async (file) => {
        if (file) {
            setisImageUploading(true)
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
                setisImageUploading(false)
                toast({
                    title: "Added training Img to your avatar's list!",
                    variant: "default",
                    className: "bg-primmaryColor text-white font-sans border-gray-800 border",
                });
                return response.data.secure_url;
            } catch (error) {
                setisImageUploading(false)
                console.error('Error uploading to Cloudinary:', error);
            }
        }
    }
    const uploadToCloudinaryAndSetActiveImg = async (file) => {
        if (file) {
            setisImageUploading(true)
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
                console.log(response.data.secure_url, "this is url")
                setImage(response.data.secure_url)
                if (response.data.secure_url) {
                    console.log("apicall")
                    const { data } = await axios.post(`${BACKEND_URL}/addTrainingImg`, {
                        email: user.email,
                        img: response.data.secure_url
                    })
                }
                setisImageUploading(false)
                toast({
                    title: "Added training Img to your avatar's list!",
                    variant: "default",
                    className: "bg-primmaryColor text-white font-sans border-gray-800 border",
                });
                return response.data.secure_url;
            } catch (error) {
                setisImageUploading(false)
                console.error('Error uploading to Cloudinary:', error);
            }
        }
    }
    const handleImage2 = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files && files.length > 0) {
            const imageFile = files[0]
            const response = new FileReader()
            response.onloadend = () => {
                setCloudinaryURL(response.result as string)
            }
            response.readAsDataURL(imageFile);
            try {
                const options = {
                    maxSizeMB: 1,
                    maxWidthOrHeight: 1920,
                    useWebWorker: true
                }
                const compressedFile = await imageCompression(imageFile, options)
                uploadToCloudinaryAndSetActiveImg(compressedFile)

            } catch (error) {
                console.error('Error compressing image:', error)
            }
        }
    }
    const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files && files.length > 0) {
            const imageFile = files[0]
            const response = new FileReader()
            response.onloadend = () => {
                setCloudinaryURL(response.result as string)
            }
            response.readAsDataURL(imageFile);
            try {
                const options = {
                    maxSizeMB: 1,
                    maxWidthOrHeight: 1920,
                    useWebWorker: true
                }
                const compressedFile = await imageCompression(imageFile, options)
                uploadToCloudinary(compressedFile)

            } catch (error) {
                console.error('Error compressing image:', error)
            }
        }
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (isImageUploading) {
            return toast({
                title: "Wait for the uploading to finish",
                variant: "default",
                className: "bg-primmaryColor text-white font-sans border-gray-800 border",
            });
        }
        e.preventDefault()
        setupdatingProfile(true)
        try {
            const { data } = await axios.post(`${BACKEND_URL}/setupProfile`, {
                name: name,
                email: user.user_metadata.email,
                about: about,
                trainingImg: image,
                avatar_url: user.user_metadata.picture,
                provider: user.app_metadata.provider
            })
            setupdatingProfile(false)
            toast({
                title: "Profile setup successfull",
                variant: "default",
                className: "bg-primmaryColor text-white font-sans border-gray-800 border",

            });
            window.location.reload()
            setTimeout(() => { navigate('/generate') }, 1200)

        } catch (error) {
            setupdatingProfile(false)
        }
    }
    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault()
        setupdatingProfile(true)
        try {

            const updateProfile = await axios.post(`${BACKEND_URL}/updateProfile`, {
                email: user.user_metadata.email,
                username: name,
                about: about,
                trainingImg: image,
            })
            if (updateProfile) {
                setUsername(updateProfile.data.updateProfie.name)
                setUserAbout(updateProfile.data.updateProfie.about)
                setImageLink(updateProfile.data.updateProfie.trainingImg)
            }

            setupdatingProfile(false)
            toast({
                title: "Profile Updated successfully",
                variant: "default",
                className: "bg-primmaryColor text-white font-sans border-gray-800 border",

            });
            navigate('/generate')
        } catch (error) {
            setupdatingProfile(false)
            toast({
                title: "Something went wrong",
                variant: "default",
                className: "bg-primmaryColor text-white font-sans border-gray-800 border",

            });
        }
    }
    // const fetchUserDetails = async () => {
    //     try {
    //         const { data } = await axios.post(`${BACKEND_URL}/getUserDetails`, {
    //             email: user.user_metadata.email
    //         })
    //         console.log(data)
    //         if (data) {
    //             setUsername(data.user.name)
    //             setImageLink(data.user.trainingImg)
    //             setUserAbout(data.user.about)
    //             setName(data.user.name)
    //             setImage(data.user.trainingImg)
    //             setAbout(data.user.about)
    //         }
    //     } catch (error) {
    //         toast({
    //             title: "Setup your profile to use Pixelbrew AI",
    //             variant: "default",
    //             className: "bg-primmaryColor text-white font-sans border-gray-800 border",
    //         });
    //     }
    // }
    console.log(UserInfo)

    const setActiveImageHandler = async (likedImgs, index) => {
        try {
            const { data } = await axios.post(`${BACKEND_URL}/setActiveImage`, {
                email: UserInfo.user.email,
                img: likedImgs
            })
            setisSetModeOn((e) => !e)
            toast({
                title: "Updated your active training image",
                variant: "default",
                className: "bg-primmaryColor text-white font-sans border-gray-800 border",
            });
        } catch (error) {
            toast({
                title: "Something went wrong",
                variant: "default",
                className: "bg-primmaryColor text-white font-sans border-gray-800 border",
            });
        }
    }

    return (
        <>
            <div className="flex items-stretch md:items-start justify-center bg-primmaryColor font-sans min-h-screen p-4 pb-0">
                <Card className="w-full max-w-4xl bg-purple-700 bg-opacity-50 text-white border border-white border-opacity-40 shadow-[3px_3px_3px_[1]px_rgba(2,4,4,0.2)] shadow-white overflow-hidden flex flex-col justify-evenly">
                    <CardHeader className="flex-shrink-0 bg-black text-white">
                        <CardTitle className="text-3xl font-bold ">Profile</CardTitle>
                        <CardDescription className=" text-base font-sans text-gray-100 font-semibold">
                            {username == null ? "Setup" : 'Update'} your profile
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col md:flex-row justify-between md:items-start gap-6 md:gap-10 p-6">
                        <form className="space-y-6 md:space-y-4 flex-grow">
                            <div className="space-y-1">
                                <Label htmlFor="name" className="text-white">Name</Label>
                                <Input
                                    id="name"
                                    placeholder="Enter your name"
                                    value={UserInfo?.user.name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="bg-[#0c0f1a] border-1 text-white rounded-xl  "
                                />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="about" className="text-white">About</Label>
                                <Textarea
                                    id="about"
                                    placeholder="Tell us about yourself"
                                    value={UserInfo?.user.about}
                                    onChange={(e) => setAbout(e.target.value)}
                                    className="bg-[#0c0f1a] border-0 text-white min-h-[100px] rounded-2xl resize-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <Label htmlFor="training_image" className="text-white">{
                                        UserInfo?.user.trainingImg == null ?
                                            'Training Image' :
                                            'Add Another Training Image'
                                    }</Label>
                                    <TooltipProvider>
                                        <Tooltip delayDuration={200}>
                                            <TooltipTrigger>
                                                <div className="text-[0.77rem] flex gap-1 items-center text-white">
                                                    note:
                                                    <Info width={12} color="white" className="" />
                                                </div>
                                            </TooltipTrigger>
                                            <TooltipContent className="h-[170px] w-[170px] flex flex-col bg-primmaryColor border-white border border-opacity-30 text-white">
                                                <div className="text-center my-2"> NOTE: </div>
                                                <li> Upload high quality images </li>
                                                <li> Your face should be clearly visible </li>
                                                <li> The AI response highly depends on your training Image </li>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                                <label
                                    className="bg-primmaryColor w-full py-2 px-5 text-base font-semibold flex  rounded-md cursor-pointer hover:bg-gray-900 hover:scale-105 transition-all duration-150"
                                    htmlFor="file-input" >
                                    UPLOAD YOUR IMAGE
                                </label>
                                {
                                    isImageUploading ?
                                        <div className="bg-[#0c0f1a] border-0 rounded-xl cursor-pointer text-center py-1 font-semibold
                                        text-sm text-gray-300
                                        ">
                                            Uploading...
                                        </div>
                                        :
                                        UserInfo?.user.trainingImg == null ?
                                            <Input
                                                id="file-input"
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleImage(e)}
                                                className="bg-[#0c0f1a] border-0 text-white rounded-xl cursor-pointer hidden"
                                            />
                                            :

                                            <Input
                                                id="file-input"
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleImage2(e)}
                                                className="bg-[#0c0f1a] border-0 text-white rounded-xl cursor-pointer hidden"
                                            />
                                }
                            </div>
                            {
                                ImageLink == null ?
                                    <Button onClick={handleSubmit} className="w-full bg-[#0c0f1a] hover:bg-opacity-80 text-white rounded-xl">
                                        {updatingProfile ? "Saving your Profile" : " Save Profile"}
                                    </Button>
                                    :
                                    <Button onClick={handleUpdate} className="w-full bg-[#0c0f1a] hover:bg-opacity-80 text-white rounded-xl">
                                        {updatingProfile ? "Updating your Profile" : " Update Profile"}
                                    </Button>
                            }
                        </form>
                        <div className="flex flex-col gap-4 justify-center items-center">
                            {isSetModeOn ?
                                <Carousel className='mx-3 bg-purple-700 rounded-lg p-3 mr-7'>
                                    <CarouselPrevious />
                                    <CarouselContent className="w-[150px]">
                                        {UserInfo?.user?.trainingImages.map((likedImgs, index) => (
                                            <CarouselItem className=" select-none flex flex-col justify-between" key={likedImgs.postID}>
                                                <img src={likedImgs} alt="" className="w-full h-full object-cover rounded-3xl" />
                                                <div
                                                    onClick={() => setActiveImageHandler(likedImgs, index)}
                                                    className="px-3 py-2 mt-2 text-sm cursor-pointer  border-2 border-black flex justify-center m-auto bg-purple-700 hover:bg-purple-800 font-semibold font-sans transition duration-200 rounded-lg text-white ">
                                                    SET ACTIVE IMG
                                                </div>
                                            </CarouselItem>
                                        ))}
                                    </CarouselContent>
                                    <CarouselNext />
                                </Carousel> :
                                <>
                                    <div className="border-white border-2 rounded-3xl   w-full md:w-[130px] h-[100px] md:h-[100px] flex-shrink-0">
                                        {UserInfo?.user.trainingImg ?
                                            <img src={UserInfo?.user.trainingImg} className="w-full h-full object-cover rounded-3xl" /> :
                                            <div className="text-pretty flex justify-center items-center ml-4 mt-2">
                                                Your training Image will appear here.
                                            </div>
                                        }
                                    </div>
                                </>}
                            {
                                UserInfo?.user.trainingImg &&
                                <div
                                    onClick={() => setisSetModeOn((e) => !e)}
                                    className="px-4 py-2 text-sm cursor-pointer shadow-[3px_3px_3px_[1]px_rgba(2,4,4,0.2)] border-2 border-black hover:scale-110  shadow-white flex justify-center m-auto bg-purple-700 hover:bg-purple-800 font-semibold font-sans transition duration-200 rounded-lg text-white ">
                                    {isSetModeOn ?
                                        " CANCEL" : " SET ACTIVE IMG"
                                    }
                                </div>
                            }
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}