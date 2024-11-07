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
                    "border-gray-800 bg-purple-900 shadow-sm shadow-white hover:bg-black text-white"
                )}
            >
                <div className="flex flex-row items-center gap-2 font-sans mb-2 ">
                    <img className="rounded-full" width="28" height="32" alt="" src={img} />
                    <div className="flex flex-col">
                        <figcaption className="text-sm font-medium text-white">
                            {name}
                        </figcaption>
                        <p className="text-xs font-medium text-gray-400 font-sans">{username}</p>
                    </div>
                </div>
                <hr className=" border-black border-opacity-35"></hr>
                <blockquote className="mt-2 text-sm text-gray-200  font-sans">{body}</blockquote>
            </figure>
        </>
    );
};