import { Info } from "lucide-react"
import { Switch } from "../ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import { AnimatedSubscribeButton } from "../ui/animated-subscribe-button"
import { MagicPrompt, Model } from "../ImageGenerationComponent"

const SearchBar = ({
    toggleMagicPromptState,
    textareaRef,
    handleInputChange,
    generateImage,
    isLoading,
    Input,
    isMagicPromptOn,
    Model
}: {
    toggleMagicPromptState: any
    textareaRef: React.MutableRefObject<any>
    handleInputChange: any
    generateImage: any
    isLoading: boolean,
    Input: string,
    isMagicPromptOn: MagicPrompt
    Model: Model
}) => {
    return (
        <div className='max-w-[1400px] border-purple-800  md:ml-32 mt- md:mt-7 relative border border-opacity-60 rounded-3xl py-[0.95px] w-[85%] m-auto flex flex-col  md:flex-row justify-between my-4'>
            {
                Model == "FAL_AI" &&
                <div className=" flex items-center mx-3">
                    <TooltipProvider>
                        <Tooltip delayDuration={200}>
                            <TooltipTrigger>
                                <div className="text-[0.77rem] flex gap-1 items-baseline text-gray-400 
                                absolute left-[-2rem] top-[-3.9rem] md:left-[-7.7rem] md:top-0
                                "
                                    onClick={toggleMagicPromptState}>
                                    <AnimatedSubscribeButton
                                        initialText={"Magic Prompt OFF"}
                                        changeText={"Magic Prompt ON"}
                                        buttonColor="#6b21a8"
                                        subscribeStatus={isMagicPromptOn == "ON" ? true : false}
                                    />
                                </div>
                            </TooltipTrigger>
                            <TooltipContent className="h-[90px] w-[180px] bg-slate-100 border-white border border-opacity-30 mt-10 mr-8">
                                <div className="text-primmaryColor font-sans text-center font-bold text-[0.900rem]"> MAGIC PROMPT </div>
                                <div className="text-primmaryColor font-sans text-center my-2 mb-4">
                                    turning this on will enhance your prompt with <span className="font-mono">pixelbrew AI</span>
                                </div>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            }
            <textarea
                className='bg-black  w-[100%]  rounded-3xl font-sans focus:outline-none active:outline-none text-gray-300
                p-3 resize-none  '
                ref={textareaRef}
                placeholder='Describe what you want to see...'
                value={Input}
                rows={1}
                onChange={handleInputChange}
            ></textarea>
            <button
                className='bg-gradient-to-r  max-h-[55px] font-semibold text-white 
                from-blue-600 to-purple-600 px-10  rounded-3xl py-2 hover:scale-x-[120%]
                hover:scale-105 transition-all duration-200 active:scale-90 font-sans text-lg border
                border-blue-800 hover:border-purple-700
                '
                onClick={generateImage}
            >

                {isLoading ? "Generating..." : "Generate"}
            </button>
        </div>
    )
}

export default SearchBar