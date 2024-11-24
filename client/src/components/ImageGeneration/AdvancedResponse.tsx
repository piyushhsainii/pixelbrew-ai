import React, { useState } from 'react'
import DownloadButton from '../DownloadBtn'
import { FalAIResponse } from '../../lib/interface'
import ShadowBtn from '../ShadowBtn'
import { TestImageEditor } from './ImageEditor'

const AdvancedResponse = ({ FalAIResponse, createdAt, postID }: { FalAIResponse: FalAIResponse, createdAt: any, postID: string }) => {
    const [editMode, seteditMode] = useState(false)
    console.log(FalAIResponse)
    return (
        <>
            {
                !editMode &&
                <div className="flex flex-col lg:flex-row  gap-3  justify-evenly item  p-5   border border-gray-600 border-opacity-40 rounded-md">
                    <div className="max-w-[600px] max-h-[450px] ">
                        <img
                            src={FalAIResponse.url}
                            alt="img"
                            className="max-h-[40rem]" />
                    </div>
                    <div className="lg:w-[70%] max-w-[600px]">
                        <div className="flex flex-col gap-4 mt-3  ">
                            <div>
                                <div className="flex">
                                    <div className="bg-primmaryColor bg-opacity-80 p-2 font-semibold w-[50%] text-white" >
                                        Dimensions
                                    </div>
                                    <div className="bg-primmaryColor bg-opacity-40 p-2 text-gray-300 w-[50%] text-sm flex items-center ">
                                        {FalAIResponse?.result?.data.images[0].height.toString()} X  {FalAIResponse?.result?.data?.images[0].width.toString()}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="flex flex-col">
                                    <div className="bg-primmaryColor bg-opacity-80 p-2 font-semibold w-full text-white" >
                                        Prompt
                                    </div>
                                    <div className="bg-primmaryColor bg-opacity-40 p-2 font-sans  tracking-tight text-gray-300 w-full flex items-center text-sm">
                                        {FalAIResponse?.prompt}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex items-center gap-5'>
                            <div onClick={() => seteditMode((e) => !e)}>
                                <button className='bg-primmaryColor hover:bg-white text-white text-base hover:text-primmaryColor font-sans px-5 font-semibold py-2 transition-all duration-200 rounded-md'>
                                    Customise
                                </button>
                            </div>
                            <a href={FalAIResponse.url} download={FalAIResponse.url} target="blank">
                                <DownloadButton
                                    url={FalAIResponse.url}
                                    data={FalAIResponse.url}
                                    filename="pixelbrew_ai.jpeg"
                                    className=" border border-opacity-40 border-white hover:bg-primmaryColor hover:text-white  bg-white text-black text-center  rounded-md  py-[1.2rem] m-3 ml-0 flex items-center justify-evenly gap-1
                            cursor-pointer transition-all duration-200 
                            "
                                />
                            </a>
                        </div>
                    </div>

                </div>
            }
            <div>
                {
                    <div className="w-[84 %]  m-auto">
                        {
                            editMode &&
                            <TestImageEditor
                                editMode={editMode}
                                setEditMode={seteditMode}
                                id={postID}
                                url={FalAIResponse.url}
                            />
                        }
                    </div>
                }
            </div>
        </>

    )
}

export default AdvancedResponse