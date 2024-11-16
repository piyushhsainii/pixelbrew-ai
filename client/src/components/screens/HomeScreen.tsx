import { Link } from "react-router-dom";
import { Vortex } from "../ui/vortex";
import { useRecoilState, useRecoilValue } from "recoil";
import { authUser } from "../../atoms/atoms";
import HowItWorks from "../How_It_Works";
import { ArrowUpRight } from "lucide-react";
import { HighlightedPosts } from "../HighlightedPosts";
import BlurIn from "../ui/blur-in";
import ReviewComponent from "../ReviewComponent";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../lib/url";
import axios from "axios";
import { AllReviews, TopPosts } from "../../lib/interface";
import Testimonials from "../Testimonials";
import WhyPixelBrewAI from "../WhyPixelBrew";

export function LandingPage() {
    const [user, setUser] = useRecoilState(authUser)
    const [reviews, setReviews] = useState<AllReviews[] | null>(null)
    const [topPosts, setTopPosts] = useState<TopPosts[] | null>(null)
    const [ReverseMap, setReverseMap] = useState([])

    const getHighlightedData = async () => {
        try {
            const { data } = await axios.get(`${BACKEND_URL}/getAllReviews`)
            const topPosts = await axios.get(`${BACKEND_URL}/getTopPosts`)
            setReviews(data)
            setTopPosts(topPosts.data.topPosts)
            reverseMap(topPosts.data.recentPosts)
        } catch (error) {

        }
    }
    let promptArray = []
    const reverseMap = (data) => {
        if (data) {
            for (let i = 0; i < data.length; i++) {
                const reverseLen = data.length - 1 - i
                promptArray.push(data[reverseLen])
            }
            setReverseMap(promptArray)
        }
    }

    useEffect(() => {
        getHighlightedData()
    }, [])
    return (
        <>
            <div className="w-full h-[85vh] md:h-[90vh] overflow-hidden ">
                <Vortex
                    backgroundColor="black"
                    className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
                >
                    <BlurIn
                        word="PixelBrew AI"
                        className="text-white text-4xl md:text-6xl font-bold text-center font-sans select-none bg-gradient-to-t from-gray-400 to-white text-transparent bg-clip-text "
                    />
                    <p className="text-white text-lg md:text-2xl max-w-xl mt-4 text-center font-sans select-none tracking-tighter ">
                        Pixel Perfect Thumbnails, Brewed by AI.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center gap-4 mt-6 relative">
                        <Link to={'/explore'}>
                            <button className="px-4 py-2 flex items-center gap-1 justify-center bg-white hover:bg-purple-100 font-semibold font-sans transition duration-200 rounded-lg text-purple-500 border-3 border-purple-950">
                                Explore <ArrowUpRight size={19} className="mt-1" />
                            </button>
                        </Link>
                        <Link to={'/generate'}>
                            <button className="px-4 py-2  bg-gradient-to-r from-blue-500 to-purple-700 hover:from-purple-700 hover:to-blue-600 transition-all duration-300  font-semibold font-sans rounded-lg text-white ">
                                Try it now
                            </button>
                        </Link>
                    </div>
                </Vortex>
                <div>
                </div>
            </div>
            <HighlightedPosts topPosts={topPosts} recentPosts={ReverseMap} />
            <HowItWorks />
            <WhyPixelBrewAI />
            <Testimonials reviews={reviews} />
            <ReviewComponent user={user} />
        </>
    );
}
