import { ArrowRight, FilePlus2, Image, ImagePlus } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "../ui/dialog"

const ModelCard = ({ img, data }: { img: string, data }) => {
    return (
        <div className="w-[50vw] border border-white max-w-[600px] h-80 flex items-center px-2 gap-5 rounded-md border-opacity-20 ">
            <div className="w-[50%] flex justify-center items-center">
                <img src={img} alt="x" className="h-full w-full rounded-md border border-purple-600 border-opacity-35" />
            </div>
            <div className="w-[50%] flex flex-col gap-2">
                <div className="text-2xl pt-1"> {data.modelName} </div>
                <div className="text-muted text-pretty text-sm text-gray-400"> {data.description} </div>
                <div className="text-sm bg-purple-700 w-[100px] text-center rounded-md"> {data.modelType} </div>
                <div>
                    <div className="text-sm pl-1 py-1">HOW THIS WORKS</div>
                    {data.how_it_works.map((data) => (
                        <div className="text-[0.730rem] w-full tracking-tight"> - {data.steps}. </div>
                    ))}
                </div>
                <Dialog>
                    <DialogTrigger>
                        <div> <button className="bg-purple-700 px-3 py-2 flex items-center gap-1 hover:gap-3 transition-all duration-200 ">
                            GET STARTED <ArrowRight size={18} className="" /> </button>
                        </div>
                    </DialogTrigger>
                    <DialogContent className="w-[90vw] h-[85vh] mt-7 bg-black text-white border-purple-700 border-opacity-45">
                        <div>
                            <div className="text-2xl font-sans pl-2 m-4 ml-0"> {data.modelName} </div>
                            <div className="flex font-sans gap-5">
                                <div className="flex items-center text-sm border border-gray-500 p-1 px-3 border-opacity-50">
                                    <ImagePlus size={18} />  Add Images    </div>
                                <div>or</div>
                                <div className="flex items-center text-sm border border-gray-500 p-1 px-3 border-opacity-50">
                                    <FilePlus2 size={18} /> Pick a .zip file</div>
                            </div>
                            <div className="flex m-2 ml-0">
                                <div className="p-5 bg-gray-900 m-3 bg-opacity-60 "> <Image size={60} /> </div>
                                <div className="p-5 bg-gray-900 m-3 bg-opacity-60 "><Image size={60} /></div>
                                <div className="p-5 bg-gray-900 m-3 bg-opacity-60 "><Image size={60} /></div>
                                <div className="p-5 bg-gray-900 m-3 bg-opacity-60 "><Image size={60} /></div>
                            </div>

                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}

export default ModelCard