import { Link } from "react-router-dom";
import { Vortex } from "../ui/vortex";
import { useRecoilValue } from "recoil";
import { authUser } from "../../atoms/atoms";
import HowItWorks from "../How_It_Works";
import { ArrowUpRight } from "lucide-react";

export function LandingPage() {

    const user = useRecoilValue(authUser)
    console.log(user)
    return (
        <>
            <div className="w-FULL h-[85vh] md:h-screen overflow-hidden ">
                <Vortex
                    backgroundColor="black"
                    className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
                >
                    <h2 className="text-white text-4xl md:text-6xl font-bold text-center font-sans select-none">
                        PixelBrew AI
                    </h2>
                    <p className="text-white text-lg md:text-2xl max-w-xl mt-6 text-center font-sans select-none">
                        Pixel Perfect Thumbnails, Brewed by AI.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
                        <Link to={'/explore'}>
                            <button className="px-4 py-2 flex items-center gap-1 justify-center bg-purple-700 hover:bg-purple-800 font-semibold font-sans transition duration-200 rounded-lg text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset]">
                                Explore <ArrowUpRight size={19} className="mt-1" />
                            </button>
                        </Link>
                        <Link to={'/generate'}>
                            <button className="px-4 py-2 bg-purple-700 hover:bg-purple-800 font-semibold font-sans transition duration-200 rounded-lg text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset]">
                                Try it now
                            </button>
                        </Link>
                    </div>
                </Vortex>
                <div>
                </div>
            </div>
            <HowItWorks />
        </>
    );
}
