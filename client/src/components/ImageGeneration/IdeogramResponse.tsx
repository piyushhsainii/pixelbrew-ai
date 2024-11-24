import { Copy } from "lucide-react"
import { ApiResponse } from "../../lib/interface"
import DownloadButton from "../DownloadBtn"
import { useState } from "react"
import ShadowBtn from "../ShadowBtn"
import { TestImageEditor } from "./ImageEditor"

const IdeogramResponse = ({ Response, isCopied, createdAt, postID }: { Response: ApiResponse, isCopied: boolean, createdAt: any, postID: string }) => {
    const [editMode, seteditMode] = useState(false)

    return (
        <>
            {
                !editMode &&
                <div className="flex flex-col lg:flex-row justify-evenly items-center p-5 bg-black border border-white border-opacity-30 rounded-lg ">
                    <div className="max-w-[600px] max-h-[450px]">
                        <img
                            src={Response.data[0].url}
                            alt="img"
                            className="border-2 border-white " />
                    </div>
                    <div className="text-gray-300 font-sans w-[100%] lg:w-[40%] flex flex-col border border-gray-700 border-opacity-40 p-2">
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
                        <div className="flex items-center gap-4">
                            <div onClick={() => seteditMode((e) => !e)}><ShadowBtn string="Customise" bgColor="bg-green-600 hover:bg-green-800" /></div>
                            <a href={Response.data[0].url} download={Response.data[0].url} target="blank">
                                <DownloadButton
                                    url={Response.data[0].url}
                                    data={Response.data[0].url}
                                    filename="pixelbrew_ai.jpeg"
                                    className="bg-green-600  shadow-white  shadow-[3px_2px_1px_[1]px_rgba(2,4,4,0.2)]  text-center text-white rounded-md  py-4 m-3 ml-0 flex items-center justify-evenly gap-1
                            cursor-pointer transition-all duration-200 
                            "
                                />
                            </a>
                        </div>
                    </div>
                </div>
            }
            {<div className="w-[84 %]  m-auto">
                {
                    editMode &&
                    <TestImageEditor
                        editMode={editMode}
                        setEditMode={seteditMode}
                        id={postID}
                        url={Response.data[0].url}
                    />
                }
            </div>}
        </>
    )
}

export default IdeogramResponse