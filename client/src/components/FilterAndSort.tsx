import { ArrowDown, ArrowDownUp, ArrowUp } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'

const FilterAndSort = ({ FilteredModels, setFilteredModels }: { FilteredModels: any, setFilteredModels: any }) => {
    return (
        <div className=' w-[80vw]  m-auto mt-7 font-sans text-white flex justify-between items-center'>
            <div className='  px-4 py-1 rounded-2xl font-semibold cursor-pointer'>
                <DropdownMenu>
                    <DropdownMenuTrigger className='flex items-center font-light  gap-2 outline-none'>
                        Category<ArrowDownUp size={18} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='font-sans bg-black text-white border-none '>
                        <DropdownMenuItem className='hover:bg-gray-800 cursor-pointer' onClick={() => {
                            setFilteredModels('Ideogram')
                        }}>
                            Ideogram
                        </DropdownMenuItem >
                        <DropdownMenuItem className='hover:bg-gray-800 cursor-pointer' onClick={() => {
                            setFilteredModels('FAL_AI')
                        }}>
                            FAL AI
                        </DropdownMenuItem >
                        <DropdownMenuItem className='hover:bg-gray-800 cursor-pointer'
                            onClick={() => {
                                setFilteredModels('Advanced')
                            }}
                        >
                            Advanced
                        </DropdownMenuItem>
                        <DropdownMenuItem className='hover:bg-gray-800 cursor-pointer'
                            onClick={() => {
                                setFilteredModels('custom')
                            }}
                        >
                            Custom
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className='font-sans font-extralight tracking-widest cursor-pointer' onClick={() => setFilteredModels([])} >
                Reset
            </div>
            {/* <DropdownMenu>
                <DropdownMenuTrigger className='flex items-center  gap-2 outline-none'>
                    <div className='flex items-center gap-2  px-4  py-1 rounded-2xl font-semibold cursor-pointer'>
                        Sort By <ArrowDownUp size={18} /> </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='font-sans bg-black text-white border-none '>
                    <DropdownMenuItem className='hover:bg-gray-800 cursor-pointer'>
                        Most Liked <ArrowUp />
                    </DropdownMenuItem >
                    <DropdownMenuItem className='hover:bg-gray-800 cursor-pointer'>
                        Least Liked <ArrowDown />
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu> */}
        </div>
    )
}

export default FilterAndSort