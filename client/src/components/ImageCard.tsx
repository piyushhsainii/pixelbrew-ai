import { Heart } from 'lucide-react'

const ImageCard = ({ url, userInfo }: { url: string, userInfo: any }) => {
    console.log(userInfo, "USERINFO")
    return (
        <div className='h-80 min-w-80 max-w-[228rem] border-purple-700 border-opacity-35 border m-4 rounded-lg flex-wrap my-2 z-10' >
            <img
                src={url}
                alt=""
                className='h-[87%] object-cover'
            />
            <div className='flex justify-between items-center p-1 m-1'>
                <div className='flex items-center gap-3'>
                    <img src={userInfo.trainingImg} className='h-6 w-6 rounded-xl' />
                    <div className='font-sans text-sm'> {userInfo.name} </div>
                </div>
                <div className='cursor-pointer'> <Heart size={19} /> </div>
            </div>
        </div>
    )
}

export default ImageCard