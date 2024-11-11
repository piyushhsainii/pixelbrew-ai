import { ArrowRight } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Link } from "react-router-dom"
import { url } from "inspector"

export default function SimplifiedPricingComponent() {
    const plans = [
        {
            title: "Step 1: Setup Profile",
            description: "Upload a clear image of yourself to train the AI on your appearance and style preferences.",
            url: "/profileSetup"
        },
        {
            title: "Step 2: Create Prompt",
            description: "Craft a detailed text prompt describing the thumbnail you want to generate.",
            url: "/generate"
        },
        {
            title: "Step 3: Generate",
            description: "Let the AI process your prompt and create custom thumbnail options based on your profile and input.",
            url: "/generate"
        },
        {
            title: "Step 4: Easy Download",
            description: "Review the generated thumbnails, make any necessary adjustments, and download your favorite version.",
            url: "/myImages"
        },
    ]

    return (
        <div className=" bg-black flex items-center justify-center p-4 font-sans">
            <div className="max-w-6xl w-full mx-auto grid gap-8 md:grid-cols-4">
                {plans.map((plan, index) => (
                    <Card
                        key={plan.title}
                        className="bg-gray-900 flex flex-col justify-between border-purple-600 hover:border-purple-400 transition-colors duration-300 cursor-pointer group"
                    >
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold text-white">{plan.title}</CardTitle>
                            <CardDescription className="text-purple-300 mt-2">{plan.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex justify-end">
                            <Link to={plan.url}> <ArrowRight className="text-purple-400 group-hover:text-purple-300 transition-colors duration-300" /></Link>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}