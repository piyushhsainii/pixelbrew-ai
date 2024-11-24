import { SwimmDiagram } from "../components/swimm-diagram"

export default function Page() {
    return (
        <div className="min-h-screen bg-black text-white font-sans relative">
            <iframe className="absolute mt-20 ml-20 w-64 h-52" src="https://lottie.host/embed/286e6f85-e923-40bf-9bd3-26d57abf2aff/BVdi2Gejjb.lottie"></iframe>
            <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-10 mt-7 text-white ">
                        How PixelBrew AI Works?
                    </h2>
                </div>
            </section>
            <section className="py-8 px-4 sm:px-6 lg:px-6">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2  items-center">
                    <SwimmDiagram className="w-full" />
                    <div className="space-y-24">
                        <div>
                            <div className="flex items-baseline gap-4 mb-4">
                                <span className="text-2xl font-bold text-purple-500">01</span>
                                <h3 className="text-2xl font-bold text-white">
                                    Explore AI Models in Dashboard
                                </h3>
                            </div>
                            <p className="text-gray-300">
                                Start your creative journey by exploring a wide range of AI models right from your personalized dashboard.
                                Discover the power of AI and find the ideal starting point for your vision.
                            </p>
                        </div>
                        <div>

                            <div className="flex items-baseline gap-4 mb-4">
                                <span className="text-2xl font-bold text-purple-500">02</span>
                                <h3 className="text-2xl font-bold text-white">
                                    Train a Custom AI model on your photos.
                                </h3>
                            </div>
                            <p className="text-gray-300">
                                Take personalization to the next level by training a custom AI model with your own photos. Simply upload your images,
                                and let our advanced technology learn your unique style, preferences, or brand identity. Once trained, your model will generate highly realistic, tailored visuals that perfectly align with your creative vision
                            </p>
                        </div>
                        <div>
                            <div className="flex items-baseline gap-4 mb-4">
                                <span className="text-2xl font-bold text-purple-500">03</span>
                                <h3 className="text-2xl font-bold text-white">Describe what you want to see to AI model</h3>
                            </div>
                            <p className="text-gray-300">
                                Bring your ideas to life by providing detailed prompts to the AI model. Simply describe your vision—whether it’s a vibrant portrait,
                                a serene landscape, or a specific style—and watch the model interpret your input into stunning, high-quality visuals. The more specific your description, the closer the result matches your imagination!
                            </p>
                        </div>
                        <div>
                            <div className="flex items-baseline gap-4 mb-4">
                                <span className="text-2xl font-bold text-purple-500">04</span>
                                <h3 className="text-2xl font-bold text-white">
                                    Finetune your Image Post Generation for final touch up with easy download.
                                </h3>
                            </div>
                            <p className="text-gray-300">
                                Perfect your creations with our intuitive post-generation tools. Adjust details, enhance colors, or refine the style to ensure
                                your image meets your expectations. Once satisfied, download your polished masterpiece effortlessly in just a few clicks, ready to share or use anywhere!
                            </p>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    )
}

