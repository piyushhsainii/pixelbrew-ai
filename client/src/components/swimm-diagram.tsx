
export function SwimmDiagram({ className = "" }: { className?: string }) {
    return (
        <div className={`flex flex-col gap-10 items-center  ${className}`}>
            <div className="flex flex-col items-center justify-center text-center">
                <img
                    src="https://res.cloudinary.com/dzow59kgu/image/upload/v1732433916/localhost_5173_dashboard_exploreModels_rmb3at.png"
                    alt="Input: Existing docs, Codebase, Integrations"
                    className="h-48 w-96 rounded-xl "
                />
            </div>
            <div className="flex flex-col items-center text-center">
                <video
                    loop={true}
                    autoPlay={true}
                    muted={true}
                    src="https://res.cloudinary.com/dzow59kgu/video/upload/v1732435654/Training_tbzjga.mp4"
                    className="h-48 w-96 rounded-xl"
                />
            </div>
            <div className="flex flex-col items-center text-center">
                <video
                    loop={true}
                    autoPlay={true}
                    muted={true}
                    src="https://res.cloudinary.com/dzow59kgu/video/upload/v1732441625/ImageGenerationEditedCompressed_ayzslb.mp4"
                    className="h-48 w-96 rounded-xl"
                />
            </div>
            <div className="flex flex-col items-center text-center">
                <video
                    loop={true}
                    autoPlay={true}
                    muted={true}
                    src="https://res.cloudinary.com/dzow59kgu/video/upload/v1732450387/CustomisationCompressed_eci6cd.mp4"
                    className="h-48 w-96 rounded-xl"
                />
            </div>
        </div>
    )
}

