import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { ApiResponse } from "../lib/interface"
import { Copy, Download } from "lucide-react"
import { HashLoader } from "react-spinners"
import { supabase } from "../lib/supabase"
import { useRecoilState } from "recoil"
import { authUser } from "../atoms/atoms"
import { redirect } from "react-router-dom"
import { BACKEND_URL } from "../lib/url"

const MainComponent = () => {

    const [Input, setInput] = useState<string>("")
    const [styleType, setstyleType] = useState<string>('GENERAL')
    const [ModelVersion, setModelVersion] = useState<string>('V_2')
    const [AspectRatio, setAspectRatio] = useState<string>('ASPECT_16_9')
    const [isLoading, setisLoading] = useState(false)
    const textareaRef = useRef(null);
    const [user, setUser] = useRecoilState(authUser)
    const [Response, setResponse] = useState<ApiResponse | null>(null)


    const autoResizeTextarea = () => {
        const textarea = textareaRef.current;
        textarea.style.height = 'auto'; // Reset height to auto to recalculate
        textarea.style.height = `${textarea.scrollHeight}px`; // Set height to scrollHeight
    };
    const generateImage = async () => {
        if (Input == "") return
        setisLoading(true)
        setInput("")
        try {
            const { data } = await axios.post(`${BACKEND_URL}/generate`, {
                input: Input,
                aspect_ratio: AspectRatio,
                model_version: ModelVersion,
                style_type: styleType,
            })
            autoResizeTextarea()
            setisLoading(false)
            setResponse(data)
        } catch (error) {
            setisLoading(false)
        }
    }
    // @ts-ignore
    const createdAt = new Date(Response?.created)

    useEffect(() => {
        autoResizeTextarea(); // Initialize resize on mount
    }, [Input]);
    const handleInputChange = (e) => {
        setInput(e.target.value);
        autoResizeTextarea();
    };
    return (
        <div className='flex justify-stretch bg-black min-h-[100vh] h-full '>
            <div className='w-[250px] hidden border-r border-secondaryColor border-opacity-45 mt-8 md:flex flex-col p-4 gap-5'>
                <div className="text-gray-400 font-sans text-center ">
                    MODIFY PARAMETERS
                </div>
                <select
                    className='p-2 bg-primmaryColor text-gray-300 border border-secondaryColor border-opacity-40 rounded-xl px-2 pl-4 font-sans text-sm'
                    value={styleType}
                    onChange={(e) => setstyleType(e.target.value)}
                >
                    <option value="GENERAL">GENERAL</option>
                    <option value="REALISTIC">REALISTIC</option>
                    <option value="DESIGN">DESIGN</option>
                    <option value="RENDER_3D">RENDER_3D</option>
                    <option value="ANIME">ANIME</option>
                </select>
                <select
                    className='p-2 bg-primmaryColor text-gray-300 border border-secondaryColor border-opacity-40 rounded-xl px-2 pl-4 font-sans text-sm'
                    value={ModelVersion}
                    onChange={(e) => setModelVersion(e.target.value)}
                >
                    <option value="V_1">V_1</option>
                    <option value="V_1_TURBO">V_1_TURBO</option>
                    <option value="V_2">V_2</option>
                    <option value="V_2_TURBO">V_2_TURBO</option>
                </select>
                <select
                    className='p-2 bg-primmaryColor text-gray-200 border border-secondaryColor border-opacity-40 rounded-xl px-2 pl-4 font-sans text-sm'
                    value={AspectRatio}
                    onChange={(e) => setAspectRatio(e.target.value)}
                >
                    <option className="text-gray-200" value="ASPECT_16_9">ASPECT_16_9</option>
                    <option className="text-gray-200" value="ASPECT_16_10">ASPECT_16_10</option>
                    <option className="text-gray-200" value="ASPECT_10_16">ASPECT_10_16</option>
                    <option className="text-gray-200" value="ASPECT_1_1">ASPECT_1_1</option>
                    <option className="text-gray-200" value="ASPECT_1_3">ASPECT_1_3</option>
                    <option className="text-gray-200" value="ASPECT_2_3">ASPECT_2_3</option>
                    <option className="text-gray-200" value="ASPECT_3_1">ASPECT_3_1</option>
                    <option className="text-gray-200" value="ASPECT_3_2">ASPECT_3_2</option>
                    <option className="text-gray-200" value="ASPECT_3_4">ASPECT_3_4</option>
                    <option className="text-gray-200" value="ASPECT_4_3">ASPECT_4_3</option>
                    <option className="text-gray-200" value="ASPECT_9_16">ASPECT_9_16</option>
                </select>
            </div>
            <div className='bg-black    w-[100%] p-4  '>
                <div className='border-purple-800 border border-opacity-60 rounded-3xl py-[0.95px] w-[75%] m-auto flex flex-col  md:flex-row justify-between my-4'>
                    <textarea
                        className='bg-black  w-[100%] pl-3 rounded-3xl font-sans focus:outline-none active:outline-none text-gray-300
                         p-3 resize-none'
                        ref={textareaRef}
                        placeholder='Describe what you want to see...'
                        value={Input}
                        rows={1}
                        onChange={handleInputChange}
                    ></textarea>
                    <button
                        className='bg-gradient-to-r  max-h-[55px] font-semibold text-white 
                    from-blue-600 to-purple-600 px-10  rounded-3xl py-2 hover:scale-x-[120%]
                    hover:scale-110 transition-all duration-200 active:scale-90 font-sans text-lg border
                     border-blue-800
                    '
                        onClick={generateImage}
                    >

                        {isLoading ? "Generating..." : "Generate"}
                    </button>
                </div>
                {
                    isLoading &&
                    <div className="flex justify-center items-center h-[60vh]" >
                        <HashLoader className="w-20 " color="#152243" size={150} />
                    </div>
                }
                {
                    Response?.data && !isLoading &&
                    <div className="flex flex-col md:flex-row flex-wrap justify-evenly  p-5 bg-primmaryColor ">
                        <div className="max-w-[600px] max-h-[450px]">
                            <img
                                src={Response.data[0].url}
                                alt="img"
                                className="border border-gray-600 " />
                        </div>
                        <div className="text-gray-300 font-sans w-[100%] md:w-[40%] flex flex-col border border-gray-700 border-opacity-40 p-2">
                            <div>
                                <div className="flex justify-between bg-secondaryColor bg-opacity-80 items-center px-2 rounded-lg">
                                    <div className="p-2 font-semibold" > Prompt </div>
                                    <div className="mr-2 cursor-pointer" > <Copy width={17} /></div>
                                </div>
                                <div className="bg-secondaryColor bg-opacity-40 p-4 text-gray-400 text-sm ">
                                    {
                                        Response.data[0].prompt
                                    }
                                </div>
                            </div>
                            <div className="flex flex-col gap-4 mt-3 ">
                                <div className="w-full">
                                    <div className="flex ">
                                        <div className="bg-secondaryColor rounded-lg bg-opacity-80 p-2 font-semibold  w-[50%] "  >
                                            Model
                                        </div>
                                        <div className="bg-secondaryColor rounded-lg bg-opacity-40 p-2 text-gray-300 w-[50%] flex items-center  ">
                                            Ideogram
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex">
                                        <div className="bg-secondaryColor bg-opacity-80 p-2 font-semibold w-[50%] " >
                                            Resolution
                                        </div>
                                        <div className="bg-secondaryColor bg-opacity-40 p-2 text-gray-300 w-[50%] text-sm flex items-center ">
                                            {Response?.data[0].resolution}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex ">
                                        <div className="bg-secondaryColor bg-opacity-80 p-2 font-semibold w-[50%]" >
                                            Style Type
                                        </div>
                                        <div className="bg-secondaryColor bg-opacity-40 p-2 text-gray-300 w-[50%] flex items-center text-sm">
                                            {Response?.data[0].style_type}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex">
                                        <div className="bg-secondaryColor bg-opacity-80 p-2 font-semibold w-[50%]" >
                                            Date created
                                        </div>
                                        <div className="bg-secondaryColor  bg-opacity-40 p-2 text-gray-300 w-[50%] flex items-center text-sm">
                                            {createdAt.toLocaleString()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <a href={Response.data[0].url} download={Response.data[0].url} target="blank">
                                <div className="bg-green-700 w-[50%]  md:w-[30%] text-center text-white rounded-md p-4 py-2 m-3 ml-0 flex items-center justify-evenly gap-1
                cursor-pointer hover:scale-110 transition-all duration-200 active:scale-90
                ">
                                    <Download width={19} />  Download
                                </div>
                            </a>
                        </div>
                    </div>
                }
            </div>
        </div >
    )
}

export default MainComponent