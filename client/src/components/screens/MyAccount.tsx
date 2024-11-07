import { useRecoilState } from 'recoil'
import { userCompleteInfo } from '../../atoms/atoms'
import { Link } from 'react-router-dom'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'
import { Heart } from 'lucide-react'


const MyAccount = () => {
    const [userInfo, setuserInfo] = useRecoilState(userCompleteInfo)
    return (
        <>
            <div className='bg-black h-screen flex justify-center items-center '>
                <div className='bg-black border-2 hover:border-purple-700 border-black max-h-[1800px] w-[70vw]  max-w-[1400px] rounded-2xl relative shadow-[10px_12px_23px_[0.5]px_rgba(2,1,1,0.5)] shadow-purple-500 hover:shadow-purple-700 duration-200 transition-all'>
                    <div className='w-36 h-36 rounded-[100%]   absolute top-[-35px] left-6 '>
                        <img
                            src={userInfo?.user?.trainingImg}
                            className='w-36 h-36 rounded-[100%] object-cover
                          border-[5px] border-white
                        '
                            alt="" />
                    </div>
                    <div className='px-3 text-base flex gap-4 justify-end bg-green font-sans bg-black rounded-t-2xl'>
                        <Link to={'/shop'}>
                            <button className='mt-20 bg-purple-700 border-2 border-black px-3 py-1 text-white font-semibold rounded-lg my-2
                    hover:scale-105 transition-all duration-200 shadow-[3px_3px_3px_[1]px_rgba(2,4,4,0.2)] shadow-white'>
                                RECHARGE TOKENS
                            </button>
                        </Link>
                        <Link to={'/profileSetup'}>
                            <button className='mt-20 bg-purple-700 border-2 border-black px-3 py-1 text-white font-semibold rounded-lg my-2
                    hover:scale-105 transition-all duration-200 shadow-[3px_3px_3px_[1]px_rgba(2,4,4,0.2)] shadow-white'>
                                UPDATE PROFILE
                            </button>
                        </Link>
                    </div>
                    <div className='bg-black'>

                        <div className=' w-full text-white px-6 text-2xl font-mono  ' >
                            <span className=' px-4 rounded-md py-1 '>
                                {userInfo?.user?.name}
                            </span>
                        </div>
                        <div className=' m-3 text-base px-3 font-sans text-pretty my-3 mt-0 pb-2'>
                            <span className='  px-4 rounded-md py-[0.10rem]  text-gray-400 ' >
                                {userInfo?.user?.about}
                            </span>
                        </div>
                    </div>
                    <div className=' '>
                        <button className='font-sans flex items-center gap-2 ml-5 bg-purple-700 border-2 border-black px-3 py-1 text-white font-semibold rounded-lg my-2
                    hover:scale-105 transition-all duration-200 shadow-[3px_3px_3px_[1]px_rgba(2,4,4,0.2)] shadow-white'>
                            LIKED POSTS
                            <Heart fill='red' color='red' size={16} className='border-red-700 text-red mt-[3px]' />

                        </button>
                        <div className='w-[90%] mx-auto my-10 mt-4 flex justify-center items-center'>
                            <Carousel className='mx-3 bg-purple-700 rounded-lg p-3'>
                                <CarouselPrevious />
                                <CarouselContent className="">
                                    {userInfo?.user?.Likes.map((likedImgs) => (
                                        <CarouselItem className="md:basis-1/2 lg:basis-1/3 select-none " key={likedImgs.postID}>
                                            <img src={likedImgs.url} alt="" className='min-h-40 w-auto object-cover rounded-lg border-2 border-black ' />
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselNext />
                            </Carousel>
                        </div>
                    </div>

                </div>

            </div>

        </>

    )
}

export default MyAccount