import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { AdvancedResponseModel, ApiResponse, FalAIResponse } from "../lib/interface"
import { Copy } from "lucide-react"
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
import AdvancedResponse from "./ImageGeneration/AdvancedResponse"
import TrainedModelResponse from "./ImageGeneration/TrainedModelResponse"
import IdeogramResponse from "./ImageGeneration/IdeogramResponse"

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
    const [postID, setpostID] = useState<string | null>(null)
    const [isCopied, setisCopied] = useState(false)
    const [savingDataToDb, setsavingDataToDb] = useState(false)
    const [ImageLink, setImageLink] = useRecoilState(userImageLink)
    const [Response, setResponse] = useState<ApiResponse | null>(
        //     {
        //     "created": "2024-11-22T20:21:27.062171+00:00",
        //     "data": [
        //         {
        //             "is_image_safe": true,
        //             "prompt": "I'm an indian brown girl who loves to code and play chess. Loves playing with AI. But is not a nerd. Doesn't wear glasses. Mid length hair. generate a youtube thumbnail for me for my coding tutorial youtube video, the title of the video is 'Build Chess with me' and it should be vibrant and flashy and i should be in center with highlights to make me popout of the thubmnail.",
        //             "resolution": "1312x736",
        //             "seed": 1589726500,
        //             "style_type": "REALISTIC",
        //             "url": "https://fal.media/files/koala/oAFb0zj9gvx7Xo_47jWr1_c6d28cd2d317417e86d2322ad6eb47fd.jpg"
        //         }
        //     ]
        // }
    )
    const [FalAIResponse, setFalAIResponse] = useState<FalAIResponse | null>(
        //     {
        //     "success": true,
        //     "result": {
        //         "data": {
        //             "images": [
        //                 {
        //                     "url": "https://fal.media/files/koala/oAFb0zj9gvx7Xo_47jWr1_c6d28cd2d317417e86d2322ad6eb47fd.jpg",
        //                     "width": 2752,
        //                     "height": 1536,
        //                     "content_type": "image/jpeg"
        //                 }
        //             ],
        //             "timings": {},
        //             "seed": 882454695,
        //             "has_nsfw_concepts": [
        //                 false
        //             ],
        //             "prompt": "Generate a photo of me as a gangster, sunny side of an alley, indian vibes"
        //         },
        //         "requestId": "88619763-7e90-418d-879c-f2030442993e"
        //     },
        //     "prompt": "Generate a photo of me as a gangster, sunny side of an alley, indian vibes",
        //     "url": "https://fal.media/files/koala/oAFb0zj9gvx7Xo_47jWr1_c6d28cd2d317417e86d2322ad6eb47fd.jpg"
        // }
    )
    const [trainedModelResponse, settrainedModelResponse] = useState<AdvancedResponseModel | null>(
        {

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
        }
    )
    const [CustomResponse, setCustomResponse] = useState(null)
    const { toast } = useToast()
    const navigate = useNavigate();

    const autoResizeTextarea = () => {
        const textarea = textareaRef.current;
        textarea.style.height = 'auto'; // Reset height to auto to recalculate
        textarea.style.height = `${textarea.scrollHeight}px`; // Set height to scrollHeight
    };
    console.log(user)

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
                if (data) {
                    setpostID(data.id)
                }
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
    const generateImage = async () => {
        setResponse(null)
        setFalAIResponse(null)
        settrainedModelResponse(null)
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
                        image: Input,
                        email: user.email
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
                        email: user.email
                    })
                    settrainedModelResponse(data)
                } catch (error) {

                }
                break;
            case "Advanced":
                try {
                    const { data } = await axios.post(`${BACKEND_URL}/trainedModel`, {
                        prompt: Input,
                        path1: trainedModel,
                        email: user.email
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
                setResponse={setResponse}
                setFalAIResponse={setFalAIResponse}
                settrainedModelResponse={settrainedModelResponse}
            />
            <div className="text-white bg-black fixed right-4 mt-5 md:hidden">
                <MobileFilter
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
                    setResponse={setResponse}
                    setFalAIResponse={setFalAIResponse}
                    settrainedModelResponse={settrainedModelResponse}
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
                    Model={Model}
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
                    <IdeogramResponse Response={Response} isCopied={isCopied} createdAt={createdAt} postID={postID} />
                }
                {FalAIResponse && !isLoading &&
                    <AdvancedResponse FalAIResponse={FalAIResponse} createdAt={createdAt} postID={postID} />}
                {
                    trainedModelResponse && !isLoading &&
                    <TrainedModelResponse trainedModel={trainedModelResponse} postID={postID} />
                }
            </div>
        </div >
    )
}

export default ImageGenerationComponent