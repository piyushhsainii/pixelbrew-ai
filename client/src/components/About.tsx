import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-black text-white font-sans">
            {/* Hero Section */}
            <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl md:text-5xl  font-semibold text-center leading-tight mb-16">
                        PixelBrew AI
                        <br />
                        Elevating Creativity with Custom AI Imagery
                    </h1>
                    <div className="relative w-full aspect-[16/9] max-w-5xl mx-auto transform rotate-[-4deg]">
                        <img
                            src="https://res.cloudinary.com/dzow59kgu/image/upload/v1732482803/combined_htrgsk.png"
                            alt="PixelBrew AI Interface"
                            width={1200}
                            height={800}
                            className="rounded-lg border border-white/10 shadow-2xl"
                        />
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-start">
                    <div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-8">
                            Crafting the Ultimate Tool for Personalized AI Imagery
                        </h2>
                    </div>
                    <div className="space-y-6 text-gray-400">
                        <p>
                            Traditional image creation can feel limited and uninspired. Stock photos and generic designs often fail to
                            capture the essence of your personal style or brand identity. That’s why we created PixelBrew AI—a platform
                            that brings your ideas to life with unique, personalized, and AI-generated images.
                        </p>
                        <p>
                            From custom-trained models for advanced users to instant, high-quality results for everyone, PixelBrew AI
                            revolutionizes how you create. Whether you're a brand owner, artist, or content creator, our platform delivers
                            highly realistic visuals tailored to your unique vision.
                        </p>
                        <p>
                            Join thousands of creators who trust PixelBrew AI to stand out with stunning, lifelike imagery that feels
                            authentic, innovative, and truly personal.
                        </p>
                    </div>
                </div>
            </section>

            {/* Team Section
            <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black/50">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                                Dedicated to Quality and Innovation
                            </h2>
                            <div className="space-y-6 text-gray-400">
                                <p>
                                    At PixelBrew AI, we pride ourselves on delivering the highest quality AI tools to our users. Our team of
                                    experts is committed to crafting an experience that’s not only powerful but also easy to use. From the
                                    smallest details to our cutting-edge model training capabilities, we aim to exceed your expectations and
                                    inspire your creativity.
                                </p>
                                <Button variant="outline" className="text-sm">
                                    Join Our Community
                                </Button>
                            </div>
                        </div>
                        <div className="relative aspect-[4/3]">
                            <img
                                src="/placeholder.svg?height=600&width=800"
                                alt="PixelBrew AI Team"
                                width={800}
                                height={600}
                                className="rounded-lg object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section> */}
        </div>

    )
}

