import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { BrainCircuit, Image, Sparkles, Zap } from "lucide-react"
import BlurFade from "./ui/blur-fade"

export default function Component() {
    const features = [
        {
            icon: <Image className="h-6 w-6 text-purple-400" />,
            title: "Traditional Image Creation Is Limited and Impersonal",
            description: "Break free from stock photos and generic designs that don't truly represent your brand.",
        },
        {
            icon: <Sparkles className="h-6 w-6 text-purple-400" />,
            title: "Seamless, AI-Generated Images Tailored Just for You",
            description: "Get unique, customized images that perfectly align with your vision and brand identity.",
        },
        {
            icon: <BrainCircuit className="h-6 w-6 text-purple-400" />,
            title: "Backed by Cutting-Edge AI and Simple Interface",
            description: "Harness the power of advanced AI technology through an intuitive, user-friendly platform.",
        },
        {
            icon: <Zap className="h-6 w-6 text-purple-400" />,
            title: "Don't Miss Out on Your Next-Level Digital Presence",
            description: "Elevate your online presence with stunning, AI-generated visuals that set you apart.",
        },
    ]

    return (
        <BlurFade inView className="mb-[-10px]">
            <section className="w-full py-12 md:py-24 lg:py-32 bg-black text-white font-sans m-auto select-none">
                <div className="container px-4 m-auto">
                    <h2 className="text-3xl font-extralight tracking-wide text-gray-300   font-sans text-center mb-12 ">
                        WHY PIXEL BREW AI?
                    </h2>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 font-sans m-auto px-1">
                        {features.map((feature, index) => (
                            <div key={index} className=" bg-gradient-to-r from-purple-900 via-purple-700  p-[0.05rem] rounded-xl">
                                <Card
                                    className="flex flex-col items-center text-center bg-gray-950 h-full w-full">
                                    <CardHeader className="mt-3">
                                        <div className=" p-2  bg-purple-900/50 rounded-full my-4 mt-1 max-w-[44px]">{feature.icon}</div>
                                        <CardTitle className="text-lg text-purple-300 ">{feature.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-400 text-base ">{feature.description}</p>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </BlurFade>

    )
}