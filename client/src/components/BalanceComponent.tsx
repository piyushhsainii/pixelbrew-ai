import { Zap } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'

const BalanceComponent = ({ balance }: { balance: Number }) => {

    return (
        <TooltipProvider>
            <Tooltip delayDuration={200}>
                <TooltipTrigger>
                    <div className="text-[0.77rem] flex gap-1 items-center text-gray-400"
                    >
                        <div className='flex gap-2  items-center rounded-2xl border-purple-900 border px-3 py-[0.15rem]
                                hover:border-purple-400 cursor-pointer
                                '>
                            <div className='font-bold text-white font-mono text-lg '>
                                {balance?.toString()}
                            </div>
                            <Zap color="#d84dff" size={16} />
                        </div>
                    </div>
                </TooltipTrigger>
                <TooltipContent className="h-[130px] w-[190px] bg-purple-300 border-white border border-opacity-30 select-none">
                    <div className="text-black font-sans text-center font-bold text-[0.900rem]"> CREDITS </div>
                    <div className="text-black font-sans text-left my-2 mt-1 mb-4">
                        <span className='font-semibold'>Pixel Brew AI</span> credits lets you generate images <br></br>
                        <div className='flex items-center justify-start gap-2'>
                            <div className=''>  2</div><div><Zap color="#d84dff" size={14} /></div>
                            <div>per image (FAL AI)</div>
                        </div>
                        <div className='flex items-center  justify-start gap-2'>
                            <div className=''>  3</div><div><Zap color="#d84dff" size={14} /></div>
                            <div>per image (Ideogram)</div>
                        </div>
                        <div className='flex items-center  justify-start gap-2'>
                            <div className=''>  3</div><div><Zap color="#d84dff" size={14} /></div>
                            <div>per image (Advanced)</div>
                        </div>
                        <div className='flex items-center  justify-start gap-2'>
                            <div className=''>  3</div><div><Zap color="#d84dff" size={14} /></div>
                            <div>per image (Custom)</div>
                        </div>
                    </div>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>


    )
}

export default BalanceComponent