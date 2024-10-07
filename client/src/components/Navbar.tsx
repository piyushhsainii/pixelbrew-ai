
const Navbar = () => {
    return (
        <div
            className='bg-primmaryColor flex justify-between w-full
            border-b border-secondaryColor
            '
        >
            <div className='text-gray-400 font-sans p-4 text-lg font-bold'>
                AI Thumbnail Generator
            </div>
            <div>
                <img src="https://github.com/shadcn.png" alt="" className='w-6 h-6 m-5 rounded-full' />
            </div>
        </div>
    )
}

export default Navbar