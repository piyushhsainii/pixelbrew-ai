import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { BrainCircuit, Image, Sparkles, Zap } from "lucide-react"

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
        <section className="w-full py-12 md:py-24 lg:py-32 bg-black text-white font-sans m-auto select-none">
            <div className="container px-4 m-auto">
                <h2 className="text-3xl font-semibold tracking-tighter text-white  font-sans text-center mb-12 ">
                    WHY PIXEL BREW AI?
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 font-sans m-auto">
                    {features.map((feature, index) => (
                        <Card key={index} className="flex flex-col items-center text-center bg-gray-900 border-purple-500 shadow-purple-700  shadow-[3px_2px_1px_[1]px_rgba(2,4,4,0.2)]">
                            <CardHeader>
                                <div className="p-2 bg-purple-900/50 rounded-full mb-4 max-w-[40px]">{feature.icon}</div>
                                <CardTitle className="text-xl text-purple-300">{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-300 font-semibold">{feature.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}