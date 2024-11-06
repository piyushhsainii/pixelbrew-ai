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
import { authUser, userAbout, userImageLink, userUsername } from "../../atoms/atoms"
import axios from "axios"
import imageCompression from 'browser-image-compression';
import { BACKEND_URL } from "../../lib/url"
import { useToast } from "../../hooks/use-toast"
import { useNavigate } from "react-router-dom"

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
                console.log(response.data.secure_url, "this is url")
                setImage(response.data.secure_url)
                setisImageUploading(false)
                return response.data.secure_url;
            } catch (error) {
                setisImageUploading(false)
                console.error('Error uploading to Cloudinary:', error);
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
    const fetchUserDetails = async () => {
        try {
            const { data } = await axios.post(`${BACKEND_URL}/getUserDetails`, {
                email: user.user_metadata.email
            })
            console.log(data)
            if (data) {
                setUsername(data.user.name)
                setImageLink(data.user.trainingImg)
                setUserAbout(data.user.about)
                setName(data.user.name)
                setImage(data.user.trainingImg)
                setAbout(data.user.about)
            }
        } catch (error) {
            toast({
                title: "Setup your profile to use Pixelbrew AI",
                variant: "default",
                className: "bg-primmaryColor text-white font-sans border-gray-800 border",
            });
        }
    }

    useEffect(() => {
        fetchUserDetails()
    }, [username, ImageLink, userabout])

    return (
        <>
            <div className="flex items-stretch md:items-start justify-center bg-primmaryColor font-sans min-h-screen p-4 pb-0">
                <Card className="w-full max-w-4xl bg-black bg-opacity-50 text-white overflow-hidden flex flex-col justify-evenly">
                    <CardHeader className="flex-shrink-0 bg-slate-200">
                        <CardTitle className="text-3xl font-bold text-black">Profile</CardTitle>
                        <CardDescription className="text-gray-800 text-base font-sans font-semibold">
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
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="bg-[#0c0f1a] border-0 text-white rounded-xl"
                                />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="about" className="text-white">About</Label>
                                <Textarea
                                    id="about"
                                    placeholder="Tell us about yourself"
                                    value={about}
                                    onChange={(e) => setAbout(e.target.value)}
                                    className="bg-[#0c0f1a] border-0 text-white min-h-[100px] rounded-2xl resize-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <Label htmlFor="training_image" className="text-white">Training Image</Label>
                                    <TooltipProvider>
                                        <Tooltip delayDuration={200}>
                                            <TooltipTrigger>
                                                <div className="text-[0.77rem] flex gap-1 items-center text-gray-400">
                                                    note:
                                                    <Info width={12} color="grey" className="pt-[0.25rem]" />
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
                                {
                                    isImageUploading ?
                                        <div className="bg-[#0c0f1a] border-0 rounded-xl cursor-pointer text-center py-1 font-semibold
                                        text-sm text-gray-300
                                        ">
                                            Uploading...
                                        </div>
                                        :
                                        <Input
                                            id="training_image"
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleImage(e)}
                                            className="bg-[#0c0f1a] border-0 text-white rounded-xl cursor-pointer"
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
                        <div className="bg-primmaryColor w-full md:w-[130px] h-[100px] md:h-[100px] flex-shrink-0">
                            <img src={image ?? ImageLink} alt="pfp" className="w-full h-full object-cover rounded-3xl" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}