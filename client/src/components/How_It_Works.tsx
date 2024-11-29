import { ArrowRight, FileSearch, PenTool, Rocket, Zap } from "lucide-react"
import { Link } from "react-router-dom"
import BlurFade from "./ui/blur-fade"

export default function HowItWorks() {
    return (
        <div className="bg-black min-h-[60vh] font-sans " id="how-it-works" >
            <BlurFade blur="" inView className="bg-black " >
                <div className="container mx-auto px-4 py-16 pb-28">
                    <h1 className="text-3xl font-extralight text-center tracking-wider  my-12 mb-20 text-white">HOW IT WORKS</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-start items-start gap-8">
                        <div className="flex flex-col items-center text-center  justify-between">
                            <FileSearch className="w-12 h-12 mb-4 text-purple-500 stroke-[1px]" />
                            <h2 className="text-xl font-semibold mb-2 text-white">
                                Step 1: Explore AI Models in Dashboard
                            </h2>
                            <p className="text-gray-400  text-sm mt-4">
                                Discover the power of AI and find the ideal starting point for your vision.
                            </p>
                            <Link to={'/dashboard/exploreModels'}>  <ArrowRight className="w-6 h-6 mt-[3.5rem] text-purple-400 hidden lg:block" /> </Link>
                        </div>
                        <div className="flex flex-col items-center text-center justify-between">
                            <PenTool className="w-12 h-11 mb-5 text-purple-500 stroke-[1px]" />
                            <h2 className="text-xl font-semibold  text-white">
                                Step 2: Train a Custom AI model on your photos.
                            </h2>
                            <p className="text-gray-400 mb-5 text-sm mt-5">
                                Simply upload your images,
                                and let our advanced technology learn your unique style, preferences, or brand identity.

                            </p>
                            <Link to={'/#'}><ArrowRight className="w-6 h-6 mt-4 text-purple-400 hidden lg:block" /></Link>
                        </div>
                        <div className="flex flex-col items-center text-center justify-between">
                            <Zap className="w-12 h-12 mb-4 text-purple-500 stroke-[1px]" />
                            <h2 className="text-xl font-semibold mb-2 text-white">
                                Step 3: Describe what you want to see to AI model
                            </h2>
                            <p className="text-gray-400 text-sm mt-3">
                                Once trained, your model will generate highly realistic, tailored visuals that perfectly align with your
                                creative vision
                            </p>
                            <Link to={'/#'}> <ArrowRight className="w-6 h-6 mt-9 text-purple-400 hidden lg:block" /></Link>
                        </div>
                        <div className="flex flex-col items-center text-center  justify-between">
                            <Rocket className="w-12 h-12 mb-4 text-purple-500 stroke-[1px]" />
                            <h2 className="text-xl font-semibold mb-2 text-white">
                                Step 4: Refine and download your image effortlessly
                            </h2>
                            <p className="text-gray-400 text-sm mt-3 text-pretty">
                                Polish your AI-generated image with ease using our fine-tuning tools
                                & download your creation seamlessly and put it to use right away!
                            </p>
                            <Link to={'/#'}> <ArrowRight className="w-6 h-6 mt-4 text-purple-400 hidden lg:block" /></Link>
                        </div>
                    </div>
                </div>
            </BlurFade>
        </div>

    )
}