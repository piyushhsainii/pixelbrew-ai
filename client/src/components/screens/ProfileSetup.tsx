import { useState } from "react"
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
import { authUser } from "../../atoms/atoms"
import axios from "axios"
import imageCompression from 'browser-image-compression';
import { BACKEND_URL } from "../../lib/url"
import { useToast } from "../../hooks/use-toast"

export default function ProfileSetup() {

    const [name, setName] = useState("")
    const [about, setAbout] = useState("")
    const [image, setImage] = useState<File | null>(null)
    const [CloudinaryURL, setCloudinaryURL] = useState<null | String>('https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_1.png')
    const [isImageUploading, setisImageUploading] = useState(false)
    const [updatingProfile, setupdatingProfile] = useState(false)
    const [user, setUser] = useRecoilState(authUser)
    const { toast } = useToast()


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
        setupdatingProfile(true)
        try {
            const { data } = await axios.post(`${BACKEND_URL}/setupProfile`, {
                name: user.user_metadata.full_name,
                email: user.user_metadata.email,
                about: about,
                trainingImg: image,
                avatar_url: user.user_metadata.picture,
                provider: user.app_metadata.provider
            })
            setupdatingProfile(false)
        } catch (error) {
            setupdatingProfile(false)
        }
    }

    return (
        <>
            <div className="flex items-stretch md:items-start justify-center bg-primmaryColor font-sans min-h-screen p-4 pb-0">
                <Card className="w-full max-w-4xl bg-black bg-opacity-50 text-white overflow-hidden flex flex-col justify-evenly">
                    <CardHeader className="flex-shrink-0 bg-slate-200">
                        <CardTitle className="text-3xl font-bold text-black">Profile</CardTitle>
                        <CardDescription className="text-gray-800 text-base font-sans font-semibold">
                            Manage your profile
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col md:flex-row justify-between md:items-start gap-6 md:gap-10 p-6">
                        <form onSubmit={handleSubmit} className="space-y-6 md:space-y-4 flex-grow">
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
                                            <TooltipContent className="h-[170px] w-[170px] bg-primmaryColor border-white border border-opacity-30">
                                                {/* Tooltip content remains the same */}
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
                            <Button type="submit" className="w-full bg-[#0c0f1a] hover:bg-opacity-80 text-white rounded-xl">
                                Save Profile
                            </Button>
                        </form>
                        <div className="bg-primmaryColor w-full md:w-[130px] h-[100px] md:h-[100px] flex-shrink-0">
                            <img src={CloudinaryURL} alt="pfp" className="w-full h-full object-cover" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}