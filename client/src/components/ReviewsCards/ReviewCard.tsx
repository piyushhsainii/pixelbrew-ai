import { cn } from "../../lib/utils";

export const ReviewCard = ({
    img,
    name,
    username,
    body,
}: {
    img: string;
    name: string;
    username: string;
    body: string;
}) => {

    return (
        <>
            <figure
                className={cn(
                    "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
                    // Adjusted styles for black theme
                    "border-gray-800 bg-purple-900 hover:bg-black text-white"
                )}
            >
                <div className="flex flex-row items-center gap-2 font-sans">
                    <img className="rounded-full" width="32" height="32" alt="" src={img} />
                    <div className="flex flex-col">
                        <figcaption className="text-sm font-medium text-white">
                            {name}
                        </figcaption>
                        <p className="text-xs font-medium text-gray-400 font-sans">{username}</p>
                    </div>
                </div>
                <blockquote className="mt-2 text-sm text-gray-200  font-sans">{body}</blockquote>
            </figure>
        </>
    );
};