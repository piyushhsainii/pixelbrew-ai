import { Zap } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import { useRecoilState } from 'recoil'
import { authUser, Balance } from '../atoms/atoms'
import { useEffect } from 'react'
import axios from 'axios'
import { BACKEND_URL } from '../lib/url'
import { useToast } from '../hooks/use-toast'

const BalanceComponent = ({ balance }: { balance: Number }) => {

    return (
        <TooltipProvider>
            <Tooltip delayDuration={200}>
                <TooltipTrigger>
                    <div className="text-[0.77rem] flex gap-1 items-center text-gray-400"
                    >
                        <div className='flex gap-2 mx-4 items-center rounded-2xl border-purple-700 border px-3 py-[0.15rem]
                                hover:border-purple-400 cursor-pointer
                                '>
                            <div className='font-bold text-white font-sans text-lg '>
                                {balance?.toString()}
                            </div>
                            <Zap color="#d84dff" />
                        </div>
                    </div>
                </TooltipTrigger>
                <TooltipContent className="h-[90px] w-[190px] bg-purple-300 border-white border border-opacity-30">
                    <div className="text-black font-sans text-center font-bold text-[0.900rem]"> CREDITS </div>
                    <div className="text-black font-sans text-left my-2 mt-1 mb-4">
                        <span className='font-semibold'>Pixel Brew AI</span> credits lets you generate images <br></br>
                        <div className='flex items-center justify-evenly'>
                            <div className=''>  1</div>
                            <div><Zap color="#d84dff" size={14} /></div>
                            <div>is charged per image</div>
                        </div>
                    </div>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>


    )
}

export default BalanceComponent