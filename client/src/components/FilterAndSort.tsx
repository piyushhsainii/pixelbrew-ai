import { ArrowDown, ArrowDownUp, ArrowUp } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'

const FilterAndSort = ({ FilteredModels, setFilteredModels }: { FilteredModels: any, setFilteredModels: any }) => {
    return (
        <div className=' w-[80vw]  m-auto mt-7 font-sans text-white flex justify-between'>
            <div className='  px-4 py-1 rounded-2xl font-semibold cursor-pointer'>
                <DropdownMenu>
                    <DropdownMenuTrigger className='flex items-center  gap-2 outline-none'>
                        Category<ArrowDownUp size={18} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='font-sans bg-black text-white border-none '>
                        <DropdownMenuItem className='hover:bg-gray-800 cursor-pointer'>
                            Standard Models
                        </DropdownMenuItem >
                        <DropdownMenuItem className='hover:bg-gray-800 cursor-pointer'>
                            Standard Plus
                        </DropdownMenuItem>
                        <DropdownMenuItem className='hover:bg-gray-800 cursor-pointer'>
                            Advanced
                        </DropdownMenuItem>
                        <DropdownMenuItem className='hover:bg-gray-800 cursor-pointer'>
                            Custom
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <DropdownMenu>
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
            </DropdownMenu>

        </div>
    )
}

export default FilterAndSort