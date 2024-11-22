
const ShadowBtn = ({ string, classname, bgColor }: { string: string, classname?: string, bgColor?: string }) => {
    return (
        <button className={`px-4 py-2  ${bgColor ?? 'bg-purple-700'} ${bgColor ?? 'hover:bg-purple-800'}   font-semibold font-sans transition duration-200 rounded-lg text-white shadow-white  shadow-[3px_2px_1px_[1]px_rgba(2,4,4,0.2)] ${classname}`}>
            {string}
        </button>
    )
}

export default ShadowBtn