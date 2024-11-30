
export default function Page() {
    return (
        <div className="min-h-screen bg-black text-white font-sans relative">
            <iframe
                className="absolute mt-20 ml-20 w-64 h-52"
                src="https://lottie.host/embed/286e6f85-e923-40bf-9bd3-26d57abf2aff/BVdi2Gejjb.lottie"></iframe>
            <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-light tracking-wider mb-10 mt-40 lg:mt-7 text-white ">
                        How PixelBrew AI Works?
                    </h2>
                </div>
            </section>
            <section className="md:py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto space-y-20">
                    {/* Feature 01: Explore AI Models */}
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4">
                            <div className="flex items-center space-x-4">
                                <span className="text-2xl font-bold text-purple-500">01</span>
                                <h3 className="text-2xl font-light text-white">
                                    Explore AI Models in Dashboard
                                </h3>
                            </div>
                            <p className="text-gray-300">
                                Start your creative journey by exploring a wide range of AI models right from your personalized dashboard.
                                Discover the power of AI and find the ideal starting point for your vision.
                            </p>
                        </div>
                        <div className="flex justify-center w-[80%]">
                            <img
                                src="https://res.cloudinary.com/dzow59kgu/image/upload/v1732433916/localhost_5173_dashboard_exploreModels_rmb3at.png"
                                alt="Input: Existing docs, Codebase, Integrations"
                                className="h-auto rounded-xl object-cover max-w-[400px]"
                            />
                        </div>
                    </div>
                    {/* Feature 02: Train Custom AI Model */}
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4 md:order-first">
                            <div className="flex items-center space-x-4">
                                <span className="text-2xl font-bold text-purple-500">02</span>
                                <h3 className="text-2xl font-light text-white">
                                    Train a Custom AI Model on Your Photos
                                </h3>
                            </div>
                            <p className="text-gray-300">
                                Take personalization to the next level by training a custom AI model with your own photos. Simply upload your images,
                                and let our advanced technology learn your unique style, preferences, or brand identity. Once trained, your model will generate
                                highly realistic, tailored visuals that perfectly align with your creative vision.
                            </p>
                        </div>
                        <div className="flex justify-center md:order-last">
                            <video
                                loop
                                autoPlay
                                muted
                                src="https://res.cloudinary.com/dzow59kgu/video/upload/v1732441625/ImageGenerationEditedCompressed_ayzslb.mp4"
                                className="max-w-[400px] h-auto rounded-xl object-cover w-[80%]"
                            />
                        </div>
                    </div>

                    {/* Feature 03: Describe to AI Model */}
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4">
                            <div className="flex items-center space-x-4">
                                <span className="text-2xl font-bold text-purple-500">03</span>
                                <h3 className="text-2xl font-light text-white">
                                    Describe What You Want to See
                                </h3>
                            </div>
                            <p className="text-gray-300">
                                Bring your ideas to life by providing detailed prompts to the AI model. Simply describe your vision—whether it's a vibrant
                                portrait, a serene landscape, or a specific style—and watch the model interpret your input into stunning, high-quality visuals.
                                The more specific your description, the closer the result matches your imagination!
                            </p>
                        </div>
                        <div className="flex justify-center">
                            <video
                                loop
                                autoPlay
                                muted
                                src="https://res.cloudinary.com/dzow59kgu/video/upload/v1732435654/Training_tbzjga.mp4"
                                className="max-w-[400px] h-auto rounded-xl object-cover w-[80%]"
                            />
                        </div>
                    </div>
                    {/* Feature 04: Post-Generation Editing */}
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4 md:order-first">
                            <div className="flex items-center space-x-4">
                                <span className="text-2xl font-bold text-purple-500">04</span>
                                <h3 className="text-2xl font-light text-white">
                                    Fine-tune Your Image with Easy Download
                                </h3>
                            </div>
                            <p className="text-gray-300 text-base">
                                Perfect your creations with our intuitive post-generation tools. Adjust details, enhance colors, or refine the style to ensure
                                your image meets your expectations. Once satisfied, download your polished masterpiece effortlessly in just a few clicks,
                                ready to share or use anywhere!
                            </p>
                        </div>
                        <div className="flex justify-center md:order-last">
                            <video
                                loop
                                autoPlay
                                muted
                                src="https://res.cloudinary.com/dzow59kgu/video/upload/v1732450387/CustomisationCompressed_eci6cd.mp4"
                                className="max-w-[400px] h-auto rounded-xl object-cover w-[80%]"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

