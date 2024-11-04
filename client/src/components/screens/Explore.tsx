import { useEffect, useState } from "react"
import ImageCard from "../ImageCard"
import FlickeringGrid from "../ui/flickering-grid"
import { BACKEND_URL } from "../../lib/url"
import axios from "axios"
import { useToast } from "../../hooks/use-toast"
import { AllImages } from "../../lib/interface"

const Explore = () => {
    const { toast } = useToast()
    const [Images, setImages] = useState<AllImages[] | null>(null)
    const getPublicImages = async () => {
        try {
            const Images = await axios.get(`${BACKEND_URL}/getAllImages`)
            setImages(Images.data.AllImages)
        } catch (error) {
            toast({
                title: "Something went wrong, please try again later.",
                variant: "default",
                className: "bg-primmaryColor text-white font-sans border-gray-800 border",
            });
        }
    }

    useEffect(() => {
        getPublicImages()
    }, [])


    return (
        <div className='bg-black  h-screen ' >
            <FlickeringGrid
                className="z-0 absolute top-16 inset-0  w-screen h-screen opacity-70"
                squareSize={4}
                gridGap={6}
                color="#6B7280"
                maxOpacity={0.5}
                flickerChance={0.1}
            />
            <div className="text-white grid grid-cols-3 p-4  " >
                {
                    Images && Images.map((images) => (
                        <ImageCard url={images.url} userInfo={images.user} />
                    ))
                }
            </div>
            <h2 className="text-white text-4xl mt-20 font-bold text-center flex justify-center items-center font-sans select-none max-w-[2000px]">
                UNLEASH YOUR CREATIVITY!
            </h2>
            <div className="flex justify-center text-xl items-center font-sans text-white text-center my-2 max-w-[2000px]"> TRY IT NOW!</div>
        </div>
    )
}

export default Explore