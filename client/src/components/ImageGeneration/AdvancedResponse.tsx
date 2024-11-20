import React from 'react'
import DownloadButton from '../DownloadBtn'
import { FalAIResponse } from '../../lib/interface'

const AdvancedResponse = ({ FalAIResponse, createdAt }: { FalAIResponse: FalAIResponse, createdAt: any }) => {
    return (
        <div className="flex flex-col md:flex-row flex-wrap  justify-evenly  p-5  ">
            <div className="max-w-[600px] max-h-[450px] ">
                <img
                    src={FalAIResponse.url}
                    alt="img"
                    className="border-2 border-white " />
            </div>
            <div className="md:w-[70%]">
                <div className="flex flex-col gap-4 mt-3 ">
                    <div>
                        <div className="flex">
                            <div className="bg-purple-700 bg-opacity-80 p-2 font-semibold w-[50%] " >
                                Dimensions
                            </div>
                            <div className="bg-purple-700 bg-opacity-40 p-2 text-gray-300 w-[50%] text-sm flex items-center ">
                                {FalAIResponse?.result?.data.images[0].height.toString()} X  {FalAIResponse?.result?.data?.images[0].width.toString()}
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex ">
                            <div className="bg-purple-700 bg-opacity-80 p-2 font-semibold w-[50%]" >
                                Prompt
                            </div>
                            <div className="bg-purple-700 bg-opacity-40 p-2 font-sans  tracking-tight text-gray-300 w-[50%] flex items-center text-sm">
                                {FalAIResponse?.prompt}
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
                <a href={FalAIResponse.url} download={FalAIResponse.url} target="blank">
                    <div >
                        <DownloadButton
                            url={FalAIResponse.url}
                            data={FalAIResponse.url}
                            filename="pixelbrew_ai.jpeg"
                            className="bg-green-700   text-center text-white rounded-md p-4 py-2 m-3 ml-0 flex items-center justify-evenly gap-1
                    cursor-pointer hover:scale-110 transition-all duration-200 active:scale-90
                    "
                        />
                    </div>
                </a>
            </div>
        </div>
    )
}

export default AdvancedResponse