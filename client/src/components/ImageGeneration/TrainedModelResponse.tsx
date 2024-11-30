import { AdvancedResponseModel } from "../../lib/interface"
import DownloadButton from "../DownloadBtn"
import '@pqina/pintura/pintura.css';
import { useState } from "react";
import ShadowBtn from "../ShadowBtn";
import { TestImageEditor } from "./ImageEditor";

const TrainedModelResponse = ({ trainedModel, postID }: { trainedModel: AdvancedResponseModel, postID: string }) => {
    const [editMode, seteditMode] = useState(false)
    const url = trainedModel.data.images[0].url

    return (
        <>
            {
                !editMode &&
                <div className="flex flex-col lg:flex-row gap-4  justify-evenly  p-3 m-3  border border-gray-400 border-opacity-40 rounded-md">
                    <div className="max-w-[700px]  ">
                        <img
                            src={url}
                            alt="img"
                            className="rounded-md max-h-[40rem]" />
                    </div>

                    <div className="lg:w-[70%] max-w-[600px]">
                        <div className="flex flex-col gap-4 mt-3 ">
                            <div>
                                <div className="flex">
                                    <div className="bg-primmaryColor bg-opacity-80 p-2 font-semibold w-[50%]  text-white" >
                                        Dimensions
                                    </div>
                                    <div className="bg-primmaryColor bg-opacity-40 p-2 text-gray-300 w-[50%] text-sm flex items-center ">
                                        {trainedModel.data.images[0].height.toString()} X  {trainedModel.data.images[0].width.toString()}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="flex flex-col">
                                    <div className="bg-primmaryColor bg-opacity-80 p-2 font-semibold w-full text-white" >
                                        Prompt
                                    </div>
                                    <div className="bg-primmaryColor bg-opacity-40 p-2 font-sans  tracking-tight text-gray-300 w-full flex items-center text-sm">
                                        {trainedModel.data.prompt}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-5">
                            <div onClick={() => seteditMode((e) => !e)}>
                                <button className="bg-primmaryColor hover:bg-white text-white text-base hover:text-primmaryColor font-sans px-5 font-semibold py-2 transition-all duration-200 rounded-md" >
                                    Customise
                                </button>
                            </div>
                            <a href={trainedModel.data.images[0].url} download={trainedModel.data.images[0].url} target="blank">
                                <div className="flex   items-center gap-5">
                                    <DownloadButton
                                        url={trainedModel.data.images[0].url}
                                        data={trainedModel.data.images[0].url}
                                        filename="pixelbrew_ai.jpeg"
                                        className="bg-white text-center text-primmaryColor hover:text-white rounded-md  py-4 m-3 ml-0 flex items-center justify-evenly gap-1
                                cursor-pointer transition-all duration-200 
                                "
                                    />
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            }
            {
                <div className="w-[84 %]  m-auto">
                    {
                        editMode &&
                        <TestImageEditor
                            editMode={editMode}
                            setEditMode={seteditMode}
                            id={postID}
                            url={url}
                        />
                    }
                </div>
            }
        </>
    )
}

export default TrainedModelResponse