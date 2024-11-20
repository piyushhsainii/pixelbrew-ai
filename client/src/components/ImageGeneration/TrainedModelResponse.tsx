import { AdvancedResponseModel } from "../../lib/interface"
import DownloadButton from "../DownloadBtn"

const TrainedModelResponse = ({ trainedModel }: { trainedModel: AdvancedResponseModel }) => {


    return (
        <div className="flex flex-col md:flex-row gap-4  justify-evenly  p-5  ">
            <div className="max-w-[700px] max-h-[450px] ">
                <img
                    src={trainedModel.data.images[0].url}
                    alt="img"
                    className="border border-white " />
            </div>
            <div className="md:w-[70%]">
                <div className="flex flex-col gap-4 mt-3 ">
                    <div>
                        <div className="flex">
                            <div className="bg-purple-700 bg-opacity-80 p-2 font-semibold w-[50%]  text-white" >
                                Dimensions
                            </div>
                            <div className="bg-purple-700 bg-opacity-40 p-2 text-gray-300 w-[50%] text-sm flex items-center ">
                                {trainedModel.data.images[0].height.toString()} X  {trainedModel.data.images[0].width.toString()}
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex flex-col">
                            <div className="bg-purple-700 bg-opacity-80 p-2 font-semibold w-full text-white" >
                                Prompt
                            </div>
                            <div className="bg-purple-700 bg-opacity-40 p-2 font-sans  tracking-tight text-gray-300 w-full flex items-center text-sm">
                                {trainedModel.data.prompt}
                            </div>
                        </div>
                    </div>
                </div>
                <a href={trainedModel.data.images[0].url} download={trainedModel.data.images[0].url} target="blank">
                    <div >
                        <DownloadButton
                            url={trainedModel.data.images[0].url}
                            data={trainedModel.data.images[0].url}
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

export default TrainedModelResponse