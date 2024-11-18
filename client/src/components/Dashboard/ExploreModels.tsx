import ModelCard from "./ModelCard"

const ExploreModels = () => {

    const data = [
        {
            modelName: "General Model",
            description: "This model is best for general users who want to generate their AI images for fun purposes.",
            how_it_works: [
                { steps: "Only requires 1 photo of yourself to create your image.", },
                { steps: "No training fees, you are only charged on image generation", },
                { steps: "Generates results", },
            ],
            modelType: "text-to-image",
            url: "https://res.cloudinary.com/dzow59kgu/image/upload/v1731848448/flux-pro-11-ultra_r8adub.webp",

        },
        {
            modelName: "Advanced Model",
            description: `This model is best for content creators or advanced use cases, such as creating thumbnails or make custom realistic
            AI images. Generates highly realistic results.
            `,
            how_it_works: [
                { steps: "Requires 5-10 images of yourself with clear face.", },
                { steps: "One time Model training fees - 249", },
                { steps: "Then, you are only charged per-image generation", },
            ],
            modelType: "text-to-image",
            url: "https://res.cloudinary.com/dzow59kgu/image/upload/v1731848442/flux-lora-fast-training_be31zu.webp",

        },
    ]
    return (
        <div className="max-w-[1600px] m-auto flex justify-center flex-wrap gap-5">
            {data && data.map((data) => (
                <ModelCard img={data.url} data={data} />
            ))}
        </div>
    )
}


export default ExploreModels