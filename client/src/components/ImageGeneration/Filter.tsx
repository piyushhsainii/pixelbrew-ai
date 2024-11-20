import { QuestionMarkCircledIcon } from "@radix-ui/react-icons"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import { useRecoilState } from "recoil"
import { userCompleteInfo } from "../../atoms/atoms"

const Filter = ({
    styleType,
    setstyleType,
    ModelVersion,
    setModelVersion,
    AspectRatio,
    setAspectRatio,
    Model,
    setModel,
    setSubjectModel,
    setStyleModel,
    trainedModel,
    settrainedModel
}: {
    styleType: string
    setstyleType: React.Dispatch<React.SetStateAction<string>>
    ModelVersion: string
    setModelVersion: React.Dispatch<React.SetStateAction<string>>
    AspectRatio: string
    setAspectRatio: React.Dispatch<React.SetStateAction<string>>
    Model: string
    setModel: React.Dispatch<React.SetStateAction<string>>
    setSubjectModel: React.Dispatch<React.SetStateAction<string>>
    setStyleModel: React.Dispatch<React.SetStateAction<string>>
    trainedModel: string
    settrainedModel: React.Dispatch<React.SetStateAction<string>>
}) => {

    const [userInfo, setuserInfo] = useRecoilState(userCompleteInfo)
    console.log(userInfo?.user)
    return (
        <div className='w-[250px] hidden border-r border-secondaryColor border-opacity-45 mt-8 md:flex flex-col p-4 gap-5'>
            <div className="text-gray-400 font-sans text-center ">
                MODIFY PARAMETERS
            </div>
            <div className="text-gray-300 font-sans text-base text-center " >
                {/* <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger className=""> SELECT MODEL</AccordionTrigger>
                        <AccordionContent> */}
                <div className="m-3 flex items-center justify-center gap-2 pl-2">SELECT MODEL
                    <TooltipProvider>
                        <Tooltip delayDuration={200}>
                            <TooltipTrigger> <QuestionMarkCircledIcon />  </TooltipTrigger>
                            <TooltipContent>
                                CHOOSE APPROPIATE MODEL FOR YOUR USE CASE.
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <select
                    name="" id="" value={Model}
                    onChange={(e) => setModel(e.target.value)}
                    className="p-2 bg-primmaryColor my-2  relative active:outline-none focus:outline-none shadow-[3px_3px_3px_[1]px_rgba(2,4,4,0.2)] shadow-purple-700 text-gray-300 border border-secondaryColor border-opacity-40 rounded-xl px-2 pl-4 font-sans text-sm"
                >
                    <option value="FAL_AI" >Fal AI</option>
                    <option value="Ideogram"> Ideogram </option>
                    <option value="Advanced"> Advanced </option>
                    <option value="Custom"> Custom </option>
                </select>
                {

                    <div className={`${Model == "Advanced" && ""} text-green-500  px-1 rounded-2xl border bg-opacity-20 bg-green-500 border-green-500 border-opacity-40 absolute bottom-[24rem] text-[0.550rem] left-28`}>
                        {
                            Model == "Advanced" ? "Recommended" :
                                Model == "FAL_AI" ? "For general users" :
                                    Model == "Custom" ? "Generates Best Results" :
                                        Model == "Ideogram" ? "Beta" :
                                            null
                        }
                    </div>}
                {
                    Model == "Ideogram" &&
                    <>
                        <div className="text-gray-300 font-sans text-base text-center mt-7 ">
                            <div className="my-1  flex items-center justify-center gap-2">
                                CONFIGURE IMAGE
                            </div>
                            <select
                                className='p-2 m-3 bg-primmaryColor shadow-[3px_3px_3px_[1]px_rgba(2,4,4,0.2)] shadow-purple-700 text-gray-300 border border-secondaryColor border-opacity-40 rounded-xl px-2 pl-4 font-sans text-sm'
                                value={styleType}
                                onChange={(e) => setstyleType(e.target.value)}
                            >
                                <option value="GENERAL">GENERAL</option>
                                <option value="REALISTIC">REALISTIC</option>
                                <option value="DESIGN">DESIGN</option>
                                <option value="RENDER_3D">RENDER_3D</option>
                                <option value="ANIME">ANIME</option>
                            </select>
                        </div>
                        <div className="text-gray-300 font-sans text-base text-center my-5">
                            <div className="my-1 flex justify-center items-center gap-2 " >SELECT MODEL <QuestionMarkCircledIcon /></div>
                            <select
                                className='p-2 shadow-[3px_3px_3px_[1]px_rgba(2,4,4,0.2)] shadow-purple-700 bg-primmaryColor text-gray-300 border border-secondaryColor border-opacity-40 rounded-xl px-2 pl-4 font-sans text-sm'
                                value={ModelVersion}
                                onChange={(e) => setModelVersion(e.target.value)}
                            >
                                <option value="V_1">V_1</option>
                                <option value="V_1_TURBO">V_1_TURBO</option>
                                <option value="V_2">V_2</option>
                                <option value="V_2_TURBO">V_2_TURBO</option>
                            </select>
                        </div>
                        <div className="text-gray-300 font-sans text-base text-center my-5">
                            <div className="my-1 flex justify-center items-center gap-2">ASPECT RATIO <QuestionMarkCircledIcon /></div>
                            <select
                                className='p-2 shadow-[3px_3px_3px_[1]px_rgba(2,4,4,0.2)] shadow-purple-700 bg-primmaryColor text-gray-200 border border-secondaryColor border-opacity-40 rounded-xl px-2 pl-4 font-sans text-sm'
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
                    </>}
                {
                    Model == "Advanced" &&
                    <div>
                        <div className="m-2 flex items-center justify-center gap-2">MY MODELS</div>
                        <select
                            name="" id="" value={trainedModel}
                            onChange={(e) => settrainedModel(e.target.value)}
                            className="p-2 bg-primmaryColor mt-2  relative active:outline-none focus:outline-none shadow-[3px_3px_3px_[1]px_rgba(2,4,4,0.2)] shadow-purple-700 text-gray-300 border border-secondaryColor border-opacity-40 rounded-xl px-2 pl-4 font-sans text-sm"
                        >
                            {userInfo.user.FalAI.map((data) => (
                                <option key={data.id} value={data.lora} className=" py-3"> {data.modelName} </option>
                            ))}
                        </select>
                    </div>
                }{
                    Model == "Custom" &&
                    <div>
                        <div className="m-2 my-4 text-sm flex items-center justify-center gap-2 border border-white rounded-lg border-opacity-30">
                            COMBINE TWO MODELS
                        </div>
                        <div> SUBJECT MODELS </div>
                        <select
                            name="" id="" value={null}
                            onChange={(e) => setSubjectModel(e.target.value)}
                            className="p-2 bg-primmaryColor mt-2  relative active:outline-none focus:outline-none shadow-[3px_3px_3px_[1]px_rgba(2,4,4,0.2)] shadow-purple-700 text-gray-300 border border-secondaryColor border-opacity-40 rounded-xl px-2 pl-4 font-sans text-sm"
                        >
                            <option value={null}>Select your model</option>
                            {
                                userInfo.user.FalAI.filter((model) => model.isDataSet == false).map((data) => (
                                    <option value={data.lora} className=" py-3"> {data.modelName} </option>
                                ))
                            }
                        </select>
                        <div className="mt-6"> STYLE MODELS </div>
                        <select
                            name="" id="" value={null}
                            onChange={(e) => setStyleModel(e.target.value)}
                            className="p-2 bg-primmaryColor mt-2  relative active:outline-none focus:outline-none shadow-[3px_3px_3px_[1]px_rgba(2,4,4,0.2)] shadow-purple-700 text-gray-300 border border-secondaryColor border-opacity-40 rounded-xl px-2 pl-4 font-sans text-sm"
                        >
                            <option value={null}>Select your model</option>
                            {
                                userInfo.user.FalAI.filter((model) => model.isDataSet == true).map((data) => (
                                    <option value={data.lora} className=" py-3"> {data.modelName} </option>
                                ))
                            }
                        </select>
                    </div>
                }
                {/* </AccordionContent>
                    </AccordionItem>
                </Accordion> */}
            </div>
        </div>
    )
}

export default Filter