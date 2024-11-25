import DashboardNavbar from "../Dashboard/DashboardNavbar"
import ModelCard from "../Dashboard/ModelCard"

const ExploreModels = () => {

    const data = [
        {
            modelName: "Standard Model",
            description: "This model is best for general users who want to generate AI images for unleashing their creativity & fun purposes.",
            how_it_works: [
                { steps: "No training fees, you are only charged on image generation", },
                { steps: "Generates results", },
            ],
            modelType: "text-to-image",
            url: "https://res.cloudinary.com/dzow59kgu/image/upload/v1731848448/flux-pro-11-ultra_r8adub.webp",
            requires_training: false

        },
        {
            modelName: "Advanced Model",
            description: `This model is best for content creators or advanced use cases, such as creating thumbnails or make custom realistic
            AI images. Generates highly realistic results.
            `,
            how_it_works: [
                { steps: "Requires 4 images of yourself with clear face.", },
                { steps: "Only one time Model training fees", },
                { steps: "You will get your own custom trained model.", },
                { steps: "Then, you are only charged per-image generation", },
            ],
            modelType: "text-to-image",
            url: "https://res.cloudinary.com/dzow59kgu/image/upload/v1731848442/flux-lora-fast-training_be31zu.webp",
            requires_training: true

        },
        {
            modelName: "Standard Plus Model",
            description: "Best for unleashing creativity but with your face in it!",
            how_it_works: [
                { steps: "Only requires 1 photo of yourself to create your image.", },
                { steps: "No training fees, you are only charged on image generation", },
                { steps: "Generates results", },
            ],
            modelType: "text-to-image",
            url: "https://res.cloudinary.com/dzow59kgu/image/upload/v1731848448/flux-pro-11-ultra_r8adub.webp",
            requires_training: false

        },
        {
            modelName: "Custom Model",
            description: "This Model is best for custom usecases, this model lets you combine 2 advance models to make a fusion of AI Results!",
            how_it_works: [
                { steps: "Combine two Advance Models to make a fusion of two models.", },
                { steps: "No training fees, you are only charged on image generation", },
                { steps: "Generates results", },
            ],
            modelType: "text-to-image",
            url: "https://res.cloudinary.com/dzow59kgu/image/upload/v1731848448/flux-pro-11-ultra_r8adub.webp",
            requires_training: false

        },

    ]
    return (
        <div className=" min-h-screen h-auto w-screen bg-black font-sans text-white ">
            <DashboardNavbar />
            <div className="max-w-[1600px] flex justify-center items-center gap-5 flex-wrap pb-2">
                {data && data.map((data) => (
                    <ModelCard img={data.url} data={data} />
                ))}
            </div>
        </div>

    )
}


export default ExploreModels