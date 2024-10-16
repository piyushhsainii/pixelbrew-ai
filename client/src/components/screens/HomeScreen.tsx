import { Link } from "react-router-dom";
import { Vortex } from "../ui/vortex";
import Navbar from "../Navbar";

export function VortexDemo() {
    return (
        <div className="w-screen mx-auto  h-screen overflow-hidden">
            <Navbar />
            <Vortex
                backgroundColor="black"
                className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
            >
                <h2 className="text-white text-2xl md:text-6xl font-bold text-center font-sans select-none">
                    PixelBrew AI
                </h2>
                <p className="text-white text-sm md:text-2xl max-w-xl mt-6 text-center font-sans select-none">
                    Pixel Perfect Thumbnails, Brewed by AI.
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
                    <Link to={'/generate'}>
                        <button className="px-4 py-2 bg-purple-700 hover:bg-purple-800 font-semibold font-sans transition duration-200 rounded-lg text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset]">
                            Try it now
                        </button>
                    </Link>
                    <Link to={'/'}>
                        <button className="px-4 py-2 font-sans text-white ">Log In</button>
                    </Link>
                </div>
            </Vortex>
            <div>

            </div>
        </div>
    );
}
