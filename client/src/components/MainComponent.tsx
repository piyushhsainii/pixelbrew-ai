import { useState } from "react"
import PulsatingButton from "./ui/pulsating-button"
import axios from "axios"
import { ApiResponse } from "../lib/interface"
import { Download } from "lucide-react"

const MainComponent = () => {

    const [Input, setInput] = useState<string>("")
    const [styleType, setstyleType] = useState<string>('GENERAL')
    const [ModelVersion, setModelVersion] = useState<string>('V_2')
    const [AspectRatio, setAspectRatio] = useState<string>('ASPECT_16_9')
    const [isLoading, setisLoading] = useState(false)
    const [Response, setResponse] = useState<ApiResponse | null>(null)

    const BACKEND_URL = 'http://localhost:8000'

    const generateImage = async () => {
        try {
            const { data } = await axios.post(`${BACKEND_URL}/generate`, {
                input: Input,
                aspect_ratio: AspectRatio,
                model_version: ModelVersion,
                style_type: styleType,
            })
            setResponse(data)
        } catch (error) {

        }
    }
    // @ts-ignore
    const createdAt = new Date(Response?.created)
    console.log(styleType)
    return (
        <div className='flex justify-stretch bg-primmaryColor h-screen '>
            <div className='w-[250px] border-r border-secondaryColor mt-8 flex flex-col p-4 gap-5'>
                <div className="text-gray-400 font-sans text-center ">
                    MODIFY PARAMETERS
                </div>
                <label htmlFor="" className="text-gray-300 text-center font-sans"> STYLE TYPE</label>
                <select
                    className='p-2 bg-primmaryColor text-gray-300 border border-secondaryColor rounded-xl px-2 pl-4 font-sans text-sm'
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
                    className='p-2 bg-primmaryColor text-gray-300 border border-secondaryColor rounded-xl px-2 pl-4 font-sans text-sm'
                    value={ModelVersion}
                    onChange={(e) => setModelVersion(e.target.value)}
                >
                    <option value="V_1">V_1</option>
                    <option value="V_1_TURBO">V_1_TURBO</option>
                    <option value="V_2">V_2</option>
                    <option value="V_2_TURBO">V_2_TURBO</option>
                </select>
                <select
                    className='p-2 bg-primmaryColor text-gray-200 border border-secondaryColor rounded-xl px-2 pl-4 font-sans text-sm'
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
            <div className='bg-primmaryColor  h-[100vh] w-[100%] p-4  '>
                <div className='border-blue-600 border border-opacity-40 rounded-2xl py-[0.95px] w-[70%] m-auto flex justify-between my-4'>


                    <input
                        type="text"
                        className='bg-primmaryColor w-[100%] pl-3 rounded-2xl font-sans focus:outline-none active:outline-none text-gray-400'
                        placeholder='Describe what you want to see'
                        value={Input}
                        onChange={(e) => { setInput(e.target.value) }}
                    />
                    <PulsatingButton
                        className='bg-gradient-to-r font-semibold text-white font-CeraPro
                         from-primmaryColor to-purple-600 px-4 py-[0.5rem] rounded-3xl
                         hover:scale-110 transition-all duration-200 active:scale-90 font-sans
                         '
                        onClick={generateImage}
                    >
                        Generate
                    </PulsatingButton>
                </div>
                {/* {
                    isLoading && 

                } */}
                {
                    Response?.data && !isLoading &&
                    <div className="flex justify-evenly border p-5 border-secondaryColor border-opacity-25">
                        <div>
                            <img
                                src="https://ideogram.ai/api/images/ephemeral/fY_rCB-uQX2bMDwVZ7Syzw.png?exp=1728341066&sig=afe9313d96d5443896f17b89d887b5f39c9e02a0dd35bec26ffbbc520eeb3adf"
                                alt="img"
                                className="border border-gray-600 max-w-[600px]" />
                        </div>
                        <div className="text-gray-300 font-sans w-[40%] flex flex-col">
                            <div>
                                <div className="bg-secondaryColor bg-opacity-80 p-2 font-semibold" > Prompt </div>
                                <div className="bg-secondaryColor bg-opacity-40 p-2 text-gray-300 text-sm">
                                    {
                                        Response.data[0].prompt
                                    }
                                </div>
                            </div>
                            <div className="flex flex-col gap-4 mt-3 ">
                                <div className="w-full">
                                    <div className="flex ">
                                        <div className="bg-secondaryColor bg-opacity-80 p-2 font-semibold  w-[50%] "  >
                                            Model
                                        </div>
                                        <div className="bg-secondaryColor bg-opacity-40 p-2 text-gray-300 w-[50%] flex items-center  ">
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
                            <div className="bg-green-700  w-[30%] text-center text-white rounded-md p-4 py-2 m-3 ml-0 flex items-center justify-evenly gap-1
                cursor-pointer hover:scale-110 transition-all duration-200 active:scale-90
                ">
                                <Download width={19} />  Download
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default MainComponent