import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Brush, Cpu, Lightbulb, Rocket, Target, Users } from "lucide-react"

export default function AboutUs() {
    return (
        <div className="min-h-screen bg-black text-white font-sans mt-16 ">
            <header className="bg-purple-900 py-6 max-w-[1600px] m-auto">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-semibold tracking-tight">PixelBrew AI</h1>
                    <p className="mt-2 text-xl tracking-tight">Where creativity meets technology</p>
                </div>
            </header>

            <main className="container mx-auto px-12 py-12 max-w-[1600px]">
                <section className="mb-16">
                    <h2 className="text-3xl font-semibold mb-6">About Us</h2>
                    <p className="text-lg mb-4 tracking-tight">
                        Welcome to PixelBrew AI – where creativity meets technology to bring your vision to life. We believe that
                        image creation should be seamless, personalized, and accessible to everyone, whether you're a brand looking
                        to make a statement or an individual who wants to stand out.
                    </p>
                </section>

                <section className="mb-16 max-w-[1600px]">
                    <h2 className="text-3xl font-semibold mb-6">Our Mission</h2>
                    <Card className="bg-purple-700 text-white font-sans tracking-tight">
                        <CardContent className="p-6">
                            <p className="text-lg tracking-tight">
                                Our mission is simple: to empower users with tools that let them express themselves in unique and
                                creative ways. We're here to transform how people approach digital imagery, bringing personalization,
                                simplicity, and quality to everyone.
                            </p>
                        </CardContent>
                    </Card>
                </section>

                <section className="mb-16 max-w-[1600px]">
                    <h2 className="text-3xl font-semibold mb-6 tracking-tight">Why Choose PixelBrew AI?</h2>
                    <div className="grid md:grid-cols-2 gap-8 tracking-tight ">
                        <FeatureCard
                            icon={<Brush className="w-8 h-8 text-white" />}
                            title="Seamless, AI-Generated Images"
                            description="Create custom images that align perfectly with your personal style or brand identity using our advanced text-to-image technology."
                        />
                        <FeatureCard
                            icon={<Cpu className="w-8 h-8 text-white" />}
                            title="Cutting-Edge AI"
                            description="Our powerful AI model is designed to deliver high-quality, unique images in seconds."
                        />
                        <FeatureCard
                            icon={<Users className="w-8 h-8 text-white" />}
                            title="User-Friendly Interface"
                            description="We've crafted an intuitive, user-friendly interface that anyone can navigate. No expert skills required!"
                        />
                        <FeatureCard
                            icon={<Target className="w-8 h-8 text-white" />}
                            title="Personalization"
                            description="Break free from generic, one-size-fits-all visuals. Your images should be as unique as your story."
                        />
                    </div>
                </section>

                <section className="mb-16">
                    <h2 className="text-3xl font-semibold mb-6">Elevate Your Digital Presence</h2>
                    <Card className="bg-gradient-to-r from-purple-900 to-purple-700">
                        <CardContent className="p-6">
                            <p className="text-lg mb-4">
                                In today's digital world, a strong visual presence is key. PixelBrew AI lets you elevate your online
                                image with visuals that are memorable, professional, and perfectly aligned with your brand or personal
                                aesthetic.
                            </p>
                            <Link to={'/'} >
                                <Button className="bg-white text-purple-900 hover:bg-purple-100">Get Started</Button>
                            </Link>
                        </CardContent>
                    </Card>
                </section>

                <section>
                    <h2 className="text-3xl font-semibold mb-6">Join the PixelBrew Revolution</h2>
                    <p className="text-lg mb-4">
                        Let PixelBrew AI be the creative partner that helps you stand out. Whether you're a creator, business owner,
                        or just someone looking to add a little more "you" to your visuals, we're here to make it happen.
                    </p>
                    <Link to={'/generate'} >
                        <Button className="bg-purple-600 hover:bg-purple-700">Start Creating</Button>
                    </Link>
                </section>
            </main>

            <footer className="bg-slate-950 py-6 mt-12 max-w-[1600px] m-auto">
                <div className="container mx-auto px-4 text-center">
                    <p>&copy; 2023 PixelBrew AI. All rights reserved.</p>
                    <p className="font-semibold mt-2 text-gray-300">&copy;  Developed by <Link target="_blank" to={'https://x.com/piyushsainii'} className="underline"> Piyush Saini</Link> </p>
                </div>
            </footer>
        </div>
    )
}

function FeatureCard({ icon, title, description }) {
    return (
        <Card className="bg-purple-700">
            <CardContent className="p-6">
                <div className="flex items-center mb-4">
                    {icon}
                    <h3 className="text-xl font-semibold ml-4">{title}</h3>
                </div>
                <p className="text-white text-base">{description}</p>
            </CardContent>
        </Card>
    )
}