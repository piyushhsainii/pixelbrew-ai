import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { AdvancedResponseModel, ApiResponse, FalAIResponse } from "../lib/interface"
import { Copy, Download, Info, SlidersHorizontal } from "lucide-react"
import { HashLoader } from "react-spinners"
import { useRecoilState } from "recoil"
import { authUser, Balance, userImageLink } from "../atoms/atoms"
import { BACKEND_URL } from "../lib/url"
import { useNavigate } from "react-router-dom"
import { useToast } from "../hooks/use-toast"
import DownloadButton from "./DownloadBtn"
import SuggestionCard from "./SuggestionCard"
import SearchBar from "./ImageGeneration/SearchBar"
import Filter from "./ImageGeneration/Filter"
import MobileFilter from "./ImageGeneration/MobileFilter"
import { fal } from "@fal-ai/client"
import AdvancedResponse from "./ImageGeneration/AdvancedResponse"
import TrainedModelResponse from "./ImageGeneration/TrainedModelResponse"

export type MagicPrompt = "ON" | "OFF" | "AUTO"
export type Model = "FAL_AI" | "Ideogram" | "Advanced" | "Custom"

const ImageGenerationComponent = () => {

    const [Input, setInput] = useState<string>("")
    const [styleType, setstyleType] = useState<string>('REALISTIC')
    const [ModelVersion, setModelVersion] = useState<string>('V_2')
    const [Model, setModel] = useState<Model>('FAL_AI')     //MODEL TYPE
    const [SubjectModel, setSubjectModel] = useState<string | null>(null)
    const [trainedModel, settrainedModel] = useState<string>(null)
    const [StyleModel, setStyleModel] = useState<string | null>(null)
    const [AspectRatio, setAspectRatio] = useState<string>('ASPECT_16_9')
    const [isMagicPromptOn, setIsMagicPromptOn] = useState<MagicPrompt>('OFF')
    const [isLoading, setisLoading] = useState(false)
    const [FaceImageUrl, setFaceImageUrl] = useState<string | null>()
    const textareaRef = useRef(null);
    const [balance, setBalance] = useRecoilState(Balance)
    const [user, setUser] = useRecoilState(authUser)
    const [isCopied, setisCopied] = useState(false)
    const [savingDataToDb, setsavingDataToDb] = useState(false)
    const [ImageLink, setImageLink] = useRecoilState(userImageLink)
    const [Response, setResponse] = useState<ApiResponse | null>(null)
    const [FalAIResponse, setFalAIResponse] = useState<FalAIResponse | null>(null)
    const [trainedModelResponse, settrainedModelResponse] = useState<AdvancedResponseModel | null>({
        "data": {
            "images": [
                {
                    "url": "https://fal.media/files/rabbit/Bq7x3JAsFdpL4xBn2y_c-_21b8f79d2af34fcd97fe21e3baa91e20.jpg",
                    "width": 1024,
                    "height": 768,
                    "content_type": "image/jpeg"
                }
            ],
            "timings": {
                "inference": 6.995699153281748
            },
            "seed": 12820568198716680000,
            "has_nsfw_concepts": [
                false
            ],
            "prompt": "A dramatic, cinematic close-up of a muscular me walking confidently toward the camera in a dimly lit urban alleyway. He has a sharp, intense expression, wearing a black leather jacket over a white tank top that highlights his toned muscles. A lit cigarette dangles casually from his lips, with a faint trail of smoke swirling around his face. The alley is gritty, with graffiti-covered brick walls and faint neon lights reflecting off puddles on the ground. The lighting is moody, with shadows accentuating the man’s chiseled features and the atmospheric vibe of the scene, creating a powerful, intimidating gangster aesthetic."
        },
        "requestId": "6c6aac97-d168-4336-bcdc-b744efc2702a"
    })
    const [CustomResponse, setCustomResponse] = useState(null)
    const { toast } = useToast()
    const navigate = useNavigate();

    const autoResizeTextarea = () => {
        const textarea = textareaRef.current;
        textarea.style.height = 'auto'; // Reset height to auto to recalculate
        textarea.style.height = `${textarea.scrollHeight}px`; // Set height to scrollHeight
    };

    const savePromptsToDb = async (imageUrl: string) => {

        try {
            const formData = new FormData();
            formData.append('file', imageUrl)
            formData.append('upload_preset', 'ideogram')
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/dzow59kgu/image/upload`,
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' }
                }
            );
            if (response) {
                const { data } = await axios.post(`${BACKEND_URL}/savePrompts`, {
                    prompt: Input,
                    image: response.data.secure_url,
                    email: user.email,
                    model: Model
                })
            }
            toast({
                title: "Added the Image to Gallery",
                description: <div>View Gallery</div>,
                variant: "default",
                className: "bg-primmaryColor text-white font-sans border-gray-800 border",
            });
        }

        catch {
            toast({
                title: "Something went wrong while adding image to gallery",
                variant: "default",
                className: "bg-primmaryColor text-white font-sans border-gray-800 border",
            });
        }
    }
    console.log(trainedModel)
    const generateImage = async () => {
        switch (Model) {
            case "FAL_AI":
                if (Input == "") {
                    return toast({
                        title: "Describe what you want to see!",
                        variant: "default",
                        className: "bg-primmaryColor text-white font-sans border-gray-800 border",
                    });
                }
                setInput("")
                setisLoading(true)
                try {
                    const { data, status } = await axios.post(`${BACKEND_URL}/generateImg`, {
                        image: Input
                    })
                    if (status == 200) {
                        savePromptsToDb(data.url)
                        setFalAIResponse(data)
                    }
                    setisLoading(false)

                } catch (error) {
                    setisLoading(false)
                    toast({
                        title: error,
                        variant: "default",
                        className: "bg-primmaryColor text-white font-sans border-gray-800 border",

                    });
                }
                break;
            case "Ideogram":
                if (Input == "") {
                    return toast({
                        title: "Describe what you want to see!",
                        variant: "default",
                        className: "bg-primmaryColor text-white font-sans border-gray-800 border",

                    });
                }
                setisLoading(true)
                setInput("")
                try {
                    const { data } = await axios.post(`${BACKEND_URL}/generate`, {
                        input: Input,
                        aspect_ratio: AspectRatio,
                        model_version: ModelVersion,
                        style_type: styleType,
                        face_swap: FaceImageUrl,
                        magic_prompt: isMagicPromptOn,
                        email: user.email

                    })
                    if (data.error) {
                        setisLoading(false)
                        return toast({
                            title: data.error,
                            variant: "destructive",
                            className: "bg-primmaryColor text-white font-sans border-gray-800 border",
                        });
                    }
                    autoResizeTextarea()
                    setisLoading(false)
                    setResponse(data.result)
                    setBalance(data.balance)
                    const imageUrl = data.result.data[0].url
                    savePromptsToDb(imageUrl)
                } catch (error) {
                    toast({
                        title: error,
                        variant: "default",
                        className: "bg-primmaryColor text-white font-sans border-gray-800 border",

                    });
                    setisLoading(false)
                }
                break;
            case "Custom":
                if (SubjectModel == null) {
                    return toast({
                        title: "Select Style Model to continue",
                        variant: "destructive",
                        className: "bg-primmaryColor text-white font-sans border-gray-800 border",
                    });
                }
                if (StyleModel == null) {
                    return toast({
                        title: "Select Subject Model to continue",
                        variant: "destructive",
                        className: "bg-primmaryColor text-white font-sans border-gray-800 border",
                    });
                }
                try {
                    const { data } = await axios.post(`${BACKEND_URL}/customModel`, {
                        prompt: Input,
                        path1: SubjectModel,
                        path2: StyleModel,
                    })
                    settrainedModelResponse(data)
                } catch (error) {

                }
                break;
            case "Advanced":
                try {
                    const { data } = await axios.post(`${BACKEND_URL}/trainedModel`, {
                        prompt: Input,
                        path1: trainedModel
                    })
                    settrainedModelResponse(data)
                } catch (error) {

                }
                break;
            default:
                break;
        }

    }
    // @ts-ignore
    const createdAt = new Date(Response?.created)
    const getUserDetails = async () => {
        const userDetails = await axios.post(`${BACKEND_URL}/getUserDetails`, {
            email: user.user_metadata.email
        })
        if (userDetails.data.user == null) {
            toast({
                title: "Setup your profile to generate images!",
                variant: "default",
                className: "bg-primmaryColor text-white font-sans border-gray-800 border",

            });
            return navigate('/profileSetup');
        }
        setFaceImageUrl(userDetails.data.user.trainingImg)
    }
    const copyPrompt = async (prompt: string) => {
        setisCopied(true)
        await navigator.clipboard.writeText(prompt)
        setTimeout(() => {
            setisCopied(false)
        }, 1500)
    }
    const toggleMagicPromptState = () => {
        if (isMagicPromptOn == "OFF") {
            setIsMagicPromptOn("ON")
            toast({
                title: "Magic Prompt is On",
                description: "turning this on will enhance your prompt with pixelbrew AI",
                variant: "default",
                className: "bg-primmaryColor text-white font-sans border-gray-800 border",
            });
        }
        if (isMagicPromptOn == "ON") {
            setIsMagicPromptOn("OFF")
            toast({
                title: "Magic Prompt is Off",
                description: "turning this on will enhance your prompt with pixelbrew AI",
                variant: "default",
                className: "bg-primmaryColor text-white font-sans border-gray-800 border",
            });
        }
    }


    useEffect(() => {
        autoResizeTextarea(); // Initialize resize on mount
    }, [Input]);
    const handleInputChange = (e) => {
        setInput(e.target.value);
        autoResizeTextarea();
    };
    useEffect(() => {
        getUserDetails()
    }, [Response])
    return (
        <div className='flex justify-stretch bg-black min-h-[100vh] h-full  w-screen font-sans mt-28 md:mt-18 lg:mt-14'>
            <Filter
                styleType={styleType}
                setstyleType={setstyleType}
                ModelVersion={ModelVersion}
                setModelVersion={setModelVersion}
                AspectRatio={AspectRatio}
                setAspectRatio={setAspectRatio}
                Model={Model}
                setModel={setModel}
                setSubjectModel={setSubjectModel}
                setStyleModel={setStyleModel}
                settrainedModel={settrainedModel}
                trainedModel={trainedModel}
            />
            <div className="text-white bg-black fixed right-4 mt-5 md:hidden">
                <MobileFilter
                    styleType={styleType}
                    setstyleType={setstyleType}
                    ModelVersion={ModelVersion}
                    setModelVersion={setModelVersion}
                    AspectRatio={AspectRatio}
                    setAspectRatio={setAspectRatio}
                />
            </div>
            <div className='bg-black w-[100%] p-4  '>
                <SearchBar
                    toggleMagicPromptState={toggleMagicPromptState}
                    textareaRef={textareaRef}
                    handleInputChange={handleInputChange}
                    generateImage={generateImage}
                    isLoading={isLoading}
                    Input={Input}
                    isMagicPromptOn={isMagicPromptOn}
                />
                {!isLoading && !Response?.data && !FalAIResponse && !trainedModelResponse &&
                    (<>
                        <div className="text-purple-400 text-sm flex justify-center mb-1 tracking-tight">
                            not sure how to prompt? try these!
                        </div>
                        <SuggestionCard generate={generateImage} setInput={setInput} />
                    </>)}
                {isLoading &&
                    <div className="flex justify-center items-center h-[60vh]" >
                        <HashLoader className="w-20" color="#7e22ce" size={150} />
                    </div>}
                {Response?.data && !isLoading &&
                    <div className="flex flex-col md:flex-row flex-wrap justify-evenly  p-5 bg-primmaryColor ">
                        <div className="max-w-[600px] max-h-[450px]">
                            <img
                                src={Response.data[0].url}
                                alt="img"
                                className="border-2 border-white " />
                        </div>
                        <div className="text-gray-300 font-sans w-[100%] md:w-[40%] flex flex-col border border-gray-700 border-opacity-40 p-2">
                            <div>
                                <div className="flex justify-between bg-purple-700 bg-opacity-80 items-center px-2 ">
                                    <div className="p-2 font-semibold" > Prompt </div>
                                    {/* @ts-ignore */}
                                    <div className="mr-2 cursor-pointer" onClick={() => copyPrompt(Response.data[0].prompt as string)} >
                                        {isCopied ? 'Text copied!' : <Copy width={17} className="hover:scale-105" />}
                                    </div>
                                </div>
                                <div className="bg-purple-700 bg-opacity-40 p-4 text-gray-200  tracking-tight text-sm ">
                                    {Response.data[0].prompt}
                                </div>
                            </div>
                            <div className="flex flex-col gap-4 mt-3 ">
                                <div>
                                    <div className="flex">
                                        <div className="bg-purple-700 bg-opacity-80 p-2 font-semibold w-[50%] " >
                                            Resolution
                                        </div>
                                        <div className="bg-purple-700 bg-opacity-40 p-2 text-gray-300 w-[50%] text-sm flex items-center ">
                                            {Response?.data[0].resolution}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex ">
                                        <div className="bg-purple-700 bg-opacity-80 p-2 font-semibold w-[50%]" >
                                            Style Type
                                        </div>
                                        <div className="bg-purple-700 bg-opacity-40 p-2 text-gray-300 w-[50%] flex items-center text-sm">
                                            {Response?.data[0].style_type}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex">
                                        <div className="bg-purple-700 bg-opacity-80 p-2 font-semibold w-[50%]" >
                                            Date created
                                        </div>
                                        <div className="bg-purple-700  bg-opacity-40 p-2 text-gray-300 w-[50%] flex items-center text-sm">
                                            {createdAt.toLocaleString()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <a href={Response.data[0].url} download={Response.data[0].url} target="blank">
                                <div >
                                    <DownloadButton
                                        url={Response.data[0].url}
                                        data={Response.data[0].url}
                                        filename="pixelbrew_ai.jpeg"
                                        className="bg-green-700   text-center text-white rounded-md p-4 py-2 m-3 ml-0 flex items-center justify-evenly gap-1
                                        cursor-pointer hover:scale-110 transition-all duration-200 active:scale-90
                                        "
                                    />
                                </div>
                            </a>
                        </div>
                    </div>
                }
                {FalAIResponse && !isLoading &&
                    <AdvancedResponse FalAIResponse={FalAIResponse} createdAt={createdAt} />}
                {
                    trainedModelResponse && !isLoading &&
                    <TrainedModelResponse trainedModel={trainedModelResponse} />
                }
            </div>
        </div >
    )
}

export default ImageGenerationComponent