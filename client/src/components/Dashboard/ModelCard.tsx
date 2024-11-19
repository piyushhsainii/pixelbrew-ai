import { ArrowRight, Image, ImagePlus, Zap } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog"
import { useState } from "react"
import JSZip from "jszip"
import axios from "axios"
import { useToast } from "../../hooks/use-toast"
import { BACKEND_URL } from "../../lib/url"
import { useRecoilState } from "recoil"
import { userCompleteInfo } from "../../atoms/atoms"
import { useNavigate } from "react-router-dom"
import imageCompression from 'browser-image-compression';
import { Switch } from "../ui/switch"
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"


const ModelCard = ({ img, data }: { img: string, data }) => {
    const [userInfo, setuserInfo] = useRecoilState(userCompleteInfo)
    const [Images, setImages] = useState<any>(null)
    const [mageUploading, setisImageUploading] = useState(false)
    const { toast } = useToast()
    const [modelName, setModelname] = useState<string | null>(null)
    const [isStyle, setisStyle] = useState(false)
    const navigate = useNavigate()
    console.log(Images)

    const zipFiles = async () => {
        let ImageArray = []
        if (Images == null) {
            return toast({
                title: "Please add training images",
                variant: "default",
                className: "bg-primmaryColor text-white font-sans border-gray-800 border",
            });
        }
        const zip = new JSZip();
        [...Images].forEach((file) => {
            zip.file(file.name, file);
        });
        return await zip.generateAsync({ type: "blob" });
    };

    const uploadToCloudinary = async (file) => {
        if (file) {
            setisImageUploading(true)
            const formData = new FormData();
            formData.append('file', file, 'filename.zip');
            formData.append('upload_preset', 'ideogram');

            try {
                const response = await axios.post(
                    `https://api.cloudinary.com/v1_1/dzow59kgu/raw/upload`,
                    formData,
                    { headers: { 'Content-Type': 'multipart/form-data' } }
                );
                setisImageUploading(false)
                toast({
                    title: "Uploaded your images to cloud storage",
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

    const handleModelTraining = async () => {           // ZIP FILES -> UPLOAD TO CLOUDINARY -> UPDATE BALANCE -> START TRAINING
        const zippedFile = await zipFiles()     //STEP 1
        console.log(zippedFile)
        const imageUrl = await uploadToCloudinary(zippedFile) // STEP2
        console.log(imageUrl)
        try {
            const { data } = await axios.post(`${BACKEND_URL}/trainModel`, { email: userInfo.user.email, imgUrl: imageUrl, style: isStyle })
        } catch (error) {
            toast({
                title: "Low balance to start training" + error,
                variant: "default",
                className: "bg-primmaryColor text-white font-sans border-gray-800 border",
            });
        }
    }

    return (
        <div className="h-80">
            <div className="w-[50vw] border border-white max-w-[600px] py-3 flex items-center px-2 mb-3 gap-5 rounded-md border-opacity-20 overflow-y-auto">
                <div className="w-[50%] flex justify-center items-center">
                    <img src={img} alt="x" className="h-full w-full rounded-md border border-purple-600 border-opacity-35" />
                </div>
                <div className="w-[50%] flex flex-col gap-2">
                    <div className="text-2xl "> {data.modelName} </div>
                    <div className="text-muted text-pretty text-sm text-gray-400"> {data.description} </div>
                    <div className="text-sm bg-purple-700 w-[100px] text-center rounded-md"> {data.modelType} </div>
                    <div>
                        <div className="text-sm pl-1 py-1">HOW THIS WORKS</div>
                        {data.how_it_works.map((data) => (
                            <div className="text-[0.730rem] w-full tracking-tight"> - {data.steps}. </div>
                        ))}
                    </div>
                    {
                        data.requires_training == false ?
                            <div>
                                <button className="bg-purple-700 px-3 py-2 flex items-center gap-1 hover:gap-3 transition-all duration-200 "
                                    onClick={() => { navigate('/generate') }}
                                >
                                    TRY IT NOW <ArrowRight size={18} className="" />
                                </button>
                            </div> :
                            <Dialog>
                                <DialogTrigger>
                                    <div>
                                        <button className="bg-purple-700 px-3 py-2 flex items-center gap-1 hover:gap-3 transition-all duration-200 ">
                                            GET STARTED <ArrowRight size={18} className="" />
                                        </button>
                                    </div>
                                </DialogTrigger>
                                <DialogContent className="w-[90vw] h-[85vh] mt-6 bg-black text-white border-purple-700 border-opacity-45">
                                    <div>
                                        <div className="text-2xl font-sans pl-2 m-4 mt-0 ml-0"> {data.modelName} </div>
                                        <div className="flex font-sans gap-5">
                                            <label htmlFor="add-images" className="flex items-center text-sm border border-gray-500 p-1 px-3 ml-2 border-opacity-50 cursor-pointer">
                                                <ImagePlus size={18} />  Add Images
                                            </label>
                                            <input
                                                onChange={(e) => setImages(e.target.files)}
                                                type="file"
                                                multiple
                                                id="add-images"
                                                className="hidden"
                                            />
                                            <div className="text-[0.700rem] items-center pt-1 text-gray-400">
                                                Note: You can upload a maximum of 4 images.
                                                Upload images with clear face of yours. Try to upload in portrait mode for better results
                                            </div>
                                        </div>
                                        <div className="flex items-center m-2 ml-0">
                                            <div className="p-5 bg-gray-900 w-48 h-48 m-3 bg-opacity-60 flex items-center justify-center">
                                                {Images ?
                                                    <img className="h-full w-full object-cover" src={URL.createObjectURL(Images[0])} /> :
                                                    <Image size={60} />}
                                            </div>
                                            <div className="p-5 w-48 h-48 bg-gray-900 m-3 bg-opacity-60 flex items-center justify-center">
                                                {Images && Images.length > 1 ?
                                                    <img className="h-full w-full object-cover" src={URL.createObjectURL(Images[1])} /> :
                                                    <Image size={60} />}
                                            </div>
                                            <div className="p-5 w-48 h-48 bg-gray-900 m-3 bg-opacity-60 flex items-center justify-center">
                                                {Images && Images.length > 2 ?
                                                    <img className="h-full w-full object-cover" src={URL.createObjectURL(Images[2])} /> :
                                                    <Image size={60} />}
                                            </div>
                                            <div className="p-5 w-48 h-48 bg-gray-900 m-3 bg-opacity-60 flex items-center justify-center">
                                                {Images && Images.length > 3 ?
                                                    <img className="h-full w-full object-cover" src={URL.createObjectURL(Images[3])} /> :
                                                    <Image size={60} />}
                                            </div>
                                        </div>
                                        <div className="flex mb-5">
                                            <Switch checked={isStyle} onClick={() => setisStyle((v) => !v)} className="ml-2" />
                                            <div className="font-sans text-sm text-purple-400 ml-2 flex items-center gap-2">
                                                Training Mode - {isStyle == false ? "Subject" : "Style"}
                                                <TooltipProvider>
                                                    <Tooltip delayDuration={200}>
                                                        <TooltipTrigger>
                                                            <QuestionMarkCircledIcon />
                                                        </TooltipTrigger>
                                                        <TooltipContent className="p-3 text-base font-sans tracking-tight">
                                                            <div>
                                                                Subject - The AI model is trained on the subject (you), your face, your expressions.
                                                                <span className="text-green-500">Recommended</span> for general users.
                                                            </div>
                                                            <div>
                                                                Style - The AI model is trained on the style of the images you have provided, like the format ,
                                                                the ratio , colors etc. Preferred if you want to generate images to be in a specific format.
                                                            </div>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="" className="font-sans tracking-tight"> SET MODEL NAME </label>
                                            <input type="text"
                                                value={modelName}
                                                placeholder="Set your Model Name"
                                                className="bg-black text-white font-sans text-sm p-1 px-2 border border-purple-600 border-opacity-60 my-2 ml-2 focus:outline-none active:outline-none"
                                                onChange={(e) => setModelname(e.target.value)} />
                                        </div>
                                        <div className="flex items-center font-sans text-sm ml-2 my-1 text-purple-500">
                                            You will be charged 80 <span className="px-1"> <Zap size={16} /></span> to train the model on your photos. This is just a one time fees. </div>
                                        <button className="text-white font-sans bg-purple-700 hover:bg-purple-900 px-5 py-2 ml-2"
                                            onClick={handleModelTraining}
                                            disabled={mageUploading == true && userInfo == null ? true : false}
                                        >
                                            {mageUploading ? "INITAILIZING TRAINING" : "START TRAINING"}
                                        </button>
                                    </div>
                                </DialogContent>
                            </Dialog>
                    }

                </div>
            </div>
        </div>

    )
}

export default ModelCard