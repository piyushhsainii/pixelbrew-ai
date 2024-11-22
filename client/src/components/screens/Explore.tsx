import { useEffect, useState } from "react"
import ImageCard from "../ImageCard"
import { BACKEND_URL } from "../../lib/url"
import axios from "axios"
import { useToast } from "../../hooks/use-toast"
import { AllImages, userLikes } from "../../lib/interface"
import { Link, useNavigate } from "react-router-dom"
import Loader from "../Loader"
import { useRecoilState } from "recoil"
import { authUser } from "../../atoms/atoms"

const Explore = () => {
    const { toast } = useToast()
    const [images, setImages] = useState<AllImages[] | null>(null)
    const [userLikes, setUserLikes] = useState<userLikes[] | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [refresh, setRefresh] = useState<any>()
    const [userInfo, setUserInfo] = useRecoilState(authUser)

    const getPublicImages = async () => {
        try {
            setIsLoading(true)
            const response = await axios.post(`${BACKEND_URL}/getAllImages`, {
                email: userInfo?.email
            })
            setImages(response.data.AllImages)
            setUserLikes(response.data.userLikes)
        } catch (error) {
            toast({
                title: "Something went wrong, please try again later.",
                variant: "default",
                className: "bg-primmaryColor text-white font-sans border-gray-800 border",
            })
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        getPublicImages()
    }, [refresh, userInfo])

    return (
        <div className="relative min-h-screen w-full bg-black">
            <div className="relative z-10   py-8">
                <div className="text-white font-sans text-3xl text-pretty text-center mt-12">
                    EXPLORE IMAGES BREWED BY PIXEL BREW AI
                </div>
                <div className="flex justify-center gap-5 mt-3">
                    <Link to={'/generate'}>
                        <div className="px-4 py-2 max-w-[200px] shadow-[3px_3px_3px_[1]px_rgba(2,4,4,0.2)] border-2 border-black hover:scale-110  shadow-white flex justify-center m-auto bg-purple-700 hover:bg-purple-800 font-semibold font-sans transition duration-200 rounded-lg text-white ">
                            Try PixelBrew AI now!
                        </div>
                    </Link>
                    <Link to={'/dashboard/exploreModels'}>
                        <div className="px-4 py-2 max-w-[200px] shadow-[3px_3px_3px_[1]px_rgba(2,4,4,0.2)] border-2 border-black hover:scale-110  shadow-white flex justify-center m-auto bg-purple-700 hover:bg-purple-800 font-semibold font-sans transition duration-200 rounded-lg text-white ">
                            Explore Models
                        </div>
                    </Link>
                </div>
                {isLoading ? (
                    <div className="flex justify-center items-center min-h-[200px]">
                        <Loader />
                    </div>
                ) : (
                    <div className="flex justify-center  flex-wrap gap-7 md:gap-3 my-10 w-[80%] md:w-[100%] max-w-[1600px] m-auto ">
                        {images?.map((image, index) => (
                            <div key={index} className="relative">
                                <ImageCard
                                    image={image}
                                    url={image.url}
                                    userInfo={image.user}
                                    likes={image.likes}
                                    email={userInfo?.email ?? null}
                                    setRefresh={setRefresh}
                                    myLikes={userLikes}
                                />
                            </div>
                        ))}
                    </div>
                )}
                <h2 className="text-white text-2xl md:text-4xl font-bold font-sans text-center mb-4 select-none" >
                    UNLEASH YOUR CREATIVITY!
                </h2>

            </div>
        </div>
    )
}

export default Explore