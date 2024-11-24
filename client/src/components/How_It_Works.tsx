import { ArrowRight, FileSearch, PenTool, Rocket, Zap } from "lucide-react"
import { Link } from "react-router-dom"
import BlurFade from "./ui/blur-fade"

export default function HowItWorks() {
    return (
        <div className="bg-black min-h-[60vh] font-sans " id="how-it-works" >
            <BlurFade blur="" inView className="bg-black " >
                <div className="container mx-auto px-4 py-16">
                    <h1 className="text-3xl font-semibold text-center mb-12 text-white">HOW IT WORKS</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="flex flex-col items-center text-center">
                            <FileSearch className="w-12 h-12 mb-4 text-purple-500" />
                            <h2 className="text-xl font-semibold mb-2 text-white">Step 1: Setup Profile</h2>
                            <p className="text-gray-400">Upload a clear image of yourself to train the AI on your appearance and style preferences.</p>
                            <Link to={'/profileSetup'}>  <ArrowRight className="w-6 h-6 mt-4 text-purple-400 hidden lg:block" /> </Link>
                        </div>
                        <div className="flex flex-col items-center text-center justify-between">
                            <PenTool className="w-12 h-11 mb-3 text-purple-500" />
                            <h2 className="text-xl font-semibold  text-white">Step 2: Create Prompt</h2>
                            <p className="text-gray-400 mb-5">Craft a detailed text prompt describing the thumbnail you want to generate.</p>
                            <Link to={'/generate'}><ArrowRight className="w-6 h-6 mt-4 text-purple-400 hidden lg:block" /></Link>
                        </div>
                        <div className="flex flex-col items-center text-center justify-between">
                            <Zap className="w-12 h-12 mb-4 text-purple-500" />
                            <h2 className="text-xl font-semibold mb-2 text-white">Step 3: Generate</h2>
                            <p className="text-gray-400">Let the AI process your prompt and create custom thumbnail options based on your profile and input.</p>
                            <Link to={'/generate'}> <ArrowRight className="w-6 h-6 mt-4 text-purple-400 hidden lg:block" /></Link>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <Rocket className="w-12 h-12 mb-4 text-purple-500" />
                            <h2 className="text-xl font-semibold mb-2 text-white">Step 4: Easy Download </h2>
                            <p className="text-gray-400">Review the generated thumbnails, make any necessary adjustments, and download your favorite version.</p>
                        </div>
                    </div>
                </div>
            </BlurFade>
        </div>

    )
}