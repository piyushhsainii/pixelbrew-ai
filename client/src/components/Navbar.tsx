import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <div
            className=' flex justify-between w-full
            border-b border-secondaryColor bg-black
            '
        >
            <Link to={'/'}>
                <div className='text-purple-500 font-sans p-4 font-normal text-2xl select-none'>
                    AI Thumbnail Generator
                </div>
            </Link>
            <div>
                <img src="https://github.com/shadcn.png" alt="" className='w-6 h-6 m-5 rounded-full' />
            </div>
        </div>
    )
}

export default Navbar