import { useEffect, useState } from "react"
import ImageCard from "../ImageCard"
import { BACKEND_URL } from "../../lib/url"
import axios from "axios"
import { useToast } from "../../hooks/use-toast"
import { AllImages } from "../../lib/interface"
import { Link } from "react-router-dom"
import Loader from "../Loader"

const Explore = () => {
    const { toast } = useToast()
    const [images, setImages] = useState<AllImages[] | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [refresh, setRefresh] = useState<any>()

    const getPublicImages = async () => {
        try {
            setIsLoading(true)
            const response = await axios.get(`${BACKEND_URL}/getAllImages`)
            setImages(response.data.AllImages)
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
    }, [refresh])

    return (
        <div className="relative min-h-screen w-full bg-black">
            <div className="relative z-10   py-8">
                {isLoading ? (
                    <div className="flex justify-center items-center min-h-[200px]">
                        <Loader />
                    </div>
                ) : (
                    <div className="flex justify-center  flex-wrap   max-w-[1600px] m-auto">
                        {images?.map((image, index) => (
                            <div key={index} className="">
                                <ImageCard
                                    image={image}
                                    url={image.url}
                                    userInfo={image.user}
                                    likes={image.Likes}
                                    email={image.userEmail}
                                    setRefresh={setRefresh}
                                />
                            </div>
                        ))}
                    </div>
                )}
                <h2 className="text-white text-2xl md:text-4xl font-bold font-sans text-center mb-4 select-none">
                    UNLEASH YOUR CREATIVITY!
                </h2>
                <Link to={'/generate'}>
                    <div className="px-4 py-2 max-w-[200px] flex justify-center m-auto bg-purple-700 hover:bg-purple-800 font-semibold font-sans transition duration-200 rounded-lg text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset]">
                        Try PixelBrew AI now!
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Explore