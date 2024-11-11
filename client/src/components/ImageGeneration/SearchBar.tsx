import { Info } from "lucide-react"
import { Switch } from "../ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import { AnimatedSubscribeButton } from "../ui/animated-subscribe-button"
import { MagicPrompt } from "../ImageGenerationComponent"

const SearchBar = ({
    toggleMagicPromptState,
    textareaRef,
    handleInputChange,
    generateImage,
    isLoading,
    Input,
    isMagicPromptOn
}: {
    toggleMagicPromptState: any
    textareaRef: React.MutableRefObject<any>
    handleInputChange: any
    generateImage: any
    isLoading: boolean,
    Input: string,
    isMagicPromptOn: MagicPrompt
}) => {
    return (
        <div className='max-w-[1400px] border-purple-800 border border-opacity-60 rounded-3xl py-[0.95px] w-[85%] m-auto flex flex-col  md:flex-row justify-between my-4'>
            <div className=" flex items-center mx-3">
                <TooltipProvider>
                    <Tooltip delayDuration={200}>
                        <TooltipTrigger>
                            <div className="text-[0.77rem] flex gap-1 items-baseline text-gray-400 relative"
                                onClick={toggleMagicPromptState}>
                                <AnimatedSubscribeButton
                                    initialText={"Magic Prompt is OFF"}
                                    changeText={"Magic Prompt is ON"}
                                    buttonColor="#6b21a8"
                                    subscribeStatus={isMagicPromptOn == "ON" ? true : false}
                                />
                            </div>
                        </TooltipTrigger>
                        <TooltipContent className="h-[90px] w-[180px] bg-slate-100 border-white border border-opacity-30">
                            <div className="text-primmaryColor font-sans text-center font-bold text-[0.900rem]"> MAGIC PROMPT </div>
                            <div className="text-primmaryColor font-sans text-center my-2 mb-4">
                                turning this on will enhance your prompt with <span className="font-mono">pixelbrew AI</span>
                            </div>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
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
    )
}

export default SearchBar